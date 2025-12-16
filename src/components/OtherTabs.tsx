import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export function ReportsTab() {
  return (
    <div className="space-y-6">
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
    </div>
  );
}

export function MethodologyTab() {
  return (
    <div className="space-y-6">
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
    </div>
  );
}

export function ProfileTab() {
  return (
    <div className="space-y-6">
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
    </div>
  );
}
