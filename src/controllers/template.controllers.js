import {
  templateCheckExistService,
  templateCreateService,
  templateDeleteService,
  templateListService,
  templateUpdateService,
} from "../services/template.services";
import { handleResponseErrors, handleResponseSuccess } from "../utils/response.utils";

export async function templateListController(req, res, next) {
  try {
    const templates = await templateListService();
    handleResponseSuccess(res, templates, "Lấy danh sách hạng mục thành công !");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}

export async function templateCreateController(req, res, next) {
  try {
    const parameters = req.body;
    const isSuccess = await templateCreateService(parameters);
    if (!isSuccess) {
      return handleResponseSuccess(res, false, `Hạng mục ${parameters.templateName} đã tồn tại. Vui lòng thử lại !`);
    }

    handleResponseSuccess(res, true, "Thành công !");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}

export async function templateCheckExistController(req, res, next) {
  try {
    const { name } = req.body;
    const isSuccess = await templateCheckExistService(name);
    if (!isSuccess) {
      return res.status(200).json({
        code: 200,
        data: false,
        message: `Hạng mục ${name} đã tồn tại. Vui lòng thử lại !`,
      });
    }

    handleResponseSuccess(res, true, "Thành công !");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}

export async function templateUpdateController(req, res, next) {
  try {
    const parameters = req.body;
    const isSuccess = await templateUpdateService(parameters);
    if (!isSuccess) {
      return handleResponseSuccess(res, false, `Hạng mục ${parameters.templateName} đã tồn tại. Vui lòng thử lại !`);
    }

    handleResponseSuccess(res, true, "Thành công !");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}

export async function templateDeleteController(req, res, next) {
  try {
    const parameters = req.body;
    const isSuccess = await templateDeleteService(parameters);
    if (!isSuccess) {
      return handleResponseSuccess(res, false, "Thất bại. Vui lòng thử lại !");
    }
    handleResponseSuccess(res, true, "Thành công !");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}
