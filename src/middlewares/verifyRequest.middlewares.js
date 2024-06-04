import log from "../logs/log";

const verifyRequest = (schema) => async (req, res, next) => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    return next();
  } catch (e) {
    log.error(e);
    return res.status(422).json({
      code: 422,
      message: "Đã có lỗi sảy ra. Vui lòng thử lại !",
      errors: e.errors,
    });
  }
};

export default verifyRequest;
