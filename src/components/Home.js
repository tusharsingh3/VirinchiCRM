import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
      setUser(JSON.parse(rememberedUser));
    } else {
      // Redirect to login if not authenticated
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('rememberedUser');
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home-container">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <button onClick={toggleSidebar} className="sidebar-toggle">
            ☰
          </button>
          <h1>Virinchi Architects CRM</h1>
        </div>
        <div className="header-right">
          <span className="user-greeting">Welcome, {user.name || user.email}</span>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>

      <div className="main-content">
        {/* Sidebar */}
        <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
          <nav className="sidebar-nav">
            <ul>
              <li><a href="#dashboard" className="nav-link active">Dashboard</a></li>
              <li><a href="#clients" className="nav-link">Clients</a></li>
              <li><a href="#projects" className="nav-link">Projects</a></li>
              <li><a href="#reports" className="nav-link">Reports</a></li>
              <li><a href="#settings" className="nav-link">Settings</a></li>
            </ul>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="content">
          <div className="content-header">
            <h2>Dashboard</h2>
            <p>Welcome to your CRM dashboard</p>
          </div>
          
          <div className="dashboard-widgets">
            <div className="widget">
              <h3>Total Clients</h3>
              <div className="widget-value">48</div>
            </div>
            <div className="widget">
              <h3>Active Projects</h3>
              <div className="widget-value">12</div>
            </div>
            <div className="widget">
              <h3>Completed Projects</h3>
              <div className="widget-value">36</div>
            </div>
            <div className="widget">
              <h3>Revenue</h3>
              <div className="widget-value">$2.4M</div>
            </div>
          </div>

          <div className="recent-activity">
            <h3>Recent Activity</h3>
            <div className="activity-list">
              <div className="activity-item">
                <span className="activity-time">2 hours ago</span>
                <span className="activity-text">New project "Modern Villa" created</span>
              </div>
              <div className="activity-item">
                <span className="activity-time">4 hours ago</span>
                <span className="activity-text">Client "John Smith" updated contact information</span>
              </div>
              <div className="activity-item">
                <span className="activity-time">1 day ago</span>
                <span className="activity-text">Project "Office Complex" marked as completed</span>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 Virinchi Architects. All rights reserved.</p>
          <div className="footer-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#support">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;