import { notificationListService, notificationReadAllService, notificationReadService } from "../services/notification.services";
import { handleResponseErrors, handleResponseSuccess } from "../utils/response.utils";

export async function notificationListController(req, res, next) {
  try {
    const { id } = req.body;
    const notificationTemp = await notificationListService(id);
    handleResponseSuccess(
      res,
      {
        notifications: notificationTemp.notifications,
        friends: notificationTemp.friends,
        totalUnreadNotification: notificationTemp.totalUnreadNotification,
        totalUnreadRequestFriend: notificationTemp.totalUnreadRequestFriend,
      },
      "Lấy danh sách tin nhắn thành công !",
    );
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}

export async function notificationReadController(req, res, next) {
  try {
    const { id } = req.body;
    const isSuccess = await notificationReadService(id);
    if (!isSuccess) {
      return handleResponseSuccess(res, false, "Thất bại. Vui lòng thử lại !");
    }
    handleResponseSuccess(res, true, "Thành công");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}

export async function notificationReadAllController(req, res, next) {
  try {
    const { type } = req.body;
    const isSuccess = await notificationReadAllService(type);
    if (!isSuccess) {
      return handleResponseSuccess(res, false, "Thất bại. Vui lòng thử lại !");
    }
    handleResponseSuccess(res, true, "Thành công");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}
