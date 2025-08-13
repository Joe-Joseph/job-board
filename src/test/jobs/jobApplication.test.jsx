import { configureStore } from '@reduxjs/toolkit';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/dom';

import authReducer, { login } from '../../store/slice/authSlice';
import jobDetailsReducer, {
  fetchJobDetails,
} from '../../store/slice/jobDetailsSlice';
import jobApplicationReducer from '../../store/slice/jobApplication';
import { loginCredentials } from '../../apiMocks/data/auth';
import { STATUS } from '../../utils/constants';
import { renderWithProviders } from '../mocks/testUtils';
import { JobApplication } from '../../modules/application/JobApplication';
import userEvent from '@testing-library/user-event';

// Mock the navigate function and useParams
const mockNavigate = vi.fn();
const mockJobId = '1';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ jobId: mockJobId }),
  };
});

describe('jobListSlice', () => {
  let store;

  beforeEach(async () => {
    store = configureStore({
      reducer: {
        auth: authReducer,
        jobDetails: jobDetailsReducer,
        jobApplication: jobApplicationReducer,
      },
    });

    await store.dispatch(login(loginCredentials));
    await store.dispatch(fetchJobDetails(1));
  });

  describe('job application page', () => {
    it('renders job application form inputs correctly', async () => {
      const jobDetailsState = store.getState().jobDetails;
      const jobApplicationState = store.getState().jobApplication;
      const preloadedState = {
        jobDetails: jobDetailsState,
        jobApplication: jobApplicationState,
      };

      renderWithProviders(<JobApplication />, {
        preloadedState,
      });

      const emailInput = screen.getByTestId('email');
      const firstNameInput = screen.getByTestId('firstName');
      const lastNameInput = screen.getByTestId('lastName');
      const currentLocationInput = screen.getByTestId('currentLocation');
      const linkedinInput = screen.getByTestId('linkedinProfile');
      const portfolioInput = screen.getByTestId('portfolio');

      const resumeInput = screen.getByTestId('resume');
      const coverLetterInput = screen.getByTestId('coverLetter');

      expect(emailInput).toBeInTheDocument();
      expect(firstNameInput).toBeInTheDocument();
      expect(lastNameInput).toBeInTheDocument();
      expect(currentLocationInput).toBeInTheDocument();
      expect(linkedinInput).toBeInTheDocument();
      expect(portfolioInput).toBeInTheDocument();

      expect(resumeInput).toBeInTheDocument();
      expect(coverLetterInput).toBeInTheDocument();
    });

    it('shows validation errors for empty required fields', async () => {
      const user = userEvent.setup();

      const jobDetailsState = store.getState().jobDetails;
      const jobApplicationState = store.getState().jobApplication;
      const preloadedState = {
        jobDetails: jobDetailsState,
        jobApplication: jobApplicationState,
      };

      renderWithProviders(<JobApplication />, { preloadedState });

      const submitButton = screen.getByTestId('submitJobApplication');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
        expect(screen.getByText(/last name is required/i)).toBeInTheDocument();
        expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      });
    });

    it('handles file upload for resume', async () => {
      const user = userEvent.setup();

      const jobDetailsState = store.getState().jobDetails;
      const jobApplicationState = store.getState().jobApplication;
      const preloadedState = {
        jobDetails: jobDetailsState,
        jobApplication: jobApplicationState,
      };

      renderWithProviders(<JobApplication />, { preloadedState });

      const file = new File(['resume content'], 'resume.pdf', {
        type: 'application/pdf',
      });

      const resumeInput = screen.getByTestId('resume');

      await user.upload(resumeInput, file);

      expect(resumeInput.files[0]).toBe(file);
      expect(resumeInput.files).toHaveLength(1);
    });

    it('handles file upload for cover letter', async () => {
      const user = userEvent.setup();

      const jobDetailsState = store.getState().jobDetails;
      const jobApplicationState = store.getState().jobApplication;
      const preloadedState = {
        jobDetails: jobDetailsState,
        jobApplication: jobApplicationState,
      };

      renderWithProviders(<JobApplication />, { preloadedState });

      const file = new File(['cover letter content'], 'coverLetter.pdf', {
        type: 'application/pdf',
      });

      const coverLetterInput = screen.getByTestId('coverLetter');

      await user.upload(coverLetterInput, file);

      expect(coverLetterInput.files[0]).toBe(file);
      expect(coverLetterInput.files).toHaveLength(1);
    });

    it('submits form with valid data', async () => {
      const user = userEvent.setup();

      const submitSpy = vi.spyOn(
        await import('../../store/slice/jobApplication'),
        'submitJobApplication'
      );

      const jobDetailsState = store.getState().jobDetails;
      const jobApplicationState = store.getState().jobApplication;
      const preloadedState = {
        jobDetails: jobDetailsState,
        jobApplication: jobApplicationState,
      };

      renderWithProviders(<JobApplication />, { preloadedState });

      const emailInput = screen.getByTestId('email');
      const firstNameInput = screen.getByTestId('firstName');
      const lastNameInput = screen.getByTestId('lastName');
      const currentLocationInput = screen.getByTestId('currentLocation');

      const resumeInput = screen.getByTestId('resume');
      const coverLetterInput = screen.getByTestId('coverLetter');

      // Fill in required fields
      await user.type(firstNameInput, 'John');
      await user.type(lastNameInput, 'Doe');
      await user.type(emailInput, 'john.doe@example.com');
      await user.type(currentLocationInput, 'New York');

      // Upload files if required by validation
      const resumeFile = new File(['resume'], 'resume.pdf', {
        type: 'application/pdf',
      });

      const coverLetterFile = new File(['coverLetter'], 'coverLetter.pdf', {
        type: 'application/pdf',
      });

      await user.upload(resumeInput, resumeFile);
      await user.upload(coverLetterInput, coverLetterFile);

      const submitButton = screen.getByTestId('submitJobApplication');
      await user.click(submitButton);

      expect(submitSpy).toHaveBeenCalled();
    });
  });
});
