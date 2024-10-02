import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-api";

class UnauthorizedError extends CustomAPIError {
  statusCode: number;

  constructor(message: any) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default UnauthorizedError;
