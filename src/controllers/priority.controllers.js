import {
  priorityCheckExistService,
  priorityCreateService,
  priorityDeleteService,
  priorityListService,
  priorityUpdateService,
} from "../services/priority.services";
import { handleResponseErrors, handleResponseSuccess } from "../utils/response.utils";

export async function priorityListController(req, res, next) {
  try {
    const priorities = await priorityListService();
    handleResponseSuccess(res, priorities, "Lấy danh sách độ ưu tiên thành công !");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}

export async function priorityCreateController(req, res, next) {
  try {
    const parameters = req.body;
    const isSuccess = await priorityCreateService(parameters);
    if (!isSuccess) {
      return handleResponseSuccess(res, false, `Độ ưu tiên ${parameters.priorityName} đã tồn tại. Vui lòng thử lại !`);
    }

    handleResponseSuccess(res, true, "Thành công !");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}

export async function priorityCheckExistController(req, res, next) {
  try {
    const { name } = req.body;
    const isSuccess = await priorityCheckExistService(name);
    if (!isSuccess) {
      return handleResponseSuccess(res, false, `Độ ưu tiên ${name} đã tồn tại. Vui lòng thử lại !`);
    }
    handleResponseSuccess(res, true, "Thành công !");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}

export async function priorityUpdateController(req, res, next) {
  try {
    const parameters = req.body;
    const isSuccess = await priorityUpdateService(parameters);
    if (!isSuccess) {
      return handleResponseSuccess(res, false, `Độ ưu tiên ${parameters.priorityName} đã tồn tại. Vui lòng thử lại !`);
    }

    handleResponseSuccess(res, true, "Thành công !");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}

export async function priorityDeleteController(req, res, next) {
  try {
    const parameters = req.body;
    const isSuccess = await priorityDeleteService(parameters);
    if (!isSuccess) {
      return handleResponseSuccess(res, false, "Thất bại. Vui lòng thử lại !");
    }
    handleResponseSuccess(res, true, "Thành công !");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}