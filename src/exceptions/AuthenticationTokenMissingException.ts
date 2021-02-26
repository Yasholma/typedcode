import HttpException from "./HttpException";

class AuthenticationTokenMissingException extends HttpException {
  constructor() {
    super(401, "Missing Authentication Token.");
  }
}

export default AuthenticationTokenMissingException;
