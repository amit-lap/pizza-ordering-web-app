/**
 * PizzaBuilder Component
 *
 * Allows users to build a custom pizza by selecting ingredients. Users can add
 * ingredients, remove ingredients, view selected ingredients, and add the pizza
 * to the cart or proceed to the cart or homepage.
 */
import React, { useState } from 'react';
import { Button, Card, Container, Toast, ToastContainer, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';

function PizzaBuilder() {
    const { selectedPizza, setSelectedPizza, addToCart, ingredients } = useCart();
    const navigate = useNavigate();
    const [selectedIngredients, setSelectedIngredients] = useState(selectedPizza.ingredients || []);
    const [pizzaPrice, setPizzaPrice] = useState(selectedPizza.price || 10);

    // States for toast
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    /**
     * Handles adding an ingredient to the selected ingredients list and updates
     * the pizza price accordingly.
     *
     * @param {string} ingredient - The name of the ingredient to add.
     */
    const handleAddIngredient = (ingredient) => {
        setSelectedIngredients([...selectedIngredients, ingredient]);
        setPizzaPrice(pizzaPrice + 2);
    };

    /**
     * Handles removing an ingredient from the selected ingredients list and updates
     * the pizza price accordingly.
     *
     * @param {string} ingredient - The name of the ingredient to remove.
     */
    const handleRemoveIngredient = (ingredient) => {
        setSelectedIngredients(selectedIngredients.filter(item => item !== ingredient));
        setPizzaPrice(pizzaPrice - 2);
    };

    /**
     * Handles adding the current pizza (with selected ingredients) to the cart.
     * Shows a toast notification upon success or failure.
     */
    const handleAddToCart = () => {
        if (selectedIngredients.length >= 2) {
            addToCart({ ingredients: selectedIngredients, price: pizzaPrice });
            setSelectedIngredients([]);
            setPizzaPrice(10);
            setToastMessage('Pizza added to cart!');
        } else {
            setToastMessage('Please select at least 2 ingredients.');
        }
        setShowToast(true);
    };

    /**
     * Navigates to the cart page with the current selected pizza details.
     */
    const handleProceedToCart = () => {
        setSelectedPizza({ ingredients: selectedIngredients, price: pizzaPrice });
        navigate('/cart');
    };

    /**
     * Navigates back to the homepage.
     */
    const handleBackToHome = () => {
        setSelectedPizza({ ingredients: selectedIngredients, price: pizzaPrice });
        navigate('/');
    };

    return (
        <Container fluid className="mt-5 ps-3" style={{maxWidth: '950px', marginLeft: '70px'}}>
            <h2>Build Your Pizza</h2>
            <Row className="justify-content-start">
                {ingredients.map((ingredient, index) => (
                    <Col key={index} xs={6} sm={4} md={3} lg={2} className="mb-3 p-1">
                        <Card bg={"transparent".toLowerCase()} className="d-flex flex-column border-light h-100">
                            <Card.Img variant="top" src={ingredient.image} />
                            <Card.Body className="d-flex flex-column justify-content-between">
                                <div className="mt-auto" style={{ color: 'white' }}>
                                    <Card.Title>{ingredient.name}</Card.Title>
                                    <Card.Text className="mb-3">{2}$</Card.Text>
                                </div>
                                <Button
                                    variant="success"
                                    onClick={() => handleAddIngredient(ingredient.name)}
                                    disabled={selectedIngredients.includes(ingredient.name)}
                                >
                                    Add
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <div>
                <h3>Selected Ingredients:</h3>
                <ul>
                    {selectedIngredients.map((ingredient, index) => (
                        <li className="mt-3" key={index}>
                            {ingredient}
                            <Button style={{ marginLeft: '12px' }} variant="danger" onClick={() => handleRemoveIngredient(ingredient)}>Remove</Button>
                        </li>
                    ))}
                </ul>
            </div>
            <h5>Total Price: {pizzaPrice}$</h5>
            <Button onClick={handleAddToCart}>Add to Cart</Button>
            <Button style={{ margin: '10px' }} onClick={handleProceedToCart}>Go to Cart</Button>
            <Button variant={"secondary"} onClick={handleBackToHome}>Back to Home</Button>

            {/* Toast for notifications */}
            <ToastContainer position="top-end" className="p-3">
                <Toast show={showToast} onClose={() => setShowToast(false)} delay={5000} autohide>
                    <Toast.Body style={{ color: 'black', fontSize: 'large' }}>{toastMessage}</Toast.Body>
                </Toast>
            </ToastContainer>
        </Container>
    );
}

export default PizzaBuilder;