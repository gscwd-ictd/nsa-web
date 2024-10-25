/* eslint-disable @typescript-eslint/no-unused-vars */
import { z, ZodType } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ApplicantDetails, Household } from '@nsa/lib/utils/types/person';
import { useApplicationFormStepStore, useApplicationFormStore } from '@nsa/lib/zustand/useApplicationFormStore';
import { LabelWithInput } from '../../ui/LabelWithInput';
import { BsPersonStanding } from 'react-icons/bs';
import { Address } from '@nsa/lib/utils/types/address';
import { usePageContext } from '../new-service-application/NewServiceApplicationPage';
import { FormButton } from '../../ui/FormButton';
import { Button } from '../../ui/Button';
import { Alert, AlertDescription, AlertTitle } from '../../ui/Alert';
import { LucideLightbulb } from 'lucide-react';

const ot = ['owner', 'tenant', undefined];

type ApplicantInfo = ApplicantDetails & Omit<Address, 'landmark' | 'neighbors' | 'remarks'> & Household;

const ApplicantDetailsSchema: ZodType<ApplicantInfo> = z.object({
  firstName: z.string().min(1, { message: 'First Name is required' }),
  middleName: z.string().min(1, { message: 'Middle Name is required' }),
  lastName: z.string().min(1, { message: 'Last Name is required' }),
  nameExt: z.string(),
  mobileNumber: z.string().min(11, { message: 'Mobile Number is required' }),
  emailAddress: z.string().email(),
  birthDate: z.string().min(6, { message: 'Birthday is required' }),
  ownershipType: z.custom<'owner' | 'tenant' | undefined>((val) => ot.includes(val)),
  lotNo: z.string().trim(),
  blockNo: z.string().trim(),
  barangay: z.string().trim().min(3, { message: 'Barangay is required' }),
  street: z.string().trim(),
  subdivision: z.string().trim().min(3, { message: 'Subdivision is required' }),
  province: z.string().min(3, { message: 'Province is required' }),
  city: z.string().min(3, { message: 'City is required' }),
  zipCode: z.string().min(4, { message: 'Zipcode is required' }),
  noOfPersonsInHousehold: z
    .number({ invalid_type_error: 'No. of persons in household required' })
    .min(1, { message: 'Must be a minimum of 1' }),
  noOfHouseInLot: z
    .number({ invalid_type_error: 'No. of house in lot required' })
    .min(1, { message: 'Must be a minimum of 1' }),
  // sex: z.enum([Sex.FEMALE, Sex.MALE]),
});

