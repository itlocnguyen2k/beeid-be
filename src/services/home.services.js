import mongoose from "mongoose";
import Accounts from "../models/account.models";
import Categories from "../models/category.models";
import Labels from "../models/label.models";
import Meetings from "../models/meeting.models";
import Priorities from "../models/priority.models";
import Projects from "../models/project.models";
import Sprints from "../models/sprint.models";
import SubTasks from "../models/subtask.models";
import Tasks from "../models/task.models";
import { createParameterQuerry } from "../utils/parameter.utils";
import { handleServicesErrors, handleServicesPermission } from "../utils/response.utils";

export async function homeListService(data) {
  try {
    const accounts = await Accounts.find({ isDelete: 0 });
    const categories = await Categories.find({ isDelete: 0 });
    const labels = await Labels.find({ isDelete: 0 });
    const priorities = await Priorities.find({ isDelete: 0 });
    const projects = await Projects.find({
      $or: [{ members: { $in: [data._id] } }],
      $or: [{ isDelete: 0 }],
    }).sort({ createdAt: -1 });
    const meetings = await Meetings.find({ time: { $gte: new Date() }, $or: [{ isDelete: 0 }] })
      .populate("projects")
      .populate("owners")
      .sort({ time: 1 });
    const bestEmployees = await Accounts.find({ isDelete: 0 }).sort({ total: "desc" }).limit(3);
    const subTasks = await SubTasks.find({ isDelete: 0, owners: mongoose.Types.ObjectId(data._id) })
      .populate({
        path: "tasks",
        populate: { path: "sprints", populate: { path: "projects" } },
      })
      .populate("priorities").sort({ createdAt: -1 });

    const result = handleServicesPermission(subTasks, data, "subTaskEdit", "subTaskDelete");

    return {
      accounts,
      categories,
      labels,
      priorities,
      projects,
      meetings,
      bestEmployees,
      subTasks: result,
    };
  } catch (e) {
    handleServicesErrors(e);
  }
}

export async function homeSprintListService(parameters) {
  try {
    const parameterTemp = createParameterQuerry(parameters);
    const sprints = await Sprints.find({ ...parameterTemp, projects: mongoose.Types.ObjectId(parameters.projectId) })
      .populate({
        path: "boards",
        populate: { path: "tasks" },
      })
      .sort({ createdAt: -1 });
    if (!sprints) {
      return false;
    }

    return sprints;
  } catch (e) {
    handleServicesErrors(e);
  }
}

export async function homeTaskListService(parameters) {
  try {
    const parameterTemp = createParameterQuerry(parameters);
    const tasks = await Tasks.find({ ...parameterTemp, sprints: mongoose.Types.ObjectId(parameters.sprintId) });
    if (!tasks) {
      return false;
    }

    return tasks;
  } catch (e) {
    handleServicesErrors(e);
  }
}
