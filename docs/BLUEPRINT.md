# Portfolio Website Blueprint

## 1. Project Overview & Identity
**Project Name**: Riky Dwianto Portfolio
**Author**: **RIKY DWIANTO**
**Roles**: Web Developer / Full Stack Dev / Mobile Developer / AI Enthusiast
**Goal**: Create a high-performance, visually stunning portfolio website using raw Node.js/Express ecosystem (No heavy frontend frameworks). The site will feature a public landing page showcasing projects and career history, and a secure admin panel for complete content management.

## 2. Technology Stack
*   **Runtime**: Node.js (LTS Version)
*   **Framework**: Express.js
*   **Database**: MySQL
*   **Templating Engine**: EJS (Server-Side Rendering)
*   **Styling**: Vanilla CSS3 (CSS Variables, Flexbox/Grid, Responsive Media Queries)
*   **Scripting**: Vanilla JavaScript (ES6+)
*   **Authentication**: Session-based (express-session)
*   **File Handling**: Multer (Local storage)

---

## 3. Comprehensive File Structure
```text
PORTOFOLIO/
├── .env                    # Environment variables
├── .gitignore              # Git ignore rules
├── app.js                  # Main application entry point
├── package.json            # Dependencies and scripts
├── config/
│   └── database.js         # MySQL connection pool configuration
├── database/
│   ├── migrations/         # SQL scripts for schema changes
│   │   ├── 001_initial_schema.sql
│   │   └── 002_add_indexes.sql
│   └── seeds/              # Initial data population
│       └── seed_data.sql   # Creates admin user & initial categories
├── middlewares/
│   ├── authMiddleware.js   # Checks if user is logged in
│   └── uploadMiddleware.js # Multer config for image/video uploads
├── controllers/
│   ├── admin/
│   │   ├── authController.js       # Admin Login/Logout
│   │   ├── dashboardController.js  # Main dashboard stats
│   │   ├── projectController.js    # CRUD Projects
│   │   ├── categoryController.js   # CRUD Categories
│   │   └── timelineController.js   # CRUD Career Timeline
│   └── public/
│       └── mainController.js       # Home, Project Details, Download CV
├── models/
│   ├── User.js             # Admin authentication queries
│   ├── Category.js         # Category management queries
│   ├── Project.js          # Project management queries
│   └── Timeline.js         # Career timeline queries
├── routes/
│   ├── adminRoutes.js      # Grouped admin routes (/admin/*)
│   └── publicRoutes.js     # Public facing routes (/*)
├── public/                 # Static Assets
│   ├── css/
│   │   ├── main.css        # Global styles & variables
│   │   ├── admin.css       # Admin panel specific styles
│   │   └── components/     # Broken down CSS (imported in main.css)
│   │       ├── buttons.css
│   │       ├── cards.css
│   │       ├── forms.css
│   │       └── timeline.css
│   ├── js/
│   │   ├── app.js          # Public interaction (filtering, animations)
│   │   └── admin.js        # Admin interactions (previews, deletes)
│   ├── uploads/            # Dynamic uploaded content
│   │   ├── projects/       # Project thumbnails/images
│   │   └── cv/             # Resume files
│   └── images/             # Static site assets (logo, favicon)
└── views/                  # EJS Templates
    ├── layouts/
    │   ├── main-layout.ejs # Public layout wrapper
    │   └── admin-layout.ejs # Admin layout wrapper
    ├── partials/
    │   ├── navbar.ejs
    │   ├── footer.ejs
    │   ├── admin-sidebar.ejs
    │   └── messages.ejs    # Flash message alerts
    ├── public/
    │   ├── index.ejs       # Landing page (Hero, Timeline, Projects)
    │   └── project-detail.ejs
    └── admin/
        ├── login.ejs
        ├── dashboard.ejs   # Summary stats
        ├── projects/
        │   ├── list.ejs
        │   └── form.ejs    # Add/Edit shared form
        ├── categories/
        │   ├── list.ejs
        │   └── form.ejs
        └── timeline/
            ├── list.ejs
            └── form.ejs
```

