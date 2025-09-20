import { Stack } from "expo-router";
import { ThemeProvider } from "../src/context/ThemeContext";
import { I18nextProvider } from "react-i18next";
import i18n from "../src/services/i18n";
import QueryClientProvider from "../src/services/QueryClientProvider";
import LanguageProvider from "../src/context/LanguageContext";

export default function Layout() {
  return (
    <QueryClientProvider>
      <I18nextProvider i18n={i18n}>
        <LanguageProvider>
          <ThemeProvider>
            <Stack screenOptions={{ headerShown: false }} />
          </ThemeProvider>
        </LanguageProvider>
      </I18nextProvider>
    </QueryClientProvider>
  );
}
