import { Prisma } from '@prisma/client';
import prisma from '../prisma';

class TaskDao {
    async findAll() {
        return prisma.task.findMany()
    }

    async findOne(taskId: string) {
        return prisma.task.findUnique({
            where: {
                id: taskId,
            },
        });
    }

    async findByProject(projectId: string) {
        return prisma.task.findMany({
            where: {
                projectId,
            },
        });
    }

    async findByUser(userId: string) {
        return prisma.task.findMany({
            where: {
                uid: {
                    has: userId,
                },
            },
        });
    }

    async createOne(task: Prisma.TaskCreateInput) {
        return prisma.task.create({ data: task });
    }

    async updateOne(taskId: string, task: Prisma.TaskUpdateInput) {
        return prisma.task.update({
            where: {
                id: taskId,
            },
            data: task,
        });
    }

    async deleteOne(taskId: string) {
        return prisma.task.delete({ where: { id: taskId } });
    }
}

export default new TaskDao();
