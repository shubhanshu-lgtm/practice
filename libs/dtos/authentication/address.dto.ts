import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, isString } from "class-validator";
import { ADDRESS_TYPE } from "../../constants/autenticationConstants/userContants";
import { Type } from "class-transformer";

export class InsertAddressDto {
    @IsString()
    // @IsNotEmpty({ message: 'Street is required' })
    street: string;
  
    @IsString()
    // @IsNotEmpty({ message: 'House No is required' })
    houseNo: string;

    @IsString()
    // @IsNotEmpty({ message: 'City is required' })
    city: string;

    @IsString()
    // @IsNotEmpty({ message: 'City is required' })
    state: string;

    @IsString()
    // @IsNotEmpty({ message: 'Country is required' })
    country: string;


    @IsString()
    // @IsNotEmpty({ message: 'PostalCode is required' })
    postalCode: string;

    @IsBoolean()
    @IsOptional()
    isDefault:boolean

    @IsString()
    addressType: ADDRESS_TYPE

    @IsNumber()
    @IsOptional()
    userId: number

    @IsOptional()
    @Type(() => Number)
    @IsNumber({}, { message: 'latitude must be a number' })
    latitude?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber({}, { message: 'longitude must be a number' })
    longitude?: number;

    @IsString()
    @IsOptional()
    landmark?: string;
  }


  export class RemoveAddressDto {
    @IsNotEmpty({ message: 'id is required' })
    id: number;
  }


  export class EditAddressDto {

    @IsNumber()
    @IsOptional()
    userId?: number

    @IsString()
    @IsOptional()
    // @IsNotEmpty({ message: 'Street is required' })
    street: string;
  
    @IsString()
    @IsOptional()
    // @IsNotEmpty({ message: 'House No is required' })
    houseNo: string;

    @IsString()
    @IsOptional()
    // @IsNotEmpty({ message: 'City is required' })
    city: string;

    @IsString()
    @IsOptional()
    // @IsNotEmpty({ message: 'Country is required' })
    country: string;

    @IsString()
    @IsOptional()
    // @IsNotEmpty({ message: 'Country is required' })
    state: string;
    
    @IsString()
    @IsOptional()
    // @IsNotEmpty({ message: 'PostalCode is required' })
    postalCode: string;

    @IsBoolean()
    @IsOptional()
    isDefault:boolean

    @IsString()
    @IsOptional()
    addressType: string

    @IsOptional()
    @Type(() => Number)
    @IsNumber({}, { message: 'latitude must be a number' })
    latitude?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber({}, { message: 'longitude must be a number' })
    longitude?: number;

    @IsString()
    @IsOptional()
    landmark?: string;
    
  }

  export class GetAddressByIdDto {
    @IsString()
    id: string;
  }