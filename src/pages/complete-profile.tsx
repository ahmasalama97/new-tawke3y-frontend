import { CONFIG } from 'src/config-global';

import { CompleteProfileView } from 'src/sections/auth/complete-profile';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Complete Profile - ${CONFIG.appName}`}</title>

      <CompleteProfileView />
    </>
  );
}
