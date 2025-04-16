This project is a web-based data ingestion application that facilitates bidirectional data flow between a ClickHouse database and Flat File (CSV) storage. It supports:

Secure JWT token-based authentication for ClickHouse

Selection of specific columns for ingestion

Multi-table JOIN queries on ClickHouse source

Data preview before ingestion

Progress reporting during ingestion

Robust error handling and user-friendly status updates

Features
Bidirectional Data Flow:

ClickHouse → Flat File

Flat File → ClickHouse

Authentication: JWT token-based authentication for ClickHouse connections.

Schema Discovery: Fetch tables and columns dynamically from ClickHouse or Flat File.

Multi-Table Join Support: Select multiple ClickHouse tables and define JOIN conditions.

Data Preview: Preview first 100 rows before ingestion.

Progress Tracking: Visual progress bar and status messages during ingestion.

Error Handling: Informative messages for connection, authentication, and ingestion errors.

Technology Stack
Layer Technology/Library
Backend Python, FastAPI
ClickHouse Client clickhouse-driver
Frontend React.js, Axios
Data Processing Pandas
Authentication python-jose (JWT handling)
Containerization Docker, Docker Compose
Prerequisites
Docker and Docker Compose (for containerized deployment)

Python 3.9+ (for backend development)

Node.js 16+ and npm 8+ (for frontend development)

ClickHouse instance (local or cloud)

Setup and Installation

1. Clone the Repository
   bash
   git clone https://github.com/yourusername/data-ingestion-app.git
   cd data-ingestion-app
2. Backend Setup
   bash
   cd backend
   python -m venv venv
   source venv/bin/activate # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
3. Frontend Setup
   bash
   cd ../frontend
   npm install
   Configuration
   Environment Variables
   Create a .env file in the backend/ directory with the following variables:

text
CLICKHOUSE_HOST=localhost
CLICKHOUSE_PORT=8123
CLICKHOUSE_USER=default
JWT_SECRET=your_jwt_secret_key
FILE_UPLOAD_DIR=./uploads
Replace values as per your environment.

JWT_SECRET is used to sign and validate JWT tokens.

ClickHouse Setup
You can run a local ClickHouse instance using Docker:

bash
docker run -d -p 8123:8123 -p 9000:9000 --name clickhouse-server clickhouse/clickhouse-server:latest
Load example datasets for testing:

bash
docker exec -it clickhouse-server clickhouse-client --query "
CREATE DATABASE IF NOT EXISTS default;
-- Load uk_price_paid and ontime datasets as per ClickHouse docs
"
Running the Application
Development Mode
Run backend (with auto reload):

bash
cd backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
Run frontend:

bash
cd ../frontend
npm start
Access frontend at: http://localhost:3000

Production Mode (Docker Compose)
bash
docker-compose up --build
This will start backend, frontend, and ClickHouse containers.

API Endpoints (Summary)
Endpoint Method Description
/tables GET Fetch list of tables in ClickHouse database
/join-query POST Construct JOIN SQL query from tables & conditions
/columns POST Fetch columns from a query or table
/preview POST Preview first 100 rows of a query
/clickhouse/export POST Export data from ClickHouse to flat file
/file-to-clickhouse POST Import data from flat file to ClickHouse
/start-ingestion POST Start ingestion job with progress tracking
/progress/{job_id} GET Get ingestion progress status
Testing
Backend Tests
Use pytest for unit and integration tests.

Run tests:

bash
cd backend
pytest tests/ --maxfail=1 --disable-warnings -q
Frontend Tests
Use React Testing Library / Jest.

Run tests:

bash
cd frontend
npm test
Test Cases Covered
Single table export (ClickHouse → Flat File)

Flat File upload → ClickHouse ingestion

Multi-table JOIN export

Connection and authentication failure handling

Data preview functionality

Project Structure
text
data-ingestion-app/
├── backend/
│ ├── app/ # Backend source code (FastAPI)
│ ├── tests/ # Backend tests (pytest)
│ ├── requirements.txt # Python dependencies
│ ├── Dockerfile # Backend Dockerfile
│ └── .env # Environment variables (not committed)
│
├── frontend/
│ ├── public/ # Static assets and index.html
│ ├── src/ # React source code
│ ├── package.json # Frontend dependencies
│ └── Dockerfile # Frontend Dockerfile
│
├── docker-compose.yml # Multi-container orchestration
└── README.md # This documentation
Helpful Notes
JWT Tokens: Ensure tokens are securely generated and passed in Authorization headers as Bearer <token>.

Large Datasets: Use batching and streaming to handle large data efficiently.

Schema Mismatches: Validate and map data types between ClickHouse and CSV carefully.

Error Handling: Backend returns clear error messages; frontend displays user-friendly notifications.

Progress Reporting: Use polling or WebSocket for real-time ingestion progress updates.

Security: Use HTTPS in production and secure storage for JWT secrets.

License
This project is licensed under the MIT License. See the LICENSE file for details.
