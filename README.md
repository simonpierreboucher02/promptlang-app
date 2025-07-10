# PromptLang 

## Overview

PromptLang is a minimalist search engine for exploring, understanding, and testing AI prompts. It serves as a reference tool for discovering high-quality prompts for various AI models, with built-in testing capabilities and admin management.

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

## User Preferences

Preferred communication style: Simple, everyday language.
