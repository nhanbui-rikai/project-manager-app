'use client'

import { Dropdown, Button, Popconfirm, Modal } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { useState } from "react";
import ProjectModal from "@/app/components/projects/ProjectModal";

const ProjectOptions = () => {

    const [isProjectModalOpen, setIsProjectModalOpen] = useState<boolean>(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

    const handleEdit = () => {
        setIsProjectModalOpen(true);
    }

    const handleDeleteConfirm = () => {
        setIsDeleteModalOpen(false);
    };

    const handleDeleteCancel = () => {
        setIsDeleteModalOpen(false);
    };

    const menuItems = [
        {
            key: "edit",
            label: (
                <span onClick={handleEdit}>
                    Edit
                </span>
            ),
        },
        {
            key: "delete",
            label: (
                <span style={{ color: 'red' }} onClick={() => setIsDeleteModalOpen(true)}>
                    Delete
                </span>
            ),
        },
    ];

    return (
        <>
            <Dropdown menu={{ items: menuItems }} trigger={['click']}>
                <Button type="text" icon={<EllipsisOutlined style={{ fontSize: '25px' }} />} />
            </Dropdown>
            <ProjectModal
                isProjectModalOpen={isProjectModalOpen}
                setIsProjectModalOpen={setIsProjectModalOpen}
                title="Edit Project"
            />
            <Modal
                title="Confirm Deletion"
                open={isDeleteModalOpen}
                onOk={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
                okText="Yes"
                cancelText="No"
                centered
            >
                <p>Are you sure you want to delete this project?</p>
            </Modal>
        </>
    );
};

export default ProjectOptions;