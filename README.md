<div align="center">

  <h1>🚀 CodeNPrep</h1>
  
  <p>
    <strong>Real-time Collaborative Interview Preparation Platform</strong>
  </p>

  <p>
    <a href="https://codenprep-1.onrender.com"><strong>Live Demo</strong></a>

  </p>

  <p>
    <img src="https://img.shields.io/badge/React-20232a?style=for-the-badge&logo=react&logoColor=61dafb" alt="React" />
    <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  </p>

</div>

---

## 📖 About

**CodeNPrep** is a seamless, real-time collaborative coding environment designed to simulate technical interviews. It bridges the gap between preparation and execution by combining a powerful code editor, video conferencing, and instant messaging into a single, unified interface.

Built for developers, by developers. Practice algorithms, debug together, and ace your next technical interview.

## ✨ Features

- **💻 Collaborative Code Editor**: Powered by **Monaco Editor**, offering a VS Code-like experience with syntax highlighting for multiple languages.
- **📹 Live Video & Audio**: Integrated **Stream SDK** for high-quality, low-latency video calls to simulate face-to-face interviews.
- **💬 Real-time Chat**: Instant messaging for quick communication and sharing resources during sessions.
- **🔐 Secure Authentication**: Robust user management and session handling verified by **Clerk**.
- **🎨 Modern UI/UX**: A polished, responsive interface built with **TailwindCSS** and **DaisyUI**.
- **⚡ Background Jobs**: Efficient handling of async tasks using **Inngest**.

## 🛠 Tech Stack

### Frontend
- **Framework**: React (Vite)
- **Styling**: TailwindCSS, DaisyUI
- **Editor**: Monaco Editor

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)

### Services
- **Auth**: Clerk
- **Real-time Media**: Stream.io
- **Deployment**: Render

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB connection string
- Clerk API Keys
- Stream API Keys

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/overratedengineer/codenprep.git
   cd codenprep
   ```

2. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   # Create .env file with VITE_CLERK_PUBLISHABLE_KEY, etc.
   npm run dev
   ```

3. **Setup Backend**
   ```bash
   cd backend
   npm install
   # Create .env file with PORT, MONGODB_URI, CLERK_SECRET_KEY, etc.
   npm run dev
   ```

## 🤝 Contributing

Contributions are welcome! Please verify your changes and open a pull request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
