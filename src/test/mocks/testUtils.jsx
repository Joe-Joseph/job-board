import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { vi } from 'vitest';

import authReducer from '../../store/slice/authSlice';
import jobDetailsReducer from '../../store/slice/jobDetailsSlice';
import jobApplicationReducer from '../../store/slice/jobApplication';
import { ThemeProvider } from '../../ThemeContext';

function createTestStore(preloadedState = {}) {
  return configureStore({
    reducer: {
      auth: authReducer,
      jobDetails: jobDetailsReducer,
      jobApplication: jobApplicationReducer,
    },

    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['persist/PERSIST'],
        },
      }),
  });
}

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = createTestStore(preloadedState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <ThemeProvider value={{ darkMode: false, setDarkMode: vi.fn() }}>
          <HashRouter>{children}</HashRouter>
        </ThemeProvider>
      </Provider>
    );
  }

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
