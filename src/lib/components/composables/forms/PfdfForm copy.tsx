'use client';
import { useApplicationFormStepStore } from '@nsa/lib/zustand/useApplicationFormStore';
import { Button } from '../../ui/Button';
import { usePageContext } from '../new-service-application/NewServiceApplicationPage';
import { CheckCircle2, LucideLightbulb, PlusCircle } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../../ui/Sheet';
import { Alert, AlertDescription, AlertTitle } from '../../ui/Alert';
import { usePfdfStore } from '@nsa/lib/zustand/usePfdfStore';
import { FunctionComponent, useState } from 'react';
import { ItemWithQty } from '@nsa/lib/utils/types/item';

export const PfdfForm: FunctionComponent = () => {
  const setCurrentStep = useApplicationFormStepStore((state) => state.setCurrentStep);
  const currentStep = useApplicationFormStepStore((state) => state.currentStep);
  const tempBathtubQty = usePfdfStore((state) => state.tempBathtubQty);
  const setTempBathtubQty = usePfdfStore((state) => state.setTempBathtubQty);
  const bathtubQty = usePfdfStore((state) => state.bathtubQty);
  const setBathtubQty = usePfdfStore((state) => state.setBathtubQty);
  const bathtubSheetIsOpen = usePfdfStore((state) => state.bathtubSheetIsOpen);
  const setBathtubSheetIsOpen = usePfdfStore((state) => state.setBathtubSheetIsOpen);
  const bidetSheetIsOpen = usePfdfStore((state) => state.bidetSheetIsOpen);
  const setBidetSheetIsOpen = usePfdfStore((state) => state.setBidetSheetIsOpen);
  const tempBidetQty = usePfdfStore((state) => state.tempBidetQty);
  const setTempBidetQty = usePfdfStore((state) => state.setTempBidetQty);
  const bidetQty = usePfdfStore((state) => state.bidetQty);
  const setBidetQty = usePfdfStore((state) => state.setBidetQty);
  const clothesWasherQty = usePfdfStore((state) => state.clothesWasherQty);
  const setClothesWasherQty = usePfdfStore((state) => state.setClothesWasherQty);
  const tempClothesWasherQty = usePfdfStore((state) => state.tempClothesWasherQty);
  const setTempClothesWasherQty = usePfdfStore((state) => state.setTempClothesWasherQty);
  const dishwasherQty = usePfdfStore((state) => state.dishwasherQty);
  const setDishwasherQty = usePfdfStore((state) => state.setDishwasherQty);
  const tempDishwasherQty = usePfdfStore((state) => state.tempDishwasherQty);
  const setTempDishwasherQty = usePfdfStore((state) => state.setTempDishwasherQty);
  const dishwasherSheetIsOpen = usePfdfStore((state) => state.dishwasherSheetIsOpen);
  const setDishwasherSheetIsOpen = usePfdfStore((state) => state.setDishwasherSheetIsOpen);
  const drinkingFountainQty = usePfdfStore((state) => state.drinkingFountainQty);
  const setDrinkingFountainQty = usePfdfStore((state) => state.setDrinkingFountainQty);
  const tempDrinkingFountainQty = usePfdfStore((state) => state.tempDrinkingFountainQty);
  const setTempDrinkingFountainQty = usePfdfStore((state) => state.setTempDrinkingFountainQty);
  const drinkingFountainSheetIsOpen = usePfdfStore((state) => state.drinkingFountainSheetIsOpen);
  const setDrinkingFountainSheetIsOpen = usePfdfStore((state) => state.setDrinkingFountainSheetIsOpen);
  const cuspidorQty = usePfdfStore((state) => state.cuspidorQty);
  const setCuspidorQty = usePfdfStore((state) => state.setCuspidorQty);
  const tempCuspidorQty = usePfdfStore((state) => state.tempCuspidorQty);
  const setTempCuspidorQty = usePfdfStore((state) => state.setTempCuspidorQty);
  const cuspidorSheetIsOpen = usePfdfStore((state) => state.cuspidorSheetIsOpen);
  const setCuspidorSheetIsOpen = usePfdfStore((state) => state.setCuspidorSheetIsOpen);
  const items = usePfdfStore((state) => state.items);
  const setItems = usePfdfStore((state) => state.setItems);

  const clothesWasherSheetIsOpen = usePfdfStore((state) => state.clothesWasherSheetIsOpen);
  const setClothesWasherSheetIsOpen = usePfdfStore((state) => state.setClothesWasherSheetIsOpen);
  const [tempQty, setTempQty] = useState<number>(0);

  // // temporary list of items
  // const Items: Array<ItemWithQtyState> = [
  //   {
  //     id: '001',
  //     name: 'Bathtub',
  //     qty: bathtubQty,
  //     imgUrl: bathtub.src,
  //     open: bathtubSheetIsOpen,
  //     onOpenChange: setBathtubSheetIsOpen,
  //   },
  //   {
  //     id: '002',
  //     name: 'Bidet',
  //     qty: bidetQty,
  //     imgUrl: bidet.src,
  //     open: bidetSheetIsOpen,
  //     onOpenChange: setBidetSheetIsOpen,
  //   },
  //   {
  //     id: '003',
  //     name: 'Clothes Washer',
  //     qty: clothesWasherQty,
  //     imgUrl: clothesWasher.src,
  //     open: clothesWasherSheetIsOpen,
  //     onOpenChange: setClothesWasherSheetIsOpen,
  //   },
  //   {
  //     id: '004',
  //     name: 'Domestic Dishwasher',
  //     qty: dishwasherQty,
  //     imgUrl: domesticDishwasher.src,
  //     open: dishwasherSheetIsOpen,
  //     onOpenChange: setDishwasherSheetIsOpen,
  //   },
  //   {
  //     id: '005',
  //     name: 'Cuspidor',
  //     qty: cuspidorQty,
  //     imgUrl: cuspidor.src,
  //     open: cuspidorSheetIsOpen,
  //     onOpenChange: setCuspidorSheetIsOpen,
  //   },
  //   {
  //     id: '006',
  //     name: 'Drinking Fountain',
  //     qty: drinkingFountainQty,
  //     imgUrl: drinkingFountain.src,
  //     open: drinkingFountainSheetIsOpen,
  //     onOpenChange: setDrinkingFountainSheetIsOpen,
  //   },
  // ];

  const { pageRef } = usePageContext();

  // set state
  const setNewItemQty = (currentItems: Array<ItemWithQty>, newItem: ItemWithQty, newQty: number) => {
    const newItems = currentItems.map((item) => {
      return { ...item, qty: item.id === newItem.id ? newQty : item.qty };
    });

    setItems(newItems);
  };

  const stateGetter = (item: ItemWithQty) => {
    if (item.id === '001') return bathtubSheetIsOpen;
    else if (item.id === '002') return bidetSheetIsOpen;
    else if (item.id === '003') return clothesWasherSheetIsOpen;
    else if (item.id === '004') return dishwasherSheetIsOpen;
    else if (item.id === '005') return cuspidorSheetIsOpen;
    else if (item.id === '006') return drinkingFountainSheetIsOpen;
  };

  const setStateGetter = (item: ItemWithQty) => {
    if (item.id === '001') return setBathtubSheetIsOpen;
    else if (item.id === '002') return setBidetSheetIsOpen;
    else if (item.id === '003') return setClothesWasherSheetIsOpen;
    else if (item.id === '004') return setDishwasherSheetIsOpen;
    else if (item.id === '005') return setCuspidorSheetIsOpen;
    else if (item.id === '006') return setDrinkingFountainSheetIsOpen;
  };

  return (
    <>
      <div className="text-xl font-medium text-gray-600 mb-2 flex gap-1 items-center mt-10 ">
        <span>Plumbing and Fixtures Declaration</span>
      </div>
      <Alert>
        <div className="flex gap-2">
          <div className="flex justify-center items-start ">
            <LucideLightbulb className="sm:h-10 sm:w-10 lg:h-12 lg:w-12" />
          </div>
          <div>
            <AlertTitle className="text-amber-500">Information</AlertTitle>
            <AlertDescription>
              You shall declare your existing plumbing and fixtures. Click each item to add.
            </AlertDescription>
          </div>
        </div>
      </Alert>
      <div className="flex w-full justify-end">
        <Sheet>
          <SheetTrigger className="flex mt-5">
            {bidetQty + bathtubQty + clothesWasherQty + dishwasherQty !== 0 && (
              <div className="w-6 h-6 rounded-full bg-white -mt-2 -mr-3 z-10 items-center text-center border border-green-300 text-green-500 flex justify-center text-sm">
                {bidetQty + bathtubQty + clothesWasherQty + dishwasherQty}
              </div>
            )}
            <div className="flex gap-2 items-center text-white border  bg-green-500 p-2 rounded hover:scale-105 transition-all hover:bg-green-600">
              <span className="text-sm items-center flex gap-2">Declared Summary </span>
            </div>
          </SheetTrigger>
          <SheetContent className="bg-white">
            <SheetTitle>Declared Figures</SheetTitle>
            <SheetDescription>List of declared figures</SheetDescription>
            <div className="flex flex-col gap-8 pt-8">
              {/* Bathtub */}
              <div className="flex items-center">
                <div className="flex gap-2 items-center">
                  <div className="flex gap-2">
                    <div
                      className="border w-6 h-6 items-center text-center rounded select-none text-primary"
                      role="button"
                      onClick={() => {
                        setBathtubQty(bathtubQty === 0 ? bathtubQty : bathtubQty - 1);
                        setTempBathtubQty(tempBathtubQty === 0 ? tempBathtubQty : tempBathtubQty - 1);
                      }}
                    >
                      -
                    </div>
                    <div className="select-none">{bathtubQty}</div>
                    <div
                      className="border w-6 h-6 items-center text-center rounded select-none text-primary"
                      role="button"
                      onClick={() => {
                        setBathtubQty(bathtubQty + 1);
                        setTempBathtubQty(tempBathtubQty + 1);
                      }}
                    >
                      +
                    </div>
                  </div>
                  <img src={bathtub.src} alt="bathtub" className="w-12 h-12 border border-gray-100/90 rounded" />
                  <div className="font-semibold font-sans">Bathtub</div>
                </div>
              </div>

              {/* Bidet */}
              <div className="flex justify-between  items-center">
                <div className="flex items-center gap-2">
                  <div className="flex gap-2">
                    <div
                      className="border w-6 h-6 items-center text-center rounded select-none text-primary"
                      role="button"
                      onClick={() => {
                        setBidetQty(bidetQty === 0 ? bidetQty : bidetQty - 1);
                        setTempBidetQty(tempBidetQty === 0 ? tempBidetQty : tempBidetQty - 1);
                      }}
                    >
                      -
                    </div>
                    <div className="select-none">{bidetQty}</div>
                    <div
                      className="border w-6 h-6 items-center text-center rounded select-none text-primary"
                      role="button"
                      onClick={() => {
                        setBidetQty(bidetQty + 1);
                        setTempBidetQty(tempBidetQty + 1);
                      }}
                    >
                      +
                    </div>
                  </div>
                  <img src={bidet.src} alt="bathtub" className="w-12 h-12 border border-gray-100/90 rounded" />
                  <div className="font-semibold font-sans">Bidet</div>
                </div>
              </div>

              {/* Clothes Washer */}
              <div className="flex items-center">
                <div className="flex gap-2 items-center">
                  <div className="flex gap-2">
                    <div
                      className="border w-6 h-6 items-center text-center rounded select-none text-primary"
                      role="button"
                      onClick={() => {
                        setClothesWasherQty(clothesWasherQty === 0 ? clothesWasherQty : clothesWasherQty - 1);
                        setTempClothesWasherQty(
                          tempClothesWasherQty === 0 ? tempClothesWasherQty : tempClothesWasherQty - 1
                        );
                      }}
                    >
                      -
                    </div>
                    <div className="select-none">{clothesWasherQty}</div>
                    <div
                      className="border w-6 h-6 items-center text-center rounded select-none text-primary"
                      role="button"
                      onClick={() => {
                        setClothesWasherQty(clothesWasherQty + 1);
                        setTempClothesWasherQty(tempClothesWasherQty + 1);
                      }}
                    >
                      +
                    </div>
                  </div>
                  <img src={clothesWasher.src} alt="bathtub" className="w-12 h-12 border border-gray-100/90 rounded" />
                  <div className="font-semibold font-sans">Clothes Washer</div>
                </div>
              </div>

              {/* Dish Washer */}
              <div className="flex items-center">
                <div className="flex gap-2 items-center">
                  <div className="flex gap-2">
                    <div
                      className="border w-6 h-6 items-center text-center rounded select-none text-primary"
                      role="button"
                      onClick={() => {
                        setDishwasherQty(dishwasherQty === 0 ? dishwasherQty : dishwasherQty - 1);
                        setTempDishwasherQty(tempDishwasherQty === 0 ? tempDishwasherQty : tempDishwasherQty - 1);
                      }}
                    >
                      -
                    </div>
                    <div className="select-none">{dishwasherQty}</div>
                    <div
                      className="border w-6 h-6 items-center text-center rounded select-none text-primary"
                      role="button"
                      onClick={() => {
                        setDishwasherQty(dishwasherQty + 1);
                        setTempDishwasherQty(tempDishwasherQty + 1);
                      }}
                    >
                      +
                    </div>
                  </div>
                  <img
                    src={domesticDishwasher.src}
                    alt="bathtub"
                    className="w-12 h-12 border border-gray-100/90 rounded"
                  />
                  <div className="font-semibold font-sans">Domestic Dishwasher</div>
                </div>
              </div>

              {/* Cuspidor */}
              <div className="flex items-center">
                <div className="flex gap-2 items-center">
                  <div className="flex gap-2">
                    <div
                      className="border w-6 h-6 items-center text-center rounded select-none text-primary"
                      role="button"
                      onClick={() => {
                        setCuspidorQty(cuspidorQty === 0 ? cuspidorQty : cuspidorQty - 1);
                        setTempCuspidorQty(tempCuspidorQty === 0 ? tempCuspidorQty : tempCuspidorQty - 1);
                      }}
                    >
                      -
                    </div>
                    <div className="select-none">{cuspidorQty}</div>
                    <div
                      className="border w-6 h-6 items-center text-center rounded select-none text-primary"
                      role="button"
                      onClick={() => {
                        setCuspidorQty(cuspidorQty + 1);
                        setTempCuspidorQty(tempCuspidorQty + 1);
                      }}
                    >
                      +
                    </div>
                  </div>
                  <img src={cuspidor.src} alt="cuspidor" className="w-12 h-12 border border-gray-100/90 rounded" />
                  <div className="font-semibold font-sans">Cuspidor</div>
                </div>
              </div>

              {/* Drinking Fountain */}
              <div className="flex items-center">
                <div className="flex gap-2 items-center">
                  <div className="flex gap-2">
                    <div
                      className="border w-6 h-6 items-center text-center rounded select-none text-primary"
                      role="button"
                      onClick={() => {
                        setDrinkingFountainQty(
                          drinkingFountainQty === 0 ? drinkingFountainQty : drinkingFountainQty - 1
                        );
                        setTempDrinkingFountainQty(
                          tempDrinkingFountainQty === 0 ? tempDrinkingFountainQty : tempDrinkingFountainQty - 1
                        );
                      }}
                    >
                      -
                    </div>
                    <div className="select-none">{drinkingFountainQty}</div>
                    <div
                      className="border w-6 h-6 items-center text-center rounded select-none text-primary"
                      role="button"
                      onClick={() => {
                        setDrinkingFountainQty(drinkingFountainQty + 1);
                        setTempDrinkingFountainQty(tempDrinkingFountainQty + 1);
                      }}
                    >
                      +
                    </div>
                  </div>
                  <img
                    src={drinkingFountain.src}
                    alt="drinking-fountain"
                    className="w-12 h-12 border border-gray-100/90 rounded"
                  />
                  <div className="font-semibold font-sans">Drinking Fountain</div>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-2 relative py-5">
        {items &&
          items.map((item) => {
            return (
              <Sheet open={stateGetter(item)} onOpenChange={setStateGetter(item)} key={item.id}>
                <SheetTrigger asChild>
                  <section
                    className="w-full justify-between rounded-xl overflow-hidden p-4 border flex gap-2 hover:scale-105 hover:bg-green-50 transition-all"
                    role="button"
                    onClick={() => setTempQty(items.find((currentItem) => currentItem.id === item.id)?.qty ?? 0)}
                  >
                    <div className="flex flex-col justify-between">
                      <div className="font-semibold font-sans">{item.name}</div>

                      <div className="text-gray-600">Qty: {item.qty}</div>
                    </div>
                    <div className="relative flex">
                      <img src={item.imgUrl} alt="item.name" className="w-24 h-24 rounded" />
                      {item.qty > 0 ? (
                        <CheckCircle2 className="stroke-white fill-green-600 hover:cursor-pointer w-8 h-8 absolute bottom-0 right-0" />
                      ) : (
                        <PlusCircle className="stroke-white stroke-1 fill-green-300 hover:cursor-pointer w-8 h-8 absolute bottom-0 right-0" />
                      )}
                    </div>
                  </section>
                </SheetTrigger>
                <SheetContent className="bg-white">
                  <SheetHeader>
                    <SheetTitle>{item.name}</SheetTitle>
                    <SheetDescription>
                      Add how many {item.name}s you have. Click save when you&apos;re done.
                    </SheetDescription>
                  </SheetHeader>

                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2 justify-end">
                      <div
                        className="border w-6 h-6 items-center text-center rounded select-none text-primary"
                        role="button"
                        // onClick={() => setTempBathtubQty(tempBathtubQty === 0 ? tempBathtubQty : tempBathtubQty - 1)}
                        onClick={() => setTempQty(tempQty === 0 ? tempQty : tempQty - 1)}
                      >
                        -
                      </div>
                      <div className="select-none">{tempQty}</div>
                      <div
                        className="border w-6 h-6 items-center text-center rounded select-none text-primary"
                        role="button"
                        // onClick={() => setTempBathtubQty(tempBathtubQty + 1)}
                        onClick={() => setTempQty(tempQty + 1)}
                        // onClick={() => {
                        //   setNewItemQty(items, addItemQty(item));
                        // }}
                      >
                        +
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button
                        onClick={() => {
                          setNewItemQty(items, item, tempQty);

                          // closes the sheet
                          setStateGetter!(item)!(false);
                        }}
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            );
          })}
      </div>

      <div className="flex gap-4 mt-10">
        <Button
          variant="outline"
          type="button"
          onClick={() => {
            setCurrentStep(currentStep - 1);
            pageRef.current.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          Previous
        </Button>

        <Button
          variant="alternative"
          onClick={() => {
            setCurrentStep(currentStep + 1);
            pageRef.current.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          type="button"
        >
          Next
        </Button>
      </div>
    </>
  );
};
