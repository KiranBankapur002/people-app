# Angular People Management App

## Getting Started

### Install Dependencies
```bash
npm install
```

### Development Server
```bash
npm start
# Navigate to http://localhost:4200/
```

### Build
```bash
npm run build
```

### Running Tests
```bash
npm test
```

## Project Overview

This is a Single Page Application (SPA) built with Angular 7/8 for managing a list of people.

### Features:
- ✅ List all people
- ✅ View person details
- ✅ Edit a person
- ✅ Delete a person
- ✅ Add new person

### Architecture:
- **Component-based** structure with routing
- **HTTP Client** for REST API communication
- **Template-driven Forms** for user input
- **RxJS Observables** for reactive programming
- **Global CSS styling** with modern design

### API Used:
JSONPlaceholder (https://jsonplaceholder.typicode.com/users)

### Key Routes:
- `/people` - List view
- `/people/:id` - Detail view
- `/people/edit/:id` - Edit view
- `/add-person` - Add new person

For detailed information, see [README.md](README.md)
