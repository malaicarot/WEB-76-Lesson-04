import { ERROR_MSG } from "../constants/errorMessage.constant.js";
import { BadRequestError } from "../error/BadRequest.error.js";
import { CommonUtils } from "../utils/common.util.js";
import joi from "joi";



const registerValidator = (data) => {
    const rule = joi.object({
        name: joi.string().min(6).max(225).required(),
        email: joi.string().min(11).max(225).required().email(),
        password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,20}$')).required(),
    })

    return rule.validate(data);
}

export class UserDTO {
  constructor(user) {
    if (
      !("userName" in user) &&
      CommonUtils.checkNullOrUndefined(user.userName) || !registerValidator(user)
    ) {
      throw BadRequestError(ERROR_MSG.INVALID_REQ);
    }



    this.id = CommonUtils.checkNullOrUndefined(user.id) ? user.id : null;
    this.userName = user.userName;
    this.email = user.email;
    this.pass = user.pass;
  }
}
