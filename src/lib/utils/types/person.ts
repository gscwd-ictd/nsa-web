export type Person = {
  firstName: string;
  middleName: string;
  lastName: string;
  nameExt: string;
};

export type ApplicantDetails = Person & {
  mobileNumber: string;
  emailAddress: string;
  birthDate: string;
  ownershipType?: 'owner' | 'tenant' | undefined;
};

export type Household = {
  noOfPersonsInHousehold: number | undefined;
  noOfHouseInLot: number | undefined;
};
