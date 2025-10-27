import { z } from "zod";
import { StartFormInputName } from "../constants/input-name";

export const createRoomFormSchema = z.object({
  [StartFormInputName.Player]: z
    .string()
    .min(2, "Имя должно содержать минимум 2 символа")
    .max(12, "Имя не должно превышать 12 символов")
    .regex(/^[а-яА-ЯёЁ\w\s]+$/, "Имя может содержать только буквы и цифры")
    .trim()
    .refine((val) => val.length >= 2, "Имя не может состоять только из пробелов"),
  [StartFormInputName.RoomId]: z
    .string()
    .optional(),
});

export type TCreateRoomForm = z.infer<typeof createRoomFormSchema>;
