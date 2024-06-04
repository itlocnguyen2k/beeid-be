import { homeListService, homeSprintListService, homeTaskListService } from "../services/home.services";
import { handleResponseErrors, handleResponseSuccess } from "../utils/response.utils";

export async function homeListController(req, res, next) {
  try {
    const { data } = req.data;
    const homes = await homeListService(data);

    if (!homes) {
      return handleResponseSuccess(res, false, "Thất bại. Vui lòng thử lại !");
    }

    handleResponseSuccess(res, homes, "Thành công !");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}

export async function homeSprintListController(req, res, next) {
  try {
    const parameters = req.body;
    const sprints = await homeSprintListService(parameters);
    handleResponseSuccess(
      res,
      {
        sprints,
        total: sprints.length,
      },
      "Lấy danh sách sprint thành công !",
    );
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}

export async function homeTaskListController(req, res, next) {
  try {
    const parameters = req.body;
    const tasks = await homeTaskListService(parameters);
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
