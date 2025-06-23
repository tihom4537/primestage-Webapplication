import React from 'react';
import { Helmet } from 'react-helmet';

const SEOHead = ({ 
  title, 
  description, 
  keywords, 
  url, 
  image = "/og-image.jpg",
  type = "website",
  author = "PrimeStage",
  siteName = "PrimeStage",
  twitterHandle = "@PrimeStage"
}) => {
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": `PrimeStage - ${title}`,
    "url": url,
    "description": description,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "category": "Artist Booking Services"
    },
    "creator": {
      "@type": "Organization",
      "name": "PrimeStage"
    }
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:site" content={twitterHandle} />
      
      {/* Mobile App Tags */}
      <meta name="application-name" content={siteName} />
      <meta name="apple-mobile-web-app-title" content={siteName} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="mobile-web-app-capable" content="yes" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

// Example usage in different components:

// // Live Singers in Mohali Page
// export const LiveSingersInMohali = () => (
//   <>
//     <SEOHead
//       title="Live Singers In Mohali"
//       description="Hire the best live singers in Mohali directly with no middleman. PrimeStage offers top-rated singers for weddings, parties, and live events."
//       keywords="live, Live Singers In Mohali, singer, Mohali, booking, artist, House Party, Corporate Event,Events"
//       url="https://primestage.in/live/singer/mohali"
//     />
//   </>
// );



// // Live Bands in Chandigarh Page
// export const LiveBandsInChandigarh = () => (
//   <>
//     <SEOHead
//       title="Live Bands In Chandigarh"
//       description="Choose from the largest collection of bands in Chandigarh directly with no middleman. PrimeStage offers top-rated bands for weddings, parties, and live events."
//       keywords="live,Live Bands in Chandigarh, Live Singers In Chandigarh, band, chandigarh, booking, artist, House Party, Event"
//       url="https://primestage.in/live/band"
//     />
//   </>
// );


// // Live Singers in Chandigarh Page
// export const LiveSingersInChandigarh = () => (
//   <>
//     <SEOHead
//       title="Live Singers In Chandigarh"
//       description="Hire the best live singer in Chandigarh directly with no middleman. PrimeStage offers top-rated singers for weddings, parties, and live events."
//       keywords="live, Live Singers In Chandigarh, singer, chandigarh, booking, artist, House Party, Event"
//       url="https://primestage.in/live/singer"
//     />
   
//   </>
// );

// export const LiveSingerInPanchkula = () => (
//   <>
//     <SEOHead
//       title="Live Singers In Panchkula"
//       description="Hire the best live singer in Panchkula directly with no middleman. PrimeStage offers top-rated singers for weddings, parties, and live events."
//       keywords="live, Live Singers In Panchkula, singer, panchkula, booking, artist, House Party, Event"
//       url="https://primestage.in/live/singer/panchkula"
//     />
//   </>
// );

  
export default SEOHead;