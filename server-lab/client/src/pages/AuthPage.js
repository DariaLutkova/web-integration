import React, {useEffect, useContext} from 'react';
import { NavLink } from "react-router-dom";

import { Row, Col, Form, Input, Button, Typography } from 'antd';
import {useHttp} from "../hooks/http.hook";
import {useNotifier} from '../hooks/message.hook';
import {AuthContext} from "../context/AuthContext";
const { Title } = Typography;

export const AuthPage = () => {
    const { loading, error, request, clearError } = useHttp();
    const auth = useContext(AuthContext);
    const message = useNotifier();
    const layout = {
        labelCol: { span: 2 },
        wrapperCol: { span: 22 },
    };
    const tailLayout = {
        wrapperCol: { offset: 10, span: 14 },
    };

    useEffect(() => {
        message(error, 'error');
        clearError();
    }, [error, message, clearError]);

    const handleLogin = async (data) => {
        try {
            const res = await request('/api/auth/login', 'POST', { ...data });
            auth.login(res.token, res.userId);
        } catch(err) {}
    }

    return (
        <Row>
            <Col span={4}></Col>
            <Col span={16}>
                <div style={{ display: 'flex', flexFlow: 'column' }}>
                    <Title>Auth Page</Title>
                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={handleLogin}
                        onFinishFailed={() => {}}
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            type="email"
                            rules={[ {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit" disabled={loading}>
                                Login
                            </Button>
                            <NavLink to="/register">
                                <Button style={{ marginLeft: '8px' }}>
                                    Register
                                </Button>
                            </NavLink>
                        </Form.Item>
                    </Form>
                </div>
            </Col>
            <Col span={4}></Col>
        </Row>
    )
}