import Button from "@/app/components/projects/AddButton";
import Asignee from "@/app/components/projects/Asignee";
import ProjectOptions from "@/app/components/projects/ProjectOptions";
import TasksTable from "@/app/components/projects/TasksTable";
import { propsOfTaskTable } from "@/app/(dashboard)/projects/mockData";

const DetailProject = () => {
    return (
        <div className="p-[2px]">
            <div
                className="
                    flex 
                    mb-4
                    justify-between"
            >
                <div
                    className="
                        inline 
                        mb-2 
                        text-2xl 
                        font-bold 
                        tracking-tight 
                        text-blue-500 
                        dark:text-white"
                >
                    PROJECT
                </div>
                <ProjectOptions />
            </div>

            <div className="flex items-center justify-between mt-2">
                <span
                    className="
                        font-bold 
                        font-sans
                        text-red-500
                        dark:text-gray-400
                        min-[500px]:text-[16px]
                        max-[431px]:text-[11px]"
                >
                    Timeline: <p className="inline">2024/11/02 - 2025/11/02</p>
                </span>
                <div className="italic text-sm">
                    <Asignee />
                </div>
            </div>

            <div>
                <p className="mt-[20px] text-center font-bold">Description:</p>
                <p className="italic font-normal text-gray-700 dark:text-gray-400 break-words text-center">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor fuga voluptates repellendus nulla reprehenderit praesentium eius eos id assumenda tenetur.
                </p>
            </div>

            {propsOfTaskTable.map(item => (
                <TasksTable key={item.name} name={item.name} color={item.color} />
            ))}

            <Button spanName="Add new Task" />
        </div>
    );
}

export default DetailProject;