export default [
  {
    methods: ["GET"],
    route: "/",
  },
  {
    methods: ["GET"],
    route: "/favicon.ico",
  },
  {
    methods: ["GET"],
    route: "/api/auth/reset-superadmin",
  },
  {
    methods: ["POST"],
    route: "/api/auth/signup",
  },
  {
    methods: ["GET"],
    route: "/api/auth/verify-email/:token",
  },
  {
    methods: ["GET"],
    route: "/api/auth/resend-verification-email/:userType/:email",
  },
  {
    methods: ["POST"],
    route: "/api/auth/signin",
  },
  {
    methods: ["GET"],
    route: "/api/auth/signout",
  },
];
