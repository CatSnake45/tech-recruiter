import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
require('@testing-library/jest-dom');
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import Search from '../Search.jsx';
import HomePage from '../../HomePage.jsx';
import Form from '../loginPage/Form.jsx';

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
      setJob: jest.fn(),
      city: 'Austin',
      updateCity: jest.fn(),
    };

    test('should contain the heading "Select Job Type"', () => {
      let text = render(<Search {...props} />);
      expect(text.getByText('Select Job Type').toBeInTheDocument);
    });

    test('Search button functions', async () => {
      // render(<Search {...props} />);
      let text = render(<Search {...props} />);
      await userEvent.click(text.getByText('Search'));
      expect(props.getSearch).toHaveBeenCalled();
    });

    test('Testing Dropdown', async () => {
      let text = render(<Search {...props} />);
      const dropdown = text.getByRole('selectBox');
      await userEvent.selectOptions(dropdown, 'Python developer');
      expect(dropdown.value).toBe('Python developer');
    });

    test('Job Search Field', async () => {
      let text = render(<Search {...props} />);
      const searchField = text.getByRole('searchBox');
      await userEvent.type(searchField, 'Dallas');
    });
  });

  describe('Testing Login Functions', () => {
    // test('Login Button Works', async () => {
    //   const loginMock = jest.fn();
    //   render(
    //     <MemoryRouter>
    //       <Provider store={mockStore({})}>
    //         <Form login={loginMock} />
    //       </Provider>
    //     </MemoryRouter>
    //   );
    //   await userEvent.click(screen.getByRole('loginBtn'));
    //   await waitFor(() => {
    //     expect(loginMock).toHaveBeenCalled();
    //   });
    // });

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

  // describe('Testing Logout Functions', () => {
  //   test('Logout Button Exists', async () => {
  //     const props = {
  //       getSearch: jest.fn(),
  //       setListings: jest.fn(),
  //       setJob: jest.fn(),
  //       newCity: 'New York',
  //       state: 'NY',
  //       jobType: 'Developer',
  //       city: 'Cold Spring',
  //       updateCity: jest.fn(),
  //       jobCards: ['New Job'],
  //       updateCount: jest.fn(),
  //       showSeeMore: jest.fn(),
  //     };
  //     render(
  //       <MemoryRouter>
  //         <HomePage {...props} />
  //       </MemoryRouter>
  //     );
  //     const mainButton = screen.getByRole('bigBtn');

  //     expect(mainButton).toHaveClass('btn-logout btn-outline-primary');
  //     // });
  //   });
  // });
});
