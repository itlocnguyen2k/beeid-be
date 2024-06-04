import { object, string } from "yup";

export const accountSchema = object({
  body: object({
    email: string().email("Sai định dạng Email").required("Email là mục bắt buộc !"),
    userName: string().required("Biệt danh là mục bắt buộc !"),
    fullName: string().required("Họ và tên là mục bắt buộc !"),
    dob: string().required("Ngày sinh là mục bắt buộc !"),
    position: string().required("Vị trí là mục bắt buộc !"),
  }),
});

export const accountIdSchema = object({
  body: object({
    accountId: string().required("ID là mục bắt buộc !"),
  }),
});
