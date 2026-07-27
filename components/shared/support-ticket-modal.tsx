'use client';

import Script from 'next/script';

export function SupportTicketModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(10,10,10,0.6)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#fff',
          borderRadius: 20,
          maxWidth: 600,
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          position: 'relative',
          padding: 32,
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            background: '#F4F4F2',
            border: 'none',
            borderRadius: '50%',
            width: 32,
            height: 32,
            display: 'grid',
            placeItems: 'center',
            cursor: 'pointer',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 24, fontWeight: 600, marginBottom: 20 }}>
          Submit a Support Ticket
        </h2>
        <iframe
          src="https://link.upscalerhq.com/widget/form/lfDqDuX747HDMnK4jWBR"
          style={{ width: '100%', height: 1299, border: 'none', borderRadius: 8 }}
          id="popup-lfDqDuX747HDMnK4jWBR"
          data-layout="{'id':'POPUP'}"
          data-trigger-type="alwaysShow"
          data-trigger-value=""
          data-activation-type="alwaysActivated"
          data-activation-value=""
          data-deactivation-type="neverDeactivate"
          data-deactivation-value=""
          data-form-name="Form 4"
          data-height="1299"
          data-layout-iframe-id="popup-lfDqDuX747HDMnK4jWBR"
          data-form-id="lfDqDuX747HDMnK4jWBR"
          title="Form 4"
          data-modal-height="500"
        />
        <Script src="https://link.upscalerhq.com/js/form_embed.js" strategy="lazyOnload" />
      </div>
    </div>
  );
}
