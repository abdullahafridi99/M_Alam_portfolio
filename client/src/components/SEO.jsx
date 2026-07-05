import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, slug, image, type = 'website', jsonLd }) => {
  const siteName = 'Advocate Mubashir Alam';
  const siteUrl = window.location.origin;
  const canonicalUrl = slug ? `${siteUrl}/${slug}` : window.location.href;
  const metaTitle = title ? `${title} | ${siteName}` : siteName;
  const metaDesc = description || 'Professional portfolio of Advocate Mubashir Alam, providing expert legal counsel in Civil, Criminal, Corporate, and Family Law.';
  const shareImage = image || `${siteUrl}/assets/logo.png`;

  // Default Structured Data for Lawyer/Legal Service
  const defaultSchema = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    'name': siteName,
    'description': metaDesc,
    'url': siteUrl,
    'telephone': '+92 300 1234567',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Chamber 12, District Courts Complex',
      'addressLocality': 'Karachi',
      'addressRegion': 'Sindh',
      'postalCode': '74200',
      'addressCountry': 'PK',
    },
    'image': shareImage,
    'priceRange': '$$',
  };

  return (
    <Helmet>
      {/* Title */}
      <title>{metaTitle}</title>
      <link rel="canonical" href={canonicalUrl} />
      <meta name="description" content={metaDesc} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={shareImage} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={shareImage} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd || defaultSchema)}
      </script>
    </Helmet>
  );
};

export default SEO;
