import mongoose from "mongoose";
import Files from "../models/file.models";
import Messages from "../models/message.models";
import Rooms from "../models/room.models";
import { getFileName } from "../utils/parameter.utils";
import { handleServicesErrors } from "../utils/response.utils";

export async function messageListService(parameters) {
  try {
    const messages = await Messages.find({ rooms: mongoose.Types.ObjectId(parameters.roomId) })
      .populate("senders")
      .populate("files")
      .populate("replies");
    if (!messages) {
      return false;
    }

    return messages;
  } catch (e) {
    handleServicesErrors(e);
  }
}

export async function messageCreateService(parameters, files) {
  try {
    const room = Rooms.findById(parameters.rooms);
    const messages = new Messages(parameters);
    await messages.save();
    if (files.length) {
      for (var i = 0; i < files.length; i++) {
        const file = new Files();
        file.fileName = getFileName(files[i].filename);
        file.filePath = "/src/public/image/" + files[i].filename;
        file.fileSize = files[i].size;
        file.save();
        await messages.updateOne({ $push: { files: file._id } });
        await room.updateOne({ $push: { files: file._id } });
      }
    }
    return true;
  } catch (e) {
    handleServicesErrors(e);
  }
}

export async function messageUpdateService(parameters) {
  try {
    const messages = await Messages.findById(parameters.messageId);
    if (!messages) {
      return false;
    }
    messages.content = parameters.content;
    messages.flagEdit = 1;
    await messages.save();
    return true;
  } catch (e) {
    handleServicesErrors(e);
  }
}
