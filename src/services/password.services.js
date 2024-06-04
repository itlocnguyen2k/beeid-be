import { omit } from "lodash";
import Accounts from "../models/account.models";
import { generatorCode } from "../utils/auth.utils";
import { sendMailGeneratorPasswordTemplate, sendMailVerifyPasswordCodeTemplate } from "../utils/mail.utils";
import { generatorPassword, hashSyncPassword, verifyPassword } from "../utils/password.utils";
import { handleServicesErrors } from "../utils/response.utils";

export async function resetPasswordService(email) {
  try {
    const account = await Accounts.findOne({ email: email });
    if (!account) {
      return false;
    }
    const passwordCode = generatorCode();
    account.passwordCode = passwordCode;
    account.save();

    const mailTo = account.email;
    await sendMailVerifyPasswordCodeTemplate(mailTo, passwordCode, account.userName);

    return true;
  } catch (e) {
    handleServicesErrors(e);
  }
}

export async function verifyResetPasswordCodeService(email, passwordCode) {
  try {
    const account = await Accounts.findOne({ email: email });
    if (!account || !account.passwordCode) {
      return false;
    }
    const isVerify = account.passwordCode === passwordCode ? true : false;
    if (!isVerify) {
      return false;
    }

    const password = await generatorPassword();
    account.password = await hashSyncPassword(password);
    account.passwordCode = "";
    account.save();

    const mailTo = account.email;
    await sendMailGeneratorPasswordTemplate(mailTo, password, account.userName);

    return true;
  } catch (e) {
    handleServicesErrors(e);
  }
}

export async function changePasswordFirstTimeService(email, passwordOld, passwordNew) {
  try {
    const account = await Accounts.findOne({ email: email });
    if (!account) {
      return false;
    }
    const isVerify = await verifyPassword(passwordOld, account.password);
    if (!isVerify) {
      return false;
    }

    account.password = await hashSyncPassword(passwordNew);
    if (account.isLoginFirstTime) {
      account.isLoginFirstTime = 0;
    }
    account.save();

    return omit(account.toJSON(), "password", "loginCode", "passwordCode");
  } catch (e) {
    handleServicesErrors(e);
  }
}

export async function tryVerifyPasswordCodeService(email) {
  try {
    const account = await Accounts.findOne({ email: email });
    if (!account) {
      return false;
    }

    const passwordCode = generatorCode();
    account.passwordCode = passwordCode;
    account.save();

    const mailTo = account.email;
    await sendMailVerifyPasswordCodeTemplate(mailTo, passwordCode, account.userName);

    return true;
  } catch (e) {
    handleServicesErrors(e);
  }
}

export async function changePasswordService(parameters) {
  try {
    const account = await Accounts.findById(parameters.id);
    if (!account) {
      return false;
    }
    const isVerify = await verifyPassword(parameters.passwordOld, account.password);
    if (!isVerify) {
      return false;
    }

    account.password = await hashSyncPassword(parameters.passwordNew);
    account.save();

    return true;
  } catch (e) {
    handleServicesErrors(e);
  }
}
