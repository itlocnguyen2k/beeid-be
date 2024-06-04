import mongoose from "mongoose";
import Notifications from "../models/notification.models";
import { handleServicesErrors } from "../utils/response.utils";

export async function notificationListService(id) {
  try {
    const notificationTemp = {};
    const notificationList = await Notifications.find({ reciever: mongoose.Types.ObjectId(id) })
      .populate("sender")
      .sort({ createdAt: -1 });
    if (!notificationList) {
      return false;
    }
    const totalUnreadNotification = await Notifications.countDocuments({ reciever: mongoose.Types.ObjectId(id), read: 0, type: 1 });
    const totalUnreadRequestFriend = await Notifications.countDocuments({ reciever: mongoose.Types.ObjectId(id), read: 0, type: 2 });

    notificationTemp["notifications"] = notificationList.filter((item) => item.type === 1);
    notificationTemp["friends"] = notificationList.filter((item) => item.type === 2);
    notificationTemp["totalUnreadNotification"] = totalUnreadNotification;
    notificationTemp["totalUnreadRequestFriend"] = totalUnreadRequestFriend;

    return notificationTemp;
  } catch (e) {
    handleServicesErrors(e);
  }
}

export async function notificationReadService(id) {
  try {
    const notifications = await Notifications.findById(id);
    if (!notifications) {
      return false;
    }
    notifications.read = 1;
    notifications.save();

    return true;
  } catch (e) {
    handleServicesErrors(e);
  }
}

export async function notificationReadAllService(type) {
  try {
    const notifications = await Notifications.find({ type: type });

    notifications.forEach((notification) => {
      notification.read = 1;
      notification.save();
    });

    return true;
  } catch (e) {
    handleServicesErrors(e);
  }
}
