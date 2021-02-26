import HttpException from "./HttpException";

class WrongCredentialsException extends HttpException {
  constructor() {
    super(401, "Wrong credentials entered.");
  }
}

export default WrongCredentialsException;
