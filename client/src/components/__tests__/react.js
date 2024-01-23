const React = require('react');
const { render, screen, waitFor } = require('@testing-library/react');
require('@testing-library/jest-dom');
// const userEvent = require('@testing-library/user-event');
// const regeneratorRuntime = require('regenerator-runtime');

// const App = require('../../App.jsx');
const Search = require('../Search.jsx');
const jestConfig = require('../../../../jest.config.js');
// const Login = require('../client/sr/components/loginPage/Login.jsx');

// Use this to test React Testing Library

// test login functionality actually logs in a test user
// test logout functionality actually logsouts a test user
// test job search functionality retrieves job

describe('Unit testing React components', () => {
  const props = {
    getSearch: jest.fn(),
    setJob: 'Full Stack Developer',
    city: 'Austin',
    updateCIty: jest.fn(),
  };

  it('should contain the heading "Select Job Type"', () => {
    let text = render(<Search {...props} />);
    expect(text.getByText('Select Job Type').toBeInTheDocument);
  });
});
