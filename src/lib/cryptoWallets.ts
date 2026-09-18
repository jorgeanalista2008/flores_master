export interface CryptoWallet {
  id: string;
  name: string;
  symbol: string;
  network: string;
  address: string;
  icon: string;
  color: string;
  qrImage: string;
  warning: string;
}

export const USDT_TRON_WALLET: CryptoWallet = {
  id: 'usdt-tron',
  name: 'Tether USDT',
  symbol: 'USDT',
  network: 'TRON (TRC-20)',
  address: 'TJxPQTXHsCaj6z8RdVbft5WGX9dQNhyW4',
  icon: '₮',
  color: '#26A17B',
  qrImage: '/usdt-qr.jpg',
  warning: 'Solo envía activos de la red TRON (TRC-20) a esta dirección.',
};
