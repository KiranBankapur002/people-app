# People Management App - Angular 7/8

A modern Single Page Application (SPA) built with Angular 7/8 for managing a list of people. Features include viewing, editing, adding, and deleting people with a clean, intuitive user interface.

## Features

- **View All People**: Display a list of all people with their basic information
- **View Person Details**: View detailed information about a specific person
- **Add Person**: Create a new person entry with name, email, phone, and address
- **Edit Person**: Update existing person information
- **Delete Person**: Remove a person from the list with confirmation

## Technologies Used

- **Angular 7/8**: Frontend framework
- **TypeScript**: Programming language
- **RxJS**: Reactive programming library
- **HttpClientModule**: HTTP communication
- **Angular Forms**: Form handling (Template-driven)
- **Angular Router**: Routing and navigation

## API

The application uses the **JSONPlaceholder API** for mock data:
- Base URL: `https://jsonplaceholder.typicode.com/users`
- GET `/users` - Get all users
- GET `/users/:id` - Get user by ID
- POST `/users` - Create new user
- PUT `/users/:id` - Update user
- DELETE `/users/:id` - Delete user

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── person-list/          # List all people
│   │   ├── person-edit/          # Add/Edit person
│   │   └── person-detail/        # View person details
│   ├── models/
│   │   └── person.model.ts       # Person interface
│   ├── services/
│   │   └── person.service.ts     # HTTP service
│   ├── app.component.ts          # Root component
│   ├── app.module.ts             # Main module
│   ├── app-routing.module.ts     # Routing configuration
│   └── ...
├── environments/                  # Environment configuration
├── index.html                     # Main HTML file
├── styles.css                     # Global styles
└── main.ts                        # Application entry point
```

## Routing

The application includes the following routes:

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Redirect to `/people` | Home page |
| `/people` | PersonListComponent | List all people |
| `/people/:id` | PersonDetailComponent | View person details |
| `/people/edit/:id` | PersonEditComponent | Edit existing person |
| `/add-person` | PersonEditComponent | Add new person |

## Installation & Setup

### Prerequisites

- Node.js (v10 or higher)
- npm or yarn package manager
- Angular CLI: `npm install -g @angular/cli@7`

### Steps

1. **Clone the repository** (or navigate to the project directory)
   ```bash
   cd people-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   ng serve
   # or
   npm start
   ```
   The application will be available at `http://localhost:4200`

4. **Build for production**
   ```bash
   ng build --prod
   ```

## Components

### PersonListComponent
- Displays a table of all people
- Shows loading state while fetching data
- Error handling for failed requests
- Delete action with confirmation dialog
- Navigation to detail and edit pages
- Add new person button

### PersonEditComponent
- Form for creating new person
- Form for editing existing person
- Form validation
- Two-way data binding using `[(ngModel)]`
- Success/error alerts
- Navigation back to list after save

### PersonDetailComponent
- Displays detailed information about a person
- Edit and Delete buttons
- Back to list navigation
- Responsive layout

## Services

### PersonService
HTTP service for API communication:
- `getAllPeople()`: Fetch all people
- `getPersonById(id)`: Fetch specific person
- `createPerson(person)`: Create new person
- `updatePerson(id, person)`: Update person
- `deletePerson(id)`: Delete person

## Styling

The application includes:
- Global CSS with gradient background
- Card-based layout
- Responsive design
- Button variations (primary, success, danger, secondary)
- Form styling with focus states
- Table styling with hover effects
- Alert/notification styles
- Mobile-friendly navigation

## Usage

1. **View People**: Navigate to the home page to see all people
2. **View Details**: Click the "View" button to see full details
3. **Edit Person**: Click the "Edit" button to modify information
4. **Delete Person**: Click the "Delete" button with confirmation
5. **Add Person**: Click "Add New Person" button to create a new entry

## Running Tests

```bash
ng test
```

## Development Notes

- The app uses template-driven forms (ngModel) for simplicity
- All HTTP calls are observable-based with manual subscription
- Error handling includes user-friendly error messages
- The JSONPlaceholder API returns mock data suitable for demonstration

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License.

## References

- [Angular Official Documentation](https://angular.io/tutorial)
- [Angular Routing Guide](https://dev.to/codev206/how-to-set-up-routing-in-angular-to-create-single-page-applications-4ch2)
- [Angular HttpClient Guide](https://www.javaguides.net/2020/01/angular-9-httpclient-get-post-put-and-delete-request-example.html)
- [Getting Started with Angular CLI](https://www.digitalocean.com/community/tutorials/getting-started-with-angular-using-the-angular-cli)
