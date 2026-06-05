const prisma = require("../config/prisma");

const safeParseRoles = (raw) => {
  try { return JSON.parse(raw || '["CUSTOMER"]'); } catch { return ["CUSTOMER"]; }
};

// Authorize based on the user's FULL roles array (not just the JWT role).
// This is needed because with multi-role accounts the JWT contains the
// original registration role, but the user may have added more roles.
const authorize = (...allowedRoles) => {
  return async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    // Fast-path: JWT role matches
    if (allowedRoles.includes(req.user.role)) return next();

    // Slow-path: check the full roles array in the DB
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.user.id },
        select: { roles: true },
      });
      const userRoles = safeParseRoles(user?.roles);
      if (allowedRoles.some((r) => userRoles.includes(r))) return next();
    } catch {
      // DB lookup failed — fall through to denial
    }

    return res.status(403).json({ success: false, message: "Access denied" });
  };
};

module.exports = authorize;
