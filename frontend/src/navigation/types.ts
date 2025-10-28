// src/navigation/types.ts
export type RootStackParamList = {
  // Root level
  Auth: undefined;        // AuthStack as a single screen
  RootTabs: undefined;    // Bottom tabs container
  CreateMatch: undefined;

  // Auth flow screens (AuthStack uses same type in your code)
  Login: undefined;
  LoginDetails: undefined;
  Registration: undefined;
  Onboarding: undefined;
};
