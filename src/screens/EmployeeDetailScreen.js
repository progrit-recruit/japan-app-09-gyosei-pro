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

export default function EmployeeDetailScreen({ lang, employee, companyName, navigate, goBack }) {
  const empRequests = corporateRequests.filter((r) => employee.requestIds.includes(r.id));

  const renderRequest = ({ item }) => (
    <TouchableOpacity
      style={styles.requestCard}
      onPress={() => navigate('RequestDetail', { request: item })}
      activeOpacity={0.8}
    >
      <View style={styles.requestTop}>
        <Text style={styles.requestType}>{item.requestType}</Text>
        <View style={styles.requestBadges}>
          {item.priority === 'urgent' && (
            <View style={styles.urgentTag}>
              <Text style={styles.urgentTagText}>緊急</Text>
            </View>
          )}
          <StatusBadge status={item.status} />
        </View>
      </View>
      <Text style={styles.requestDate}>提出日: {item.submittedDate}</Text>
      {item.comments && item.comments.length > 0 && (
        <View style={styles.commentBubble}>
          <Ionicons name="chatbubble-outline" size={12} color={colors.primary} />
          <Text style={styles.commentText} numberOfLines={2}>
            {item.comments[item.comments.length - 1]}
          </Text>
        </View>
      )}
      <View style={styles.requestFooter}>
        <Text style={styles.tapHint}>タップして詳細を見る</Text>
        <Ionicons name="chevron-forward" size={14} color={colors.textLight} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={goBack}>
          <Ionicons name="arrow-back" size={22} color={colors.card} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {employee.flag} {employee.name}
        </Text>
      </View>

      <FlatList
        data={empRequests}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderRequest}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {/* Profile card */}
            <View style={styles.profileCard}>
              <Text style={styles.profileFlag}>{employee.flag}</Text>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{employee.name}</Text>
                <Text style={styles.profileMeta}>{employee.nationality}</Text>
                <Text style={styles.profileVisa}>{employee.visaType}</Text>
                <View style={styles.companyTag}>
                  <Ionicons name="business-outline" size={12} color={colors.card} />
                  <Text style={styles.companyTagText}>{companyName}</Text>
                </View>
              </View>
            </View>

            {/* Section title */}
            <Text style={styles.sectionTitle}>依頼履歴</Text>
          </>
        }
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="document-outline" size={40} color={colors.border} />
            <Text style={styles.emptyText}>依頼がありません</Text>
          </View>
        }
      />

      {/* New request button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.newRequestBtn} activeOpacity={0.8}>
          <Ionicons name="add-circle-outline" size={20} color={colors.card} />
          <Text style={styles.newRequestText}>新規依頼を作成</Text>
        </TouchableOpacity>
      </View>
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
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    margin: spacing.md,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    gap: 16,
    ...shadows.sm,
  },
  profileFlag: {
    fontSize: 64,
  },
  profileInfo: {
    flex: 1,
    gap: 4,
  },
  profileName: {
    fontSize: fontSizes.xl,
    fontWeight: '800',
    color: colors.card,
  },
  profileMeta: {
    fontSize: fontSizes.sm,
    color: 'rgba(255,255,255,0.8)',
  },
  profileVisa: {
    fontSize: fontSizes.sm,
    color: 'rgba(255,255,255,0.8)',
  },
  companyTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: borderRadius.sm,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  companyTagText: {
    fontSize: fontSizes.xs,
    color: colors.card,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: fontSizes.md,
    fontWeight: '700',
    color: colors.text,
    marginHorizontal: spacing.md,
    marginBottom: 10,
  },
  listContent: {
    paddingBottom: 100,
  },
  requestCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginHorizontal: spacing.md,
    marginBottom: 10,
    ...shadows.sm,
  },
  requestTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  requestType: {
    fontSize: fontSizes.md,
    fontWeight: '700',
    color: colors.text,
    flex: 1,
  },
  requestBadges: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  urgentTag: {
    backgroundColor: colors.danger,
    borderRadius: borderRadius.full,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  urgentTagText: {
    fontSize: fontSizes.xs,
    color: colors.card,
    fontWeight: '700',
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
  requestDate: {
    fontSize: fontSizes.xs,
    color: colors.textLight,
    marginBottom: 8,
  },
  commentBubble: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    backgroundColor: colors.primaryLight,
    borderRadius: borderRadius.sm,
    padding: 8,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  commentText: {
    flex: 1,
    fontSize: fontSizes.sm,
    color: colors.text,
    lineHeight: 18,
  },
  requestFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
  },
  tapHint: {
    fontSize: fontSizes.xs,
    color: colors.textLight,
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
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    paddingBottom: 24,
  },
  newRequestBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: 14,
    gap: 8,
  },
  newRequestText: {
    fontSize: fontSizes.md,
    color: colors.card,
    fontWeight: '700',
  },
});
