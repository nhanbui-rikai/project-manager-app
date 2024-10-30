'use client'

import { DatePicker, Space, Form, Input, Modal, AutoComplete, Select } from "antd";
import { Option } from "antd/es/mentions";
import { useState } from "react";
import { allEmails } from "@/app/(dashboard)/projects/mockData";
const { RangePicker } = DatePicker;

export default function ProjectModal(props: any) {

    const [form] = Form.useForm();
    const { isProjectModalOpen, setIsProjectModalOpen, title } = props;
    const [emailOptions, setEmailOptions] = useState<string[]>([]);

    const handleOnCancel = () => {
        form.resetFields();
        setIsProjectModalOpen(false);
    }

    const handleSearchEmail = (value: string) => {
        const filteredEmails = allEmails.filter(email => email.toLowerCase().includes(value.toLowerCase()));
        setEmailOptions(filteredEmails);
    }

    return (
        <>
            <Modal
                title={title}
                open={isProjectModalOpen}
                onCancel={handleOnCancel}
            >
                <Form layout='vertical' form={form}>
                    <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter the name!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please select the description!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Timeline"
                        name="timeline"
                        rules={[{ required: true, message: 'Please select the date!' }]}
                    >
                        <Space direction="vertical" size={12}>
                            <RangePicker />
                        </Space>
                    </Form.Item>
                    <Form.Item
                        label="Members"
                        name="members"
                        rules={[{ required: true, message: 'Please select at least one member!' }]}
                    >
                        <Select
                            mode="tags"
                            placeholder="Enter email to add members"
                            onSearch={handleSearchEmail}
                            style={{ width: "100%" }}
                        >
                            {emailOptions.map(email => (
                                <Option key={email} value={email}>{email}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
