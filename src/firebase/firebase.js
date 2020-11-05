const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

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
