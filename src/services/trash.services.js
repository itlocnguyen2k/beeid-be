import Accounts from "../models/account.models";
import Files from "../models/file.models";
import Projects from "../models/project.models";
import Sprints from "../models/sprint.models";
import SubTasks from "../models/subtask.models";
import Tasks from "../models/task.models";
import Trashs from "../models/trash.models";
import { handleServicesErrors } from "../utils/response.utils";

export async function trashListService(parameters) {
  try {
    const trashs = await Trashs.find({ type: parameters.type, $or: [{ isDelete: 0 }] })
      .populate("objects")
      .populate("authors");
    if (!trashs) {
      return false;
    }

    return trashs;
  } catch (e) {
    handleServicesErrors(e);
  }
}

export async function trashRestoreService(parameters) {
  try {
    const trash = await Trashs.findById(parameters.trashId);
    if (!trash) {
      return false;
    }

    if (trash.type === 1) {
      const account = await Accounts.findById(trash.objects);
      if (!account) {
        return false;
      }
      account.isDelete = 0;
      await account.save();
    }

    if (trash.type === 2) {
      const project = await Projects.findById(trash.objects);
      if (!project) {
        return false;
      }
      project.isDelete = 0;
      await project.save();
    }

    if (trash.type === 3) {
      const sprint = await Sprints.findById(trash.objects);
      if (!sprint) {
        return false;
      }
      sprint.isDelete = 0;
      await sprint.save();
    }

    if (trash.type === 4) {
      const task = await Tasks.findById(trash.objects);
      if (!task) {
        return false;
      }
      task.isDelete = 0;
      await task.save();
    }

    if (trash.type === 5) {
      const subTask = await SubTasks.findById(trash.objects);
      if (!subTask) {
        return false;
      }
      subTask.isDelete = 0;
      await subTask.save();
    }

    if (trash.type === 6) {
      const file = await Files.findById(trash.objects);
      if (!file) {
        return false;
      }
      file.isDelete = 0;
      await file.save();
    }

    await trash.deleteOne();

    return true;
  } catch (e) {
    handleServicesErrors(e);
  }
}
