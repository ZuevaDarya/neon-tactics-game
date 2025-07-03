import { ERROR_MESSAGES } from "../../constants/erros-message";

export type TErrorMesagesKeys = keyof typeof ERROR_MESSAGES;

const translateError = (error: TErrorMesagesKeys | string) => {
  if (error in ERROR_MESSAGES) {
    return ERROR_MESSAGES[error as TErrorMesagesKeys];
  }

  return ERROR_MESSAGES.default;
};

export default translateError;
