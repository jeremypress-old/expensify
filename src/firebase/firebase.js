import * as firebase from 'firebase';

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
  };

firebase.initializeApp(config);

const database = firebase.database();

export { firebase, database as default };

// database.ref('expenses')
// .on('value', (snapshot) => {
//     const expenses = []
//     const val = snapshot.forEach((item) => {
//         expenses.push({
//             id: item.key,
//             ...item.val()
//         });
//     });
//     console.log(expenses);
// });
//
// database.ref('expenses')
// .on('child_changed', (snapshot) => {
//     const expenses = []
//     const val = snapshot.value();
//     console.log(value);
// });
//
// setTimeout(() => {
//     database.ref('expenses').push({
//     description: 'test1',
//     amount: 100,
//     createdAt: 1000000
// });
// }, 3000);


// database.ref('notes/-L01zhPAIuvgTP95bzWO').remove()
