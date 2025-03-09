const { NotFoundError } = require("../../utils/errors.js");
const BaseService = require("../base/base.service.js");
const projectRepository = require("./project.repository.js");
const {
  removeUploadFile,
} = require("../../middleware/upload/removeUploadFile.js");
const ImgUploader = require("../../middleware/upload/ImgUploder.js");

class ProjectService extends BaseService {
  #repository;
  constructor(repository, serviceName) {
    super(repository, serviceName);
    this.#repository = repository;
  }

  async createProject(payload, payloadFiles) {
    const { files } = payloadFiles;
    if (!files) throw new Error("image is required");

    const images = await ImgUploader(files);
    for (const key in images) {
      payload[key] = images[key];
    }

    const projectData = await this.#repository.createProject(payload);
    return projectData;
  }

  async getAllProject(status) {
    const filter = status ? { status } : {};
    return await this.#repository.findAll(
      filter,
      ["serviceRef"],
      {},
      { createdAt: 1 }
    );
  }

  async getProjectWithPagination(payload) {
    const project = await this.#repository.getProjectWithPagination(payload);
    return project;
  }

  async getSingleProject(id) {
    const projectData = await this.#repository.findById(id);
    if (!projectData) throw new NotFoundError("Project Not Find");
    return projectData;
  }

  // async updateProject(id, payloadFiles, payload) {
  //   const { files } = payloadFiles;

  //   if (files?.length) {
  //     const images = await ImgUploader(files);
  //     for (const key in images) {
  //       payload[key] = images[key];
  //     }
  //   }

  //   const projectData = await this.#repository.updateById(id, payload);
  //   if (!projectData) throw new NotFoundError("Project Not Find");

  //   if (Array.isArray(projectData.image) && projectData.image.length > 0) {
  //     for (const imagePath of projectData.image) {
  //       await removeUploadFile(imagePath);
  //     }
  //   }
  //   return projectData;
  // }

  async updateProject(id, payloadFiles, payload) {
    const { files } = payloadFiles;

    // Find the existing project
    const existingProject = await this.#repository.findById(id);
    if (!existingProject) throw new NotFoundError("Project Not Found");

    let uploadedImages = {};

    // Upload new images if provided
    if (files?.length) {
      uploadedImages = await ImgUploader(files);
    }

    // Ensure the existing image field is an array
    const existingImages = Array.isArray(existingProject.image)
      ? existingProject.image
      : [];

    // Handle removed images from payload
    const removedImages = payload.removedImages || [];
    const updatedExistingImages = existingImages.filter(
      (image) => !removedImages.includes(image)
    );
    console.log(
      updatedExistingImages,
      "updated existing images after filtering@@@@@@@@@@@@@@@@@"
    );
    console.log(removedImages, "removed image array==========");

    // Merge new images with existing images (after removing selected ones)
    const newImages = Object.values(uploadedImages).flat(); // Flatten in case of multiple uploads
    payload.image = [...updatedExistingImages, ...newImages];

    console.log(payload.image, "Final updated image array==========");

    // Update project in the database
    const updatedProject = await this.#repository.updateById(id, payload);
    if (!updatedProject) throw new NotFoundError("Project Not Found");

    // Remove deleted images from the server
    if (removedImages.length > 0) {
      await removeUploadFile(removedImages);
    }

    return updatedProject;
  }

  async deleteProject(id) {
    const project = await this.#repository.findById(id);
    if (!project) throw new NotFoundError("Project not found");
    const deletedProject = await this.#repository.deleteById(id);

    if (Array.isArray(project.image) && project.image.length > 0) {
      for (const imagePath of project.image) {
        await removeUploadFile(imagePath);
      }
    }

    return deletedProject;
  }
}

module.exports = new ProjectService(projectRepository, "project");
