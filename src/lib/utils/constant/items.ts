export type Item = {
  id: number;
  name: string;
  isOpen: boolean;
  qty: number;
};

export const SampleItems: Array<Item> = [
  { id: 1, name: 'Bathtub', isOpen: false, qty: 0 },
  { id: 2, name: 'Bidet', isOpen: false, qty: 0 },
  { id: 3, name: 'Clothes Washer', isOpen: false, qty: 0 },
  { id: 4, name: 'Domestic Washer', isOpen: false, qty: 0 },
];
