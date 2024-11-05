import Button from "@/app/components/projects/AddButton";
import ProjectCard from "@/app/components/projects/ProjectCard";
import { projects } from "@/app/(dashboard)/projects/mockData";

const ProjectList = () => {
    return (
        <div className="overflow-y-hidden">
            <div
                className="
                    mt-2 
                    grid 
                    grid-cols-1 
                    sm:grid-cols-2 
                    lg:grid-cols-3 
                    xl:grid-cols-4 
                    gap-4 
                    p-4"
            >
                {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
            </div>
            <Button spanName="Add new Project" />
        </div>
    );
};

export default ProjectList;