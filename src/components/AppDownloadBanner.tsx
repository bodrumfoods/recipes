export default function AppDownloadBanner() {
  return (
    <>
      <style>{`
        .bodrum-banner-wrap {
          font-family: var(--font-lato), 'Lato', sans-serif;
          background: linear-gradient(135deg, #8B1A1A 0%, #C0392B 45%, #E74C3C 100%);
          border-radius: 16px;
          padding: 40px 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          position: relative;
          overflow: hidden;
          min-height: 180px;
          max-width: 900px;
          margin: 0 auto;
          box-sizing: border-box;
        }

        .bodrum-banner-wrap::before {
          content: '';
          position: absolute;
          top: -60px;
          right: 160px;
          width: 260px;
          height: 260px;
          border-radius: 50%;
          background: rgba(255,255,255,0.05);
        }

        .bodrum-banner-wrap::after {
          content: '';
          position: absolute;
          bottom: -80px;
          left: 20%;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: rgba(255,255,255,0.04);
        }

        .bodrum-left-side {
          display: flex;
          align-items: center;
          gap: 24px;
          flex: 1;
          position: relative;
          z-index: 2;
        }

        .bodrum-phone-icon {
          width: 64px;
          height: 64px;
          background: rgba(255,255,255,0.15);
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border: 1.5px solid rgba(255,255,255,0.25);
        }

        .bodrum-phone-icon svg { width: 32px; height: 32px; }

        .bodrum-text-content .eyebrow {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.65);
          margin: 0 0 6px 0;
        }

        .bodrum-text-content h2 {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 26px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 6px 0;
          line-height: 1.2;
        }

        .bodrum-text-content p {
          font-size: 13px;
          color: rgba(255,255,255,0.75);
          margin: 0;
          line-height: 1.5;
        }

        .bodrum-divider {
          width: 1px;
          height: 80px;
          background: rgba(255,255,255,0.2);
          flex-shrink: 0;
          position: relative;
          z-index: 2;
        }

        .bodrum-buttons-side {
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex-shrink: 0;
          position: relative;
          z-index: 2;
        }

        .bodrum-store-btn-wrap { position: relative; }

        .bodrum-store-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          border-radius: 10px;
          padding: 10px 20px;
          text-decoration: none;
          width: 195px;
          border: none;
          cursor: pointer;
          transition: transform 0.15s, background 0.15s;
          box-sizing: border-box;
        }

        .bodrum-store-btn.apple {
          background: #fff;
          color: #1a1a1a;
        }

        .bodrum-store-btn.apple:hover {
          background: #f0f0f0;
          transform: translateY(-2px);
        }

        .bodrum-store-btn.google {
          background: #fff;
          color: #1a1a1a;
          border: none;
        }

        .bodrum-store-btn.google:hover {
          background: #f0f0f0;
          transform: translateY(-2px);
        }

        .bodrum-store-btn svg { width: 24px; height: 24px; flex-shrink: 0; }

        .bodrum-btn-text {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .bodrum-btn-text .small {
          font-size: 10px;
          font-weight: 400;
          opacity: 0.7;
          line-height: 1;
          margin-bottom: 2px;
        }

        .bodrum-btn-text .big {
          font-size: 15px;
          font-weight: 700;
          line-height: 1;
        }

        .bodrum-olive-decor {
          position: absolute;
          right: 280px;
          top: 50%;
          transform: translateY(-50%);
          opacity: 0.07;
        }

        @media (max-width: 580px) {
          .bodrum-banner-wrap { flex-direction: column; padding: 28px 24px; text-align: center; }
          .bodrum-left-side { flex-direction: column; text-align: center; }
          .bodrum-divider { width: 80px; height: 1px; }
          .bodrum-buttons-side { flex-direction: row; flex-wrap: wrap; justify-content: center; }
          .bodrum-store-btn { width: 170px; }
        }
      `}</style>

      <div className="bodrum-banner-wrap">
        <svg
          className="bodrum-olive-decor"
          width="180"
          height="180"
          viewBox="0 0 180 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse cx="90" cy="90" rx="70" ry="40" stroke="white" strokeWidth={6} fill="none" />
          <ellipse cx="90" cy="90" rx="40" ry="70" stroke="white" strokeWidth={6} fill="none" />
          <circle cx="90" cy="90" r="12" fill="white" />
          <line x1="90" y1="20" x2="90" y2="50" stroke="white" strokeWidth={4} />
          <ellipse cx="100" cy="10" rx="12" ry="6" stroke="white" strokeWidth={3} fill="none" />
        </svg>

        <div className="bodrum-left-side">
          <div className="bodrum-phone-icon">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="8" y="2" width="16" height="28" rx="4" stroke="white" strokeWidth={2} />
              <rect x="11" y="5" width="10" height="16" rx="1" fill="rgba(255,255,255,0.3)" />
              <circle cx="16" cy="26" r="1.5" fill="white" />
            </svg>
          </div>
          <div className="bodrum-text-content">
            <p className="eyebrow">Bodrum Foods App</p>
            <h2>Now Available on Mobile!</h2>
            <p>
              Shop authentic Mediterranean flavours
              <br />
              anytime, anywhere.
            </p>
          </div>
        </div>

        <div className="bodrum-divider" />

        <div className="bodrum-buttons-side">
          <div className="bodrum-store-btn-wrap">
            <a
              href="https://apps.apple.com/gb/app/bodrum-foods-uk/id6764837645"
              className="bodrum-store-btn apple"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" fill="#1a1a1a" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.29.07 2.18.74 2.93.8 1.12-.23 2.19-.91 3.39-.84 1.44.1 2.52.69 3.23 1.74-2.89 1.72-2.21 5.51.36 6.64-.51 1.25-1.17 2.45-1.91 3.54zM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div className="bodrum-btn-text">
                <span className="small">Download on the</span>
                <span className="big">App Store</span>
              </div>
            </a>
          </div>

          <div className="bodrum-store-btn-wrap">
            <a
              href="https://play.google.com/store/apps/details?id=co.shopney.bodrumfoods&pcampaignid=web_share"
              className="bodrum-store-btn google"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.18 23.76c.37.21.8.22 1.19.04l12.5-7.05-2.67-2.67L3.18 23.76z" fill="#EA4335" />
                <path d="M20.93 10.05l-2.74-1.54-3.01 2.68 3.01 3.01 2.77-1.56c.79-.44.79-1.62-.03-2.59z" fill="#FBBC04" />
                <path d="M2.04 1.54A1.24 1.24 0 001.5 2.6v18.8c0 .44.21.83.54 1.08l.1.07 10.53-10.53v-.25L2.04 1.54z" fill="#4285F4" />
                <path d="M14.38 11.95l-2.71-2.71L1.5 1.54c.4-.22.88-.23 1.3-.01l12.28 6.93-2.7 2.7 2.7 2.71z" fill="#34A853" />
              </svg>
              <div className="bodrum-btn-text">
                <span className="small" style={{ color: "#1a1a1a", opacity: 0.7 }}>
                  Get it on
                </span>
                <span className="big" style={{ color: "#1a1a1a" }}>
                  Google Play
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
