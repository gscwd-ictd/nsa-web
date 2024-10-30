import { useApplicationFormStepStore } from '@nsa/lib/zustand/useApplicationFormStore';
import { Button } from '../../ui/Button';
import { usePageContext } from '../new-service-application/NewServiceApplicationPage';
import bathtub from '@images/PFDF/bathtub.webp';
import bidet from '@images/PFDF/bidet.jpg';
import { LucideLightbulb, PlusCircle } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../../ui/Sheet';
import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '../../ui/Alert';

export const PfdfForm = () => {
  const setCurrentStep = useApplicationFormStepStore((state) => state.setCurrentStep);
  const currentStep = useApplicationFormStepStore((state) => state.currentStep);
  const [tempBathtubQty, setTempBathtubQty] = useState<number>(0);
  const [bathtubQty, setBathtubQty] = useState<number>(0);
  const [bathtubSheetIsOpen, setBathtubSheetIsOpen] = useState<boolean>(false);

  const [tempBidetQty, setTempBidetQty] = useState<number>(0);
  const [bidetQty, setBidetQty] = useState<number>(0);
  const [bidetSheetIsOpen, setBidetSheetIsOpen] = useState<boolean>(false);

  // const [figuresIsOpen, setFiguresIsOpen] = useState<boolean>(false);

  const { pageRef } = usePageContext();

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
            {bidetQty + bathtubQty !== 0 && (
              <div className="w-6 h-6 rounded-full bg-white -mt-2 -mr-3 z-10 items-center text-center border border-green-300 text-green-500 flex justify-center text-sm">
                {bidetQty + bathtubQty}
              </div>
            )}
            <div className="flex gap-2 items-center text-white border  bg-green-500 p-2 rounded">
              <span className="text-sm">Declared Figures</span>
            </div>
          </SheetTrigger>
          <SheetContent className="bg-white">
            <SheetTitle>Declared Figures</SheetTitle>
            <SheetDescription>Summary of declared figures</SheetDescription>
            <div className="flex flex-col gap-8 pt-8">
              {/* Bathtub */}
              <div className="flex items-center">
                <div className="flex gap-2 items-center">
                  <div className="flex gap-2">
                    <div
                      className="border w-6 h-6 items-center text-center rounded select-none text-primary"
                      role="button"
                      onClick={() => setTempBathtubQty((qty) => (qty === 0 ? qty : qty - 1))}
                    >
                      -
                    </div>
                    <div className="select-none">{tempBathtubQty}</div>
                    <div
                      className="border w-6 h-6 items-center text-center rounded select-none text-primary"
                      role="button"
                      onClick={() => setTempBathtubQty((qty) => qty + 1)}
                    >
                      +
                    </div>
                  </div>
                  <img src={bathtub.src} alt="bathtub" className="w-12 h-12 border border-gray-100/90 rounded" />
                  <div className="font-medium">Bathtub</div>
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
                        setBidetQty((qty) => (qty === 0 ? qty : qty - 1));
                        setTempBidetQty((qty) => (qty === 0 ? qty : qty - 1));
                      }}
                    >
                      -
                    </div>
                    <div className="select-none">{bidetQty}</div>
                    <div
                      className="border w-6 h-6 items-center text-center rounded select-none text-primary"
                      role="button"
                      onClick={() => {
                        setBidetQty((qty) => qty + 1);
                        setTempBidetQty((qty) => qty + 1);
                      }}
                    >
                      +
                    </div>
                  </div>
                  <img src={bidet.src} alt="bathtub" className="w-12 h-12 border border-gray-100/90 rounded" />
                  <div className="font-medium">Bidet</div>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-2">
        <section className="w-full rounded overflow-hidden p-4 bg-gray-50 flex gap-2">
          <img src={bathtub.src} alt="bathtub" className="w-24 h-24 border border-gray-100/90 rounded" />
          <div className="flex flex-col justify-between">
            <div className="flex w-full justify-between">
              <div className="font-medium">Bathtub</div>
              <div>
                <Sheet open={bathtubSheetIsOpen} onOpenChange={setBathtubSheetIsOpen}>
                  <SheetTrigger>
                    <PlusCircle className="stroke-white fill-green-600 hover:cursor-pointer" />
                  </SheetTrigger>
                  <SheetContent className="bg-white">
                    <SheetHeader>
                      <SheetTitle>Bathtub</SheetTitle>
                      <SheetDescription>
                        Add how many bathtubs you have. Click save when you&apos;re done.
                      </SheetDescription>
                    </SheetHeader>

                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2 justify-end">
                        <div
                          className="border w-6 h-6 items-center text-center rounded select-none text-primary"
                          role="button"
                          onClick={() => setTempBathtubQty((qty) => (qty === 0 ? qty : qty - 1))}
                        >
                          -
                        </div>
                        <div className="select-none">{tempBathtubQty}</div>
                        <div
                          className="border w-6 h-6 items-center text-center rounded select-none text-primary"
                          role="button"
                          onClick={() => setTempBathtubQty((qty) => qty + 1)}
                        >
                          +
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button
                          onClick={() => {
                            setBathtubQty(tempBathtubQty);
                            setBathtubSheetIsOpen(false);
                          }}
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
            <div className="">Qty: {bathtubQty}</div>
          </div>
        </section>

        {/* BIDET */}
        <section className="w-full rounded overflow-hidden p-4 bg-gray-50 flex gap-2">
          <img src={bidet.src} alt="bathtub" className="w-24 h-24 border border-gray-100/90 rounded" />
          <div className="flex flex-col justify-between">
            <div className="flex w-full justify-between">
              <div className="font-medium">Bidet</div>
              <div>
                <Sheet open={bidetSheetIsOpen} onOpenChange={setBidetSheetIsOpen}>
                  <SheetTrigger>
                    <PlusCircle className="stroke-white fill-green-600 hover:cursor-pointer" />
                  </SheetTrigger>
                  <SheetContent className="bg-white">
                    <SheetHeader>
                      <SheetTitle>Bidet</SheetTitle>
                      <SheetDescription>
                        Add how many bidets you have. Click save when you&apos;re done.
                      </SheetDescription>
                    </SheetHeader>

                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2 justify-end">
                        <div
                          className="border w-6 h-6 items-center text-center rounded select-none text-primary"
                          role="button"
                          onClick={() => setTempBidetQty((qty) => (qty === 0 ? qty : qty - 1))}
                        >
                          -
                        </div>
                        <div className="select-none">{tempBidetQty}</div>
                        <div
                          className="border w-6 h-6 items-center text-center rounded select-none text-primary"
                          role="button"
                          onClick={() => setTempBidetQty((qty) => qty + 1)}
                        >
                          +
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button
                          onClick={() => {
                            setBidetQty(tempBidetQty);
                            setBidetSheetIsOpen(false);
                          }}
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
            <div className="">Qty: {bidetQty}</div>
          </div>
        </section>
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
