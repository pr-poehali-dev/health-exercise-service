import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

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
  { id: 1, time: '10:00', active: true, label: 'Утренняя разминка' },
  { id: 2, time: '14:00', active: true, label: 'Обеденная гимнастика' },
  { id: 3, time: '17:00', active: false, label: 'Вечерняя растяжка' },
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
                <Icon name="TrendingUp" className="text-primary-foreground" size={24} />
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
          <h2 className="text-3xl font-bold mb-2">Здоровье в офисе</h2>
          <p className="text-muted-foreground">
            Комплексная система упражнений для поддержания здоровья сотрудников
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

          <TabsContent value="exercises" className="space-y-6">
            <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-1">Ваш прогресс сегодня</h3>
                  <p className="text-sm text-muted-foreground">
                    Выполнено {completedExercises.length} из {exercises.length} упражнений
                  </p>
                </div>
                <div className="text-4xl font-bold text-primary">{Math.round(totalProgress)}%</div>
              </div>
              <Progress value={totalProgress} className="h-3" />
            </Card>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {exercises.map((exercise) => {
                const isCompleted = completedExercises.includes(exercise.id);
                return (
                  <Card
                    key={exercise.id}
                    className={`p-6 transition-all hover:shadow-lg hover:shadow-primary/5 cursor-pointer ${
                      isCompleted ? 'border-primary bg-primary/5' : ''
                    }`}
                    onClick={() => toggleExercise(exercise.id)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <Badge
                        variant={
                          exercise.difficulty === 'Легко'
                            ? 'secondary'
                            : exercise.difficulty === 'Средне'
                            ? 'default'
                            : 'destructive'
                        }
                      >
                        {exercise.difficulty}
                      </Badge>
                      {isCompleted && (
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                          <Icon name="Check" className="text-primary-foreground" size={18} />
                        </div>
                      )}
                    </div>

                    <h3 className="text-lg font-semibold mb-2">{exercise.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{exercise.description}</p>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Icon name="Clock" size={14} />
                        {exercise.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Tag" size={14} />
                        {exercise.category}
                      </div>
                    </div>

                    <div className="space-y-1 mb-4">
                      {exercise.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <Icon name="Check" size={12} className="text-primary mt-0.5" />
                          {benefit}
                        </div>
                      ))}
                    </div>

                    <Button
                      variant={isCompleted ? 'secondary' : 'default'}
                      className="w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExercise(exercise.id);
                      }}
                    >
                      <Icon name={isCompleted ? 'RotateCcw' : 'Play'} className="mr-2" size={16} />
                      {isCompleted ? 'Отменить' : 'Начать упражнение'}
                    </Button>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="reminders" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Icon name="Bell" size={24} />
                Настройка напоминаний
              </h3>
              <p className="text-muted-foreground mb-6">
                Система автоматически отправит push-уведомления и email-напоминания в указанное время
              </p>

              <div className="space-y-4">
                {reminderSettings.map((reminder) => (
                  <Card key={reminder.id} className="p-4 bg-card/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon name="Clock" className="text-primary" size={20} />
                        </div>
                        <div>
                          <p className="font-semibold">{reminder.label}</p>
                          <p className="text-2xl font-bold text-primary">{reminder.time}</p>
                        </div>
                      </div>
                      <Switch
                        checked={reminder.active}
                        onCheckedChange={() => toggleReminder(reminder.id)}
                      />
                    </div>
                  </Card>
                ))}
              </div>

              <Button className="w-full mt-6" variant="outline">
                <Icon name="Plus" className="mr-2" size={18} />
                Добавить напоминание
              </Button>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <Icon name="Mail" className="text-primary-foreground" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Email-напоминания активны</h4>
                  <p className="text-sm text-muted-foreground">
                    Вы будете получать ежедневные напоминания на email с расписанием упражнений и полезными советами
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Icon name="TrendingUp" size={24} />
                Прогресс за неделю
              </h3>

              <div className="grid grid-cols-7 gap-2 mb-8">
                {weeklyStats.map((stat) => (
                  <div key={stat.day} className="text-center">
                    <div
                      className="h-32 bg-card border border-border rounded-lg mb-2 relative overflow-hidden"
                    >
                      <div
                        className="absolute bottom-0 left-0 right-0 bg-primary transition-all"
                        style={{
                          height: stat.total > 0 ? `${(stat.completed / stat.total) * 100}%` : '0%',
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center font-bold text-lg">
                        {stat.completed}
                      </div>
                    </div>
                    <p className="text-sm font-medium">{stat.day}</p>
                  </div>
                ))}
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                      <Icon name="Flame" className="text-primary-foreground" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Всего выполнено</p>
                      <p className="text-2xl font-bold">16 упр.</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 bg-gradient-to-br from-secondary/10 to-secondary/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                      <Icon name="Trophy" className="text-primary-foreground" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Серия дней</p>
                      <p className="text-2xl font-bold">5 дней</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 bg-gradient-to-br from-accent/10 to-accent/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                      <Icon name="Target" className="text-primary-foreground" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Время занятий</p>
                      <p className="text-2xl font-bold">54 мин</p>
                    </div>
                  </div>
                </Card>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Icon name="FileText" size={24} />
                Система отчетности
              </h3>
              <p className="text-muted-foreground mb-6">
                Автоматическая генерация отчетов с анализом выполнения программы и рекомендациями
              </p>

              <div className="space-y-4">
                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer bg-card/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon name="Calendar" className="text-primary" size={20} />
                      </div>
                      <div>
                        <p className="font-semibold">Недельный отчет</p>
                        <p className="text-sm text-muted-foreground">07.12.2024 - 14.12.2024</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Icon name="Download" size={18} />
                    </Button>
                  </div>
                </Card>

                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer bg-card/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                        <Icon name="Calendar" className="text-secondary" size={20} />
                      </div>
                      <div>
                        <p className="font-semibold">Месячный отчет</p>
                        <p className="text-sm text-muted-foreground">Ноябрь 2024</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Icon name="Download" size={18} />
                    </Button>
                  </div>
                </Card>

                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer bg-card/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Icon name="BarChart" className="text-accent" size={20} />
                      </div>
                      <div>
                        <p className="font-semibold">Итоговый отчет</p>
                        <p className="text-sm text-muted-foreground">Анализ за квартал</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Icon name="Download" size={18} />
                    </Button>
                  </div>
                </Card>
              </div>

              <Button className="w-full mt-6">
                <Icon name="FileText" className="mr-2" size={18} />
                Сгенерировать новый отчет
              </Button>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Icon name="Lightbulb" size={20} />
                Рекомендации на основе анализа
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Icon name="CheckCircle2" size={16} className="text-primary mt-0.5" />
                  <span>Увеличить частоту упражнений для глаз до 4 раз в день</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="CheckCircle2" size={16} className="text-primary mt-0.5" />
                  <span>Добавить упражнения для запястий в утреннюю разминку</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="CheckCircle2" size={16} className="text-primary mt-0.5" />
                  <span>Рекомендуется выполнять дыхательную гимнастику перед обедом</span>
                </li>
              </ul>
            </Card>
          </TabsContent>

          <TabsContent value="methodology" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Icon name="BookOpen" size={24} />
                Методические рекомендации
              </h3>
              <p className="text-muted-foreground mb-6">
                Комплексное руководство по применению программы оздоровительных упражнений в офисной среде
              </p>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3 text-lg flex items-center gap-2">
                    <Icon name="Target" size={20} />
                    Цели программы
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-7">
                    <li>• Снижение профессиональных заболеваний опорно-двигательного аппарата</li>
                    <li>• Улучшение общего самочувствия и работоспособности сотрудников</li>
                    <li>• Профилактика синдрома компьютерного зрения</li>
                    <li>• Снижение уровня стресса и повышение концентрации внимания</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-lg flex items-center gap-2">
                    <Icon name="ClipboardList" size={20} />
                    Рекомендуемый режим выполнения
                  </h4>
                  <div className="space-y-3">
                    <Card className="p-4 bg-card/50">
                      <p className="font-medium mb-1">Утро (9:00-10:00)</p>
                      <p className="text-sm text-muted-foreground">
                        Комплексная разминка шеи, плеч и спины — 8-10 минут
                      </p>
                    </Card>
                    <Card className="p-4 bg-card/50">
                      <p className="font-medium mb-1">День (14:00-15:00)</p>
                      <p className="text-sm text-muted-foreground">
                        Гимнастика для глаз и дыхательные упражнения — 5-7 минут
                      </p>
                    </Card>
                    <Card className="p-4 bg-card/50">
                      <p className="font-medium mb-1">Вечер (17:00-18:00)</p>
                      <p className="text-sm text-muted-foreground">
                        Растяжка всего тела и упражнения для ног — 10-12 минут
                      </p>
                    </Card>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-lg flex items-center gap-2">
                    <Icon name="Users" size={20} />
                    Организация в офисе
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-7">
                    <li>• Назначить ответственного за здоровье в каждом отделе</li>
                    <li>• Выделить специальную зону для выполнения упражнений</li>
                    <li>• Проводить групповые занятия 2-3 раза в неделю</li>
                    <li>• Организовать систему поощрений для активных участников</li>
                    <li>• Включить время на упражнения в рабочий график</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-lg flex items-center gap-2">
                    <Icon name="AlertCircle" size={20} />
                    Противопоказания
                  </h4>
                  <Card className="p-4 bg-destructive/5 border-destructive/20">
                    <p className="text-sm text-muted-foreground">
                      Перед началом программы рекомендуется консультация с врачом при наличии хронических заболеваний
                      опорно-двигательного аппарата, сердечно-сосудистой системы или в период обострения любых
                      заболеваний.
                    </p>
                  </Card>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Icon name="User" size={24} />
                Профиль пользователя
              </h3>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="User" className="text-primary" size={36} />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">Иван Петров</p>
                    <p className="text-sm text-muted-foreground">ivan.petrov@company.com</p>
                    <Badge className="mt-2">Активный участник</Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email для уведомлений</label>
                    <input
                      type="email"
                      className="w-full p-3 rounded-lg bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="your@email.com"
                      defaultValue="ivan.petrov@company.com"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-card/50 rounded-lg">
                    <div>
                      <p className="font-medium">Push-уведомления</p>
                      <p className="text-sm text-muted-foreground">Получать уведомления в браузере</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-card/50 rounded-lg">
                    <div>
                      <p className="font-medium">Email-рассылка</p>
                      <p className="text-sm text-muted-foreground">Ежедневные напоминания на почту</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-card/50 rounded-lg">
                    <div>
                      <p className="font-medium">Статистика</p>
                      <p className="text-sm text-muted-foreground">Еженедельные отчеты о прогрессе</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <Button className="w-full">
                  <Icon name="Save" className="mr-2" size={18} />
                  Сохранить изменения
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t border-border mt-16 py-8 bg-card/30">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 Зона роста. Система оздоровительных упражнений для офисных сотрудников</p>
        </div>
      </footer>
    </div>
  );
}
