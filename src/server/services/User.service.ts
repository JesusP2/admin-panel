import { authApp } from '../../firebase/server'

class UserService {
    async findOne(uid: string) {
        return authApp.getUser(uid)
    }

    async findAll() {
        return authApp.listUsers()
    }

    async createOne(user: {email: string, password: string, displayName: string, phoneNumber?: string}) {
        if (user.phoneNumber) {
            return authApp.createUser(user)
        }
        const {email, password, displayName} = user
        const newUser = await authApp.createUser({email, password, displayName})
        await authApp.setCustomUserClaims(newUser.uid, {admin: false})
        return authApp.getUser(newUser.uid)
    }

    async updateOne(id: string, user: {email: string, password: string, displayName: string, phoneNumber: string}) {
        return authApp.updateUser(id, user)
    }

    async deleteOne(id: string) {
        const user = await authApp.getUser(id)
        if (user.customClaims?.admin) {
            throw new Error("No puedes eliminar a otro administrador")
        }
        return authApp.deleteUser(id)
    }
}

export default new UserService()
