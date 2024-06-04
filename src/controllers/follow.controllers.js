import {
  sendRequestAcceptFriendService,
  sendRequestFollowService,
  sendRequestUnFollowService,
  sendRequestUnFriendService,
} from "../services/follow.services";
import { handleResponseErrors, handleResponseSuccess } from "../utils/response.utils";

export async function sendRequestFollowController(req, res, next) {
  try {
    const parameters = req.body;
    const { data } = req.data;
    const isSuccess = await sendRequestFollowService(parameters, data);
    if (!isSuccess) {
      return handleResponseSuccess(res, false, "Thất bại. Vui lòng thử lại !");
    }

    handleResponseSuccess(res, true, "Thành công !");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}

export async function sendRequestUnFollowController(req, res, next) {
  try {
    const parameters = req.body;
    const { data } = req.data;
    const isSuccess = await sendRequestUnFollowService(parameters, data);
    if (!isSuccess) {
      return handleResponseSuccess(res, false, "Thất bại. Vui lòng thử lại !");
    }

    handleResponseSuccess(res, true, "Thành công !");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}

export async function sendRequestUnFriendController(req, res, next) {
  try {
    const parameters = req.body;
    const { data } = req.data;
    const isSuccess = await sendRequestUnFriendService(parameters, data);
    if (!isSuccess) {
      return handleResponseSuccess(res, false, "Thất bại. Vui lòng thử lại !");
    }

    handleResponseSuccess(res, true, "Thành công !");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}

export async function sendRequestAcceptFriendController(req, res, next) {
  try {
    const parameters = req.body;
    const { data } = req.data;
    const isSuccess = await sendRequestAcceptFriendService(parameters, data);
    if (!isSuccess) {
      return handleResponseSuccess(res, false, "Thất bại. Vui lòng thử lại !");
    }

    handleResponseSuccess(res, true, "Thành công !");
    next();
  } catch (e) {
    handleResponseErrors(e, res, next);
  }
}
