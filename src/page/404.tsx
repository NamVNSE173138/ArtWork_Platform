import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';

export default function NotFound() {
    const navigate = useNavigate()
    return (
        <>
            <Navbar onSubmit={() => { }} />
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                style={{ marginTop: '5%' }}
                extra={
                    <Button type="primary" onClick={() => navigate('/home')}
                        style={{ backgroundColor: '#0B7892', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}
                    >Back Home</Button>
                }
            />
        </>
    );
} 