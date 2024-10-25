export type Address = {
  lotNo: string;
  blockNo: string;
  barangay: string;
  street: string;
  subdivision: string;
  province: string;
  city: string;
  zipCode: string;
  landmark: string;
  neighbors: string;
  remarks: string;
};

export type RelatedAddress = Pick<Address, 'landmark' | 'neighbors' | 'remarks'>;
