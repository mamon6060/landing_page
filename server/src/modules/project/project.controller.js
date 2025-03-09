const catchError = require("../../middleware/errors/catchError.js");
const responseHandler = require("../../utils/responseHandler.js");
const withTransaction = require("../../middleware/transactions/withTransaction.js");
const ProjectService = require("./project.service.js");

class ProjectController {
  createProject = withTransaction(async (req, res, next, session) => {
    const payloadFiles = {
      files: req.files,
    };
    const payload = {
      title: req?.body?.title,
      details: req?.body?.details,
      status: req?.body?.status,
      serviceRef: req?.body?.serviceRef,
      location: req?.body?.location,
      // isActive: req?.body?.isActive,
    };
    const projectResult = await ProjectService.createProject(
      payload,
      payloadFiles,
      session
    );
    const resDoc = responseHandler(
      201,
      "Project Created successfully",
      projectResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  getAllProject = catchError(async (req, res) => {
    const { status } = req.query;
    const projectResult = await ProjectService.getAllProject(status);
    const resDoc = responseHandler(200, "Get All Projects", projectResult);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getProjectWithPagination = catchError(async (req, res) => {
    let payload = {
      page: req.query.page,
      limit: req.query.limit,
      order: req.query.order,
    };
    const project = await ProjectService.getProjectWithPagination(payload);
    const resDoc = responseHandler(200, "Projects get successfully", project);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getSingleProject = catchError(async (req, res) => {
    const id = req.params.id;
    const projectResult = await ProjectService.getSingleProject(id);
    const resDoc = responseHandler(
      201,
      "Single Project successfully",
      projectResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateProject = catchError(async (req, res) => {
    const id = req.params.id;
    const payloadFiles = {
      files: req?.files,
    };
    const payload = {
      title: req?.body?.title,
      details: req?.body?.details,
      status: req?.body?.status,
      serviceRef: req?.body?.serviceRef,
      location: req?.body?.location,
      removedImages: req?.body?.removedImages,
      isActive: req?.body?.isActive,
    };
    const projectResult = await ProjectService.updateProject(
      id,
      payloadFiles,
      payload
    );
    const resDoc = responseHandler(
      201,
      "Project Update successfully",
      projectResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateProjectStatus = catchError(async (req, res) => {
    const id = req.params.id;
    const status = req.query.status;
    const projectResult = await ProjectService.updateProjectStatus(id, status);
    const resDoc = responseHandler(
      201,
      "Project Status Update successfully",
      projectResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  deleteProject = catchError(async (req, res) => {
    const id = req.params.id;

    const projectResult = await ProjectService.deleteProject(id);
    const resDoc = responseHandler(
      200,
      "Project Deleted successfully",
      projectResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });
}

module.exports = new ProjectController();
