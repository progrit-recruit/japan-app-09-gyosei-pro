import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fontSizes, borderRadius, shadows } from '../theme';

export default function LanguageSelectScreen({ onSelect }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.logoIcon}>
            <Ionicons name="document-text" size={48} color={colors.card} />
          </View>
          <Text style={styles.appName}>行政書士プロ</Text>
          <Text style={styles.appNameEn}>Gyosei Shoshi Pro</Text>
          <Text style={styles.tagline}>行政書士のための業務管理アプリ</Text>
        </View>

        <View style={styles.langSection}>
          <Text style={styles.selectTitle}>言語を選択 / Select Language</Text>

          <TouchableOpacity
            style={styles.langButton}
            onPress={() => onSelect('ja')}
            activeOpacity={0.8}
          >
            <Text style={styles.langFlag}>🇯🇵</Text>
            <View style={styles.langTextGroup}>
              <Text style={styles.langLabel}>日本語</Text>
              <Text style={styles.langSub}>Japanese</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.primary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.langButton}
            onPress={() => onSelect('en')}
            activeOpacity={0.8}
          >
            <Text style={styles.langFlag}>🇺🇸</Text>
            <View style={styles.langTextGroup}>
              <Text style={styles.langLabel}>English</Text>
              <Text style={styles.langSub}>英語</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 56,
  },
  logoIcon: {
    width: 96,
    height: 96,
    borderRadius: borderRadius.xl,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  appName: {
    fontSize: fontSizes.xxxl,
    fontWeight: '800',
    color: colors.card,
    letterSpacing: 1,
  },
  appNameEn: {
    fontSize: fontSizes.md,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 4,
    letterSpacing: 0.5,
  },
  tagline: {
    fontSize: fontSizes.sm,
    color: 'rgba(255,255,255,0.65)',
    marginTop: 10,
    textAlign: 'center',
  },
  langSection: {
    width: '100%',
  },
  selectTitle: {
    fontSize: fontSizes.md,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '500',
  },
  langButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 14,
    ...shadows.md,
  },
  langFlag: {
    fontSize: 32,
    marginRight: 16,
  },
  langTextGroup: {
    flex: 1,
  },
  langLabel: {
    fontSize: fontSizes.lg,
    fontWeight: '700',
    color: colors.text,
  },
  langSub: {
    fontSize: fontSizes.sm,
    color: colors.textLight,
    marginTop: 2,
  },
});
