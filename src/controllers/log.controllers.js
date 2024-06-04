import { logListService } from "../services/log.services";
import { handleResponseErrors, handleResponseSuccess } from "../utils/response.utils";

export async function logListController(req, res, next) {
  try {
    const parameters = req.body;
    const logs = await logListService(parameters);
    handleResponseSuccess(
      res,
      {
        logs,
      },
      "Lấy danh sách lịch sử thành công !",
    );
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}
