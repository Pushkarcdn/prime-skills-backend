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
    route: "/api/auth/resend-verification-email/:email",
  },
  {
    methods: ["POST"],
    route: "/api/auth/signin",
  },
  {
    methods: ["GET"],
    route: "/api/auth/signout",
  },
  {
    methods: ["GET"],
    route: "/api/auth/google",
  },
  {
    methods: ["GET"],
    route: "/api/auth/google/callback",
  },
  {
    methods: ["GET"],
    route: "/api/auth/linkedin",
  },
  {
    methods: ["GET"],
    route: "/api/auth/linkedin/callback",
  },
  {
    methods: ["GET"],
    route: "/api/auth/github",
  },
  {
    methods: ["GET"],
    route: "/api/auth/github/callback",
  },
  {
    methods: ["GET"],
    route: "/api/jobs",
  },
  {
    methods: ["GET"],
    route: "/api/jobs/:slug",
  },
  {
    methods: ["GET"],
    route: "/api/freelance-works",
  },
  {
    methods: ["GET"],
    route: "/api/freelance-works/:slug",
  },
];
