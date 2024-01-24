import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
require('@testing-library/jest-dom');
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import Search from '../Search.jsx';
import Form from '../loginPage/Form.jsx';
import jestConfig from '../../../../jest.config.js';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

const mockStore = configureStore();

describe('Unit testing React components', () => {
  describe('Testing Search Page', () => {
    const props = {
      getSearch: jest.fn(),
      setJob: 'Full Stack Developer',
      city: 'Austin',
      updateCIty: jest.fn(),
    };

    test('should contain the heading "Select Job Type"', () => {
      let text = render(<Search {...props} />);
      expect(text.getByText('Select Job Type').toBeInTheDocument);
    });

    test('Search button functions', async () => {
      render(<Search {...props} />);
      await userEvent.click(screen.getByText('Search'));
      expect(props.getSearch).toHaveBeenCalledTimes(1);
    });
  });

  describe('Testing Login & Logout Functions', () => {
    test('Filling in login form', async () => {
      render(
        <MemoryRouter>
          <Provider store={mockStore({})}>
            <Form />
          </Provider>
        </MemoryRouter>
      );
      await userEvent.click(screen.getByText('LOGIN'));
      expect(LOGIN).toHaveBeenCalledTimes(1);
    });

    test('Filling in login form', async () => {
      render(
        <MemoryRouter>
          <Form />
        </MemoryRouter>
      );
      await userEvent.type(screen.getByLabelText('Username'), 'testUser');
      await userEvent.type(screen.getByLabelText('Password'), 'testPassword');
    });
  });
});
