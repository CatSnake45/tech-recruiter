import request from 'supertest';
import fs from 'fs';
import path from 'path';
import { describe, it } from 'node:test';
const server = 'http://localhost:5173';
import mongoose from 'mongoose';
import createServer from '../server.js';

describe('Route Integration', () => {
  describe('/', () => {
    it(' / responsds with code 200 and text/html content', () => {
      return request(server)
        .get('/')
        .expect('Content-Type', /text\/html/)
        .expect(200);
    });
  });

  describe('/userData', () => {
    it('/userData responsds with code 200 and text/html content', () => {
      return request(server)
        .get('/userData')
        .expect('Content-Type', /text\/html/)
        .expect(200);
    });
  });

  describe('/register', () => {
    it('/register post responds with code 200 and text/html content', () => {
      return request(server)
        .post('/register')
        .expect('Content-Type', /text\/html/)
        .expect(201);
    });
  });

  describe('/login', () => {
    it('/login post responds with code 200 and text/html content', () => {
      return request(server)
        .post('/login')
        .expect('Content-Type', /text\/html/)
        .expect(200);
    });
  });
});

const app = createServer();
