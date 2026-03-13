import Link from 'next/link';
import { Board } from '@/lib/api';

interface BoardCardProps {
  board: Board;
}

export default function BoardCard({ board }: BoardCardProps) {
  const isGradient = board.bgColor.startsWith('linear-gradient');
  const style = isGradient
    ? { background: board.bgColor }
    : { backgroundColor: board.bgColor };

  return (
    <Link
      href={`/boards/${board.id}`}
      className="block h-24 rounded-lg p-3 hover:brightness-110 transition-all"
      style={style}
    >
      <h3 className="text-white font-medium text-sm">{board.title}</h3>
    </Link>
  );
}