logger = require('logger');

module.exports = function (res, code, text, err) {
  code = code || 500;
  res.status = code;

  logger.error(err);

  return res.json({
    data: {
      success: false,
      message: text
    }
  });
};