import {Prisma} from '@prisma/client'
import taskDao from "server/daos/Task";
class TaskService {
    async findAll() {
        return taskDao.findAll()
    }
    async findOne(id: string) {
        return taskDao.findOne(id) 
    }

    async findByProject(projectId: string) {
        return taskDao.findByProject(projectId)
    }

    async findByUser(userId: string) {
        return taskDao.findByUser(userId)
    }

    async createOne(task: Prisma.TaskCreateInput) {
        return taskDao.createOne(task)
    }

    async updateOne(id: string, task: Prisma.TaskUpdateInput) {
        task.updatedAt = new Date().toISOString()
        return taskDao.updateOne(id, task)
    }

    async deleteOne(taskId: string) {
        return taskDao.deleteOne(taskId)
    }
}

export default new TaskService();
