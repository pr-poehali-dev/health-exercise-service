import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface FeedbackDialogProps {
  isOpen: boolean;
  onClose: () => void;
  exerciseTitle: string;
  onSubmit: (feedback: { rating: number; comment: string; difficulty: string }) => void;
}

export default function FeedbackDialog({
  isOpen,
  onClose,
  exerciseTitle,
  onSubmit,
}: FeedbackDialogProps) {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState('');
  const [difficulty, setDifficulty] = useState<string>('');

  const handleSubmit = () => {
    if (rating === 0) {
      toast.error('Пожалуйста, поставьте оценку');
      return;
    }
    onSubmit({ rating, comment, difficulty });
    setRating(0);
    setComment('');
    setDifficulty('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Как прошла тренировка?</DialogTitle>
          <DialogDescription>
            Упражнение: <span className="font-semibold">{exerciseTitle}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label>Оцените упражнение</Label>
            <div className="flex gap-2 justify-center py-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110 focus:outline-none"
                >
                  <Icon
                    name="Star"
                    size={32}
                    className={
                      star <= rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Как вы оцениваете сложность?</Label>
            <div className="grid grid-cols-3 gap-2">
              {['Легко', 'Средне', 'Сложно'].map((level) => (
                <Button
                  key={level}
                  type="button"
                  variant={difficulty === level ? 'default' : 'outline'}
                  onClick={() => setDifficulty(level)}
                  className="w-full"
                >
                  {level}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">Комментарий (необязательно)</Label>
            <Textarea
              id="comment"
              placeholder="Поделитесь впечатлениями о тренировке..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Пропустить
          </Button>
          <Button onClick={handleSubmit}>
            <Icon name="Send" className="mr-2" size={16} />
            Отправить отзыв
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
