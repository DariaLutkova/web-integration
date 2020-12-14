import React from 'react';
import {Layout, Spin} from "antd";

export const Loader = () => (
    <Layout style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spin size="large" />
    </Layout>
)