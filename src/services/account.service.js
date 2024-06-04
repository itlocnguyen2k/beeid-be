import { omit } from "lodash";
import Accounts from "../models/account.models";
import Trashs from "../models/trash.models";
import { createAccountTemplate } from "../utils/mail.utils";
import { createParameterQuerry, createParameterUpdate, createTrashObject } from "../utils/parameter.utils";
import { generatorPassword, hashSyncPassword } from "../utils/password.utils";
import { handleServicesErrors, handleServicesPermission } from "../utils/response.utils";

export async function accountListService(parameters, data) {
  try {
    const parameterTemp = createParameterQuerry(parameters);
    const accounts = await Accounts.find({ ...parameterTemp, $or: [{ isDelete: 0 }] });
    if (!accounts) {
      return false;
    }

    const result = await handleServicesPermission(accounts, data, "accountEdit", "accountDelete");

    return result.map((account) => {
      return omit(account, "password", "loginCode", "passwordCode");
    });
  } catch (e) {
    handleServicesErrors(e);
  }
}

export async function accountCreateService(parameters, file) {
  try {
    const accountVerifyEmail = await Accounts.findOne({ email: parameters.email });
    if (accountVerifyEmail) {
      return false;
    }
    const account = new Accounts(parameters);
    const password = await generatorPassword();
    account.password = await hashSyncPassword(password);
    if (file) {
      account.avatar = "/src/public/image/" + file.filename;
    }
    account.permission = {
      accountCreate: true,
      accountEdit: true,
      accountDelete: true,
      projectCreate: true,
      projectEdit: true,
      projectDelete: true,
      sprintCreate: true,
      sprintEdit: true,
      sprintDelete: true,
      taskCreate: true,
      taskEdit: true,
      taskDelete: true,
      subTaskCreate: true,
      subTaskEdit: true,
      subTaskDelete: true,
      settingList: true,
      trashList: true,
      reportList: true,
      meetingList: true,
    };
    account.save();

    const mailTo = account.email;
    await createAccountTemplate(mailTo, password, account.userName);

    return true;
  } catch (e) {
    handleServicesErrors(e);
  }
}

export async function accountDetailService(id) {
  try {
    const account = await Accounts.findById(id).populate("followers").populate("followings").populate("friends");
    if (!account) {
      return false;
    }
    return omit(account.toJSON(), "password", "loginCode", "passwordCode");
  } catch (e) {
    handleServicesErrors(e);
  }
}

export async function accountUpdateService(parameters, file) {
  try {
    const accountVerifyId = await Accounts.findById(parameters.accountId);
    if (!accountVerifyId) {
      return false;
    }

    await createParameterUpdate(parameters, accountVerifyId);

    if (file) {
      accountVerifyId.avatar = "/src/public/image/" + file.filename;
    }
    accountVerifyId.save();

    return omit(accountVerifyId.toJSON(), "password", "loginCode", "passwordCode");
  } catch (e) {
    handleServicesErrors(e);
  }
}

export async function accountUpdatePermissionService(parameters) {
  try {
    const accountVerifyId = await Accounts.findById(parameters.accountId);
    if (!accountVerifyId) {
      return false;
    }

    await createParameterUpdate(parameters, accountVerifyId);
    accountVerifyId.permission = parameters.permission;
    accountVerifyId.save();

    return true;
  } catch (e) {
    handleServicesErrors(e);
  }
}

export async function accountDeleteService(parameters, data) {
  try {
    const account = await Accounts.findById(parameters.id);
    if (!account) {
      return false;
    }

    const trash = new Trashs(createTrashObject(data._id, account._id, 1, "Accounts"));
    trash.save();

    account.isDelete = 1;
    account.save();

    return true;
  } catch (e) {
    handleServicesErrors(e);
  }
}
