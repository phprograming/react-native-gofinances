import fetchMock from 'jest-fetch-mock';
import { mocked } from 'ts-jest/utils';
import { renderHook, act } from '@testing-library/react-hooks';
import { AuthProvider, useAuth } from './auth';
import { startAsync } from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';

fetchMock.enableMocks();

jest.mock('expo-auth-session');

describe('Auth hook', () => {

  beforeEach(async () => {
    const userCollectionKey = "@gofinances:user";
    await AsyncStorage.removeItem(userCollectionKey);
  });

  it('must be able to sign in with an existing Google account', async () => {
    const userTest = {
      id: 'any_id',
      email: 'paulohbs17@gmail.com',
      name: 'Henrique Barbosa',
      photo: 'any_photo.png'
    };
    
    const googleMocked = mocked(startAsync as any);

    googleMocked.mockReturnValueOnce({
      type: 'success',
      params: {
        access_token: 'any_token',
      }   
    });

    fetchMock.mockResponseOnce(JSON.stringify(userTest));
    const { result } = renderHook(() => useAuth(),{
      wrapper: AuthProvider
    });

    await act(() => result.current.sighInWithGoogle());
    expect(result.current.user.email).toBe(userTest.email);
  });

  it('user should not connect if cancel authentication with Google', async () => {
    const googleMocked = mocked(startAsync as any);

    googleMocked.mockReturnValueOnce({
      type: 'cancel',
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    await act(() => result.current.sighInWithGoogle());
    expect(result.current.user).not.toHaveProperty('id');
  });

  it('should be error with incorrectly Google parameters', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    try {
      await act(() => result.current.sighInWithGoogle());
    } catch {
      expect(result.current.user).toEqual({});
    }

  });
});