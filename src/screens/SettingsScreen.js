import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  StyleSheet,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { t } from '../i18n';
import { colors, fontSizes, borderRadius, shadows, spacing } from '../theme';

export default function SettingsScreen({ lang, setLang, onLogout }) {
  const [pushNotif, setPushNotif] = useState(true);
  const [newReqNotif, setNewReqNotif] = useState(true);
  const [docNotif, setDocNotif] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const languages = [
    { code: 'ja', label: '🇯🇵 日本語', sub: 'Japanese' },
    { code: 'en', label: '🇺🇸 English', sub: '英語' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="settings" size={20} color={colors.primary} />
        <Text style={styles.headerTitle}>{t(lang, 'settings')}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Profile Section */}
        <View style={styles.profileCard}>
          <View style={styles.profileAvatar}>
            <Ionicons name="person" size={36} color={colors.card} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>田中 花子</Text>
            <Text style={styles.profileRole}>
              {lang === 'ja' ? '行政書士' : 'Gyosei Shoshi'}
            </Text>
            <View style={styles.regBadge}>
              <Ionicons name="card-outline" size={12} color={colors.primary} />
              <Text style={styles.regText}>登録番号: 第12-345678号</Text>
            </View>
          </View>
        </View>

        {/* Profile Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t(lang, 'profile')}</Text>
          <View style={styles.settingsCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <View style={[styles.settingIcon, { backgroundColor: colors.primaryLight }]}>
                  <Ionicons name="person-outline" size={16} color={colors.primary} />
                </View>
                <Text style={styles.settingLabel}>{t(lang, 'gyosei_name')}</Text>
              </View>
              <Text style={styles.settingValue}>田中 花子</Text>
            </View>
            <View style={styles.settingDivider} />
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <View style={[styles.settingIcon, { backgroundColor: colors.primaryLight }]}>
                  <Ionicons name="card-outline" size={16} color={colors.primary} />
                </View>
                <Text style={styles.settingLabel}>{t(lang, 'registration_number')}</Text>
              </View>
              <Text style={styles.settingValue}>第12-345678号</Text>
            </View>
            <View style={styles.settingDivider} />
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <View style={[styles.settingIcon, { backgroundColor: colors.primaryLight }]}>
                  <Ionicons name="mail-outline" size={16} color={colors.primary} />
                </View>
                <Text style={styles.settingLabel}>Email</Text>
              </View>
              <Text style={styles.settingValue}>gyosei@example.com</Text>
            </View>
          </View>
        </View>

        {/* Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t(lang, 'notifications')}</Text>
          <View style={styles.settingsCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <View style={[styles.settingIcon, { backgroundColor: colors.warningLight }]}>
                  <Ionicons name="notifications-outline" size={16} color={colors.warning} />
                </View>
                <Text style={styles.settingLabel}>{t(lang, 'push_notifications')}</Text>
              </View>
              <Switch
                value={pushNotif}
                onValueChange={setPushNotif}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={colors.card}
              />
            </View>
            <View style={styles.settingDivider} />
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <View style={[styles.settingIcon, { backgroundColor: colors.dangerLight }]}>
                  <Ionicons name="mail-outline" size={16} color={colors.danger} />
                </View>
                <Text style={styles.settingLabel}>{t(lang, 'new_request_notify')}</Text>
              </View>
              <Switch
                value={newReqNotif}
                onValueChange={setNewReqNotif}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={colors.card}
                disabled={!pushNotif}
              />
            </View>
            <View style={styles.settingDivider} />
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <View style={[styles.settingIcon, { backgroundColor: colors.secondaryLight }]}>
                  <Ionicons name="document-outline" size={16} color={colors.secondary} />
                </View>
                <Text style={styles.settingLabel}>{t(lang, 'doc_request_notify')}</Text>
              </View>
              <Switch
                value={docNotif}
                onValueChange={setDocNotif}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={colors.card}
                disabled={!pushNotif}
              />
            </View>
          </View>
        </View>

        {/* Language */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t(lang, 'language')}</Text>
          <View style={styles.settingsCard}>
            {languages.map((l, index) => (
              <React.Fragment key={l.code}>
                {index > 0 && <View style={styles.settingDivider} />}
                <TouchableOpacity
                  style={styles.settingRow}
                  onPress={() => setLang(l.code)}
                  activeOpacity={0.7}
                >
                  <View style={styles.settingLeft}>
                    <Text style={styles.langFlag}>{l.label.split(' ')[0]}</Text>
                    <View>
                      <Text style={styles.settingLabel}>{l.label.split(' ').slice(1).join(' ')}</Text>
                      <Text style={styles.settingSubLabel}>{l.sub}</Text>
                    </View>
                  </View>
                  {lang === l.code && (
                    <Ionicons name="checkmark-circle" size={22} color={colors.primary} />
                  )}
                </TouchableOpacity>
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* App info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t(lang, 'app_version')}</Text>
          <View style={styles.settingsCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <View style={[styles.settingIcon, { backgroundColor: colors.background }]}>
                  <Ionicons name="information-circle-outline" size={16} color={colors.textLight} />
                </View>
                <Text style={styles.settingLabel}>{t(lang, 'app_version')}</Text>
              </View>
              <Text style={styles.settingValue}>1.0.0</Text>
            </View>
          </View>
        </View>

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => setShowLogoutConfirm(true)}
          activeOpacity={0.8}
        >
          <Ionicons name="log-out-outline" size={20} color={colors.danger} />
          <Text style={styles.logoutText}>{t(lang, 'logout')}</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>行政書士プロ v1.0.0</Text>
          <Text style={styles.footerSubText}>Gyosei Shoshi Pro</Text>
        </View>
      </ScrollView>

      {/* Logout Confirm Modal */}
      <Modal visible={showLogoutConfirm} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.confirmCard}>
            <View style={styles.confirmIconBg}>
              <Ionicons name="log-out-outline" size={36} color={colors.danger} />
            </View>
            <Text style={styles.confirmTitle}>
              {lang === 'ja' ? 'ログアウトしますか？' : 'Sign Out?'}
            </Text>
            <Text style={styles.confirmMsg}>
              {lang === 'ja' ? 'ログアウトしてもよろしいですか？' : 'Are you sure you want to sign out?'}
            </Text>
            <View style={styles.confirmActions}>
              <TouchableOpacity
                style={styles.confirmCancelBtn}
                onPress={() => setShowLogoutConfirm(false)}
              >
                <Text style={styles.confirmCancelText}>{t(lang, 'cancel')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmLogoutBtn}
                onPress={() => {
                  setShowLogoutConfirm(false);
                  onLogout();
                }}
              >
                <Text style={styles.confirmLogoutText}>{t(lang, 'logout')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: 8,
  },
  headerTitle: {
    fontSize: fontSizes.lg,
    fontWeight: '700',
    color: colors.text,
  },
  content: {
    paddingBottom: 32,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    margin: spacing.md,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    gap: 14,
  },
  profileAvatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: fontSizes.xl,
    fontWeight: '800',
    color: colors.card,
  },
  profileRole: {
    fontSize: fontSizes.sm,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  regBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: borderRadius.sm,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 6,
    gap: 4,
    alignSelf: 'flex-start',
  },
  regText: {
    fontSize: fontSizes.xs,
    color: colors.card,
    fontWeight: '600',
  },
  section: {
    marginHorizontal: spacing.md,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: fontSizes.sm,
    fontWeight: '700',
    color: colors.textLight,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
    marginLeft: 4,
  },
  settingsCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    ...shadows.sm,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: 13,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  settingIcon: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingLabel: {
    fontSize: fontSizes.md,
    color: colors.text,
    fontWeight: '500',
  },
  settingSubLabel: {
    fontSize: fontSizes.xs,
    color: colors.textLight,
    marginTop: 1,
  },
  settingValue: {
    fontSize: fontSizes.sm,
    color: colors.textLight,
    fontWeight: '500',
  },
  settingDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: 56,
  },
  langFlag: {
    fontSize: 24,
    marginRight: 6,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: spacing.md,
    marginTop: 4,
    marginBottom: 16,
    backgroundColor: colors.dangerLight,
    borderRadius: borderRadius.md,
    paddingVertical: 14,
    gap: 8,
    borderWidth: 1.5,
    borderColor: '#FECACA',
  },
  logoutText: {
    fontSize: fontSizes.md,
    color: colors.danger,
    fontWeight: '700',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  footerText: {
    fontSize: fontSizes.sm,
    color: colors.textLight,
  },
  footerSubText: {
    fontSize: fontSizes.xs,
    color: colors.border,
    marginTop: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    margin: spacing.lg,
    padding: spacing.lg,
    alignItems: 'center',
    width: '85%',
    ...shadows.md,
  },
  confirmIconBg: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.dangerLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  confirmTitle: {
    fontSize: fontSizes.lg,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  confirmMsg: {
    fontSize: fontSizes.sm,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: spacing.lg,
    lineHeight: 20,
  },
  confirmActions: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  confirmCancelBtn: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
    paddingVertical: 13,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  confirmCancelText: {
    fontSize: fontSizes.md,
    color: colors.textLight,
    fontWeight: '600',
  },
  confirmLogoutBtn: {
    flex: 1,
    backgroundColor: colors.danger,
    borderRadius: borderRadius.md,
    paddingVertical: 13,
    alignItems: 'center',
  },
  confirmLogoutText: {
    fontSize: fontSizes.md,
    color: colors.card,
    fontWeight: '700',
  },
});
