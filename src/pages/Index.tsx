import { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { useAppAuth } from '@/hooks/useAppAuth';
import { reminders } from '@/data/appData';
import AuthScreen from '@/components/AuthScreen';
import AppLayout from '@/components/AppLayout';
import {
  requestNotificationPermission,
  scheduleNotification,
  cancelNotification,
  getNotificationStatus,
} from '@/utils/notifications';

export default function Index() {
  const auth = useAppAuth();

  const [activeTab, setActiveTab] = useState('exercises');
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);
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
  };

  const addReminder = (reminder: Omit<typeof reminders[0], 'id'>) => {
    const newId = Math.max(...reminderSettings.map((r) => r.id), 0) + 1;
    setReminderSettings((prev) => [...prev, { ...reminder, id: newId }]);
    toast.success('Напоминание добавлено');
  };

  const deleteReminder = (id: number) => {
    setReminderSettings((prev) => prev.filter((r) => r.id !== id));
    toast.success('Напоминание удалено');
  };

  const totalProgress = (completedExercises.length / 6) * 100;

  useEffect(() => {
    const initNotifications = async () => {
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
      <AuthScreen
        authView={auth.authView}
        setAuthView={auth.setAuthView}
        loginError={auth.loginError}
        setLoginError={auth.setLoginError}
        regLoading={auth.regLoading}
        regForm={auth.regForm}
        setRegForm={auth.setRegForm}
        regError={auth.regError}
        setRegError={auth.setRegError}
        login={auth.login}
        handleRegister={auth.handleRegister}
      />
    );
  }

  return (
    <AppLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      completedExercises={completedExercises}
      totalProgress={totalProgress}
      toggleExercise={toggleExercise}
      reminderSettings={reminderSettings}
      emailNotifications={emailNotifications}
      pushNotifications={pushNotifications}
      setEmailNotifications={setEmailNotifications}
      handlePushNotificationsChange={handlePushNotificationsChange}
      toggleReminder={toggleReminder}
      updateReminderTime={updateReminderTime}
      addReminder={addReminder}
      deleteReminder={deleteReminder}
      feedbackDialog={feedbackDialog}
      setFeedbackDialog={setFeedbackDialog}
      handleFeedbackSubmit={handleFeedbackSubmit}
      user={auth.user!}
      logout={auth.logout}
    />
  );
}