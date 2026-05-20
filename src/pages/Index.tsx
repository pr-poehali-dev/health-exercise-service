import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import ExercisesTab from '@/components/ExercisesTab';
import RemindersTab from '@/components/RemindersTab';
import ProgressTab from '@/components/ProgressTab';
import { ReportsTab, MethodologyTab, ProfileTab } from '@/components/OtherTabs';
import FeedbackDialog from '@/components/FeedbackDialog';
import LoginForm from '@/components/extensions/auth-email/LoginForm';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  requestNotificationPermission,
  scheduleNotification,
  cancelNotification,
  getNotificationStatus,
} from '@/utils/notifications';

const exercises = [
  {
    id: 1,
    title: 'Разминка шеи',
    duration: '3 мин',
    category: 'Шея и плечи',
    difficulty: 'Легко',
    videoUrl: 'https://example.com/video1',
    description: 'Медленные повороты головы влево-вправо, наклоны вперед-назад. Снимает напряжение после работы за компьютером.',
    benefits: ['Снижает головные боли', 'Улучшает кровообращение', 'Снимает зажимы'],
    detailedInfo: 'Медленные повороты головы влево-вправо, наклоны вперед-назад. Выполняйте упражнения плавно и без резких движений.',
  },
  {
    id: 2,
    title: 'Растяжка спины',
    duration: '5 мин',
    category: 'Спина',
    difficulty: 'Средне',
    videoUrl: 'https://example.com/video2',
    description: 'Комплекс упражнений для расслабления мышц спины. Выполняется сидя на стуле.',
    benefits: ['Укрепляет мышечный корсет', 'Улучшает осанку', 'Снимает боль'],
    detailedInfo: 'Повороты телом вперед-назад, вправо-влево, вертикальные (растем вверх), ротационные (поворотные).',
  },
  {
    id: 3,
    title: 'Гимнастика для глаз',
    duration: '2 мин',
    category: 'Глаза',
    difficulty: 'Легко',
    videoUrl: 'https://example.com/video3',
    description: 'Упражнения для снятия усталости глаз при долгой работе за монитором.',
    benefits: ['Снимает напряжение глаз', 'Улучшает фокусировку', 'Предотвращает сухость'],
    detailedInfo: 'Стреляем глазами (глазами нужно чертить диагональные линии, начертить взглядом ромб)\n\nГлаза Совы (Суть занятия состоит в крепком зажмуривании глаз на пять секунд и широком распахивании век. Упражнение делается 10 раз)',
  },
  {
    id: 4,
    title: 'Разминка запястий',
    duration: '3 мин',
    category: 'Руки',
    difficulty: 'Легко',
    videoUrl: 'https://example.com/video4',
    description: 'Вращения и растяжка запястий для профилактики туннельного синдрома.',
    benefits: ['Предотвращает туннельный синдром', 'Улучшает подвижность', 'Снимает онемение'],
    detailedInfo: 'Вытяните руку и выпрямите все пальцы вперёд. Медленно сжимайте руку в кулак так, чтобы большой палец оказался снаружи. Поочерёдно сжимайте пальцы, вращайте кисти. Делайте упражнение плавно.',
  },
  {
    id: 5,
    title: 'Упражнения для ног',
    duration: '4 мин',
    category: 'Ноги',
    difficulty: 'Средне',
    videoUrl: 'https://example.com/video5',
    description: 'Улучшает кровообращение в ногах при сидячей работе.',
    benefits: ['Улучшает кровообращение', 'Снимает отечность', 'Укрепляет мышцы'],
    detailedInfo: 'Потягушечки (Вытяните ноги, потяните носки на себя, оставив на полу только пятки. Почувствуйте, как напряглись икры ног.)\n\nПовороты (Выпрямите ноги и поднимите их параллельно полу (под бедра можно подложить руки или пару книг). За счет движения в голеностопном суставе описывайте ступнями круги, сначала наружу, потом вовнутрь.)',
  },
  {
    id: 6,
    title: 'Дыхательная гимнастика',
    duration: '5 мин',
    category: 'Дыхание',
    difficulty: 'Легко',
    videoUrl: 'https://example.com/video6',
    description: 'Техники правильного дыхания для снижения стресса и повышения концентрации.',
    benefits: ['Снижает стресс', 'Повышает концентрацию', 'Улучшает самочувствие'],
    detailedInfo: 'Дыхание через одну ноздрю. Дыхание грудь вперед.\n\nДыхание 4-7-8: Прижми кончик языка к небу сразу за зубами верхней челюсти. Полностью выдохни воздух через рот, закрой рот и вдохни через нос, считая до 4-х. Затем задержи дыхание, считая до 7-ми. Потом опять выдохни через рот, считая про себя до 8-ми. Это один цикл. Делай три таких цикла 1-2 раза в день.',
  },
];

