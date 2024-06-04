import { messageCreateService, messageListService, messageUpdateService } from "../services/message.services";
import { handleResponseErrors, handleResponseSuccess } from "../utils/response.utils";

export async function messageListController(req, res, next) {
  try {
    const parameters = req.body;
    const messages = await messageListService(parameters);
    handleResponseSuccess(
      res,
      {
        messages,
      },
      "Lấy danh sách tin nhắn thành công !",
    );
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}

export async function messageCreateController(req, res, next) {
  try {
    const parameters = req.body;
    const files = req.files;
    const isSuccess = await messageCreateService(parameters, files);
    if (!isSuccess) {
      return handleResponseSuccess(res, false, "Thất bại. Vui lòng thử lại !");
    }

    handleResponseSuccess(res, true, "Thành công !");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}

export async function messageUpdateController(req, res, next) {
  try {
    const parameters = req.body;
    const isSuccess = await messageUpdateService(parameters);
    if (!isSuccess) {
      return handleResponseSuccess(res, false, "Thất bại. Vui lòng thử lại !");
    }

    handleResponseSuccess(res, true, "Thành công !");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}

