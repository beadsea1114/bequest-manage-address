import { STATUSES } from "./statuses";

export type Status = typeof STATUSES[number];

export interface Address {
  id: number;
  line_1: string;
  line_2?: string;
  line_3?: string;
  postcode: string;
  town: string;
  country: string;
}

export interface AddressBookState{
  list: Array<Address>;
  showAddAddressDialog: boolean;
  showSearchByPostcodeDialog: boolean;
  selected: Address | null
}
