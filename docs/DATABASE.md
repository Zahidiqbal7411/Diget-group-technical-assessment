# Database Schema

## Entity Relationship Diagram

```
┌─────────────┐       ┌─────────────────────┐       ┌─────────────┐
│   users     │       │  book_collaborators │       │   books     │
├─────────────┤       ├─────────────────────┤       ├─────────────┤
│ id (PK)     │◄──────┤ user_id (FK)        │       │ id (PK)     │
│ name        │       │ book_id (FK)        │──────►│ user_id(FK) │──┐
│ email       │       │ role                │       │ title       │  │
│ password    │       │ timestamps          │       │ description │  │
│ timestamps  │       └─────────────────────┘       │ timestamps  │  │
└─────────────┘                                     └─────────────┘  │
      ▲                                                    │         │
      │                                                    │         │
      └────────────────────────────────────────────────────┘         │
                           (author)                                  │
                                                                     │
                                         ┌───────────────────────────┘
                                         │
                                         ▼
                                  ┌─────────────┐
                                  │  sections   │
                                  ├─────────────┤
                                  │ id (PK)     │◄──┐
                                  │ book_id(FK) │   │
                                  │ parent_id   │───┘ (self-reference)
                                  │ title       │
                                  │ content     │
                                  │ order       │
                                  │ timestamps  │
                                  └─────────────┘
```

## Tables

### users
| Column | Type | Constraints |
|--------|------|-------------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT |
| name | VARCHAR(255) | NOT NULL |
| email | VARCHAR(255) | UNIQUE, NOT NULL |
| password | VARCHAR(255) | NOT NULL |
| email_verified_at | TIMESTAMP | NULLABLE |
| remember_token | VARCHAR(100) | NULLABLE |
| created_at | TIMESTAMP | |
| updated_at | TIMESTAMP | |

### books
| Column | Type | Constraints |
|--------|------|-------------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT |
| user_id | BIGINT | FOREIGN KEY → users(id) ON DELETE CASCADE |
| title | VARCHAR(255) | NOT NULL |
| description | TEXT | NULLABLE |
| created_at | TIMESTAMP | |
| updated_at | TIMESTAMP | |

### sections
| Column | Type | Constraints |
|--------|------|-------------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT |
| book_id | BIGINT | FOREIGN KEY → books(id) ON DELETE CASCADE |
| parent_id | BIGINT | FOREIGN KEY → sections(id) ON DELETE CASCADE, NULLABLE |
| title | VARCHAR(255) | NOT NULL |
| content | LONGTEXT | NULLABLE |
| order | INT UNSIGNED | DEFAULT 0 |
| created_at | TIMESTAMP | |
| updated_at | TIMESTAMP | |

**Indexes:** `(book_id, parent_id)` for efficient tree queries

### book_collaborators
| Column | Type | Constraints |
|--------|------|-------------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT |
| book_id | BIGINT | FOREIGN KEY → books(id) ON DELETE CASCADE |
| user_id | BIGINT | FOREIGN KEY → users(id) ON DELETE CASCADE |
| role | VARCHAR(255) | DEFAULT 'collaborator' |
| created_at | TIMESTAMP | |
| updated_at | TIMESTAMP | |

**Unique Constraint:** `(book_id, user_id)`

## Relationships

- **User** → has many **Books** (as author)
- **User** → belongs to many **Books** (as collaborator) via `book_collaborators`
- **Book** → belongs to **User** (author)
- **Book** → has many **Sections**
- **Book** → belongs to many **Users** (collaborators) via `book_collaborators`
- **Section** → belongs to **Book**
- **Section** → belongs to **Section** (parent)
- **Section** → has many **Sections** (children/subsections)
