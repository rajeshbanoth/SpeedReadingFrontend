import React from 'react';

const Sitemap = () => {
  // Define your URLs
  const urls = [
    'https://speedreading.vercel.app',
    'https://speedreading.vercel.app/contact-us',
    'https://speedreading.vercel.app/about-us',
    'https://speedreading.vercel.app/privacy-policy'
  ];

  // Function to generate XML content
  const generateXml = () => {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    // Loop through URLs and generate XML for each
    urls.forEach(url => {
      xml += `<url>\n`;
      xml += `  <loc>${url}</loc>\n`;
      xml += `  <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`; // Last modification date
      xml += `  <changefreq>daily</changefreq>\n`; // Change frequency
      xml += `</url>\n`;
    });
    xml += '</urlset>';
    return xml;
  };

  // Generate XML content
  const xmlContent = generateXml();

  // Set response headers to indicate XML content
  const headers = {
    'Content-Type': 'application/xml',
  };

  // Render the XML content
  return (
    <pre>
      <code>
        {xmlContent}
      </code>
    </pre>
  );
};

export default Sitemap;