---

## 4. Database Schema Specification (MySQL)

### 4.1. Table: `users`
*Used for admin authentication.*
*   `id` INT PK AUTO_INCREMENT
*   `username` VARCHAR(50) NOT NULL UNIQUE
*   `password_hash` VARCHAR(255) NOT NULL
*   `full_name` VARCHAR(100) NOT NULL (Default: 'Riky Dwianto')
*   `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP

### 4.2. Table: `categories`
*Used to filter projects (e.g., Web App, Mobile App, AI).*
*   `id` INT PK AUTO_INCREMENT
*   `name` VARCHAR(50) NOT NULL
*   `slug` VARCHAR(60) NOT NULL UNIQUE (URL friendly)
*   `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP

### 4.3. Table: `projects`
*The core portfolio items.*
*   `id` INT PK AUTO_INCREMENT
*   `category_id` INT FK -> `categories.id` (ON DELETE SET NULL)
*   `title` VARCHAR(150) NOT NULL
*   `slug` VARCHAR(160) NOT NULL UNIQUE
*   `description` TEXT NOT NULL (Supports Markdown/HTML)
*   `excerpt` VARCHAR(255) (Short summary for cards)
*   `thumbnail` VARCHAR(255) NOT NULL (Path to image)
*   `media_type` ENUM('image', 'video', 'web_link', 'pdf') DEFAULT 'web_link'
*   `media_url` VARCHAR(255) (Link to YouTube, Website, or File path)
*   `tech_stack` VARCHAR(255) (Comma separated tags, e.g., "Node.js, Express, MySQL")
*   `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
*   `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

### 4.4. Table: `timeline`
*Displays the career journey.*
*   `id` INT PK AUTO_INCREMENT
*   `year_range` VARCHAR(50) NOT NULL (e.g., "2023 - Present")
*   `title` VARCHAR(100) NOT NULL (Role/Degree)
*   `subtitle` VARCHAR(100) NOT NULL (Company/University)
*   `description` TEXT (List of achievements)
*   `type` ENUM('experience', 'education', 'certification') DEFAULT 'experience'
*   `order_index` INT DEFAULT 0 (For custom sorting)

---

## 5. Routes & API Structure

### 5.1. Public Routes
| Method | Path | Controller | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | `publicController.index` | Renders Landing Page (Hero, Timeline, Filterable Project Grid) |
| `GET` | `/project/:slug` | `publicController.detail` | Renders Single Project Detail View |
| `GET` | `/cv/download` | `publicController.downloadCV` | Downloads the latest uploaded CV |

### 5.2. Admin Routes (Protected '/admin')
| Method | Path | Controller | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/login` | `authController.loginForm` | Admin Login Page |
| `POST` | `/login` | `authController.login` | Process Login |
| `GET` | `/logout` | `authController.logout` | Destroy Session |
| `GET` | `/dashboard` | `dashboardController.index` | Stats Overview |
| **Projects** | | | |
| `GET` | `/projects` | `projectController.list` | List all projects |
| `GET` | `/projects/create` | `projectController.createForm` | Show Create Form |
| `POST` | `/projects` | `projectController.store` | Save New Project (Handle Uploads) |
| `GET` | `/projects/:id/edit` | `projectController.editForm` | Show Edit Form |
| `PUT` | `/projects/:id` | `projectController.update` | Update Project |
| `DELETE` | `/projects/:id` | `projectController.delete` | Delete Project & File |
| **Timeline** | | | |
| `GET` | `/timeline` | `timelineController.list` | List Timeline entries |
| `POST` | `/timeline` | `timelineController.store` | Save Entry |
| `PUT` | `/timeline/:id` | `timelineController.update` | Update Entry |
| `DELETE` | `/timeline/:id` | `timelineController.delete` | Delete Entry |
| **Categories** | | | |
| `GET` | `/categories` | `categoryController.list` | Manage Categories |
| `POST` | `/categories` | `categoryController.store` | Create Category |
| `DELETE` | `/categories/:id` | `categoryController.delete` | Delete Category |

---

## 6. Functional & Design Specifications

### 6.1. UI/UX Design (Visuals)
*   **Theme**: ultra-Modern Flat Design (No Borders, No Shadows). Clean, Minimalist, Airy.
*   **Colors** (Bright & Vivid):
    *   **Primary**: `#2563EB` (Bright Royal Blue) - Action buttons, links.
    *   **Secondary**: `#F59E0B` (Vivid Amber) - Highlights, badges.
    *   **Background**: `#FFFFFF` (Pure White) and `#F3F4F6` (Light Gray) for sections.
    *   **Text**: `#111827` (Near Black) for headings, `#4B5563` (Cool Gray) for body.
    *   **Accents**: `#10B981` (Emerald Green) for success/growth indicators.
