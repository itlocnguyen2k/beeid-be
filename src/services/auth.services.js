import { omit } from "lodash";
import Accounts from "../models/account.models";
import { generatorCode } from "../utils/auth.utils";
import { sendMailVerifyLoginCodeTemplate } from "../utils/mail.utils";
import { verifyPassword } from "../utils/password.utils";
import { handleServicesErrors } from "../utils/response.utils";

export async function loginService(email, password) {
  try {
    const account = await Accounts.findOne({ email: email });
    if (!account) {
      return false;
    }
    const isVerify = await verifyPassword(password, account.password);
    if (!isVerify) {
      return false;
    }
    const loginCode = generatorCode();
    account.loginCode = loginCode;
    account.status = 1;
    account.save();

    const mailTo = account.email;
    console.log(loginCode);
    await sendMailVerifyLoginCodeTemplate(mailTo, loginCode);

    return omit(account.toJSON(), "password", "loginCode", "passwordCode");
  } catch (e) {
    handleServicesErrors(e);
  }
}
