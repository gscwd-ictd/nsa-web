import { useApplicationFormStore } from '@nsa/lib/zustand/useApplicationFormStore';
import { createContext, FunctionComponent, MutableRefObject, useRef } from 'react';
import { Button } from '../../ui/Button';
import { UploadIcon } from 'lucide-react';
import { FileToUploadCard } from '../features/UploadCard';
import { InvisibleInput } from '../../ui/InvisibileInput';

type DocumentContextState = {
  proofOfOwnershipRef: MutableRefObject<HTMLInputElement>;
  proofOfBillingRef: MutableRefObject<HTMLInputElement>;
  barangayCertificateRef: MutableRefObject<HTMLInputElement>;
};

const ProofOfOwnershipContext = createContext(
  {} as { proofOfOwnershipRef: DocumentContextState['proofOfOwnershipRef'] }
);
const ProofOfBillingContext = createContext({} as { proofOfBillingRef: DocumentContextState['proofOfBillingRef'] });
const BarangayCertificateContext = createContext(
  {} as { barangayCertificateRef: DocumentContextState['barangayCertificateRef'] }
);

export const DocumentUploadForm: FunctionComponent = () => {
  const proofOfOwnershipRef = useRef() as MutableRefObject<HTMLInputElement>;
  const proofOfBillingRef = useRef() as MutableRefObject<HTMLInputElement>;
  const barangayCertificateRef = useRef() as MutableRefObject<HTMLInputElement>;

  const setProofOfBillingToUpload = useApplicationFormStore((state) => state.setProofOfBillingToUpload);
  const setProofOfOwnershipToUpload = useApplicationFormStore((state) => state.setProofOfOwnershipToUpload);
  const setBarangayCertificateToUpload = useApplicationFormStore((state) => state.setBarangayCertificateToUpload);

  const proofOfBillingToUpload = useApplicationFormStore((state) => state.proofOfBillingToUpload);
  const proofOfOwnershipToUpload = useApplicationFormStore((state) => state.proofOfOwnershipToUpload);
  const barangayCertificateToUpload = useApplicationFormStore((state) => state.barangayCertificateToUpload);

  return (
    <>
      <div className="mt-10 grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8 w-full">
        {/* PROOF OF OWNERSHIP */}
        <div>
          <div className="flex flex-col mb-2">
            <div className="flex gap-2 items-center text-xl font-medium text-primary ">
              <span className="text-primary">Proof of Lot Ownership</span> <span className="text-red-600">*</span>
            </div>
          </div>

          <div className="w-full rounded-lg flex flex-col">
            <InvisibleInput
              ref={proofOfOwnershipRef}
              accept="application/pdf, image/png, image/jpeg, image/jpg"
              files={proofOfOwnershipToUpload}
              setFiles={setProofOfOwnershipToUpload}
            />

            {proofOfOwnershipToUpload && proofOfOwnershipToUpload.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-2 p-4 border-2 border-dashed mt-8 mb-2">
                <h3 className="text-xl font-semibold text-zinc-400">No file selected</h3>
              </div>
            ) : (
              <ProofOfOwnershipContext.Provider value={{ proofOfOwnershipRef }}>
                <div className="px-0 space-y-2 rounded mb-2 w-full">
                  <span className="items-center text-gray-700 text-base">
                    <span className="items-center text-gray-700 text-base">
                      File/s to be uploaded ({proofOfOwnershipToUpload.length})
                    </span>
                  </span>
                  {proofOfOwnershipToUpload &&
                    proofOfOwnershipToUpload.map((file, index) => (
                      <FileToUploadCard
                        key={index}
                        file={file}
                        fileId={index}
                        filesToUpload={proofOfOwnershipToUpload}
                        filesToUploadRef={proofOfOwnershipRef}
                        setFilesToUpload={setProofOfOwnershipToUpload}
                      />
                    ))}
                </div>
              </ProofOfOwnershipContext.Provider>
            )}

            <Button
              onClick={() => proofOfOwnershipRef?.current.click()}
              type="button"
              variant="outline"
              className="text-gray-700"
            >
              <section className="flex items-center justify-center w-full gap-2 ">
                <UploadIcon className="w-4 h-4" />
                <span className="text-lg">
                  {proofOfOwnershipToUpload && proofOfOwnershipToUpload.length === 0
                    ? 'Choose a file'
                    : proofOfOwnershipToUpload && proofOfOwnershipToUpload.length > 0
                    ? 'Choose another file'
                    : null}
                </span>
              </section>
            </Button>
          </div>
        </div>

        {/* PROOF OF BILLING */}
        <div>
          <div className="flex flex-col mb-2">
            <div className="flex gap-2 items-center text-xl font-medium text-primary ">
              <span className="text-primary  rounded">Proof of Billing</span>
            </div>
          </div>

          <div className="flex flex-col">
            <InvisibleInput
              ref={proofOfBillingRef}
              accept="application/pdf, image/png, image/jpeg, image/jpg"
              files={proofOfBillingToUpload}
              setFiles={setProofOfBillingToUpload}
            />

            {proofOfBillingToUpload && proofOfBillingToUpload.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-2 p-4 border-2 border-dashed mt-8 mb-2">
                <h3 className="text-xl font-semibold text-zinc-400">No file selected</h3>
              </div>
            ) : (
              <ProofOfBillingContext.Provider value={{ proofOfBillingRef }}>
                <div className="px-0 space-y-2 rounded mb-2">
                  <span className="items-center text-gray-700 text-base">
                    File/s to be uploaded ({proofOfBillingToUpload.length})
                  </span>

                  {proofOfBillingToUpload &&
                    proofOfBillingToUpload.map((file, index) => (
                      <FileToUploadCard
                        key={index}
                        file={file}
                        fileId={index}
                        filesToUpload={proofOfBillingToUpload}
                        filesToUploadRef={proofOfBillingRef}
                        setFilesToUpload={setProofOfBillingToUpload}
                      />
                    ))}
                </div>
              </ProofOfBillingContext.Provider>
            )}

            <Button onClick={() => proofOfBillingRef?.current.click()} type="button" variant="outline">
              <section className="flex items-center justify-center w-full gap-2 ">
                <UploadIcon className="w-4 h-4" />
                <span className="text-lg text-gray-700">
                  {proofOfBillingToUpload && proofOfBillingToUpload.length === 0
                    ? 'Choose a file'
                    : proofOfBillingToUpload && proofOfBillingToUpload.length > 0
                    ? 'Choose another file'
                    : null}
                </span>
              </section>
            </Button>
          </div>
        </div>

        {/* BARANGAY CERTIFICATE */}
        <div>
          <div className="flex flex-col mb-2">
            <div className="flex gap-2 items-center text-xl font-medium text-primary ">
              <span className="text-primary">Barangay Certificate</span>
            </div>
          </div>

          <div className="flex flex-col ">
            <InvisibleInput
              ref={barangayCertificateRef}
              accept="application/pdf, image/png, image/jpeg, image/jpg"
              files={barangayCertificateToUpload}
              setFiles={setBarangayCertificateToUpload}
            />

            {barangayCertificateToUpload && barangayCertificateToUpload.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-2 p-4 border-2 border-dashed mt-8 mb-2">
                <h3 className="text-xl font-semibold text-zinc-400">No file selected</h3>
              </div>
            ) : (
              <BarangayCertificateContext.Provider value={{ barangayCertificateRef }}>
                <div className="px-0 space-y-2 rounded mb-2">
                  <span className="items-center text-gray-700 text-base">
                    File/s to be uploaded ({barangayCertificateToUpload.length})
                  </span>

                  {barangayCertificateToUpload &&
                    barangayCertificateToUpload.map((file, index) => (
                      <FileToUploadCard
                        key={index}
                        file={file}
                        fileId={index}
                        filesToUpload={barangayCertificateToUpload}
                        filesToUploadRef={barangayCertificateRef}
                        setFilesToUpload={setBarangayCertificateToUpload}
                      />
                    ))}
                </div>
              </BarangayCertificateContext.Provider>
            )}

            <Button onClick={() => barangayCertificateRef?.current.click()} type="button" variant="outline">
              <section className="flex items-center justify-center w-full text-gray-700 gap-2">
                <UploadIcon className="w-4 h-4" />
                <span className="text-lg">
                  {barangayCertificateToUpload && barangayCertificateToUpload.length === 0
                    ? 'Choose a file'
                    : barangayCertificateToUpload && barangayCertificateToUpload.length > 0
                    ? 'Choose another file'
                    : null}
                </span>
              </section>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
