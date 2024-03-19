const fs = require('fs');
const { SitemapStream, streamToPromise } = require('sitemap');
const { createGzip } = require('zlib');
const { Readable } = require('stream');

// List all the routes in your app that you want to include in the sitemap
const routes = [
  '/',
  '/contact-us',
  '/about-us',
  '/privacy-policy'
  // Add other routes here...
];

(async () => {
  try {
    const sitemap = new SitemapStream({ hostname: 'https://www.example.com' }); // Replace with your domain
    const pipeline = Readable.from(routes).pipe(sitemap);
    const gzippedStream = pipeline.pipe(createGzip());

    // Save sitemap.xml
    await streamToPromise(gzippedStream).then((data) =>
      fs.writeFileSync('./public/sitemap.xml.gz', data)
    );

    console.log('Sitemap generated successfully!');
  } catch (error) {
    console.error(error);
  }
})();
