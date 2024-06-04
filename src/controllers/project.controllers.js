import {
  projectCreateService,
  projectDeleteService,
  projectDetailService,
  projectListService,
  projectUpdateService,
} from "../services/project.services";
import { handleResponseErrors, handleResponseSuccess } from "../utils/response.utils";

export async function projectListController(req, res, next) {
  try {
    const parameters = req.body;
    const { data } = req.data;
    const projects = await projectListService(parameters, data);
    handleResponseSuccess(
      res,
      {
        projects,
        total: projects.length,
      },
      "Lấy danh sách dự án thành công !",
    );
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}

export async function projectCreateController(req, res, next) {
  try {
    const parameters = req.body;
    const file = req.file;
    const { data } = req.data;
    const isSuccess = await projectCreateService(parameters, data, file);
    if (!isSuccess) {
      return handleResponseSuccess(res, false, "Thất bại. Vui lòng thử lại !");
    }
    handleResponseSuccess(res, true, "Thành công");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}

export async function projectDetailController(req, res, next) {
  try {
    const { projectId } = req.body;
    const project = await projectDetailService(projectId);
    if (!project) {
      return handleResponseSuccess(res, false, "Không tìm thấy dự án. Vui lòng thử lại !");
    }

    handleResponseSuccess(res, { project }, "Thành công !");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}

export async function projectUpdateController(req, res, next) {
  try {
    const parameters = req.body;
    const file = req.file;
    const { data } = req.data;
    const project = await projectUpdateService(parameters, data, file);
    if (!project) {
      return handleResponseSuccess(res, false, "Thất bại. Vui lòng thử lại !");
    }

    handleResponseSuccess(res, true, "Thành công !");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}

export async function projectDeleteController(req, res, next) {
  try {
    const parameters = req.body;
    const { data } = req.data;
    const isSuccess = await projectDeleteService(parameters, data);
    if (!isSuccess) {
      return handleResponseSuccess(res, false, "Thất bại. Vui lòng thử lại !");
    }
    handleResponseSuccess(res, true, "Thành công !");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}
