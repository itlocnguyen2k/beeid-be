import { object, string } from "yup";

export const followingsSchema = object({
  body: object({
    reciever: string().required("Người nhận là mục bắt buộc !"),
  }),
});
