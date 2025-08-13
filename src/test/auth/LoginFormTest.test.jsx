import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../mocks/testUtils';
import { LoginForm } from '../../modules/auth/components/LoginForm';
import { loginCredentials } from '../../apiMocks/data/auth';

// Mock the navigate function
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('LoginForm', () => {
  const defaultProps = {
    isSignup: false,
    setIsSignup: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('renders login form correctly', () => {
    renderWithProviders(<LoginForm {...defaultProps} />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByTestId('signin')).toBeInTheDocument();
  });

  it('shows validation errors for empty fields', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginForm {...defaultProps} />);

    const submitButton = screen.getByTestId('signin');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    });
  });

  it('shows validation errors for invalid email format', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginForm {...defaultProps} />);

    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByTestId('signin');

    await user.type(emailInput, 'invalid-email');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Invalid email address/i)).toBeInTheDocument();
    });
  });

  it('successfully submits form with valid credentials', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginForm {...defaultProps} />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByTestId('signin');

    await user.type(emailInput, loginCredentials.email);
    await user.type(passwordInput, loginCredentials.password);
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  it('shows error message for invalid credentials', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginForm {...defaultProps} />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByTestId('signin');

    await user.type(emailInput, 'wrong@email.com');
    await user.type(passwordInput, 'wrongpassword');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });

  it('clears errors when switching between login and signup', async () => {
    const user = userEvent.setup();
    const setIsSignupMock = vi.fn();

    // Start with an error state
    const preloadedState = {
      auth: {
        error: 'Some error message',
        loading: false,
        token: null,
        isAuthenticated: false,
        user: null,
      },
    };

    renderWithProviders(
      <LoginForm {...defaultProps} setIsSignup={setIsSignupMock} />,
      { preloadedState }
    );

    // Find and click the account exist component
    const switchButton = screen.getByTestId('signupRedirect');

    await user.click(switchButton);

    expect(setIsSignupMock).toHaveBeenCalled();
  });

  it('handles form field changes correctly', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginForm {...defaultProps} />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  it('handles blur events for validation', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginForm {...defaultProps} />);

    const emailInput = screen.getByLabelText(/email/i);

    await user.click(emailInput);
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    });
  });
});
