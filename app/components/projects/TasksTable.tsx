'use client'

import { useState } from "react";
import { Avatar, Col, Table, Tag } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

const tasks = [
    {
        id: 1,
        name: 'Task 1',
        description: 'This is Task 1',
        estimation: 'Feb 14, 2024 - Feb 1, 2024',
        priority: 'HIGH',
        status: 'OPEN',
        people: [
            { name: 'Alice', avatar: '/avatar1.png' },
            { name: 'David', avatar: '/avatar2.png' }
        ]
    },
    {
        id: 7,
        name: 'Task 7',
        description: 'This is Task 7',
        estimation: 'Feb 14, 2024 - Feb 1, 2024',
        priority: 'NORMAL',
        status: 'OPEN',
        people: [
            { name: 'Alice', avatar: '/avatar1.png' },
            { name: 'David', avatar: '/avatar2.png' },
            { name: 'Alice', avatar: '/avatar1.png' },
            { name: 'David', avatar: '/avatar2.png' },
        ]
    },
    {
        id: 2,
        name: 'Task 2',
        description: 'This is Task 2',
        estimation: 'Feb 14, 2024 - Feb 1, 2024',
        priority: 'NORMAL',
        status: 'IN PROGRESS',
        people: [
            { name: 'NTN', avatar: '/avatar1.png' },
            { name: 'Nghia', avatar: '/avatar2.png' }
        ]
    },
    {
        id: 3,
        name: 'Task 3',
        description: 'This is Task 3',
        estimation: 'Feb 14, 2024 - Feb 1, 2024',
        priority: 'LOW',
        status: 'RESOLVED',
        people: [
            { name: 'NTN', avatar: '/avatar1.png' },
            { name: 'Nghia', avatar: '/avatar2.png' }
        ]
    },
    {
        id: 4,
        name: 'Task 4',
        description: 'This is Task 2',
        estimation: 'Feb 14, 2024 - Feb 1, 2024',
        priority: 'HIGH',
        status: 'REVIEW',
        people: [
            { name: 'NTN', avatar: '/avatar1.png' },
            { name: 'Nghia', avatar: '/avatar2.png' },
            { name: 'Nghia', avatar: '/avatar2.png' },
            { name: 'Nghia', avatar: '/avatar2.png' },
            { name: 'Nghia', avatar: '/avatar2.png' }
        ]
    },
    {
        id: 5,
        name: 'Task 5',
        description: 'This is Task 5',
        estimation: '3 hours',
        priority: 'NORMAL',
        status: 'PENDING',
        people: [
            { name: 'NTN', avatar: '/avatar1.png' },
            { name: 'Nghia', avatar: '/avatar2.png' },
            { name: 'Nghia', avatar: '/avatar2.png' }
        ]
    },
    {
        id: 6,
        name: 'Task 6',
        description: 'This is Task 6',
        estimation: '3 hours',
        priority: 'NORMAL',
        status: 'CLOSED',
        people: [
            { name: 'NTN', avatar: '/avatar1.png' },
            { name: 'Nghia', avatar: '/avatar2.png' },
            { name: 'Nghia', avatar: '/avatar2.png' },
            { name: 'Nghia', avatar: '/avatar2.png' }
        ]
    }
];

const columns = [
    {
        title: 'Task Name',
        dataIndex: 'name',
        key: 'name',
        width: "20%",
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        width: "20%",
    },
    {
        title: 'Estimation',
        dataIndex: 'estimation',
        key: 'estimation',
        width: "20%",
    },
    {
        title: 'Members',
        dataIndex: 'people',
        key: 'people',
        width: "20%",
        render: (people: any[]) => (
            <Avatar.Group size="small">
                {people.map((person) => (
                    <Avatar key={person.id} alt={person.name}>
                        {person.name.charAt(0)}
                    </Avatar>
                ))}
            </Avatar.Group>
        )
    },
    {
        title: 'Priority',
        dataIndex: 'priority',
        key: 'priority',
        width: "20%",
        render: (priority: string) => {
            let color;
            switch (priority) {
                case 'HIGH':
                    color = 'red';
                    break;
                case 'NORMAL':
                    color = 'green';
                    break;
                case 'LOW':
                    color = 'blue';
                    break;
            }
            return (
                <Tag color={color} key={priority}>
                    {priority}
                </Tag>
            );
        }
    }
];

export default function TasksTable(props: any) {

    const [isTableVisible, setIsTableVisible] = useState<boolean>(false);

    const handleClickTriangle = () => {
        setIsTableVisible(!isTableVisible);
    }

    return (
        <div className="mt-7">
            <button
                style={{ color: props.color }}
                className={`inline font-bold ${props.color}`}
                onClick={handleClickTriangle}
            >
                {isTableVisible ? <><UpOutlined /> {props.name}</> : <><DownOutlined /> {props.name}</>}
            </button>
            {isTableVisible &&
                <div>
                    <Table
                        dataSource={tasks.filter(task => task.status === props.name)}
                        columns={columns}
                        pagination={false}
                        scroll={{ x: "max-content" }}
                    />
                </div>
            }
        </div>
    )
}