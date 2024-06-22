import { expect, test, describe, beforeEach, afterEach } from 'vitest';
import fetch from 'node-fetch';
import app from '../src/backend/database';

describe('Server API Tests', () => {
  let server: any;

  beforeEach(async () => {
    server = await app.listen(3001);
  });

  afterEach(async () => {
    await server.close();
  });

  test('POST /personnel-login should handle incorrect credentials', async () => {
    const response = await fetch('http://localhost:3000/personnel-login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'invalid_username',
        password: 'invalid_password',
      }),
    });

    const data = await response.json();
    expect(response.status).toBe(401);
    expect(data).toHaveProperty('error', 'Username not found');
  });

  test('GET /protected should return 404 Unauthorized without session', async () => {
    const response = await fetch('http://localhost:3000/protected');
    expect(response.status).toBe(404);
  });

});
