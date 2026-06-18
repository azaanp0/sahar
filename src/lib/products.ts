import { db } from '@/lib/dashboard-dashe/db';
import type { Product } from '@/lib/dashboard-dashe/db';

/**
 * Get all products from the shared database
 * This reads from the same localStorage database used by the dashboard
 */
export function getAllProducts(): Product[] {
  try {
    return db.getProducts();
  } catch (error) {
    console.error('Error loading products:', error);
    return [];
  }
}

/**
 * Get a product by ID
 */
export function getProductById(id: string): Product | undefined {
  try {
    const products = getAllProducts();
    return products.find(p => p.id === id || p.slug === id);
  } catch (error) {
    console.error('Error loading product:', error);
    return undefined;
  }
}

/**
 * Get products by category
 */
export function getProductsByCategory(category: string): Product[] {
  try {
    const products = getAllProducts();
    return products.filter(p => p.category.toLowerCase() === category.toLowerCase());
  } catch (error) {
    console.error('Error loading products by category:', error);
    return [];
  }
}

/**
 * Get featured products
 */
export function getFeaturedProducts(): Product[] {
  try {
    const products = getAllProducts();
    return products.filter(p => p.isFeatured);
  } catch (error) {
    console.error('Error loading featured products:', error);
    return [];
  }
}

/**
 * Get new products
 */
export function getNewProducts(): Product[] {
  try {
    const products = getAllProducts();
    return products.filter(p => p.isNew);
  } catch (error) {
    console.error('Error loading new products:', error);
    return [];
  }
}

/**
 * Search products
 */
export function searchProducts(query: string): Product[] {
  try {
    const products = getAllProducts();
    const lowerQuery = query.toLowerCase();
    return products.filter(p => 
      p.nameAr.toLowerCase().includes(lowerQuery) ||
      p.nameEn.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery) ||
      p.brand.toLowerCase().includes(lowerQuery) ||
      p.sku.toLowerCase().includes(lowerQuery)
    );
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
}

/**
 * Add a product (used by dashboard)
 */
export function addProduct(product: Product): void {
  try {
    db.addProduct(product);
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
}

/**
 * Update a product (used by dashboard)
 */
export function updateProduct(id: string, updates: Partial<Product>): void {
  try {
    db.updateProduct(id, updates);
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
}

/**
 * Delete a product (used by dashboard)
 */
export function deleteProduct(id: string): void {
  try {
    db.deleteProduct(id);
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
}
