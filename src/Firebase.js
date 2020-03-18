import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

const settings = { timestampsInSnapshots: true };

const config = {
	apiKey: 'AIzaSyAocEp5qs-ZpjFX7JRZXU1NURkw9MtdrOM',
	authDomain: 'ajio-1888c.firebaseapp.com',
	databaseURL: 'https://ajio-1888c.firebaseio.com',
	projectId: 'ajio-1888c',
	storageBucket: 'ajio-1888c.appspot.com',
	messagingSenderId: '586314976487'
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;
