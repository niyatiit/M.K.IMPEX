const allowRoles = (...roles) => {
  return (req, res, next) => {
    const role = req.admin?.role;

    if (!roles.includes(role)) {
      return res.status(403).json({
        success: false,
        message: "Access Denied: You are not authorized for this action"
      });
    }

    next(); // User has permission
  };
};

export { allowRoles };
