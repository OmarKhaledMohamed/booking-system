export const validation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const field = error.details[0].context.key;

      const messages = {
        name: "Please enter a valid name",
        email: "Please enter a valid email address",
        password:
          "Password must be at least 8 characters and contain uppercase, lowercase and number",
      };

      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: messages[field] || "Invalid input data",
      });
    }

    next();
  };
};
