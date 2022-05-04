import { Prisma } from '@prisma/client';
import prisma from '../prisma';

class TagDao {
    async findAll() {
        return prisma.tag.findMany()
    }

    async findOne(tagId: string) {
        return prisma.tag.findUnique({
            where: {
                id: tagId,
            },
        });
    }

    async createOne(tag: Prisma.TagCreateInput) {
        return prisma.tag.create({ data: tag });
    }

    async updateOne(tagId: string, tag: Prisma.TagUpdateInput) {
        return prisma.tag.update({
            where: {
                id: tagId,
            },
            data: tag,
        });
    }

    async deleteOne(tagId: string) {
        return prisma.tag.delete({ where: { id: tagId } });
    }
}

export default new TagDao();

