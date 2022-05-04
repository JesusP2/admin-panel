import {initializeApp, cert, ServiceAccount} from "firebase-admin/app"
import firebaseAdmin from 'firebase-admin'
import {getAuth} from "firebase-admin/auth"
import * as serviceAccount from './credentials/admin-panel-6a07a-firebase-adminsdk-7i9dp-106c5e8649.json'

const app = firebaseAdmin.initializeApp({
    credential: cert(serviceAccount as ServiceAccount | string)
})

export const authApp = getAuth(app)
