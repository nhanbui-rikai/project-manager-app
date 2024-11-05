import db from "@/lib/firebase/firestore";
import { formatDate } from "@/lib/utils";
import { collection, doc, getDoc, getDocs, query, Timestamp, updateDoc, where } from "firebase/firestore";
import { toast } from "react-toastify";

interface User {
  id: string;
  bio?: string;
  user_name?: string;
  email?: string;
  gender?: string;
  phone_number?: string;
  role?: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  members: User[];
}

export async function getAllProjects(): Promise<Project[]> {
  try {
    const projectsRef = collection(db, "projects");
    const projectsSnapshot = await getDocs(projectsRef);

    const projects: any = await Promise.all(
      projectsSnapshot.docs.map(async (projectDoc) => {
        const projectData = projectDoc.data();

        // get name members
        const members: User[] = [];
        if (projectData.members && Array.isArray(projectData.members)) {
          for (const memberRef of projectData.members) {
            const memberSnap: any = await getDoc(memberRef);

            if (memberSnap.exists()) {
              const memberData = memberSnap.data();
              members.push({
                id: memberSnap.id,
                bio: memberData.bio,
                user_name: memberData.user_name,
                email: memberData.email,
                gender: memberData.gender,
                phone_number: memberData.phone_number,
                role: memberData.role,
              });
            }
          }
        }
        let member: any = [];
        if (members.length > 0) {
          member = members.map((items) => items.user_name);
        }

        // get name tasks
        const tasks: any = [];
        if (projectData.tasks && Array.isArray(projectData.tasks)) {
          for (const taskRef of projectData.tasks) {
            const taskSnap: any = await getDoc(taskRef);

            if (taskSnap.exists()) {
              const taskData = taskSnap.data();

              // get name assigned
              const members: User[] = [];
              if (taskData.assigned_to && Array.isArray(taskData.assigned_to)) {
                for (const memberRef of taskData.assigned_to) {
                  const memberSnap: any = await getDoc(memberRef);

                  if (memberSnap.exists()) {
                    const memberData = memberSnap.data();
                    members.push(memberData.user_name);
                  }
                }
              }
              tasks.push({
                ...taskData,
                id: taskSnap.id,
                due_date:
                  taskData.due_date instanceof Timestamp
                    ? formatDate(new Date(taskData.due_date.seconds * 1000), "string")
                    : taskData.due_date,
                created_at:
                  taskData.created_at instanceof Timestamp
                    ? formatDate(new Date(taskData.created_at.seconds * 1000), "string")
                    : taskData.created_at,
                updated_at:
                  taskData.updated_at instanceof Timestamp
                    ? formatDate(new Date(taskData.updated_at.seconds * 1000), "string")
                    : taskData.updated_at,
                assigned_to: members,
                project_id: null,
              });
            }
          }
        }
        let taskResult: any = [];
        if (tasks.length > 0) {
          taskResult = tasks.map((items: any) => items.title);
        }
        const result = {
          ...projectData,
          id: projectDoc.id,
          start_date:
            projectData.start_date instanceof Timestamp
              ? formatDate(new Date(projectData.start_date.seconds * 1000), "string")
              : projectData.start_date,
          end_date:
            projectData.end_date instanceof Timestamp
              ? formatDate(new Date(projectData.end_date.seconds * 1000), "string")
              : projectData.end_date,
          members: member,
          tasks: tasks,
        };
        return result;
      }),
    );

    return projects;
  } catch (error) {
    toast.error(error instanceof Error ? error.message : "An error occurred");
    return [];
  }
}

export async function getProjectById(projectId: string) {
  try {
    const projectDocRef = doc(db, "projects", projectId);
    const projectDoc = await getDoc(projectDocRef);

    if (!projectDoc.exists()) {
      toast.error("Project not found");
      return null;
    }

    const projectData = projectDoc.data();

    const members: User[] = [];
    if (projectData.members && Array.isArray(projectData.members)) {
      for (const memberRef of projectData.members) {
        const memberSnap: any = await getDoc(memberRef);

        if (memberSnap.exists()) {
          const memberData = memberSnap.data();
          members.push({
            id: memberSnap.id,
            bio: memberData.bio,
            user_name: memberData.user_name,
            email: memberData.email,
            gender: memberData.gender,
            phone_number: memberData.phone_number,
            role: memberData.role,
          });
        }
      }
    }

    const tasks: any[] = [];
    if (projectData.tasks && Array.isArray(projectData.tasks)) {
      for (const taskRef of projectData.tasks) {
        const taskSnap: any = await getDoc(taskRef);

        if (taskSnap.exists()) {
          const taskData = taskSnap.data();
          tasks.push({
            ...taskData,
            id: taskSnap.id,
            due_date:
              taskData.due_date instanceof Timestamp ? new Date(taskData.due_date.seconds * 1000) : taskData.due_date,
            created_at:
              taskData.created_at instanceof Timestamp
                ? new Date(taskData.created_at.seconds * 1000)
                : taskData.created_at,
            updated_at:
              taskData.updated_at instanceof Timestamp
                ? new Date(taskData.updated_at.seconds * 1000)
                : taskData.updated_at,
          });
        }
      }
    }

    const result = {
      ...projectData,
      id: projectDoc.id,
      start_date:
        projectData.start_date instanceof Timestamp
          ? new Date(projectData.start_date.seconds * 1000)
          : projectData.start_date,
      end_date:
        projectData.end_date instanceof Timestamp
          ? new Date(projectData.end_date.seconds * 1000)
          : projectData.end_date,
      members: members,
      tasks: tasks,
    };

    return result;
  } catch (error) {
    toast.error(error instanceof Error ? error.message : "An error occurred");
    return null;
  }
}

export async function searchProjectsByName(name: string): Promise<Project[]> {
  try {
    const projectsCollectionRef = collection(db, "projects");

    const q = query(projectsCollectionRef, where("name", ">=", name), where("name", "<=", name + "\uf8ff"));

    const querySnapshot = await getDocs(q);
    const projects: any = [];

    querySnapshot.forEach((doc) => {
      const projectData = doc.data() as Project;
      projects.push({
        ...projectData,
        id: doc.id,
      });
    });

    return projects;
  } catch (error) {
    console.error("Error searching projects by name:", error);
    throw error;
  }
}

export async function updateProject(id: string, updateData: any): Promise<void> {
  try {
    const projectRef = doc(db, "projects", id);

    await updateDoc(projectRef, updateData);

    console.log("Project updated successfully.");
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
}
