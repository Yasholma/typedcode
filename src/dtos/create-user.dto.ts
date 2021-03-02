import { IsNotEmpty, IsString } from "class-validator";

class Address {
  city: string;
  state: string;
}

class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  address: Address;
}

export default CreateUserDto;
