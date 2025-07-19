🚀 Full-Stack Portfolio Deployment on AWS EC2 (Amazon Linux)
This project showcases a full-stack developer portfolio deployed on an Amazon Linux 2023 EC2 instance, built from the ground up with a modern, production-ready architecture.

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/Server101/Portfolio-Website)
[![Hosted on AWS](https://img.shields.io/badge/hosted%20on-AWS-232F3E?logo=amazon-aws&logoColor=white)](https://aws.amazon.com/ec2/)
[![React Frontend](https://img.shields.io/badge/frontend-React-blue?logo=react)](https://reactjs.org/)
[![Node.js Backend](https://img.shields.io/badge/backend-Node.js-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/database-PostgreSQL-336791?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

________________________________________
--------------------------------------------------------------------------------------------------------------------


---

## 🧱 Tech Stack

**Frontend**: React.js  
**Backend**: Node.js + Express  
**Database**: PostgreSQL 15  
**Hosting**: AWS EC2 (Amazon Linux 2023)

---

## 🔧 Manual Configuration Summary

- EC2 instance provisioned and secured
- SSH access configured via `.pem` key
- Node.js, Git, and PostgreSQL installed from source
- PostgreSQL initialized and secured
- React app built and ready for deployment
- Node backend prepared to serve API requests

---




🧱 Tech Stack
🌐 Frontend
•	React.js – Built with create-react-app for a responsive, component-based UI
•	Optional: Tailwind CSS or CSS Modules for styling
•	Built with npm run build for optimized static delivery
🧠 Backend
•	Node.js + Express.js – REST API to serve dynamic project data and backend logic
•	Managed via PM2 (optional) for production process management
🗄 Database
•	PostgreSQL 15 – Installed and initialized manually
•	Custom database and user created for secure access
•	Local-only access using psql and Linux service management
☁️ Deployment
•	AWS EC2 (Amazon Linux 2023) – Lightweight and optimized Linux server instance
•	Accessed via SSH from Git Bash or WSL with secure .pem key authentication
•	Configured using sudo, dnf, and Linux filesystem tools
What Was Set Up Manually
•	✅ EC2 instance launched, security group created with SSH, HTTP, and port 3001 open
•	✅ Connected via SSH, updated system, installed Node.js and Git
•	✅ PostgreSQL 15 manually installed, initialized, and started using native commands
•	✅ Database and user created, ready for backend integration
•	✅ React frontend built and ready to serve, backend API ready for connection
•	✅ Working inside Linux terminal to build, test, and deploy a real application server
________________________________________
📁 Structure
graphql
CopyEdit
├── frontend/        # React app with static build files
├── backend/         # Node.js/Express server with REST API
└── PostgreSQL       # Local DB accessed via psql shell
________________________________________
🔒 Security & Best Practices
•	SSH access restricted to developer IP only
•	PostgreSQL currently uses "trust" for dev; ready for upgrade to "md5" auth
•	Backend exposed only on known ports (e.g., 3001)
•	Systemd used for service management (systemctl)
•	Future-ready for domain, SSL (Let's Encrypt), and NGINX reverse proxy setup










