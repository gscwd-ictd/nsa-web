/* eslint-disable @typescript-eslint/no-unused-vars */
import { z, ZodType } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ApplicantDetails, Household } from '@nsa/lib/utils/types/person';
import { useApplicationFormStepStore, useApplicationFormStore } from '@nsa/lib/zustand/useApplicationFormStore';
import { LabelWithInput } from '../../ui/LabelWithInput';
import { BsPersonStanding } from 'react-icons/bs';
import { Address } from '@nsa/lib/utils/types/address';
import { usePageContext } from '@nsa/lib/providers/PageProvider';
import { FormButton } from '../../ui/FormButton';
import { Button } from '../../ui/Button';
import { Alert, AlertDescription, AlertTitle } from '../../ui/Alert';
import { LucideLightbulb } from 'lucide-react';
import { FunctionComponent } from 'react';

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

export const ApplicantDetailsFormV2: FunctionComponent = () => {
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

      <div className="grid sm:grid-cols-1 md:grid-cols-1  lg:grid-cols-2 mt-10 gap-4">
        <div>
          <div className="text-xl font-medium text-gray-900 mb-2 flex gap-1 items-center col-span-2 ">
            {/* <GoPersonFill /> */}
            <span>Personal Information</span>
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 mt-5">
            <div className="flex flex-col gap-1">
              <label htmlFor="firstName">First Name</label>
              <input
                {...register('firstName', {
                  value: firstName,
                  onChange: (e) => setFirstName(e.target.value),
                })}
                className="border-2 h-[3rem] rounded-lg px-2"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="middleName">Middle Name</label>
              <input
                {...register('middleName', {
                  value: middleName,
                  onChange: (e) => setMiddleName(e.target.value),
                })}
                className="border-2 h-[3rem] rounded-lg px-2"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="lastName">Last Name</label>
              <input
                {...register('lastName', {
                  value: lastName,
                  onChange: (e) => setLastName(e.target.value),
                })}
                className="border-2 h-[3rem] rounded-lg px-2"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="nameExt">Suffix/Extension</label>
              <input
                {...register('nameExt', {
                  value: nameExt,
                  onChange: (e) => setNameExt(e.target.value),
                })}
                className="border-2 h-[3rem] rounded-lg px-2"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="birthDate">Birthday</label>
              <input
                {...register('birthDate', {
                  value: birthDate,
                  onChange: (e) => setBirthDate(e.target.value),
                })}
                type="date"
                className="border-2 h-[3rem] rounded-lg px-2"
              />
            </div>
          </div>
        </div>

        <div>
          <div className="text-xl font-medium text-gray-900 mb-2 flex gap-1 items-center col-span-2">
            <span>Contact Information</span>
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-1  lg:grid-cols-2 gap-4 mt-5">
            <div className="flex flex-col gap-1">
              <label htmlFor="mobileNumber">Mobile Number</label>
              <input
                {...register('mobileNumber', {
                  value: mobileNumber,
                  onChange: (e) => setMobileNumber(e.target.value),
                })}
                className="border-2 h-[3rem] rounded-lg px-2"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="emailAddress">Email Address</label>
              <input
                {...register('emailAddress', {
                  value: emailAddress,
                  onChange: (e) => setEmailAddress(e.target.value),
                })}
                type="email"
                className="border-2 h-[3rem] rounded-lg px-2"
              />
            </div>
          </div>
        </div>
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
