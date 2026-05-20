import React from 'react';
import Icon from '@/components/ui/icon';
import LoginForm from '@/components/extensions/auth-email/LoginForm';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { AuthView } from '@/hooks/useAppAuth';

interface AuthScreenProps {
  authView: AuthView;
  setAuthView: (v: AuthView) => void;
  loginError: string | null;
  setLoginError: (e: string | null) => void;
  regLoading: boolean;
  regForm: { name: string; email: string; password: string; confirm: string };
  setRegForm: (fn: (f: { name: string; email: string; password: string; confirm: string }) => { name: string; email: string; password: string; confirm: string }) => void;
  regError: string | null;
  setRegError: (e: string | null) => void;
  login: (payload: { email: string; password: string }) => Promise<boolean>;
  handleRegister: (e: React.FormEvent) => Promise<void>;
}

export default function AuthScreen({
  authView,
  setAuthView,
  loginError,
  setLoginError,
  regLoading,
  regForm,
  setRegForm,
  regError,
  setRegError,
  login,
  handleRegister,
}: AuthScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-4">
            <Icon name="Heart" className="text-primary-foreground" size={32} />
          </div>
          <h1 className="text-3xl font-bold mb-2">Зона роста</h1>
          <p className="text-muted-foreground">Комплекс оздоровительных упражнений для офиса</p>
        </div>

        {authView === 'login' && (
          <LoginForm
            onLogin={login}
            isLoading={false}
            error={loginError}
            onRegisterClick={() => { setLoginError(null); setAuthView('register'); }}
          />
        )}

        {authView === 'register' && (
          <Card>
            <CardHeader>
              <CardTitle>Регистрация</CardTitle>
              <CardDescription>Создайте аккаунт для доступа к упражнениям</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reg-name">Имя</Label>
                  <Input id="reg-name" placeholder="Иван Иванов" value={regForm.name}
                    onChange={e => setRegForm(f => ({ ...f, name: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-email">Email</Label>
                  <Input id="reg-email" type="email" placeholder="you@example.com" value={regForm.email}
                    onChange={e => setRegForm(f => ({ ...f, email: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-password">Пароль</Label>
                  <Input id="reg-password" type="password" placeholder="Минимум 6 символов" value={regForm.password}
                    onChange={e => setRegForm(f => ({ ...f, password: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-confirm">Повторите пароль</Label>
                  <Input id="reg-confirm" type="password" placeholder="Повторите пароль" value={regForm.confirm}
                    onChange={e => setRegForm(f => ({ ...f, confirm: e.target.value }))} />
                </div>
                {regError && <p className="text-sm text-destructive">{regError}</p>}
                <Button type="submit" className="w-full" disabled={regLoading}>
                  {regLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                      Регистрация...
                    </span>
                  ) : 'Зарегистрироваться'}
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  Уже есть аккаунт?{' '}
                  <button type="button" className="text-primary underline" onClick={() => { setRegError(null); setAuthView('login'); }}>
                    Войти
                  </button>
                </p>
              </form>
            </CardContent>
          </Card>
        )}

        {authView === 'success' && (
          <Card>
            <CardContent className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <Icon name="CheckCircle" className="text-green-600" size={36} />
              </div>
              <h2 className="text-2xl font-bold">Добро пожаловать!</h2>
              <p className="text-muted-foreground">Аккаунт успешно создан. Входим в систему...</p>
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
