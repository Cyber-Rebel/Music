import React from 'react';

const ContentSection = ({ title, onSeeAll, children }) => {
  return (
    <section className="content-section">
      <div className="section-header">
        <h3>{title}</h3>
        {onSeeAll && (
          <button className="see-all" onClick={onSeeAll}>
            See all
          </button>
        )}
      </div>
      <div className="card-grid">
        {children}
      </div>
    </section>
  );
};

export default ContentSection;
