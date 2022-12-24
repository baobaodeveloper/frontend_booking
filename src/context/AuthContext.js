import { useEffect, useReducer } from 'react';
import { createContext } from 'react';

const INITIAL_STATE = {
  user:
    localStorage.getItem('user') !== 'undefined'
      ? JSON.parse(localStorage.getItem('user'))
      : null,
  loading: false,
  error: null,
  visibleModal: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        user: null,
        loading: true,
        error: null,
        visibleModal: true,
        registerModal: false,
      };
    case 'LOGIN_SUCCESS':
      return {
        user: action.payload,
        loading: false,
        error: null,
        visibleModal: false,
        registerModal: false,
      };
    case 'LOGIN_FAIL':
      return {
        user: null,
        loading: false,
        error: action.payload,
        visibleModal: true,
        registerModal: false,
      };
    case 'LOGOUT':
      return {
        user: null,
        loading: false,
        error: null,
        visibleModal: false,
        registerModal: false,
      };
    case 'CLOSE_MODAL':
      return { ...state, visibleModal: false };
    case 'OPEN_MODAL':
      return { ...state, visibleModal: true };
    case 'CLOSE_REGISTER':
      return { ...state, registerModal: false };
    case 'OPEN_REGISTER':
      return { ...state, registerModal: true };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.user));
  }, [state.user]);
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        visibleModal: state.visibleModal,
        registerModal: state.registerModal,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
