import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import ContestNotification from './ContestNotification';

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <>
      <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div className={`container ${isSidebarOpen ? 'shifted' : ''}`}>
        <ContestNotification />
      </div>
      <Footer className={isSidebarOpen ? 'shifted' : ''} />
    </>
  );
};

export default Home;