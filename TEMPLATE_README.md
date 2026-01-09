# Project Template Usage Guide

This repository is designed to be used as a template for new Nuxt.js projects. Follow these steps to set up a new project based on this template.

## Prerequisites

- Node.js (Latest LTS version recommended) -> check `package.json` for engine requirements if any.
- npm or pnpm or yarn

## Getting Started

### 1. Clone the Template

Clone this repository into a new directory for your project:

```bash
git clone <repository-url> my-new-project
cd my-new-project
```

### 2. Clean Up

Remove the existing git history to start fresh:

```bash
rm -rf .git
```

Initialize a new git repository:

```bash
git init
```

### 3. Environment Setup

Copy the example environment file:

```bash
cp .env.example .env
```

Update `.env` with your specific configuration values (e.g., API URL).

### 4. Install Dependencies

Install the project dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 5. Run Development Server

Start the development server:

```bash
npm run dev
```

The application should be running at `http://localhost:3000` (or the port specified in your terminal).

## Project Structure

- `components/`: Vue components.
- `pages/`: Application pages/routes.
- `layouts/`: Page layouts.
- `store/`: Pinia stores.
- `composables/`: Auto-imported Vue composables.
- `server/`: Server-side logic (if any).
- `assets/`: Static assets (CSS, images).
- `public/`: Publicly served files.

## Customization

- **Project Name**: Update `name` in `package.json`.
- **Nuxt Config**: Modify `nuxt.config.ts` for modules and build settings.
- **Tailwind**: Update `tailwind.config.js` for custom themes.

## License

[Insert License Information Here]
