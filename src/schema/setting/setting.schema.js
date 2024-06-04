import { object, string } from "yup";

export const categoryCreateSchema = object({
  body: object({
    categoryName: string().required("Phân loại là mục bắt buộc !"),
    color: string().required("Màu sắc là mục bắt buộc !"),
  }),
});

export const categoryExistSchema = object({
  body: object({
    name: string().required("Phân loại là mục bắt buộc !"),
  }),
});

export const labelCreateSchema = object({
  body: object({
    labelName: string().required("Nhãn là mục bắt buộc !"),
    color: string().required("Màu sắc là mục bắt buộc !"),
  }),
});

export const labelExistSchema = object({
  body: object({
    name: string().required("Nhãn là mục bắt buộc !"),
  }),
});

export const priorityCreateSchema = object({
  body: object({
    priorityName: string().required("Độ ưu tiên là mục bắt buộc !"),
    color: string().required("Màu sắc là mục bắt buộc !"),
  }),
});

export const priorityExistSchema = object({
  body: object({
    name: string().required("Độ ưu tiên là mục bắt buộc !"),
  }),
});
