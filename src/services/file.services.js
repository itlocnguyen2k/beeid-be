import Files from "../models/file.models";
import Trashs from "../models/trash.models";
import { createTrashObject } from "../utils/parameter.utils";
import { handleServicesErrors } from "../utils/response.utils";

export async function fileDownloadService(id) {
  try {
    const file = await Files.findById(id);
    if (!file) {
      return false;
    }

    return file;
  } catch (e) {
    handleServicesErrors(e);
  }
}

export async function fileDeleteService(parameters, data) {
  try {
    const file = await Files.findById(parameters.id);
    if (!file) {
      return false;
    }

    const trash = new Trashs(createTrashObject(data._id, file._id, 6, "Files"));
    trash.save();

    file.isDelete = 1;
    file.save();

    return true;
  } catch (e) {
    handleServicesErrors(e);
  }
}
