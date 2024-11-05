'use client'

import { useState } from "react";
import { useRouter } from 'next/navigation'
import ProjectModal from "@/app/components/projects/ProjectModal";

const Button = ({ spanName }: { spanName: string }) => {

    const router = useRouter()
    const [isProjectModalOpen, setIsProjectModalOpen] = useState<boolean>(false);

    const handleOnClick = () => {
        spanName.includes('Project') ? setIsProjectModalOpen(true) : router.push('/create_task');
    }

    return (
        <>
            <div className="fixed bottom-8 right-6 group">
                <button
                    onClick={handleOnClick}
                    className="
                        text-6xl
                        w-16 h-16 
                        rounded-full 
                        font-bold 
                        bg-blue-500 
                        text-white 
                        hover:bg-blue-400 
                        focus:outline-none"
                >
                    +
                </button>
                <span
                    className="
                        opacity-0 
                        group-hover:opacity-100 
                        transition-opacity 
                        duration-300 
                        text-black 
                        text-xs 
                        rounded 
                        py-1 
                        px-2 
                        absolute 
                        bottom-1 
                        right-20 
                        transform 
                        translate-x-1/2"
                >
                    {spanName}
                </span>
            </div>
            <ProjectModal
                isProjectModalOpen={isProjectModalOpen}
                setIsProjectModalOpen={setIsProjectModalOpen}
                title="Create Project"
            />
        </>
    );
}

export default Button;
