import '@babel/register';

import request from 'supertest';
import { describe, it } from 'mocha'; // Change 'node:test' to 'mocha'
import mongoose from 'mongoose';
import createServer from '../server.js';

describe('Route Integration', () => {
  describe('/', () => {
    it(' / responsds with code 200 and text/html content', async () => {
      return await request('http://localhost:3000')
        .get('/')
        .expect('Content-Type', /application\/json/)
        .expect(200);
    });
  });

  describe('/userData', () => {
    it('/userData responsds with code 200 and text/html content', async () => {
      return await request('http://localhost:3000')
        .get('/userData')
        .expect('Content-Type', /application\/json/)
        .expect(200);
    });
  });

  describe('/register', () => {
    it('/register post responds with code 200 and text/html content', async () => {
      return await request('http://localhost:3000')
        .post('/register')
        .expect('Content-Type', /application\/json/)
        .expect(201);
    });
  });

  describe('/login', () => {
    it('/login post responds with code 200 and text/html content', async () => {
      return await request('http://localhost:3000')
        .post('/login')
        .expect('Content-Type', /application\/json/)
        .expect(200);
    });
  });
});

const app = createServer();
