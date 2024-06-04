import { noteCreateService, noteUpdateService } from "../services/note.services";
import { handleResponseErrors, handleResponseSuccess } from "../utils/response.utils";

export async function noteCreateController(req, res, next) {
  try {
    const parameters = req.body;
    const files = req.files;
    const { data } = req.data;
    const isSuccess = await noteCreateService(parameters, data, files);
    if (!isSuccess) {
      return handleResponseSuccess(res, false, "Thất bại. Vui lòng thử lại !");
    }

    handleResponseSuccess(res, true, "Thành công !");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}

export async function noteUpdateController(req, res, next) {
  try {
    const parameters = req.body;
    const files = req.files;
    const { data } = req.data;
    const isSuccess = await noteUpdateService(parameters, data, files);
    if (!isSuccess) {
      return handleResponseSuccess(res, false, "Thất bại. Vui lòng thử lại !");
    }

    handleResponseSuccess(res, true, "Thành công !");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}
