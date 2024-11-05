const propsOfTaskTable = [
    {
        name: 'OPEN',
        color: 'text-red-400'
    },
    {
        name: 'IN PROGRESS',
        color: 'text-blue-500'
    },
    {
        name: 'RESOLVED',
        color: 'text-green-500'
    },
    {
        name: 'REVIEW',
        color: 'text-pink-500'
    },
    {
        name: 'PENDING',
        color: 'text-yellow-600'
    },
    {
        name: 'CLOSED',
        color: 'text-green-950'
    }
]

const projects = [
    {
        id: 1,
        name: 'Project 1',
        desc: 'This is a Project 1',
        startDate: '2024/10/29',
        endDate: '2024/11/02',
        status: 'OPEN'
    },
    {
        id: 2,
        name: 'Project 2',
        desc: 'This is a Project 2',
        startDate: '2024/10/29',
        endDate: '2024/11/02',
        status: 'IN PROGRESS'
    },
    {
        id: 3,
        name: 'Project 3',
        desc: 'This is a Project 3',
        startDate: '2024/10/29',
        endDate: '2024/11/02',
        status: 'RESOLVED'
    },
    {
        id: 4,
        name: 'Project 4',
        desc: 'This is a Project 4',
        startDate: '2024/10/29',
        endDate: '2024/11/02',
        status: 'REVIEW'
    },
    {
        id: 5,
        name: 'Project 5',
        desc: 'This is a Project 5',
        startDate: '2024/10/29',
        endDate: '2024/11/02',
        status: 'PENDING'
    },
    {
        id: 6,
        name: 'Project 6',
        desc: 'This is a Project 6',
        startDate: '2024/10/29',
        endDate: '2024/11/02',
        status: 'CLOSED'
    }
]

const allEmails = [
    "john.doe@example.com",
    "jane.smith@example.com",
    "alice.johnson@example.com",
    "bob.brown@example.com",
    "charlie.davis@example.com",
    "emily.taylor@example.com",
    "john.doe@example.com",
    "jane.smith@example.com",
    "alice.johnson@example.com",
    "bob.brown@example.com",
    "charlie.davis@example.com",
    "emily.taylor@example.com",
]

export { propsOfTaskTable, projects, allEmails }