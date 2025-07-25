// roleMiddleware.js

  const checkRole = (...allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.admin?.role;

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: "Access Denied: You are not authorized for this action",
      });
    }

    next();
  };
};

export { checkRole };
