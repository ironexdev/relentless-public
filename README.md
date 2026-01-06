# Relentless

### Authentication Flow

Verification actions (`verify-login-action.ts`) validate PIN and call `AuthService.createSession()` in `auth-service.ts`. This generates a JWT containing `userId` and `email`, plus a refresh token code. `CookieService.setAuthCookies()` stores both as HTTP cookies. On each request, `hooks.server.ts` verifies the JWT or refreshes the session using the refresh token from database. User schema in `users.ts` defines all properties, but only `id` and `email` are encoded in the JWT token.