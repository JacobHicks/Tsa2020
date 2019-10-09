import Firebase from 'firebase';
let config = {
    apiKey: 'AIzaSyD6ipzKZhVdy1krisyb5PCDpZmtMNfrf8Q',
    authDomain: 'rnfirebXXX-XXXX.firebaseapp.com',
    databaseURL: 'rnfirebXXX-XXXX.firebaseapp.com',
    projectId: 'banger-a0b8c',
    storageBucket: 'rnfirebase-XXXX.appspot.com',
    messagingSenderId: 'XXXXXXX'
};
let app = Firebase.initializeApp(config);
export const db = app.database();
