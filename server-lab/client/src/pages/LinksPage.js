import React, { useContext, useState, useEffect, useCallback } from 'react';

import {Row, Col, Typography, List, Card} from 'antd';
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {NavLink} from "react-router-dom";
const { Title, Paragraph } = Typography;

export const LinksPage = () => {
    const [links, setLinks] = useState([]);
    const { loading, request } = useHttp();
    const { token } = useContext(AuthContext);

    const fetchLinks = useCallback(async () => {
        try {
            const res = await request('/api/link/', 'GET', null, {
                Authorization: `Bearer ${token}`
            });
            setLinks(res.links);
        } catch(err) {
            console.log(err)
        }
    }, [token, request]);

    useEffect(() => {
        fetchLinks();
    }, [fetchLinks])

    return (
        <Row>
            <Col span={4}></Col>
            <Col span={16}>
                <div style={{ display: 'flex', flexFlow: 'column' }}>
                    <Title>Links Page</Title>
                    <List
                        itemLayout="horizontal"
                        bordered
                        dataSource={links}
                        loading={loading}
                        renderItem={(item, i) => (
                            <List.Item className="listItem">
                                <Title level={4}>Link №{i + 1}</Title>
                                <Paragraph style={{ maxWidth: '200px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                                    {item?.from}
                                </Paragraph>
                                <NavLink to={`/detail/${item._id}`}>More Info</NavLink>
                            </List.Item>
                        )}
                    />
                </div>
            </Col>
            <Col span={4}></Col>
        </Row>
    )
}