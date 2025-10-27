# Product Manager Application

A full-stack application for managing products with a React frontend and Spring Boot backend connected to PostgreSQL database.

## 🚀 Features

- View all products
- Create new products
- RESTful API
- Responsive UI with Tailwind CSS
- PostgreSQL database persistence

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **Java JDK** (17 or higher) - [Download](https://www.oracle.com/java/technologies/downloads/)
- **Maven** (3.6 or higher) - [Download](https://maven.apache.org/download.cgi)
- **PostgreSQL** (12 or higher) - [Download](https://www.postgresql.org/download/)
- **Git** - [Download](https://git-scm.com/downloads)

## 📁 Project Structure

```
product-manager-app/
│
├── product-manager-backend/            # Spring Boot backend service (Dockerized)
│   ├── src/
│   │   └── main/
│   │       ├── java/com/example/productmanager/
│   │       │   ├── ProductManagerApplication.java
│   │       │   ├── controller/
│   │       │   │   └── ProductController.java
│   │       │   ├── model/
│   │       │   │   └── Product.java
│   │       │   └── repository/
│   │       │       └── ProductRepository.java
│   │       └── resources/
│   │           ├── application.properties
│   │           └── application-docker.properties
│   ├── pom.xml
│   ├── Dockerfile
│   └── docker-compose.yml              # Docker for backend + PostgreSQL
│
└── product-manager-frontend/           # React frontend (run locally with npm)
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    └── package.json

```

## 🗄️ Database Setup

### 1. Install PostgreSQL

Download and install PostgreSQL from the official website.


## 🔧 Backend Setup (Spring Boot)

### 1. Navigate to Backend Directory

```bash
cd backend
```

### 2. Configure Database Connection

Edit `src/main/resources/application-docker.properties`:

```properties
spring.datasource.url=jdbc:postgresql://db:5432/productdb_docker
spring.datasource.username=postgres
spring.datasource.password=password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

server.port=8080

spring.web.cors.allowed-origins=http://localhost:3000
spring.web.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
spring.web.cors.allowed-headers=*
```

**⚠️ Important:** Replace `your_password_here` with your actual PostgreSQL password.

### 3. Run the Application

```bash
docker compose up --build
```

The backend will start on `http://localhost:8080`

### 5. Verify Backend is Running

Open your browser and navigate to:
```
http://localhost:8080/api/products
```

You should see an empty array `[]` (no products yet).

## 💻 Frontend Setup (React)

### 1. Navigate to Frontend Directory

```bash
cd frontend
```

### 2. Install Dependencies

```bash
npm install
```

This will install:
- React dependencies
- lucide-react (for icons)

### 3. Configure Tailwind CSS (CDN Method)

Update `public/index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="Product Manager App" />
    <title>Product Manager</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
```

### 4. Run the Application

```bash
npm start
```

The frontend will start on `http://localhost:3000`

## 🎯 Usage

1. **Start the Backend**: Make sure the Spring Boot application is running on port 8080
2. **Start the Frontend**: Make sure the React application is running on port 3000
3. **Open Browser**: Navigate to `http://localhost:3000`
4. **Add Products**: Enter a product name and click "Add Product"
5. **View Products**: All products will be displayed in the list below

## 🔌 API Endpoints

### Get All Products
```
GET http://localhost:8080/api/products
```

Response:
```json
[
  {
    "id": 1,
    "name": "Product Name"
  }
]
```

### Create Product
```
POST http://localhost:8080/api/products
Content-Type: application/json

{
  "name": "New Product"
}
```

Response:
```json
{
  "id": 2,
  "name": "New Product"
}
```

## 🐛 Troubleshooting

### Backend Issues

**Problem:** `Connection refused` error
- **Solution:** Make sure PostgreSQL is running and the credentials in `application.properties` are correct

**Problem:** `Port 8080 already in use`
- **Solution:** Change the port in `application.properties`: `server.port=8081`

**Problem:** `Failed to load ApplicationContext`
- **Solution:** Verify Java 17+ is installed: `java -version`

### Frontend Issues

**Problem:** `Failed to load products` error
- **Solution:** Make sure the backend is running on `http://localhost:8080`

**Problem:** CORS error
- **Solution:** The backend has CORS configured. If issues persist, check `ProductController.java` has `@CrossOrigin(origins = "http://localhost:3000")`

**Problem:** Tailwind styles not working
- **Solution:** Verify the Tailwind CDN script is in `public/index.html`

### Database Issues

**Problem:** `relation "products" does not exist`
- **Solution:** Set `spring.jpa.hibernate.ddl-auto=update` in `application.properties` (should create table automatically)

**Problem:** Can't connect to database
- **Solution:** Verify PostgreSQL is running: 
  - Windows: Check Services
  - Mac: `brew services list`
  - Linux: `sudo systemctl status postgresql`

## 📝 Development Notes

- The database table `products` will be created automatically on first run
- Spring Boot uses JPA/Hibernate for ORM
- React state management uses hooks (useState, useEffect)
- CORS is configured to allow requests from localhost:3000

## 🚀 Building for Production

### Backend
```bash
cd backend
mvn clean package
java -jar target/product-manager-0.0.1-SNAPSHOT.jar
```

### Frontend
```bash
cd frontend
npm run build
```

The build folder will contain the production-ready static files.

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Tailwind CSS
- Lucide React (icons)
- Fetch API

**Backend:**
- Spring Boot 3.2.0
- Spring Data JPA
- PostgreSQL Driver
- Maven

**Database:**
- PostgreSQL 12+

## 📄 License

This project is open source and available under the MIT License.

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Happy Coding! 🎉**
