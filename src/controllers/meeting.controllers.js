import { meetingCreateService, meetingDeleteService, meetingListService } from "../services/meeting.services";
import { handleResponseErrors, handleResponseSuccess } from "../utils/response.utils";

export async function meetingListController(req, res, next) {
  try {
    const { data } = req.data;
    const meetings = await meetingListService(data);
    handleResponseSuccess(
      res,
      {
        meetings,
        total: meetings.length,
      },
      "Lấy danh sách cuộc họp thành công !",
    );
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}

export async function meetingCreateController(req, res, next) {
  try {
    const parameters = req.body;
    const { data } = req.data;
    const isSuccess = await meetingCreateService(parameters, data);
    if (!isSuccess) {
      return handleResponseSuccess(res, false, "Thất bại. Vui lòng thử lại !");
    }
    handleResponseSuccess(res, true, "Thành công");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}

export async function meetingDeleteController(req, res, next) {
  try {
    const { meetingId } = req.body;
    const isSuccess = await meetingDeleteService(meetingId);
    if (!isSuccess) {
      return handleResponseSuccess(res, false, "Thất bại. Vui lòng thử lại !");
    }
    handleResponseSuccess(res, true, "Thành công");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}
