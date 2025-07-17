import { useEffect, useState } from "react";
import type { Currency } from "../contexts/CurrencyContext";

export type UseAppResult = {
  isMenuOpen: boolean;
  setMenuOpen: (isOpen: boolean) => void;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
};

const useApp = (): UseAppResult => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [currency, setCurrency] = useState<Currency>("eur");

  useEffect(() => {
    if (!localStorage.getItem("currency")) {
      localStorage.setItem("currency", "eur");
    } else {
      localStorage.setItem("currency", currency);
    }

    const savedCurrency = localStorage.getItem("currency");
    setCurrency((savedCurrency as Currency) || "eur");
  }, [currency]);

  return { isMenuOpen, setMenuOpen, currency, setCurrency };
};

export { useApp };
