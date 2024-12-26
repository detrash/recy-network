export const validateAuthProvider = (sub: string): string | null => {
  const [authProvider] = sub.split('|');
  const validProviders = ['google-oauth2'];

  if (validProviders.includes(authProvider)) {
    return authProvider;
  }

  return null;
};
