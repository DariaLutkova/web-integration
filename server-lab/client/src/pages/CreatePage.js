import React, { useContext } from 'react';

import {Row, Col, Typography, Form, Input, Button} from 'antd';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import { useHistory } from 'react-router-dom';
const { Title } = Typography;

export const CreatePage = () => {
    const history = useHistory();
    const { token } = useContext(AuthContext);
    const {request} = useHttp();
    const layout = {
        labelCol: { span: 2 },
        wrapperCol: { span: 22 },
    };
    const tailLayout = {
        wrapperCol: { offset: 10, span: 14 },
    };

    const handleLinkFormatting = async (data) => {
        try {
            const res = await request('/api/link/gen', 'POST', {...data}, {
                Authorization: `Bearer ${token}`
            });
            history.push(`/detail/${res?.link?._id}`);
        } catch (err) {}
    }

    return (
        <Row>
            <Col span={4}></Col>
            <Col span={16}>
                <div style={{ display: 'flex', flexFlow: 'column' }}>
                    <Title>Create Page</Title>
                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={handleLinkFormatting}
                        onFinishFailed={() => {}}
                    >
                        <Form.Item
                            label="Link"
                            name="from"
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                Shorten link
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Col>
            <Col span={4}></Col>
        </Row>
    )
}