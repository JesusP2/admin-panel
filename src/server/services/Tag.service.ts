import {Prisma} from '@prisma/client'
import tagDao from "server/daos/Tag";

class TagService {
    async findAll() {
        return tagDao.findAll()
    }

    async findOne(id: string) {
        return tagDao.findOne(id) 
    }

    async createOne(tag: Prisma.TagCreateInput) {
        return tagDao.createOne(tag)
    }

    async updateOne(tagId: string, tag: Prisma.TagUpdateInput) {
        return tagDao.updateOne(tagId, tag)
    }

    async deleteOne(tagId: string) {
        return tagDao.deleteOne(tagId)
    }
}

export default new TagService();
