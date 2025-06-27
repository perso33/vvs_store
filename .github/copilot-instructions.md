<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# E-Commerce Multi-Store Application

This is a modern Vue.js 3 e-commerce application with TypeScript, Pinia, TailwindCSS, and Vue Router.

## Project Structure

- **Frontend**: Vue.js 3 with TypeScript and Composition API
- **State Management**: Pinia stores
- **Styling**: TailwindCSS with custom components
- **Routing**: Vue Router 4 with authentication guards
- **UI Framework**: Mobile-first design with TailwindCSS

## Key Features

- Multi-store management system
- Role-based authentication (Super Admin, Store Admin)
- Product management with categories and variants
- Modern mobile-first UI with animations
- Real-time notifications system
- Mock data for development

## Architecture

### User Roles
- **Super Admin**: Can manage all stores and users
- **Store Admin**: Can manage their own store and products

### Store Structure
- Each store has its own admin and products
- Categories are shared across stores
- Products can have variants (size, color, etc.)

### State Management
- `authStore`: User authentication and authorization
- `storesStore`: Store management and settings
- `productsStore`: Product catalog and categories
- `notificationsStore`: Global notification system

## Development Guidelines

- Use TypeScript for all new code
- Follow Vue 3 Composition API patterns
- Use Pinia for state management
- Implement responsive design with TailwindCSS
- Add proper error handling and loading states
- Include animations for better UX
- Use proper TypeScript interfaces from `@/types`

## Code Style

- Use `<script setup>` syntax for Vue components
- Prefer reactive refs and computed properties
- Use proper TypeScript typing
- Follow TailwindCSS utility classes
- Implement proper accessibility features
