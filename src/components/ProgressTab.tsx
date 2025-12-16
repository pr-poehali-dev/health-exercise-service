import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface WeeklyStat {
  day: string;
  completed: number;
  total: number;
}

interface ProgressTabProps {
  weeklyStats: WeeklyStat[];
}

export default function ProgressTab({ weeklyStats }: ProgressTabProps) {
  return (
    <div className="space-y-6">
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
    </div>
  );
}
