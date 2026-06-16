export const validation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: error.details.map((err) => err.message),
      });
    }

    next();
  };
};
