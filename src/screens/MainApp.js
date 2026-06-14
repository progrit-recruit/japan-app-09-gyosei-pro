import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { t } from '../i18n';
import { colors, fontSizes, borderRadius } from '../theme';

import LoginScreen from './LoginScreen';
import DashboardScreen from './DashboardScreen';
import IndividualRequestsScreen from './IndividualRequestsScreen';
import CorporateRequestsScreen from './CorporateRequestsScreen';
import ClientsScreen from './ClientsScreen';
import SettingsScreen from './SettingsScreen';
import RequestDetailScreen from './RequestDetailScreen';

const TABS = [
  { key: 'dashboard', icon: 'speedometer-outline' },
  { key: 'individual_requests', icon: 'person-outline' },
  { key: 'corporate_requests', icon: 'business-outline' },
  { key: 'clients', icon: 'people-outline' },
  { key: 'settings', icon: 'settings-outline' },
];

export default function MainApp({ lang: initialLang }) {
  const [lang, setLang] = useState(initialLang);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [currentScreen, setCurrentScreen] = useState(null);
  const [screenParams, setScreenParams] = useState(null);
  const [screenHistory, setScreenHistory] = useState([]);

  const navigate = (screen, params) => {
    setScreenHistory(prev => [...prev, { screen: currentScreen, params: screenParams }]);
    setCurrentScreen(screen);
    setScreenParams(params);
  };

  const goBack = () => {
    if (screenHistory.length > 0) {
      const prev = screenHistory[screenHistory.length - 1];
      setScreenHistory(h => h.slice(0, -1));
      setCurrentScreen(prev.screen);
      setScreenParams(prev.params);
    }
  };

  const handleTabPress = (tabKey) => {
    setCurrentTab(tabKey);
    setCurrentScreen(null);
    setScreenParams(null);
    setScreenHistory([]);
  };

  if (!isLoggedIn) {
    return (
      <LoginScreen
        onLogin={() => setIsLoggedIn(true)}
        lang={lang}
        setLang={setLang}
      />
    );
  }

  // Overlay screens
  if (currentScreen === 'requestDetail') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <RequestDetailScreen
          lang={lang}
          request={screenParams}
          goBack={goBack}
        />
      </SafeAreaView>
    );
  }

  const renderTabContent = () => {
    switch (currentTab) {
      case 'dashboard':
        return <DashboardScreen lang={lang} navigate={navigate} />;
      case 'individual_requests':
        return <IndividualRequestsScreen lang={lang} navigate={navigate} />;
      case 'corporate_requests':
        return <CorporateRequestsScreen lang={lang} navigate={navigate} />;
      case 'clients':
        return <ClientsScreen lang={lang} navigate={navigate} />;
      case 'settings':
        return <SettingsScreen lang={lang} setLang={setLang} onLogout={() => setIsLoggedIn(false)} />;
      default:
        return <DashboardScreen lang={lang} navigate={navigate} />;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.content}>{renderTabContent()}</View>
        <View style={styles.tabBar}>
          {TABS.map((tab) => {
            const isActive = currentTab === tab.key;
            return (
              <TouchableOpacity
                key={tab.key}
                style={styles.tabItem}
                onPress={() => handleTabPress(tab.key)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={tab.icon}
                  size={22}
                  color={isActive ? colors.primary : colors.textLight}
                />
                <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                  {t(lang, tab.key)}
                </Text>
                {isActive && <View style={styles.activeIndicator} />}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingBottom: 8,
    paddingTop: 6,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingVertical: 4,
  },
  tabLabel: {
    fontSize: fontSizes.xs,
    color: colors.textLight,
    marginTop: 3,
    fontWeight: '500',
  },
  tabLabelActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  activeIndicator: {
    position: 'absolute',
    top: 0,
    width: 24,
    height: 2,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.full,
  },
});
