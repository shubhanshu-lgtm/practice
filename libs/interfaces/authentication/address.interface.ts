import { ADDRESS_TYPE } from "../../constants/autenticationConstants/userContants";

export declare namespace AddressI 
{

    interface AddAdress
    {
        street: string,
        houseNo: string,
        city: string,
        state: string,
        country: string,
        postalCode: string,
        isDefault?:boolean,
        userId?: number,
        addressType: ADDRESS_TYPE,
        latitude?: number,
        longitude?: number,
        landmark?:string
    }

    interface UpdateAdress extends Partial<AddAdress>
    {
        id: number;
    }
}