export const ApplicantDetailsForm = () => {
  // refers to this page scrollable ref
  const { pageRef } = usePageContext();

  const currentStep = useApplicationFormStepStore((state) => state.currentStep);
  const isRepresentative = useApplicationFormStore((state) => state.isRepresentative);
  const firstName = useApplicationFormStore((state) => state.firstName);
  const middleName = useApplicationFormStore((state) => state.middleName);
  const lastName = useApplicationFormStore((state) => state.lastName);
  const nameExt = useApplicationFormStore((state) => state.nameExt);
  const mobileNumber = useApplicationFormStore((state) => state.mobileNumber);
  const emailAddress = useApplicationFormStore((state) => state.emailAddress);
  const birthDate = useApplicationFormStore((state) => state.birthDate);
  const ownershipType = useApplicationFormStore((state) => state.ownershipType);
  const lotNo = useApplicationFormStore((state) => state.lotNo);
  const barangay = useApplicationFormStore((state) => state.barangay);
  const street = useApplicationFormStore((state) => state.street);
  const subdivision = useApplicationFormStore((state) => state.subdivision);
  const province = useApplicationFormStore((state) => state.province);
  const city = useApplicationFormStore((state) => state.city);
  const zipCode = useApplicationFormStore((state) => state.zipCode);
  const noOfPersonsInHousehold = useApplicationFormStore((state) => state.noOfPersonsInHousehold);
  const noOfHouseInLot = useApplicationFormStore((state) => state.noOfHouseInLot);
  const blockNo = useApplicationFormStore((state) => state.blockNo);

  const setLotNo = useApplicationFormStore((state) => state.setLotNo);
  const setBarangay = useApplicationFormStore((state) => state.setBarangay);
  const setStreet = useApplicationFormStore((state) => state.setStreet);
  const setSubdivision = useApplicationFormStore((state) => state.setSubdivision);
  const setProvince = useApplicationFormStore((state) => state.setProvince);
  const setCity = useApplicationFormStore((state) => state.setCity);
  const setZipCode = useApplicationFormStore((state) => state.setZipCode);
  const setFirstName = useApplicationFormStore((state) => state.setFirstName);
  const setMiddleName = useApplicationFormStore((state) => state.setMiddleName);
  const setLastName = useApplicationFormStore((state) => state.setLastName);
  const setNameExt = useApplicationFormStore((state) => state.setNameExt);
  const setMobileNumber = useApplicationFormStore((state) => state.setMobileNumber);
  const setEmailAddress = useApplicationFormStore((state) => state.setEmailAddress);
  const setCurrentStep = useApplicationFormStepStore((state) => state.setCurrentStep);
  const setIsRepresentative = useApplicationFormStore((state) => state.setIsRepresentative);
  const setBirthDate = useApplicationFormStore((state) => state.setBirthDate);
  const setOwnershipType = useApplicationFormStore((state) => state.setOwnershipType);
  const setNoOfHouseInLot = useApplicationFormStore((state) => state.setNoOfHouseInLot);
  const setNoOfPersonsInHousehold = useApplicationFormStore((state) => state.setNoOfPersonsInHousehold);
  const setBlockNo = useApplicationFormStore((state) => state.setBlockNo);

  // use form, assign it to a constant named "form"
  const form = useForm<ApplicantInfo>({
    resolver: zodResolver(ApplicantDetailsSchema),
    reValidateMode: 'onChange',
  });

  // de-construct the constant "form"
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  // on submit function, if successful
  const onSubmit = async (data: ApplicantInfo) => {
    setCurrentStep(currentStep + 1);
    pageRef.current.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="text-xl font-medium text-gray-600 mb-2 flex gap-1 items-center mt-10">
        <span>Fill-out Applicant Information</span>
      </div>

      <Alert>
        <div className="flex gap-2">
          <div className="flex justify-center items-start ">
            <LucideLightbulb className="sm:h-10 sm:w-10 lg:h-12 lg:w-12" />
          </div>
          <div>
            <AlertTitle className="text-amber-500">Information</AlertTitle>
            <AlertDescription>
              Fill-out the applicant&apos;s full name, contact information, and service application address.
            </AlertDescription>
          </div>
        </div>
      </Alert>

      <div className="text-xl font-medium text-gray-600 mb-2 flex gap-1 items-center mt-10">
        {/* <GoPersonFill /> */}
        <span>Personal Information</span>
      </div>
      <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4">
        <LabelWithInput
          id="firstName"
          label="First Name"
          size="large"
          placeholder="ex. Juan"
          controller={{
            ...register('firstName', {
              value: firstName,
              onChange: (e) => setFirstName(e.target.value),
            }),
          }}
          isError={errors.firstName ? true : false}
          errorMessage={errors.firstName?.message?.toString()}
          isRequired
        />

        <LabelWithInput
          id="middleName"
          label="Middle Name"
          size="large"
          placeholder="ex. Santos"
          controller={{
            ...register('middleName', {
              value: middleName,
              onChange: (e) => setMiddleName(e.target.value),
            }),
          }}
          isRequired
          isError={errors.middleName ? true : false}
          errorMessage={errors.middleName?.message?.toString()}
        />

        <LabelWithInput
          id="lastName"
          label="Last Name"
          size="large"
          placeholder="ex. Dela Cruz"
          controller={{
            ...register('lastName', {
              value: lastName,
              onChange: (e) => setLastName(e.target.value),
            }),
          }}
          isError={errors.lastName ? true : false}
          errorMessage={errors.lastName?.message?.toString()}
          isRequired
        />
        <LabelWithInput
          id="nameExt"
          label="Suffix/Extension"
          size="large"
          placeholder="ex. Sr., Jr., III"
          controller={{
            ...register('nameExt', {
              value: nameExt,
              onChange: (e) => setNameExt(e.target.value),
            }),
          }}
          isError={errors.nameExt ? true : false}
          errorMessage={errors.nameExt?.message?.toString()}
        />

        <LabelWithInput
          id="birthDate"
          type="date"
          label="Birthday"
          size="large"
          placeholder="Birthdate"
          controller={{
            ...register('birthDate', {
              value: birthDate,
              onChange: (e) => setBirthDate(e.target.value),
            }),
          }}
          isError={errors.birthDate ? true : false}
          errorMessage={errors.birthDate?.message?.toString()}
          isRequired
        />
      </div>

      <div className="text-xl font-medium text-gray-600 mb-2 flex gap-1 items-center mt-10">
        <span>Contact Information</span>
      </div>
      <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4">
        <LabelWithInput
          id="mobileNumber"
          label="Mobile No."
          size="large"
          placeholder="ex. 097706457785"
          controller={{
            ...register('mobileNumber', {
              value: mobileNumber,
              onChange: (e) => setMobileNumber(e.target.value),
            }),
          }}
          isError={errors.mobileNumber ? true : false}
          errorMessage={errors.mobileNumber?.message?.toString()}
          isRequired
        />
        <LabelWithInput
          id="emailAddress"
          type="email"
          label="Email Address"
          size="large"
          placeholder="ex. juandelacruz@gmail.com"
          controller={{
            ...register('emailAddress', {
              value: emailAddress,
              onChange: (e) => setEmailAddress(e.target.value),
            }),
          }}
          isError={errors.emailAddress ? true : false}
          errorMessage={errors.emailAddress?.message?.toString()}
          isRequired
        />
      </div>

      <div className="text-xl font-medium text-gray-600 mb-2 flex gap-1 items-center mt-10">
        <span>Service Application Address</span>
      </div>
      <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4">
        <LabelWithInput
          id="lotNo"
          label="Lot No."
          placeholder="Lot Number"
          size="large"
          autoComplete="off"
          controller={{
            ...register('lotNo', {
              value: lotNo,
              onChange: (e) => setLotNo(e.target.value),
            }),
          }}
          isError={errors?.lotNo ? true : false}
          errorMessage={errors?.lotNo?.message}
        />

        <LabelWithInput
          id="blockNo"
          label="Block No."
          placeholder="Block Number"
          size="large"
          autoComplete="off"
          controller={{
            ...register('blockNo', {
              value: blockNo,
              onChange: (e) => setBlockNo(e.target.value),
            }),
          }}
          isError={errors?.blockNo ? true : false}
          errorMessage={errors?.blockNo?.message}
        />

        <LabelWithInput
          id="street"
          label="Street"
          placeholder="Street"
          autoComplete="off"
          size="large"
          controller={{
            ...register('street', { value: street, onChange: (e) => setStreet(e.target.value) }),
          }}
          isError={errors?.street ? true : false}
          errorMessage={errors?.street?.message}
        />
        <LabelWithInput
          id="subdivision"
          label="Subdivision / Purok / Village"
          placeholder="Subdivision"
          autoComplete="off"
          size="large"
          controller={{
            ...register('subdivision', {
              value: subdivision,
              onChange: (e) => setSubdivision(e.target.value),
            }),
          }}
          isError={errors?.subdivision ? true : false}
          errorMessage={errors?.subdivision?.message}
          isRequired
        />

        <LabelWithInput
          id="barangay"
          label="Barangay"
          placeholder="Barangay"
          autoComplete="off"
          size="large"
          controller={{
            ...register('barangay', {
              value: barangay,
              onChange: (e) => setBarangay(e.target.value),
            }),
          }}
          isError={errors?.barangay ? true : false}
          errorMessage={errors?.barangay?.message}
          isRequired
        />

        <LabelWithInput
          id="province"
          label="Province"
          placeholder="Province"
          autoComplete="off"
          size="large"
          controller={{
            ...register('province', {
              value: province,
              onChange: (e) => setProvince(e.target.value),
            }),
          }}
          isError={errors?.province ? true : false}
          errorMessage={errors?.province?.message}
          isRequired
          disabled
        />
        <LabelWithInput
          id="city"
          label="City"
          placeholder="City"
          autoComplete="off"
          size="large"
          controller={{
            ...register('city', { value: city, onChange: (e) => setCity(e.target.value) }),
          }}
          isError={errors?.city ? true : false}
          errorMessage={errors?.city?.message}
          isRequired
          disabled
        />
        <LabelWithInput
          id="zipCode"
          label="ZIP Code"
          type="number"
          placeholder="ZIP Code"
          autoComplete="off"
          size="large"
          controller={{
            ...register('zipCode', {
              value: zipCode,
              onChange: (e) => setZipCode(e.target.value),
            }),
          }}
          isError={errors?.zipCode ? true : false}
          errorMessage={errors?.zipCode?.message}
          isRequired
          disabled
        />
      </div>

      <div className="text-xl font-medium text-gray-600 mb-2 flex gap-1 items-center mt-10">
        <span>Other Info</span>
      </div>

      <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4">
        <LabelWithInput
          id="noOfPersonsInHousehold"
          label="No. of Persons in Household"
          placeholder="ex. 1"
          autoComplete="off"
          size="large"
          controller={{
            ...register('noOfPersonsInHousehold', {
              value: noOfPersonsInHousehold,
              onChange: (e) => setNoOfPersonsInHousehold(e.target.value),
              valueAsNumber: true,
            }),
          }}
          isError={errors?.noOfPersonsInHousehold ? true : false}
          errorMessage={errors?.noOfPersonsInHousehold?.message}
          isRequired
        />

        <LabelWithInput
          id="noOfHouseInLot"
          label="No. of House in Lot"
          placeholder="ex. 1"
          autoComplete="off"
          size="large"
          controller={{
            ...register('noOfHouseInLot', {
              value: noOfHouseInLot,
              onChange: (e) => setNoOfHouseInLot(e.target.value),
              valueAsNumber: true,
            }),
          }}
          isError={errors?.noOfHouseInLot ? true : false}
          errorMessage={errors?.noOfHouseInLot?.message}
          isRequired
        />
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
        <Button variant="alternative">Proceed</Button>
      </div>
    </form>
  );
};
