# Diget Group Technical Assessment

## Cloud-Based Notebook Collaboration Platform

A next-generation cloud-based notebook collaboration platform built with Laravel 12, React, and Inertia.js.

## Features

- **Unlimited Sections & Subsections**: Infinite nesting with recursive structure
- **User Authentication**: Secure login/registration via Laravel Breeze
- **Role-Based Access Control**:
  - **Authors**: Create sections, delete, manage collaborators
  - **Collaborators**: Edit content only
- **Real-time Collaboration**: Invite users to collaborate on books
- **Caching**: Section trees cached for performance

## Technology Stack

| Component | Technology |
|-----------|------------|
| Backend | Laravel 12 |
| Frontend | React 18 |
| SPA Layer | Inertia.js |
| Database | SQLite |
| Styling | Tailwind CSS |
| Editor | TipTap |

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd Technical_assessment

# Install dependencies
composer install
npm install

# Setup environment
cp .env.example .env
php artisan key:generate

# Create SQLite database
touch database/database.sqlite

# Run migrations
php artisan migrate

# Build assets
npm run build

# Start servers
php artisan serve
npm run dev
```

## Database Schema

### Tables

**users**
- id, name, email, password, timestamps

**books**
- id, user_id (author), title, description, timestamps

**sections**
- id, book_id, parent_id (nullable), title, content, order, timestamps

**book_collaborators**
- id, book_id, user_id, role, timestamps

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | /books | List all books |
| POST | /books | Create book |
| GET | /books/{book}/edit | Open book editor |
| PUT | /books/{book} | Update book |
| DELETE | /books/{book} | Delete book |
| POST | /books/{book}/sections | Create section |
| PUT | /sections/{section} | Update section |
| DELETE | /sections/{section} | Delete section |
| POST | /books/{book}/collaborators | Add collaborator |
| DELETE | /books/{book}/collaborators/{user} | Remove collaborator |

## Architecture Decisions

### 1. Recursive Sections (Adjacency List Pattern)
Used `parent_id` self-referencing for infinite nesting. Simple and works well with Laravel's eager loading.

### 2. Caching Strategy
`Cache::remember` on section trees (1 hour TTL). Cache invalidated on any section CRUD operation.

### 3. Authorization via Policies
Laravel Policies (`BookPolicy`, `SectionPolicy`) enforce role-based access cleanly.

### 4. Service Layer
Business logic encapsulated in `BookService` and `SectionService` following OOP principles.

## Testing the Collaboration Flow

1. Register User A (Author)
2. Create a book and add sections
3. Register User B (Collaborator) in another browser
4. User A: Click "Share" → Enter User B's email
5. User B: See book in "Shared With Me", can edit content

## Author

Zahid Khan - Diget Group Technical Assessment
