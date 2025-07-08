# 👩‍💼 Employee360 – Complete Workforce Management System

**Employee360** is a full-featured Employee Management System built with the **MERN stack**. Designed to streamline HR operations, it enables admins and employees to manage departments, leaves, salaries, projects, and more through a clean, role-based dashboard.

---

## 🚀 Features

- 🔐 **Role-Based Authentication** – Secure login system for admins and employees
- 👥 **Employee Management** – Add, edit, view, and delete employees with ease
- 🏢 **Department Control** – Manage multiple departments and assign employees
- 📝 **Leave Management** – Apply for and approve leaves with real-time status
- 💰 **Salary Module** – Track and view employee salary records
- 📁 **Project Assignment** – Admins assign and track employee projects; employees mark them completed
- 📂 **Modular Codebase** – Clean folder structure for scalability
- ⚡ **Responsive UI** – Built with React and Tailwind for fast and modern UX

---

## 🛠️ Tech Stack

| Frontend              | Backend            | Database | Other Tools          |
|-----------------------|--------------------|----------|----------------------|
| React + Vite          | Node.js + Express  | MongoDB  | JWT, Axios, Tailwind |
| React Router DOM      | Mongoose           |          | dotenv, bcryptjs     |
| Context API           | Custom Middleware  |          |                      |

---

## 📁 Project Structure

```bash
employee360/
├── Server/
│ ├── controllers/       # Business logic
│ ├── db/                # MongoDB connection
│ ├── middleware/        # Auth middleware
│ ├── models/            # Mongoose schemas (User, Employee, Department, Leave, Project)
│ ├── public/            # Static files 
│ ├── routes/            # API endpoints
│ ├── userSeed.js        # Dummy data seeder
│ ├── .env               # Environment variables
│ └── index.js           # Entry point for server
│
├── frontend/
│ ├── src/
│ │ ├── components/      # Reusable UI components 
│ │ ├── context/         # Auth and global state
│ │ ├── pages/           # Route-level pages
│ │ ├── utils/           # Helper functions
│ │ ├── App.jsx          # App routes
│ │ ├── index.css        # Styles
│ │ └── main.jsx         # Entry point
│ ├── public/            # Static assets
│ ├── vite.config.js     # Vite config
│ └── package.json       # Frontend dependencies
│
└── README.md
```


## ⚙️ Getting Started

### 1️⃣ Clone the Repo

```bash
git clone https://github.com/Sparsh11Ranjan/employee360.git
cd employee360
```
### 2️⃣ Setup the Backend

```
cd Server
npm install

* Create a .env file:
PORT=5000
MONGODB_URL=mongodb://localhost:27017/ems
JWT_KEY=WhyamisounluckyineverythingTodayistheworstdayofmylife

* Check the backend server:
node index.js
```
### 3️⃣ Setup the Frontend
```
cd Frontend
npm install
npm run dev
Frontend will start on: http://localhost:5173
Backend runs on: http://localhost:5000
```


---

## 🔐 User Roles

**Admin**

- Can add, edit, view employees
- Can add or delete departments
- Assign projects to employees
- Grant leaves
- Add Salary
- Change Password

**Employee**

- View Profile
- Add Leave requests
- View assigned Projects and mark them as completed
- Salary records
- Change Password
---

## 📈 Future Enhancements

- 📧 Email notifications for leave/project status
- 📊 Admin analytics dashboard (graphs/charts)
- 📱 Full mobile responsiveness
- 📤 File attachments with projects or leave requests

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👩‍💻 Author

Developed with ❤️ by **Sparsh Ranjan**  
📫 Connect with me on [LinkedIn](https://www.linkedin.com/in/sparsh-ranjan-b57514289?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app)

---

