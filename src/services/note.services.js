import Files from "../models/file.models";
import Logs from "../models/log.models";
import Notes from "../models/note.models";
import SubTasks from "../models/subtask.models";
import Tasks from "../models/task.models";
import { getFileName } from "../utils/parameter.utils";
import { handleServicesErrors } from "../utils/response.utils";

export async function noteCreateService(parameters, data, files) {
  try {
    if (parameters.type === "1") {
      const task = await Tasks.findById(parameters.taskId);
      if (!task) {
        return false;
      }

      const note = new Notes(parameters);
      note.owners = data._id;
      await note.save();

      const log = new Logs();
      log.type = 2;
      log.notes = note;
      log.tasks = task._id;
      log.author = data._id;

      await log.save();

      if (files.length) {
        for (var i = 0; i < files.length; i++) {
          const file = new Files();
          file.fileName = getFileName(files[i].filename);
          file.filePath = "/src/public/image/" + files[i].filename;
          file.fileSize = files[i].size;
          file.save();
          await note.updateOne({ $push: { files: file._id } });
          await task.updateOne({ $push: { files: file._id } });
        }
      }

      return true;
    } else {
      const subTask = await SubTasks.findById(parameters.subTaskId);
      if (!subTask) {
        return false;
      }

      const note = new Notes(parameters);
      note.owners = data._id;
      await note.save();

      const log = new Logs();
      log.type = 2;
      log.notes = note;
      log.subTasks = subTask._id;
      log.author = data._id;

      await log.save();

      if (files.length) {
        for (var i = 0; i < files.length; i++) {
          const file = new Files();
          file.fileName = getFileName(files[i].filename);
          file.filePath = "/src/public/image/" + files[i].filename;
          file.fileSize = files[i].size;
          file.save();
          await note.updateOne({ $push: { files: file._id } });
          await subTask.updateOne({ $push: { files: file._id } });
        }
      }

      return true;
    }
  } catch (e) {
    handleServicesErrors(e);
  }
}

export async function noteUpdateService(parameters, data, files) {
  try {
    if (parameters.type === "1") {
      const task = await Tasks.findById(parameters.taskId);
      if (!task) {
        return false;
      }

      const noteItem = await Notes.findById(parameters.noteId);
      if (!noteItem) {
        return false;
      }

      noteItem.note = parameters.note;
      noteItem.flagEdit = 1;
      await noteItem.save();

      if (files.length) {
        for (var i = 0; i < files.length; i++) {
          const file = new Files();
          file.fileName = getFileName(files[i].filename);
          file.filePath = "/src/public/image/" + files[i].filename;
          file.fileSize = files[i].size;
          file.save();
          await noteItem.updateOne({ $push: { files: file._id } });
          await task.updateOne({ $push: { files: file._id } });
        }
      }

      return true;
    } else {
      const subTask = await SubTasks.findById(parameters.taskId);
      if (!subTask) {
        return false;
      }

      const noteItem = await Notes.findById(parameters.noteId);
      if (!noteItem) {
        return false;
      }

      noteItem.note = parameters.note;
      noteItem.flagEdit = 1;
      await noteItem.save();

      if (files.length) {
        for (var i = 0; i < files.length; i++) {
          const file = new Files();
          file.fileName = getFileName(files[i].filename);
          file.filePath = "/src/public/image/" + files[i].filename;
          file.fileSize = files[i].size;
          file.save();
          await noteItem.updateOne({ $push: { files: file._id } });
          await subTask.updateOne({ $push: { files: file._id } });
        }
      }

      return true;
    }
  } catch (e) {
    handleServicesErrors(e);
  }
}
