# Payment Hub UI

A modern Angular web application for querying treasury payment data using natural language. This application provides an intuitive interface to ask questions about payment information and view results in a table format.

## Features

- **Natural Language Query Interface**: Ask questions about treasury payments in plain English
- **Data Visualization**: View query results in a clean, responsive table format
- **Modern Angular 20**: Built with Angular's latest standalone component architecture
- **Responsive Design**: Works seamlessly across desktop and mobile devices

## Prerequisites

- Node.js (v18 or higher recommended)
- npm (v9 or higher)
- Angular CLI (`npm install -g @angular/cli`)

## Getting Started

### Installation

```bash
# Install dependencies
npm install
```

### Development Server

```bash
# Start the development server
npm start
```

Navigate to `http://localhost:4200/`. The application will automatically reload when you make changes to source files.

### Backend Configuration

This application connects to a backend API at `http://localhost:8080/api/nlq` for processing natural language queries. Ensure the backend service is running before using the query functionality.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start the development server |
| `npm run build` | Build the application for production |
| `npm run watch` | Build in watch mode for development |
| `npm test` | Run unit tests with Karma |

## Project Structure

```
src/
├── app/
│   ├── app.ts              # Main application component
│   ├── app.html            # Application template
│   ├── app.css             # Component styles
│   ├── app.config.ts       # Application configuration
│   ├── app.spec.ts         # Unit tests
│   └── nlq-api.service.ts  # API service for NLQ backend
├── main.ts                 # Application bootstrap
├── index.html              # Main HTML file
└── styles.css              # Global styles
```

## Technology Stack

- **Framework**: Angular 20
- **Language**: TypeScript 5.9
- **Testing**: Jasmine + Karma
- **HTTP Client**: Angular HttpClient

## Building for Production

```bash
npm run build
```

The build artifacts are stored in the `dist/payment-hub-ui` directory. The production build optimizes the application for performance and speed.

## Running Tests

```bash
# Run unit tests
npm test

# Run tests with headless Chrome (CI environments)
npm test -- --browsers=ChromeHeadless --watch=false
```

## License

This project is private and proprietary.
