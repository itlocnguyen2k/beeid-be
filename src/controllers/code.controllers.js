import { tryVerifyLoginCodeService, verifyLoginCodeService } from "../services/code.services";
import { handleResponseErrors, handleResponseSuccess } from "../utils/response.utils";

export async function verifyLoginCodeController(req, res, next) {
  try {
    const { loginCode } = req.body;
    const { data } = req.data;

    const account = await verifyLoginCodeService(data.email, loginCode);
    if (!account) {
      return handleResponseSuccess(res, false, "Mã xác thực không chính xác. Vui lòng thử lại !");
    }

    handleResponseSuccess(res, { account }, "Xác thực thành công !");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}

export async function tryVerifyLoginCodeController(req, res, next) {
  try {
    const { data } = req.data;

    const isSuccess = await tryVerifyLoginCodeService(data.email);
    if (!isSuccess) {
      return handleResponseSuccess(res, false, "Gửi lại mã xác thực thất bại. Vui lòng thử lại !");
    }

    handleResponseSuccess(res, true, "Thành công. Vui lòng kiểm tra E-mail !");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}
