import Projects from "../models/project.models";
import xl from "excel4node";
import Tasks from "../models/task.models";
import mongoose from "mongoose";
import { format } from "date-fns";
import Reports from "../models/report.models";
import { BODY, HEADER } from "../constant/configs";

export async function reportEveryDay() {
  const projects = Projects.find({ isDelete: 0 }).populate({
    path: "sprints",
    match: { isDelete: 0 },
    populate: { path: "categories" },
  });
  (await projects).forEach(async (project) => {
    const wb = new xl.Workbook();
    let styleHeader = wb.createStyle(HEADER);
    let styleBody = wb.createStyle(BODY);

    const sprints = project.sprints;
    if (sprints.length > 0) {
      for (let i = 0; i < sprints.length; i++) {
        try {
          const categories = sprints[i].categories;
          const categoryIdList = [];
          const tasks = await Tasks.find({ sprints: mongoose.Types.ObjectId(sprints[i]._id), $or: [{ isDelete: 0 }] })
            .populate({
              path: "subtasks",
              match: { isDelete: 0 },
            })
            .populate("categories")
            .populate("priorities")
            .populate("labels");
          const ws = wb.addWorksheet(sprints[i].sprintName);
          ws.cell(1, 1).string("CÔNG VIỆC").style(styleHeader);
          ws.column(1).setWidth(40);
          ws.cell(1, 2).string("TIẾN ĐỘ").style(styleHeader);
          ws.column(2).setWidth(20);
          ws.cell(1, 3).string("PHÂN LOẠI").style(styleHeader);
          ws.column(3).setWidth(20);
          ws.cell(1, 4).string("ĐỘ ƯU TIÊN").style(styleHeader);
          ws.column(4).setWidth(30);
          ws.cell(1, 5).string("NHÃN").style(styleHeader);
          ws.column(5).setWidth(20);
          categories.forEach((category, idx) => {
            ws.cell(1, idx + 6)
              .string(category.categoryName)
              .style(styleHeader);
            categoryIdList.push(category._id);
          });
          tasks.forEach((task, idx) => {
            ws.cell(idx + 2, 1)
              .string(task.taskTitle)
              .style(styleBody);
            ws.cell(idx + 2, 2)
              .string(task.progress ? task.progress + "%" : "0%")
              .style(styleBody);
            ws.cell(idx + 2, 3)
              .string(task.categories.categoryName)
              .style(styleBody);
            ws.cell(idx + 2, 4)
              .string(task.priorities.priorityName)
              .style(styleBody);
            ws.cell(idx + 2, 5)
              .string(task.labels.labelName)
              .style(styleBody);

            const subTasks = task.subtasks;
            categoryIdList.forEach((categoryId, id) => {
              const sum = subTasks.filter((item) => item.categories.toString() === categoryId.toString()).length;
              ws.cell(idx + 2, id + 6)
                .number(sum)
                .style(styleBody);
            });
          });
        } catch (error) {
          console.log(error);
        }
      }
      const fileName = project.projectName + "_" + format(new Date(), "ddMMyyyy") + ".xlsx";
      const filePath = "/src/public/report/" + fileName;
      const report = new Reports({ fileName, filePath });
      await report.save();

      wb.write(`src/public/report/${project.projectName + "_" + format(new Date(), "ddMMyyyy")}.xlsx`);
    }
  });
}
