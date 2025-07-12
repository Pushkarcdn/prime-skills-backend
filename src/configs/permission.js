import fs from "fs";
import path from "path";

const commonProtectedRoutes = [
  {
    methods: ["GET"],
    route: "/api/auth/me",
  },
  {
    methods: ["POST"],
    route: "/api/auth/refresh",
  },
  {
    methods: ["PUT"],
    route: "/api/update-my-profile",
  },
  {
    methods: ["PUT"],
    route: "/api/change-my-password",
  },
];

const isUserAllowed = async (route, method, role) => {
  if (role === "superAdmin") return true;

  const permissionsPath = path.resolve(`src/configs/protected.permissions.js`);

  const allowedRoutes = (await import(permissionsPath))[role + "Permissions"];

  if (!allowedRoutes) {
    console.error(`Permissions are not specified for ${role}.`);
    return false;
  }

  const allRoutes = [...allowedRoutes, ...commonProtectedRoutes];

  // Check if the route and method match
  const isMatch = allRoutes.some((item) => {
    const normalizedMethods = item.methods.map((method) =>
      method.toUpperCase(),
    );

    // Convert dynamic route patterns like `/api/testimonials/:id` into a regex
    const routePattern = new RegExp(
      `^${item.route.replace(/:\w+/g, "[^/]+")}$`,
      "i", // Case-insensitive
    );

    return (
      routePattern.test(route) && // Check if the route matches the pattern
      normalizedMethods.includes(method.toUpperCase()) // Check if the method is allowed
    );
  });

  if (!isMatch) {
    console.error(
      `User is not authorized to access this resource. [role: ${role}] route: ${route} [${method}]`,
    );
  }
  return isMatch;
};

export { isUserAllowed };
