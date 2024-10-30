'use client'

import Link from "next/link";

interface IProject {
    id: number,
    name: string,
    desc: string,
    startDate: string,
    endDate: string
}

const ProjectCard = ({ project }: { project: IProject }) => {
    const { id, name, desc, startDate, endDate } = project;
    return (
        <div
            className="
                mr-2 
                max-w-sm 
                bg-white border 
                border-gray-200 
                rounded-lg 
                shadow 
                dark:bg-gray-800 
                dark:border-gray-700"
        >
            <div className="p-2">
                <Link href={`/projects/${id}`} >
                    <h5
                        className="
                            mb-1 
                            text-center 
                            text-2xl 
                            font-bold 
                            tracking-tight 
                            text-blue-500 
                            dark:text-white"
                    >
                        {name}
                    </h5>
                    <hr />
                    <p
                        className="
                            mt-1 
                            mb-1 
                            text-center 
                            italic 
                            font-thin 
                            text-gray-500 
                            dark:text-gray-400"
                    >
                        {desc}
                    </p>
                    <span
                        className="
                            mb-1 
                            font-bold 
                            font-sans 
                            text-red-500 
                            dark:text-gray-400 
                            text-center"
                    >
                        Timeline:
                    </span>
                    <p
                        className="
                            mb-1 
                            italic 
                            font-sans 
                            font-semibold 
                            inline 
                            text-center
                            ml-1"
                    >
                        {startDate} - {endDate}
                    </p>
                </Link>
            </div>
        </div >
    );
}

export default ProjectCard;
