export const validateSchema = (schema) => (req, res, next) => {
  try {
    console.log(req.body);
    schema.parse(req.body);
    next();
  } catch (error) {
    console.log(error.errors);
    return res.status(400).json(error.errors.map((error) => error.message));
  }
};

/* export const checkPermissions = (requiredPermission) => (req, res, next) => {
  const userPermissions = req.user.role.permissions;

  if (userPermissions.includes(requiredPermission)) {
    return next();
  }

  return res.status(403).json({ message: "Forbidden" });
}; */
