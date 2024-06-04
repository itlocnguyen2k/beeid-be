import mongoose from "mongoose";
import Logs from "../models/log.models";
import { handleServicesErrors } from "../utils/response.utils";

export async function logListService(parameters) {
  try {
    let options = {};
    if (parameters.type === 1) {
      options = { tasks: mongoose.Types.ObjectId(parameters.taskId) };
    }

    if (parameters.type === 2) {
      options = { subTasks: mongoose.Types.ObjectId(parameters.subTaskId) };
    }

    const logs = await Logs.find(options)
      .populate(
        "logs.logList.newCategory logs.logList.oldCategory logs.logList.newLabel logs.logList.oldLabel logs.logList.newPriority logs.logList.oldPriority logs.logList.newMembers logs.logList.oldMembers logs.newBoard logs.oldBoard logs.logList.newOwner logs.logList.oldOwner",
      )
      .populate("author")
      .populate({
        path: "notes",
        populate: [{ path: "files", match: { isDelete: 0 } }, { path: "notes" }],
      });

    if (!logs) {
      return false;
    }

    return logs;
  } catch (e) {
    handleServicesErrors(e);
  }
}