const reminders = [
  { id: 1, time: '10:00', active: true, label: 'Утренняя разминка', description: 'Разминка шеи и плеч', isPinned: true },
  { id: 2, time: '14:00', active: true, label: 'Обеденная гимнастика', description: 'Растяжка спины', isPinned: true },
  { id: 3, time: '17:00', active: true, label: 'Вечерняя растяжка', description: 'Упражнения для ног', isPinned: true },
];

const weeklyStats = [
  { day: 'Пн', completed: 3, total: 4 },
  { day: 'Вт', completed: 4, total: 4 },
  { day: 'Ср', completed: 2, total: 4 },
  { day: 'Чт', completed: 4, total: 4 },
  { day: 'Пт', completed: 3, total: 4 },
  { day: 'Сб', completed: 0, total: 0 },
  { day: 'Вс', completed: 0, total: 0 },
];

export default function Index() {

  const [activeTab, setActiveTab] = useState('exercises');
  const [completedExercises, setCompletedExercises] = useState<number[]>([1, 2]);
  const [reminderSettings, setReminderSettings] = useState(reminders);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [feedbackDialog, setFeedbackDialog] = useState<{ open: boolean; exerciseId: number | null }>({ open: false, exerciseId: null });
  const [exerciseFeedback, setExerciseFeedback] = useState<Record<number, { rating: number; comment: string; difficulty: string }>>({});
  const [userProfile, setUserProfile] = useState({
    name: 'Сергей Иванов',
    email: 'sergey.ivanov@company.com',
    position: 'Менеджер проектов',
    department: 'IT-разработка',
  });
  const notificationTimeouts = useRef<Map<number, number>>(new Map());

  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('auth_user'));
  const [authView, setAuthView] = useState<'login' | 'register' | 'success'>('login');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [regLoading, setRegLoading] = useState(false);
  const [regForm, setRegForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [regError, setRegError] = useState<string | null>(null);

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

  const auth = {
    isLoading: false,
    isAuthenticated,
    logout: () => {
      localStorage.removeItem('auth_user');
      localStorage.removeItem('auth_name');
      setIsAuthenticated(false);
      setAuthView('login');
    },
    login: async (payload: { email: string; password: string }) => {
      if (payload.email === 'artem' && payload.password === 'artem') {
        localStorage.setItem('auth_user', payload.email);
        localStorage.setItem('auth_name', 'Артём');
        setLoginError(null);
        setIsAuthenticated(true);
        return true;
      }
      setLoginError('Неверный логин или пароль');
      return false;
    },
  };

  const toggleExercise = (id: number) => {
    const wasCompleted = completedExercises.includes(id);
    
    if (wasCompleted) {
      setCompletedExercises((prev) => prev.filter((exerciseId) => exerciseId !== id));
      toast.success('Упражнение убрано из выполненных');
    } else {
      setCompletedExercises((prev) => [...prev, id]);
      setFeedbackDialog({ open: true, exerciseId: id });
    }
  };

  const handleFeedbackSubmit = (feedback: { rating: number; comment: string; difficulty: string }) => {
    if (feedbackDialog.exerciseId) {
      setExerciseFeedback((prev) => ({
        ...prev,
        [feedbackDialog.exerciseId!]: feedback,
      }));
      toast.success('Спасибо за отзыв! 🎉');
    }
  };

  const toggleReminder = (id: number) => {
    setReminderSettings((prev) =>
      prev.map((reminder) =>
        reminder.id === id ? { ...reminder, active: !reminder.active } : reminder
      )
    );
    toast.success('Настройки напоминания обновлены');
  };

  const updateReminderTime = (id: number, time: string) => {
    setReminderSettings((prev) =>
      prev.map((reminder) =>
        reminder.id === id ? { ...reminder, time } : reminder
      )
    );
    toast.success('Время напоминания изменено');
  };

  const addReminder = (reminder: { label: string; description: string; time: string }) => {
    const newId = Math.max(...reminderSettings.map((r) => r.id), 0) + 1;
    setReminderSettings((prev) => [
      ...prev,
      { id: newId, ...reminder, active: true, isPinned: false },
    ]);
  };

  const deleteReminder = (id: number) => {
    const timeoutId = notificationTimeouts.current.get(id);
    if (timeoutId) {
      cancelNotification(timeoutId);
      notificationTimeouts.current.delete(id);
    }
    setReminderSettings((prev) => prev.filter((r) => r.id !== id));
    toast.success('Напоминание удалено');
  };

  useEffect(() => {
    const initNotifications = async () => {
      if (pushNotifications) {
        const status = getNotificationStatus();
        if (status === 'default') {
          const granted = await requestNotificationPermission();
          if (granted) {
            toast.success('Уведомления включены');
          } else {
            toast.error('Разрешите уведомления в настройках браузера');
            setPushNotifications(false);
          }
        } else if (status === 'unsupported') {
          toast.error('Ваш браузер не поддерживает уведомления');
          setPushNotifications(false);
        } else if (status === 'denied') {
          toast.error('Уведомления заблокированы. Разрешите их в настройках браузера');
          setPushNotifications(false);
        }
      }
    };

    initNotifications();
  }, []);

  useEffect(() => {
    notificationTimeouts.current.forEach((timeoutId) => {
      cancelNotification(timeoutId);
    });
    notificationTimeouts.current.clear();

    if (pushNotifications && getNotificationStatus() === 'granted') {
      reminderSettings.forEach((reminder) => {
        if (reminder.active) {
          const timeoutId = scheduleNotification(
            reminder.time,
            reminder.label,
            reminder.description,
            () => {
              toast.info(`Время для: ${reminder.label}`);
              const newTimeoutId = scheduleNotification(
                reminder.time,
                reminder.label,
                reminder.description
              );
              if (newTimeoutId !== null) {
                notificationTimeouts.current.set(reminder.id, newTimeoutId);
              }
            }
          );
          if (timeoutId !== null) {
            notificationTimeouts.current.set(reminder.id, timeoutId);
          }
        }
      });
    }

    return () => {
      notificationTimeouts.current.forEach((timeoutId) => {
        cancelNotification(timeoutId);
      });
      notificationTimeouts.current.clear();
    };
  }, [reminderSettings, pushNotifications]);

  const totalProgress = (completedExercises.length / exercises.length) * 100;

  const handlePushNotificationsChange = async (enabled: boolean) => {
    if (enabled) {
      const granted = await requestNotificationPermission();
      if (granted) {
        setPushNotifications(true);
        toast.success('Уведомления включены');
      } else {
        toast.error('Разрешите уведомления в настройках браузера');
      }
    } else {
      setPushNotifications(false);
      toast.info('Уведомления отключены');
    }
  };

  if (!auth.isAuthenticated) {
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
              onLogin={auth.login}
              isLoading={auth.isLoading}
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

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <Icon name="Heart" className="text-primary-foreground" size={24} />
              </div>
              <h1 className="text-2xl font-bold text-foreground">Зона роста</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm text-muted-foreground">Прогресс дня</p>
                <p className="text-lg font-semibold text-primary">{completedExercises.length}/{exercises.length}</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setActiveTab('profile')}>
                <Icon name="User" className="mr-2" size={16} />
                Профиль
              </Button>
              <Button variant="outline" size="sm" onClick={auth.logout}>
                <Icon name="LogOut" className="mr-2" size={16} />
                Выход
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Комплекс оздоровительных упражнений</h2>
          <p className="text-muted-foreground">
            Для поддержания здоровья и продуктивности сотрудников офиса
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 bg-card border border-border">
            <TabsTrigger value="exercises" className="gap-2">
              <Icon name="Dumbbell" size={16} />
              <span className="hidden sm:inline">Упражнения</span>
            </TabsTrigger>
            <TabsTrigger value="reminders" className="gap-2">
              <Icon name="Bell" size={16} />
              <span className="hidden sm:inline">Напоминания</span>
            </TabsTrigger>
            <TabsTrigger value="progress" className="gap-2">
              <Icon name="BarChart3" size={16} />
              <span className="hidden sm:inline">Прогресс</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="gap-2">
              <Icon name="FileText" size={16} />
              <span className="hidden sm:inline">Отчеты</span>
            </TabsTrigger>
            <TabsTrigger value="methodology" className="gap-2">
              <Icon name="BookOpen" size={16} />
              <span className="hidden sm:inline">Методика</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="gap-2">
              <Icon name="User" size={16} />
              <span className="hidden sm:inline">Профиль</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="exercises">
            <ExercisesTab
              exercises={exercises}
              completedExercises={completedExercises}
              toggleExercise={toggleExercise}
              totalProgress={totalProgress}
            />
          </TabsContent>

          <TabsContent value="reminders">
            <RemindersTab
              reminderSettings={reminderSettings}
              emailNotifications={emailNotifications}
              pushNotifications={pushNotifications}
              setEmailNotifications={setEmailNotifications}
              setPushNotifications={handlePushNotificationsChange}
              toggleReminder={toggleReminder}
              updateReminderTime={updateReminderTime}
              addReminder={addReminder}
              deleteReminder={deleteReminder}
            />
          </TabsContent>

          <TabsContent value="progress">
            <ProgressTab weeklyStats={weeklyStats} />
          </TabsContent>

          <TabsContent value="reports">
            <ReportsTab />
          </TabsContent>

          <TabsContent value="methodology">
            <MethodologyTab />
          </TabsContent>

          <TabsContent value="profile">
            <ProfileTab user={auth.user!} onLogout={auth.logout} />
          </TabsContent>
        </Tabs>
      </main>

      <FeedbackDialog
        isOpen={feedbackDialog.open}
        onClose={() => setFeedbackDialog({ open: false, exerciseId: null })}
        exerciseTitle={
          exercises.find((ex) => ex.id === feedbackDialog.exerciseId)?.title || ''
        }
        onSubmit={handleFeedbackSubmit}
      />
    </div>
  );
}