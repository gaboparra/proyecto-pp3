const isOwner = (req, res, next) => {
  try {
    const userIdFromToken = req.user?._id?.toString();
    const userIdFromParams = req.params.id?.toString();

    if (!userIdFromToken) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized: token missing or invalid",
      });
    }

    if (userIdFromToken !== userIdFromParams) {
      return res.status(403).json({
        status: "error",
        message: "Forbidden: you are not allowed to modify this resource",
      });
    }

    next();
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Error validating ownership",
      error: err.message,
    });
  }
};

export default isOwner;
