import React from 'react';
import WomenPage from './WomenPage';

// Men's page reuses the same product overview layout as Women's page
// but with the "Men" filter pre-selected
export default function MenPage({ onBack }) {
  return <WomenPage onBack={onBack} defaultFilter="Men" />;
}
