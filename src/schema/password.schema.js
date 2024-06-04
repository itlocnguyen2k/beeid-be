import { object, string } from "yup";
export const emailSchema = object({
  body: object({
    email: string().email("Sai định dạng Email").required("Email là mục bắt buộc !"),
  }),
});

export const passwordCodeSchema = object({
  body: object({
    passwordCode: string().required("Mã xác thực là mục bắt buộc !"),
  }),
});

export const changePasswordSchema = object({
  body: object({
    passwordOld: string().required("Mật khẩu cũ là mục bắt buộc !").min(8, "Mật khẩu cũ phải có ít nhất 8 kí tự !"),
    passwordNew: string().required("Mật khẩu mới là mục bắt buộc !").min(8, "Mật khẩu mới phải có ít nhất 8 kí tự !"),
  }),
});
