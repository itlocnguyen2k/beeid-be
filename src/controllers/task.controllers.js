import { taskCreateService, taskDeleteService, taskDetailService, taskListService, taskUpdateService } from "../services/task.services";
import { handleResponseErrors, handleResponseSuccess } from "../utils/response.utils";

export async function taskListController(req, res, next) {
  try {
    const parameters = req.body;
    const tasks = await taskListService(parameters);
    handleResponseSuccess(
      res,
      {
        tasks,
        total: tasks.length,
      },
      "Lấy danh sách công việc thành công !",
    );
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}

export async function taskCreateController(req, res, next) {
  try {
    const parameters = req.body;
    const file = req.file;
    const { data } = req.data;
    const isSuccess = await taskCreateService(parameters, data, file);
    if (!isSuccess) {
      return handleResponseSuccess(res, false, "Thất bại. Vui lòng thử lại !");
    }

    handleResponseSuccess(res, true, "Thành công !");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}

export async function taskDetailController(req, res, next) {
  try {
    const { taskId } = req.body;
    const task = await taskDetailService(taskId);
    if (!task) {
      return handleResponseSuccess(res, false, "Không tìm thấy công việc. Vui lòng thử lại !");
    }

    handleResponseSuccess(res, { task }, "Thành công !");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}

export async function taskUpdateController(req, res, next) {
  try {
    const parameters = req.body;
    const file = req.file;
    const { data } = req.data;
    const task = await taskUpdateService(parameters, data, file);
    if (!task) {
      return handleResponseSuccess(res, false, "Thất bại. Vui lòng thử lại !");
    }

    handleResponseSuccess(res, true, "Thành công !");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}

export async function taskDeleteController(req, res, next) {
  try {
    const parameters = req.body;
    const { data } = req.data;
    const isSuccess = await taskDeleteService(parameters, data);
    if (!isSuccess) {
      return handleResponseSuccess(res, false, "Thất bại. Vui lòng thử lại !");
    }
    handleResponseSuccess(res, true, "Thành công !");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}
