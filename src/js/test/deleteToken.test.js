import { login } from '../api/auth/login.js';
import { logout } from '../api/auth/logout.js';

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

describe('logout function', () => {
  it('should remove token from browser storage', async () => {
    const email = 'test@example.com';
    const password = 'password';
    await login(email, password);

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'token',
      JSON.stringify('fakeToken'),
    );

    logout();

    expect(localStorageMock.removeItem).toHaveBeenCalledWith('token');
  });
});
