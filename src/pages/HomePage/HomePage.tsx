import './HomePage.scss'
import { useState } from 'react'

function HomePage() {
  const [activeTab, setActiveTab] = useState('ide');

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Visualize, organize and document your project structure with ease</h1>
          <div className="cta-buttons">
            <button className="btn primary">Let's Tree !</button>
            {/* <button className="btn secondary">GITHUB</button> */}
          </div>
          <div className="hero-image">
            <div className="preview-window">
              <div className="preview-header">
                <div className="controls">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <div className="tabs">
                  <div className={`tab ${activeTab === 'ide' ? 'active' : ''}`} 
                      onClick={() => setActiveTab('ide')}>IDE View</div>
                  <div className={`tab ${activeTab === 'tree' ? 'active' : ''}`}
                      onClick={() => setActiveTab('tree')}>Tree View</div>
                </div>
              </div>
              <div className="preview-content">
                {activeTab === 'ide' ? (
                  <div className="ide-preview">
                    <div className="folder">
                      <span className="folder-name">project-structure</span>
                      <div className="folder-content">
                        <div className="folder">
                          <span className="folder-name">public</span>
                        </div>
                        <div className="folder">
                          <span className="folder-name">src</span>
                          <div className="folder-content">
                            <div className="folder">
                              <span className="folder-name">components</span>
                              <div className="folder-content">
                                <div className="file">Cell.jsx</div>
                                <div className="file">Grid.jsx</div>
                                <div className="file">Controls.jsx</div>
                              </div>
                            </div>
                            <div className="folder">
                              <span className="folder-name">styles</span>
                            </div>
                            <div className="file">App.jsx</div>
                            <div className="file">main.jsx</div>
                          </div>
                        </div>
                        <div className="file">index.html</div>
                        <div className="file">vite.config.js</div>
                        <div className="file">package.json</div>
                        <div className="file">README.md</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="tree-preview">
                    <pre>
                    {`project-structure/
                    ├── public/                 # Static files
                    ├── src/
                    │   ├── components/         # React components
                    │   │   ├── Cell.jsx        # Cell component
                    │   │   ├── Grid.jsx        # Grid component
                    │   │   ├── Controls.jsx    # Controls component
                    │   ├── styles/             # CSS styles
                    │   ├── App.jsx             # Main component
                    │   ├── main.jsx            # Application entry point
                    ├── index.html              # Main HTML file
                    ├── vite.config.js          # Vite configuration
                    ├── package.json            # Dependencies and scripts
                    └── README.md               # Project documentation`
                    }
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>Key Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📁</div>
              <h3>Multiple Project Support</h3>
              <p>Manage and store multiple projects locally with no hassle</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🖥️</div>
              <h3>IDE-Style Visualization</h3>
              <p>View your project structure in a familiar IDE-style interface</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌲</div>
              <h3>Tree View Mode</h3>
              <p>Switch to terminal-like tree view for a compact representation</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📝</div>
              <h3>File Annotations</h3>
              <p>Add notes and documentation to any file or folder in your project</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <h2>How Directree Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Create a Project</h3>
              <p>Start by setting up a new project in Directree</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Build Your Structure</h3>
              <p>Add folders and files to mirror your project's organization</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Add Annotations</h3>
              <p>Document each component with helpful notes</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Export & Share</h3>
              <p>Generate documentation in markdown format</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to organize your project?</h2>
          <p>Get started with Directree today and bring clarity to your project structure</p>
          <button className="btn primary large">Start Organizing Now</button>
        </div>
      </section>
    </div>
  )
}

export default HomePage