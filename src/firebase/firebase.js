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

export const readSuggestions = async (userId) => {
  const docArray = [];
  const querySnapshot = await db.collection("dilemmas").get();

  querySnapshot.forEach((doc) => {
    docArray.push({ ...doc.data(), id: doc.id });
  });

  if (userId) {
    const userRef = await db.collection("users").doc(userId).get();
    let seenDilemmas = userRef.data().seenDilemmas;

    if (seenDilemmas) {
      //console.log('seenDilemmas', seenDilemmas)
      //console.log('docArray', docArray)
      const reducedDocArray = docArray.filter((cur) => {
        for (let i = 0; i < seenDilemmas.length; i++) {
          if (cur.id === seenDilemmas[i]) {
            seenDilemmas.splice(i, 1);
            return false;
          }
        }
        return true;
      });

      return reducedDocArray;
    }
  }

  return docArray;
};

export const updateRatio = (id, yesOrNo, userId) => {
  const increment = firebase.firestore.FieldValue.increment(1);

  const storyRef = db.collection("dilemmas").doc(id);
  if (yesOrNo) {
    storyRef.update({ yesCount: increment });
  } else {
    storyRef.update({ noCount: increment });
  }

  if (userId) {
    var userRef = db.collection("users").doc(userId);

    userRef.update({
      seenDilemmas: firebase.firestore.FieldValue.arrayUnion(id),
    });
  }
};

export const updateLike = (id, yesOrNo, userId) => {
  const increment = firebase.firestore.FieldValue.increment(1);
  const decrement = firebase.firestore.FieldValue.increment(-1);

  if (userId) {
    var userRef = db.collection("users").doc(userId);
  }

  const storyRef = db.collection("dilemmas").doc(id);

  if (yesOrNo) {
    storyRef.update({ liked: increment });
    if (userId) {
      userRef.update({
        favorites: firebase.firestore.FieldValue.arrayUnion(id),
      });
    }
  } else {
    storyRef.update({ liked: decrement });
    if (userId) {
      userRef.update({
        favorites: firebase.firestore.FieldValue.arrayRemove(id),
      });
    }
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
          commentRef
            .update({
              comments: firebase.firestore.FieldValue.arrayUnion(
                commentStructure
              ),
            })
            .then(() => {
              resolve(true);
            });
        } else {
          commentRef
            .set({
              comments: [commentStructure],
            })
            .then(() => {
              resolve(true);
            });
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

export const getFav = async (ids) => {
  //console.log(ids)
  const favArray = [];
  for (let i = 0; i < ids.length; i++) {
    const storyRef = await db.collection("dilemmas").doc(ids[i]).get();
    favArray.push({ ...storyRef.data(), id: ids[i] });
  }
  return favArray;
  //const storyRef = await db.collection("dilemmas").doc(id).get();
  //return storyRef.data();
};

export const getSingleFav = async (id) => {
  const storyRef = await db.collection("dilemmas").doc(id).get();
  const ref =  await storyRef.data();
  return ref;
};
