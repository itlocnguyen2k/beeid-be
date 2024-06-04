import fs from "fs";
import { handleResponseErrors, handleResponseSuccess } from "../utils/response.utils";
import { fileDeleteService, fileDownloadService } from "../services/file.services";


export async function fileDownloadController(req, res, next) {
  try {
    const { fileId } = req.body;
    const file = await fileDownloadService(fileId);
    if (!file) {
      return handleResponseSuccess(res, false, "Tải tập tin thất bại. Vui lòng thử lại !");
    }

    const stream = fs.createReadStream("." + file.filePath);
    res.set({
      "Content-Disposition": `attachment; filename='${file.fileName}'`,
      "Content-Type": "application/octet-stream",
    });
    stream.pipe(res);
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}

export async function fileDeleteController(req, res, next) {
  try {
    const parameters = req.body;
    const { data } = req.data;
    const isSuccess = await fileDeleteService(parameters, data);
    if (!isSuccess) {
      return handleResponseSuccess(res, false, "Thất bại. Vui lòng thử lại !");
    }
    handleResponseSuccess(res, true, "Thành công !");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}
