import {
  accountCreateService,
  accountDeleteService,
  accountDetailService,
  accountListService,
  accountUpdatePermissionService,
  accountUpdateService,
} from "../services/account.service";
import { handleResponseErrors, handleResponseSuccess } from "../utils/response.utils";

export async function accountListController(req, res, next) {
  try {
    const parameters = req.body;
    const { data } = req.data;
    const accounts = await accountListService(parameters, data);
    handleResponseSuccess(
      res,
      {
        accounts,
        total: accounts.length,
      },
      "Lấy danh sách tài khoản thành công !",
    );
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}

export async function accountCreateController(req, res, next) {
  try {
    const parameters = req.body;
    const file = req.file;
    const isSuccess = await accountCreateService(parameters, file);
    if (!isSuccess) {
      return handleResponseSuccess(res, false, `Tài khoản ${parameters.email} đã tồn tại. Vui lòng thử lại !`);
    }
    handleResponseSuccess(res, true, "Thành công. Vui lòng kiểm tra E-mail !");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}

export async function accountDetailController(req, res, next) {
  try {
    const { accountId } = req.body;
    const account = await accountDetailService(accountId);
    if (!account) {
      return handleResponseSuccess(res, false, "Không tìm thấy tài khoản. Vui lòng thử lại !");
    }
    handleResponseSuccess(res, { account }, "Không tìm thấy tài khoản. Vui lòng thử lại !");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}

export async function accountUpdateController(req, res, next) {
  try {
    const parameters = req.body;
    const file = req.file;
    const account = await accountUpdateService(parameters, file);
    if (!account) {
      return handleResponseSuccess(res, false, "Thất bại. Vui lòng thử lại !");
    }
    handleResponseSuccess(res, { account: account }, "Thành công !");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}

export async function accountUpdatePermissionController(req, res, next) {
  try {
    const parameters = req.body;
    const account = await accountUpdatePermissionService(parameters);
    if (!account) {
      return handleResponseSuccess(res, false, "Thất bại. Vui lòng thử lại !");
    }
    handleResponseSuccess(res, { account: account }, "Thành công !");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}

export async function accountDeleteController(req, res, next) {
  try {
    const parameters = req.body;
    const { data } = req.data;
    const account = await accountDeleteService(parameters, data);
    if (!account) {
      return handleResponseSuccess(res, false, "Thất bại. Vui lòng thử lại !");
    }
    handleResponseSuccess(res, true, "Thành công !");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}
