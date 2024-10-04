/**
 * Routes accessible by anyone
 */
export const publicRoutes = ['/', '/auth/verify'];

/**
 * Routes that require public access
 * but are not accessible by authenticated users
 * redirects to DEFAULT_REDIRECT_URL
 */
export const authRoutes = ['/auth/login', '/auth/sign-up', '/auth/error'];

/**
 * Api Routes for authentication
 */
export const apiAuthPrefix = '/api/auth';

/**
 * Default redirect url after login
 */
export const DEFAULT_REDIRECT_URL = '/settings';
