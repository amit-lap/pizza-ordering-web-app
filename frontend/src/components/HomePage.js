/**
 * HomePage Component
 *
 * Renders the homepage of the application with buttons to start a new order
 * or check order status.
 */
import React from 'react';
import { Container, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();

    return (
        <Container className="align-content-center text-center mt-3">
            <h1>Welcome to Pizza Builder</h1>
            <Button
                className="mt-5"
                variant="secondary"
                size="lg"
                onClick={() => navigate('/build')}
            >
                Start a New Order
            </Button>
            <Button
                className="mt-5 ms-3"
                variant="secondary"
                size="lg"
                onClick={() => navigate('/check-order')}
            >
                Check Order Status
            </Button>
        </Container>
    );
}

export default HomePage;