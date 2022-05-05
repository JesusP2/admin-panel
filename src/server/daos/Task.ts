import { Prisma } from '@prisma/client';
import prisma from '../prisma';

class TaskDao {
    async findAll() {
        return prisma.task.findMany({
            include: {
                project: {
                    select: {
                        name: true,
                    },
                },
                tags: {
                    include: {
                        tag: true,
                    },
                },
            },
        });
    }

    async findOne(taskId: string) {
        return prisma.task.findUnique({
            where: {
                id: taskId,
            },
            include: {
                project: {
                    select: {
                        name: true,
                    },
                },
                tags: {
                    include: {
                        tag: true,
                    },
                },
            },
        });
    }

    async findByProject(projectId: string) {
        return prisma.task.findMany({
            where: {
                projectId,
            },
            include: {
                project: {
                    select: {
                        name: true,
                    },
                },
                tags: {
                    include: {
                        tag: true,
                    },
                },
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
            include: {
                project: {
                    select: {
                        name: true,
                    },
                },
                tags: {
                    include: {
                        tag: true,
                    },
                },
            },
        });
    }

    async createOne(task: Prisma.TaskCreateInput) {
        return prisma.task.create({
            data: task,
            include: {
                project: {
                    select: {
                        name: true,
                    },
                },
                tags: {
                    include: {
                        tag: true,
                    },
                },
            },
        });
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
