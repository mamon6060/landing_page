const { ProjectSchema } = require("../../models/index.js");
const pagination = require("../../utils/pagination.js");
const BaseRepository = require("../base/base.repository.js");



class ProjectRepository extends BaseRepository {
  #model;
  constructor(model) {
    super(model);
    this.#model = model;
  }

  async createProject(payload) {
    const newProject = await this.#model.create(payload);
    return newProject;
  }

  async getProjectWithPagination(payload) {
    try {
      const projects = await pagination(payload, async (limit, offset, sortOrder) => {
        const projects = await this.#model.find({
        })
          .sort({ createdAt: sortOrder, })
          .skip(offset)
          .limit(limit)
        // .populate('') 
        // .populate('') 
        const totalProject = await this.#model.countDocuments();

        return { doc: projects, totalDoc: totalProject };
      });

      return projects;
    } catch (error) {
      console.error("Error getting projects with pagination:", error);
      throw error;
    }
  }

  
}

module.exports = new ProjectRepository(ProjectSchema);

