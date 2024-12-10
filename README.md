# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

# Product Selector - Decision Tree Application

This project is a web application built with Nuxt.js that guides users through a series of questions to help them find the right product based on their needs. It uses a decision tree model implemented in JSON to determine the flow of questions and the recommended products.

## Project Structure

The project has the following directory structure:

- `.nuxt/`: (Generated at build time) Contains the built Nuxt.js application.
- `.output/`: (Generated at build time) Contains the static files for deployment.
- `.vscode/`: VS Code settings and configurations (if you're using VS Code).
- `assets/`: Static assets like CSS, images, and the JSON data for the decision tree.
  - `css/`: CSS files (if not using Tailwind exclusively).
  - `icons/`: Icon files.
  - `json/`: `decision-tree.json` - the core data for the application.
- `components/`: Reusable Vue.js components.
- `node_modules/`: Project dependencies (managed by npm).
- `pages/`: Nuxt.js pages, which define the application routes.
  - `index.vue`: The main page component that handles the decision tree logic.
- `public/`: Files served directly from the root of the website.
- `scripts/`: Utility JavaScript files.
- `server/`: Server-side middleware (if needed).
- `utils/`: General-purpose utility functions.
- `.gitignore`: Specifies files and folders to be ignored by Git.
- `nuxt.config.ts`: Main Nuxt.js configuration file.
- `package-lock.json`: Records the exact versions of the installed dependencies.
- `package.json`: Project metadata, scripts, and dependencies.
- `README.md`: This file - describes the project.
- `tailwind.config.js`: Configuration for Tailwind CSS.
- `tsconfig.json`: Configuration for TypeScript.

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- npm (comes with Node.js) or yarn

### Installation

1. **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd <project-name>
    ```

2. **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

### Development

To start the development server:

```bash
npm run dev
# or
yarn dev

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
