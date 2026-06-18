import { db } from '@/lib/dashboard-dashe/db';
import type { SeoRedirect } from '@/lib/dashboard-dashe/db';

/**
 * Check if a URL should be redirected
 * This function reads from the shared database and applies redirects
 */
export function checkRedirect(pathname: string): { redirect: string; statusCode: number } | null {
  try {
    const redirects = db.getRedirects();
    const activeRedirects = redirects.filter(r => r.isActive);
    
    // Find matching redirect
    const redirect = activeRedirects.find(r => {
      // Exact match
      if (r.fromUrl === pathname) return true;
      
      // Wildcard match (e.g., /old-page/*)
      if (r.fromUrl.endsWith('*')) {
        const base = r.fromUrl.slice(0, -1);
        return pathname.startsWith(base);
      }
      
      return false;
    });
    
    if (redirect) {
      // 410 means gone, no redirect
      if (redirect.type === '410') {
        return null;
      }
      
      // Replace wildcard in destination
      let destination = redirect.toUrl;
      if (redirect.fromUrl.endsWith('*')) {
        const base = redirect.fromUrl.slice(0, -1);
        const suffix = pathname.slice(base.length);
        destination = redirect.toUrl.replace('*', suffix);
      }
      
      return {
        redirect: destination,
        statusCode: redirect.type === '301' ? 301 : 302
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error checking redirect:', error);
    return null;
  }
}

/**
 * Apply redirect in client-side navigation
 * This should be called in the router's navigation guard
 */
export function applyRedirect(pathname: string): boolean {
  const redirect = checkRedirect(pathname);
  if (redirect) {
    if (typeof window !== 'undefined') {
      window.location.href = redirect.redirect;
      return true;
    }
  }
  return false;
}

/**
 * Get all active redirects for display in dashboard
 */
export function getActiveRedirects(): SeoRedirect[] {
  try {
    return db.getRedirects().filter(r => r.isActive);
  } catch (error) {
    console.error('Error loading redirects:', error);
    return [];
  }
}
