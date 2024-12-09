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
import waterClosetOnePointSix from '@images/PFDF/water-closet-1-point-6.avif';

type PfdfState = {
  items: Array<ItemWithQty>;
  setItems: (items: Array<ItemWithQty>) => void;

  declaredItems: Array<ItemWithQty>;
  setDeclaredItems: (declaredItems: Array<ItemWithQty>) => void;
};

export const usePfdfStore = create<PfdfState>()(
  devtools((set) => ({
    items: [
      {
        id: '001',
        name: 'Bathtub',
        qty: 0,
        imgUrl: bathtub.src,
        category: 'general',
        description: 'A tub, usually installed in a bathroom, in which to bathe.',
      },
      {
        id: '002',
        name: 'Bidet',
        qty: 0,
        imgUrl: bidet.src,
        category: 'general',
        description:
          'A plumbing fixture that is installed as a separate unit in the bathroom besides toilet, shower and sink, which users have to straddle.',
      },
      {
        id: '003',
        name: 'Clothes Washer',
        qty: 0,
        imgUrl: clothesWasher.src,
        category: 'general',
        description: 'A flat ring used to tighten joints, a machine for washing, or a person who washes.',
      },
      {
        id: '004',
        name: 'Domestic Dishwasher',
        qty: 0,
        imgUrl: domesticDishwasher.src,
        category: 'general',
        description:
          'A cabinet-like appliance that cleans, rinses, and dries dishware, glassware, utensils, and cookware.',
      },
      {
        id: '005',
        name: 'Cuspidor',
        qty: 0,
        imgUrl: cuspidor.src,
        category: 'general',
        description:
          'A bowl-shaped container used to collect saliva and other fluids, especially during dental procedures.',
      },
      {
        id: '006',
        name: 'Drinking Fountain',
        qty: 0,
        imgUrl: drinkingFountain.src,
        category: 'general',
        description: 'It consists of a basin with either continuously running water or a tap.',
      },
      {
        id: '007',
        name: 'Lavatory',
        qty: 0,
        imgUrl: lavatory.src,
        category: 'general',
        description: 'A vessel (such as a basin) for washing.',
      },
      {
        id: '008',
        name: 'Hose Bib',
        qty: 0,
        imgUrl: hoseBibb.src,
        category: 'general',
        description: 'A small outdoor faucet that is typically attached to the side or back of a home.',
      },
      {
        id: '009',
        name: 'Bar Sink',
        qty: 0,
        imgUrl: barSink.src,
        category: 'sink',
        description: 'Used for washing glassware, utensils, and small items in a bar area.',
      },
      {
        id: '010',
        name: 'Lawn Sprinkler',
        qty: 0,
        imgUrl: lawnSprinkler.src,
        category: 'general',
        description: 'A garden device that sprays water onto your grass or plants.',
      },
      {
        id: '011',
        name: 'Clinical Faucet',
        qty: 0,
        imgUrl: clinicalFaucet.src,
        category: 'sink',
        description:
          'Specialized faucets designed for use in medical settings like hospitals, clinics, and veterinary facilities.',
      },
      {
        id: '012',
        name: 'Domestic Kitchen Sink',
        qty: 0,
        imgUrl: domesticKitchenSink.src,
        category: 'sink',
        description: `A bowl-shaped plumbing fixture that's used for washing dishes, cleaning hands, and other kitchen tasks.`,
      },
      {
        id: '013',
        name: 'Laundry Sink',
        qty: 0,
        imgUrl: laundrySink.src,
        category: 'sink',
        description: 'A large, rugged sink used for washing clothes, hand-washing items, and other tasks.',
      },
      {
        id: '014',
        name: 'Service Mop Basin',
        qty: 0,
        imgUrl: serviceMopBasin.src,
        category: 'sink',
        description:
          'A deep well plumbing fixture used for collecting and dispensing water for mopping in janitorial areas',
      },
      {
        id: '015',
        name: 'Shower Head',
        qty: 0,
        imgUrl: showerHead.src,
        category: 'general',
        description: 'A bathroom fixture that directs the flow of water in a bathroom shower.',
      },
      {
        id: '016',
        name: 'Flushometer Valve with 1.0 GPF',
        qty: 0,
        imgUrl: flushometer.src,
        category: 'urinal',
        description: 'A device that uses water pressure to flush toilets and urinals.',
      },
      {
        id: '017',
        name: 'Flushometer Valve Greater than 1.0 GPF',
        qty: 0,
        imgUrl: flushometer.src,
        category: 'urinal',
        description: 'A device that uses water pressure to flush toilets and urinals.',
      },
      {
        id: '018',
        name: 'Flush Tank',
        qty: 0,
        imgUrl: flushTank.src,
        category: 'urinal',
        description: 'A container that holds water or sewage for flushing a toilet or sewer.',
      },
      {
        id: '019',
        name: 'Water Closet with 1.6 GPF',
        qty: 0,
        imgUrl: waterClosetOnePointSix.src,
        category: 'general',
        description: 'An enclosed room or compartment containing a toilet bowl fitted with a mechanism for flushing.',
      },
    ],
    setItems: (items) => set({ items }),

    declaredItems: [],
    setDeclaredItems: (declaredItems) => set({ declaredItems }),
  }))
);
