import { trashListService, trashRestoreService } from "../services/trash.services";
import { handleResponseErrors, handleResponseSuccess } from "../utils/response.utils";

export async function trashListController(req, res, next) {
  try {
    const parameters = req.body;
    const trashs = await trashListService(parameters);
    handleResponseSuccess(
      res,
      {
        trashs,
        total: trashs.length,
      },
      "Lấy danh sách thùng rác thành công !",
    );
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}

export async function trashRestoreController(req, res, next) {
  try {
    const parameters = req.body;
    const isSuccess = await trashRestoreService(parameters);
    if (!isSuccess) {
      return handleResponseSuccess(res, false, "Thất bại. Vui lòng thử lại !");
    }
    handleResponseSuccess(res, true, "Thành công !");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}
