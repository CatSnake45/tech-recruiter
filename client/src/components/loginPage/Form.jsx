import React, { useState } from 'react';
import { Box, TextField, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../state';

const Signup = () => {
  const [pageType, setPageType] = useState('login');

  const isLogin = pageType === 'login';
  const isRegister = pageType === 'register';

  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userInformation = {
    userName,
    password,
    city,
  };

  const register = async (e) => {
    try {
      const registerUser = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInformation),
      });

      const registerResponse = await registerUser.json();

      // The following three lines of code were updating state so that a refresh was necessary in order enter login info
      // By commenting them out, we seem to be able to login without having to refresh page

      // setUsername("");
      // setPassword("");
      // setCity("");

      if (!('err' in registerResponse)) {
        alert('Account has been created!');
        setPageType('login');
        //console.log('', savedUser);
      } else {
        if ('details' in registerResponse) {
          alert(`${registerResponse.err} \n${registerResponse.details}`);
        } else {
          alert(`${registerResponse.err}`);
        }
      }
    } catch (error) {
      console.error(`Error submitting: ${error}`);
    }
  };

  const login = async (e) => {
    try {
      const loginResponse = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInformation),
      });

      const loggedInResponse = await loginResponse.json();
      // console.log(loggedInResponse);
      // throw an alert for any login errors
      if (!('error' in loggedInResponse)) {
        //console.log('LOGGED IN', loggedInResponse);
        dispatch(
          setLogin({
            user: loggedInResponse.user,
          })
        );

        navigate('/home');
        //console.log('success logging in', loggedInResponse);
      } else {
        alert(`Error: ${loggedInResponse.error}`);
      }
    } catch (error) {
      //console.error(`Error logging in: ${error}`);
      alert(`Error logging in: ${error}`);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      await login();
    }

    if (isRegister) {
      await register();
    }
  };

  return (
    <Box
      p='2rem'
      sx={{
        borderRadius: '3rem',
      }}
    >
      <form>
        <Box
          width='12rem'
          display='flex'
          flexDirection='column'
          alignItems='center'
        >
          <Box mb='-2rem'>
            <TextField
              id='outlined-basic'
              label='Username'
              variant='outlined'
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              sx={{ width: '100%' }}
            />
          </Box>
          <Box mb='-2rem'>
            <TextField
              id='outlined-basic'
              label='Password'
              type='password'
              variant='outlined'
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              sx={{ width: '100%' }}
            />
          </Box>
          {isLogin ? undefined : (
            <Box mb='-2rem'>
              <TextField
                id='outlined-basic'
                label='City'
                variant='outlined'
                onChange={(event) => {
                  setCity(event.target.value);
                }}
                sx={{ width: '100%' }}
              />
            </Box>
          )}

          <Button
            onClick={handleFormSubmit}
            variant='contained'
            fullWidth
            type='submit'
            sx={{
              p: '1rem',
              backgroundColor: '#1d50bd',
            }}
          >
            {isLogin ? 'LOGIN' : 'REGISTER'}
          </Button>
          <Typography
            sx={{
              fontSize: '15px',
              '&:hover': {
                color: '#1d50bd',
                textDecoration: 'underline',
              },
            }}
            component='h2'
            mt='1rem'
            onClick={() => setPageType(isLogin ? 'register' : 'login')}
          >
            {isLogin
              ? "Don't have an account? Register here."
              : 'Already have an account? Login here.'}
          </Typography>
        </Box>
      </form>
    </Box>
  );
};

export default Signup;
