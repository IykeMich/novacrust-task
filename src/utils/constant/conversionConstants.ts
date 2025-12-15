import type { CurrencyOption, DropdownOption } from "@/type/conversionTypes";
import metamaskIcon from "@/assets/image/metamask-image.png";
import rainbowIcon from "@/assets/image/rainbow-image.png";
import walletConnectIcon from "@/assets/image/walletconnect-image.png";
import otherCryptoIcon from "@/assets/image/other-crypto-image.png";
import ethImage from "@/assets/image/etherum-image.png";
import celoImage from "@/assets/image/celo-image.png";
import tonImage from "@/assets/image/ton-image.png";
import bnbImage from "@/assets/image/bnb-image.png";
import usaFlag from "@/assets/image/flags/usa-flag.jpg";
import europeFlag from "@/assets/image/flags/europe-flag.jpg";
import greatBritainFlag from "@/assets/image/flags/great-britain-flag.jpg";
import nigeriaFlag from "@/assets/image/flags/nigeria-flag.jpg";
import canadaFlag from "@/assets/image/flags/canada-flag.jpg";

export const cryptoOptions: CurrencyOption[] = [
  { label: "ETH", value: "ETH", icon: ethImage },
  { label: "USDT - CELO", value: "USDT-CELO", icon: celoImage },
  { label: "USDT - TON", value: "USDT-TON", icon: tonImage },
  { label: "USDT - BNB", value: "USDT-BNB", icon: bnbImage },
];

export const fiatOptions: CurrencyOption[] = [
  { label: "USD", value: "USD", icon: usaFlag },
  { label: "EUR", value: "EUR", icon: europeFlag },
  { label: "GBP", value: "GBP", icon: greatBritainFlag },
  { label: "NGN", value: "NGN", icon: nigeriaFlag },
  { label: "CAD", value: "CAD", icon: canadaFlag },
];

export const payFromOptions: DropdownOption[] = [
  { label: "Metamask", value: "metamask", icon: metamaskIcon },
  { label: "Rainbow", value: "rainbow", icon: rainbowIcon },
  { label: "WalletConnect", value: "walletconnect", icon: walletConnectIcon },
  { label: "Other Crypto Wallets (Binance, Conibase, Bybit etc)", value: "other", icon: otherCryptoIcon },
];

export const payToOptions: DropdownOption[] = [
  { label: "Metamask", value: "metamask", icon: metamaskIcon },
  { label: "Rainbow", value: "rainbow", icon: rainbowIcon },
  { label: "WalletConnect", value: "walletconnect", icon: walletConnectIcon },
  { label: "Other Crypto Wallets (Binance, Conibase, Bybit etc)", value: "other", icon: otherCryptoIcon },
];

export const CONVERSION_RATE = 1500;

