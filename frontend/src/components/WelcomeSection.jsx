import React from 'react';
import QuickPickCard from './QuickPickCard';

const WelcomeSection = ({ greeting, quickPicks }) => {
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
    </section>
  );
};

export default WelcomeSection;
