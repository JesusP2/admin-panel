import firebaseAdmin from 'firebase-admin';
import * as serviceAccount from './credentials/admin-panel-6a07a-firebase-adminsdk-7i9dp-106c5e8649.json';

function getApp() {
    try {
        const app = firebaseAdmin.app();
        return app;
    } catch (err: unknown) {
        const app = firebaseAdmin.initializeApp({
            credential: firebaseAdmin.credential.cert(serviceAccount as any),
        });

        return app
    }
}

export const authApp = getApp().auth()
