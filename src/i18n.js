const translations = {
  ja: {
    // Auth
    login: 'ログイン',
    email: 'メールアドレス',
    password: 'パスワード',
    logout: 'ログアウト',

    // Tabs
    dashboard: 'ダッシュボード',
    individual_requests: '個人依頼',
    corporate_requests: '企業依頼',
    clients: 'クライアント',
    settings: '設定',

    // Dashboard
    new_request: '新規依頼',
    in_progress: '対応中',
    waiting_docs: '書類待ち',
    completed_count: '今月完了',
    total_clients: '総クライアント',
    this_month: '今月',
    urgent_alerts: '緊急案件アラート',
    latest_requests: '最新依頼',
    view_all: 'すべて見る',

    // Request fields
    client_name: 'クライアント名',
    nationality: '国籍',
    visa_type: 'ビザ種別',
    request_type: '依頼種別',
    request_detail: '依頼内容',
    submitted_date: '依頼日',
    company_name: '会社名',
    industry: '業種',
    employee_name: '従業員名',

    // Status
    status_new: '新規',
    status_in_progress: '対応中',
    status_waiting_docs: '書類待ち',
    status_completed: '完了',

    // Actions
    reply: '返信',
    add_comment: 'コメントを追加',
    request_docs: '書類を要求する',
    mark_completed: '完了にする',
    client_history: '依頼履歴',
    send: '送信',
    cancel: 'キャンセル',
    confirm: '確認',
    close: '閉じる',
    back: '戻る',

    // Filters
    search: '検索',
    filter: 'フィルター',
    all: 'すべて',

    // Type tags
    individual: '個人',
    corporate: '企業',
    urgent: '緊急',
    normal: '通常',
    priority: '優先度',

    // Timeline
    timeline: 'タイムライン',
    comments: 'コメント履歴',

    // Clients
    individual_clients: '個人クライアント',
    corporate_clients: '企業クライアント',
    total_requests: '総依頼数',
    latest_status: '最新状況',
    no_clients: 'クライアントがいません',
    search_clients: 'クライアントを検索',

    // Settings
    profile: 'プロフィール',
    gyosei_name: '行政書士名',
    registration_number: '登録番号',
    notifications: '通知設定',
    push_notifications: 'プッシュ通知',
    new_request_notify: '新規依頼通知',
    doc_request_notify: '書類要求通知',
    language: '言語',
    lang_ja: '日本語',
    lang_en: 'English',
    app_version: 'アプリバージョン',

    // Dialog
    complete_confirm: 'この依頼を完了にしますか？',
    complete_confirm_msg: 'ステータスが「完了」に変更されます。',
    doc_request_title: '書類要求メッセージ',
    doc_request_placeholder: '要求する書類の内容を入力してください',
    comment_placeholder: 'コメントを入力してください...',
    change_status: 'ステータスを変更',
    status_change_to_in_progress: '対応中に変更',
    status_change_to_completed: '完了に変更',

    // Empty states
    no_requests: '依頼がありません',
  },
  en: {
    // Auth
    login: 'Login',
    email: 'Email Address',
    password: 'Password',
    logout: 'Logout',

    // Tabs
    dashboard: 'Dashboard',
    individual_requests: 'Individual',
    corporate_requests: 'Corporate',
    clients: 'Clients',
    settings: 'Settings',

    // Dashboard
    new_request: 'New Requests',
    in_progress: 'In Progress',
    waiting_docs: 'Waiting Docs',
    completed_count: 'Completed',
    total_clients: 'Total Clients',
    this_month: 'This Month',
    urgent_alerts: 'Urgent Alerts',
    latest_requests: 'Latest Requests',
    view_all: 'View All',

    // Request fields
    client_name: 'Client Name',
    nationality: 'Nationality',
    visa_type: 'Visa Type',
    request_type: 'Request Type',
    request_detail: 'Request Details',
    submitted_date: 'Submitted Date',
    company_name: 'Company Name',
    industry: 'Industry',
    employee_name: 'Employee Name',

    // Status
    status_new: 'New',
    status_in_progress: 'In Progress',
    status_waiting_docs: 'Waiting Docs',
    status_completed: 'Completed',

    // Actions
    reply: 'Reply',
    add_comment: 'Add Comment',
    request_docs: 'Request Documents',
    mark_completed: 'Mark as Completed',
    client_history: 'Request History',
    send: 'Send',
    cancel: 'Cancel',
    confirm: 'Confirm',
    close: 'Close',
    back: 'Back',

    // Filters
    search: 'Search',
    filter: 'Filter',
    all: 'All',

    // Type tags
    individual: 'Individual',
    corporate: 'Corporate',
    urgent: 'Urgent',
    normal: 'Normal',
    priority: 'Priority',

    // Timeline
    timeline: 'Timeline',
    comments: 'Comment History',

    // Clients
    individual_clients: 'Individual Clients',
    corporate_clients: 'Corporate Clients',
    total_requests: 'Total Requests',
    latest_status: 'Latest Status',
    no_clients: 'No clients found',
    search_clients: 'Search clients',

    // Settings
    profile: 'Profile',
    gyosei_name: 'Name',
    registration_number: 'Registration No.',
    notifications: 'Notifications',
    push_notifications: 'Push Notifications',
    new_request_notify: 'New Request Alerts',
    doc_request_notify: 'Document Request Alerts',
    language: 'Language',
    lang_ja: '日本語',
    lang_en: 'English',
    app_version: 'App Version',

    // Dialog
    complete_confirm: 'Mark this request as completed?',
    complete_confirm_msg: 'Status will be changed to "Completed".',
    doc_request_title: 'Document Request Message',
    doc_request_placeholder: 'Enter the documents you need',
    comment_placeholder: 'Enter your comment...',
    change_status: 'Change Status',
    status_change_to_in_progress: 'Move to In Progress',
    status_change_to_completed: 'Mark Completed',

    // Empty states
    no_requests: 'No requests found',
  },
};

export function t(lang, key) {
  return translations[lang]?.[key] || translations['ja']?.[key] || key;
}

export default translations;
