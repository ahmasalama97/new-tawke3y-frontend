import { CONFIG } from 'src/config-global';

import { GenerateContractView } from 'src/sections/contracts';

// ----------------------------------------------------------------------

export default function Page() {
    return (
        <>
            <title>{`Generate Contract - ${CONFIG.appName}`}</title>
            <meta name="description" content="Generate and sign contracts" />
            <meta name="keywords" content="generate, contracts, sign, pdf" />

            <GenerateContractView />
        </>
    );
}
