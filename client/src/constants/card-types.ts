export enum CardType {
  Hacker = "hacker",
  Robot = "robot",
  VrGlasses = "vr-glasses",
  Chip = "chip",
  QrCode = "qr-code",
  Hologram = "hologram",
  Flask = "flask",
  Gun = "gun",
}

export const RU_CARD_TYPES = {
  [CardType.Hacker]: "хакер",
  [CardType.Robot]: "робот",
  [CardType.VrGlasses]: "vr очки",
  [CardType.Chip]: "чип",
  [CardType.QrCode]: "qr-код",
  [CardType.Hologram]: "голограмма",
  [CardType.Flask]: "колба",
  [CardType.Gun]: "пушка",
};
