import React from 'react';
import './PodcastDetail.css';

function PodcastDetail({ podcastTitle, podcasts, onBack }) {
  const podcast = podcasts[podcastTitle];

  if (!podcast) {
    return <div className="loading">Loading podcast details...</div>;
  }

  const details = podcast.podcast_details || {};
  const summary = podcast.podcast_summary || '';

  return (
    <div className="podcast-detail">
      <button className="back-btn" onClick={onBack}>
        ← Back to Library
      </button>

      <div className="detail-container">
        <div className="detail-header">
          {details.episode_image && (
            <img
              src={details.episode_image}
              alt={podcastTitle}
              className="detail-image"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          )}
          <div className="header-info">
            <h1>{podcastTitle}</h1>
            <p className="episode-title">{details.episode_title}</p>
          </div>
        </div>

        <div className="detail-content">
          <section className="summary-section">
            <h2>📝 Summary</h2>
            <div className="summary-text">{summary}</div>
          </section>

          <section className="metadata-section">
            <h2>ℹ️ Details</h2>
            <div className="metadata">
              {details.podcast_title && (
                <div className="meta-item">
                  <span className="meta-label">Podcast:</span>
                  <span className="meta-value">{details.podcast_title}</span>
                </div>
              )}
              {details.episode_title && (
                <div className="meta-item">
                  <span className="meta-label">Episode:</span>
                  <span className="meta-value">{details.episode_title}</span>
                </div>
              )}
              {details.episode_date && (
                <div className="meta-item">
                  <span className="meta-label">Date:</span>
                  <span className="meta-value">{details.episode_date}</span>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default PodcastDetail;
