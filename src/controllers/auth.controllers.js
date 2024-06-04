import { loginService } from "../services/auth.services";
import { generatorAccessToken } from "../utils/auth.utils";
import { handleResponseErrors, handleResponseSuccess } from "../utils/response.utils";

export async function loginController(req, res, next) {
  try {
    const { email, password } = req.body;
    const account = await loginService(email, password);

    if (!account) {
      return handleResponseSuccess(res, false, "Thông tin tài khoản hoặc mật khẩu không chính xác !");
    }

    const token = generatorAccessToken(account);
    handleResponseSuccess(res, { token }, "Đăng nhập thành công !");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}
