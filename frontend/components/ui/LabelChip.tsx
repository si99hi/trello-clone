import { Label } from '@/lib/api';

interface LabelChipProps {
  label: Label;
}

export default function LabelChip({ label }: LabelChipProps) {
  return (
    <span
      className="px-2 py-0.5 rounded text-xs text-white"
      style={{ backgroundColor: label.color }}
    >
      {label.name}
    </span>
  );
}