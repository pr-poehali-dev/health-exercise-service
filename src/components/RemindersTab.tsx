import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface Reminder {
  id: number;
  time: string;
  active: boolean;
  label: string;
  description: string;
  isPinned?: boolean;
}

interface RemindersTabProps {
  reminderSettings: Reminder[];
  emailNotifications: boolean;
  pushNotifications: boolean;
  setEmailNotifications: (value: boolean) => void;
  setPushNotifications: (value: boolean) => void;
  toggleReminder: (id: number) => void;
  updateReminderTime: (id: number, time: string) => void;
  addReminder: (reminder: { label: string; description: string; time: string }) => void;
  deleteReminder: (id: number) => void;
}

export default function RemindersTab({
  reminderSettings,
  emailNotifications,
  pushNotifications,
  setEmailNotifications,
  setPushNotifications,
  toggleReminder,
  updateReminderTime,
  addReminder,
  deleteReminder,
}: RemindersTabProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newReminder, setNewReminder] = useState({ label: '', description: '', time: '12:00' });

  const pinnedReminders = reminderSettings.filter((r) => r.isPinned);
  const customReminders = reminderSettings.filter((r) => !r.isPinned);

  const handleAddReminder = () => {
    if (!newReminder.label.trim()) {
      toast.error('Введите название напоминания');
      return;
    }
    addReminder(newReminder);
    setNewReminder({ label: '', description: '', time: '12:00' });
    setIsAddDialogOpen(false);
    toast.success('Напоминание добавлено');
  };

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

        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Icon name="Pin" size={18} />
              Основные напоминания
            </h4>
            <div className="space-y-4">
              {pinnedReminders.map((reminder) => (
                <div
                  key={reminder.id}
                  className="flex items-center justify-between p-4 bg-primary/5 rounded-lg border border-primary/20"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex flex-col gap-1">
                      <Input
                        type="time"
                        value={reminder.time}
                        onChange={(e) => updateReminderTime(reminder.id, e.target.value)}
                        className="w-28 text-center font-bold text-primary"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-lg">{reminder.label}</p>
                      <p className="text-sm text-muted-foreground">{reminder.description}</p>
                    </div>
                  </div>
                  <Switch checked={reminder.active} onCheckedChange={() => toggleReminder(reminder.id)} />
                </div>
              ))}
            </div>
          </div>

          {customReminders.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold mb-4">Мои напоминания</h4>
              <div className="space-y-4">
                {customReminders.map((reminder) => (
                  <div
                    key={reminder.id}
                    className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="flex flex-col gap-1">
                        <Input
                          type="time"
                          value={reminder.time}
                          onChange={(e) => updateReminderTime(reminder.id, e.target.value)}
                          className="w-28 text-center font-bold"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-lg">{reminder.label}</p>
                        <p className="text-sm text-muted-foreground">{reminder.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch checked={reminder.active} onCheckedChange={() => toggleReminder(reminder.id)} />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteReminder(reminder.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <Button className="w-full mt-6" variant="outline" onClick={() => setIsAddDialogOpen(true)}>
          <Icon name="Plus" className="mr-2" size={16} />
          Добавить напоминание
        </Button>
      </Card>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Добавить напоминание</DialogTitle>
            <DialogDescription>
              Создайте персональное напоминание для тренировки
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="label">Название напоминания</Label>
              <Input
                id="label"
                placeholder="Например: Перерыв на растяжку"
                value={newReminder.label}
                onChange={(e) => setNewReminder({ ...newReminder, label: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Описание (необязательно)</Label>
              <Input
                id="description"
                placeholder="Краткое описание"
                value={newReminder.description}
                onChange={(e) => setNewReminder({ ...newReminder, description: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Время</Label>
              <Input
                id="time"
                type="time"
                value={newReminder.time}
                onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleAddReminder}>
              <Icon name="Plus" className="mr-2" size={16} />
              Добавить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
