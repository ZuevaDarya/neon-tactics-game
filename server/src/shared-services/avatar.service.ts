import { Injectable, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs/promises';

@Injectable()
export class AvatarService implements OnModuleInit {
  private readonly CLIENT_PUBLIC_PATH = `${process.cwd()}/../client/public`;
  private readonly AVATAR_WEB_PATH = '/assets/avatars';

  private readonly avatarsDirectory = `${this.CLIENT_PUBLIC_PATH}${this.AVATAR_WEB_PATH}`;
  private avatars: string[] = [];
  private usedAvatars: Map<string, string[]> = new Map(); //roomId -> AvavtarNames[]

  async onModuleInit() {
    await this.checkAccessAvatarDirectory();
    await this.loadAvatars();

    console.log(
      `AvatarService готов. Загружено ${this.avatars.length} аватаров.`,
    );
  }

  private async checkAccessAvatarDirectory() {
    try {
      await fs.access(this.avatarsDirectory);
      console.log('Папка с аватарами доступна');
    } catch {
      console.log('Создание папки c аватарами');
      await fs.mkdir(this.avatarsDirectory, { recursive: true });
    }
  }

  private async loadAvatars() {
    try {
      const files = await fs.readdir(this.avatarsDirectory);
      this.avatars = files.filter((fileName) => this.isImageFile(fileName));
    } catch (error) {
      console.log(`Ошибка загрузки аватаров: ${error}`);
      this.avatars = [];
    }
  }

  private isImageFile(fileName: string) {
    const imagePattern = /\.(png|jpe?g|gif|webp|svg)$/i;
    return imagePattern.test(fileName);
  }

  public getRandomAvatarName(avatars: string[] = this.avatars) {
    if (avatars.length === 0) return null;

    const randomIdx = Math.floor(Math.random() * avatars.length);
    return avatars[randomIdx];
  }

  public getAvatarPath(avatarName: string) {
    return `${this.AVATAR_WEB_PATH}/${avatarName}`;
  }

  public addAvatarToRoom(roomId: string, avatarName: string) {
    if (!this.usedAvatars.has(roomId)) {
      this.usedAvatars.set(roomId, []);
    }

    const avatars = this.usedAvatars.get(roomId);

    if (avatars && !avatars.includes(avatarName)) {
      this.usedAvatars.set(roomId, [...avatars, avatarName]);
    }
  }

  public removeAvatarFromRoom(roomId: string, avatarName: string) {
    if (!this.usedAvatars.has(roomId)) return;

    const avatars = this.usedAvatars.get(roomId)!;
    const updatedAvatars = avatars.filter(
      (usedAvatar) => usedAvatar !== avatarName,
    );

    if (updatedAvatars.length === 0) {
      this.usedAvatars.delete(roomId);
    } else {
      this.usedAvatars.set(roomId, updatedAvatars);
    }
  }

  public getAvailableAvatars(roomId: string) {
    const usedInRoomAvatars = this.usedAvatars.get(roomId) || [];
    return this.avatars.filter(
      (avatarName) => !usedInRoomAvatars.includes(avatarName),
    );
  }

  public getUniqueAvatarPathForRoom(roomId: string) {
    if (this.avatars.length === 0) return null;

    const availableAvatars = this.getAvailableAvatars(roomId);
    if (availableAvatars.length === 0) return null;

    const avatarName = this.getRandomAvatarName(availableAvatars);
    if (avatarName) {
      this.addAvatarToRoom(roomId, avatarName);
      return this.getAvatarPath(avatarName);
    }

    return null;
  }

  public getAvatarNameFromPath(path: string) {
    const avatarName = path.replace(`${this.AVATAR_WEB_PATH}/`, '');
    return this.avatars.includes(avatarName) ? avatarName : null;
  }
}
