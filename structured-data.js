// Structured Data for SEO (JSON-LD)
document.addEventListener('DOMContentLoaded', () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ApartmentComplex",
    "name": "ARIUM at RMR ITAppChallenge",
    "description": "Experience luxury living at ARIUM at RMR ITAppChallenge - modern 1 and 2 bedroom apartments with resort-style amenities in a serene Newton community.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Main Street",
      "addressLocality": "Newton",
      "addressRegion": "MA",
      "postalCode": "02458",
      "addressCountry": "US"
    },
    "telephone": "(555) 123-4567",
    "email": "leasing@arium-rmr.com",
    "url": window.location.origin,
    "amenityFeature": [
      {
        "@type": "LocationFeatureSpecification",
        "name": "Resort-style pool",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification", 
        "name": "24-hour fitness center",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Smart home features",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Dog park",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Outdoor kitchen",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Playground",
        "value": true
      }
    ],
    "numberOfRooms": "1-2",
    "floorSize": {
      "@type": "QuantitativeValue",
      "minValue": 791,
      "maxValue": 1488,
      "unitText": "SqFt"
    },
    "priceRange": "$1,000-$3,000",
    "openingHours": [
      "Mo-Fr 09:00-18:00",
      "Sa 10:00-16:00", 
      "Su 12:00-16:00"
    ],
    "hasMap": "https://maps.google.com/?q=123+Main+Street+Newton+MA+02458",
    "sameAs": [
      "https://www.facebook.com/arium-rmr",
      "https://www.instagram.com/arium-rmr",
      "https://www.twitter.com/arium-rmr"
    ]
  };

  // Create and append the structured data script
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(structuredData);
  document.head.appendChild(script);
});
