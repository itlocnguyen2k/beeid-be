import {
  sprintCreateService,
  sprintDeleteService,
  sprintDetailService,
  sprintListService,
  sprintUpdateService,
} from "../services/sprint.services";
import { handleResponseErrors, handleResponseSuccess } from "../utils/response.utils";

export async function sprintListController(req, res, next) {
  try {
    const parameters = req.body;
    const { data } = req.data;
    const sprints = await sprintListService(parameters, data);
    handleResponseSuccess(
      res,
      {
        sprints,
        total: sprints.length,
      },
      "Lấy danh sách dự án thành công !",
    );
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}

export async function sprintCreateController(req, res, next) {
  try {
    const parameters = req.body;
    const file = req.file;
    const { data } = req.data;
    const isSuccess = await sprintCreateService(parameters, data, file);
    if (!isSuccess) {
      return handleResponseSuccess(res, false, "Thất bại. Vui lòng thử lại !");
    }

    handleResponseSuccess(res, true, "Thành công !");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}

export async function sprintDetailController(req, res, next) {
  try {
    const { sprintId } = req.body;
    const sprint = await sprintDetailService(sprintId);
    if (!sprint) {
      return handleResponseSuccess(res, false, "Không tìm thấy sprint. Vui lòng thử lại !");
    }

    handleResponseSuccess(res, { sprint }, "Thành công !");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}

export async function sprintUpdateController(req, res, next) {
  try {
    const parameters = req.body;
    const file = req.file;
    const { data } = req.data;
    const sprint = await sprintUpdateService(parameters, data, file);
    if (!sprint) {
      return handleResponseSuccess(res, false, "Thất bại. Vui lòng thử lại !");
    }

    handleResponseSuccess(res, true, "Thành công !");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}

export async function sprintDeleteController(req, res, next) {
  try {
    const parameters = req.body;
    const { data } = req.data;
    const isSuccess = await sprintDeleteService(parameters, data);
    if (!isSuccess) {
      return handleResponseSuccess(res, false, "Thất bại. Vui lòng thử lại !");
    }
    handleResponseSuccess(res, true, "Thành công !");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}
