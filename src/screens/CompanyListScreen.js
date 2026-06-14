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
import { colors, fontSizes, borderRadius, shadows, spacing } from '../theme';
import { companies } from '../data/mockData';

export default function CompanyListScreen({ lang, navigate }) {
  const [search, setSearch] = useState('');

  const filtered = companies.filter(
    (c) =>
      c.name.includes(search) ||
      c.industry.includes(search) ||
      c.location.includes(search)
  );

  const totalEmployees = companies.reduce((sum, c) => sum + c.totalEmployees, 0);
  const totalPending = companies.reduce((sum, c) => sum + c.pendingRequests, 0);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigate('CompanyDetail', { company: item })}
      activeOpacity={0.8}
    >
      <View style={styles.cardLeft}>
        <View style={styles.emojiCircle}>
          <Text style={styles.emoji}>{item.emoji}</Text>
        </View>
      </View>
      <View style={styles.cardCenter}>
        <Text style={styles.companyName}>{item.name}</Text>
        <View style={styles.industryBadge}>
          <Text style={styles.industryText}>{item.industry}</Text>
        </View>
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={12} color={colors.textLight} />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>
        <Text style={styles.employeeCount}>従業員: {item.totalEmployees}名</Text>
      </View>
      <View style={styles.cardRight}>
        {item.pendingRequests > 0 && (
          <View style={styles.pendingBadge}>
            <Text style={styles.pendingBadgeText}>{item.pendingRequests}件対応中</Text>
          </View>
        )}
        <Ionicons name="chevron-forward" size={18} color={colors.textLight} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="business" size={20} color={colors.card} />
        <Text style={styles.headerTitle}>企業クライアント</Text>
      </View>

      {/* Stats bar */}
      <View style={styles.statsBar}>
        <Text style={styles.statsText}>
          担当企業: {companies.length}社　/　従業員: {totalEmployees}名　/　対応中: {totalPending}件
        </Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={16} color={colors.textLight} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="会社名・業種・場所で検索"
          placeholderTextColor={colors.textLight}
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Ionicons name="close-circle" size={18} color={colors.textLight} />
          </TouchableOpacity>
        )}
      </View>

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="business-outline" size={48} color={colors.border} />
            <Text style={styles.emptyText}>企業が見つかりません</Text>
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
    gap: 8,
  },
  headerTitle: {
    fontSize: fontSizes.lg,
    fontWeight: '700',
    color: colors.card,
  },
  statsBar: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  statsText: {
    fontSize: fontSizes.sm,
    color: colors.primary,
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    marginHorizontal: spacing.md,
    marginVertical: 12,
    borderRadius: borderRadius.md,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 8,
  },
  searchIcon: {
    marginRight: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: fontSizes.md,
    color: colors.text,
  },
  listContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: 24,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: 10,
    ...shadows.sm,
  },
  cardLeft: {
    marginRight: 12,
  },
  emojiCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 26,
  },
  cardCenter: {
    flex: 1,
    gap: 3,
  },
  companyName: {
    fontSize: fontSizes.md,
    fontWeight: '700',
    color: colors.text,
  },
  industryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primaryLight,
    borderRadius: borderRadius.sm,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginTop: 2,
  },
  industryText: {
    fontSize: fontSizes.xs,
    color: colors.primary,
    fontWeight: '600',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 2,
  },
  locationText: {
    fontSize: fontSizes.xs,
    color: colors.textLight,
  },
  employeeCount: {
    fontSize: fontSizes.xs,
    color: colors.textLight,
    marginTop: 2,
  },
  cardRight: {
    alignItems: 'flex-end',
    gap: 6,
  },
  pendingBadge: {
    backgroundColor: colors.danger,
    borderRadius: borderRadius.full,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  pendingBadgeText: {
    fontSize: fontSizes.xs,
    color: colors.card,
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
