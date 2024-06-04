import log from "../logs/log";

export function handleResponseSuccess(res, data, message) {
  return res.status(200).json({
    code: 200,
    data: data,
    message: message,
  });
}

export function handleResponseErrors(e, res, next) {
  log.error(e);
  res.status(400).json({
    code: 400,
    message: "Đã có lỗi sảy ra. Vui lòng thử lại !",
  });
  next();
}

export function handleServicesErrors(e) {
  log.error(e);
  return false;
}

export function handleServicesPermission(array, data, flagEdit, flagDelete) {
  return array.map(function (obj) {
    const tmpObj = obj.toObject();

    tmpObj.flagEdit = data.permission[flagEdit];
    tmpObj.flagDelete = data.permission[flagDelete];

    return tmpObj;
  });
}
