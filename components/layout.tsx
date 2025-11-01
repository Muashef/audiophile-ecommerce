import React from 'react';
import Header from './header';
import LastSection from './last-section';
import Footer from './footer';

function Layout({ children }: { children: React.ReactNode }) {
    return (
      <div className="">
        {/* <Header /> */}
        {children}
        <LastSection />
        <Footer />
      </div>
    );
  }
  
  export default Layout;