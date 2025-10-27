import z from "zod";
import { StartFormInputName } from "../constants/input-name";

export const joinRoomFormSchema = z.object({
  [StartFormInputName.Player]: z
    .string()
    .min(2, "Имя должно содержать минимум 2 символа")
    .max(12, "Имя не должно превышать 12 символов")
    .regex(/^[а-яА-ЯёЁ\w\s]+$/, "Имя может содержать только буквы и цифры")
    .trim()
    .refine((val) => val.length >= 2, "Имя не может состоять только из пробелов"),
  [StartFormInputName.RoomId]: z
    .string()
    .toUpperCase()
    .length(8, "Номер комнаты должен содержать 8 символов")
    .regex(
      /^[A-Z0-9]+$/,
      "Номер комнаты может содержать только латинские буквы и цифры в верхнем регистре"
    ),
});

export type TJoinRoomForm = z.infer<typeof joinRoomFormSchema>;
