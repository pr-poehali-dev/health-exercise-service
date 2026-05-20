import { useState } from 'react';

export interface AuthUser {
  email: string;
  name: string;
}

export type AuthView = 'login' | 'register' | 'success';

export function useAppAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('auth_user'));
  const [authView, setAuthView] = useState<AuthView>('login');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [regLoading, setRegLoading] = useState(false);
  const [regForm, setRegForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [regError, setRegError] = useState<string | null>(null);

  const user: AuthUser | null = isAuthenticated
    ? {
        email: localStorage.getItem('auth_user') || '',
        name: localStorage.getItem('auth_name') || '',
      }
    : null;

  const login = async (payload: { email: string; password: string }) => {
    if (payload.email === 'artem' && payload.password === 'artem') {
      localStorage.setItem('auth_user', payload.email);
      localStorage.setItem('auth_name', 'Артём');
      setLoginError(null);
      setIsAuthenticated(true);
      return true;
    }
    setLoginError('Неверный логин или пароль');
    return false;
  };

  const logout = () => {
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_name');
    setIsAuthenticated(false);
    setAuthView('login');
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regForm.name.trim()) { setRegError('Введите имя'); return; }
    if (!regForm.email.includes('@')) { setRegError('Введите корректный email'); return; }
    if (regForm.password.length < 6) { setRegError('Пароль должен быть не менее 6 символов'); return; }
    if (regForm.password !== regForm.confirm) { setRegError('Пароли не совпадают'); return; }
    setRegError(null);
    setRegLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setRegLoading(false);
    setAuthView('success');
    setTimeout(() => {
      localStorage.setItem('auth_user', regForm.email);
      localStorage.setItem('auth_name', regForm.name);
      setIsAuthenticated(true);
    }, 2000);
  };

  return {
    isAuthenticated,
    authView,
    setAuthView,
    loginError,
    setLoginError,
    regLoading,
    regForm,
    setRegForm,
    regError,
    setRegError,
    user,
    login,
    logout,
    handleRegister,
  };
}
