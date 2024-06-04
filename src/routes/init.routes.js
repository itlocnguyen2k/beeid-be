import accountRoutes from "./account.routes";
import authRoutes from "./auth.routes";
import boardRoutes from "./board.routes";
import categoryRoutes from "./category.routes";
import fileRoutes from "./file.routes";
import followRoutes from "./follow.routes";
import homeRoutes from "./home.routes";
import labelRoutes from "./label.routes";
import logRoutes from "./log.routes";
import meetingRoutes from "./meeting.routes";
import messageRoutes from "./message.routes";
import noteRoutes from "./note.routes";
import notificationRoutes from "./notification.routes";
import priorityRoutes from "./priority.routes";
import projectRoutes from "./project.routes";
import reportRoutes from "./report.routes";
import roomRoutes from "./room.routes";
import sprintRoutes from "./sprint.routes";
import subTaskRoutes from "./subtask.routes";
import taskRoutes from "./task.routes";
import templateRoutes from "./template.routes";
import trashRoutes from "./trash.routes";

const initRoutes = (app) => {
  app.use("/api/v1", authRoutes);
  app.use("/api/v1/accounts", accountRoutes);
  app.use("/api/v1/follows", followRoutes);
  app.use("/api/v1/notifications", notificationRoutes);
  app.use("/api/v1/settings", categoryRoutes);
  app.use("/api/v1/settings", labelRoutes);
  app.use("/api/v1/settings", priorityRoutes);
  app.use("/api/v1/settings", templateRoutes);
  app.use("/api/v1/projects", projectRoutes);
  app.use("/api/v1/sprints", sprintRoutes);
  app.use("/api/v1/boards", boardRoutes);
  app.use("/api/v1/tasks", taskRoutes);
  app.use("/api/v1/notes", noteRoutes);
  app.use("/api/v1/sub-tasks", subTaskRoutes);
  app.use("/api/v1/files", fileRoutes);
  app.use("/api/v1/rooms", roomRoutes);
  app.use("/api/v1/messages", messageRoutes);
  app.use("/api/v1/homes", homeRoutes);
  app.use("/api/v1/logs", logRoutes);
  app.use("/api/v1/meetings", meetingRoutes);
  app.use("/api/v1/trashs", trashRoutes);
  app.use("/api/v1/reports", reportRoutes);
};

export default initRoutes;