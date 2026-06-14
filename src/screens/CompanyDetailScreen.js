import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fontSizes, borderRadius, shadows, spacing } from '../theme';
import { corporateRequests } from '../data/mockData';

function StatusBadge({ status }) {
  const config = {
    new: { color: colors.danger, bg: colors.dangerLight, label: '新規' },
    in_progress: { color: colors.warning, bg: colors.warningLight, label: '対応中' },
    waiting_docs: { color: colors.primary, bg: colors.primaryLight, label: '書類待ち' },
    completed: { color: colors.secondary, bg: colors.secondaryLight, label: '完了' },
  };
  const cfg = config[status] || config.new;
  return (
    <View style={[styles.badge, { backgroundColor: cfg.bg }]}>
      <Text style={[styles.badgeText, { color: cfg.color }]}>{cfg.label}</Text>
    </View>
  );
}

export default function CompanyDetailScreen({ lang, company, navigate, goBack }) {
  const renderEmployee = ({ item }) => {
    const empRequests = corporateRequests.filter((r) => item.requestIds.includes(r.id));
    const latestRequest = empRequests[empRequests.length - 1];

    return (
      <TouchableOpacity
        style={styles.employeeCard}
        onPress={() => navigate('EmployeeDetail', { employee: item, companyName: company.name })}
        activeOpacity={0.8}
      >
        <Text style={styles.employeeFlag}>{item.flag}</Text>
        <View style={styles.employeeInfo}>
          <Text style={styles.employeeName}>{item.name}</Text>
          <Text style={styles.employeeMeta}>{item.nationality} / {item.visaType}</Text>
          <Text style={styles.requestCount}>依頼: {empRequests.length}件</Text>
        </View>
        <View style={styles.employeeRight}>
          {latestRequest && <StatusBadge status={latestRequest.status} />}
          <Ionicons name="chevron-forward" size={18} color={colors.textLight} />
        </View>
      </TouchableOpacity>
    );
  };

  const infoGrid = [
    { label: '業種', value: company.industry },
    { label: '場所', value: company.location },
    { label: '従業員数', value: `${company.totalEmployees}名` },
    { label: '対応中件数', value: `${company.pendingRequests}件` },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={goBack}>
          <Ionicons name="arrow-back" size={22} color={colors.card} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {company.emoji} {company.name}
        </Text>
      </View>

      <FlatList
        data={company.employees}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderEmployee}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {/* Company info card */}
            <View style={styles.infoCard}>
              <View style={styles.infoGrid}>
                {infoGrid.map((info, index) => (
                  <View key={index} style={styles.infoGridItem}>
                    <Text style={styles.infoGridLabel}>{info.label}</Text>
                    <Text style={styles.infoGridValue}>{info.value}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Section title */}
            <Text style={styles.sectionTitle}>従業員一覧</Text>
          </>
        }
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="people-outline" size={40} color={colors.border} />
            <Text style={styles.emptyText}>従業員がいません</Text>
          </View>
        }
      />
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
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    gap: 10,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    flex: 1,
    fontSize: fontSizes.lg,
    fontWeight: '700',
    color: colors.card,
  },
  infoCard: {
    backgroundColor: colors.primary,
    margin: spacing.md,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...shadows.sm,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  infoGridItem: {
    width: '45%',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: borderRadius.md,
    padding: 12,
  },
  infoGridLabel: {
    fontSize: fontSizes.xs,
    color: 'rgba(255,255,255,0.75)',
    fontWeight: '500',
    marginBottom: 4,
  },
  infoGridValue: {
    fontSize: fontSizes.md,
    color: colors.card,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: fontSizes.md,
    fontWeight: '700',
    color: colors.text,
    marginHorizontal: spacing.md,
    marginBottom: 10,
  },
  listContent: {
    paddingBottom: 24,
  },
  employeeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginHorizontal: spacing.md,
    marginBottom: 10,
    ...shadows.sm,
  },
  employeeFlag: {
    fontSize: 32,
    marginRight: 12,
  },
  employeeInfo: {
    flex: 1,
    gap: 3,
  },
  employeeName: {
    fontSize: fontSizes.md,
    fontWeight: '700',
    color: colors.text,
  },
  employeeMeta: {
    fontSize: fontSizes.sm,
    color: colors.textLight,
  },
  requestCount: {
    fontSize: fontSizes.xs,
    color: colors.textLight,
  },
  employeeRight: {
    alignItems: 'flex-end',
    gap: 6,
  },
  badge: {
    borderRadius: borderRadius.full,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeText: {
    fontSize: fontSizes.xs,
    fontWeight: '700',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
    gap: 10,
  },
  emptyText: {
    fontSize: fontSizes.md,
    color: colors.textLight,
  },
});
