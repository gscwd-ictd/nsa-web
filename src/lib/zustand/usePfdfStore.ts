import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ItemWithQty } from '../utils/types/item';
import bathtub from '@images/PFDF/bathtub.webp';
import bidet from '@images/PFDF/bidet.jpg';
import clothesWasher from '@images/PFDF/clothes-washer.webp';
import domesticDishwasher from '@images/PFDF/domestic-dishwasher.jpg';
import cuspidor from '@images/PFDF/cuspidor.webp';
import drinkingFountain from '@images/PFDF/drinking-fountain.webp';
import lavatory from '@images/PFDF/lavatory.jpg';
import hoseBibb from '@images/PFDF/hose-bibb.jpg';
import barSink from '@images/PFDF/bar-sink.png';
import lawnSprinkler from '@images/PFDF/lawn-sprinkler.png';
import clinicalFaucet from '@images/PFDF/clinical-faucet.png';
import domesticKitchenSink from '@images/PFDF/domestic-kitchen-sink.jpg';
import laundrySink from '@images/PFDF/laundry-sink.jpg';
import serviceMopBasin from '@images/PFDF/service-mop-basin.jpg';
import showerHead from '@images/PFDF/shower-head.jpg';
import flushometer from '@images/PFDF/flushometer.jpeg';
import flushTank from '@images/PFDF/flush-tank.jpg';

type PfdfState = {
  bathtubQty: number;
  setBathtubQty: (bathtubQty: number) => void;

  bidetQty: number;
  setBidetQty: (bidetQty: number) => void;

  clothesWasherQty: number;
  setClothesWasherQty: (clothesWasherQty: number) => void;

  dishwasherQty: number;
  setDishwasherQty: (dishwasherQty: number) => void;

  cuspidorQty: number;
  setCuspidorQty: (cuspidorQty: number) => void;

  drinkingFountainQty: number;
  setDrinkingFountainQty: (drinkingFountainQty: number) => void;

  lavatoryQty: number;
  setLavatoryQty: (lavatoryQty: number) => void;

  hoseBibbQty: number;
  setHoseBibbQty: (hoseBibbQty: number) => void;

  barSinkQty: number;
  setBarSinkQty: (barSinkQty: number) => void;

  lawnSprinklerQty: number;
  setLawnSprinklerQty: (lawnSprinklerQty: number) => void;

  bathtubSheetIsOpen: boolean;
  setBathtubSheetIsOpen: (bathtubSheetIsOpen: boolean) => void;

  bidetSheetIsOpen: boolean;
  setBidetSheetIsOpen: (bidetSheetIsOpen: boolean) => void;

  drinkingFountainSheetIsOpen: boolean;
  setDrinkingFountainSheetIsOpen: (drinkingFountainSheetIsOpen: boolean) => void;

  cuspidorSheetIsOpen: boolean;
  setCuspidorSheetIsOpen: (cuspidorSheetIsOpen: boolean) => void;

  clothesWasherSheetIsOpen: boolean;
  setClothesWasherSheetIsOpen: (clothesWasherSheetIsOpen: boolean) => void;

  dishwasherSheetIsOpen: boolean;
  setDishwasherSheetIsOpen: (dishwasherSheetIsOpen: boolean) => void;

  lavatorySheetIsOpen: boolean;
  setLavatorySheetIsOpen: (lavatorySheetIsOpen: boolean) => void;

  hoseBibbSheetIsOpen: boolean;
  setHoseBibbSheetIsOpen: (hoseBibbSheetIsOpen: boolean) => void;

  barSinkSheetIsOpen: boolean;
  setBarSinkSheetIsOpen: (barSinkSheetIsOpen: boolean) => void;

  lawnSprinklerSheetIsOpen: boolean;
  setLawnSprinklerSheetIsOpen: (lawnSprinklerSheetIsOpen: boolean) => void;

  items: Array<ItemWithQty>;
  setItems: (items: Array<ItemWithQty>) => void;

  declaredItems: Array<ItemWithQty>;
  setDeclaredItems: (declaredItems: Array<ItemWithQty>) => void;
};

