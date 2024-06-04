import Reports from "../models/report.models";
import { createParameterQuerry } from "../utils/parameter.utils";
import { handleServicesErrors } from "../utils/response.utils";

export async function reportListService(parameters) {
  try {
    const parameterTemp = createParameterQuerry(parameters);
    const reports = await Reports.find({ ...parameterTemp }).sort({ createdAt: -1 });
    if (!reports) {
      return false;
    }

    return reports;
  } catch (e) {
    handleServicesErrors(e);
  }
}

export async function reportDownloadService(id) {
  try {
    const file = await Reports.findById(id);
    if (!file) {
      return false;
    }

    return file;
  } catch (e) {
    handleServicesErrors(e);
  }
}
