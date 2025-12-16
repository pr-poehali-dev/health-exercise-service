import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface Reminder {
  id: number;
  time: string;
  active: boolean;
  label: string;
  description: string;
}

interface RemindersTabProps {
  reminderSettings: Reminder[];
  emailNotifications: boolean;
  pushNotifications: boolean;
  setEmailNotifications: (value: boolean) => void;
  setPushNotifications: (value: boolean) => void;
  toggleReminder: (id: number) => void;
}

export default function RemindersTab({
  reminderSettings,
  emailNotifications,
  pushNotifications,
  setEmailNotifications,
  setPushNotifications,
  toggleReminder,
}: RemindersTabProps) {
  return (
    <div className="space-y-6">
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
    </div>
  );
}
