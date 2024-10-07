/* eslint-disable no-unused-vars */
import { create } from 'zustand';

import { Coordinate } from 'ol/coordinate';
import { Sex } from '../utils/enums/sex';
import { ApplicantDetails, Household } from '../utils/types/person';
import { Address } from '../utils/types/address';
import { Documents } from '../utils/types/documents';
import { devtools } from 'zustand/middleware';

type ApplicationFormState = Omit<ApplicantDetails, 'sex'> &
  Address &
  Household &
  Documents & {
    coordinates: Coordinate;
    isRepresentative: boolean;
    sex: Sex | undefined;

    setFirstName: (firstName: string) => void;
    setMiddleName: (middleName: string) => void;
    setLastName: (lastName: string) => void;
    setNameExt: (nameExt: string) => void;
    setSex: (sex: Sex | undefined) => void;
    setMobileNumber: (mobileNumber: string) => void;
    setEmailAddress: (emailAddress: string) => void;
    setBirthDate: (birthDate: string) => void;
    setIsRepresentative: (isRepresentative: boolean) => void;
    setBarangay: (barangay: string) => void;
    setStreet: (street: string) => void;
    setSubdivision: (subdivision: string) => void;
    setProvince: (province: string) => void;
    setCity: (city: string) => void;
    setZipCode: (zipCode: string) => void;
    setLotNo: (lotNo: string) => void;
    setLandmark: (landmark: string) => void;
    setNeighbors: (neighbors: string) => void;
    setRemarks: (remarks: string) => void;
    setCoordinates: (coordinates: Coordinate) => void;
    setOwnershipType: (ownershipType: ApplicationFormState['ownershipType']) => void;
    setNoOfPersonsInHousehold: (noOfPersonsInHousehold: number | undefined) => void;
    setNoOfHouseInLot: (noOfHouseInLot: number | undefined) => void;

    // set uploaded files
    setProofOfOwnership: (proofOfOwnership: Array<File>) => void;
    setProofOfBilling: (proofOfBilling: Array<File>) => void;
    setBarangayCertificate: (barangayCertificate: Array<File>) => void;
    setValidId: (validId: Array<File>) => void;
    setSelfieWithValidId: (selfieWithValidId: Array<File>) => void;

    setProofOfOwnershipToUpload: (proofOfOwnershipToUpload: Array<File>) => void;
    setProofOfBillingToUpload: (proofOfBillingToUpload: Array<File>) => void;
    setBarangayCertificateToUpload: (barangayCertificateToUpload: Array<File>) => void;
    setValidIdToUpload: (validIdToUpload: Array<File>) => void;
    setSelfieWithValidIdToUpload: (selfieWithValidIdToUpload: Array<File>) => void;
  };

type ApplicationFormStepState = {
  currentStep: number;
  setCurrentStep: (currentStep: number) => void;
};

export const useApplicationFormStore = create<ApplicationFormState>((set) => ({
  coordinates: [125.17175493346683, 6.116349775689059],
  firstName: 'Mikhail Anthony',
  middleName: 'Mercado',
  lastName: 'Sebua',
  nameExt: 'III',
  sex: undefined,
  mobileNumber: '',
  emailAddress: '',
  birthDate: '08/08/1993',
  isRepresentative: false,
  lotNo: 'A4',
  barangay: 'Cannery Site',
  street: 'Ilang-Ilang',
  subdivision: 'Cannery Housing',
  province: 'South Cotabato',
  city: 'General Santos',
  zipCode: '9500',
  ownershipType: undefined,

  landmark: '',
  neighbors: '',
  remarks: '',
  noOfHouseInLot: undefined,
  noOfPersonsInHousehold: undefined,

  proofOfOwnership: [],
  proofOfBilling: [],
  barangayCertificate: [],
  validId: [],
  proofOfOwnershipToUpload: [],
  proofOfBillingToUpload: [],
  barangayCertificateToUpload: [],
  validIdToUpload: [],
  selfieWithValidId: [],
  selfieWithValidIdToUpload: [],

  setProofOfOwnership: (proofOfOwnership) => set({ proofOfOwnership }),
  setProofOfBilling: (proofOfBilling) => set({ proofOfBilling }),
  setBarangayCertificate: (barangayCertificate) => set({ barangayCertificate }),
  setValidId: (validId) => set({ validId }),
  setSelfieWithValidId: (selfieWithValidId) => set({ selfieWithValidId }),

  setProofOfOwnershipToUpload: (proofOfOwnershipToUpload) => set({ proofOfOwnershipToUpload }),
  setProofOfBillingToUpload: (proofOfBillingToUpload) => set({ proofOfBillingToUpload }),
  setBarangayCertificateToUpload: (barangayCertificateToUpload) => set({ barangayCertificateToUpload }),
  setValidIdToUpload: (validIdToUpload) => set({ validIdToUpload }),
  setSelfieWithValidIdToUpload: (selfieWithValidIdToUpload) => set({ selfieWithValidIdToUpload }),

  setNoOfPersonsInHousehold: (noOfPersonsInHousehold) => set({ noOfPersonsInHousehold }),

  setNoOfHouseInLot: (noOfHouseInLot) => set({ noOfHouseInLot }),

  setLandmark: (landmark) => set({ landmark }),
  setNeighbors: (neighbors) => set({ neighbors }),
  setRemarks: (remarks) => set({ remarks }),

  setOwnershipType: (ownershipType) => set({ ownershipType }),
  setLotNo: (lotNo) => set({ lotNo }),
  setBarangay: (barangay) => set({ barangay }),
  setStreet: (street) => set({ street }),
  setSubdivision: (subdivision) => set({ subdivision }),
  setProvince: (province) => set({ province }),
  setCity: (city) => set({ city }),
  setZipCode: (zipCode) => set({ zipCode }),

  setFirstName: (firstName) => set({ firstName }),
  setMiddleName: (middleName) => set({ middleName }),
  setLastName: (lastName) => set({ lastName }),
  setNameExt: (nameExt) => set({ nameExt }),
  setSex: (sex) => set({ sex }),
  setMobileNumber: (mobileNumber) => set({ mobileNumber }),
  setEmailAddress: (emailAddress) => set({ emailAddress }),
  setBirthDate: (birthDate) => set({ birthDate }),
  setIsRepresentative: (isRepresentative) => set({ isRepresentative }),

  setCoordinates: (coordinates) => set({ coordinates }),
}));

export const useApplicationFormStepStore = create<ApplicationFormStepState>()(
  devtools((set) => ({
    currentStep: 5,
    setCurrentStep: (currentStep) => set({ currentStep }),
  }))
);
