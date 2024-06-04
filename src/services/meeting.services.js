import mongoose from "mongoose";
import Meetings from "../models/meeting.models";
import { handleServicesErrors } from "../utils/response.utils";

export async function meetingListService(data) {
  try {
    const meetings = await Meetings.find({ time: { $gte: new Date() } })
      .populate("projects")
      .populate("owners")
      .sort({ time: 1 });
    if (!meetings) {
      return false;
    }

    return meetings;
  } catch (e) {
    handleServicesErrors(e);
  }
}

export async function meetingCreateService(parameters, data) {
  try {
    const meeting = new Meetings(parameters);
    meeting.owners = data._id;
    meeting.projects = parameters.projectId;

    meeting.save();

    return true;
  } catch (e) {
    handleServicesErrors(e);
  }
}

export async function meetingDeleteService(id) {
  try {
    const meeting = await Meetings.findByIdAndDelete(id);
    if (!meeting) {
      return false;
    }
    return true;
  } catch (e) {
    handleServicesErrors(e);
  }
}
