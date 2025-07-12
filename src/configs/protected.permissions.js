export const jobSeekerPermissions = [
  {
    methods: ["GET"],
    route: "/api/jobs",
  },
  {
    methods: ["POST"],
    route: "/api/applications",
  },
];

export const employerPermissions = [
  {
    methods: ["GET", "POST"],
    route: "/api/jobs",
  },
  {
    methods: ["GET", "PUT", "DELETE"],
    route: "/api/jobs/:id",
  },
];
