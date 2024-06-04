import Rooms from "../models/room.models";
import { createParameterUpdate } from "../utils/parameter.utils";
import { handleServicesErrors } from "../utils/response.utils";

export async function roomListService() {
  try {
    const rooms = await Rooms.find({}).populate("members").populate("files");
    if (!rooms) {
      return false;
    }

    return rooms;
  } catch (e) {
    handleServicesErrors(e);
  }
}

export async function roomCreateService(parameters) {
  try {
    const rooms = new Rooms(parameters);
    rooms.save();
    return true;
  } catch (e) {
    handleServicesErrors(e);
  }
}

export async function roomUpdateService(parameters) {
  try {
    const roomVerifyId = await Rooms.findById(parameters.rooms);
    await createParameterUpdate(parameters, roomVerifyId);
    roomVerifyId.save();
    return true;
  } catch (e) {
    handleServicesErrors(e);
  }
}
