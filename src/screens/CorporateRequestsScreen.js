import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { t } from '../i18n';
import { colors, fontSizes, borderRadius, shadows, spacing } from '../theme';
import { corporateRequests } from '../data/mockData';

const FILTERS = ['all', 'new', 'in_progress', 'completed'];

const statusMap = {
  new: 'status_new',
  in_progress: 'status_in_progress',
  waiting_docs: 'status_waiting_docs',
  completed: 'status_completed',
};

const statusColors = {
  new: { color: colors.danger, bg: colors.dangerLight },
  in_progress: { color: colors.warning, bg: colors.warningLight },
  waiting_docs: { color: colors.primary, bg: colors.primaryLight },
  completed: { color: colors.secondary, bg: colors.secondaryLight },
};

function StatusBadge({ status, lang }) {
  const cfg = statusColors[status] || statusColors.new;
  return (
    <View style={[styles.badge, { backgroundColor: cfg.bg }]}>
      <Text style={[styles.badgeText, { color: cfg.color }]}>{t(lang, statusMap[status] || 'status_new')}</Text>
    </View>
  );
}

function CorporateCard({ item, lang, onPress }) {
  const isUrgent = item.priority === 'urgent';
  return (
    <TouchableOpacity
      style={[styles.card, isUrgent && styles.cardUrgent]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Corporate tag */}
      <View style={styles.corporateTagRow}>
        <View style={styles.corporateTag}>
          <Ionicons name="business" size={11} color={colors.primary} />
          <Text style={styles.corporateTagText}>{t(lang, 'corporate')}</Text>
        </View>
        {isUrgent && (
          <View style={styles.urgentTag}>
            <Ionicons name="warning" size={11} color={colors.card} />
            <Text style={styles.urgentTagText}>{t(lang, 'urgent')}</Text>
          </View>
        )}
      </View>

      {/* Company name */}
      <View style={styles.companyRow}>
        <Ionicons name="business-outline" size={18} color={colors.primary} />
        <Text style={styles.companyName}>{item.companyName}</Text>
        <Text style={styles.industryTag}>{item.industry}</Text>
      </View>

      {/* Employee */}
      <View style={styles.employeeRow}>
        <Text style={styles.empFlag}>{item.flag}</Text>
        <Text style={styles.employeeName}>{item.employeeName}</Text>
        <Text style={styles.visaType}>{item.visaType}</Text>
      </View>

      {/* Request type */}
      <Text style={styles.requestType}>{item.requestType}</Text>

      {/* Footer */}
      <View style={styles.cardFooter}>
        <View style={styles.dateRow}>
          <Ionicons name="calendar-outline" size={12} color={colors.textLight} />
          <Text style={styles.date}>{item.submittedDate}</Text>
        </View>
        <StatusBadge status={item.status} lang={lang} />
      </View>
    </TouchableOpacity>
  );
}

