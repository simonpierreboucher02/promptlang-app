# PromptLang 

[![GitHub](https://img.shields.io/badge/GitHub-simonpierreboucher02-blue?style=flat-square&logo=github)](https://github.com/simonpierreboucher02)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3.1-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-blue?style=flat-square&logo=node.js)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-blue?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4.19-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)

[![Code Size](https://img.shields.io/badge/Code_Lines-8,849-orange?style=flat-square)](https://github.com/simonpierreboucher02/promptlang-app)
[![Files](https://img.shields.io/badge/TypeScript_Files-78-purple?style=flat-square)](https://github.com/simonpierreboucher02/promptlang-app)
[![Dependencies](https://img.shields.io/badge/Dependencies-50+-yellow?style=flat-square)](https://github.com/simonpierreboucher02/promptlang-app)
[![AI Models](https://img.shields.io/badge/AI_Models-OpenAI%20%7C%20Anthropic%20%7C%20DALL--E-brightgreen?style=flat-square)](https://github.com/simonpierreboucher02/promptlang-app)

> **Repository**: [https://github.com/simonpierreboucher02/promptlang-app](https://github.com/simonpierreboucher02/promptlang-app)

## Overview

PromptLang is a minimalist search engine for exploring, understanding, and testing AI prompts. It serves as a reference tool for discovering high-quality prompts for various AI models, with built-in testing capabilities and admin management.

### 🚀 Key Features
- **🔍 Smart Search**: Advanced prompt discovery with keyword matching
- **🧪 Live Testing**: Test prompts with OpenAI, Anthropic, and DALL-E models
- **📊 Admin Dashboard**: Complete CRUD operations for prompt management
- **🎨 Modern UI**: Beautiful interface built with Tailwind CSS and shadcn/ui
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices
- **🔄 Real-time Updates**: Instant feedback and live model responses

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: TanStack Query for server state
- **Routing**: Wouter for client-side routing
- **Build Tool**: Vite for development and build processes

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon (serverless PostgreSQL)
- **API Design**: RESTful endpoints with JSON responses
- **Authentication**: Simple password-based admin access

### Key Components

1. **Search Engine**: Central search functionality for prompt discovery
2. **Prompt Management**: CRUD operations for prompt administration
3. **Testing Playground**: Integrated OpenAI API testing capabilities
4. **Admin Dashboard**: Password-protected administrative interface

## Data Flow

1. **User Search**: Users search for prompts using keywords or descriptions
2. **Prompt Discovery**: System returns relevant prompts based on search criteria
3. **Prompt Testing**: Users can test prompts with live AI models
4. **Usage Tracking**: System tracks prompt usage and popularity
5. **Admin Management**: Administrators can create, edit, and delete prompts

## Key Database Schema

### Prompts Table
- Stores prompt metadata (title, description, category)
- Contains prompt text and analysis fields (role, input type, objective)
- Tracks usage statistics and ratings
- Supports tagging and model compatibility

### Prompt Tests Table
- Records test results for prompt validation
- Links to parent prompts
- Stores input/output pairs with model information

### Users Table
- Basic user management for admin access
- Username/password authentication

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connectivity
- **drizzle-orm**: Type-safe database queries
- **@tanstack/react-query**: Server state management
- **openai**: AI model integration for testing

### UI Dependencies
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library

## Deployment Strategy

### Development
- Uses Vite dev server for frontend hot reloading
- Express server runs on development mode
- Database migrations via Drizzle Kit

### Production
- Frontend built and served as static files
- Express server serves API and static content
- Database provisioned through Neon serverless PostgreSQL
- Environment variables for API keys and database connections

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string
- `OPENAI_API_KEY`: OpenAI API access token
- `NODE_ENV`: Environment designation

## 🛠️ Quick Start

```bash
# Clone the repository
git clone https://github.com/simonpierreboucher02/promptlang-app.git
cd promptlang-app

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys and database URL

# Run database migrations
npm run db:push

# Start development server
npm run dev
```

## 📈 Project Metrics

- **📊 Total Lines of Code**: 8,849
- **📁 TypeScript Files**: 78
- **🔧 Dependencies**: 50+
- **🎯 Supported AI Models**: OpenAI GPT-4, Claude, DALL-E
- **⚡ Build Tool**: Vite
- **🎨 UI Framework**: Tailwind CSS + shadcn/ui
- **🗄️ Database**: PostgreSQL (Neon)

## Changelog

- July 04, 2025. Initial setup with complete database schema and sample data
- July 04, 2025. Added 6 sample prompts across different categories (Code Generation, Email Writing, Document Analysis, Content Creation, Debugging, Social Media)
- July 04, 2025. Configured OpenAI API integration for prompt testing functionality
- July 04, 2025. Fixed CSS import ordering issue for proper font loading
- July 04, 2025. Added support for multiple input fields in prompts with structured JSON format
- July 04, 2025. Enhanced 3 sample prompts to demonstrate multi-input functionality (Creative Content, Email Writer, Python Code Generator)
- July 04, 2025. Added Anthropic API integration for Claude models support
- July 04, 2025. Updated model selection to include Claude Sonnet 4, Claude Opus 4, and GPT-4 variants (4o, 4o-mini, 4.1, 4.1-mini, 4.1-nano)
- July 04, 2025. Added JSON import/export functionality for admin panel with template download
- July 04, 2025. Enhanced category system to allow creation of new categories via JSON import (replaced fixed Select with Input + datalist) - COMPLETED and tested successfully
- July 04, 2025. Added batch JSON import functionality with support for multiple formats (JSON arrays, delimited files with ---, ===, ###)
- July 04, 2025. Enhanced visual design with:
  * Deterministic random colors for category badges based on category name hash
  * Gradient backgrounds and improved animations throughout the app
  * Enhanced search bar with blur effects and gradient styling
  * Color-coded model badges (orange for Claude, green for GPT, blue for others)
  * Improved loading states with gradient skeletons
  * Fade-in animations for prompt cards with staggered delays
  * Removed category icons to focus on color-coded badges only
- July 04, 2025. Fixed prompt deletion issue: prompts with associated test data can now be deleted properly (cascade delete implementation)
- July 04, 2025. Removed popular search suggestions from home page for cleaner interface
- July 04, 2025. Added comprehensive footer with About Us, Documentation, and Terms & Policy sections
- July 04, 2025. Created dedicated documentation page (/docs) with comprehensive guides for users and admins
- July 04, 2025. Changed footer and documentation language from French to English for broader accessibility
- July 04, 2025. Added image prompt functionality with DALL-E model support:
  * Extended database schema with promptType field for "text" or "image" prompts
  * Created DALL-E service integration for image generation (dall-e-2, dall-e-3)
  * Updated admin dashboard with prompt type selector and model compatibility for image generation
  * Enhanced prompt testing to display generated images in results
  * Added purple color coding for DALL-E model badges
  * Created 3 sample image prompts: Professional Portrait Generator, Creative Concept Art Generator, Product Visualization Creator
  * Updated documentation to include DALL-E models in supported models section

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Simon Pierre Boucher**
- GitHub: [@simonpierreboucher02](https://github.com/simonpierreboucher02)
- Repository: [promptlang-app](https://github.com/simonpierreboucher02/promptlang-app)

---

⭐ **Star this repository if you find it helpful!**
