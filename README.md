# 🏍️ MotoClub Web Forum

MotoClub is a high-octane, single-column web forum designed for motorcycle enthusiasts. It features a modern "social feed" experience where riders can share their builds, discuss gear, and join an exclusive membership community.

## Features

- **One-Column Feed:** A mobile-first, scrollable interface inspired by modern social media.
- **Rider Profiles:** Custom profiles showcasing the user's name, motorcycle, and posting history.
- **Membership System:** A gated community feature requiring a secret passcode to unlock "Member" status.
- **Role-Based Access:** Support for **User**, **Member**, and **Admin** roles with specific permissions (e.g., Admins can moderate/delete any post).
- **Secure Sessions:** Persistent login sessions using PostgreSQL storage via `connect-pg-simple`.
- **Interactive UI:** Built with **Alpine.js** for smooth, no-reload interactions like expanding posts and modal management.

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Authentication:** Passport.js & Express-Session
- **Frontend:** EJS (Templating), Tailwind CSS (Styling), Alpine.js (Interactivity)

---

## Setup & Installation

### 1. Clone the Repository

```bash
git clone [https://github.com/yourusername/members-only-project.git](https://github.com/yourusername/members-only-project.git)
cd members-only-project
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a .env file in the root directory and fill in your credentials:

```env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/motoclub
SESSION_TABLE_NAME=session
COOKIE_SECRET=your_random_long_string_here
MEMBERSHIP_SECRET=top_secret_rider_code
ADMIN_SECRET_CODE=secret_admin_invite_key
```

### 4. Initialize the Database

This project includes a built-in script to set up your PostgreSQL tables (Users, Posts, and Sessions).

```bash
npm run initDb
```

## Roadmap & Current Status

Please note that MotoClub is an active project. While the core forum and membership logic are fully functional, the following features are currently in production and not yet implemented:

- **Image Uploads**: Direct photo sharing for bike builds and gear.
- **Upvote System**: Community-driven content ranking.
- **Comments/Threads**: Deep-level discussions on individual posts.
