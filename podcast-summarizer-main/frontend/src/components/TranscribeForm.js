import React, { useState } from 'react';
import axios from 'axios';
import './TranscribeForm.css';

function TranscribeForm({ onSuccess }) {
  const [rssUrl, setRssUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!rssUrl.trim()) {
      setError('Please enter a valid RSS feed URL');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('/api/transcribe', {
        rss_url: rssUrl,
      });

      setSuccess('Podcast transcribed successfully!');
      setRssUrl('');

      // Call the success callback after a short delay
      setTimeout(() => {
        onSuccess();
      }, 1500);
    } catch (err) {
      const errorMsg =
        err.response?.data?.error || 'Failed to transcribe podcast';
      setError(errorMsg);
      console.error('Error transcribing podcast:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="transcribe-form-container">
      <div className="form-card">
        <h2>🎯 New Podcast Transcription</h2>
        <p className="form-description">
          Enter an RSS feed URL to transcribe and summarize a new podcast episode
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="rssUrl">RSS Feed URL</label>
            <input
              type="url"
              id="rssUrl"
              placeholder="https://example.com/podcast/feed"
              value={rssUrl}
              onChange={(e) => setRssUrl(e.target.value)}
              disabled={loading}
              required
            />
            <p className="input-hint">
              Paste the RSS feed URL of the podcast you want to transcribe
            </p>
          </div>

          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? (
              <>
                <span className="spinner"></span>
                Processing...
              </>
            ) : (
              <>
                🚀 Transcribe Podcast
              </>
            )}
          </button>
        </form>

        <div className="example-feeds">
          <h3>📚 Popular Podcast Feeds</h3>
          <p>Need an example? Try one of these popular podcasts:</p>
          <ul>
            <li>
              <code>https://feeds.npr.org/510318/podcast.xml</code> - NPR: Up First
            </li>
            <li>
              <code>https://rss.apple.com/podcasts/the-daily/1200361736</code> - The Daily
            </li>
            <li>
              <code>https://www.thevergecast.com/feeds/feed.xml</code> - The Vergecast
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TranscribeForm;
