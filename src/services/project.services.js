import Projects from "../models/project.models";
import Trashs from "../models/trash.models";
import { createParameterQuerry, createParameterUpdate, createTrashObject } from "../utils/parameter.utils";
import { handleServicesErrors, handleServicesPermission } from "../utils/response.utils";

export async function projectListService(parameters, data) {
  try {
    const parameterTemp = createParameterQuerry(parameters);
    const projects = await Projects.find({
      ...parameterTemp,
      $or: [{ userCreated: { $in: data._id } }, { members: { $in: [data._id] } }],
      $or: [{ isDelete: 0 }],
    })
      .populate("userCreated")
      .populate("userUpdated")
      .populate("members")
      .populate({
        path: "sprints",
        populate: { path: "members" },
      })
      .sort({ createdAt: -1 });
    if (!projects) {
      return false;
    }
    const result = handleServicesPermission(projects, data, "projectEdit", "projectDelete");

    return result;
  } catch (e) {
    handleServicesErrors(e);
  }
}

export async function projectCreateService(parameters, data, file) {
  try {
    const project = new Projects(parameters);
    project.userCreated = data._id;
    project.userUpdated = data._id;
    if (file) {
      project.avatar = "/src/public/image/" + file.filename;
    }

    project.save();

    return true;
  } catch (e) {
    handleServicesErrors(e);
  }
}

export async function projectDetailService(id) {
  try {
    const project = await Projects.findById(id).populate("members");
    if (!project) {
      return false;
    }
    return project;
  } catch (e) {
    handleServicesErrors(e);
  }
}

export async function projectUpdateService(parameters, data, file) {
  try {
    const projectVerifyId = await Projects.findById(parameters.projectId);
    if (!projectVerifyId) {
      return false;
    }

    await createParameterUpdate(parameters, projectVerifyId);
    if (file) {
      projectVerifyId.avatar = "/src/public/image/" + file.filename;
    }
    projectVerifyId.userUpdated = data._id;
    projectVerifyId.save();

    return true;
  } catch (e) {
    handleServicesErrors(e);
  }
}

export async function projectDeleteService(parameters, data) {
  try {
    const project = await Projects.findById(parameters.id);
    if (!project) {
      return false;
    }

    const trash = new Trashs(createTrashObject(data._id, project._id, 2, "Projects"));
    trash.save();

    project.isDelete = 1;
    project.save();

    return true;
  } catch (e) {
    handleServicesErrors(e);
  }
}
