export default (router) => {
  router.get("/", (req, res) => {
    res.send("This is /api");
  });
};
