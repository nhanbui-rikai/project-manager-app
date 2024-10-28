// lib/firebase/firestore.ts
import { getFirestore, Firestore } from "firebase/firestore";
import firebaseApp from "./firebaseConfig"; // Đảm bảo firebaseApp được import đúng

// Khởi tạo Firestore
const db: Firestore = getFirestore(firebaseApp);

export default db;

