'use client';
import { useApplicationFormStepStore } from '@nsa/lib/zustand/useApplicationFormStore';
import { Button } from '../../ui/Button';
import { usePageContext } from '@nsa/lib/providers/PageProvider';
import { CheckCircle2, LucideLightbulb, PlusCircle } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../../ui/Sheet';
import { Alert, AlertDescription, AlertTitle } from '../../ui/Alert';
import { usePfdfStore } from '@nsa/lib/zustand/usePfdfStore';
import { FunctionComponent, useState } from 'react';
import { ItemWithQty } from '@nsa/lib/utils/types/item';
import Image from 'next/image';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../ui/AlertDialog';
import { Items } from '@nsa/lib/utils/enums/items';

export const PfdfForm: FunctionComponent = () => {
  {
    /* If ever an item needs to 
    be added. add it in the store  */
  }
  const setCurrentStep = useApplicationFormStepStore((state) => state.setCurrentStep);
  const currentStep = useApplicationFormStepStore((state) => state.currentStep);
  const bathtubQty = usePfdfStore((state) => state.bathtubQty);
  const setBathtubQty = usePfdfStore((state) => state.setBathtubQty);
  const bathtubSheetIsOpen = usePfdfStore((state) => state.bathtubSheetIsOpen);
  const setBathtubSheetIsOpen = usePfdfStore((state) => state.setBathtubSheetIsOpen);
  const bidetSheetIsOpen = usePfdfStore((state) => state.bidetSheetIsOpen);
  const setBidetSheetIsOpen = usePfdfStore((state) => state.setBidetSheetIsOpen);
  const bidetQty = usePfdfStore((state) => state.bidetQty);
  const setBidetQty = usePfdfStore((state) => state.setBidetQty);
  const clothesWasherQty = usePfdfStore((state) => state.clothesWasherQty);
  const setClothesWasherQty = usePfdfStore((state) => state.setClothesWasherQty);
  const dishwasherQty = usePfdfStore((state) => state.dishwasherQty);
  const setDishwasherQty = usePfdfStore((state) => state.setDishwasherQty);
  const dishwasherSheetIsOpen = usePfdfStore((state) => state.dishwasherSheetIsOpen);
  const setDishwasherSheetIsOpen = usePfdfStore((state) => state.setDishwasherSheetIsOpen);
  const drinkingFountainQty = usePfdfStore((state) => state.drinkingFountainQty);
  const setDrinkingFountainQty = usePfdfStore((state) => state.setDrinkingFountainQty);
  const drinkingFountainSheetIsOpen = usePfdfStore((state) => state.drinkingFountainSheetIsOpen);
  const setDrinkingFountainSheetIsOpen = usePfdfStore((state) => state.setDrinkingFountainSheetIsOpen);
  const cuspidorQty = usePfdfStore((state) => state.cuspidorQty);
  const setCuspidorQty = usePfdfStore((state) => state.setCuspidorQty);
  const cuspidorSheetIsOpen = usePfdfStore((state) => state.cuspidorSheetIsOpen);
  const setCuspidorSheetIsOpen = usePfdfStore((state) => state.setCuspidorSheetIsOpen);
  const lavatoryQty = usePfdfStore((state) => state.lavatoryQty);
  const setLavatoryQty = usePfdfStore((state) => state.setLavatoryQty);
  const lavatorySheetIsOpen = usePfdfStore((state) => state.lavatorySheetIsOpen);
  const setLavatorySheetIsOpen = usePfdfStore((state) => state.setLavatorySheetIsOpen);
  const hoseBibbQty = usePfdfStore((state) => state.hoseBibbQty);
  const setHoseBibbQty = usePfdfStore((state) => state.setHoseBibbQty);
  const hoseBibbSheetIsOpen = usePfdfStore((state) => state.hoseBibbSheetIsOpen);
  const setHoseBibbSheetIsOpen = usePfdfStore((state) => state.setHoseBibbSheetIsOpen);
  const barSinkQty = usePfdfStore((state) => state.barSinkQty);
  const setBarSinkQty = usePfdfStore((state) => state.setBarSinkQty);
  const barSinkSheetIsOpen = usePfdfStore((state) => state.barSinkSheetIsOpen);
  const setBarSinkSheetIsOpen = usePfdfStore((state) => state.setBarSinkSheetIsOpen);
  const lawnSprinklerQty = usePfdfStore((state) => state.lawnSprinklerQty);
  const setLawnSprinklerQty = usePfdfStore((state) => state.setLawnSprinklerQty);
  const lawnSprinklerSheetIsOpen = usePfdfStore((state) => state.lawnSprinklerSheetIsOpen);
  const setLawnSprinklerSheetIsOpen = usePfdfStore((state) => state.setLawnSprinklerSheetIsOpen);

  const items = usePfdfStore((state) => state.items);
  const setItems = usePfdfStore((state) => state.setItems);
  // const declaredItems = usePfdfStore((state) => state.declaredItems);
  // const setDeclaredItems = usePfdfStore((state) => state.setDeclaredItems);

  const clothesWasherSheetIsOpen = usePfdfStore((state) => state.clothesWasherSheetIsOpen);
  const setClothesWasherSheetIsOpen = usePfdfStore((state) => state.setClothesWasherSheetIsOpen);
  const [tempQty, setTempQty] = useState<number>(0);
  const [itemToRemove, setItemToRemove] = useState<string>('');
  const [alertRemoveIsOpen, setAlertRemoveIsOpen] = useState<boolean>(false);
  // const []

  // // temporary list of items
  // const Items: Array<ItemWithQtyState> = [
  //   {
  //     id: 'Bathtub',
  //     name: 'Bathtub',
  //     qty: bathtubQty,
  //     imgUrl: bathtub.src,
  //     open: bathtubSheetIsOpen,
  //     onOpenChange: setBathtubSheetIsOpen,
  //   },
  //   {
  //     id: 'Bidet',
  //     name: 'Bidet',
  //     qty: bidetQty,
  //     imgUrl: bidet.src,
  //     open: bidetSheetIsOpen,
  //     onOpenChange: setBidetSheetIsOpen,
  //   },
  //   {
  //     id: 'Clothes Washer',
  //     name: 'Clothes Washer',
  //     qty: clothesWasherQty,
  //     imgUrl: clothesWasher.src,
  //     open: clothesWasherSheetIsOpen,
  //     onOpenChange: setClothesWasherSheetIsOpen,
  //   },
  //   {
  //     id: 'Domestic Dishwasher',
  //     name: 'Domestic Dishwasher',
  //     qty: dishwasherQty,
  //     imgUrl: domesticDishwasher.src,
  //     open: dishwasherSheetIsOpen,
  //     onOpenChange: setDishwasherSheetIsOpen,
  //   },
  //   {
  //     id: 'Cuspidor',
  //     name: 'Cuspidor',
  //     qty: cuspidorQty,
  //     imgUrl: cuspidor.src,
  //     open: cuspidorSheetIsOpen,
  //     onOpenChange: setCuspidorSheetIsOpen,
  //   },
  //   {
  //     id: 'Drinking Fountain',
  //     name: 'Drinking Fountain',
  //     qty: drinkingFountainQty,
  //     imgUrl: drinkingFountain.src,
  //     open: drinkingFountainSheetIsOpen,
  //     onOpenChange: setDrinkingFountainSheetIsOpen,
  //   },
  // ];

  const { pageRef } = usePageContext();

  // set new item qty per item
  const setNewItemQty = (currentItems: Array<ItemWithQty>, newItem: ItemWithQty, newQty: number) => {
    const newItems = currentItems.map((item) => {
      return { ...item, qty: item.name === newItem.name ? newQty : item.qty };
    });
    // const tempNewItems = [...newItems];
    // setDeclaredItems(tempNewItems.filter((items) => items.qty > 0));
    setItems(newItems);
  };

  // get the sheet state according to item id
  const sheetStateGetter = (name: string) => {
    if (name === Items.BATHTUB) return bathtubSheetIsOpen;
    else if (name === Items.BIDET) return bidetSheetIsOpen;
    else if (name === Items.CLOTHES_WASHER) return clothesWasherSheetIsOpen;
    else if (name === Items.DOMESTIC_DISHWASHER) return dishwasherSheetIsOpen;
    else if (name === Items.CUSPIDOR) return cuspidorSheetIsOpen;
    else if (name === Items.DRINKING_FOUNTAIN) return drinkingFountainSheetIsOpen;
    else if (name === Items.LAVATORY) return lavatorySheetIsOpen;
    else if (name === Items.HOSE_BIBB) return hoseBibbSheetIsOpen;
    else if (name === Items.BAR_SINK) return barSinkSheetIsOpen;
    else if (name === Items.LAWN_SPRINKLER) return lawnSprinklerSheetIsOpen;
  };

  // get the sheet set state according to item id
  const sheetSetStateGetter = (name: string) => {
    if (name === Items.BATHTUB) return setBathtubSheetIsOpen;
    else if (name === Items.BIDET) return setBidetSheetIsOpen;
    else if (name === Items.CLOTHES_WASHER) return setClothesWasherSheetIsOpen;
    else if (name === Items.DOMESTIC_DISHWASHER) return setDishwasherSheetIsOpen;
    else if (name === Items.CUSPIDOR) return setCuspidorSheetIsOpen;
    else if (name === Items.DRINKING_FOUNTAIN) return setDrinkingFountainSheetIsOpen;
    else if (name === Items.LAVATORY) return setLavatorySheetIsOpen;
    else if (name === Items.HOSE_BIBB) return setHoseBibbSheetIsOpen;
    else if (name === Items.BAR_SINK) return setBarSinkSheetIsOpen;
    else if (name === Items.LAWN_SPRINKLER) return setLawnSprinklerSheetIsOpen;
  };

  // get the qty state according to item id
  const qtyStateGetter = (name: string) => {
    if (name === Items.BATHTUB) return bathtubQty;
    else if (name === Items.BIDET) return bidetQty;
    else if (name === Items.CLOTHES_WASHER) return clothesWasherQty;
    else if (name === Items.DOMESTIC_DISHWASHER) return dishwasherQty;
    else if (name === Items.CUSPIDOR) return cuspidorQty;
    else if (name === Items.DRINKING_FOUNTAIN) return drinkingFountainQty;
    else if (name === Items.LAVATORY) return lavatoryQty;
    else if (name === Items.HOSE_BIBB) return hoseBibbQty;
    else if (name === Items.BAR_SINK) return barSinkQty;
    else if (name === Items.LAWN_SPRINKLER) return lawnSprinklerQty;
  };

  // get the qty set state according to item id
  const qtySetStateGetter = (name: string) => {
    if (name === Items.BATHTUB) return setBathtubQty;
    else if (name === Items.BIDET) return setBidetQty;
    else if (name === Items.CLOTHES_WASHER) return setClothesWasherQty;
    else if (name === Items.DOMESTIC_DISHWASHER) return setDishwasherQty;
    else if (name === Items.CUSPIDOR) return setCuspidorQty;
    else if (name === Items.DRINKING_FOUNTAIN) return setDrinkingFountainQty;
    else if (name === Items.LAVATORY) return setLavatoryQty;
    else if (name === Items.HOSE_BIBB) return setHoseBibbQty;
    else if (name === Items.BAR_SINK) return setBarSinkQty;
    else if (name === Items.LAWN_SPRINKLER) return setLawnSprinklerQty;
  };

  // subtract qty function in summary
  const handleSubtractQty = (name: string, qty: number, setQty: (qty: number) => void) => {
    if (qty === 1) {
      // open the modal if qty is 1
      setAlertRemoveIsOpen(true);

      // set the item name to be removed
      setItemToRemove(name);
    } else if (qty === 0) {
      setQty(qty);
    } else if (qty > 1) {
      // subtract the quantity
      setQty(qty - 1);
      setItems(
        items.map((item: ItemWithQty) => {
          return {
            ...item,
            qty: item.name === name ? (qty === 0 ? qty : qty! - 1) : item.qty,
          };
        })
      );
    }
  };

  return (
    <>
      <AlertDialog open={alertRemoveIsOpen} onOpenChange={setAlertRemoveIsOpen}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to remove this item?</AlertDialogTitle>
            <AlertDialogDescription>You may add the item later if needed.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                const setItemQty = qtySetStateGetter(itemToRemove);

                // set the specific item qty to 0
                setItemQty!(0);

                // set all items, specific qty to 0
                setItems(
                  items.map((item: ItemWithQty) => {
                    return {
                      ...item,
                      qty: item.name === itemToRemove ? 0 : item.qty,
                    };
                  })
                );

                // declaredItems.splice(indexToRemove!, 1);
              }}
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
            {bidetQty +
              bathtubQty +
              clothesWasherQty +
              dishwasherQty +
              cuspidorQty +
              drinkingFountainQty +
              lavatoryQty +
              hoseBibbQty +
              barSinkQty +
              lawnSprinklerQty !==
              0 && (
              <div className="w-6 h-6 rounded-full bg-white -mt-2 -mr-3 z-10 items-center text-center border border-green-300 text-green-500 flex justify-center text-sm">
                {bidetQty +
                  bathtubQty +
                  clothesWasherQty +
                  dishwasherQty +
                  cuspidorQty +
                  drinkingFountainQty +
                  lavatoryQty +
                  hoseBibbQty +
                  barSinkQty +
                  lawnSprinklerQty}
              </div>
            )}
            <div className="flex gap-2 items-center text-white border  bg-green-500 p-2 rounded transition-all hover:bg-green-600">
              <span className="text-sm items-center flex gap-2">Declared Summary </span>
            </div>
          </SheetTrigger>
          <SheetContent className="bg-white">
            <SheetTitle>Declared Figures</SheetTitle>
            <SheetDescription>List of declared figures</SheetDescription>
            <div className="flex flex-col gap-8 pt-8">
              {items &&
                items.map((declaredItem) => {
                  const itemQty = qtyStateGetter(declaredItem.name);
                  const setItemQty = qtySetStateGetter(declaredItem.name);
                  // setTempItemQty!(itemQty!);

                  if (declaredItem.qty > 0)
                    return (
                      <div className="flex items-center" key={declaredItem.id}>
                        <div className="flex gap-2 items-center">
                          <div className="flex gap-2">
                            <div
                              className="border w-6 h-6 items-center text-center rounded select-none text-primary"
                              role="button"
                              onClick={() => {
                                handleSubtractQty(declaredItem.name, itemQty!, setItemQty!);
                              }}
                            >
                              -
                            </div>
                            <div className="select-none">{itemQty}</div>
                            <div
                              className="border w-6 h-6 items-center text-center rounded select-none text-primary"
                              role="button"
                              onClick={() => {
                                setItemQty!(itemQty! + 1);
                                setItems(
                                  items.map((item) => {
                                    return {
                                      ...item,
                                      qty: item.name === declaredItem.name ? itemQty! + 1 : item.qty,
                                    };
                                  })
                                );

                                // setTempDrinkingFountainQty(tempDrinkingFountainQty + 1);
                              }}
                            >
                              +
                            </div>
                          </div>
                          <Image
                            src={declaredItem.imgUrl!}
                            alt={declaredItem.name}
                            width={56}
                            height={56}
                            className=" border border-gray-100/90 rounded"
                          />
                          <div className="font-semibold font-sans">{declaredItem.name}</div>
                        </div>
                      </div>
                    );
                })}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-2 relative py-5">
        {items &&
          items.map((item) => {
            return (
              <Sheet open={sheetStateGetter(item.name)} onOpenChange={sheetSetStateGetter(item.name)} key={item.id}>
                <SheetTrigger asChild>
                  <section
                    className="w-full justify-between rounded-xl overflow-hidden p-4 border flex gap-2 hover:scale-[1.02] hover:bg-green-50 transition-all"
                    role="button"
                    onClick={() => setTempQty(items.find((currentItem) => currentItem.name === item.name)?.qty ?? 0)}
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
                        <PlusCircle className="stroke-green-500 stroke-1 fill-white hover:cursor-pointer w-8 h-8 absolute bottom-0 right-0" />
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

                          qtySetStateGetter(item.name)!(tempQty);
                          // closes the sheet
                          sheetSetStateGetter!(item.name)!(false);
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
