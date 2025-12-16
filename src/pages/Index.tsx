import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import ExercisesTab from '@/components/ExercisesTab';
import RemindersTab from '@/components/RemindersTab';
import ProgressTab from '@/components/ProgressTab';
import { ReportsTab, MethodologyTab, ProfileTab } from '@/components/OtherTabs';

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
  { id: 1, time: '10:00', active: true, label: 'Утренняя разминка', description: 'Разминка шеи и плеч' },
  { id: 2, time: '14:00', active: true, label: 'Обеденная гимнастика', description: 'Растяжка спины' },
  { id: 3, time: '17:00', active: false, label: 'Вечерняя растяжка', description: 'Упражнения для ног' },
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

  const toggleExercise = (id: number) => {
    setCompletedExercises((prev) =>
      prev.includes(id) ? prev.filter((exerciseId) => exerciseId !== id) : [...prev, id]
    );
    toast.success(
      completedExercises.includes(id) ? 'Упражнение убрано из выполненных' : 'Упражнение выполнено! 🎉'
    );
  };

  const toggleReminder = (id: number) => {
    setReminderSettings((prev) =>
      prev.map((reminder) =>
        reminder.id === id ? { ...reminder, active: !reminder.active } : reminder
      )
    );
    toast.success('Настройки напоминания обновлены');
  };

  const totalProgress = (completedExercises.length / exercises.length) * 100;

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
              <Button variant="outline" size="sm">
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
              <Icon name="Settings" size={16} />
              <span className="hidden sm:inline">Настройки</span>
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
              setPushNotifications={setPushNotifications}
              toggleReminder={toggleReminder}
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
            <ProfileTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}