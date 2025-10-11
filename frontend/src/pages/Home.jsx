import React from 'react';

const Home = () => {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>Welcome to ResuMatrix!</h1>
      <p>This is the landing page. Click the links above to navigate.</p>
      <button style={{ padding: '10px 20px', fontSize: '16px', marginTop: '20px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>
        Start Building Your Resume
      </button>
    </div>
  );
};

export default Home;