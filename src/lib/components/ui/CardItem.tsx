import { ItemWithQty } from '@nsa/lib/utils/types/item';
import { PlusCircle } from 'lucide-react';
import React, { FunctionComponent } from 'react';

type CardItemProps = {
  img: React.ReactNode;
  item: ItemWithQty;
};

export const CardItem: FunctionComponent<CardItemProps> = ({ img, item }) => {
  return (
    <div className="w-full flex flex-col bg-gray-50 border border-gray-50 hover:border-green-400 relative rounded p-2 hover:bg-green-50 hover:scale-[1.02] transition-all h-full">
      <div className="relative flex justify-center bg-white">{img}</div>
      <div className="flex flex-col gap-0 space-y-0 pt-5">
        <div className=" text-blue-600 px-0 text-start">{item.name}</div>
        <div className="font-light text-gray-600 text-sm px-0 text-start">{item.description}</div>
      </div>
      {item.qty > 0 ? (
        <div className="stroke-white bg-green-600 rounded-full hover:cursor-pointer w-6 h-6 absolute top-2 right-2">
          <span className="w-full flex h-full justify-center items-center text-white text-sm">{item.qty}</span>
        </div>
      ) : (
        <PlusCircle className="stroke-green-500 stroke-1 fill-white hover:cursor-pointer w-6 h-6 absolute top-2 right-2" />
      )}
    </div>
  );
};
