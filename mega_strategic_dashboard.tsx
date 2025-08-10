import React, { useState, useEffect } from 'react';

const MegaStrategicDashboard = () => {
  const [activeTab, setActiveTab] = useState('live-analysis');
  const [selectedSegment, setSelectedSegment] = useState('journalists');
  const [analysisState, setAnalysisState] = useState('idle');
  const [inputUrl, setInputUrl] = useState('');
  const [currentArticle, setCurrentArticle] = useState(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStep, setAnalysisStep] = useState('');
  const [systemMetrics, setSystemMetrics] = useState({
    articlesProcessed: 156,
    avgResponseTime: 340,
    accuracy: 91,
    uptime: 99.2
  });

  // Simulate real-time analysis
  const analyzeArticle = async () => {
    if (!inputUrl.trim()) return;
    
    setAnalysisState('analyzing');
    setAnalysisProgress(0);
    
    const steps = [
      { progress: 20, message: "Extracting article content..." },
      { progress: 40, message: "Analyzing ideological stance..." },
      { progress: 60, message: "Evaluating factual grounding..." },
      { progress: 80, message: "Detecting framing patterns..." },
      { progress: 100, message: "Generating bias profile..." }
    ];
    
    for (const step of steps) {
      setAnalysisStep(step.message);
      await new Promise(resolve => setTimeout(resolve, 800));
      setAnalysisProgress(step.progress);
    }
    
    const mockResult = {
      url: inputUrl,
      title: "Instagram's location feature sparks privacy debate",
      source: "Live Analysis",
      scores: {
        ideological_stance: 30 + Math.floor(Math.random() * 40),
        factual_grounding: 60 + Math.floor(Math.random() * 30),
        framing_choices: 40 + Math.floor(Math.random() * 50),
        emotional_tone: 20 + Math.floor(Math.random() * 60),
        source_transparency: 50 + Math.floor(Math.random() * 40)
      },
      highlighted_phrases: {
        emotional_tone: ["sparks debate", "privacy concerns"],
        framing_choices: ["controversial feature", "user backlash"],
        ideological_stance: ["tech regulation", "user rights"]
      },
      confidence: 0.85 + Math.random() * 0.15,
      publishedAt: new Date().toISOString().split('T')[0]
    };
    
    setCurrentArticle(mockResult);
    setAnalysisState('complete');
    setSystemMetrics(prev => ({
      ...prev,
      articlesProcessed: prev.articlesProcessed + 1,
      avgResponseTime: 320 + Math.floor(Math.random() * 100)
    }));
  };

  const getScoreColor = (score) => {
    if (score < 30) return '#22c55e';
    if (score < 60) return '#eab308';
    return '#ef4444';
  };

  // Executive KPIs and data
  const executiveKPIs = {
    revenue: { projected_month_3: 45000, target_year_1: 850000 },
    users: { month_3_target: 5000, year_1_target: 25000 },
    partnerships: { target_month_3: 8, in_pipeline: 3 },
    market_penetration: { month_3_target: 0.2, addressable_market: 2500000 }
  };

  const userSegments = {
    journalists: {
      name: "Journalists",
      size: "15M globally",
      pain_points: ["Tight deadlines", "Bias blindness", "Source verification"],
      conversion_funnel: { awareness: 1000, trial: 300, activation: 180, retention: 144 },
      ltv: 348,
      acquisition_cost: 45,
      features_priority: ["Speed (<500ms)", "Accuracy", "Highlighted phrases", "Export reports"]
    },
    researchers: {
      name: "Academic Researchers", 
      size: "2M globally",
      pain_points: ["Manual analysis", "Scale limitations", "Reproducibility"],
      conversion_funnel: { awareness: 500, trial: 200, activation: 140, retention: 126 },
      ltv: 420,
      acquisition_cost: 65,
      features_priority: ["Batch processing", "API access", "Data export", "Academic citations"]
    },
    news_orgs: {
      name: "News Organizations",
      size: "50K organizations",
      pain_points: ["Editorial consistency", "Brand reputation", "Internal bias"],
      conversion_funnel: { awareness: 100, trial: 40, activation: 28, retention: 25 },
      ltv: 3588,
      acquisition_cost: 1200,
      features_priority: ["Dashboard integration", "Team management", "Custom reports", "API"]
    }
  };

  const sampleArticles = [
    {
      source: "New York Post",
      title: "Instagram's new location tracking feature accused of attracting stalkers",
      scores: { ideological_stance: 45, factual_grounding: 60, framing_choices: 85, emotional_tone: 90, source_transparency: 40 },
      confidence: 0.87,
      publishedAt: "2025-08-07"
    },
    {
      source: "TechCrunch",
      title: "How to use Instagram Map and protect your privacy",
      scores: { ideological_stance: 55, factual_grounding: 90, framing_choices: 25, emotional_tone: 15, source_transparency: 85 },
      confidence: 0.94,
      publishedAt: "2025-08-08"
    },
    {
      source: "Axios",
      title: "Lawmakers urge Meta to shut down Instagram Map: 'abysmal' at protecting children",
      scores: { ideological_stance: 30, factual_grounding: 85, framing_choices: 70, emotional_tone: 60, source_transparency: 90 },
      confidence: 0.91,
      publishedAt: "2025-08-09"
    }
  ];

  // Tab content components
  const LiveAnalysisTab = () => (
    <div style={{ padding: '20px' }}>
      <div style={{ 
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', 
        color: 'white', 
        padding: '20px', 
        borderRadius: '12px',
        marginBottom: '30px'
      }}>
        <h2 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>⚡ Live Bias Analysis</h2>
        <p style={{ margin: 0, opacity: 0.9 }}>
          Paste any article URL to see real-time bias detection in action
        </p>
      </div>

      {/* URL Input */}
      <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
        <h3 style={{ marginTop: 0, marginBottom: '20px' }}>🎯 Analyze New Article</h3>
        <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
          <input
            type="url"
            placeholder="https://example.com/article-url"
            style={{
              flex: 1,
              padding: '12px 16px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '16px',
              outline: 'none'
            }}
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            disabled={analysisState === 'analyzing'}
          />
          <button
            onClick={analyzeArticle}
            disabled={analysisState === 'analyzing' || !inputUrl.trim()}
            style={{
              padding: '12px 24px',
              backgroundColor: analysisState === 'analyzing' ? '#9ca3af' : '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: analysisState === 'analyzing' ? 'not-allowed' : 'pointer'
            }}
          >
            {analysisState === 'analyzing' ? '🔄 Analyzing...' : '🚀 Analyze'}
          </button>
        </div>

        {/* Progress Bar */}
        {analysisState === 'analyzing' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', color: '#666' }}>
              <span>{analysisStep}</span>
              <span>{analysisProgress}%</span>
            </div>
            <div style={{ width: '100%', backgroundColor: '#e5e7eb', borderRadius: '4px', height: '8px' }}>
              <div 
                style={{
                  width: `${analysisProgress}%`,
                  backgroundColor: '#3b82f6',
                  height: '100%',
                  borderRadius: '4px',
                  transition: 'width 0.3s ease'
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Analysis Results */}
      {currentArticle && (
        <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0, marginBottom: '20px' }}>📊 Analysis Results</h3>
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ margin: '0 0 5px 0', fontWeight: '600' }}>{currentArticle.source}</h4>
            <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#666' }}>{currentArticle.title}</p>
            <div style={{ fontSize: '12px', color: '#888' }}>
              ⏱️ Analyzed in {systemMetrics.avgResponseTime}ms • {Math.round(currentArticle.confidence * 100)}% confidence
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
            {Object.entries(currentArticle.scores).map(([dimension, score]) => (
              <div key={dimension} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', textTransform: 'capitalize' }}>
                  {dimension.replace(/_/g, ' ')}
                </div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: getScoreColor(score), marginBottom: '8px' }}>
                  {score}/100
                </div>
                <div style={{ width: '100%', backgroundColor: '#e5e7eb', borderRadius: '4px', height: '6px' }}>
                  <div
                    style={{
                      width: `${score}%`,
                      backgroundColor: getScoreColor(score),
                      height: '100%',
                      borderRadius: '4px',
                      transition: 'width 0.5s ease'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sample URLs */}
      <div style={{ background: '#f9fafb', padding: '30px', borderRadius: '12px', border: '1px solid #e5e7eb', marginTop: '30px' }}>
        <h3 style={{ marginTop: 0, marginBottom: '20px' }}>🧪 Try These Sample URLs</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '10px' }}>
          {[
            "https://techcrunch.com/2025/08/08/instagram-map-privacy",
            "https://nypost.com/2025/08/07/tech/instagram-stalkers",
            "https://axios.com/2025/08/09/lawmakers-instagram-map",
            "https://washingtonpost.com/2025/08/09/gen-z-instagram"
          ].map((url, idx) => (
            <button
              key={idx}
              onClick={() => setInputUrl(url)}
              style={{
                textAlign: 'left',
                padding: '12px 16px',
                backgroundColor: 'white',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                color: '#3b82f6'
              }}
            >
              {url} →
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const OperationsTab = () => (
    <div style={{ padding: '20px' }}>
      <div style={{ 
        background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)', 
        color: 'white', 
        padding: '20px', 
        borderRadius: '12px',
        marginBottom: '30px'
      }}>
        <h2 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>⚡ Operations Dashboard</h2>
        <p style={{ margin: 0, opacity: 0.9 }}>Real-time system health and scaling metrics</p>
      </div>

      {/* Key Metrics */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>Articles Processed</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#3b82f6' }}>{systemMetrics.articlesProcessed}</div>
          <div style={{ fontSize: '12px', color: '#22c55e' }}>+12% from yesterday</div>
        </div>
        
        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>Avg Response Time</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#10b981' }}>{systemMetrics.avgResponseTime}ms</div>
          <div style={{ fontSize: '12px', color: '#666' }}>Target: &lt;500ms</div>
        </div>
        
        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>Accuracy Rate</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#8b5cf6' }}>{systemMetrics.accuracy}%</div>
          <div style={{ fontSize: '12px', color: '#666' }}>vs human raters</div>
        </div>
        
        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>System Uptime</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#f59e0b' }}>{systemMetrics.uptime}%</div>
          <div style={{ fontSize: '12px', color: '#666' }}>Last 30 days</div>
        </div>
      </div>

      {/* 90-Day Scaling Roadmap */}
      <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <h3 style={{ marginTop: 0, marginBottom: '20px', fontSize: '20px' }}>🚀 90-Day Scaling Roadmap</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <div style={{ padding: '20px', background: '#dbeafe', borderRadius: '8px' }}>
            <h4 style={{ color: '#1e40af', margin: '0 0 10px 0' }}>Month 1: Foundation</h4>
            <ul style={{ color: '#1e40af', fontSize: '14px', margin: 0, paddingLeft: '20px' }}>
              <li>Deploy production API</li>
              <li>Implement monitoring</li>
              <li>Beta with 10 journalists</li>
              <li>Target: 1K articles/day</li>
            </ul>
          </div>
          <div style={{ padding: '20px', background: '#dcfce7', borderRadius: '8px' }}>
            <h4 style={{ color: '#166534', margin: '0 0 10px 0' }}>Month 2: Scale</h4>
            <ul style={{ color: '#166534', fontSize: '14px', margin: 0, paddingLeft: '20px' }}>
              <li>Human feedback loops</li>
              <li>Multi-source ingestion</li>
              <li>100 active users</li>
              <li>Target: 10K articles/day</li>
            </ul>
          </div>
          <div style={{ padding: '20px', background: '#faf5ff', borderRadius: '8px' }}>
            <h4 style={{ color: '#6b21a8', margin: '0 0 10px 0' }}>Month 3: Launch</h4>
            <ul style={{ color: '#6b21a8', fontSize: '14px', margin: 0, paddingLeft: '20px' }}>
              <li>Public beta launch</li>
              <li>News org partnerships</li>
              <li>1K+ active users</li>
              <li>Target: 50K articles/day</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const ExecutiveTab = () => (
    <div style={{ padding: '20px', color: 'white' }}>
      <div style={{ 
        background: 'linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)',
        padding: '20px',
        borderRadius: '12px',
        marginBottom: '30px'
      }}>
        <h2 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>💼 Executive Command Center</h2>
        <p style={{ margin: 0, opacity: 0.9 }}>Strategic KPIs and business intelligence</p>
      </div>

      {/* Executive KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#10b981', fontSize: '16px' }}>💰 Revenue Trajectory</h3>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#10b981', marginBottom: '8px' }}>
            ${executiveKPIs.revenue.projected_month_3.toLocaleString()}/mo
          </div>
          <div style={{ fontSize: '12px', color: '#94a3b8' }}>
            Month 3 Target • ${executiveKPIs.revenue.target_year_1.toLocaleString()} ARR Year 1
          </div>
        </div>

        <div style={{ 
          background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#3b82f6', fontSize: '16px' }}>👥 User Growth</h3>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#3b82f6', marginBottom: '8px' }}>
            {executiveKPIs.users.month_3_target.toLocaleString()}
          </div>
          <div style={{ fontSize: '12px', color: '#94a3b8' }}>
            Month 3 Target • {executiveKPIs.users.year_1_target.toLocaleString()} Year 1
          </div>
        </div>

        <div style={{ 
          background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#8b5cf6', fontSize: '16px' }}>🤝 Partnerships</h3>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '8px' }}>
            {executiveKPIs.partnerships.target_month_3}
          </div>
          <div style={{ fontSize: '12px', color: '#94a3b8' }}>
            Month 3 Target • {executiveKPIs.partnerships.in_pipeline} in pipeline
          </div>
        </div>

        <div style={{ 
          background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#f59e0b', fontSize: '16px' }}>📈 Market Penetration</h3>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#f59e0b', marginBottom: '8px' }}>
            {executiveKPIs.market_penetration.month_3_target}%
          </div>
          <div style={{ fontSize: '12px', color: '#94a3b8' }}>
            ${(executiveKPIs.market_penetration.addressable_market / 1000000).toFixed(1)}M TAM
          </div>
        </div>
      </div>

      {/* Revenue Breakdown */}
      <div style={{ 
        background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
        padding: '25px',
        borderRadius: '12px',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', color: '#f1f5f9' }}>💎 Revenue Model Analysis</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          <div style={{ textAlign: 'center', padding: '15px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px' }}>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#10b981' }}>4,000</div>
            <div style={{ fontSize: '12px', color: '#94a3b8' }}>Freemium Users</div>
            <div style={{ fontSize: '10px', color: '#6b7280' }}>$0 revenue</div>
          </div>
          <div style={{ textAlign: 'center', padding: '15px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px' }}>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#3b82f6' }}>800</div>
            <div style={{ fontSize: '12px', color: '#94a3b8' }}>Pro Users</div>
            <div style={{ fontSize: '10px', color: '#6b7280' }}>$23K/month</div>
          </div>
          <div style={{ textAlign: 'center', padding: '15px', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '8px' }}>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#8b5cf6' }}>8</div>
            <div style={{ fontSize: '12px', color: '#94a3b8' }}>Enterprise</div>
            <div style={{ fontSize: '10px', color: '#6b7280' }}>$24K/month</div>
          </div>
          <div style={{ textAlign: 'center', padding: '15px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '8px' }}>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#f59e0b' }}>50K</div>
            <div style={{ fontSize: '12px', color: '#94a3b8' }}>API Calls</div>
            <div style={{ fontSize: '10px', color: '#6b7280' }}>$2.5K/month</div>
          </div>
        </div>
      </div>
    </div>
  );

  const ProductTab = () => {
    const currentSegment = userSegments[selectedSegment];
    
    return (
      <div style={{ padding: '20px', color: 'white' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '30px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>🧠 Product Strategy</h2>
              <p style={{ margin: 0, opacity: 0.9 }}>User-centric product development intelligence</p>
            </div>
            <select 
              value={selectedSegment}
              onChange={(e) => setSelectedSegment(e.target.value)}
              style={{
                padding: '8px 12px',
                background: 'rgba(255,255,255,0.2)',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '6px',
                color: 'white',
                fontSize: '14px'
              }}
            >
              <option value="journalists">Journalists</option>
              <option value="researchers">Researchers</option>
              <option value="news_orgs">News Organizations</option>
            </select>
          </div>
        </div>

        {/* User Segment Analysis */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
          <div style={{ 
            background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <h3 style={{ margin: '0 0 15px 0', fontSize: '18px', color: '#f1f5f9' }}>
              {currentSegment.name} Segment
            </h3>
            <div style={{ marginBottom: '15px' }}>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>Market Size</div>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#3b82f6' }}>{currentSegment.size}</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '8px' }}>Key Pain Points</div>
              {currentSegment.pain_points.map((pain, idx) => (
                <div key={idx} style={{ 
                  fontSize: '11px',
                  padding: '6px 10px',
                  background: 'rgba(239, 68, 68, 0.1)',
                  borderRadius: '4px',
                  marginBottom: '4px',
                  border: '1px solid rgba(239, 68, 68, 0.2)'
                }}>
                  🔥 {pain}
                </div>
              ))}
            </div>
          </div>

          <div style={{ 
            background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <h3 style={{ margin: '0 0 15px 0', fontSize: '18px', color: '#f1f5f9' }}>Conversion Metrics</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
              <div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>LTV</div>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#10b981' }}>${currentSegment.ltv}</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>CAC</div>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#f59e0b' }}>${currentSegment.acquisition_cost}</div>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>LTV:CAC Ratio</div>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#3b82f6' }}>
                  {Math.round(currentSegment.ltv / currentSegment.acquisition_cost * 10) / 10}:1
                </div>
              </div>
            </div>
            
            <div style={{ marginTop: '15px' }}>
              <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '8px' }}>Feature Priorities</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {currentSegment.features_priority.slice(0, 3).map((feature, idx) => (
                  <div key={idx} style={{
                    fontSize: '11px',
                    padding: '6px 10px',
                    background: 'rgba(139, 92, 246, 0.1)',
                    borderRadius: '4px',
                    border: '1px solid rgba(139, 92, 246, 0.2)'
                  }}>
                    #{idx + 1} {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Feature Usage Analytics */}
        <div style={{ 
          background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <h3 style={{ margin: '0 0 15px 0', fontSize: '18px', color: '#f1f5f9' }}>📊 Feature Performance</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
            <div style={{ textAlign: 'center', padding: '15px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px' }}>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#10b981' }}>95%</div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>Bias Scoring</div>
              <div style={{ fontSize: '10px', color: '#6b7280' }}>⭐ 4.8 satisfaction</div>
            </div>
            <div style={{ textAlign: 'center', padding: '15px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px' }}>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#3b82f6' }}>89%</div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>URL Analysis</div>
              <div style={{ fontSize: '10px', color: '#6b7280' }}>⭐ 4.6 satisfaction</div>
            </div>
            <div style={{ textAlign: 'center', padding: '15px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '8px' }}>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#f59e0b' }}>78%</div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>Highlighted Phrases</div>
              <div style={{ fontSize: '10px', color: '#6b7280' }}>⭐ 4.4 satisfaction</div>
            </div>
            <div style={{ textAlign: 'center', padding: '15px', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '8px' }}>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#8b5cf6' }}>56%</div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>Comparison Tool</div>
              <div style={{ fontSize: '10px', color: '#6b7280' }}>⭐ 4.7 satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: activeTab.includes('executive') || activeTab.includes('product') ? '#0f172a' : '#f3f4f6' }}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>

      {/* Header */}
      <div style={{ 
        background: 'linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)', 
        color: 'white',
        padding: '20px 0'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ fontSize: '32px' }}>⚡</div>
              <div>
                <h1 style={{ margin: '0 0 5px 0', fontSize: '28px', fontWeight: 'bold' }}>The Bias Lab</h1>
                <p style={{ margin: 0, opacity: 0.9, fontSize: '16px' }}>Complete Strategic Intelligence Platform</p>
              </div>
            </div>
            <div style={{ 
              padding: '8px 16px', 
              backgroundColor: '#10b981', 
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              🟢 System Online
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'flex', gap: '0' }}>
            {[
              { id: 'live-analysis', label: 'Live Analysis', icon: '🚀' },
              { id: 'operations', label: 'Operations', icon: '📊' },
              { id: 'executive', label: 'Executive', icon: '💼' },
              { id: 'product', label: 'Product Strategy', icon: '🧠' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '16px 24px',
                  borderBottom: activeTab === tab.id ? '3px solid #3b82f6' : '3px solid transparent',
                  backgroundColor: 'transparent',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: activeTab === tab.id ? '#3b82f6' : '#6b7280',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {activeTab === 'live-analysis' && <LiveAnalysisTab />}
        {activeTab === 'operations' && <OperationsTab />}
        {activeTab === 'executive' && <ExecutiveTab />}
        {activeTab === 'product' && <ProductTab />}
      </div>
    </div>
  );
};

export default MegaStrategicDashboard;