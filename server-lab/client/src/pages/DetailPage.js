import React, { useState, useCallback, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import { Row, Col, Typography, Card } from 'antd';
const { Title, Paragraph } = Typography;

export const DetailPage = () => {
    const [link, setLink] = useState(null);
    const { token } = useContext(AuthContext);
    const { request, loading } = useHttp();
    const linkId = useParams().id;

    const getLink = useCallback(async () => {
        try {
            const res = await request(`/api/link/${linkId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })

            setLink(res);
        } catch(err) {}
    }, [token, linkId, request]);

    useEffect(() => {
        getLink();
    }, [getLink])


    return (
        <Row>
            <Col span={4}></Col>
            <Col span={16}>
                <div style={{ display: 'flex', flexFlow: 'column' }}>
                    <Title>Detail Page</Title>
                    <Card style={{ width: '100%', marginTop: 16 }} loading={loading}>
                        <Title level={4}>Link Info</Title>
                        <Paragraph>Your Link: <a href={link?.to} target="_blank" rel="noopener noreferrer">{link?.to}</a></Paragraph>
                        <Paragraph>Source Link:  <a href={link?.from} target="_blank" rel="noopener noreferrer">{link?.from}</a></Paragraph>
                        <Paragraph>Number of clicks: {link?.clicks}</Paragraph>
                        <Paragraph>Date of creation: <strong>{new Date(link?.date).toLocaleDateString()}</strong></Paragraph>
                    </Card>
                </div>
            </Col>
            <Col span={4}></Col>
        </Row>
    )
}