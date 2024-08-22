## Authors
<h1>Yael Karat</h1>
<p>Email: yaelkara@edu.hac.ac.il</p>

<h1>Amit Lap</h1>
<p>Email: amitlap@edu.hac.ac.il</p>
<br>

### Project Description:

The project is an interactive pizza ordering system Frontend (in React) and Backend (in Spring).
It allows users to customize their pizzas by selecting ingredients, managing their cart, and proceeding to checkout.
The application features multiple pages for ordering, editing pizzas in the cart, checking order status, and finalizing orders.

### General Workflow:
1. **Home Page**:
    - The user can start an order or go to check the order status.

2. **Building Pizza and Customization**:
    - Users begin by selecting ingredients to customize their pizzas.
    - They can add multiple pizzas to their cart with different ingredient combinations.

3. **Cart Management**:
    - Users can view their current cart contents, modify pizzas (edit ingredients), or remove pizzas altogether.

4. **Checkout Process**:
    - They enter necessary information such as nane and address (contact details).

5. **Order Confirmation**:
    - After placing an order, user gets an order confirmation - including order code and order details.

6. **Order Status**:
    - After placing an order, users can check its status by entering a unique order code.
    - They receive detailed information about the ordered pizzas and total price.

## Technologies Used

### Frontend
The frontend of the project is a React-based web application designed to facilitate the custom ordering of pizzas. Users can build their pizzas by selecting ingredients, view their cart, and proceed to checkout. The frontend utilizes React hooks, context API, and React Router for state management, context sharing, and navigation, respectively. It communicates with the backend via API calls to manage orders, retrieve ingredient data, and handle order status inquiries.

### Backend
The backend of the project serves as the server-side logic implemented with Spring and REST API.
The ingredients images are located on the Backend.


## Installation

### Prerequisites

- Node.js and npm installed
- Java Development Kit (JDK) installed
- Maven installed

### Steps

1. **Clone the repository:**
    ```bash
    git clone https://github.com/amit-lap/pizza-ordering-web-app.git
    ```

2. **Navigate to the project directory:**
    ```bash
    cd pizza-ordering-web-app
    ```
3. **Install backend dependencies and run the Spring Boot application:**
    ```bash
    mvn spring-boot:run
    ```   

4. **Install frontend dependencies:**
    ```bash
    cd frontend
    npm install
    ```

5. **Start the frontend development server:**
    ```bash
    npm start
    ```