import { createContext, FunctionComponent, MutableRefObject, useRef } from 'react';
import { Button } from '../../ui/Button';
import { useApplicationFormStepStore, useApplicationFormStore } from '@nsa/lib/zustand/useApplicationFormStore';
import { usePageContext } from '@nsa/lib/providers/PageProvider';
import { LucideLightbulb, UploadIcon } from 'lucide-react';
import { FileToUploadCard } from '../features/UploadCard';
import { useToast } from '@nsa/hooks/use-toast';
import { InvisibleInput } from '../../ui/InvisibileInput';

type SelfieContextState = {
  selfieWithValidIdRef: MutableRefObject<HTMLInputElement>;
  validIdRef: MutableRefObject<HTMLInputElement>;
};

const ValidIdContext = createContext({} as { validIdRef: SelfieContextState['validIdRef'] });

const SelfieContext = createContext({} as { selfieWithValidIdRef: SelfieContextState['selfieWithValidIdRef'] });

export const SelfieForm: FunctionComponent = () => {
  const validIdToUpload = useApplicationFormStore((state) => state.validIdToUpload);
  const currentStep = useApplicationFormStepStore((state) => state.currentStep);
  const selfieWithValidIdToUpload = useApplicationFormStore((state) => state.selfieWithValidIdToUpload);

  const setCurrentStep = useApplicationFormStepStore((state) => state.setCurrentStep);
  const setValidIdToUpload = useApplicationFormStore((state) => state.setValidIdToUpload);
  const setSelfieWithValidIdToUpload = useApplicationFormStore((state) => state.setSelfieWithValidIdToUpload);

  const { pageRef } = usePageContext();

  // toast hook
  const { toast } = useToast();

  // ref
  const validIdRef = useRef() as MutableRefObject<HTMLInputElement>;
  const selfieWithValidIdRef = useRef() as MutableRefObject<HTMLInputElement>;

  const onSubmit = () => {
    if (validIdToUpload.length < 1 && selfieWithValidIdToUpload.length >= 1) {
      toast({
        title: 'Cannot proceed',
        description: 'Must attach valid ID',
        variant: 'destructive',
        duration: 1500,
      });
    } else if (selfieWithValidIdToUpload.length < 1 && validIdToUpload.length >= 1)
      toast({
        title: 'Cannot proceed',
        description: 'Must attach seflie',
        variant: 'destructive',
        duration: 1500,
      });
    else if (selfieWithValidIdToUpload.length < 1 && validIdToUpload.length < 1)
      toast({
        title: 'Cannot proceed',
        description: 'Must attach valid ID and selfie',
        variant: 'destructive',
        duration: 1500,
      });
    else {
      setCurrentStep(currentStep + 1);
      pageRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <form>
        {/* SELFIE */}
        <div className="border-2 border-dashed bg-white border-blue-200 rounded-lg p-5">
          <div className="text-xl font-medium text-gray-600 mb-2 gap-1 items-center hidden sm:hidden md:flex lg:flex">
            <span className="">Attach your valid ID and selfie</span>
          </div>

          <div className="flex gap-2">
            <div className="flex justify-center items-start ">
              <LucideLightbulb className="sm:h-10 sm:w-10 lg:h-12 lg:w-12" />
            </div>
            <div>
              <div className="text-amber-500">Information</div>
              <div>We need to confirm your identity with a photo of yourself holding your ID.</div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8 pt-9">
          {/* VALID ID */}
          <div>
            <div className="flex flex-col mb-2">
              <div className="flex gap-2 items-center text-xl font-medium text-primary">
                <span className="text-primary ">Valid ID</span> <span className="text-red-600">*</span>
              </div>
            </div>

            <div className="flex flex-col ">
              <InvisibleInput
                ref={validIdRef}
                accept="application/pdf, image/png, image/jpeg, image/jpg"
                files={validIdToUpload}
                setFiles={setValidIdToUpload}
              />

              {validIdToUpload && validIdToUpload.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-2 p-4 border-2 border-dashed mt-8 mb-2">
                  <h3 className="text-xl font-semibold text-zinc-600">No file selected</h3>
                </div>
              ) : (
                <ValidIdContext.Provider value={{ validIdRef }}>
                  <div className="px-0 space-y-2 rounded mb-2">
                    <span className="items-center text-gray-700 text-base">
                      File/s to be uploaded ({validIdToUpload.length})
                    </span>

                    {validIdToUpload &&
                      validIdToUpload.map((file, index) => (
                        <FileToUploadCard
                          key={index}
                          file={file}
                          fileId={index}
                          filesToUpload={validIdToUpload}
                          filesToUploadRef={validIdRef}
                          setFilesToUpload={setValidIdToUpload}
                        />
                      ))}
                  </div>
                </ValidIdContext.Provider>
              )}

              <Button onClick={() => validIdRef?.current.click()} type="button" variant="outline">
                <section className="flex items-center justify-center w-full text-gray-700 gap-2">
                  <UploadIcon className="w-4 h-4" />
                  <span className="text-lg">
                    {validIdToUpload && validIdToUpload.length === 0
                      ? 'Choose a file'
                      : validIdToUpload && validIdToUpload.length > 0
                      ? 'Choose another file'
                      : null}
                  </span>
                </section>
              </Button>
            </div>
          </div>

          {/* VALID ID */}
          <div>
            <div className="flex flex-col mb-2">
              <div className="flex gap-2 items-center text-xl font-medium text-primary ">
                <span className="text-primary">Selfie with your valid ID</span> <span className="text-red-600">*</span>
              </div>
            </div>

            <div className="flex flex-col ">
              <InvisibleInput
                ref={selfieWithValidIdRef}
                accept="image/png, image/jpeg, image/jpg"
                files={selfieWithValidIdToUpload}
                setFiles={setSelfieWithValidIdToUpload}
              />

              {selfieWithValidIdToUpload && selfieWithValidIdToUpload.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-2 p-4 border-2 border-dashed mt-8 mb-2">
                  <h3 className="text-xl font-semibold text-zinc-600">No file selected</h3>
                </div>
              ) : (
                <SelfieContext.Provider value={{ selfieWithValidIdRef }}>
                  <div className="px-0 space-y-2 rounded mb-2">
                    <span className="items-center text-gray-700 text-base">
                      File/s to be uploaded ({selfieWithValidIdToUpload.length})
                    </span>

                    {selfieWithValidIdToUpload &&
                      selfieWithValidIdToUpload.map((file, index) => (
                        <FileToUploadCard
                          key={index}
                          file={file}
                          fileId={index}
                          filesToUpload={selfieWithValidIdToUpload}
                          filesToUploadRef={selfieWithValidIdRef}
                          setFilesToUpload={setSelfieWithValidIdToUpload}
                        />
                      ))}
                  </div>
                </SelfieContext.Provider>
              )}

              <Button
                onClick={() => selfieWithValidIdRef?.current.click()}
                type="button"
                variant="outline"
                disabled={selfieWithValidIdToUpload.length > 0 ? true : false}
              >
                <section className="flex items-center justify-center w-full text-gray-700 gap-2">
                  <UploadIcon className="w-4 h-4" />
                  <span className="text-lg">
                    {selfieWithValidIdToUpload && selfieWithValidIdToUpload.length === 0
                      ? 'Choose a file'
                      : selfieWithValidIdToUpload && selfieWithValidIdToUpload.length > 0
                      ? 'Cannot add more'
                      : null}
                  </span>
                </section>
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-8 mt-10">
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
          <Button type="button" onClick={onSubmit}>
            Proceed
          </Button>
        </div>
      </form>
    </>
  );
};
