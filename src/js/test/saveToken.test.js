import { login } from '../api/auth/login.js'; // Replace with the correct path to your module
import { apiUrl } from '../api/constants.js';

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({ accessToken: 'fakeToken', otherData: 'example' }),
  }),
);

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};

global.localStorage = localStorageMock;

describe('login function', () => {
  it('should store token in browser storage', async () => {
    const email = 'test@example.com';
    const password = 'password';

    const profile = await login(email, password);

    expect(global.fetch).toHaveBeenCalledWith(`${apiUrl}/social/auth/login`, {
      method: 'post',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'token',
      JSON.stringify('fakeToken'),
    );

    expect(profile).toEqual({ otherData: 'example' });
  });
});
