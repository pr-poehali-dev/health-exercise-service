import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Exercise {
  id: number;
  title: string;
  duration: string;
  category: string;
  difficulty: string;
  videoUrl: string;
  description: string;
  benefits: string[];
  detailedInfo?: string;
}

interface ExercisesTabProps {
  exercises: Exercise[];
  completedExercises: number[];
  toggleExercise: (id: number) => void;
  totalProgress: number;
}

export default function ExercisesTab({
  exercises,
  completedExercises,
  toggleExercise,
  totalProgress,
}: ExercisesTabProps) {
  const [infoDialog, setInfoDialog] = useState<{ open: boolean; exercise: Exercise | null }>({
    open: false,
    exercise: null,
  });

  const handleInfoClick = (e: React.MouseEvent, exercise: Exercise) => {
    e.stopPropagation();
    setInfoDialog({ open: true, exercise });
  };

  return (
    <div className="space-y-6">
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

              <div className="flex gap-2 mt-4">
                <Button className="flex-1" variant={isCompleted ? 'outline' : 'default'}>
                  <Icon name="Play" className="mr-2" size={16} />
                  {isCompleted ? 'Повторить' : 'Начать упражнение'}
                </Button>
                {exercise.detailedInfo && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={(e) => handleInfoClick(e, exercise)}
                  >
                    <Icon name="Info" size={16} />
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      <Dialog open={infoDialog.open} onOpenChange={(open) => setInfoDialog({ open, exercise: null })}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon name="Info" size={24} className="text-primary" />
              {infoDialog.exercise?.title}
            </DialogTitle>
            <DialogDescription>
              Подробная инструкция по выполнению упражнения
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {infoDialog.exercise?.detailedInfo && (
              <div className="prose prose-sm max-w-none">
                {infoDialog.exercise.detailedInfo.split('\n').map((line, index) => (
                  <p key={index} className="mb-2 text-foreground">
                    {line}
                  </p>
                ))}
              </div>
            )}
            <div className="flex items-center gap-4 text-sm text-muted-foreground pt-4 border-t">
              <div className="flex items-center gap-1">
                <Icon name="Clock" size={16} />
                {infoDialog.exercise?.duration}
              </div>
              <div className="flex items-center gap-1">
                <Icon name="Tag" size={16} />
                {infoDialog.exercise?.category}
              </div>
              <Badge
                variant={
                  infoDialog.exercise?.difficulty === 'Легко'
                    ? 'secondary'
                    : infoDialog.exercise?.difficulty === 'Средне'
                    ? 'default'
                    : 'destructive'
                }
              >
                {infoDialog.exercise?.difficulty}
              </Badge>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}