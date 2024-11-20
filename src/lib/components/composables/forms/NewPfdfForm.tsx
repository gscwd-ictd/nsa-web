import { LucideLightbulb } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../../ui/Alert';
import { useState } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../../ui/Sheet';
import { Button } from '../../ui/Button';
import { usePfdfStore } from '@nsa/lib/zustand/usePfdfStore';
import { usePageContext } from '../new-service-application/NewServiceApplicationPage';
import { useApplicationFormStepStore } from '@nsa/lib/zustand/useApplicationFormStore';
import { ItemWithQty } from '@nsa/lib/utils/types/item';
import { CardItem } from '../../ui/CardItem';
import { Trash } from 'lucide-react';
import { HiMinus, HiPlus } from 'react-icons/hi2';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogFooter,
  AlertDialogAction,
} from '../../ui/AlertDialog';

export const NewPfdfForm = () => {
  const [activeSheet, setActiveSheet] = useState<string | null>(null);
  const [tempQty, setTempQty] = useState<number>(1);
  const [dialogSummaryIsOpen, setDialogSummaryIsOpen] = useState<boolean>(false);

  const items = usePfdfStore((state) => state.items);
  const setItems = usePfdfStore((state) => state.setItems);
  const declaredItems = usePfdfStore((state) => state.declaredItems);
  const setDeclaredItems = usePfdfStore((state) => state.setDeclaredItems);
  const setCurrentStep = useApplicationFormStepStore((state) => state.setCurrentStep);
  const currentStep = useApplicationFormStepStore((state) => state.currentStep);

  // page context
  const { pageRef } = usePageContext();

  // calculate total quantity
  const totalQty = items.reduce((total, item) => total + item.qty, 0);

  return (
    <div className="h-full relative">
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

      <div className="flex flex-row sm:flex-col lg:flex-row gap-4">
        <div className="sm:w-full lg:w-[70%] w-full  border rounded-md p-4 mt-4">
          <div className="">
            {/* General Category */}
            <div className=" grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative">
              {/* GENERAL */}
              {items &&
                items.map((item: ItemWithQty) => {
                  if (item.category === 'none')
                    return (
                      <Sheet
                        open={activeSheet === item.id}
                        onOpenChange={(isOpen) => {
                          setActiveSheet(isOpen ? item.id! : null);
                          setTempQty(1);
                        }}
                        key={item.id}
                      >
                        <SheetTrigger>
                          {/* <div className="w-full justify-between rounded-xl overflow-hidden p-4 border flex gap-2 hover:scale-[1.02] hover:bg-green-50 transition-all">
                          <div className="flex flex-col justify-between">
                            <div className="font-semibold font-sans">{item.name}</div>

                            <div className="text-gray-600">{item.description}</div>
                          </div>
                          <div className="relative flex">
                            <img src={item.imgUrl} alt={item.name} className="w-24 h-24 rounded" />
                            {item.qty > 0 ? (
                              <div className="stroke-white bg-green-600 rounded-full hover:cursor-pointer w-8 h-8 absolute bottom-0 right-0">
                                <span className="w-full flex h-full justify-center items-center text-white text-base">
                                  {item.qty}
                                </span>
                              </div>
                            ) : (
                              <PlusCircle className="stroke-green-500 stroke-1 fill-white hover:cursor-pointer w-8 h-8 absolute bottom-0 right-0" />
                            )}
                          </div>
                        </div> */}

                          <CardItem
                            img={<img src={item.imgUrl} alt={item.name} className="w-24 h-24 rounded" />}
                            item={item}
                          />
                        </SheetTrigger>

                        <SheetContent className="bg-white">
                          <SheetHeader>
                            <SheetTitle>{item.name}</SheetTitle>
                            <SheetDescription>Add how many {item.name}s you have.</SheetDescription>
                          </SheetHeader>

                          <div className="flex flex-col gap-2">
                            <div className="flex gap-2 justify-end">
                              <button
                                className="border w-6 h-6 items-center text-center rounded select-none text-primary disabled:cursor-not-allowed"
                                role="button"
                                onClick={() => setTempQty(tempQty === 0 ? tempQty : tempQty - 1)}
                                disabled={tempQty === 1 ? true : false}
                              >
                                -
                              </button>
                              <div className="select-none">{tempQty}</div>
                              <div
                                className="border w-6 h-6 items-center text-center rounded select-none text-primary"
                                role="button"
                                onClick={() => setTempQty(tempQty + 1)}
                              >
                                +
                              </div>
                            </div>
                            <div className="flex justify-end">
                              <Button
                                onClick={() => {
                                  const tempItems = [...items];
                                  const tempNewItems = [...declaredItems];

                                  if (declaredItems.filter((declaredItem) => declaredItem.id === item.id).length > 0) {
                                    setDeclaredItems(
                                      declaredItems.map((tempNewItem) => {
                                        return {
                                          ...tempNewItem,
                                          qty: tempNewItem.id === item.id ? tempNewItem.qty + tempQty : tempNewItem.qty,
                                        };
                                      })
                                    );
                                    setItems(
                                      tempItems.map((tempItem) =>
                                        tempItem.id === item.id
                                          ? { ...tempItem, qty: tempItem.qty + tempQty }
                                          : tempItem
                                      )
                                    );
                                    setTempQty(1);
                                    setActiveSheet(null);
                                  } else if (
                                    declaredItems.filter((declaredItem) => declaredItem.id === item.id).length === 0
                                  ) {
                                    tempNewItems.push({ ...item, qty: tempQty });
                                    setDeclaredItems(tempNewItems);
                                    setItems(
                                      tempItems.map((tempItem) =>
                                        tempItem.id === item.id
                                          ? { ...tempItem, qty: tempItem.qty + tempQty }
                                          : tempItem
                                      )
                                    );
                                    setTempQty(1);
                                    setActiveSheet(null);
                                  }
                                }}
                              >
                                Add
                              </Button>
                            </div>
                          </div>
                        </SheetContent>
                      </Sheet>
                    );
                })}
            </div>

            {/* Sinks Category */}
            <div className="px-2 pt-5 pb-1">
              <span className="px-2  bg-green-600 text-white text-base rounded">Sinks</span>
            </div>
            <div className=" grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative">
              {items &&
                items.map((item) => {
                  if (item.category === 'sink')
                    return (
                      <Sheet
                        open={activeSheet === item.id}
                        onOpenChange={(isOpen) => setActiveSheet(isOpen ? item.id! : null)}
                        key={item.id}
                      >
                        <SheetTrigger>
                          {/* <section
                          className="w-full justify-between rounded-xl overflow-hidden p-4 border flex gap-2 hover:scale-[1.02] hover:bg-green-50 transition-all"
                    
                        >
                          <div className="flex flex-col justify-between">
                            <div className="font-semibold font-sans">{item.name}</div>

                            <div className="text-gray-600">{item.description}</div>
                          </div>
                          <div className="relative flex">
                            <img src={item.imgUrl} alt={item.name} className="w-24 h-24 rounded" />
                            {item.qty > 0 ? (
                              <div className="stroke-white bg-green-600 rounded-full hover:cursor-pointer w-8 h-8 absolute bottom-0 right-0">
                                <span className="w-full flex h-full justify-center items-center text-white text-base">
                                  {item.qty}
                                </span>
                              </div>
                            ) : (
                              <PlusCircle className="stroke-green-500 stroke-1 fill-white hover:cursor-pointer w-8 h-8 absolute bottom-0 right-0" />
                            )}
                          </div>
                        </section> */}
                          <CardItem
                            img={<img src={item.imgUrl} alt={item.name} className="w-24 h-24 rounded" />}
                            item={item}
                          />
                        </SheetTrigger>

                        <SheetContent className="bg-white">
                          <SheetHeader>
                            <SheetTitle>{item.name}</SheetTitle>
                            <SheetDescription>Add how many {item.name}s you have.</SheetDescription>
                          </SheetHeader>

                          <div className="flex flex-col gap-2">
                            <div className="flex gap-2 justify-end">
                              <button
                                className="border w-6 h-6 items-center text-center rounded select-none text-primary disabled:cursor-not-allowed"
                                onClick={() => setTempQty(tempQty === 0 ? tempQty : tempQty - 1)}
                                disabled={tempQty === 1 ? true : false}
                              >
                                -
                              </button>
                              <div className="select-none">{tempQty}</div>
                              <div
                                className="border w-6 h-6 items-center text-center rounded select-none text-primary"
                                role="button"
                                onClick={() => setTempQty(tempQty + 1)}
                              >
                                +
                              </div>
                            </div>
                            <div className="flex justify-end">
                              <Button
                                onClick={() => {
                                  const tempItems = [...items];
                                  const tempNewItems = [...declaredItems];

                                  if (declaredItems.filter((declaredItem) => declaredItem.id === item.id).length > 0) {
                                    setDeclaredItems(
                                      declaredItems.map((tempNewItem) => {
                                        return {
                                          ...tempNewItem,
                                          qty: tempNewItem.id === item.id ? tempNewItem.qty + tempQty : tempNewItem.qty,
                                        };
                                      })
                                    );
                                    setItems(
                                      tempItems.map((tempItem) =>
                                        tempItem.id === item.id
                                          ? { ...tempItem, qty: tempItem.qty + tempQty }
                                          : tempItem
                                      )
                                    );
                                    setTempQty(1);
                                    setActiveSheet(null);
                                  } else if (
                                    declaredItems.filter((declaredItem) => declaredItem.id === item.id).length === 0
                                  ) {
                                    tempNewItems.push({ ...item, qty: tempQty });
                                    setDeclaredItems(tempNewItems);
                                    setItems(
                                      tempItems.map((tempItem) =>
                                        tempItem.id === item.id
                                          ? { ...tempItem, qty: tempItem.qty + tempQty }
                                          : tempItem
                                      )
                                    );
                                    setTempQty(1);
                                    setActiveSheet(null);
                                  }
                                }}
                              >
                                Add
                              </Button>
                            </div>
                          </div>
                        </SheetContent>
                      </Sheet>
                    );
                })}
            </div>

            {/* Urinals Category */}
            <div className="px-2 pt-5 pb-1">
              <span className="px-2  bg-green-600 text-white text-base rounded">Urinals</span>
            </div>
            <div className=" grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative">
              {items &&
                items.map((item) => {
                  if (item.category === 'urinal')
                    return (
                      <Sheet
                        open={activeSheet === item.id}
                        onOpenChange={(isOpen) => setActiveSheet(isOpen ? item.id! : null)}
                        key={item.id}
                      >
                        <SheetTrigger>
                          {/* <section
                          className="w-full justify-between rounded-xl overflow-hidden p-4 border flex gap-2 hover:scale-[1.02] hover:bg-green-50 transition-all"
                    
                        >
                          <div className="flex flex-col justify-between">
                            <div className="font-semibold font-sans">{item.name}</div>

                            <div className="text-gray-600">{item.description}</div>
                          </div>
                          <div className="relative flex">
                            <img src={item.imgUrl} alt={item.name} className="w-24 h-24 rounded" />
                            {item.qty > 0 ? (
                              <div className="stroke-white bg-green-600 rounded-full hover:cursor-pointer w-8 h-8 absolute bottom-0 right-0">
                                <span className="w-full flex h-full justify-center items-center text-white text-base">
                                  {item.qty}
                                </span>
                              </div>
                            ) : (
                              <PlusCircle className="stroke-green-500 stroke-1 fill-white hover:cursor-pointer w-8 h-8 absolute bottom-0 right-0" />
                            )}
                          </div>
                        </section> */}
                          <CardItem
                            img={<img src={item.imgUrl} alt={item.name} className="w-24 h-24 rounded" />}
                            item={item}
                          />
                        </SheetTrigger>

                        <SheetContent className="bg-white">
                          <SheetHeader>
                            <SheetTitle>{item.name}</SheetTitle>
                            <SheetDescription>Add how many {item.name}s you have.</SheetDescription>
                          </SheetHeader>

                          <div className="flex flex-col gap-2">
                            <div className="flex gap-2 justify-end">
                              <button
                                className="border w-6 h-6 items-center text-center rounded select-none text-primary disabled:cursor-not-allowed"
                                onClick={() => setTempQty(tempQty === 0 ? tempQty : tempQty - 1)}
                                disabled={tempQty === 1 ? true : false}
                              >
                                -
                              </button>
                              <div className="select-none">{tempQty}</div>
                              <div
                                className="border w-6 h-6 items-center text-center rounded select-none text-primary"
                                role="button"
                                onClick={() => setTempQty(tempQty + 1)}
                              >
                                +
                              </div>
                            </div>
                            <div className="flex justify-end">
                              <Button
                                onClick={() => {
                                  const tempItems = [...items];
                                  const tempNewItems = [...declaredItems];

                                  if (declaredItems.filter((declaredItem) => declaredItem.id === item.id).length > 0) {
                                    setDeclaredItems(
                                      declaredItems.map((tempNewItem) => {
                                        return {
                                          ...tempNewItem,
                                          qty: tempNewItem.id === item.id ? tempNewItem.qty + tempQty : tempNewItem.qty,
                                        };
                                      })
                                    );
                                    setItems(
                                      tempItems.map((tempItem) =>
                                        tempItem.id === item.id
                                          ? { ...tempItem, qty: tempItem.qty + tempQty }
                                          : tempItem
                                      )
                                    );
                                    setTempQty(1);
                                    setActiveSheet(null);
                                  } else if (
                                    declaredItems.filter((declaredItem) => declaredItem.id === item.id).length === 0
                                  ) {
                                    tempNewItems.push({ ...item, qty: tempQty });
                                    setDeclaredItems(tempNewItems);
                                    setItems(
                                      tempItems.map((tempItem) =>
                                        tempItem.id === item.id
                                          ? { ...tempItem, qty: tempItem.qty + tempQty }
                                          : tempItem
                                      )
                                    );
                                    setTempQty(1);
                                    setActiveSheet(null);
                                  }
                                }}
                              >
                                Add
                              </Button>
                            </div>
                          </div>
                        </SheetContent>
                      </Sheet>
                    );
                })}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="sm:hidden hidden md:hidden lg:block lg:w-[30%] px-4 my-4 border rounded-md h-[44rem] max-h-screen overflow-y-auto">
          {totalQty > 0 ? (
            <>
              <span className="w-full flex justify-center font-medium py-2">Summary</span>
              <div className="grid grid-cols-1 gap-4">
                {declaredItems.map((declaredItem, idx) => {
                  // setTempItemQty!(itemQty!);

                  return (
                    <div className="flex items-center" key={declaredItem.id}>
                      <div className="flex gap-2 items-center w-full">
                        <div className="grid grid-cols-3 gap-0 w-1/3 items-center ">
                          {declaredItem.qty > 1 ? (
                            <button
                              className="border flex justify-center py-2 items-center text-center font-medium rounded select-none text-primary"
                              onClick={() => {
                                setItems(
                                  items.map((item) => {
                                    return { ...item, qty: item.id === declaredItem.id ? item.qty - 1 : item.qty };
                                  })
                                );

                                // just subtract the quantity from the array
                                if (declaredItem.qty > 1) {
                                  setDeclaredItems(
                                    declaredItems.map((item) => {
                                      return {
                                        ...item,
                                        qty: item.name === declaredItem.name ? item.qty - 1 : item.qty,
                                      };
                                    })
                                  );
                                }
                                // remove the element from the array based on the index
                                else if (declaredItem.qty === 1) {
                                  // deep copy of declaredItems
                                  const newDeclaredItems = declaredItems.map((declaredItem) => {
                                    return declaredItem;
                                  });
                                  newDeclaredItems.splice(idx, 1);

                                  setDeclaredItems(newDeclaredItems);
                                }
                              }}
                            >
                              <HiMinus className="size-3 shrink-0 stroke-[1.5]" />
                            </button>
                          ) : (
                            <button
                              className=" flex justify-center items-center text-center rounded select-none text-gray-500"
                              onClick={() => {
                                setItems(
                                  items.map((item) => {
                                    return { ...item, qty: item.id === declaredItem.id ? item.qty - 1 : item.qty };
                                  })
                                );

                                // just subtract the quantity from the array
                                if (declaredItem.qty > 1) {
                                  setDeclaredItems(
                                    declaredItems.map((item) => {
                                      return {
                                        ...item,
                                        qty: item.name === declaredItem.name ? item.qty - 1 : item.qty,
                                      };
                                    })
                                  );
                                }
                                // remove the element from the array based on the index
                                else if (declaredItem.qty === 1) {
                                  // deep copy of declaredItems
                                  const newDeclaredItems = declaredItems.map((declaredItem) => {
                                    return declaredItem;
                                  });
                                  newDeclaredItems.splice(idx, 1);

                                  setDeclaredItems(newDeclaredItems);
                                }
                              }}
                            >
                              <Trash className="size-5 shrink-0 stroke-[1.5]" />
                            </button>
                          )}

                          <div className="select-none text-center items-center text-sm">{declaredItem.qty}</div>
                          <button
                            className="border flex py-2 justify-center items-center text-center rounded select-none text-primary"
                            onClick={() => {
                              // setItemQty!(itemQty! + 1);
                              setDeclaredItems(
                                declaredItems.map((item) => {
                                  return {
                                    ...item,
                                    qty: item.name === declaredItem.name ? item.qty + 1 : item.qty,
                                  };
                                })
                              );

                              setItems(
                                items.map((item) => {
                                  return { ...item, qty: item.id === declaredItem.id ? item.qty + 1 : item.qty };
                                })
                              );
                            }}
                          >
                            <HiPlus className="size-3 shrink-0 stroke-[1.5]" />
                          </button>
                        </div>
                        {/* <Image
                          src={declaredItem.imgUrl!}
                          alt={declaredItem.name}
                          width={52}
                          height={52}
                          className=" border border-gray-100/90 rounded overflow-hidden"
                        /> */}
                        <div className="w-2/3">
                          <div className="text-sm font-medium font-sans">{declaredItem.name}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : totalQty === 0 ? (
            <div className="flex w-full h-full  justify-center text-center items-center font-medium text-gray-700">
              You haven&apos;t added anything!
            </div>
          ) : null}
        </div>
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

      <AlertDialog open={dialogSummaryIsOpen} onOpenChange={setDialogSummaryIsOpen}>
        <AlertDialogTrigger>
          <div className="fixed items-center sm:block md:block lg:hidden py-2 bottom-1 left-1/2 transform -translate-x-1/2 bg-green-600 px-4 text-xl text-white rounded-md">
            <div className="flex gap-2 items-center">
              Summary{' '}
              {totalQty > 0 && (
                <span className="rounded-full w-6 h-6 flex justify-center items-center bg-white text-green-500 text-sm">
                  {totalQty}
                </span>
              )}
            </div>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent className="max-h-screen overflow-y-auto bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Summary of Declared Items</AlertDialogTitle>
          </AlertDialogHeader>
          <div className=" p-2">
            {totalQty > 0 ? (
              <>
                <div className="grid grid-cols-1 gap-4 border rounded p-2">
                  {declaredItems.map((declaredItem, idx) => {
                    // setTempItemQty!(itemQty!);

                    return (
                      <div className="flex items-center" key={declaredItem.id}>
                        <div className="flex gap-2 items-center w-full">
                          <div className="grid grid-cols-3 gap-0 w-1/3 items-center ">
                            {declaredItem.qty > 1 ? (
                              <button
                                className="border flex justify-center py-2 items-center text-center font-medium rounded select-none text-primary"
                                onClick={() => {
                                  setItems(
                                    items.map((item) => {
                                      return {
                                        ...item,
                                        qty: item.id === declaredItem.id ? item.qty - 1 : item.qty,
                                      };
                                    })
                                  );

                                  // just subtract the quantity from the array
                                  if (declaredItem.qty > 1) {
                                    setDeclaredItems(
                                      declaredItems.map((item) => {
                                        return {
                                          ...item,
                                          qty: item.name === declaredItem.name ? item.qty - 1 : item.qty,
                                        };
                                      })
                                    );
                                  }
                                  // remove the element from the array based on the index
                                  else if (declaredItem.qty === 1) {
                                    // deep copy of declaredItems
                                    const newDeclaredItems = declaredItems.map((declaredItem) => {
                                      return declaredItem;
                                    });
                                    newDeclaredItems.splice(idx, 1);

                                    setDeclaredItems(newDeclaredItems);
                                  }
                                }}
                              >
                                <HiMinus className="size-3 shrink-0 stroke-[1.5]" />
                              </button>
                            ) : (
                              <button
                                className=" flex justify-center items-center text-center rounded select-none text-gray-500"
                                onClick={() => {
                                  setItems(
                                    items.map((item) => {
                                      return {
                                        ...item,
                                        qty: item.id === declaredItem.id ? item.qty - 1 : item.qty,
                                      };
                                    })
                                  );

                                  // just subtract the quantity from the array
                                  if (declaredItem.qty > 1) {
                                    setDeclaredItems(
                                      declaredItems.map((item) => {
                                        return {
                                          ...item,
                                          qty: item.name === declaredItem.name ? item.qty - 1 : item.qty,
                                        };
                                      })
                                    );
                                  }
                                  // remove the element from the array based on the index
                                  else if (declaredItem.qty === 1) {
                                    // deep copy of declaredItems
                                    const newDeclaredItems = declaredItems.map((declaredItem) => {
                                      return declaredItem;
                                    });
                                    newDeclaredItems.splice(idx, 1);

                                    setDeclaredItems(newDeclaredItems);
                                  }
                                }}
                              >
                                <Trash className="size-5 shrink-0 stroke-[1.5]" />
                              </button>
                            )}

                            <div className="select-none text-center items-center text-sm">{declaredItem.qty}</div>
                            <button
                              className="border flex py-2 justify-center items-center text-center rounded select-none text-primary"
                              onClick={() => {
                                // setItemQty!(itemQty! + 1);
                                setDeclaredItems(
                                  declaredItems.map((item) => {
                                    return {
                                      ...item,
                                      qty: item.name === declaredItem.name ? item.qty + 1 : item.qty,
                                    };
                                  })
                                );

                                setItems(
                                  items.map((item) => {
                                    return { ...item, qty: item.id === declaredItem.id ? item.qty + 1 : item.qty };
                                  })
                                );
                              }}
                            >
                              <HiPlus className="size-3 shrink-0 stroke-[1.5]" />
                            </button>
                          </div>
                          {/* <Image
                          src={declaredItem.imgUrl!}
                          alt={declaredItem.name}
                          width={52}
                          height={52}
                          className=" border border-gray-100/90 rounded overflow-hidden"
                        /> */}
                          <div className="w-2/3">
                            <div className="text-sm font-medium font-sans">{declaredItem.name}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : totalQty === 0 ? (
              <div className="flex w-full h-full  justify-center text-center items-center font-medium text-gray-700">
                You haven&apos;t added anything!
              </div>
            ) : null}
          </div>
          <AlertDialogFooter>
            <AlertDialogAction>Close</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