export const usePfdfStore = create<PfdfState>()(
  devtools((set) => ({
    bathtubQty: 0,
    setBathtubQty: (bathtubQty) => set({ bathtubQty }),

    bidetQty: 0,
    setBidetQty: (bidetQty) => set({ bidetQty }),

    bathtubSheetIsOpen: false,
    setBathtubSheetIsOpen: (bathtubSheetIsOpen) => set({ bathtubSheetIsOpen }),

    bidetSheetIsOpen: false,
    setBidetSheetIsOpen: (bidetSheetIsOpen) => set({ bidetSheetIsOpen }),

    clothesWasherQty: 0,
    setClothesWasherQty: (clothesWasherQty) => set({ clothesWasherQty }),

    clothesWasherSheetIsOpen: false,
    setClothesWasherSheetIsOpen: (clothesWasherSheetIsOpen) => set({ clothesWasherSheetIsOpen }),

    dishwasherQty: 0,
    setDishwasherQty: (dishwasherQty) => set({ dishwasherQty }),

    dishwasherSheetIsOpen: false,
    setDishwasherSheetIsOpen: (dishwasherSheetIsOpen) => set({ dishwasherSheetIsOpen }),

    cuspidorQty: 0,
    setCuspidorQty: (cuspidorQty) => set({ cuspidorQty }),

    cuspidorSheetIsOpen: false,
    setCuspidorSheetIsOpen: (cuspidorSheetIsOpen) => set({ cuspidorSheetIsOpen }),

    drinkingFountainQty: 0,
    setDrinkingFountainQty: (drinkingFountainQty) => set({ drinkingFountainQty }),

    drinkingFountainSheetIsOpen: false,
    setDrinkingFountainSheetIsOpen: (drinkingFountainSheetIsOpen) => set({ drinkingFountainSheetIsOpen }),

    lavatoryQty: 0,
    setLavatoryQty: (lavatoryQty) => set({ lavatoryQty }),

    lavatorySheetIsOpen: false,
    setLavatorySheetIsOpen: (lavatorySheetIsOpen) => set({ lavatorySheetIsOpen }),

    hoseBibbQty: 0,
    setHoseBibbQty: (hoseBibbQty) => set({ hoseBibbQty }),

    hoseBibbSheetIsOpen: false,
    setHoseBibbSheetIsOpen: (hoseBibbSheetIsOpen) => set({ hoseBibbSheetIsOpen }),

    barSinkQty: 0,
    setBarSinkQty: (barSinkQty) => set({ barSinkQty }),

    barSinkSheetIsOpen: false,
    setBarSinkSheetIsOpen: (barSinkSheetIsOpen) => set({ barSinkSheetIsOpen }),

    lawnSprinklerQty: 0,
    setLawnSprinklerQty: (lawnSprinklerQty) => set({ lawnSprinklerQty }),

    lawnSprinklerSheetIsOpen: false,
    setLawnSprinklerSheetIsOpen: (lawnSprinklerSheetIsOpen) => set({ lawnSprinklerSheetIsOpen }),

    items: [
      {
        id: '001',
        name: 'Bathtub',
        qty: 0,
        imgUrl: bathtub.src,
        category: 'none',
        description: 'Test description',
      },
      {
        id: '002',
        name: 'Bidet',
        qty: 0,
        imgUrl: bidet.src,
        category: 'none',
        description: 'Test description',
      },
      {
        id: '003',
        name: 'Clothes Washer',
        qty: 0,
        imgUrl: clothesWasher.src,
        category: 'none',
        description: 'Test description',
      },
      {
        id: '004',
        name: 'Domestic Dishwasher',
        qty: 0,
        imgUrl: domesticDishwasher.src,
        category: 'none',
        description: 'Test description',
      },
      {
        id: '005',
        name: 'Cuspidor',
        qty: 0,
        imgUrl: cuspidor.src,
        category: 'none',
        description: 'Test description',
      },
      {
        id: '006',
        name: 'Drinking Fountain',
        qty: 0,
        imgUrl: drinkingFountain.src,
        category: 'none',
        description: 'Test description',
      },
      {
        id: '007',
        name: 'Lavatory',
        qty: 0,
        imgUrl: lavatory.src,
        category: 'none',
        description: 'Test description',
      },
      {
        id: '008',
        name: 'Hose Bibb',
        qty: 0,
        imgUrl: hoseBibb.src,
        category: 'none',
        description: 'Test description',
      },
      {
        id: '009',
        name: 'Bar Sink',
        qty: 0,
        imgUrl: barSink.src,
        category: 'sink',
        description: 'Test description',
      },
      {
        id: '010',
        name: 'Lawn Sprinkler',
        qty: 0,
        imgUrl: lawnSprinkler.src,
        category: 'none',
        description: 'Test description',
      },
      {
        id: '011',
        name: 'Clinical Faucet',
        qty: 0,
        imgUrl: clinicalFaucet.src,
        category: 'sink',
        description: 'Test description',
      },
      {
        id: '012',
        name: 'Domestic Kitchen Sink',
        qty: 0,
        imgUrl: domesticKitchenSink.src,
        category: 'sink',
        description: 'Test description',
      },
      {
        id: '013',
        name: 'Laundry Sink',
        qty: 0,
        imgUrl: laundrySink.src,
        category: 'sink',
        description: 'Test description',
      },
      {
        id: '014',
        name: 'Service Mop Basin',
        qty: 0,
        imgUrl: serviceMopBasin.src,
        category: 'sink',
        description: 'Test description',
      },
      {
        id: '015',
        name: 'Shower Head',
        qty: 0,
        imgUrl: showerHead.src,
        category: 'none',
        description: 'Test description',
      },
      {
        id: '016',
        name: 'Flushometer Valve with 1.0 GPF',
        qty: 0,
        imgUrl: flushometer.src,
        category: 'urinal',
        description: 'Test description',
      },
      {
        id: '017',
        name: 'Flushometer Valve Greater than 1.0 GPF',
        qty: 0,
        imgUrl: flushometer.src,
        category: 'urinal',
        description: 'Test description',
      },
      {
        id: '018',
        name: 'Flush Tank',
        qty: 0,
        imgUrl: flushTank.src,
        category: 'urinal',
        description: 'Test description',
      },
    ],
    setItems: (items) => set({ items }),

    declaredItems: [],
    setDeclaredItems: (declaredItems) => set({ declaredItems }),
  }))
);
