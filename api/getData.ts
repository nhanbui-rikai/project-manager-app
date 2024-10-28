// utils/getData.ts
import { doc, getDoc, DocumentData, DocumentSnapshot } from "firebase/firestore";
import db from "@/lib/firebase/firestore"; 


export async function getData(): Promise<void> {
  try {
  
    const docRef = doc(db, "projects", "2MnTAAXuaHY9yogAo9lv");

  
    const docSnap: DocumentSnapshot<DocumentData> = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error fetching document:", error);
  }
}
