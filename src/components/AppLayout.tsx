import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import ExercisesTab from '@/components/ExercisesTab';
import RemindersTab from '@/components/RemindersTab';
import ProgressTab from '@/components/ProgressTab';
import { ReportsTab, MethodologyTab, ProfileTab } from '@/components/OtherTabs';
import FeedbackDialog from '@/components/FeedbackDialog';
import { exercises, weeklyStats } from '@/data/appData';
import { AuthUser } from '@/hooks/useAppAuth';

interface Reminder {
  id: number;
  time: string;
  active: boolean;
  label: string;
  description: string;
  isPinned: boolean;
}

interface AppLayoutProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  completedExercises: number[];
  totalProgress: number;
  toggleExercise: (id: number) => void;
  reminderSettings: Reminder[];
  emailNotifications: boolean;
  pushNotifications: boolean;
  setEmailNotifications: (v: boolean) => void;
  handlePushNotificationsChange: (v: boolean) => void;
  toggleReminder: (id: number) => void;
  updateReminderTime: (id: number, time: string) => void;
  addReminder: (reminder: Omit<Reminder, 'id'>) => void;
  deleteReminder: (id: number) => void;
  feedbackDialog: { open: boolean; exerciseId: number | null };
  setFeedbackDialog: (v: { open: boolean; exerciseId: number | null }) => void;
  handleFeedbackSubmit: (feedback: { rating: number; comment: string; difficulty: string }) => void;
  user: AuthUser;
  logout: () => void;
}

export default function AppLayout({
  activeTab,
  setActiveTab,
  completedExercises,
  totalProgress,
  toggleExercise,
  reminderSettings,
  emailNotifications,
  pushNotifications,
  setEmailNotifications,
  handlePushNotificationsChange,
  toggleReminder,
  updateReminderTime,
  addReminder,
  deleteReminder,
  feedbackDialog,
  setFeedbackDialog,
  handleFeedbackSubmit,
  user,
  logout,
}: AppLayoutProps) {
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
              <Button variant="outline" size="sm" onClick={logout}>
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
            <ReportsTab completedCount={completedExercises.length} />
          </TabsContent>

          <TabsContent value="methodology">
            <MethodologyTab />
          </TabsContent>

          <TabsContent value="profile">
            <ProfileTab user={user} onLogout={logout} completedCount={completedExercises.length} />
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