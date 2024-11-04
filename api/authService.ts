import { ChangePassForm, RegisterForm, User } from "@/constants/types";
import db from "@/lib/firebase/firestore";
import { addDoc, collection, doc, getDoc, getDocs, query, Timestamp, updateDoc, where } from "firebase/firestore";

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
      throw new Error("Not found user");
    }
  } catch (error) {
    throw error;
  }
}

export async function register({ email, password, userName, role }: RegisterForm) {
  try {
    const q = query(collection(db, "users"), where("email", "==", email));

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      throw new Error("Email is existed");
    } else {
      const newUser = {
        email,
        password,
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

export async function updateProfile({ userName, bio, gender, phoneNumber, id }: User) {
  try {
    const userDocRef = doc(db, "users", id || "");

    await updateDoc(userDocRef, {
      user_name: userName,
      phone_number: phoneNumber,
      gender: gender,
      bio: bio,
    });
    return true;
  } catch (error) {
    throw error;
  }
}

export async function changePassword({ currentPassword, newPassword, userId }: ChangePassForm) {
  try {
    const userDocRef = doc(db, "users", userId);
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      const user = docSnap.data();

      if (user.password !== currentPassword) {
        throw new Error("Current password is not correct");
      }
      await updateDoc(userDocRef, {
        password: newPassword,
      });
      return true;
    } else {
      throw new Error("Not found");
    }
  } catch (error) {
    throw error;
  }
}
