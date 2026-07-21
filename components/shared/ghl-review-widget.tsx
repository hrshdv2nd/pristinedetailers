'use client';

import Script from 'next/script';

export function GHLReviewWidget() {
  return (
    <>
      <Script
        id="ghl-review-widget-script"
        src="https://reputationhub.site/reputation/assets/review-widget.js"
        strategy="lazyOnload"
      />
      <iframe
        className="lc_reviews_widget"
        src="https://reputationhub.site/reputation/widgets/review_widget/rHpVohyvFEt5ych7HnDb?widgetId=6a5eb5c79900d4b9046b8223"
        frameBorder="0"
        scrolling="no"
        style={{ minWidth: '100%', width: '100%' }}
      />
    </>
  );
}
