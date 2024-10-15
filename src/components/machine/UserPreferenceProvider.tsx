'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import Cookie from 'js-cookie';

import {
  DEFAULT_COLOR_MODE,
  COLOR_THEME_COOKIE_NAME,
  ColorMode,
} from '@/constants';

import {
  useRestoredValuesFromDevice,
  ToggleColorMode,
  ToggleSoundEnabled,
  SAVED_SOUND_ENABLED_KEY,
} from './UserPreferencesProvider.helpers';

export const SetUserPreferencesContext = React.createContext<{
  toggleColorMode: ToggleColorMode;
  toggleSoundEnabled: ToggleSoundEnabled;
}>(
  // Unused initial values for TS
  { toggleColorMode: () => {}, toggleSoundEnabled: () => {} }
);

export const UserPreferencesContext = React.createContext<{
  colorMode: ColorMode;
  soundEnabled: boolean;
}>({
  // Unused initial values for TS
  colorMode: 'light',
  soundEnabled: true,
});

/*
  Certain routes require a specific color mode. For example,
  /shadow-palette will always display in “dark mode”. Instead of
  using the user’s saved value, we’ll use this as the initial value.
  Technically the value isn't locked, it can still be changed, but these routes shouldn't give the user the option, they shouldn't render the toggle.
*/
const FORCED_COLOR_ROUTES: Record<string, ColorMode> = {
  '/shadow-palette/': 'dark',
};

function UserPreferencesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const [colorMode, setColorMode] = React.useState<ColorMode>(() => {
    // `pathname` should always exist, but TypeScript isn't so sure.
    const forcedColorMode = pathname
      ? FORCED_COLOR_ROUTES[pathname]
      : undefined;

    // We initialize to `DEFAULT_COLOR_MODE`. A snippet inside `HtmlRoot` will edit the HTML based on the user's saved preferences, and we'll sync this up in an effect below.
    return forcedColorMode ?? DEFAULT_COLOR_MODE;
  });

  const [soundEnabled, setSoundEnabled] =
    React.useState<boolean>(true);

  useRestoredValuesFromDevice({
    initialColorMode: colorMode,
    setColorMode,
    initialSoundEnabled: soundEnabled,
    setSoundEnabled,
  });

  const toggleColorMode: ToggleColorMode = React.useCallback(
    (newColorMode?: ColorMode) => {
      setColorMode((currentColorMode) => {
        const nextColorMode =
          newColorMode ??
          (currentColorMode === 'light' ? 'dark' : 'light');

        Cookie.set(COLOR_THEME_COOKIE_NAME, nextColorMode, {
          expires: 1000,
        });

        return nextColorMode;
      });
    },
    []
  );
  const toggleSoundEnabled = React.useCallback(
    (newValue?: boolean) => {
      const nextValue = newValue ?? !soundEnabled;
      setSoundEnabled(nextValue);

      window.localStorage.setItem(
        SAVED_SOUND_ENABLED_KEY,
        String(nextValue)
      );
    },
    [soundEnabled]
  );

  const providedSetters = React.useMemo(() => {
    return {
      toggleColorMode,
      toggleSoundEnabled,
    };
  }, [toggleColorMode, toggleSoundEnabled]);

  const providedValues = React.useMemo(() => {
    return {
      colorMode,
      soundEnabled,
    };
  }, [colorMode, soundEnabled]);

  return (
    <SetUserPreferencesContext.Provider value={providedSetters}>
      <UserPreferencesContext.Provider value={providedValues}>
        {children}
      </UserPreferencesContext.Provider>
    </SetUserPreferencesContext.Provider>
  );
}

export function useColorMode() {
  const value = React.useContext(UserPreferencesContext);

  if (!value) {
    throw new Error(
      'Cannot call useColorMode outside of UserPreferencesProvider'
    );
  }

  return value.colorMode;
}

export default UserPreferencesProvider;
