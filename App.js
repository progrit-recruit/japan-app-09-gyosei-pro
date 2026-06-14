import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import LanguageSelectScreen from './src/screens/LanguageSelectScreen';
import MainApp from './src/screens/MainApp';

export default function App() {
  const [lang, setLang] = useState(null);

  if (!lang) {
    return (
      <>
        <LanguageSelectScreen onSelect={setLang} />
        <StatusBar style="auto" />
      </>
    );
  }

  return (
    <>
      <MainApp lang={lang} />
      <StatusBar style="auto" />
    </>
  );
}
