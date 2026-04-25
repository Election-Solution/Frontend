# 🚨 WatchDog Alert - Frontend

**Polling Unit Incident & Logistics Triage Agent**

Welcome to the frontend repository for **WatchDog Alert**. This application serves as the public-facing portal for citizens to report election day incidents (missing materials, security threats, etc.) and the administrative triage dashboard for civil society organizations (CSOs) to monitor, categorize, and act on these reports in real-time.

---

## 🚀 Features

### Public Portal (Citizens)

- **Real-time Incident Reporting:** A fast, mobile-friendly form to report logistics and security issues.
- **Media Uploads:** Seamless upload of image/video evidence to support reports.
- **Live Heatmap:** An interactive public map showing verified incident zones (with sensitive data obfuscated for public safety).
- **Live Ticker:** Real-time statistics on resolved incidents to build public trust.

### Triage Dashboard (Admins/CSOs)

- **Kanban-style Triage Board:** Organize incoming alerts by status (New, Verifying, Dispatched, Resolved).
- **AI Categorization View:** Instantly view the AI-generated urgency and category of incoming reports.
- **Detailed Map & Dispatch:** Pinpoint exact polling units on a detailed map and trigger automated SMS/email alerts to relevant security or electoral officers.

---

## 🛠️ Tech Stack

This project is built with a modern, highly performant web stack:

- **Framework:** [Next.js](https://nextjs.org/) (React) - Chosen for Server-Side Rendering (SSR) to ensure fast load times on slow mobile networks.
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) - For rapid, responsive, and maintainable UI design.
- **Mapping:** [React-Leaflet](https://react-leaflet.js.org/) / [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/api/) - For rendering high-performance interactive heatmaps.
- **State Management:** [Zustand](https://github.com/pmndrs/zustand) (or React Context) - For lightweight, scalable frontend state management.

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/) (v18.x or higher recommended)
- npm, yarn, or pnpm

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-org/watchdog-alert-frontend.git](https://github.com/your-org/watchdog-alert-frontend.git)
   cd watchdog-alert-frontend
   ```

# Frontend
