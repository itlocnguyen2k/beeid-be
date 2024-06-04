import { roomCreateService, roomListService, roomUpdateService } from "../services/room.services";
import { handleResponseErrors, handleResponseSuccess } from "../utils/response.utils";

export async function roomListController(req, res, next) {
  try {
    const rooms = await roomListService();
    handleResponseSuccess(
      res,
      {
        rooms,
      },
      "Lấy danh sách nhóm thành công !",
    );
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}

export async function roomCreateController(req, res, next) {
  try {
    const parameters = req.body;
    const isSuccess = await roomCreateService(parameters);
    if (!isSuccess) {
      return handleResponseSuccess(res, false, "Thất bại. Vui lòng thử lại !");
    }

    handleResponseSuccess(res, true, "Thành công !");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}

export async function roomUpdateController(req, res, next) {
  try {
    const parameters = req.body;
    const isSuccess = await roomUpdateService(parameters);
    if (!isSuccess) {
      return handleResponseSuccess(res, false, "Thất bại. Vui lòng thử lại !");
    }

    handleResponseSuccess(res, true, "Thành công !");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}
