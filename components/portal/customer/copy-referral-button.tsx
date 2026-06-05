'use client';

import { useState } from 'react';

export default function CopyReferralButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <button
      onClick={handleCopy}
      style={{
        padding: '8px 16px',
        background: copied ? 'rgba(200,155,55,0.35)' : 'rgba(200,155,55,0.2)',
        border: '1px solid rgba(200,155,55,0.4)',
        borderRadius: 8,
        color: '#C89B37',
        fontSize: 13,
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'background 0.15s',
      }}
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}
