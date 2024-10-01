import { createContext, FunctionComponent, MutableRefObject, useRef } from 'react';
import { Button } from '../../ui/button';
import { useApplicationFormStepStore, useApplicationFormStore } from '@nsa/lib/zustand/useApplicationFormStore';
import { usePageContext } from '../new-service-application/NewServiceApplicationPage';
import { FaRegIdCard } from 'react-icons/fa6';
import { UploadIcon } from 'lucide-react';
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
    if (validIdToUpload.length < 1) {
      toast({
        title: 'Cannot proceed',
        description: 'Must attach valid ID',
        variant: 'destructive',
        duration: 1500,
      });
    } else {
      setCurrentStep(currentStep + 1);
      pageRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <form>
        {/* SELFIE */}
        <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8">
          {/* VALID ID */}
          <div>
            <div className="flex flex-col mb-2">
              <div className="flex gap-2 items-center text-xl font-medium text-gray-700">
                <FaRegIdCard className="w-8 h-8 " />
                Valid ID <span className="text-red-600">*</span>
              </div>
            </div>

            <div className="flex flex-col ">
              <InvisibleInput
                ref={validIdRef}
                accept="application/pdf, image/png, image/jpeg"
                files={validIdToUpload}
                setFiles={setValidIdToUpload}
              />

              {validIdToUpload && validIdToUpload.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-2 p-4 border-2 border-dashed mb-2">
                  <h3 className="text-xl font-semibold text-zinc-600">No file selected</h3>
                </div>
              ) : (
                <ValidIdContext.Provider value={{ validIdRef }}>
                  <div className="px-0 space-y-2 rounded mb-4">
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
              <div className="flex gap-2 items-center text-xl font-medium text-gray-700">
                <FaRegIdCard className="w-8 h-8 " />
                Please provide a selfie with your valid ID <span className="text-red-600">*</span>
              </div>
            </div>

            <div className="flex flex-col ">
              <InvisibleInput
                ref={selfieWithValidIdRef}
                accept="application/pdf, image/png, image/jpeg"
                files={selfieWithValidIdToUpload}
                setFiles={setSelfieWithValidIdToUpload}
              />

              {selfieWithValidIdToUpload && selfieWithValidIdToUpload.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-2 p-4 border-2 border-dashed mb-2">
                  <h3 className="text-xl font-semibold text-zinc-600">No file selected</h3>
                </div>
              ) : (
                <SelfieContext.Provider value={{ selfieWithValidIdRef }}>
                  <div className="px-0 space-y-2 rounded mb-4">
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
          <Button variant="alternative" type="button" onClick={onSubmit}>
            Proceed
          </Button>
        </div>
      </form>
    </>
  );
};
