import {Prisma, Project} from '@prisma/client'
import projectDao from "server/daos/Project";
 
class ProjectService {
    async findAll() {
        return projectDao.findAll()
    }

    async findOne(id: string) {
        return projectDao.findOne(id) 
    }

    async createOne(project: Prisma.ProjectCreateInput) {
        return projectDao.createOne(project)
    }

    async updateOne(projectId: string, project:Prisma.ProjectUpdateInput) {
        project.updatedAt = new Date().toISOString()
        return projectDao.updateOne(projectId, project)
    }

    async deleteOne(projectId: string) {
        return projectDao.deleteOne(projectId)
    }
}

export default new ProjectService();
