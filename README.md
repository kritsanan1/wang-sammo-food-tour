# Food Delivery Website Project

A comprehensive food delivery platform built with React, TypeScript, shadcn/ui, and Tailwind CSS. The platform allows users to browse restaurants, view menus, place orders, manage their accounts, and track order status.

## Project Status

*(คุณสามารถเพิ่มสถานะปัจจุบันของโปรเจกต์ได้ที่นี่ เช่น In Development, Beta, Live)*

## Table of Contents

* [Key Features](#key-features)
* [Technology Stack](#technology-stack)
* [Getting Started (Local Development)](#getting-started-local-development)
* [Project Structure Overview](#project-structure-overview)
* [Backend Information](#backend-information)
* [Deployment (Replit)](#deployment-replit)
* [Editing the Code](#editing-the-code)
* [Custom Domain](#custom-domain)

## Key Features

* **User Authentication:** Sign up/Login via Email/Password and Social Logins (Google, GitHub, etc.) using Supabase Auth.
* **Restaurant Discovery:** Browse restaurant listings with advanced search and filtering (cuisine, rating, price, delivery time).
* **Menu Browse:** View detailed restaurant menus with item descriptions, prices, and customization options.
* **Ordering:** Add items to cart, manage cart quantities, seamless checkout process.
* **Order Tracking:** Real-time (or near real-time) order status updates.
* **Account Management:** Manage user profile, saved addresses, and view order history.
* **Responsive Design:** Mobile-first design ensuring usability across all devices.

## Technology Stack

This project is built with:

* **Frontend Framework:** [React](https://react.dev/)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Routing:** [React Router DOM](https://reactrouter.com/)
* **Form Handling:** [React Hook Form](https://react-hook-form.com/) (primarily for Checkout)
* **State Management:** *[ระบุ Library ที่คุณเลือก เช่น Zustand หรือ Context API]*
* **Backend:** [Supabase](https://supabase.com/) (Authentication, Database, Edge Functions)

## Getting Started (Local Development)

To run this project locally:

1.  **Prerequisites:**
    * [Node.js](https://nodejs.org/) (LTS version recommended) with npm or yarn. Use [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) for easier management.
    * A Supabase project created.
    * Git installed.

2.  **Clone the Repository:**
    ```bash
    git clone <YOUR_GITHUB_REPOSITORY_URL>
    cd <YOUR_PROJECT_DIRECTORY_NAME>
    ```

3.  **Install Dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

4.  **Set Up Environment Variables:**
    * Create a `.env.local` file in the root of the project.
    * Add your Supabase credentials:
        ```
        VITE_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
        VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
        ```
    * *(Note: The `VITE_` prefix is required by Vite to expose variables to the frontend)*

5.  **Run the Development Server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    This will start the Vite development server, typically available at `http://localhost:5173`.

## Project Structure Overview

The `src/` directory is organized as follows:

* `components/`: Shared, reusable UI components (layout, common elements, shadcn/ui customizations).
* `pages/`: Top-level components representing application routes/pages.
* `features/`: (Optional) Modules containing components and logic specific to a feature (e.g., `auth`, `cart`, `restaurants`).
* `lib/`: Utility functions, helper modules (e.g., `supabaseClient.ts`).
* `hooks/`: Custom React hooks.
* `store/` or `contexts/`: Global state management setup.
* `assets/`: Static assets like images, fonts.
* `types/`: Shared TypeScript type definitions and interfaces.

## Backend Information

This project utilizes **Supabase** as its Backend as a Service (BaaS). Key Supabase features used include:

* **Supabase Auth:** Handles user sign-up, login (Email/Password, OAuth), and session management.
* **Supabase Database:** PostgreSQL database for storing application data (users, restaurants, menus, orders, addresses). **Row Level Security (RLS)** policies are implemented for data protection.
* **Supabase Edge Functions:** Used for backend logic that requires security or interacts with third-party services (e.g., sending confirmation emails via Resend, potentially processing payments).

## Deployment (Replit)

This application is configured for deployment on Replit. Follow these steps:

1.  **Import:** Import the project's GitHub repository into Replit.
2.  **Secrets:** Configure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (and `SUPABASE_ACCESS_TOKEN` if deploying Edge Functions) in the Replit Secrets tool.
3.  **`.replit` File:** Ensure the `.replit` file has the correct `build` command (`npm run build`) and `run` command (`npm install -g serve && serve -s dist -p $PORT`).
4.  **Install Dependencies:** Run `npm install` or `yarn install` in the Replit Shell.
5.  **Deploy Edge Functions (if any):** Use the Supabase CLI in the Replit Shell (`npx supabase functions deploy ...`) after logging in (`npx supabase login ...`).
6.  **Deploy Frontend:** Use the "Deployments" tab in Replit and choose "Static Deployment", configuring the Build Command and Publish Directory (`dist`).

*(Refer to the detailed step-by-step guide provided previously for more information on Replit deployment.)*

## Editing the Code

You can edit the application code using several methods:

**1. Use your preferred IDE (Local Development):**
* Follow the steps in the [Getting Started](#getting-started-local-development) section.
* Clone the repo, make changes locally, and push them back to GitHub. Changes pushed to the connected GitHub repo will reflect in Replit (if imported from GitHub).

**2. Edit directly in GitHub:**
* Navigate to the file on GitHub.
* Click the "Edit" (pencil) icon.
* Make changes and commit them.

**3. Use GitHub Codespaces:**
* From the repository page on GitHub, click "Code" -> "Codespaces" -> "New codespace".
* Edit within the web-based VS Code environment, then commit and push changes.

*(Note: If the project was originally created *using* Lovable.dev, you could also edit via prompts there, and changes would sync back to GitHub. However, this README assumes standard development practices after initial setup or if not using Lovable directly for ongoing edits.)*

## Custom Domain

You can connect a custom domain to your deployed application on Replit. This usually requires a paid Replit plan. Navigate to your deployment settings on Replit to find options for connecting a custom domain.

*(Consult Replit's documentation for specific steps on connecting custom domains.)*
