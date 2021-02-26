import { IsNotEmpty } from "class-validator";

class LoginDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}

export default LoginDto;
