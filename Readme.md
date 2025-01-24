# Menu Management Backend

This project is a scalable Node.js backend for managing a menu system with categories, subcategories, and items. Built with **Express.js** and **MongoDB**, it focuses on scalability, maintainability, and adherence to SOLID and DRY principles. The API is documented with **Swagger** for easy testing and understanding.

---

## Features

1. **Category Management**:
   - Create, update, and fetch categories.
   - Categories include tax applicability and tax details.

2. **SubCategory Management**:
   - Create, update, and fetch subcategories under a category.
   - Inherits tax details from the category by default.

3. **Item Management**:
   - Create, update, and fetch items under a category or subcategory.
   - Calculates total amount based on base amount, discount, and tax.

4. **Search Functionality**:
   - Search items by name.

5. **Scalable Design**:
   - Uses service and repository layers to separate concerns.
   - Adheres to software design principles for long-term maintainability.

---

## Technology Stack

- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for flexible data modeling.
- **Mongoose**: ODM library for MongoDB.
- **Winston**: Logging library for centralized logging.
- **Swagger**: Interactive API documentation.

---

## Software Design Patterns Used

### **1. MVC Pattern**
The application uses the **Model-View-Controller (MVC)** pattern for separation of concerns:
- **Models**: Define data schema using Mongoose.
- **Controllers**: Handle HTTP requests and responses.
- **Services**: Contain business logic, ensuring reusability and modularity.
- **Repositories**: Encapsulate database queries, following the **Repository Pattern**.

### **2. Repository Pattern**
- The repository layer abstracts database operations, making the application more flexible and testable. 
- Changes to the database technology won't affect other parts of the system.

### **3. SOLID Principles**
- **S**ingle Responsibility: Each module (controller, service, repository) has a clear and focused responsibility.
- **O**pen/Closed: The system can be extended without modifying existing code (e.g., adding new endpoints).
- **L**iskov Substitution: Interfaces (services) can be replaced with other implementations without altering functionality.
- **I**nterface Segregation: Each module depends only on what it needs.
- **D**ependency Inversion: High-level modules depend on abstractions (services), not on low-level modules (repositories).

### **4. DRY Principle**
- Utility functions (e.g., error handling, logging) prevent code duplication.

---

## Installation and Setup

### Prerequisites
- Node.js (>= 14.x)
- MongoDB (local or cloud instance)

### Steps
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd menu-management-backend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Set up environment variables:
    - Create a `.env` file in the root directory.
    - Add the following environment variables:
        ```env
        PORT=3000
        MONGODB_URI=mongodb://localhost:27017/menu-management
        ```
4. Start the server:
    ```bash
    npm start
    ```
5. The server will start at `http://localhost:3000`.

---

## Swagger API Documentation

The Swagger documentation is automatically available when you start the server. You can access it at: `http://localhost:3000/api-docs`

Each endpoint adheres to RESTful principles and returns proper status codes and error messages for efficient debugging and usage.