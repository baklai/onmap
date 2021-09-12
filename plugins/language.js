export default function ({ i18n }) {
  if (process.client) {
    try {
      const browserLocale = i18n.getBrowserLocale();
      const isLocale = i18n.locales.find((item) => item.code === browserLocale);
      const code =
        localStorage.getItem('lang.code') ||
        (isLocale ? browserLocale : i18n.fallbackLocale) ||
        i18n.fallbackLocale;
      localStorage.setItem('lang.code', code);
      i18n.setLocale(code);
    } catch (err) {
      localStorage.setItem('lang.code', i18n.fallbackLocale);
      i18n.setLocale(i18n.fallbackLocale);
    }
  }
}
