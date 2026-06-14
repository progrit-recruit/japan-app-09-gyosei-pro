import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { t } from '../i18n';
import { colors, fontSizes, borderRadius, shadows, spacing } from '../theme';

export default function LoginScreen({ onLogin, lang, setLang }) {
  const [email, setEmail] = useState('gyosei@example.com');
  const [password, setPassword] = useState('password');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      setError(lang === 'ja' ? 'メールとパスワードを入力してください' : 'Please enter email and password');
      return;
    }
    setError('');
    onLogin();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Language toggle */}
          <View style={styles.langToggleRow}>
            <TouchableOpacity
              style={[styles.langToggle, lang === 'ja' && styles.langToggleActive]}
              onPress={() => setLang('ja')}
            >
              <Text style={[styles.langToggleText, lang === 'ja' && styles.langToggleTextActive]}>🇯🇵 JP</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.langToggle, lang === 'en' && styles.langToggleActive]}
              onPress={() => setLang('en')}
            >
              <Text style={[styles.langToggleText, lang === 'en' && styles.langToggleTextActive]}>🇺🇸 EN</Text>
            </TouchableOpacity>
          </View>

          {/* Logo */}
          <View style={styles.logoSection}>
            <View style={styles.logoIcon}>
              <Ionicons name="document-text" size={44} color={colors.card} />
            </View>
            <Text style={styles.appName}>行政書士プロ</Text>
            <Text style={styles.appNameEn}>Gyosei Shoshi Pro</Text>
          </View>

          {/* Form */}
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>{t(lang, 'login')}</Text>

            {error ? (
              <View style={styles.errorBox}>
                <Ionicons name="alert-circle" size={16} color={colors.danger} />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>{t(lang, 'email')}</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="mail-outline" size={18} color={colors.textLight} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="gyosei@example.com"
                  placeholderTextColor={colors.textLight}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>{t(lang, 'password')}</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed-outline" size={18} color={colors.textLight} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="••••••••"
                  placeholderTextColor={colors.textLight}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={18}
                    color={colors.textLight}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin} activeOpacity={0.85}>
              <Text style={styles.loginButtonText}>{t(lang, 'login')}</Text>
              <Ionicons name="arrow-forward" size={20} color={colors.card} />
            </TouchableOpacity>

            <View style={styles.demoNote}>
              <Ionicons name="information-circle-outline" size={14} color={colors.textLight} />
              <Text style={styles.demoNoteText}>
                {lang === 'ja' ? 'デモ用: 任意のメール・パスワードでログイン可能' : 'Demo: Any email/password works'}
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  langToggleRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: spacing.md,
    gap: 8,
  },
  langToggle: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  langToggleActive: {
    backgroundColor: colors.card,
  },
  langToggleText: {
    fontSize: fontSizes.sm,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '600',
  },
  langToggleTextActive: {
    color: colors.primary,
  },
  logoSection: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  logoIcon: {
    width: 88,
    height: 88,
    borderRadius: borderRadius.xl,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  appName: {
    fontSize: fontSizes.xxl,
    fontWeight: '800',
    color: colors.card,
    letterSpacing: 1,
  },
  appNameEn: {
    fontSize: fontSizes.sm,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
  },
  formCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    ...shadows.md,
  },
  formTitle: {
    fontSize: fontSizes.xl,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.dangerLight,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    marginBottom: spacing.md,
    gap: 6,
  },
  errorText: {
    fontSize: fontSizes.sm,
    color: colors.danger,
    flex: 1,
  },
  inputGroup: {
    marginBottom: spacing.md,
  },
  inputLabel: {
    fontSize: fontSizes.sm,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    backgroundColor: colors.background,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: fontSizes.md,
    color: colors.text,
    paddingVertical: 13,
  },
  eyeButton: {
    padding: 4,
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: 15,
    marginTop: spacing.sm,
    gap: 8,
  },
  loginButtonText: {
    fontSize: fontSizes.lg,
    fontWeight: '700',
    color: colors.card,
  },
  demoNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
    gap: 4,
  },
  demoNoteText: {
    fontSize: fontSizes.xs,
    color: colors.textLight,
  },
});
