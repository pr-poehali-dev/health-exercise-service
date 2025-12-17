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
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5 bg-card border border-border">
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
            <ProfileTab userProfile={userProfile} onProfileUpdate={setUserProfile} />
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