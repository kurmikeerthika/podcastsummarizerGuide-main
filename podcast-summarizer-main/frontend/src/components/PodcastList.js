import React from 'react';
import './PodcastList.css';

function PodcastList({ podcasts, onSelectPodcast }) {
  const podcastArray = Object.entries(podcasts);

  if (podcastArray.length === 0) {
    return (
      <div className="empty-state">
        <p>No podcasts found. Start by creating a new transcription!</p>
      </div>
    );
  }

  return (
    <div className="podcast-list">
      <h2>Available Podcasts</h2>
      <div className="podcast-grid">
        {podcastArray.map(([title, data]) => (
          <div
            key={title}
            className="podcast-card"
            onClick={() => onSelectPodcast(title)}
          >
            <div className="podcast-image">
              {data.podcast_details?.episode_image ? (
                <img
                  src={data.podcast_details.episode_image}
                  alt={title}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              ) : (
                <div className="image-placeholder">🎙️</div>
              )}
            </div>
            <div className="podcast-info">
              <h3>{title}</h3>
              <p className="episode-title">
                {data.podcast_details?.episode_title}
              </p>
              <p className="summary-preview">
                {data.podcast_summary?.substring(0, 100)}...
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PodcastList;
