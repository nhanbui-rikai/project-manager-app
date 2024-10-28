import { collection, doc, getDoc } from "firebase/firestore";
import db from "@/lib/firebase/firestore";

export async function getData() {
  const docRef = doc(db, "test", "V6I4cpy47LupxPLtADci");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
}
