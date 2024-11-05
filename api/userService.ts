import { User } from "@/constants/types";

import db from "@/lib/firebase/firestore";
import {
  collection,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
  Query,
  QuerySnapshot,
  startAfter,
  startAt,
  where,
} from "firebase/firestore";

interface PaginationProps {
  limit: number;
  start: number;
}

export const getAllUser = async () => {
  try {
    let data: DocumentData[] = [];

    // Query the first page of docs
    const first = query(collection(db, "users"), orderBy("updated_at"), limit(25));
    const documentSnapshots = await getDocs(first);

    // Get the last visible document
    const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
    // console.log("last", lastVisible);

    // Construct a new query starting at this document,
    // get the next 25 cities.
    const next = query(collection(db, "users"), orderBy("updated_at"), startAfter(lastVisible), limit(25));

    // const q: Query<DocumentData> = query(collection(db, "users"), orderBy("created_at"),limit(25));

    // const documentSnapshots: QuerySnapshot<DocumentData> = await getDocs(q);

    documentSnapshots.forEach((doc) => {
      const res = doc.data();
      res.id = doc.id;
      if (res.updated_at) res.updated_at = new Date(res.updated_at.seconds * 1000);
      if (res.created_at) res.created_at = new Date(res.created_at.seconds * 1000);
      data.push(res);
    });

    if (data.length === 0) return null;

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const q: Query<DocumentData> = query(collection(db, "cities"), where("capital", "==", true));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteUserById = async (id: string) => {};

export const updateUserById = async (id: string) => {};

export const searchUser = async (searchValue: string) => {
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
};
