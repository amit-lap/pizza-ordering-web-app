import React, { useState } from 'react';
import { Button, Container, ListGroup, Modal, Image, Row, Col } from 'react-bootstrap';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';

/**
 * Represents the Cart component where users can view, edit, and proceed to checkout with their pizzas.
 */
function Cart() {
    const { cart, removeFromCart, updatePizzaInCart, ingredients } = useCart();
    const navigate = useNavigate();
    const [editingPizza, setEditingPizza] = useState(null);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [error, setError] = useState('');

    /**
     * Handles removing a pizza from the cart.
     * @param {number} index - Index of the pizza in the cart array.
     */
    const handleRemovePizza = (index) => {
        removeFromCart(index);
    };

    /**
     * Handles initiating the editing of a pizza's ingredients.
     * @param {number} index - Index of the pizza in the cart array.
     */
    const handleEditPizza = (index) => {
        setError('');
        setEditingPizza(index);
        setSelectedIngredients(cart[index].ingredients);
    };

    /**
     * Handles saving the edited pizza with selected ingredients.
     * Displays error if less than 2 ingredients are selected.
     */
    const handleSavePizza = () => {
        if (selectedIngredients.length >= 2) {
            const updatedPizza = {
                ...cart[editingPizza],
                ingredients: selectedIngredients,
                price: 10 + 2 * selectedIngredients.length
            };
            updatePizzaInCart(editingPizza, updatedPizza);
            setEditingPizza(null);
        } else {
            setError('Please select at least 2 ingredients.');
        }
    };

    /**
     * Handles adding an ingredient to the selected ingredients list.
     * Displays error if ingredient is already selected or only one ingredient is selected.
     * @param {object} ingredient - The ingredient object to add.
     */
    const handleAddIngredient = (ingredient) => {
        if (selectedIngredients.length === 1) {
            setError('');
        }
        if (!selectedIngredients.includes(ingredient.name)) {
            setSelectedIngredients([...selectedIngredients, ingredient.name]);
            setError('');
        } else {
            setError('This ingredient is already selected for this pizza.');
        }
    };

    /**
     * Handles removing an ingredient from the selected ingredients list.
     * @param {string} ingredient - The name of the ingredient to remove.
     */
    const handleRemoveIngredient = (ingredient) => {
        setSelectedIngredients(selectedIngredients.filter(item => item !== ingredient));
    };

    /**
     * Calculates the total price of all pizzas in the cart.
     * @returns {number} - Total price of all pizzas.
     */
    const getTotalPrice = () => {
        let totalPrice = 0;
        cart.forEach(pizza => {
            totalPrice += pizza.price;
        });
        return totalPrice;
    };

    /**
     * Navigates to the checkout page.
     */
    const handleProceedToCheckout = () => {
        navigate('/checkout');
    };

    /**
     * Navigates back to the pizza customization/ordering page.
     */
    const handleBackToOrder = () => {
        navigate('/build');
    };

    /**
     * Retrieves the image URL for a given ingredient.
     * @param {string} ingredientName - The name of the ingredient.
     * @returns {string} - The URL of the ingredient's image.
     */
    const getIngredientImage = (ingredientName) => {
        const ingredient = ingredients.find(ing => ing.name === ingredientName);
        return ingredient ? ingredient.image : '';
    };

    return (
        <Container className="mt-5">
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <>
                    <ListGroup style={{maxWidth:'700px'}}>
                        {cart.map((pizza, index) => (
                            <ListGroup.Item className="bg-transparent text-white" key={index}>
                                <Row>
                                    <Col xs={12} md={6}>
                                        <h5>Pizza {index + 1}</h5>
                                        <ul className="list-unstyled">
                                            {pizza.ingredients.map((ingredient, idx) => (
                                                <li key={idx}>
                                                    <Image src={getIngredientImage(ingredient)} rounded className="me-2" style={{ width: '25px', height: '25px' }} />
                                                    {ingredient}
                                                </li>
                                            ))}
                                        </ul>
                                    </Col>
                                    <Col xs={12} md={6} className="text-md-end">
                                        <p>Price: {pizza.price}$</p>
                                        <Button variant="danger" onClick={() => handleRemovePizza(index)}>Remove</Button>
                                        <Button variant="secondary" className="ms-2" onClick={() => handleEditPizza(index)}>Edit</Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    <br />
                    <h5>Total Order Price: {getTotalPrice()}$</h5>
                    <Button variant="primary" onClick={handleProceedToCheckout}>Proceed to Checkout</Button>
                </>
            )}
            <Button variant="secondary" style={{ margin: '10px' }} onClick={handleBackToOrder}>Back to Order</Button>

            {editingPizza !== null && (
                <Modal show={true} onHide={() => setEditingPizza(null)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Pizza</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h5>Selected Ingredients:</h5>
                        <ul className="list-unstyled">
                            {selectedIngredients.map((ingredient, index) => (
                                <li key={index} className="mt-3">
                                    <Image src={getIngredientImage(ingredient)} rounded className="me-2" style={{ width: '25px', height: '25px' }} />
                                    {ingredient}
                                    <Button size="sm" variant="danger" className="ms-2" onClick={() => handleRemoveIngredient(ingredient)}>Remove</Button>
                                </li>
                            ))}
                        </ul>
                        <h5>Add Ingredients:</h5>
                        <div className="d-flex flex-wrap">
                            {ingredients.map((ingredient, index) => (
                                <Button key={index} className="m-2" onClick={() => handleAddIngredient(ingredient)}>
                                    <Image src={ingredient.image} rounded className="me-2" style={{ width: '30px', height: '30px' }} />
                                    {ingredient.name}
                                </Button>
                            ))}
                        </div>
                    </Modal.Body>
                    {error && <div className="text-danger mt-2">{error}</div>}
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setEditingPizza(null)}>Cancel</Button>
                        <Button variant="primary" onClick={handleSavePizza}>Save</Button>
                    </Modal.Footer>
                </Modal>
            )}
        </Container>
    );
}

export default Cart;
