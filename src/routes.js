/**
 * Публичне роуты, не требующие аутентификации для посещения
 */
export const publicRoutes = ["/", "/auth/new-verification"];

/**
 * Роуты для аутентификации
 * Они редиректнут юзера на /settings
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/reset",
  "/auth/new-password",
];

/**
 * Этот роут доступен всегда, вне зависимости от статуса аутентификации
 */
export const apiAuthPrefix = "/api/auth";

/**
 * после аутентификации юзера редиректнет сюда
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";
