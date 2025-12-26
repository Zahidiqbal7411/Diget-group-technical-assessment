# API Documentation

## Authentication

All routes except `/login` and `/register` require authentication.

---

## Books

### List Books
```
GET /books
```
Returns all books owned by or shared with the authenticated user.

**Response:**
```json
{
  "books": [
    {
      "id": 1,
      "title": "My Book",
      "description": "Description",
      "user_id": 1,
      "is_owner": true,
      "collaborators_count": 2,
      "author": { "id": 1, "name": "Author Name" }
    }
  ]
}
```

### Create Book
```
POST /books
```
**Body:**
```json
{
  "title": "Book Title",
  "description": "Optional description"
}
```

### Update Book
```
PUT /books/{book}
```
**Authorization:** Author or Collaborator

### Delete Book
```
DELETE /books/{book}
```
**Authorization:** Author only

---

## Sections

### Create Section
```
POST /books/{book}/sections
```
**Authorization:** Author only

**Body:**
```json
{
  "title": "Section Title",
  "parent_id": null,
  "content": "Optional content"
}
```

### Update Section
```
PUT /sections/{section}
```
**Authorization:** Author or Collaborator

**Body:**
```json
{
  "title": "Updated Title",
  "content": "<p>Rich HTML content</p>"
}
```

### Delete Section
```
DELETE /sections/{section}
```
**Authorization:** Author only (deletes all subsections)

### Reorder Sections
```
POST /books/{book}/sections/reorder
```
**Authorization:** Author only

**Body:**
```json
{
  "sections": [
    { "id": 1, "order": 0, "parent_id": null },
    { "id": 2, "order": 1, "parent_id": 1 }
  ]
}
```

---

## Collaborators

### Add Collaborator
```
POST /books/{book}/collaborators
```
**Authorization:** Author only

**Body:**
```json
{
  "email": "collaborator@example.com"
}
```

**Errors:**
- `email.exists`: User must be registered first

### Remove Collaborator
```
DELETE /books/{book}/collaborators/{user}
```
**Authorization:** Author only

---

## Permissions Matrix

| Action | Author | Collaborator |
|--------|--------|--------------|
| View Book | ✅ | ✅ |
| Edit Book | ✅ | ✅ |
| Delete Book | ✅ | ❌ |
| Create Section | ✅ | ❌ |
| Edit Section | ✅ | ✅ |
| Delete Section | ✅ | ❌ |
| Manage Collaborators | ✅ | ❌ |
