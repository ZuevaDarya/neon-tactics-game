import { TCardTypes } from "../../types/components-types";

const isAvailableCard = (targetCardTypes: TCardTypes, cardTypes: TCardTypes) => {
  for (const type of targetCardTypes) {
    if (cardTypes.includes(type)) {
      return true;
    }
  }

  return false;
};

export default isAvailableCard;
