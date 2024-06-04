import Labels from "../models/label.models";
import { createParameterUpdate } from "../utils/parameter.utils";
import { handleServicesErrors } from "../utils/response.utils";

export async function labelListService() {
  try {
    const labels = await Labels.find({ isDelete: 0 });
    if (!labels) {
      return false;
    }

    return labels;
  } catch (e) {
    handleServicesErrors(e);
  }
}

export async function labelCreateService(parameters) {
  try {
    const labelsExist = await Labels.findOne({ labelName: parameters.labelName, isDelete: 0 });
    if (labelsExist) {
      return false;
    }
    const labels = new Labels(parameters);
    labels.save();
    return true;
  } catch (e) {
    handleServicesErrors(e);
  }
}

export async function labelCheckExistService(name) {
  try {
    const labelsExist = await Labels.findOne({ labelName: name, isDelete: 0 });
    if (labelsExist) {
      return false;
    }
    return true;
  } catch (e) {
    handleServicesErrors(e);
  }
}

export async function labelUpdateService(parameters) {
  try {
    const labels = await Labels.findById(parameters.id);
    if (!labels) {
      return false;
    }
    createParameterUpdate(parameters, labels);
    labels.save();
    return true;
  } catch (e) {
    handleServicesErrors(e);
  }
}

export async function labelDeleteService(parameters) {
  try {
    const label = await Labels.findById(parameters.id);
    if (!label) {
      return false;
    }

    label.isDelete = 1;
    label.save();

    return true;
  } catch (e) {
    handleServicesErrors(e);
  }
}
