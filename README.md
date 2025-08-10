# QuickNotes

Welcome to QuickNotes, a simple and efficient notes application built with React. This project allows users to create, view, edit, and delete notes, with features such as persistent storage, category filtering, and a search function.

## Features

- **Create Notes:** Add new notes with a title and content.
- **Edit Notes:** Modify existing notes in a modal dialog.
- **Delete Notes:** Remove notes from your list with a confirmation prompt.
- **Persistent Storage:** Notes are saved in the browser's local storage and persist between page reloads.
- **Note Details:** Each note displays its creation and last updated dates.
- **Categorization:** Assign categories (e.g., Personal, Work) to notes.
- **Dynamic Styling:** Notes are color-coded based on their category.
- **Search & Filter:** Easily find notes using a search bar or filter them by category.
- **Responsive Design:** The app is designed to work well on various screen sizes.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1.  Clone the repository:
 
    git clone [https://github.com/Gabrielab5/quicknotes.git](https://github.com/Gabrielab5/quicknotes.git)
    cd quicknotes

2.  Install dependencies:
    npm install
    # or
    yarn install

3.  Start the development server:

    npm run dev
    # or
    yarn dev
  
4.  Open your browser and navigate to `http://localhost:5173` (or the port specified by your tool).

## Project Structure

- `src/components`: Contains reusable UI components (e.g., `NoteForm`, `NoteItem`, `Modal`).
- `src/App.jsx`: The main application component where all other components are integrated.
- `src/styles`: CSS files for styling the application.
- `src/utils`: Helper functions, such as those for managing local storage or formatting dates.

## Deployment

The application is deployed using **GitHub Pages**. For a detailed guide on deployment, refer to the documentation on how to create a production build and set up GitHub Pages for a Vite or Create React App project.

## Technologies Used

- **React:** For building the user interface.
- **Vite (or Create React App):** For the build tool and development server.
- **CSS:** For styling.
- **Local Storage API:** For data persistence.
- **Optional Libraries:**
    - `react-modal` or `mantine/core`: For modal functionality.
    - Date formatting libraries (e.g., `date-fns`, `moment.js`): For human-readable dates.

