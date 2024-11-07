import { User } from "@/constants/types";

import db from "@/lib/firebase/firestore";
import { collection, deleteDoc, doc, getDocs, Timestamp, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";

interface UserServiceProps {
  user_name: string;
  role: "admin" | "member";
  phone_number: string;
  email: string;
  gender: string;
  password: string;
  updated_at: Date | Timestamp;
  created_at: Date | Timestamp;
}

export interface UserResult extends UserServiceProps {
  id: string;
}

export class UserService {
  userPropData: UserServiceProps;

  constructor(props: UserServiceProps) {
    this.userPropData = {
      user_name: props.user_name,
      role: props.role,
      phone_number: props.phone_number,
      email: props.email,
      gender: props.gender,
      password: props.password,
      updated_at: props.updated_at,
      created_at: props.created_at,
    };
  }

  static async getAllUsers() {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const users: UserResult[] = [];

      querySnapshot.forEach((doc) => {
        const userData = doc.data() as UserServiceProps;

        users.push({
          ...userData,
          updated_at:
            userData.updated_at instanceof Timestamp
              ? new Date(userData.updated_at.seconds * 1000)
              : userData.updated_at,
          created_at:
            userData.created_at instanceof Timestamp
              ? new Date(userData.created_at.seconds * 1000)
              : userData.created_at,
          id: doc.id,
        });
      });

      return users;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
      return [];
    }
  }

  static async updateUser(id: string, updateData: any) {
    try {
      const userRef = doc(db, "users", id);

      await updateDoc(userRef, updateData);

      return { success: true };
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    }
  }

  static async searchUser(searchValue: string) {
    try {
      const usersRef = collection(db, "users");
      const querySnapshot = await getDocs(usersRef);

      const matchedUsers: Array<User> = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (
          (data.email && data.email.includes(searchValue)) ||
          (data.user_name && data.user_name.includes(searchValue))
        ) {
          matchedUsers.push({
            id: doc.id,
            email: data?.email,
            userName: data?.user_name,
            phoneNumber: data?.phone_number,
            gender: data?.gender,
            bio: data?.bio,
            role: data?.role,
          });
        }
      });

      return matchedUsers;
    } catch (error) {
      throw error;
    }
  }
  static async deleteUser(id: string) {
    try {
      await deleteDoc(doc(db, "users", id));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
      return null;
    }
  }
}
