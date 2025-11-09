import React from 'react';
import QuickPickCard from './QuickPickCard';

const WelcomeSection = ({ greeting, quickPicks , Myplaylist }) => {
  return (
    <section className="welcome-section">
      <h2>{greeting}</h2>
      <div className="quick-picks">
        {quickPicks.map((item, index) => (
          <QuickPickCard 
            key={index} 
            title={item.title} 
            image={item.image}
          />
        ))}
      </div>
      <div style={{
        fontStyle:"unset",
        fontSize:"22px",
        fontWeight:"bold",
        marginTop:"40px",
        marginBottom:"20px"
        
      }}>My PlayLists</div>
      <div className="quick-picks">
        {Myplaylist.map((item, index) => (
          <QuickPickCard 
            key={index} 
            title={item.title} 
            image={item.image}
          />
        ))}
      </div>
    </section>
  );
};

export default WelcomeSection;
