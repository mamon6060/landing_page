const { Router } = require("express");
const controller = require("../../modules/project/project.controller.js");
// const jwtAuth = require("../../middleware/auth/jwtAuth.js");
const { upload } = require("../../middleware/upload/upload.js");

const ProjectRoute = Router();
// ProjectRoute.use(jwtAuth());

ProjectRoute.route("/")
  .post(upload.any(), controller.createProject)
  .get(controller.getAllProject);

ProjectRoute.get("/pagination", controller.getProjectWithPagination);

ProjectRoute.route("/:id")
  .get(controller.getSingleProject)
  .put(upload.any(), controller.updateProject)
  .delete(controller.deleteProject);




module.exports = ProjectRoute;
