export interface WatchEdition {
  id: 'steel' | 'damascus' | 'rosegold';
  name: string;
  subname: string;
  price: string;
  deposit: string;
  strap: string;
  image: string;
  availability: string;
  remainingSlots: number;
  description: string;
}

export interface Hotspot {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  x: number;
  y: number;
  magnification: string;
  artisanTechnique: string;
}
