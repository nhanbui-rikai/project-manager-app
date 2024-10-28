import { getFirestore } from "firebase/firestore";
import firebaseApp from "./firebaseCofig";

// https://firebase.google.com/docs/firestore/manage-data/add-data?hl=vi
const db = getFirestore(firebaseApp);
export default db;
