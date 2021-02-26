import HttpException from "./HttpException";

class UserWithThatEmailAlreadyExistException extends HttpException {
  constructor(email: string) {
    super(409, `User with '${email}' already exist.`);
  }
}

export default UserWithThatEmailAlreadyExistException;
