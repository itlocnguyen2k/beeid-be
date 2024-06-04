import {
  subTaskCreateService,
  subTaskDeleteService,
  subTaskDetailService,
  subTaskListService,
  subTaskUpdateService,
} from "../services/subtask.services";
import { handleResponseErrors, handleResponseSuccess } from "../utils/response.utils";

export async function subTaskListController(req, res, next) {
  try {
    const parameters = req.body;
    const { data } = req.data;
    const subTasks = await subTaskListService(parameters, data);
    handleResponseSuccess(
      res,
      {
        subTasks,
        total: subTasks.length,
      },
      "Lấy danh sách công việc thành công !",
    );
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}

export async function subTaskCreateController(req, res, next) {
  try {
    const parameters = req.body;
    const file = req.file;
    const { data } = req.data;
    const isSuccess = await subTaskCreateService(parameters, data, file);
    if (!isSuccess) {
      return handleResponseSuccess(res, false, "Thất bại. Vui lòng thử lại !");
    }

    handleResponseSuccess(res, true, "Thành công !");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}

export async function subTaskDetailController(req, res, next) {
  try {
    const { subTaskId } = req.body;
    const subTask = await subTaskDetailService(subTaskId);
    if (!subTask) {
      return handleResponseSuccess(res, false, "Không tìm thấy công việc phụ. Vui lòng thử lại !");
    }
    handleResponseSuccess(res, { subTask }, "Thành công !");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}

export async function subTaskUpdateController(req, res, next) {
  try {
    const parameters = req.body;
    const file = req.file;
    const { data } = req.data;
    const subTask = await subTaskUpdateService(parameters, data, file);
    if (!subTask) {
      return handleResponseSuccess(res, false, "Thất bại. Vui lòng thử lại !");
    }

    handleResponseSuccess(res, true, "Thành công !");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}

export async function subTaskDeleteController(req, res, next) {
  try {
    const parameters = req.body;
    const { data } = req.data;
    const isSuccess = await subTaskDeleteService(parameters, data);
    if (!isSuccess) {
      return handleResponseSuccess(res, false, "Thất bại. Vui lòng thử lại !");
    }
    handleResponseSuccess(res, true, "Thành công !");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}
