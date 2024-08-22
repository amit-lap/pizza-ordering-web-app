import React, { useState } from 'react';
import { useCart } from './CartContext';
import { Container, Card, ListGroup, Button, ToastContainer, Toast } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

/**
 * OrderConfirmation component displays the order details after a successful order placement.
 * It allows copying the order code to the clipboard and provides navigation options.
 */
const OrderConfirmation = () => {
    const { orderDetails } = useCart();
    const navigate = useNavigate();

    // States for toast
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    /**
     * Copies the order code to the clipboard and shows a toast notification.
     */
    const copyToClipboard = () => {
        navigator.clipboard.writeText(orderDetails.orderCode).then(() => {
            setToastMessage('Order code copied to clipboard!');
        });
        setShowToast(true);
    };

    /**
     * Renders the order details or a message if no order details are available.
     */
    if (!orderDetails) {
        return (
            <Container className="text-center">
                <h2>No order found</h2>
                <Button onClick={() => navigate('/')} variant="primary">Go Back to Home</Button>
            </Container>
        );
    }

    return (
        <Container style={{ marginLeft: '10px', width: '1200px' }} className="text-center">
            <h1 className="mt-3" style={{ fontSize: '50px' }}>Order Confirmation </h1>
            <Card bg={"Transparent".toLowerCase()} style={{ color: 'white' }} className="mt-4 border-light">
                <Card.Body>
                    <Card.Title style={{ fontSize: '30px', color: '' }}>
                        Order Code: {orderDetails.orderCode}
                        <Button
                            variant="success"
                            onClick={copyToClipboard}
                            style={{ marginLeft: '10px' }}
                        >
                            Copy Code
                        </Button>
                    </Card.Title>
                    <ListGroup variant="flush">
                        {orderDetails.pizzas.map((pizza, index) => (
                            <ListGroup.Item style={{ backgroundColor: 'transparent', color: 'white', fontSize: '25px' }} key={index}>
                                {`${pizza.name ? pizza.name : 'Pizza'} ${index + 1}: ${pizza.price}$`}
                            </ListGroup.Item>
                        ))}
                        <ListGroup.Item style={{ backgroundColor: 'transparent', color: 'white', fontSize: '35px' }}>Total Price: {orderDetails.totalPrice}$</ListGroup.Item>
                    </ListGroup>
                    <br />
                    <h2>User Details:</h2>
                    <h5>Name: {orderDetails.firstName} {orderDetails.lastName}</h5>
                    <h5>Address: {orderDetails.address?.street} {orderDetails.address?.houseNumber}, {orderDetails.address?.city}</h5>
                    <h5>Phone: {orderDetails.phoneNumber}</h5>
                </Card.Body>
            </Card>
            <Button onClick={() => navigate('/check-order')} variant="primary" style={{ margin: '10px' }} className="mt-3">Check Order Status</Button>
            <Button onClick={() => navigate('/')} variant="secondary" style={{ margin: '10px' }} className="mt-3">Home</Button>
            {/* Toast for notifications */}
            <ToastContainer position="top-end" className="p-3">
                <Toast show={showToast} onClose={() => setShowToast(false)} delay={5000} autohide>
                    <Toast.Body style={{ color: 'black', fontSize: 'large' }}>{toastMessage}</Toast.Body>
                </Toast>
            </ToastContainer>
        </Container>
    );
};

export default OrderConfirmation;