import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Modal,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { t } from '../i18n';
import { colors, fontSizes, borderRadius, shadows, spacing } from '../theme';

const statusColors = {
  new: { color: colors.danger, bg: colors.dangerLight, key: 'status_new' },
  in_progress: { color: colors.warning, bg: colors.warningLight, key: 'status_in_progress' },
  waiting_docs: { color: colors.primary, bg: colors.primaryLight, key: 'status_waiting_docs' },
  completed: { color: colors.secondary, bg: colors.secondaryLight, key: 'status_completed' },
};

function StatusBadge({ status, lang }) {
  const cfg = statusColors[status] || statusColors.new;
  return (
    <View style={[styles.badge, { backgroundColor: cfg.bg }]}>
      <Text style={[styles.badgeText, { color: cfg.color }]}>{t(lang, cfg.key)}</Text>
    </View>
  );
}

export default function RequestDetailScreen({ lang, request: initialRequest, goBack }) {
  const [request, setRequest] = useState(initialRequest);
  const [comments, setComments] = useState(initialRequest.comments || []);
  const [timeline, setTimeline] = useState(initialRequest.timeline || []);
  const [commentText, setCommentText] = useState('');
  const [showDocModal, setShowDocModal] = useState(false);
  const [docMessage, setDocMessage] = useState('');
  const [showCompleteConfirm, setShowCompleteConfirm] = useState(false);
  const [activeSection, setActiveSection] = useState('detail');

  const isCorporate = request.source === 'corporate';
  const clientLabel = isCorporate ? request.companyName : request.clientName;
  const personLabel = isCorporate ? request.employeeName : request.clientName;

  const today = new Date().toISOString().split('T')[0];

  const addComment = () => {
    if (!commentText.trim()) return;
    const newComments = [...comments, commentText.trim()];
    setComments(newComments);
    setCommentText('');
  };

  const sendDocRequest = () => {
    if (!docMessage.trim()) return;
    const msg = `[${t(lang, 'request_docs')}] ${docMessage.trim()}`;
    setComments(prev => [...prev, msg]);
    setTimeline(prev => [...prev, { date: today, event: t(lang, 'request_docs') }]);
    setDocMessage('');
    setShowDocModal(false);
  };

  const markCompleted = () => {
    setRequest(prev => ({ ...prev, status: 'completed' }));
    setTimeline(prev => [...prev, { date: today, event: t(lang, 'status_completed') }]);
    setShowCompleteConfirm(false);
  };

  const moveToInProgress = () => {
    setRequest(prev => ({ ...prev, status: 'in_progress' }));
    setTimeline(prev => [...prev, { date: today, event: t(lang, 'status_in_progress') }]);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={goBack}>
          <Ionicons name="arrow-back" size={22} color={colors.primary} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <View style={[styles.sourceTag, { backgroundColor: isCorporate ? colors.primaryLight : colors.secondaryLight }]}>
            <Ionicons
              name={isCorporate ? 'business' : 'person'}
              size={12}
              color={isCorporate ? colors.primary : colors.secondary}
            />
            <Text style={[styles.sourceTagText, { color: isCorporate ? colors.primary : colors.secondary }]}>
              {t(lang, isCorporate ? 'corporate' : 'individual')}
            </Text>
          </View>
          <Text style={styles.headerTitle} numberOfLines={1}>{clientLabel}</Text>
        </View>
        <StatusBadge status={request.status} lang={lang} />
      </View>

      {/* Section tabs */}
      <View style={styles.sectionTabs}>
        {['detail', 'timeline', 'comments'].map(sec => (
          <TouchableOpacity
            key={sec}
            style={[styles.sectionTab, activeSection === sec && styles.sectionTabActive]}
            onPress={() => setActiveSection(sec)}
          >
            <Text style={[styles.sectionTabText, activeSection === sec && styles.sectionTabTextActive]}>
              {sec === 'detail'
                ? t(lang, 'request_detail')
                : sec === 'timeline'
                  ? t(lang, 'timeline')
                  : t(lang, 'comments')}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {activeSection === 'detail' && (
          <View>
            {/* Client info card */}
            <View style={styles.infoCard}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>{t(lang, isCorporate ? 'company_name' : 'client_name')}</Text>
                <Text style={styles.infoValue}>{clientLabel}</Text>
              </View>
              {isCorporate && (
                <>
                  <View style={styles.divider} />
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>{t(lang, 'industry')}</Text>
                    <Text style={styles.infoValue}>{request.industry}</Text>
                  </View>
                  <View style={styles.divider} />
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>{t(lang, 'employee_name')}</Text>
                    <View style={styles.infoValueRow}>
                      <Text style={styles.flagSmall}>{request.flag}</Text>
                      <Text style={styles.infoValue}>{personLabel}</Text>
                    </View>
                  </View>
                </>
              )}
              {!isCorporate && (
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>{t(lang, 'nationality')}</Text>
                  <View style={styles.infoValueRow}>
                    <Text style={styles.flagSmall}>{request.flag}</Text>
                    <Text style={styles.infoValue}>{request.nationality}</Text>
                  </View>
                </View>
              )}
              <View style={styles.divider} />
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>{t(lang, 'visa_type')}</Text>
                <Text style={styles.infoValue}>{request.visaType}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>{t(lang, 'request_type')}</Text>
                <Text style={[styles.infoValue, styles.infoValueBold]}>{request.requestType}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>{t(lang, 'submitted_date')}</Text>
                <Text style={styles.infoValue}>{request.submittedDate}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>{t(lang, 'priority')}</Text>
                <View style={[
                  styles.priorityBadge,
                  { backgroundColor: request.priority === 'urgent' ? colors.dangerLight : colors.background }
                ]}>
                  <Text style={[
                    styles.priorityBadgeText,
                    { color: request.priority === 'urgent' ? colors.danger : colors.textLight }
                  ]}>
                    {t(lang, request.priority)}
                  </Text>
                </View>
              </View>
            </View>

            {/* Detail text */}
            <View style={styles.detailCard}>
              <Text style={styles.detailLabel}>{t(lang, 'request_detail')}</Text>
              <Text style={styles.detailText}>{request.detail}</Text>
            </View>

            {/* Status change buttons */}
            {request.status !== 'completed' && (
              <View style={styles.actionSection}>
                <Text style={styles.actionSectionTitle}>{t(lang, 'change_status')}</Text>
                <View style={styles.actionButtons}>
                  {request.status === 'new' && (
                    <TouchableOpacity style={styles.actionBtn} onPress={moveToInProgress} activeOpacity={0.8}>
                      <Ionicons name="time-outline" size={16} color={colors.card} />
                      <Text style={styles.actionBtnText}>{t(lang, 'status_change_to_in_progress')}</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    style={[styles.actionBtn, styles.actionBtnSecondary]}
                    onPress={() => setShowCompleteConfirm(true)}
                    activeOpacity={0.8}
                  >
                    <Ionicons name="checkmark-circle-outline" size={16} color={colors.card} />
                    <Text style={styles.actionBtnText}>{t(lang, 'mark_completed')}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        )}

        {activeSection === 'timeline' && (
          <View style={styles.timelineContainer}>
            {timeline.map((item, index) => (
              <View key={index} style={styles.timelineItem}>
                <View style={styles.timelineLine}>
                  <View style={[
                    styles.timelineDot,
                    index === timeline.length - 1 && styles.timelineDotLast
                  ]} />
                  {index < timeline.length - 1 && <View style={styles.timelineConnector} />}
                </View>
                <View style={styles.timelineContent}>
                  <Text style={styles.timelineDate}>{item.date}</Text>
                  <Text style={styles.timelineEvent}>{item.event}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {activeSection === 'comments' && (
          <View>
            {comments.length === 0 ? (
              <View style={styles.emptyComments}>
                <Ionicons name="chatbubble-outline" size={40} color={colors.border} />
                <Text style={styles.emptyCommentsText}>
                  {lang === 'ja' ? 'コメントはまだありません' : 'No comments yet'}
                </Text>
              </View>
            ) : (
              comments.map((comment, index) => (
                <View key={index} style={styles.commentBubble}>
                  <View style={styles.commentHeader}>
                    <View style={styles.commentAvatar}>
                      <Ionicons name="person" size={14} color={colors.card} />
                    </View>
                    <Text style={styles.commentAuthor}>
                      {lang === 'ja' ? '行政書士' : 'Gyosei Shoshi'}
                    </Text>
                  </View>
                  <Text style={styles.commentText}>{comment}</Text>
                </View>
              ))
            )}
          </View>
        )}
      </ScrollView>

      {/* Bottom action bar */}
      {activeSection === 'comments' && (
        <View style={styles.commentInputBar}>
          <TextInput
            style={styles.commentInput}
            placeholder={t(lang, 'comment_placeholder')}
            placeholderTextColor={colors.textLight}
            value={commentText}
            onChangeText={setCommentText}
            multiline
          />
          <TouchableOpacity
            style={[styles.sendBtn, !commentText.trim() && styles.sendBtnDisabled]}
            onPress={addComment}
            disabled={!commentText.trim()}
          >
            <Ionicons name="send" size={18} color={colors.card} />
          </TouchableOpacity>
        </View>
      )}

      {activeSection === 'detail' && request.status !== 'completed' && (
        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={styles.docRequestBtn}
            onPress={() => setShowDocModal(true)}
            activeOpacity={0.8}
          >
            <Ionicons name="document-attach-outline" size={18} color={colors.primary} />
            <Text style={styles.docRequestBtnText}>{t(lang, 'request_docs')}</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Doc Request Modal */}
      <Modal visible={showDocModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{t(lang, 'doc_request_title')}</Text>
              <TouchableOpacity onPress={() => setShowDocModal(false)}>
                <Ionicons name="close" size={22} color={colors.textLight} />
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.modalInput}
              placeholder={t(lang, 'doc_request_placeholder')}
              placeholderTextColor={colors.textLight}
              value={docMessage}
              onChangeText={setDocMessage}
              multiline
              numberOfLines={5}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalCancelBtn}
                onPress={() => setShowDocModal(false)}
              >
                <Text style={styles.modalCancelText}>{t(lang, 'cancel')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalSendBtn, !docMessage.trim() && styles.modalSendBtnDisabled]}
                onPress={sendDocRequest}
                disabled={!docMessage.trim()}
              >
                <Ionicons name="send" size={16} color={colors.card} />
                <Text style={styles.modalSendText}>{t(lang, 'send')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Complete Confirm Modal */}
      <Modal visible={showCompleteConfirm} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.confirmCard}>
            <View style={styles.confirmIconBg}>
              <Ionicons name="checkmark-circle" size={40} color={colors.secondary} />
            </View>
            <Text style={styles.confirmTitle}>{t(lang, 'complete_confirm')}</Text>
            <Text style={styles.confirmMsg}>{t(lang, 'complete_confirm_msg')}</Text>
            <View style={styles.confirmActions}>
              <TouchableOpacity
                style={styles.confirmCancelBtn}
                onPress={() => setShowCompleteConfirm(false)}
              >
                <Text style={styles.confirmCancelText}>{t(lang, 'cancel')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmOkBtn} onPress={markCompleted}>
                <Text style={styles.confirmOkText}>{t(lang, 'confirm')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
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
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: 10,
  },
  backBtn: {
    padding: 4,
  },
  headerCenter: {
    flex: 1,
    gap: 3,
  },
  sourceTag: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: borderRadius.sm,
    paddingHorizontal: 6,
    paddingVertical: 2,
    gap: 3,
    marginBottom: 2,
  },
  sourceTagText: {
    fontSize: fontSizes.xs,
    fontWeight: '700',
  },
  headerTitle: {
    fontSize: fontSizes.md,
    fontWeight: '700',
    color: colors.text,
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
  sectionTabs: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  sectionTab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  sectionTabActive: {
    borderBottomColor: colors.primary,
  },
  sectionTabText: {
    fontSize: fontSizes.sm,
    color: colors.textLight,
    fontWeight: '600',
  },
  sectionTabTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: 40,
  },
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: 12,
    ...shadows.sm,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: fontSizes.sm,
    color: colors.textLight,
    fontWeight: '500',
    flex: 1,
  },
  infoValue: {
    fontSize: fontSizes.sm,
    color: colors.text,
    fontWeight: '600',
    flex: 2,
    textAlign: 'right',
  },
  infoValueBold: {
    fontWeight: '700',
    color: colors.primary,
  },
  infoValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 2,
    justifyContent: 'flex-end',
    gap: 4,
  },
  flagSmall: {
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
  priorityBadge: {
    borderRadius: borderRadius.sm,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  priorityBadgeText: {
    fontSize: fontSizes.xs,
    fontWeight: '600',
  },
  detailCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: 12,
    ...shadows.sm,
  },
  detailLabel: {
    fontSize: fontSizes.sm,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  detailText: {
    fontSize: fontSizes.md,
    color: colors.text,
    lineHeight: 22,
  },
  actionSection: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    ...shadows.sm,
  },
  actionSectionTitle: {
    fontSize: fontSizes.sm,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 10,
  },
  actionButtons: {
    gap: 8,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.warning,
    borderRadius: borderRadius.md,
    paddingVertical: 12,
    gap: 6,
  },
  actionBtnSecondary: {
    backgroundColor: colors.secondary,
  },
  actionBtnText: {
    fontSize: fontSizes.sm,
    color: colors.card,
    fontWeight: '700',
  },
  timelineContainer: {
    paddingVertical: 8,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 0,
  },
  timelineLine: {
    alignItems: 'center',
    width: 32,
    marginRight: 12,
  },
  timelineDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.card,
    zIndex: 1,
  },
  timelineDotLast: {
    backgroundColor: colors.secondary,
  },
  timelineConnector: {
    width: 2,
    flex: 1,
    backgroundColor: colors.border,
    minHeight: 32,
  },
  timelineContent: {
    flex: 1,
    paddingBottom: 24,
    paddingTop: 0,
  },
  timelineDate: {
    fontSize: fontSizes.xs,
    color: colors.textLight,
    marginBottom: 3,
  },
  timelineEvent: {
    fontSize: fontSizes.md,
    color: colors.text,
    fontWeight: '600',
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: 10,
    ...shadows.sm,
  },
  emptyComments: {
    alignItems: 'center',
    paddingVertical: 48,
    gap: 10,
  },
  emptyCommentsText: {
    fontSize: fontSizes.md,
    color: colors.textLight,
  },
  commentBubble: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: 10,
    ...shadows.sm,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 6,
  },
  commentAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  commentAuthor: {
    fontSize: fontSizes.sm,
    fontWeight: '700',
    color: colors.primary,
  },
  commentText: {
    fontSize: fontSizes.md,
    color: colors.text,
    lineHeight: 20,
  },
  commentInputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    gap: 10,
  },
  commentInput: {
    flex: 1,
    fontSize: fontSizes.md,
    color: colors.text,
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: 10,
    maxHeight: 100,
  },
  sendBtn: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.full,
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnDisabled: {
    backgroundColor: colors.border,
  },
  bottomBar: {
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
  },
  docRequestBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryLight,
    borderRadius: borderRadius.md,
    paddingVertical: 12,
    gap: 6,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  docRequestBtnText: {
    fontSize: fontSizes.md,
    color: colors.primary,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: colors.card,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    padding: spacing.lg,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  modalTitle: {
    fontSize: fontSizes.lg,
    fontWeight: '700',
    color: colors.text,
  },
  modalInput: {
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: 12,
    fontSize: fontSizes.md,
    color: colors.text,
    backgroundColor: colors.background,
    minHeight: 120,
    textAlignVertical: 'top',
    marginBottom: spacing.md,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 10,
  },
  modalCancelBtn: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
    paddingVertical: 13,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  modalCancelText: {
    fontSize: fontSizes.md,
    color: colors.textLight,
    fontWeight: '600',
  },
  modalSendBtn: {
    flex: 2,
    flexDirection: 'row',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: 13,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  modalSendBtnDisabled: {
    backgroundColor: colors.border,
  },
  modalSendText: {
    fontSize: fontSizes.md,
    color: colors.card,
    fontWeight: '700',
  },
  confirmCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    margin: spacing.lg,
    padding: spacing.lg,
    alignItems: 'center',
    ...shadows.md,
  },
  confirmIconBg: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.secondaryLight,
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
  confirmOkBtn: {
    flex: 1,
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.md,
    paddingVertical: 13,
    alignItems: 'center',
  },
  confirmOkText: {
    fontSize: fontSizes.md,
    color: colors.card,
    fontWeight: '700',
  },
});
