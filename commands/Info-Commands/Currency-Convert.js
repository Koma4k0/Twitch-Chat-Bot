const axios = require('axios');

module.exports = {
    name: "currency",
    use: '<from currency> <to currency> <amount>',
    description: "Convert from one currency to another",
    async execute(client, channel, tags, message, args) {
        const list = ["$MYRO", "$WEN", "00", "1000SATS", "1INCH", "AAVE", "ABT", "ACH", "ACS", "ADA", "AED", "AERGO", "AERO", "AFN", "AGIX", "AGLD", "AI", "AIOZ", "AKT", "ALCX", "ALEPH", "ALEX", "ALGO", "ALICE", "ALL", "ALPH", "ALT", "ALUSD", "AMD", "AMP", "ANG", "ANKR", "ANT", "AOA", "APE", "APEX", "API3", "APT", "AR", "ARB", "ARK", "ARKM", "ARPA", "ARS", "ASM", "AST", "ASTR", "ATA", "ATOM", "ATS", "AUCTION", "AUD", "AUDIO", "AURORA", "AVAX", "AVT", "AWG", "AXL", "AXS", "AZERO", "AZM", "AZN", "BABYDOGE", "BADGER", "BAKE", "BAL", "BAM", "BAND", "BAT", "BBD", "BCH", "BDT", "BDX", "BEAM", "BEF", "BGB", "BGN", "BHD", "BICO", "BIF", "BIGTIME", "BIT", "BLD", "BLUR", "BLZ", "BMD", "BNB", "BND", "BNT", "BOB", "BOBA", "BOND", "BONE", "BONK", "BORA", "BORG", "BRL", "BSD", "BSV", "BSW", "BTC", "BTC.B", "BTCB", "BTG", "BTN", "BTRST", "BTT", "BUSD", "BWP", "BYN", "BYR", "BZD", "C98", "CAD", "CAKE", "CANTO", "CBETH", "CDAI", "CDF", "CDT", "CELO", "CELR", "CETH", "CFG", "CFX", "CGLD", "CHEEL", "CHF", "CHR", "CHZ", "CKB", "CLP", "CLV", "CNH", "CNY", "COMAI", "COMP", "COP", "CORE", "CORGIAI", "COTI", "COVAL", "CQT", "CRC", "CRO", "CRPT", "CRV", "CSPR", "CTC", "CTSI", "CTX", "CUC", "CUP", "CVC", "CVE", "CVX", "CWBTC", "CYP", "CZK", "DAG", "DAI", "DAO", "DAR", "DASH", "DCR", "DDX", "DEM", "DESO", "DEXE", "DEXT", "DFI", "DIA", "DIMO", "DJF", "DKK", "DNT", "DOGE", "DOP", "DORA", "DOT", "DREP", "DYDX", "DYM", "DYP", "DZD", "EDU", "EDUM", "EEK", "EGLD", "EGP", "ELA", "ELF", "ELG", "ENJ", "ENS", "EOS", "ERN", "ESP", "ETB", "ETC", "ETH", "ETH2", "ETHDYDX", "ETHW", "ETHX", "EUR", "EUROC", "EVER", "FARM", "FDUSD", "FEI", "FET", "FIDA", "FIL", "FIM", "FIS", "FJD", "FKP", "FLOKI", "FLOW", "FLR", "FLUX", "FNSA", "FORT", "FORTH", "FOX", "FRAX", "FRF", "FRXETH", "FTM", "FTN", "FTT", "FX", "FXS", "GAJ", "GAL", "GALA", "GAS", "GBP", "GEL", "GFI", "GGP", "GHC", "GHS", "GHST", "GIP", "GLM", "GLMR", "GMD", "GMT", "GMX", "GNF", "GNO", "GNS", "GNT", "GODS", "GRD", "GRT", "GST", "GT", "GTC", "GTQ", "GUSD", "GXC", "GYD", "GYEN", "HBAR", "HBTC", "HFT", "HIGH", "HKD", "HNL", "HNT", "HONEY", "HOPR", "HOT", "HRK", "HT", "HTG", "HUF", "ICP", "ICX", "ID", "IDEX", "IDR", "IEP", "ILS", "ILV", "IMP", "IMX", "INDEX", "INJ", "INR", "INV", "IOST", "IOTA", "IOTX", "IQD", "IRR", "ISK", "ITL", "JASMY", "JEP", "JMD", "JOD", "JOE", "JPY", "JST", "JTO", "JUP", "KAS", "KAVA", "KCS", "KDA", "KEEP", "KES", "KGS", "KHR", "KLAY", "KMF", "KNC", "KPW", "KRL", "KRW", "KSM", "KUB", "KUJI", "KWD", "KYD", "KZT", "LAK", "LBP", "LCX", "LDO", "LEO", "LINK", "LIT", "LKR", "LOKA", "LOOM", "LPT", "LQTY", "LRC", "LRD", "LSETH", "LSK", "LSL", "LTC", "LTL", "LUF", "LUNA", "LUNC", "LUSD", "LVL", "LYD", "LYX", "LYXE", "MAD", "MAGIC", "MANA", "MANTA", "MASK", "MATH", "MATIC", "MAV", "MAVIA", "MBX", "MCO2", "MDL", "MDT", "MEDIA", "MEME", "METH", "METIS", "MGA", "MGF", "MINA", "MIR", "MKD", "MKR", "MKUSD", "MLN", "MMK", "MNDE", "MNT", "MOBILE", "MOG", "MONA", "MOP", "MOVR", "MPL", "MRO", "MRU", "MSOL", "MTL", "MUBI", "MULTI", "MUR", "MUSE", "MVR", "MWK", "MX", "MXC", "MXN", "MXV", "MYR", "MZM", "MZN", "NAD", "NCT", "NEAR", "NEO", "NEON", "NEST", "NEXO", "NFT", "NGN", "NIO", "NKN", "NLG", "NMR", "NOK", "NOS", "NPR", "NTRN", "NU", "NXM", "NZD", "OAS", "OCEAN", "OGN", "OHM", "OKB", "OKT", "OLAS", "OM", "OMG", "OMI", "OMR", "ONDO", "ONE", "ONT", "OOKI", "OP", "ORCA", "ORDI", "ORN", "OSMO", "OX", "OXT", "PAAL", "PAB", "PANDORA", "PAX", "PAXG", "PEN", "PENDLE", "PEOPLE", "PEPE", "PERP", "PGK", "PHP", "PIXEL", "PKR", "PLA", "PLN", "PLU", "PNG", "POKT", "POLS", "POLY", "POLYX", "POND", "PORK", "PORTAL", "POWR", "PRIME", "PRO", "PROM", "PRQ", "PTE", "PUNDIX", "PYG", "PYR", "PYTH", "PYUSD", "QAR", "QI", "QNT", "QSP", "QTUM", "QUICK", "RAD", "RAI", "RARE", "RARI", "RAY", "RBN", "REN", "RENDER", "REP", "REPV2", "REQ", "RETH", "RGT", "RIF", "RLB", "RLC", "RLY", "RNDR", "ROL", "RON", "ROSE", "RPL", "RSD", "RUB", "RUNE", "RVN", "RWF", "SAND", "SAR", "SATS", "SAVAX", "SBD", "SC", "SCR", "SDD", "SDG", "SEAM", "SEI", "SEK", "SFP", "SFRXETH", "SFUND", "SGB", "SGD", "SHDW", "SHIB", "SHP", "SHPING", "SIT", "SKK", "SKL", "SLE", "SLL", "SLP", "SNT", "SNX", "SOL", "SOS", "SPA", "SPELL", "SPL", "SRD", "SRG", "SSP", "SSV", "STD", "STETH", "STG", "STN", "STORJ", "STRAX", "STRD", "STRK", "STSOL", "STX", "SUI", "SUKU", "SUPER", "SUSHI", "SVC", "SWETH", "SWFTC", "SXP", "SYLO", "SYN", "SYP", "SZL", "T", "TAO", "TET", "TFUEL", "THB", "THETA", "TIA", "TIME", "TJS", "TKX", "TMM", "TMT", "TND", "TON", "TONE", "TOP", "TOPIA", "TOR", "TRAC", "TRB", "TRIBE", "TRL", "TRU", "TRUMP", "TRX", "TRY", "TTD", "TTT", "TUSD", "TVD", "TVK", "TWD", "TWT", "TZS", "UAH", "UGX", "UMA", "UNFI", "UNI", "UOS", "UPI", "UQC", "USD", "USDC", "USDD", "USDE", "USDP", "USDT", "UST", "USTC", "UYU", "UZS", "VAL", "VARA", "VEB", "VED", "VEF", "VELO", "VES", "VET", "VGX", "VND", "VNST", "VOXEL", "VR", "VTHO", "VUV", "WAMPL", "WAVES", "WAXL", "WAXP", "WBETH", "WBT", "WBTC", "WCFG", "WEMIX", "WHRH", "WIF", "WLD", "WLUNA", "WOO", "WST", "XAF", "XAG", "XAI", "XAU", "XAUT", "XBT", "XCD", "XCH", "XCN", "XDC", "XDR", "XEC", "XEM", "XLM", "XMON", "XMR", "XOF", "XPD", "XPF", "XPT", "XRD", "XRP", "XTZ", "XVS", "XYO", "YER", "YFI", "YFII", "ZAR", "ZEC", "ZEN", "ZETA", "ZIL", "ZMK", "ZMW", "ZRX", "ZWD", "ZWL"];
        if (args.length < 3) {
            await client.say(channel, `${tags.username} you are missing one or all of the args, the format should be like so, !currency <from> <to> <amount>`);
            return;
        }

        const fromCurrency = args[0].toUpperCase();
        const toCurrency = args[1].toUpperCase();

        if (!list.includes(fromCurrency) || !list.includes(toCurrency)) {
            await client.say(channel, `${tags.username} one or both of the currencies provided are not supported.`);
            return;
        }

        const amount = parseFloat(args[2]);

        if (isNaN(amount)) {
            await client.say(channel, `${tags.username} the amount should be a valid number.`);
            return;
        }

        try {
            const response = await axios.get(`https://decapi.me/misc/currency?from=${fromCurrency}&to=${toCurrency}&value=${amount}`);
            const convertedAmount = response.data;
            await client.say(channel, `${tags.username} ${convertedAmount}.`);
        } catch (error) {
            console.error(error);
            await client.say(channel, `${tags.username} an error occurred while fetching the conversion data. Please try again later.`);
        }
    },
};