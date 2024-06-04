import {
  categoryCheckExistService,
  categoryCreateService,
  categoryDeleteService,
  categoryListService,
  categoryUpdateService,
} from "../services/category.services";
import { handleResponseErrors, handleResponseSuccess } from "../utils/response.utils";

export async function categoryListController(req, res, next) {
  try {
    const categories = await categoryListService();
    handleResponseSuccess(res, categories, "Lấy danh sách phân loại thành công !");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}

export async function categoryCreateController(req, res, next) {
  try {
    const parameters = req.body;
    const isSuccess = await categoryCreateService(parameters);
    if (!isSuccess) {
      return handleResponseSuccess(res, false, `Phân loại ${parameters.categoryName} đã tồn tại. Vui lòng thử lại !`);
    }

    handleResponseSuccess(res, true, "Thành công !");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}

export async function categoryCheckExistController(req, res, next) {
  try {
    const { name } = req.body;
    const isSuccess = await categoryCheckExistService(name);
    if (!isSuccess) {
      return handleResponseSuccess(res, false, `Phân loại ${name} đã tồn tại. Vui lòng thử lại !`);
    }

    handleResponseSuccess(res, true, "Thành công !");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}

export async function categoryUpdateController(req, res, next) {
  try {
    const parameters = req.body;
    const isSuccess = await categoryUpdateService(parameters);
    if (!isSuccess) {
      return handleResponseSuccess(res, false, `Phân loại ${parameters.categoryName} đã tồn tại. Vui lòng thử lại !`);
    }

    handleResponseSuccess(res, true, "Thành công !");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}

export async function categoryDeleteController(req, res, next) {
  try {
    const parameters = req.body;
    const isSuccess = await categoryDeleteService(parameters);
    if (!isSuccess) {
      return handleResponseSuccess(res, false, "Thất bại. Vui lòng thử lại !");
    }
    handleResponseSuccess(res, true, "Thành công !");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}
