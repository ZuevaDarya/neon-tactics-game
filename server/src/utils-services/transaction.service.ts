import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { Sequelize, Transaction } from 'sequelize';

@Injectable()
export class TransactionService {
  constructor(@InjectConnection() private readonly sequelize: Sequelize) {}

  async useTransaction<T>(
    fn: (transaction: Transaction) => Promise<T>,
  ): Promise<T> {
    const transaction = await this.sequelize.transaction();

    try {
      const result = await fn(transaction);
      await transaction.commit();

      return result;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
