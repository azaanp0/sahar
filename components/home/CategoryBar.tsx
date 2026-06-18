import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../../types/api';

interface CategoryBarProps {
  categories: Category[];
}

export const CategoryBar: React.FC<CategoryBarProps> = ({ categories }) => {
  if (categories.length === 0) return null;

  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.slug}`}
              className="flex flex-col items-center gap-2 flex-shrink-0 group"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                {category.icon ? (
                  <img
                    src={category.icon}
                    alt={category.name}
                    className="w-8 h-8 md:w-10 md:h-10"
                  />
                ) : (
                  <span className="text-2xl md:text-3xl">{category.name.charAt(0)}</span>
                )}
              </div>
              <span className="text-xs md:text-sm text-gray-700 group-hover:text-primary transition-colors text-center whitespace-nowrap">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
