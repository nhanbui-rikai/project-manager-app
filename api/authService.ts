import db from "@/lib/firebase/firestore";
import { addDoc, collection, getDocs, query, Timestamp, where } from "firebase/firestore";

export async function loginByEmail({ email, password }: { email: string; password: string }) {
  try {
    const q = query(collection(db, "users"), where("email", "==", email), where("password", "==", password));

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const user = {
        id: doc.id,
        ...doc.data(),
      };
      return user;
    } else {
      console.log("Không tìm thấy người dùng.");
    }
  } catch (error) {
    console.error("Lỗi khi truy vấn:", error);
    throw error;
  }
}

export async function register({
  email,
  password,
  userName,
  role,
}: {
  email: string;
  password: string;
  userName: string;
  role: string;
}) {
  try {
    const q = query(collection(db, "users"), where("email", "==", email));

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      throw new Error("Email is existed");
    } else {
      // Nếu email chưa tồn tại, tiến hành tạo user mới
      const newUser = {
        email,
        password, // Lưu ý: trong thực tế, không lưu plain password mà phải mã hóa
        userName,
        role,
        created_at: Timestamp.now(),
        updated_at: Timestamp.now(),
      };

      const docRef = await addDoc(collection(db, "users"), newUser);

      return { id: docRef.id, ...newUser };
    }
  } catch (error) {
    throw error;
  }
}
