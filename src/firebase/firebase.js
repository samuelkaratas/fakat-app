const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");
require("firebase/auth");

const firebaseConfig = {
  apiKey: "AIzaSyCpA0C6YknBsPudfKWbZOa9KTRCABTUjA4",
  authDomain: "fakat-app.firebaseapp.com",
  databaseURL: "https://fakat-app.firebaseio.com",
  projectId: "fakat-app",
  storageBucket: "fakat-app.appspot.com",
  messagingSenderId: "154739498298",
  appId: "1:154739498298:web:e265b97dc6057bcf810403",
  measurementId: "G-J108DWJ9Z7",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = db.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();

export const suggestDilemma = (firstOption, secondOption) => {
  db.collection("suggestions")
    .add({
      firstOption,
      secondOption,
    })
    .then((docRef) => {
      alert("Başarıyla Gönderildi");
      //console.log(docRef);
    })
    .catch((error) => {
      alert("Opss... Bir hata yaşandı.");
      //console.error(error);
    });
};

export const readSuggestions = async () => {
  const docArray = [];
  const querySnapshot = await db.collection("dilemmas").get();

  /*const a = await (await db.collection("suggestions").get()).size;
  console.log(a);
  const b = Math.round(Math.random() * a);
  console.log(b);
  const c = await (await db.collection("suggestions").get()).docs[b].data()
  console.log(c);*/

  querySnapshot.forEach((doc) => {
    docArray.push({ ...doc.data(), id: doc.id });
    //console.log(`${doc.id} => ${doc.data().firstOption} FAKAT ${doc.data().secondOption}`);
  });
  //console.log("docArray", docArray);
  return docArray;
};

export const updateRatio = (id, yesOrNo) => {
  const increment = firebase.firestore.FieldValue.increment(1);

  const storyRef = db.collection("dilemmas").doc(id);
  if (yesOrNo) {
    storyRef.update({ yesCount: increment });
  } else {
    storyRef.update({ noCount: increment });
  }
};

export const updateLike = (id, yesOrNo) => {
  const increment = firebase.firestore.FieldValue.increment(1);
  const decrement = firebase.firestore.FieldValue.increment(-1);

  const storyRef = db.collection("dilemmas").doc(id);
  if (yesOrNo) {
    storyRef.update({ liked: increment });
  } else {
    storyRef.update({ liked: decrement });
  }
};

export const postComment = (id, comment, name) => {
  return new Promise((resolve, reject) => {
    var commentRef = db.collection("comments").doc(id);
    const commentStructure = {
      comment: comment,
      username: name,
      date: new Date(),
    };

    // Atomically add a new region to the "regions" array field.
    commentRef
      .get()
      .then((docSnapshot) => {
        if (docSnapshot.exists) {
          commentRef.update({
            comments: firebase.firestore.FieldValue.arrayUnion(
              commentStructure
            ),
          }).then(() => {
            resolve(true);
          })
        } else {
          commentRef.set({
            comments: [commentStructure],
          }).then(() => {
            resolve(true);
          })
        }
      })
      .catch((err) => {
        console.log(err);
        reject(false);
      });
  });

  /*
  commentRef.update({
      comments: firebase.firestore.FieldValue.arrayUnion(comment)
  });*/

  // Atomically remove a region from the "regions" array field. 9VLCosimn3Dcu39XpqTo, dLFyECOj7YQTBVUu4fSU
  /*
  commentRef.update({
      regions: firebase.firestore.FieldValue.arrayRemove("east_coast")
  });*/
};

export const getCommentsFromDatabase = async (id) => {
  const querySnapshot = await db.collection("comments").doc(id).get();
  const data = await querySnapshot.data();
  if (data) {
    return data.comments;
  } else {
    return [];
  }
};
