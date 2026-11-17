const errorHandler = (error, req, res, next) => {
  console.error(error);

  if (error.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Database validation failed",
      errors: Object.values(error.errors).map(err => err.message)
    });
  }

  if (error.name === "CastError") {
    return res.status(400).json({ success: false, message: "Invalid resource ID" });
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.statusCode ? error.message : "Internal server error"
  });
};

module.exports = errorHandler;