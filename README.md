# Calculator App

A simple and efficient calculator built with vanilla JavaScript with support for basic mathematical operations and percentage calculations.

## Features

- Basic operations: addition, subtraction, multiplication, division
- Negative number support
- Percentage calculations
- Sign change functionality
- Decimal number support
- Operation priority (multiplication/division before addition/subtraction)
- Clean and responsive interface

## Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/mavylow/calculator.git
cd calculator
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run in development mode
```bash
npm run dev
```
The application will open at: `http://localhost:3000`

### 4. Build for production
```bash
npm run build
```

## Technologies

- **JavaScript** (ES6+) - core language
- **Webpack** - project bundling
- **ESLint** - code quality
- **Prettier** - code formatting
- **Husky** - pre-commit hooks


## Development Scripts

```bash
npm run dev          # Start dev server
npm run build        # Build project
npm run lint         # Check code quality
npm run lint:fix     # Auto-fix issues
npm run format       # Format code
```

## Implementation Features

- Clean architecture with separation of logic, presentation, and formatting
- Error handling for invalid input
- Input validation to prevent invalid operations
- Optimized calculation algorithms

## Code Quality

The project uses modern tools to maintain code quality:

- **ESLint** - static code analysis
- **Prettier** - consistent code style
- **Pre-commit hooks** - automatic checks before commits

## Development

1. Create feature branch: `git checkout -b feature/new-feature`
2. Make changes
3. Check code: `npm run lint`
4. Commit changes: `git commit -m "feat: add new feature"`
5. Push changes: `git push origin feature/new-feature`
