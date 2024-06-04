import Accounts from "../models/account.models";
import Notifications from "../models/notification.models";
import { handleServicesErrors } from "../utils/response.utils";

export async function sendRequestFollowService(parameters, data) {
  try {
    const sender = await Accounts.findById(data._id);
    const reciever = await Accounts.findById(parameters.reciever);
    if (!sender || !reciever) {
      return false;
    }

    if (sender.followers.includes(reciever._id)) {
      return false;
    }

    await sender.updateOne({ $push: { followings: reciever._id } });
    await reciever.updateOne({ $push: { followers: sender._id } });
    const notification = new Notifications(parameters);
    notification.sender = sender._id;
    notification.type = 2;
    notification.save();

    return true;
  } catch (e) {
    handleServicesErrors(e);
  }
}

export async function sendRequestUnFollowService(parameters, data) {
  try {
    const sender = await Accounts.findById(data._id);
    const reciever = await Accounts.findById(parameters.reciever);
    if (!sender || !reciever) {
      return false;
    }
    if (!sender.followings.includes(reciever._id)) {
      return false;
    }

    await sender.updateOne({ $pull: { followings: reciever._id } });
    await reciever.updateOne({ $pull: { followers: sender._id } });

    return true;
  } catch (e) {
    handleServicesErrors(e);
  }
}

export async function sendRequestUnFriendService(parameters, data) {
  try {
    const sender = await Accounts.findById(data._id);
    const reciever = await Accounts.findById(parameters.reciever);
    if (!sender || !reciever) {
      return false;
    }

    if (!sender.friends.includes(reciever._id) || !reciever.friends.includes(sender._id)) {
      return false;
    }

    await sender.updateOne({ $pull: { friends: reciever._id } });
    await reciever.updateOne({ $pull: { friends: sender._id } });

    return true;
  } catch (e) {
    handleServicesErrors(e);
  }
}

export async function sendRequestAcceptFriendService(parameters, data) {
  try {
    const sender = await Accounts.findById(data._id);
    const reciever = await Accounts.findById(parameters.reciever);

    if (!sender || !reciever) {
      return false;
    }

    if (!sender.followers.includes(reciever._id) || !reciever.followings.includes(sender._id)) {
      return false;
    }

    await sender.updateOne({ $push: { friends: reciever._id }, $pull: { followers: reciever._id } });
    await reciever.updateOne({ $push: { friends: sender._id }, $pull: { followings: sender._id } });

    return true;
  } catch (e) {
    handleServicesErrors(e);
  }
}
