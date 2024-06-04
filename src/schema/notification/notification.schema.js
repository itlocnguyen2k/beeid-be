import { object, string } from "yup";

export const notificationSchema = object({
  body: object({
    id: string().required("Người nhận là mục bắt buộc !"),
  }),
});
