import '@babel/register';
import request from 'supertest';
import { describe, it } from 'mocha'; // Change 'node:test' to 'mocha'
const server = 'http://localhost:3000';

describe('Route Integration', () => {
  describe('/', () => {
    it(' / responsds with code 200 and text/html content', async () => {
      return await request(server)
        .get('/')
        .send({ what: 'Full Stack', where: 'McKinney', page: 1 })
        .expect('Content-Type', /application\/json/)
        .expect(200);
    });
  });

  describe('/register', () => {
    it('/register post responds with code 200 and text/html content', async () => {
      return await request(server)
        .post('/register')
        .send({ userName: 'trevor1', password: '12345', city: 'McKinney' })
        .expect('Content-Type', /application\/json/)
        .expect(201);
    });
  });

  describe('/login', () => {
    it('/login post responds with code 200 and text/html content', async () => {
      return await request(server)
        .post('/login')
        .send({ userName: 'trevor', password: '12345', city: 'McKinney' })
        .expect('Content-Type', /application\/json/)
        .expect(200);
    });
  });

  describe('Not a Path', () => {
    it('/notapath should return 404', async () => {
      return await request(server)
        .get('/notapath')
        .expect('Content-Type', /text\/plain/)
        .expect(404);
    });
  });

  describe('Throw Error Handler', () => {
    it('incomplete data throws 400 error', async () => {
      return await request(server)
        .post('/register')
        .send({ userName: 'trevor', password: '12345' })
        .expect('Content-Type', /application\/json/)
        .expect(400);
    });
  });
});
