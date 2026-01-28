import { CONFIG } from 'src/config-global';

import { ContractsView } from 'src/sections/contracts';

// ----------------------------------------------------------------------

export default function Page() {
    return (
        <>
            <title>{`Contracts - ${CONFIG.appName}`}</title>
            <meta name="description" content="Manage your contracts" />
            <meta name="keywords" content="contracts, documents, agreements" />

            <ContractsView />
        </>
    );
}
