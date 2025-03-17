import { Palette } from 'lucide-react';
import cn from '../../utils/cn';

interface ColorPickerProps {
  selectedColor: string;
  colorOptions: string[];
  onColorSelect: (color: string) => void;
}

const ColorPicker = ({ selectedColor, colorOptions, onColorSelect }: ColorPickerProps) => {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-sm font-medium mb-2 text-gray-800">
        <Palette size={16} />
        Background Color
      </label>
      <div className="flex flex-wrap gap-3">
        {colorOptions.map((color, index) => (
          <div
            key={index}
            onClick={() => onColorSelect(color)}
            className={cn("size-10 rounded-full cursor-pointer border hover:scale-110 transition-transform",
              selectedColor === color
                ? "ring-2 ring-blue-500 ring-offset-2"
                : "border-gray-300"
            )}
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;