import * as React from 'react';
import useSoundBase from 'use-sound';

import { UserPreferencesContext } from '@/components/UserPreferencesProvider';

export default function useSound(url: string, delegated: any = {}) {
  const { soundEnabled } = React.useContext(UserPreferencesContext);

  return useSoundBase(url, { ...delegated, soundEnabled });
}
