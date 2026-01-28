import { CONFIG } from 'src/config-global';

import { SignContractView } from 'src/sections/contracts';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Sign Contract - ${CONFIG.appName}`}</title>

      <SignContractView />
    </>
  );
}

