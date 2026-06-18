import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Scale } from 'lucide-react';
import { Product } from '../../types/product';
import { Badge } from '../ui/Badge';
import { Rating } from '../ui/Rating';
import { useWishlist } from '../../hooks/useWishlist';
import { useCart } from '../../hooks/useCart';
import { formatPrice, calculateDiscount } from '../../lib/utils';
import { cn } from '../../lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      productId: product.id,
      productSlug: product.slug,
      productName: product.title,
      productNameAr: product.titleAr,
      productNameEn: product.titleEn,
      productImage: product.thumbnail,
      price: product.price,
      salePrice: product.salePrice,
      quantity: 1,
      stock: product.stock,
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist({
      productId: product.id,
      productSlug: product.slug,
      productName: product.title,
      productNameAr: product.titleAr,
      productNameEn: product.titleEn,
      productImage: product.thumbnail,
      price: product.price,
      salePrice: product.salePrice,
    });
  };

  return (
    <Link
      to={`/product/${product.slug}`}
      className={cn(
        'group relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden',
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.thumbnail}
          alt={`${product.title} من ${product.brand}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && (
            <Badge variant="primary" size="sm">
              جديد
            </Badge>
          )}
          {product.discount && product.discount > 0 && (
            <Badge variant="danger" size="sm">
              خصم {product.discount}%
            </Badge>
          )}
          {product.isTrending && (
            <Badge variant="warning" size="sm">
              ترند
            </Badge>
          )}
          {product.hasOffer && product.offerType === '1plus1' && (
            <Badge variant="success" size="sm">
              1+1
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all opacity-0 group-hover:opacity-100"
          aria-label="إضافة للمفضلة"
        >
          <Heart
            className={cn(
              'w-5 h-5',
              isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'
            )}
          />
        </button>

        {/* Quick Add to Cart */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-2 right-2 p-2 bg-primary text-white rounded-full shadow-md hover:bg-primary-600 transition-all opacity-0 group-hover:opacity-100"
          aria-label="إضافة للسلة"
        >
          <ShoppingCart className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Brand */}
        <p className="text-sm text-gray-500 mb-1">{product.brand}</p>

        {/* Title */}
        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <Rating value={product.rating} size="sm" showCount count={product.reviewCount} />
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          {product.salePrice && product.salePrice < product.price ? (
            <>
              <span className="text-lg font-bold text-primary">
                {formatPrice(product.salePrice)}
              </span>
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-primary">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* Stock Status */}
        {product.stock <= 0 && (
          <p className="text-sm text-red-500 mt-2">نفذت الكمية</p>
        )}
        {product.stock > 0 && product.stock <= 5 && (
          <p className="text-sm text-orange-500 mt-2">متوفر ({product.stock} قطع)</p>
        )}
      </div>
    </Link>
  );
};
