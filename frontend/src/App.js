import React from 'react';
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import PizzaBuilder from './components/PizzaBuilder';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderStatus from './components/OrderStatus';
import { CartProvider } from './components/CartContext';
import OrderConfirmation from './components/OrderConfirmation';

function App() {
    return (
        <Container
            fluid
            className="d-flex justify-content-center"
            style={{
                minHeight: '100vh',
                backgroundImage: `url(${process.env.PUBLIC_URL}/background-image.jpg)`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                color: 'white',
            }}
        >
            <CartProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/build" element={<PizzaBuilder />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/check-order" element={<OrderStatus />} />
                        <Route path="/order-confirmation" element={<OrderConfirmation />} />
                    </Routes>
                </Router>
            </CartProvider>
        </Container>
    );
}

export default App;