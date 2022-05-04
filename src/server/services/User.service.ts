import {authApp} from 'firebase/admin'

class UserService {
    async findOne(uid: string) {
        return authApp.getUser(uid)
    }

    async findAll() {
        return authApp.listUsers()
    }

    async createOne(user: {email: string, password: string, displayName: string, phoneNumber: string}) {
        return authApp.createUser(user)
    }

    async updateOne(id: string, user: {email: string, password: string, displayName: string, phoneNumber: string}) {
        return authApp.updateUser(id, user)
    }

    async deleteOne(id: string) {
        return authApp.deleteUser(id)
    }
}

export default new UserService()
