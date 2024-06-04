import mongoose from "mongoose";
import Accounts from "../models/account.models";
import Logs from "../models/log.models";
import Notifications from "../models/notification.models";
import SubTasks from "../models/subtask.models";
import Tasks from "../models/task.models";
import Trashs from "../models/trash.models";
import { getDifference } from "../utils/log.utils";
import { createParameterQuerry, createParameterUpdate, createTrashObject } from "../utils/parameter.utils";
import { handleServicesErrors, handleServicesPermission } from "../utils/response.utils";

export async function subTaskListService(parameters, data) {
  try {
    const parameterTemp = createParameterQuerry(parameters);
    if (parameters.owners) {
      parameterTemp.owners = mongoose.Types.ObjectId(parameters.owners);
    }
    if (parameters.categories) {
      parameterTemp.categories = mongoose.Types.ObjectId(parameters.categories);
    }
    if (parameters.priorities) {
      parameterTemp.priorities = mongoose.Types.ObjectId(parameters.priorities);
    }
    const subTasks = await SubTasks.find({ ...parameterTemp, tasks: mongoose.Types.ObjectId(parameters.taskId), $or: [{ isDelete: 0 }] })
      .populate("owners")
      .populate("categories")
      .populate("priorities")
      .populate("tasks")
      .sort({ createdAt: -1 });
    if (!subTasks) {
      return false;
    }

    const result = handleServicesPermission(subTasks, data, "subTaskEdit", "subTaskDelete");

    return result;
  } catch (e) {
    handleServicesErrors(e);
  }
}

export async function subTaskCreateService(parameters, data, file) {
  try {
    const task = Tasks.findById(parameters.taskId);
    if (!task) {
      return false;
    }
    const subTask = new SubTasks(parameters);
    subTask.tasks = parameters.taskId;
    if (file) {
      subTask.avatar = "/src/public/image/" + file.filename;
    }

    if (data._id !== subTask.owners._id) {
      const notification = new Notifications();
      notification.sender = data._id;
      notification.reciever = subTask.owners._id;
      notification.type = 1;
      notification.save();
    }

    const log = new Logs();
    log.author = data._id;
    log.subTasks = subTask._id;
    log.type = 1;
    log.logs = {
      event: 1,
      subTaskName: subTask.subTitle,
    };

    await log.save();
    await subTask.save();

    await subTask.updateOne({ $push: { logs: log._id } });
    await task.updateOne({ $push: { subtasks: subTask._id } });

    return true;
  } catch (e) {
    handleServicesErrors(e);
  }
}

export async function subTaskDetailService(id) {
  try {
    const subTask = await SubTasks.findById(id)
      .populate("owners")
      .populate("categories")
      .populate("priorities")
      .populate({
        path: "files",
        match: { isDelete: 0 },
      })
      .populate({
        path: "tasks",
        populate: { path: "members" },
      });
    if (!subTask) {
      return false;
    }
    return subTask;
  } catch (e) {
    handleServicesErrors(e);
  }
}

export async function subTaskUpdateService(parameters, data, file) {
  try {
    const subTaskVerifyId = await SubTasks.findById(parameters.subTaskId);
    if (!subTaskVerifyId) {
      return false;
    }
    const subTask = await SubTasks(parameters);
    const logList = await getDifference(subTaskVerifyId, subTask);
    const oldOwner = await Accounts.findById(subTaskVerifyId.owners);
    const newOwner = await Accounts.findById(subTask.owners);

    await createParameterUpdate(parameters, subTaskVerifyId);
    if (file) {
      subTaskVerifyId.avatar = "/src/public/image/" + file.filename;
    }

    const log = new Logs();
    log.author = data._id;
    log.subTasks = subTaskVerifyId._id;
    log.type = 1;
    log.logs = {
      event: 2,
      logList: logList,
    };

    await log.save();
    await subTaskVerifyId.save();
    await subTaskVerifyId.updateOne({ $push: { logs: log._id } });

    const subTaskNewOwnerList = await SubTasks.find({
      owners: mongoose.Types.ObjectId(newOwner._id),
      point: { $gt: 0 },
      $or: [{ isDelete: 0 }],
    });
    if (subTaskNewOwnerList.length > 0) {
      const totalNewOwner = subTaskNewOwnerList.reduce((sum, { point }) => sum + point, 0);
      await newOwner.updateOne({ total: totalNewOwner / subTaskNewOwnerList.length });
    }

    if (oldOwner._id !== newOwner._id) {
      const subTaskOldOwnerList = await SubTasks.find({
        owners: mongoose.Types.ObjectId(oldOwner._id),
        point: { $gt: 0 },
        $or: [{ isDelete: 0 }],
      });
      if (subTaskOldOwnerList.length > 0) {
        let totalOldOwner = subTaskOldOwnerList.reduce((sum, { point }) => sum + point, 0);
        await oldOwner.updateOne({ total: totalOldOwner / subTaskOldOwnerList.length });
      }
      const notification = new Notifications();
      notification.sender = data._id;
      notification.reciever = newOwner._id;
      notification.type = 1;
      notification.save();
    }

    const task = await Tasks.findById(subTaskVerifyId.tasks);
    const taskList = await SubTasks.find({ tasks: mongoose.Types.ObjectId(task._id), progress: { $gt: 0 } });
    if (taskList.length > 0) {
      const totalProgress = taskList.reduce((sum, { progress }) => sum + progress, 0);
      await task.updateOne({ progress: totalProgress / taskList.length });
    }

    return true;
  } catch (e) {
    handleServicesErrors(e);
  }
}

export async function subTaskDeleteService(parameters, data) {
  try {
    const subTask = await SubTasks.findById(parameters.id);
    if (!subTask) {
      return false;
    }

    const trash = new Trashs(createTrashObject(data._id, subTask._id, 5, "SubTasks"));
    trash.save();

    subTask.isDelete = 1;
    subTask.save();

    return true;
  } catch (e) {
    handleServicesErrors(e);
  }
}
