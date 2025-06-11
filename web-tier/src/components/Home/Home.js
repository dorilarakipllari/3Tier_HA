import React, { Component } from 'react';

class Home extends Component {
  render() {
    const containerStyle = {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e0f2fe, #fef9c3)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Segoe UI, Roboto, sans-serif',
      padding: '40px',
    };

    const titleStyle = {
      fontSize: '40px',
      fontWeight: '700',
      color: '#1d4ed8',
      marginBottom: '20px',
    };

    const subtitleStyle = {
      fontSize: '22px',
      color: '#374151',
      marginBottom: '30px',
    };

    const cardStyle = {
      backgroundColor: '#ffffff',
      padding: '25px 35px',
      borderRadius: '14px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
      maxWidth: '650px',
      textAlign: 'center',
      color: '#111827',
    };

    return (
      <div style={containerStyle}>
        <h1 style={titleStyle}>Hello everyone 👋</h1>
        <p style={subtitleStyle}>
          Welcome to Dorila's Diploma Simple Web App 
        </p>
        <div style={cardStyle}>
          <p style={{ fontSize: '18px', marginBottom: '15px' }}>
            This is a simple 3-tier web application built as part of my Master Thesis.
          </p>
          <p style={{ fontSize: '18px', marginBottom: '15px' }}>
            On the left, you'll find a <strong>Database Demo</strong> waiting for you — it's
            not just for decoration, I promise!
          </p>
        </div>
      </div>
    );
  }
}

export default Home;
