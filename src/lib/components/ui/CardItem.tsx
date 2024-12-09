import { ItemWithQty } from '@nsa/lib/utils/types/item';
import { PlusCircle } from 'lucide-react';
import React, { FunctionComponent } from 'react';

type CardItemProps = {
  img: React.ReactNode;
  item: ItemWithQty;
};

export const CardItem: FunctionComponent<CardItemProps> = ({ img, item }) => {
  return (
    <div className="w-full flex flex-col group hover:border-blue-400 relative rounded p-2 hover:bg-blue-100 hover:scale-[1.06] transition-all h-full">
      <div className="relative flex justify-center bg-white border border-gray-200/75">{img}</div>
      <div className="flex flex-col gap-0 space-y-0 pt-5 py-2 group-hover:scale-95">
        <div className=" text-slate-700 px-0 text-start font-medium group-hover:text-slate-600">{item.name}</div>
        <div className="font-light text-gray-500 text-sm px-0 text-start group-hover:text-slate-500">
          {item.description}
        </div>
      </div>
      {item.qty > 0 ? (
        <div className="stroke-white bg-blue-600 rounded-full hover:cursor-pointer w-6 h-6 absolute top-4 right-4">
          <span className="w-full flex h-full justify-center items-center text-white text-sm">{item.qty}</span>
        </div>
      ) : (
        <PlusCircle className="stroke-blue-500 stroke-1 fill-white hover:cursor-pointer w-6 h-6 absolute top-4 right-4" />
      )}
    </div>
  );
};
