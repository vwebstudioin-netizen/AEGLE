'use client';

import { useEffect } from 'react';

export default function TawkToWidget() {
  useEffect(() => {
    const propertyId = process.env.NEXT_PUBLIC_TAWK_TO_PROPERTY_ID;
    const widgetId = process.env.NEXT_PUBLIC_TAWK_TO_WIDGET_ID;

    if (!propertyId || !widgetId) return;

    // Tawk.to embed script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    document.head.appendChild(script);

    return () => {
      // Cleanup on unmount
      document.head.removeChild(script);
      // Remove Tawk.to iframe if present
      const tawkElements = document.querySelectorAll('[id^="tawk-"]');
      tawkElements.forEach((el) => el.remove());
    };
  }, []);

  return null; // This component only injects the script
}
