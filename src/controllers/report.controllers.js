import fs from "fs";
import { reportDownloadService, reportListService } from "../services/report.service";
import { handleResponseErrors, handleResponseSuccess } from "../utils/response.utils";

export async function reportListController(req, res, next) {
  try {
    const parameters = req.body;
    const reports = await reportListService(parameters);
    handleResponseSuccess(
      res,
      {
        reports,
        total: reports.length,
      },
      "Lấy danh sách báo cáo thành công !",
    );
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}

export async function reportDownloadController(req, res, next) {
  try {
    const { fileId } = req.body;
    const file = await reportDownloadService(fileId);
    if (!file) {
      return handleResponseSuccess(res, false, "Tải tập tin thất bại. Vui lòng thử lại !");
    }

    const stream = fs.createReadStream("." + file.filePath);
    res.set({
      "Content-Type": "application/octet-stream",
    });
    stream.pipe(res);
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}
