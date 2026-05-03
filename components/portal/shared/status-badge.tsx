const STATUS_MAP: Record<string, { bg: string; color: string; label: string }> = {
  active:           { bg: '#dcfce7', color: '#15803d', label: 'Active' },
  completed:        { bg: '#dcfce7', color: '#15803d', label: 'Completed' },
  succeeded:        { bg: '#dcfce7', color: '#15803d', label: 'Paid' },
  pending:          { bg: '#fef9c3', color: '#a16207', label: 'Pending' },
  in_progress:      { bg: '#fef3c7', color: '#b45309', label: 'In Progress' },
  confirmed:        { bg: '#dbeafe', color: '#1d4ed8', label: 'Confirmed' },
  failed:           { bg: '#fee2e2', color: '#b91c1c', label: 'Failed' },
  payment_failed:   { bg: '#fee2e2', color: '#b91c1c', label: 'Payment Failed' },
  cancelled:        { bg: '#fee2e2', color: '#b91c1c', label: 'Cancelled' },
  overdue:          { bg: '#fee2e2', color: '#b91c1c', label: 'Overdue' },
  paused:           { bg: '#f3f4f6', color: '#4b5563', label: 'Paused' },
  no_show:          { bg: '#f3f4f6', color: '#4b5563', label: 'No Show' },
  none:             { bg: '#f3f4f6', color: '#4b5563', label: 'No Plan' },
  invited:          { bg: '#ede9fe', color: '#6d28d9', label: 'Invited' },
  reward_unlocked:  { bg: '#fef3c7', color: '#b45309', label: 'Reward Unlocked' },
};

export function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_MAP[status] ?? { bg: '#f3f4f6', color: '#4b5563', label: status };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '3px 10px', borderRadius: 999,
      background: cfg.bg, color: cfg.color,
      fontSize: 12, fontWeight: 500,
      whiteSpace: 'nowrap',
    }}>
      {cfg.label}
    </span>
  );
}
