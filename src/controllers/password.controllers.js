import {
  changePasswordFirstTimeService,
  changePasswordService,
  resetPasswordService,
  tryVerifyPasswordCodeService,
  verifyResetPasswordCodeService,
} from "../services/password.services";
import { handleResponseErrors, handleResponseSuccess } from "../utils/response.utils";

export async function resetPasswordController(req, res, next) {
  try {
    const { email } = req.body;

    const isSuccess = await resetPasswordService(email);
    if (!isSuccess) {
      return handleResponseSuccess(res, false, "Email không tồn tại. Vui lòng thử lại !");
    }

    handleResponseSuccess(res, true, "Xác thực thành công !");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}

export async function verifyResetPasswordCodeController(req, res, next) {
  try {
    const { email, passwordCode } = req.body;

    const isSuccess = await verifyResetPasswordCodeService(email, passwordCode);
    if (!isSuccess) {
      return handleResponseSuccess(res, false, "Mã xác thực không chính xác. Vui lòng thử lại !");
    }

    handleResponseSuccess(res, true, "Thành công. Vui lòng kiểm tra E-mail !");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}

export async function changePasswordFirstTimeController(req, res, next) {
  try {
    const { passwordOld, passwordNew } = req.body;
    const { data } = req.data;

    const account = await changePasswordFirstTimeService(data.email, passwordOld, passwordNew);
    if (!account) {
      return handleResponseSuccess(res, false, "Mật khẩu cũ không chính xác. Vui lòng thử lại !");
    }

    handleResponseSuccess(res, { account }, "Thay đổi mật khẩu thành công !");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}

export async function tryVerifyPasswordCodeController(req, res, next) {
  try {
    const { email } = req.body;

    const isSuccess = await tryVerifyPasswordCodeService(email);
    if (!isSuccess) {
      return handleResponseSuccess(res, false, "Gửi lại mã xác thực thất bại. Vui lòng thử lại !");
    }

    handleResponseSuccess(res, true, "Thành công. Vui lòng kiểm tra E-mail !");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}

export async function changePasswordController(req, res, next) {
  try {
    const parameters = req.body;

    const isSuccess = await changePasswordService(parameters);
    if (!isSuccess) {
      return handleResponseSuccess(res, false, "Mật khẩu cũ không chính xác. Vui lòng thử lại !");
    }

    handleResponseSuccess(res, true, "Thay đổi mật khẩu thành công !");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}
