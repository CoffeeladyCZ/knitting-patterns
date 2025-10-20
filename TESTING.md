# Testing Setup

This project uses Vitest for testing React components.

## Test Configuration

- **Test Runner**: Vitest
- **Testing Library**: @testing-library/react
- **Environment**: jsdom (for DOM simulation)
- **Setup**: `src/test/setup.ts` and `src/test/test-utils.tsx`

## Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test --watch

# Run tests with coverage
yarn test --coverage
```

## Writing Tests

### Basic Component Test

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '../test/test-utils';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

### Testing Components with Props

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../test/test-utils';
import { Card } from './Card';

describe('Card Component', () => {
  it('calls onClick when clicked', () => {
    const mockOnClick = vi.fn();
    render(<Card onClick={mockOnClick} />);

    screen.getByRole('button').click();
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
```

### Testing Async Components

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '../test/test-utils';
import { AsyncComponent } from './AsyncComponent';

describe('AsyncComponent', () => {
  it('renders data after loading', async () => {
    render(<AsyncComponent />);

    // Wait for async content to appear
    expect(await screen.findByText('Loaded Data')).toBeInTheDocument();
  });
});
```

## Test Utilities

The `src/test/test-utils.tsx` file provides:

- Custom render function with QueryClientProvider for React Query
- Re-exported testing utilities from @testing-library/react

## Available Test Files

- `src/components/Card.test.tsx` - Tests for the Card component
- `src/components/Dashboard.test.tsx` - Tests for the Dashboard component
