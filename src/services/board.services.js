import Boards from "../models/board.models";
import Logs from "../models/log.models";
import Sprints from "../models/sprint.models";
import Tasks from "../models/task.models";
import { handleServicesErrors } from "../utils/response.utils";

export async function boardCreateService(parameters) {
  try {
    const sprint = await Sprints.findById(parameters.id);
    if (!sprint) {
      return false;
    }

    const board = new Boards(parameters);
    await board.save();

    await sprint.updateOne({ $push: { boards: board._id } });

    return true;
  } catch (e) {
    handleServicesErrors(e);
  }
}

export async function boardUpdateService(parameters) {
  try {
    const board = await Boards.findById(parameters.boardId);
    if (!board) {
      return false;
    }

    board.boardTitle = parameters.boardTitle;
    board.save();

    return true;
  } catch (e) {
    handleServicesErrors(e);
  }
}

export async function boardChangeService(parameters, data) {
  try {
    const sBoard = await Boards.findById(parameters.sId);
    const dBoard = await Boards.findById(parameters.dId);
    const task = await Tasks.findById(parameters.taskId);
    if (!sBoard || !dBoard || !task) {
      return false;
    }

    const log = new Logs();
    log.author = data._id;
    log.tasks = task._id;
    log.type = 1;
    log.logs = {
      event: 3,
      oldBoard: sBoard._id,
      newBoard: dBoard._id,
    };
    await log.save();

    await task.updateOne({ $push: { logs: log._id } });
    await sBoard.updateOne({ $pull: { tasks: task._id } });
    await dBoard.updateOne({ $push: { tasks: task._id } });

    return true;
  } catch (e) {
    handleServicesErrors(e);
  }
}
