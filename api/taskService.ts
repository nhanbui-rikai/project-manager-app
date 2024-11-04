import { TaskData, User } from "@/constants/types";
import db from "@/lib/firebase/firestore";
import { doc, DocumentReference, getDoc, Timestamp, updateDoc } from "firebase/firestore";

export async function getTaskById(id: string) {
  try {
    const taskRef = doc(db, "tasks", id);
    const taskSnap = await getDoc(taskRef);

    if (!taskSnap.exists()) {
      return null;
    }

    const taskData = taskSnap.data();

    const assignedUsers: Array<User> = [];

    if (taskData?.assigned_to && Array.isArray(taskData.assigned_to)) {
      for (const userRef of taskData.assigned_to) {
        const userSnap = await getDoc(userRef);

        const user: any = userSnap.data();

        if (userSnap.exists()) {
          assignedUsers.push({
            id: userSnap.id,
            bio: user?.bio,
            userName: user?.user_name,
            email: user?.email,
            gender: user?.gender,
            phoneNumber: user?.phone_number,
            role: user?.role,
          });
        }
      }
    }

    const taskWithAssignedUsers: TaskData = {
      id: taskSnap.id,
      description: taskData.description,
      title: taskData.title,
      estimatedHour: taskData.estimate_hours,
      actualHour: taskData.actual_hours,
      status: taskData.status,
      assignedTo: assignedUsers,
      dueDate: taskData.due_date?.toDate(),
    };

    return taskWithAssignedUsers;
  } catch (error) {
    throw error;
  }
}

export async function updateTask(id: string, taskData: TaskData, members: Array<User>) {
  try {
    const docRef = doc(db, "tasks", id);

    const refArr: Array<DocumentReference> = members.map((mem) => {
      if (!mem.id) {
        throw new Error("User ID is undefined");
      }
      return doc(db, "users", mem.id);
    });

    await updateDoc(docRef, {
      title: taskData.title,
      description: taskData.description,
      estimate_hours: taskData.estimatedHour,
      actual_hours: taskData.actualHour,
      due_date: Timestamp.fromDate(taskData.dueDate || new Date()),
      updated_at: Timestamp.now(),
      assigned_to: refArr,
    });

    return true;
  } catch (error) {
    throw error;
  }
}
