import { Prisma } from '@prisma/client';
import prisma from '../prisma';

class ProjectDao {
    async findAll() {
        return prisma.project.findMany({ include: { tags: { include: { tag: true } } } });
    }

    async findOne(projectId: string) {
        return prisma.project.findUnique({
            where: {
                id: projectId,
            },
            include: {
                tags: {
                    include: {
                        tag: true,
                    },
                },
            },
        });
    }

    async createOne(project: Prisma.ProjectCreateInput) {
        return prisma.project.create({
            data: project,
            include: {
                tags: {
                    include: {
                        tag: true,
                    },
                },
            },
        });
    }

    async updateOne(projectId: string, project: Prisma.ProjectUpdateInput) {
        return prisma.project.update({
            where: {
                id: projectId,
            },
            data: project,
        });
    }

    async deleteOne(projectId: string) {
        return prisma.project.delete({ where: { id: projectId } });
    }
}

export default new ProjectDao();
