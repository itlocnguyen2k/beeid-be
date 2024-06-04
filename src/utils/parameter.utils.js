export function createParameterQuerry(parameters) {
  let parameterTemp = {};
  for (const [key, value] of Object.entries(parameters)) {
    if (value && key !== "projectId" && key !== "taskId") {
      if (key === "dob" || key === "startDate" || key === "endDate" || key === "createdAt") {
        parameterTemp[key] = { $gte: value[0], $lte: value[1] };
      } else {
        parameterTemp[key] = { $regex: value, $options: "i" };
      }
    }
  }
  return parameterTemp;
}

const skipKeyList = ["friends", "followers", "followings"];

export async function createParameterUpdate(parameters, objects) {
  for (const [key, value] of Object.entries(parameters)) {
    if (parameters[key] !== objects[key] && !skipKeyList.includes(key)) {
      objects[key] = parameters[key];
    }
  }
}

export function getFileName(filePath) {
  const filePathTemp = filePath.split("___");
  return filePathTemp[filePathTemp.length - 1];
}

export function createTrashObject(authors, objects, type, onModel) {
  const trash = {
    authors,
    objects,
    type,
    onModel,
  };
  return trash;
}
