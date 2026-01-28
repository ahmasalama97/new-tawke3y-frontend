import { CONFIG } from 'src/config-global';

import { SignaturedContractsView } from 'src/sections/contracts';

// ----------------------------------------------------------------------

export default function Page() {
    return (
        <>
            <title>{`Signed Contracts - ${CONFIG.appName}`}</title>
            <meta name="description" content="View your signed contracts" />
            <meta name="keywords" content="contracts, signed, agreements" />

            <SignaturedContractsView />
        </>
    );
}
