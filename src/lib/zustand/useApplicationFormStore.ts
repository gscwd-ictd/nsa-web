/* eslint-disable no-unused-vars */
import { create } from 'zustand';

import { Coordinate } from 'ol/coordinate';
import { ApplicantDetails, Household } from '../utils/types/person';
import { Address } from '../utils/types/address';
import { Documents } from '../utils/types/documents';
import { devtools } from 'zustand/middleware';

export type ApplicationFormState = ApplicantDetails &
  Address &
  Household &
  Documents & {
    coordinates: Coordinate | undefined;
    isRepresentative: boolean;
    applicationId: string;

    setBlockNo: (blockNo: string) => void;
    setApplicationId: (applicationId: string) => void;
    setFirstName: (firstName: string) => void;
    setMiddleName: (middleName: string) => void;
    setLastName: (lastName: string) => void;
    setNameExt: (nameExt: string) => void;
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
  coordinates: undefined,
  firstName: 'Richard Vincent',
  middleName: 'Pavitos',
  lastName: 'Spaniard',
  nameExt: 'III',
  mobileNumber: '09788884548',
  emailAddress: 'richardvincentespanyol@gmail.com',
  birthDate: '1982-03-10',
  isRepresentative: false,
  lotNo: 'A4',
  blockNo: '5',
  barangay: 'City Heights',
  street: 'N/A',
  subdivision: 'Christ the King',
  province: 'South Cotabato',
  city: 'General Santos City',
  zipCode: '9500',
  ownershipType: undefined,
  landmark: 'Near the plaza',
  neighbors: 'Macaludos, Villa, and Dela Cerna',
  remarks: '',
  noOfHouseInLot: 1,
  noOfPersonsInHousehold: 3,
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
  applicationId: '',

  setBlockNo: (blockNo) => set({ blockNo }),
  setApplicationId: (applicationId) => set({ applicationId }),
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
  setMobileNumber: (mobileNumber) => set({ mobileNumber }),
  setEmailAddress: (emailAddress) => set({ emailAddress }),
  setBirthDate: (birthDate) => set({ birthDate }),
  setIsRepresentative: (isRepresentative) => set({ isRepresentative }),
  setCoordinates: (coordinates) => set({ coordinates }),
}));

export const useApplicationFormStepStore = create<ApplicationFormStepState>()(
  devtools((set) => ({
    currentStep: 1,
    setCurrentStep: (currentStep) => set({ currentStep }),
  }))
);
