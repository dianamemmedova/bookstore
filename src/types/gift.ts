export interface GiftCard {
  id: string;
  label: string;
  bg: string;
  textColor: string;
  emoji?: string;
  amount?: string;
  image: string | null;
  title: string;
  description: string;
}

export interface CardCategory {
  title: string;
  cards: GiftCard[];
}