export default function CorporateRequestsScreen({ lang, navigate }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchText, setSearchText] = useState('');

  const filtered = corporateRequests.filter(r => {
    const matchFilter = activeFilter === 'all' || r.status === activeFilter;
    const matchSearch =
      !searchText ||
      r.companyName.includes(searchText) ||
      r.employeeName.toLowerCase().includes(searchText.toLowerCase()) ||
      r.requestType.includes(searchText);
    return matchFilter && matchSearch;
  });

  const filterLabel = (f) => {
    if (f === 'all') return t(lang, 'all');
    return t(lang, statusMap[f] || f);
  };

  const filterCount = (f) => {
    if (f === 'all') return corporateRequests.length;
    return corporateRequests.filter(r => r.status === f).length;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="business" size={20} color={colors.primary} />
          <Text style={styles.headerTitle}>{t(lang, 'corporate_requests')}</Text>
        </View>
        <View style={styles.totalBadge}>
          <Text style={styles.totalBadgeText}>{corporateRequests.length}</Text>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={16} color={colors.textLight} />
        <TextInput
          style={styles.searchInput}
          placeholder={t(lang, 'search')}
          placeholderTextColor={colors.textLight}
          value={searchText}
          onChangeText={setSearchText}
        />
        {searchText ? (
          <TouchableOpacity onPress={() => setSearchText('')}>
            <Ionicons name="close-circle" size={16} color={colors.textLight} />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Filters */}
      <View style={styles.filtersRow}>
        <FlatList
          horizontal
          data={FILTERS}
          keyExtractor={f => f}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContent}
          renderItem={({ item: f }) => (
            <TouchableOpacity
              style={[styles.filterChip, activeFilter === f && styles.filterChipActive]}
              onPress={() => setActiveFilter(f)}
            >
              <Text style={[styles.filterChipText, activeFilter === f && styles.filterChipTextActive]}>
                {filterLabel(f)}
              </Text>
              <View style={[styles.filterCount, activeFilter === f && styles.filterCountActive]}>
                <Text style={[styles.filterCountText, activeFilter === f && styles.filterCountTextActive]}>
                  {filterCount(f)}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={item => String(item.id)}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="business-outline" size={48} color={colors.border} />
            <Text style={styles.emptyText}>{t(lang, 'no_requests')}</Text>
          </View>
        }
        renderItem={({ item }) => (
          <CorporateCard
            item={item}
            lang={lang}
            onPress={() => navigate('requestDetail', item)}
          />
        )}
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
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: fontSizes.lg,
    fontWeight: '700',
    color: colors.text,
  },
  totalBadge: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.full,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalBadgeText: {
    fontSize: fontSizes.sm,
    color: colors.card,
    fontWeight: '700',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    marginHorizontal: spacing.md,
    marginVertical: 10,
    borderRadius: borderRadius.md,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: fontSizes.md,
    color: colors.text,
  },
  filtersRow: {
    marginBottom: 8,
  },
  filtersContent: {
    paddingHorizontal: spacing.md,
    gap: 8,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: borderRadius.full,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderWidth: 1.5,
    borderColor: colors.border,
    gap: 5,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterChipText: {
    fontSize: fontSizes.sm,
    color: colors.textLight,
    fontWeight: '600',
  },
  filterChipTextActive: {
    color: colors.card,
  },
  filterCount: {
    backgroundColor: colors.border,
    borderRadius: borderRadius.full,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterCountActive: {
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  filterCountText: {
    fontSize: 10,
    color: colors.textLight,
    fontWeight: '700',
  },
  filterCountTextActive: {
    color: colors.card,
  },
  listContent: {
    paddingHorizontal: spacing.md,
    paddingTop: 4,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: 10,
    ...shadows.sm,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  cardUrgent: {
    borderLeftColor: colors.danger,
  },
  corporateTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  corporateTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    borderRadius: borderRadius.sm,
    paddingHorizontal: 8,
    paddingVertical: 3,
    gap: 4,
  },
  corporateTagText: {
    fontSize: fontSizes.xs,
    color: colors.primary,
    fontWeight: '700',
  },
  urgentTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.danger,
    borderRadius: borderRadius.full,
    paddingHorizontal: 7,
    paddingVertical: 3,
    gap: 3,
  },
  urgentTagText: {
    fontSize: 10,
    color: colors.card,
    fontWeight: '700',
  },
  companyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  companyName: {
    fontSize: fontSizes.md,
    fontWeight: '700',
    color: colors.text,
    flex: 1,
  },
  industryTag: {
    fontSize: fontSizes.xs,
    color: colors.textLight,
    backgroundColor: colors.background,
    borderRadius: borderRadius.sm,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  employeeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  empFlag: {
    fontSize: 18,
  },
  employeeName: {
    fontSize: fontSizes.sm,
    color: colors.text,
    fontWeight: '600',
  },
  visaType: {
    fontSize: fontSizes.xs,
    color: colors.textLight,
    flex: 1,
  },
  requestType: {
    fontSize: fontSizes.sm,
    color: colors.text,
    fontWeight: '600',
    marginBottom: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  date: {
    fontSize: fontSizes.xs,
    color: colors.textLight,
  },
  badge: {
    borderRadius: borderRadius.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    fontSize: fontSizes.xs,
    fontWeight: '700',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    gap: 12,
  },
  emptyText: {
    fontSize: fontSizes.md,
    color: colors.textLight,
  },
});
