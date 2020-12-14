import React, {useEffect} from 'react';
import { NavLink } from "react-router-dom";

import { Row, Col, Form, Input, Button, Typography } from 'antd';
import {useHttp} from "../hooks/http.hook";
import {useNotifier} from '../hooks/message.hook';
const { Title } = Typography;

export const RegisterPage = () => {
    const { loading, error, request, clearError } = useHttp();
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

    const handleRegister = async (data) => {
        console.log(data)
        try {
            const res = await request('/api/auth/register', 'POST', { ...data });
            message(res.message, 'success');
        } catch(err) {

        }
    }

    return (
        <Row>
            <Col span={4}></Col>
            <Col span={16}>
                <div style={{ display: 'flex', flexFlow: 'column' }}>
                    <Title>Register Page</Title>
                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={handleRegister}
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

                        <Form.Item
                            name="confirm"
                            label="Confirm"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject('The two passwords that you entered do not match!');
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit" disabled={loading}>
                                Register
                            </Button>
                            <NavLink to="/">
                                <Button style={{ marginLeft: '8px' }}>
                                    Login
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