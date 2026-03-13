interface AvatarProps {
  name: string;
  color: string;
  size?: 'xs' | 'sm' | 'md';
}

export default function Avatar({ name, color, size = 'md' }: AvatarProps) {
  const sizeClasses = {
    xs: 'w-5 h-5 text-xs',
    sm: 'w-7 h-7 text-sm',
    md: 'w-9 h-9 text-base',
  };
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center text-white font-medium`}
      style={{ backgroundColor: color }}
    >
      {initials}
    </div>
  );
}