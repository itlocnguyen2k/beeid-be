import mongoose from "mongoose";
import Boards from "../models/board.models";
import Logs from "../models/log.models";
import Tasks from "../models/task.models";
import Trashs from "../models/trash.models";
import { getDifference } from "../utils/log.utils";
import { createParameterQuerry, createParameterUpdate, createTrashObject } from "../utils/parameter.utils";
import { handleServicesErrors } from "../utils/response.utils";

export async function taskListService(parameters) {
  try {
    const parameterTemp = createParameterQuerry(parameters);
    if (parameters.sprintId) {
      parameterTemp.sprints = mongoose.Types.ObjectId(parameters.sprintId);
    }
    const tasks = await Tasks.find(parameterTemp)
      .populate("categories")
      .populate("labels")
      .populate("priorities")
      .populate("members")
      .populate({
        path: "sprints",
        populate: [{ path: "projects" }],
      });
    if (!tasks) {
      return false;
    }

    return tasks;
  } catch (e) {
    handleServicesErrors(e);
  }
}

export async function taskCreateService(parameters, data, file) {
  try {
    const board = Boards.findById(parameters.boardId);
    if (!board) {
      return false;
    }
    const task = new Tasks(parameters);
    if (file) {
      task.avatar = "/src/public/image/" + file.filename;
    }
    const log = new Logs();
    log.author = data._id;
    log.tasks = task._id;
    log.type = 1;
    log.logs = {
      event: 1,
      taskName: task.taskTitle,
    };
    await log.save();
    await task.save();
    await task.updateOne({ $push: { logs: log._id } });
    await board.updateOne({ $push: { tasks: task._id } });

    return true;
  } catch (e) {
    handleServicesErrors(e);
  }
}

export async function taskDetailService(id) {
  try {
    const task = await Tasks.findById(id)
      .populate("members")
      .populate("labels")
      .populate("priorities")
      .populate("categories")
      .populate({
        path: "files",
        match: { isDelete: 0 },
      })
      .populate({
        path: "sprints",
        populate: [{ path: "categories" }, { path: "priorities" }, { path: "members" }],
      })
      .populate({
        path: "subtasks",
        populate: [{ path: "owners" }],
      });
    if (!task) {
      return false;
    }
    return task;
  } catch (e) {
    handleServicesErrors(e);
  }
}

export async function taskUpdateService(parameters, data, file) {
  try {
    const taskVerifyId = await Tasks.findById(parameters.taskId);
    if (!taskVerifyId) {
      return false;
    }
    const task = await Tasks(parameters);
    const logList = await getDifference(taskVerifyId, task);

    await createParameterUpdate(parameters, taskVerifyId);
    if (file) {
      taskVerifyId.avatar = "/src/public/image/" + file.filename;
    }

    const log = new Logs();
    log.author = data._id;
    log.tasks = taskVerifyId._id;
    log.type = 1;
    log.logs = {
      event: 2,
      logList: logList,
    };
    await log.save();
    await taskVerifyId.save();
    await taskVerifyId.updateOne({ $push: { logs: log._id } });

    return true;
  } catch (e) {
    handleServicesErrors(e);
  }
}

export async function taskDeleteService(parameters, data) {
  try {
    const task = await Tasks.findById(parameters.taskId);
    if (!task) {
      return false;
    }

    const trash = new Trashs(createTrashObject(data._id, task._id, 4, "Tasks"));
    trash.save();

    task.isDelete = 1;
    task.save();

    return true;
  } catch (e) {
    handleServicesErrors(e);
  }
}
