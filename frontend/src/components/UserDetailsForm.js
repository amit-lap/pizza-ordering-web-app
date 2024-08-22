/**
 * UserDetailsForm Component
 *
 * This component renders a form for capturing user details like first name, last name,
 * address, and phone number. It includes validation for each input field and uses
 * cookies to persist user data across sessions.
 *
 * Props:
 * - onSubmit: Function to handle form submission and pass user data to the parent component.
 */

import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function UserDetailsForm({ onSubmit }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [street, setStreet] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [city, setCity] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const navigate = useNavigate();

    // Load saved user data from cookies on component mount
    useEffect(() => {
        const savedFirstName = Cookies.get('firstName');
        const savedLastName = Cookies.get('lastName');
        const savedStreet = Cookies.get('street');
        const savedHouseNumber = Cookies.get('houseNumber');
        const savedCity = Cookies.get('city');
        const savedPhoneNumber = Cookies.get('phoneNumber');

        if (savedFirstName) setFirstName(savedFirstName);
        if (savedLastName) setLastName(savedLastName);
        if (savedStreet) setStreet(savedStreet);
        if (savedHouseNumber) setHouseNumber(savedHouseNumber);
        if (savedCity) setCity(savedCity);
        if (savedPhoneNumber) setPhoneNumber(savedPhoneNumber);
    }, []);

    /**
     * Handle form submission
     *
     * @param {Event} e - Form submission event
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        const address = { street, houseNumber, city };
        const userData = { firstName, lastName, address, phoneNumber };

        // Call onSubmit function passed from parent component with user data
        onSubmit(userData);

        // Save user data to cookies for persistence
        Cookies.set('firstName', firstName);
        Cookies.set('lastName', lastName);
        Cookies.set('street', street);
        Cookies.set('houseNumber', houseNumber);
        Cookies.set('city', city);
        Cookies.set('phoneNumber', phoneNumber);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                    type="text"
                    value={firstName}
                    style={{ backgroundColor: 'transparent', color: 'white' }}
                    onChange={(e) => {
                        const value = e.target.value;
                        // Check if the input value matches the pattern
                        if (/^[A-Za-z\s]*$/.test(value)) {
                            setFirstName(value);
                        }
                    }}
                    required
                />
            </Form.Group>
            <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                    type="text"
                    value={lastName}
                    style={{ backgroundColor: 'transparent', color: 'white' }}
                    onChange={(e) => {
                        const value = e.target.value;
                        // Check if the input value matches the pattern
                        if (/^[A-Za-z\s]*$/.test(value)) {
                            setLastName(value);
                        }
                    }}
                    required
                />
            </Form.Group>
            <Form.Group controlId="street">
                <Form.Label>Street</Form.Label>
                <Form.Control
                    type="text"
                    value={street}
                    pattern="[A-Za-z\s]*" // Regular expression to match letters and spaces
                    style={{ backgroundColor: 'transparent', color: 'white' }}
                    onChange={(e) => {
                        const value = e.target.value;
                        // Check if the input value matches the pattern
                        if (/^[A-Za-z\s]*$/.test(value)) {
                            setStreet(value);
                        }
                    }}
                    required
                />
            </Form.Group>
            <Form.Group controlId="houseNumber">
                <Form.Label>House Number</Form.Label>
                <Form.Control
                    type="text" // Change to "text" to use pattern validation
                    value={houseNumber}
                    style={{ backgroundColor: 'transparent', color: 'white' }}
                    onChange={(e) => {
                        const value = e.target.value;
                        // Check if the input value matches the pattern
                        if (/^[1-9]*$/.test(value)) {
                            setHouseNumber(value);
                        }
                    }}
                    required
                />
            </Form.Group>
            <Form.Group controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                    type="text"
                    value={city}
                    style={{ backgroundColor: 'transparent', color: 'white' }}
                    onChange={(e) => {
                        const value = e.target.value;
                        // Check if the input value matches the pattern
                        if (/^[A-Za-z\s]*$/.test(value)) {
                            setCity(value);
                        }
                    }}
                    required
                />
            </Form.Group>
            <Form.Group controlId="phoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                    type="text"
                    value={phoneNumber}
                    style={{ backgroundColor: 'transparent', color: 'white' }}
                    pattern="\d{10}"
                    title="Phone number should be 10 digits"
                    onChange={(e) => {
                        const value = e.target.value;
                        // Check if the input value matches the pattern
                        if (/^[0-9]*$/.test(value)) {
                            setPhoneNumber(value);
                        }
                    }}
                    required
                />
            </Form.Group>
            <Button className="mt-3" variant="primary" style={{ margin: '10px' }} type="submit">
                Submit
            </Button>
            <Button className="mt-3" variant="secondary" style={{ margin: '10px' }} onClick={() => navigate('/cart')}>
                Back to cart
            </Button>
        </Form>
    );
}

export default UserDetailsForm;