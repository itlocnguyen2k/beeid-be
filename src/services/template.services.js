import Templates from "../models/template.models";
import { createParameterUpdate } from "../utils/parameter.utils";
import { handleServicesErrors } from "../utils/response.utils";

export async function templateListService() {
  try {
    const templates = await Templates.find({ isDelete: 0 });
    if (!templates) {
      return false;
    }

    return templates;
  } catch (e) {
    handleServicesErrors(e);
  }
}

export async function templateCreateService(parameters) {
  try {
    const templatesExist = await Templates.findOne({ templateName: parameters.templateName, isDelete: 0 });
    if (templatesExist) {
      return false;
    }
    const templates = new Templates(parameters);
    templates.save();
    return true;
  } catch (e) {
    handleServicesErrors(e);
  }
}

export async function templateCheckExistService(name) {
  try {
    const templatesExist = await Templates.findOne({ templateName: name, isDelete: 0 });
    if (templatesExist) {
      return false;
    }
    return true;
  } catch (e) {
    handleServicesErrors(e);
  }
}

export async function templateUpdateService(parameters) {
  try {
    const templates = await Templates.findById(parameters.id);
    if (!templates) {
      return false;
    }
    createParameterUpdate(parameters, templates);
    templates.save();
    return true;
  } catch (e) {
    handleServicesErrors(e);
  }
}

export async function templateDeleteService(parameters) {
  try {
    const template = await Templates.findById(parameters.id);
    if (!template) {
      return false;
    }

    template.isDelete = 1;
    template.save();

    return true;
  } catch (e) {
    handleServicesErrors(e);
  }
}