*   **Typography**: 'Outfit' or 'Plus Jakarta Sans' (Geometric Sans-Serif). Large headings, generous whitespace.
*   **Components**:
    *   **Cards**: Flat color blocks, no outlines, clicking entire area.
    *   **Inputs**: Gray backgrounds (`#F3F4F6`), no border, focus state underlines or subtle color shift.
    *   **Buttons**: Solid bright colors, rectangular with slight border-radius (4px) or pill-shaped, flat interaction (no 3D press effect).

### 6.2. Public Landing Page Modules
1.  **Hero Section**:
    *   Large Heading: "Hi, I'm Riky Dwianto".
    *   Subheading: Typewriter effect "Web Developer | Mobile Dev | AI Enthusiast".
    *   Social Links: GitHub, LinkedIn icons.
    *   CTA: "View My Work" (scrolls to portfolio).
2.  **About & Timeline**:
    *   Side-by-side layout or stacked on mobile.
    *   Timeline vertical line with dots. Hovering a timeline item highlights it.
3.  **Portfolio Grid**:
    *   **Filter Tabs**: "All", "Web", "Mobile", "AI". Javascript filters the DOM elements purely (no reload).
    *   **Cards**: Image thumbnail, title, hover effect showing "View Detail".
    *   **Animations**: Fade-in on scroll using `IntersectionObserver`.

### 6.3. Admin Panel Features
*   **Secure Access**: Access denied without session.
*   **Flash Messages**: Green for success, Red for errors (using `connect-flash`).
*   **WYSIWYG Editor**: Use a simple lightweight texture editor or just a growing textarea for descriptions.
*   **Image Preview**: When uploading a file, show a preview before submitting.

---

## 7. Migration Plan

### Step 1: Environment Setup
1.  Install packages: `npm install express mysql2 ejs dotenv bcryptjs express-session connect-flash multer method-override`.
2.  Install dev tools: `npm install --save-dev nodemon`.

### Step 2: Database Initialization
1.  Create database `portfolio_db`.
2.  Run `database/migrations/001_initial_schema.sql` to create tables.
3.  Run `database/seeds/seed_data.sql` to insert the Admin User (User: `admin`, Pass: `admin123` - hashed) and default categories.

### Step 3: Backend Core
1.  Setup `app.js` with middlewares.
2.  Create `config/database.js`.
3.  Implement `authMiddleware.js`.

### Step 4: Admin Implementation
1.  Build Login Flow.
2.  Build Admin Dashboard Layout.
3.  Implement CRUD Controllers for Categories, Timeline, Projects.

### Step 5: Public Interface Implementation
1.  Create `index.ejs` with hardcoded HTML first to nail the design.
2.  Connect `publicController` to fetch active data from DB.
3.  Implement Category Filtering logic in `public/js/app.js`.

### Step 6: Polish
1.  Add SEO Meta tags.
2.  Optimize Image loading.
3.  Final Security Check (SQL Injection checks, XSS escaping).
