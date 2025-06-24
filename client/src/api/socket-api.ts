import { io, Socket } from "socket.io-client";
import { DEV_URL } from "../constants/api-constants";

export class SocketApi {
  static socket: Socket | null = null;

  static createConnection(uri: string = DEV_URL) {
    this.socket = io(uri);

    this.socket.on("connect", () => {
      console.log("CONNECT");
    });

    this.socket.on("joined-room", ({ room, player }) => {
      console.log("Успешно присоединились к комнате:", room);
      console.log("Данные игрока:", player);
    });

    this.socket.on("created-room", ({ room, player }) => {
      console.log("Успешно создалась комната:", room);
      console.log("Данные игрока:", player);
    });

    this.socket.on("disconnect", () => {
      console.log("DISCONNECT");
    });
  }
}
