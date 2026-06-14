import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { t } from '../i18n';
import { colors, fontSizes, borderRadius, shadows, spacing } from '../theme';
import { corporateRequests } from '../data/mockData';

const allRequests = [...corporateRequests];

const statCards = [
  { key: 'new_request', count: 3, icon: 'mail-outline', color: colors.danger, bg: colors.dangerLight },
  { key: 'in_progress', count: 4, icon: 'time-outline', color: colors.warning, bg: colors.warningLight },
  { key: 'waiting_docs', count: 1, icon: 'document-outline', color: colors.primary, bg: colors.primaryLight },
  { key: 'completed_count', count: 5, icon: 'checkmark-circle-outline', color: colors.secondary, bg: colors.secondaryLight },
];

function StatusBadge({ status, lang }) {
  const config = {
    new: { color: colors.danger, bg: colors.dangerLight, key: 'status_new' },
    in_progress: { color: colors.warning, bg: colors.warningLight, key: 'status_in_progress' },
    waiting_docs: { color: colors.primary, bg: colors.primaryLight, key: 'status_waiting_docs' },
    completed: { color: colors.secondary, bg: colors.secondaryLight, key: 'status_completed' },
  };
  const cfg = config[status] || config.new;
  return (
    <View style={[styles.badge, { backgroundColor: cfg.bg }]}>
      <Text style={[styles.badgeText, { color: cfg.color }]}>{t(lang, cfg.key)}</Text>
    </View>
  );
}


export default function DashboardScreen({ lang, navigate }) {
  const urgentRequests = allRequests.filter(r => r.priority === 'urgent' && r.status !== 'completed');
  const latestRequests = [...allRequests]
    .sort((a, b) => new Date(b.submittedDate) - new Date(a.submittedDate))
    .slice(0, 5);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerGreeting}>{lang === 'ja' ? 'こんにちは' : 'Welcome back'}</Text>
          <Text style={styles.headerName}>田中 行政書士</Text>
        </View>
        <View style={styles.headerIcon}>
          <Ionicons name="person-circle" size={42} color={colors.primary} />
        </View>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        {statCards.map(card => (
          <View key={card.key} style={[styles.statCard, { borderLeftColor: card.color }]}>
            <View style={[styles.statIconBg, { backgroundColor: card.bg }]}>
              <Ionicons name={card.icon} size={20} color={card.color} />
            </View>
            <Text style={styles.statCount}>{card.count}</Text>
            <Text style={styles.statLabel}>{t(lang, card.key)}</Text>
          </View>
        ))}
      </View>

      {/* Urgent Alerts */}
      {urgentRequests.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="warning" size={18} color={colors.danger} />
            <Text style={styles.sectionTitle}>{t(lang, 'urgent_alerts')}</Text>
          </View>
          {urgentRequests.map(req => (
            <TouchableOpacity
              key={`${req.source}-${req.id}`}
              style={styles.urgentCard}
              onPress={() => navigate('requestDetail', req)}
              activeOpacity={0.8}
            >
              <View style={styles.urgentLeft}>
                <Text style={styles.urgentFlag}>
                  {req.flag}
                </Text>
                <View style={styles.urgentInfo}>
                  <Text style={styles.urgentName}>
                    {req.clientName || req.employeeName}
                  </Text>
                  <Text style={styles.urgentType} numberOfLines={1}>
                    {req.requestType}
                  </Text>
                  {req.companyName && (
                    <Text style={styles.urgentCompany} numberOfLines={1}>{req.companyName}</Text>
                  )}
                </View>
              </View>
              <View style={styles.urgentRight}>
                <View style={styles.urgentBadge}>
                  <Text style={styles.urgentBadgeText}>{t(lang, 'urgent')}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Latest Requests */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t(lang, 'latest_requests')}</Text>
        </View>
        {latestRequests.map(req => (
          <TouchableOpacity
            key={`${req.source}-${req.id}`}
            style={styles.requestCard}
            onPress={() => navigate('requestDetail', req)}
            activeOpacity={0.8}
          >
            <View style={styles.requestCardTop}>
              <Text style={styles.requestFlag}>{req.flag}</Text>
              <View style={styles.requestInfo}>
                <View style={styles.requestNameRow}>
                  <Text style={styles.requestName} numberOfLines={1}>
                    {req.companyName}
                  </Text>
                </View>
                <Text style={styles.requestType} numberOfLines={1}>{req.employeeName} · {req.requestType}</Text>
              </View>
            </View>
            <View style={styles.requestCardBottom}>
              <Text style={styles.requestDate}>{req.submittedDate}</Text>
              <StatusBadge status={req.status} lang={lang} />
              {req.priority === 'urgent' && (
                <View style={styles.urgentSmall}>
                  <Text style={styles.urgentSmallText}>{t(lang, 'urgent')}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerGreeting: {
    fontSize: fontSizes.sm,
    color: colors.textLight,
  },
  headerName: {
    fontSize: fontSizes.lg,
    fontWeight: '700',
    color: colors.text,
    marginTop: 2,
  },
  headerIcon: {
    padding: 2,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: spacing.md,
    gap: 10,
  },
  statCard: {
    width: '47.5%',
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderLeftWidth: 4,
    ...shadows.sm,
  },
  statIconBg: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statCount: {
    fontSize: fontSizes.xxl,
    fontWeight: '800',
    color: colors.text,
  },
  statLabel: {
    fontSize: fontSizes.xs,
    color: colors.textLight,
    marginTop: 2,
    fontWeight: '500',
  },
  section: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 6,
  },
  sectionTitle: {
    fontSize: fontSizes.md,
    fontWeight: '700',
    color: colors.text,
  },
  urgentCard: {
    backgroundColor: colors.dangerLight,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  urgentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 10,
  },
  urgentFlag: {
    fontSize: 28,
  },
  urgentInfo: {
    flex: 1,
  },
  urgentName: {
    fontSize: fontSizes.md,
    fontWeight: '700',
    color: colors.text,
  },
  urgentType: {
    fontSize: fontSizes.sm,
    color: colors.textLight,
    marginTop: 2,
  },
  urgentCompany: {
    fontSize: fontSizes.xs,
    color: colors.textLight,
    marginTop: 1,
  },
  urgentRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  urgentBadge: {
    backgroundColor: colors.danger,
    borderRadius: borderRadius.full,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  urgentBadgeText: {
    fontSize: fontSizes.xs,
    color: colors.card,
    fontWeight: '700',
  },
  requestCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: 8,
    ...shadows.sm,
  },
  requestCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  requestFlag: {
    fontSize: 26,
  },
  requestInfo: {
    flex: 1,
  },
  requestNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  requestName: {
    fontSize: fontSizes.md,
    fontWeight: '700',
    color: colors.text,
    flex: 1,
  },
  requestType: {
    fontSize: fontSizes.sm,
    color: colors.textLight,
  },
  requestCardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  requestDate: {
    fontSize: fontSizes.xs,
    color: colors.textLight,
    flex: 1,
  },
  badge: {
    borderRadius: borderRadius.full,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeText: {
    fontSize: fontSizes.xs,
    fontWeight: '600',
  },
  urgentSmall: {
    backgroundColor: colors.danger,
    borderRadius: borderRadius.full,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  urgentSmallText: {
    fontSize: fontSizes.xs,
    color: colors.card,
    fontWeight: '700',
  },
});
