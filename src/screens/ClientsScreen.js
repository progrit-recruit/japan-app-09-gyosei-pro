import React, { useState } from 'react';
import {
  View,
  Text,
  SectionList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { t } from '../i18n';
import { colors, fontSizes, borderRadius, shadows, spacing } from '../theme';
import { individualRequests, corporateRequests } from '../data/mockData';

const statusColors = {
  new: { color: colors.danger, bg: colors.dangerLight, key: 'status_new' },
  in_progress: { color: colors.warning, bg: colors.warningLight, key: 'status_in_progress' },
  waiting_docs: { color: colors.primary, bg: colors.primaryLight, key: 'status_waiting_docs' },
  completed: { color: colors.secondary, bg: colors.secondaryLight, key: 'status_completed' },
};

function StatusDot({ status }) {
  const cfg = statusColors[status] || statusColors.new;
  return (
    <View style={[styles.statusDot, { backgroundColor: cfg.color }]} />
  );
}

function buildIndividualClients() {
  const clientMap = {};
  individualRequests.forEach(req => {
    const key = req.clientName;
    if (!clientMap[key]) {
      clientMap[key] = {
        key,
        clientName: req.clientName,
        flag: req.flag,
        nationality: req.nationality,
        requests: [],
      };
    }
    clientMap[key].requests.push(req);
  });
  return Object.values(clientMap);
}

function buildCorporateClients() {
  const clientMap = {};
  corporateRequests.forEach(req => {
    const key = req.companyName;
    if (!clientMap[key]) {
      clientMap[key] = {
        key,
        companyName: req.companyName,
        industry: req.industry,
        requests: [],
      };
    }
    clientMap[key].requests.push(req);
  });
  return Object.values(clientMap);
}

const individualClients = buildIndividualClients();
const corporateClients = buildCorporateClients();

function IndividualClientCard({ client, lang, navigate }) {
  const latestReq = client.requests[client.requests.length - 1];
  const cfg = statusColors[latestReq.status] || statusColors.new;

  return (
    <TouchableOpacity
      style={styles.clientCard}
      onPress={() => navigate('requestDetail', latestReq)}
      activeOpacity={0.8}
    >
      <View style={styles.clientCardLeft}>
        <View style={styles.avatarBubble}>
          <Text style={styles.avatarFlag}>{client.flag}</Text>
        </View>
        <View style={styles.clientInfo}>
          <Text style={styles.clientName}>{client.clientName}</Text>
          <Text style={styles.clientSub}>{client.nationality}</Text>
        </View>
      </View>
      <View style={styles.clientCardRight}>
        <View style={styles.requestCountBadge}>
          <Ionicons name="document-text-outline" size={11} color={colors.textLight} />
          <Text style={styles.requestCountText}>
            {client.requests.length}
            {lang === 'ja' ? '件' : ' req'}
          </Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: cfg.bg }]}>
          <StatusDot status={latestReq.status} />
          <Text style={[styles.statusBadgeText, { color: cfg.color }]}>
            {t(lang, cfg.key)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function CorporateClientCard({ client, lang, navigate }) {
  const latestReq = client.requests[client.requests.length - 1];
  const cfg = statusColors[latestReq.status] || statusColors.new;

  return (
    <TouchableOpacity
      style={[styles.clientCard, styles.corporateCard]}
      onPress={() => navigate('requestDetail', latestReq)}
      activeOpacity={0.8}
    >
      <View style={styles.clientCardLeft}>
        <View style={[styles.avatarBubble, styles.corporateAvatarBubble]}>
          <Ionicons name="business" size={20} color={colors.primary} />
        </View>
        <View style={styles.clientInfo}>
          <Text style={styles.clientName}>{client.companyName}</Text>
          <Text style={styles.clientSub}>{client.industry}</Text>
        </View>
      </View>
      <View style={styles.clientCardRight}>
        <View style={styles.requestCountBadge}>
          <Ionicons name="document-text-outline" size={11} color={colors.textLight} />
          <Text style={styles.requestCountText}>
            {client.requests.length}
            {lang === 'ja' ? '件' : ' req'}
          </Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: cfg.bg }]}>
          <StatusDot status={latestReq.status} />
          <Text style={[styles.statusBadgeText, { color: cfg.color }]}>
            {t(lang, cfg.key)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function ClientsScreen({ lang, navigate }) {
  const [searchText, setSearchText] = useState('');

  const filteredIndividual = individualClients.filter(c =>
    !searchText ||
    c.clientName.toLowerCase().includes(searchText.toLowerCase()) ||
    c.nationality.includes(searchText)
  );

  const filteredCorporate = corporateClients.filter(c =>
    !searchText ||
    c.companyName.includes(searchText) ||
    c.industry.includes(searchText)
  );

  const sections = [
    {
      title: t(lang, 'individual_clients'),
      icon: 'person',
      color: colors.secondary,
      count: filteredIndividual.length,
      data: filteredIndividual,
      type: 'individual',
    },
    {
      title: t(lang, 'corporate_clients'),
      icon: 'business',
      color: colors.primary,
      count: filteredCorporate.length,
      data: filteredCorporate,
      type: 'corporate',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="people" size={20} color={colors.primary} />
          <Text style={styles.headerTitle}>{t(lang, 'clients')}</Text>
        </View>
        <View style={styles.totalBadge}>
          <Text style={styles.totalBadgeText}>
            {individualClients.length + corporateClients.length}
          </Text>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={16} color={colors.textLight} />
        <TextInput
          style={styles.searchInput}
          placeholder={t(lang, 'search_clients')}
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

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionIconBg, { backgroundColor: section.type === 'corporate' ? colors.primaryLight : colors.secondaryLight }]}>
              <Ionicons name={section.icon} size={15} color={section.color} />
            </View>
            <Text style={[styles.sectionTitle, { color: section.color }]}>{section.title}</Text>
            <View style={[styles.sectionCount, { backgroundColor: section.color }]}>
              <Text style={styles.sectionCountText}>{section.count}</Text>
            </View>
          </View>
        )}
        renderItem={({ item, section }) => {
          if (section.type === 'individual') {
            return <IndividualClientCard client={item} lang={lang} navigate={navigate} />;
          }
          return <CorporateClientCard client={item} lang={lang} navigate={navigate} />;
        }}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="people-outline" size={48} color={colors.border} />
            <Text style={styles.emptyText}>{t(lang, 'no_clients')}</Text>
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
  listContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 10,
    gap: 8,
  },
  sectionIconBg: {
    width: 28,
    height: 28,
    borderRadius: borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: fontSizes.md,
    fontWeight: '700',
    flex: 1,
  },
  sectionCount: {
    borderRadius: borderRadius.full,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionCountText: {
    fontSize: fontSizes.xs,
    color: colors.card,
    fontWeight: '700',
  },
  clientCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...shadows.sm,
    borderLeftWidth: 3,
    borderLeftColor: colors.secondary,
  },
  corporateCard: {
    borderLeftColor: colors.primary,
  },
  clientCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 10,
  },
  avatarBubble: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  corporateAvatarBubble: {
    backgroundColor: colors.primaryLight,
  },
  avatarFlag: {
    fontSize: 26,
  },
  clientInfo: {
    flex: 1,
  },
  clientName: {
    fontSize: fontSizes.md,
    fontWeight: '700',
    color: colors.text,
  },
  clientSub: {
    fontSize: fontSizes.xs,
    color: colors.textLight,
    marginTop: 2,
  },
  clientCardRight: {
    alignItems: 'flex-end',
    gap: 5,
  },
  requestCountBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: borderRadius.sm,
    paddingHorizontal: 6,
    paddingVertical: 2,
    gap: 3,
  },
  requestCountText: {
    fontSize: fontSizes.xs,
    color: colors.textLight,
    fontWeight: '600',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: borderRadius.full,
    paddingHorizontal: 8,
    paddingVertical: 3,
    gap: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusBadgeText: {
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
