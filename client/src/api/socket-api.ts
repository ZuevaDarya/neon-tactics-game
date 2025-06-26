import { io, Socket } from "socket.io-client";
import { BASE_URL } from "../constants/api-constants";
import { SocketEvent } from "../constants/socket-event";
import { TPlayerWithRoomResponse } from "../types/services-types";

type TSocketEvent = `${SocketEvent}`;
type TEventCallback<T = void> = ((data: T) => void) | ((error: Error) => void) | (() => void);

export class SocketApi {
  private static instance: SocketApi;
  private socket: Socket | null = null;

  public static getInstance(): SocketApi {
    if (!SocketApi.instance) {
      SocketApi.instance = new SocketApi();
    }
    return SocketApi.instance;
  }

  public getSocketId(): string | undefined {
    return this.socket?.id;
  }

  public connect(uri: string = BASE_URL, token?: string) {
    if (this.socket?.connected) {
      console.warn("Socket уже подключен");
      return;
    }

    this.socket = io(uri, {
      auth: { token },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    this.setupBaseListeners();
    this.setupCustomListeneres();
  }

  public disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket.removeAllListeners();
      this.socket = null;
    }
  }

  public emit<T extends object>(event: TSocketEvent, data: T) {
    if (!this.socket?.connected) {
      console.error("Socket не подключен");
      return;
    }
    this.socket.emit(event, data);
  }

  public on<T extends object>(event: TSocketEvent, eventCallback: TEventCallback<T>) {
    if (!this.socket) {
      console.error("Socket не инициализирован");
      return;
    }
    this.socket.on(event, eventCallback);
  }

  public off(event: TSocketEvent) {
    if (!this.socket) {
      console.error("Socket не инициализирован");
      return;
    }
    this.socket.off(event);
  }

  private setupBaseListeners() {
    this.on(SocketEvent.Connect, () => {
      console.log("Socket connected");
    });

    this.on(SocketEvent.Disconnect, () => {
      console.log("Socket disconnected");
    });

    this.on(SocketEvent.Error, (error: Error) => {
      console.error("Socket error:", error.message);
    });
  }

  private setupCustomListeneres() {
    this.on<TPlayerWithRoomResponse>(SocketEvent.CreateRoom, (data: TPlayerWithRoomResponse) => {
      console.log("Успешно присоединились к комнате:", data.room);
      console.log("Данные игрока:", data.player);
    });

    this.on<TPlayerWithRoomResponse>(SocketEvent.JoinRoom, (data: TPlayerWithRoomResponse) => {
      console.log("Успешно присоединились к комнате:", data.room);
      console.log("Данные игрока:", data.player);
    });
  }
}

export const socketApi = SocketApi.getInstance();
