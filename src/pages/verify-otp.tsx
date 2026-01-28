import { CONFIG } from 'src/config-global';

import { VerifyOtpView } from 'src/sections/auth';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Verify Email - ${CONFIG.appName}`}</title>

      <VerifyOtpView />
    </>
  );
}

