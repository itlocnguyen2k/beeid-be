import _ from "lodash";

async function getObjectDiff(obj1, obj2) {
  const result = _.pickBy(obj2, (v, k) => !_.isEqual(obj1[k], v));
  return _.omit(result, "$__", "_doc", "logs", "sprints", "__v", "$isNew", "subtasks", "comments", "files", "tasks");
}

export async function getDifference(resObj, reqObj) {
  const logList = [];
  const objectKeys = Object.keys(await getObjectDiff(reqObj, resObj));

  for (let i = 0; i < objectKeys.length; i++) {
    const logs = {};
    logs.field = objectKeys[i];
    switch (objectKeys[i]) {
      case "categories":
        logs.oldCategory = resObj[objectKeys[i]];
        logs.newCategory = reqObj[objectKeys[i]];
        break;
      case "labels":
        logs.oldLabel = resObj[objectKeys[i]];
        logs.newLabel = reqObj[objectKeys[i]];
        break;
      case "priorities":
        logs.oldPriority = resObj[objectKeys[i]];
        logs.newPriority = reqObj[objectKeys[i]];
        break;
      case "members":
        logs.oldMembers = resObj[objectKeys[i]];
        logs.newMembers = reqObj[objectKeys[i]];
        break;
      case "owners":
        logs.oldOwner = resObj[objectKeys[i]];
        logs.newOwner = reqObj[objectKeys[i]];
        break;
      default:
        logs.oldValue = resObj[objectKeys[i]];
        logs.newValue = reqObj[objectKeys[i]];
    }

    logList.push(logs);
  }
  return logList;
}
