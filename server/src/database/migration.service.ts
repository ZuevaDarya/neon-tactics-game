import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize';

interface MigrationMeta {
  name: string;
  executed_at: Date;
}

interface Migration {
  name: string;
  up: () => Promise<void>;
  down: () => Promise<void>;
}

interface MigrationResult {
  success: boolean;
  migrationName: string;
  error?: Error | string;
}

@Injectable()
export class MigrationService {
  private readonly logger = new Logger(MigrationService.name);

  constructor(
    @InjectConnection()
    private sequelize: Sequelize,
  ) {}

  private async createMigrationsTable() {
    await this.sequelize.query(`
      CREATE TABLE IF NOT EXISTS sequelize_meta (
        name VARCHAR(255) NOT NULL PRIMARY KEY,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }

  private async getExecutedMigrations(): Promise<Set<string>> {
    const [results] = await this.sequelize.query(
      'SELECT name FROM sequelize_meta',
    );
    return new Set(results.map((record: MigrationMeta) => record.name));
  }

  private async executePendingMigrations(
    executedMigrations: Set<string>,
  ): Promise<MigrationResult[]> {
    const migrations: Migration[] = [
      {
        name: 'add-time-to-turn',
        up: async (): Promise<void> => {
          await this.sequelize.query(`
            ALTER TABLE game
            ADD COLUMN IF NOT EXISTS time_to_turn BIGINT DEFAULT NULL
          `);
        },
        down: async (): Promise<void> => {
          await this.sequelize.query(`
            ALTER TABLE game
            DROP COLUMN IF EXISTS time_to_turn
          `);
        },
      },
      //другие миграции здесь
    ];

    const results: MigrationResult[] = [];

    for (const migration of migrations) {
      if (!executedMigrations.has(migration.name)) {
        try {
          this.logger.log(`Executing migration: ${migration.name}`);

          await migration.up();
          await this.sequelize.query(
            'INSERT INTO sequelize_meta (name) VALUES (?)',
            { replacements: [migration.name] },
          );

          results.push({
            success: true,
            migrationName: migration.name,
          });

          this.logger.log(`Migration ${migration.name} completed`);
        } catch (error) {
          const migrationError = error instanceof Error ? error : String(error);

          results.push({
            success: false,
            migrationName: migration.name,
            error: migrationError,
          });

          this.logger.error(
            `Migration ${migration.name} failed:`,
            migrationError,
          );
        }
      } else {
        this.logger.log(
          `Migration ${migration.name} already executed, skipping`,
        );
      }
    }

    return results;
  }

  async runMigrations(): Promise<MigrationResult[]> {
    try {
      this.logger.log('Running database migrations...');

      await this.createMigrationsTable();

      const executedMigrations = await this.getExecutedMigrations();
      const result = await this.executePendingMigrations(executedMigrations);

      this.logger.log('Database migrations completed successfully');

      return result;
    } catch (error) {
      this.logger.error('Migration failed:', error);
      throw error;
    }
  }
}
