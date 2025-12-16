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
              <h1 className="text-2xl font-bold text-foreground">Офисное Здоровье</h1>
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
                          <Icon name="Check" className="text-primary-foreground" size={20} />
                        </div>
                      )}
                    </div>

                    <h3 className="text-xl font-semibold mb-2">{exercise.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{exercise.description}</p>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Icon name="Clock" size={16} />
                        {exercise.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Tag" size={16} />
                        {exercise.category}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Польза:</p>
                      <ul className="space-y-1">
                        {exercise.benefits.map((benefit, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button className="w-full mt-4" variant={isCompleted ? 'outline' : 'default'}>
                      <Icon name="Play" className="mr-2" size={16} />
                      {isCompleted ? 'Повторить' : 'Начать упражнение'}
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
                Настройте автоматические напоминания о времени упражнений
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between p-4 bg-card border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Icon name="Mail" size={20} className="text-primary" />
                    <div>
                      <p className="font-medium">Email-уведомления</p>
                      <p className="text-sm text-muted-foreground">Получать напоминания на почту</p>
                    </div>
                  </div>
                  <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                </div>

                <div className="flex items-center justify-between p-4 bg-card border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Icon name="Smartphone" size={20} className="text-primary" />
                    <div>
                      <p className="font-medium">Push-уведомления</p>
                      <p className="text-sm text-muted-foreground">Получать уведомления в браузере</p>
                    </div>
                  </div>
                  <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
                </div>
              </div>

              <div className="space-y-4">
                {reminderSettings.map((reminder) => (
                  <div
                    key={reminder.id}
                    className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-xl font-bold text-primary">{reminder.time}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-lg">{reminder.label}</p>
                        <p className="text-sm text-muted-foreground">{reminder.description}</p>
                      </div>
                    </div>
                    <Switch checked={reminder.active} onCheckedChange={() => toggleReminder(reminder.id)} />
                  </div>
                ))}
              </div>

              <Button className="w-full mt-6" variant="outline">
                <Icon name="Plus" className="mr-2" size={16} />
                Добавить напоминание
              </Button>
            </Card>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Icon name="TrendingUp" size={24} />
                Ваш прогресс
              </h3>

              <div className="grid gap-4 md:grid-cols-3 mb-8">
                <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <p className="text-sm text-muted-foreground mb-1">Всего выполнено</p>
                  <p className="text-3xl font-bold text-primary">64</p>
                  <p className="text-xs text-muted-foreground mt-1">упражнений</p>
                </div>
                <div className="p-4 bg-card rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground mb-1">Текущая серия</p>
                  <p className="text-3xl font-bold">4</p>
                  <p className="text-xs text-muted-foreground mt-1">дня подряд</p>
                </div>
                <div className="p-4 bg-card rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground mb-1">Среднее в день</p>
                  <p className="text-3xl font-bold">3.2</p>
                  <p className="text-xs text-muted-foreground mt-1">упражнений</p>
                </div>
              </div>

              <h4 className="font-semibold mb-4">Статистика недели</h4>
              <div className="grid grid-cols-7 gap-2">
                {weeklyStats.map((stat) => (
                  <div key={stat.day} className="text-center">
                    <div className="mb-2 text-sm font-medium text-muted-foreground">{stat.day}</div>
                    <div
                      className="h-24 bg-card border border-border rounded-lg flex flex-col items-center justify-center"
                      style={{
                        backgroundColor:
                          stat.total > 0
                            ? `hsl(var(--primary) / ${(stat.completed / stat.total) * 0.3})`
                            : undefined,
                      }}
                    >
                      <div className="text-lg font-bold">
                        {stat.completed}/{stat.total}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Icon name="FileText" size={24} />
                Отчеты и аналитика
              </h3>
              <p className="text-muted-foreground mb-6">
                Детальная отчетность по выполнению программы
              </p>

              <div className="space-y-4">
                <div className="p-4 bg-card border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">Недельный отчет</h4>
                    <Badge>Доступен</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Сводка выполненных упражнений за последние 7 дней
                  </p>
                  <Button variant="outline" className="w-full">
                    <Icon name="Download" className="mr-2" size={16} />
                    Скачать отчет
                  </Button>
                </div>

                <div className="p-4 bg-card border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">Месячный отчет</h4>
                    <Badge>Доступен</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Подробная статистика и рекомендации за месяц
                  </p>
                  <Button variant="outline" className="w-full">
                    <Icon name="Download" className="mr-2" size={16} />
                    Скачать отчет
                  </Button>
                </div>

                <div className="p-4 bg-card border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">Индивидуальный отчет</h4>
                    <Badge variant="secondary">В разработке</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Персональные рекомендации на основе вашей активности
                  </p>
                  <Button variant="outline" className="w-full" disabled>
                    <Icon name="Clock" className="mr-2" size={16} />
                    Скоро доступно
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="methodology" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Icon name="BookOpen" size={24} />
                Методические рекомендации
              </h3>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">Применение комплекса в офисе</h4>
                  <p className="text-muted-foreground mb-4">
                    Наш комплекс разработан специально для офисных условий и не требует специального оборудования.
                    Все упражнения можно выполнять прямо на рабочем месте.
                  </p>
                </div>

                <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                  <h5 className="font-semibold mb-2 flex items-center gap-2">
                    <Icon name="AlertCircle" size={20} />
                    Важные принципы
                  </h5>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="text-primary">•</span>
                      Регулярность важнее интенсивности
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">•</span>
                      Выполняйте упражнения каждые 2-3 часа
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">•</span>
                      Не игнорируйте дискомфорт - подбирайте нагрузку индивидуально
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">•</span>
                      Дышите ровно, не задерживайте дыхание
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Рекомендации по внедрению</h4>
                  <div className="space-y-3">
                    <div className="p-4 bg-card border border-border rounded-lg">
                      <h5 className="font-medium mb-1">Для сотрудников</h5>
                      <p className="text-sm text-muted-foreground">
                        Начните с 2-3 упражнений в день и постепенно увеличивайте количество. Используйте напоминания для формирования привычки.
                      </p>
                    </div>
                    <div className="p-4 bg-card border border-border rounded-lg">
                      <h5 className="font-medium mb-1">Для руководителей</h5>
                      <p className="text-sm text-muted-foreground">
                        Поощряйте сотрудников делать перерывы на упражнения. Организуйте групповые сессии 2-3 раза в неделю для повышения вовлеченности.
                      </p>
                    </div>
                    <div className="p-4 bg-card border border-border rounded-lg">
                      <h5 className="font-medium mb-1">Для HR-специалистов</h5>
                      <p className="text-sm text-muted-foreground">
                        Отслеживайте статистику участия, собирайте обратную связь и корректируйте программу под потребности команды.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Научное обоснование</h4>
                  <p className="text-sm text-muted-foreground">
                    Комплекс разработан на основе исследований в области эргономики и профилактической медицины. Регулярное выполнение упражнений снижает риск профессиональных заболеваний на 45% и повышает продуктивность на 23%.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Icon name="User" size={24} />
                Профиль пользователя
              </h3>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
                    <Icon name="User" size={40} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold">Сергей Иванов</h4>
                    <p className="text-muted-foreground">sergey.ivanov@company.com</p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 bg-card border border-border rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Должность</p>
                    <p className="font-medium">Менеджер проектов</p>
                  </div>
                  <div className="p-4 bg-card border border-border rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Отдел</p>
                    <p className="font-medium">IT-разработка</p>
                  </div>
                  <div className="p-4 bg-card border border-border rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Дата регистрации</p>
                    <p className="font-medium">15 октября 2024</p>
                  </div>
                  <div className="p-4 bg-card border border-border rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Статус</p>
                    <Badge>Активный участник</Badge>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-4">Предпочтения</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-card border border-border rounded-lg">
                      <div>
                        <p className="font-medium">Уровень сложности</p>
                        <p className="text-sm text-muted-foreground">Рекомендуемая нагрузка</p>
                      </div>
                      <Badge>Средний</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-card border border-border rounded-lg">
                      <div>
                        <p className="font-medium">Проблемные зоны</p>
                        <p className="text-sm text-muted-foreground">Области для особого внимания</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="secondary">Шея</Badge>
                        <Badge variant="secondary">Спина</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <Button className="w-full">
                  <Icon name="Settings" className="mr-2" size={16} />
                  Редактировать профиль
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
