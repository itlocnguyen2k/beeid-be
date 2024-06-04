import mongoose from "mongoose";
import Boards from "../models/board.models";
import Projects from "../models/project.models";
import Sprints from "../models/sprint.models";
import Templates from "../models/template.models";
import Trashs from "../models/trash.models";
import { createParameterQuerry, createParameterUpdate, createTrashObject } from "../utils/parameter.utils";
import { handleServicesErrors, handleServicesPermission } from "../utils/response.utils";

export async function sprintListService(parameters, data) {
  try {
    const parameterTemp = createParameterQuerry(parameters);
    const sprints = await Sprints.find({
      ...parameterTemp,
      projects: mongoose.Types.ObjectId(parameters.projectId),
      $or: [{ isDelete: 0 }],
    })
      .populate("members")
      .populate("userCreated")
      .populate("userUpdated")
      .sort({ createdAt: -1 });
    if (!sprints) {
      return false;
    }

    const result = handleServicesPermission(sprints, data, "sprintEdit", "sprintDelete");

    return result;
  } catch (e) {
    handleServicesErrors(e);
  }
}

export async function sprintCreateService(parameters, data, file) {
  try {
    const project = Projects.findById(parameters.projectId);
    if (!project) {
      return false;
    }
    const sprint = new Sprints(parameters);
    sprint.projects = parameters.projectId;
    sprint.userCreated = data._id;
    sprint.userUpdated = data._id;
    if (file) {
      sprint.avatar = "/src/public/image/" + file.filename;
    }

    if (parameters.flagTemplate) {
      const templates = await Templates.find({});
      const boardList = [];
      templates.forEach((template) => {
        const boards = new Boards();
        boards.boardTitle = template.templateName;
        boards.save();
        boardList.push(boards);
      });
      sprint.boards = boardList;
    }
    sprint.save();

    await project.updateOne({ $push: { sprints: sprint._id } });

    return true;
  } catch (e) {
    handleServicesErrors(e);
  }
}

export async function sprintDetailService(id) {
  try {
    const sprint = await Sprints.findById(id)
      .populate({
        path: "boards",
        populate: {
          path: "tasks",
          match: { isDelete: 0 },
          populate: [
            { path: "categories" },
            { path: "labels" },
            { path: "priorities" },
            { path: "subtasks", match: { isDelete: 0 } },
            { path: "members" },
          ],
        },
      })
      .populate("categories")
      .populate("labels")
      .populate("priorities")
      .populate("members");
    if (!sprint) {
      return false;
    }
    return sprint;
  } catch (e) {
    handleServicesErrors(e);
  }
}

export async function sprintUpdateService(parameters, data, file) {
  try {
    const sprintVerifyId = await Sprints.findById(parameters.sprintId);
    if (!sprintVerifyId) {
      return false;
    }

    await createParameterUpdate(parameters, sprintVerifyId);
    if (file) {
      sprintVerifyId.avatar = "/src/public/image/" + file.filename;
    }
    sprintVerifyId.userUpdated = data._id;
    sprintVerifyId.save();

    return true;
  } catch (e) {
    handleServicesErrors(e);
  }
}

export async function sprintDeleteService(parameters, data) {
  try {
    const sprint = await Sprints.findById(parameters.id);
    if (!sprint) {
      return false;
    }

    const trash = new Trashs(createTrashObject(data._id, sprint._id, 3, "Sprints"));
    trash.save();

    sprint.isDelete = 1;
    sprint.save();

    return true;
  } catch (e) {
    handleServicesErrors(e);
  }
}
