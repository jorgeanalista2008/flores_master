export interface CryptoWallet {
  id: string;
  name: string;
  symbol: string;
  network: string;
  address: string;
  icon: string;
  color: string;
}

export const CRYPTO_WALLETS: CryptoWallet[] = [
  {
    id: 'usdt-trc20',
    name: 'Tether USDT',
    symbol: 'USDT',
    network: 'Tron (TRC-20)',
    address: process.env.NEXT_PUBLIC_CRYPTO_USDT_TRC20 || 'TYDzsYqa1Fk7vXnJ5kG9PqX9e6u1M9sample',
    icon: '₮',
    color: '#26A17B',
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    network: 'Solana Network',
    address: process.env.NEXT_PUBLIC_CRYPTO_SOL || '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosample',
    icon: '◎',
    color: '#9945FF',
  },
  {
    id: 'ethereum',
    name: 'Ethereum & EVM',
    symbol: 'ETH / USDT',
    network: 'ERC-20 / Polygon / Arbitrum',
    address: process.env.NEXT_PUBLIC_CRYPTO_ETH || '0x71C8705334fSAMPLE0b299e5512B47F2a9sample',
    icon: 'Ξ',
    color: '#627EEA',
  },
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    network: 'Bitcoin Native (SegWit)',
    address: process.env.NEXT_PUBLIC_CRYPTO_BTC || 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83sample',
    icon: '₿',
    color: '#F7931A',
  },
];
