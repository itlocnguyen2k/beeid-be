import { labelCheckExistService, labelCreateService, labelDeleteService, labelListService, labelUpdateService } from "../services/label.services";
import { handleResponseErrors, handleResponseSuccess } from "../utils/response.utils";

export async function labelListController(req, res, next) {
  try {
    const labels = await labelListService();
    handleResponseSuccess(res, labels, "Lấy danh sách nhãn thành công !");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}

export async function labelCreateController(req, res, next) {
  try {
    const parameters = req.body;
    const isSuccess = await labelCreateService(parameters);
    if (!isSuccess) {
      return handleResponseSuccess(res, false, `Nhãn ${parameters.labelName} đã tồn tại. Vui lòng thử lại !`);
    }

    handleResponseSuccess(res, true, "Thành công !");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}

export async function labelCheckExistController(req, res, next) {
  try {
    const { name } = req.body;
    const isSuccess = await labelCheckExistService(name);
    if (!isSuccess) {
      return handleResponseSuccess(res, false, `Nhãn ${name} đã tồn tại. Vui lòng thử lại !`);
    }

    handleResponseSuccess(res, true, "Thành công !");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}

export async function labelUpdateController(req, res, next) {
  try {
    const parameters = req.body;
    const isSuccess = await labelUpdateService(parameters);
    if (!isSuccess) {
      return handleResponseSuccess(res, false, `Nhãn ${parameters.labelName} đã tồn tại. Vui lòng thử lại !`);
    }

    handleResponseSuccess(res, true, "Thành công !");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}

export async function labelDeleteController(req, res, next) {
  try {
    const parameters = req.body;
    const isSuccess = await labelDeleteService(parameters);
    if (!isSuccess) {
      return handleResponseSuccess(res, false, "Thất bại. Vui lòng thử lại !");
    }
    handleResponseSuccess(res, true, "Thành công !");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}
