import Priorities from "../models/priority.models";
import { createParameterUpdate } from "../utils/parameter.utils";

export async function priorityListService() {
  try {
    const priotities = await Priorities.find({ isDelete: 0 });
    if (!priotities) {
      return false;
    }

    return priotities;
  } catch (e) {
    handleServicesErrors(e);
  }
}

export async function priorityCreateService(parameters) {
  try {
    const prioritiesExist = await Priorities.findOne({ priorityName: parameters.priorityName, isDelete: 0 });
    if (prioritiesExist) {
      return false;
    }
    const priorities = new Priorities(parameters);
    priorities.save();
    return true;
  } catch (e) {
    handleServicesErrors(e);
  }
}

export async function priorityCheckExistService(name) {
  try {
    const prioritiesExist = await Priorities.findOne({ priorityName: name, isDelete: 0 });
    if (prioritiesExist) {
      return false;
    }
    return true;
  } catch (e) {
    handleServicesErrors(e);
  }
}

export async function priorityUpdateService(parameters) {
  try {
    const priorities = await Priorities.findById(parameters.id);
    if (!priorities) {
      return false;
    }
    createParameterUpdate(parameters, priorities);
    priorities.save();
    return true;
  } catch (e) {
    handleServicesErrors(e);
  }
}

export async function priorityDeleteService(parameters) {
  try {
    const priority = await Priorities.findById(parameters.id);
    if (!priority) {
      return false;
    }

    priority.isDelete = 1;
    priority.save();

    return true;
  } catch (e) {
    handleServicesErrors(e);
  }
}
