import React from 'react';

export default function Location() {
  return (
    <div style={{ padding: 16, height: 'calc(100vh - 60px)', boxSizing: 'border-box' }}>
      <h1 className="location-header">Yemekhane Konumu</h1>
      <div style={{ marginTop: 16, width: '100%', height: '100%' }}>
        <iframe
          title="Yemekhane Konumu"
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1582.5869963506823!2d42.42695347121718!3d37.50381426274621!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzfCsDMwJzEzLjciTiA0MsKwMjUnMzkuOCJF!5e0!3m2!1str!2str!4v1746623048920!5m2!1str!2str"
          width="100%"
          height="80%"
          style={{ border: 0, borderRadius: 8 }}
          loading="lazy"
        />
      </div>
    </div>
  );
}

