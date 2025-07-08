
import { getTagColor } from "../../utils/tagColors";

interface CardProps {
  title: string;
  description: string;
  tags: string[];
  className?: string;
  isDisabled?: boolean;
}

export default function Card({ title, description, tags, className = "", isDisabled = false }: CardProps) {

  return (
    <div 
      className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${className} ${
        isDisabled ? 'opacity-60 grayscale' : ''
      }`}
      style={{ 
        backgroundColor: 'var(--bg-secondary)', 
        borderColor: 'var(--border-primary)'
      }}
    >
      {/* Título */}
      <h3 className="font-medium mb-2 text-lg" style={{ color: 'var(--text-primary)' }}>
        {title}
      </h3>
      
      {/* Descrição */}
      <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
        {description}
      </p>
      
      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={`${tag}-${index}`}
              className="px-3 py-1 text-xs font-medium rounded-full text-white"
              style={{ backgroundColor: getTagColor(tag) }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
} 