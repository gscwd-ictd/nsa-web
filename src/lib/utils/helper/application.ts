/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApplicationFormState } from '@nsa/lib/zustand/useApplicationFormStore';

export const applicationToSubmit = (application: ApplicationFormState) => {
  return (({
    applicationId,
    setApplicationId,
    setFirstName,
    setLastName,
    setNameExt,
    setMobileNumber,
    setEmailAddress,
    setBirthDate,
    setIsRepresentative,
    setBarangay,
    setStreet,
    setSubdivision,
    setProvince,
    setCity,
    setZipCode,
    setLotNo,
    setLandmark,
    setNeighbors,
    setRemarks,
    setCoordinates,
    setOwnershipType,
    setNoOfPersonsInHousehold,
    setNoOfHouseInLot,
    setProofOfOwnership,
    setProofOfBilling,
    setBarangayCertificate,
    setValidId,
    setSelfieWithValidId,
    setProofOfOwnershipToUpload,
    setProofOfBillingToUpload,
    setBarangayCertificateToUpload,
    setValidIdToUpload,
    setSelfieWithValidIdToUpload,
    setMiddleName,
    ...rest
  }) => rest)(application);
};
