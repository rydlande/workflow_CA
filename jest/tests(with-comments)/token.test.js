import { login } from '../../api/auth/login.js'; // Replace with the correct path to your module
import { apiUrl } from '../../api/constants.js';

// Mock fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({ accessToken: 'fakeToken', otherData: 'example' }),
  }),
);

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};

global.localStorage = localStorageMock;

describe('login function', () => {
  // Clear mocks after test
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should store token in browser storage', async () => {
    const email = 'test@example.com';
    const password = 'password';

    const profile = await login(email, password);

    //fetch was correctly called with URL
    expect(global.fetch).toHaveBeenCalledWith(`${apiUrl}/social/auth/login`, {
      method: 'post',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    //localStorage.setItem stores token
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'token',
      JSON.stringify('fakeToken'),
    );

    //profile returned by login function is correct
    expect(profile).toEqual({ otherData: 'example' });
  });
});
