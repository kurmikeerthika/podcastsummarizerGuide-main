import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import PodcastList from './components/PodcastList';
import PodcastDetail from './components/PodcastDetail';
import TranscribeForm from './components/TranscribeForm';

function App() {
  const [podcasts, setPodcasts] = useState({});
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('library');

  useEffect(() => {
    fetchPodcasts();
  }, []);

  const fetchPodcasts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/podcasts');
      setPodcasts(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load podcasts. Please try again later.');
      console.error('Error fetching podcasts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPodcast = (podcastTitle) => {
    setSelectedPodcast(podcastTitle);
    setActiveTab('detail');
  };

  const handleBackClick = () => {
    setSelectedPodcast(null);
    setActiveTab('library');
  };

  const handleTranscribeComplete = () => {
    fetchPodcasts();
    setActiveTab('library');
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>🎙️ Podcast Summarizer</h1>
        <p>AI-Powered Transcription & Summarization</p>
      </header>

      <nav className="app-nav">
        <button
          className={`nav-btn ${activeTab === 'library' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('library');
            setSelectedPodcast(null);
          }}
        >
          📚 Podcast Library
        </button>
        <button
          className={`nav-btn ${activeTab === 'transcribe' ? 'active' : ''}`}
          onClick={() => setActiveTab('transcribe')}
        >
          ➕ New Transcription
        </button>
      </nav>

      <main className="app-content">
        {activeTab === 'library' && (
          <>
            {selectedPodcast ? (
              <PodcastDetail
                podcastTitle={selectedPodcast}
                podcasts={podcasts}
                onBack={handleBackClick}
              />
            ) : (
              <>
                {loading && <div className="loading">Loading podcasts...</div>}
                {error && <div className="error">{error}</div>}
                {!loading && !error && (
                  <PodcastList
                    podcasts={podcasts}
                    onSelectPodcast={handleSelectPodcast}
                  />
                )}
              </>
            )}
          </>
        )}

        {activeTab === 'transcribe' && (
          <TranscribeForm onSuccess={handleTranscribeComplete} />
        )}
      </main>

      <footer className="app-footer">
        <p>&copy; 2024 Podcast Summarizer. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
