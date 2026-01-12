import { useState, useEffect } from 'react';
import '../styles/Header.css';

const Header = () => {
  const [onlineUsers, setOnlineUsers] = useState(1);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Simulate connection
    const connectTimer = setTimeout(() => {
      setIsConnected(true);
    }, 1000);

    // Simulate online users fluctuation
    const usersInterval = setInterval(() => {
      setOnlineUsers(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        return Math.max(1, Math.min(12, prev + change));
      });
    }, 5000);

    return () => {
      clearTimeout(connectTimer);
      clearInterval(usersInterval);
    };
  }, []);

  return (
    <header className="header">
      <h1 className="logo">TaskFlow</h1>
      <div className="header-stats">
        <div className={`status-badge ${isConnected ? 'connected' : ''}`}>
          <span className="status-pulse"></span>
          <span>{isConnected ? 'Connected' : 'Connecting...'}</span>
        </div>
        <div className="users-badge">
          👥 {onlineUsers} online
        </div>
      </div>
    </header>
  );
};

export default Header;
