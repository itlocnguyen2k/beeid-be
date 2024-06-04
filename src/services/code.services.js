import { omit } from "lodash";
import Accounts from "../models/account.models";
import { generatorCode } from "../utils/auth.utils";
import { sendMailVerifyLoginCodeTemplate } from "../utils/mail.utils";
import { handleServicesErrors } from "../utils/response.utils";

export async function verifyLoginCodeService(email, loginCode) {
  try {
    const account = await Accounts.findOne({ email: email });
    if (!account) {
      return false;
    }

    if (account.loginCode !== loginCode) {
      return false;
    }
    return omit(account.toJSON(), "password", "loginCode", "passwordCode");
  } catch (e) {
    handleServicesErrors(e);
  }
}

export async function tryVerifyLoginCodeService(email) {
  try {
    const account = await Accounts.findOne({ email: email });
    if (!account) {
      return false;
    }

    const loginCode = generatorCode();
    account.loginCode = loginCode;
    account.save();

    const mailTo = account.email;
    await sendMailVerifyLoginCodeTemplate(mailTo, loginCode);

    return true;
  } catch (e) {
    handleServicesErrors(e);
  }
}
