'use client'

import { Avatar } from "antd";

const members = [
    {
        id: 1,
        name: 'Alice',
        avatar: '/avatar1.png'
    },
    {
        id: 2,
        name: 'NTN',
        avatar: '/avatar1.png'
    },
    {
        id: 3,
        name: 'ABC',
        avatar: '/avatar1.png'
    },
    {
        id: 4,
        name: 'Tung',
        avatar: '/avatar1.png'
    }
]

export default function Asignee() {

    const visibleMembers = members.slice(0, 3);
    const extraCount = members.length - 3;

    return (
        <Avatar.Group>
            {visibleMembers.map((member) => (
                <Avatar key={member.id} alt={member.name}>
                    {member.name.charAt(0)}
                </Avatar>
            ))}
            {extraCount > 0 && (
                <Avatar style={{ backgroundColor: '#f56a00' }}>
                    {`+${extraCount}`}
                </Avatar>
            )}
        </Avatar.Group>
    )
}
