import React from 'react';
import { Helmet } from 'react-helmet-async';
import { generateLocalBusinessSchema } from '../../lib/schema';

export const OrganizationSchema: React.FC = () => {
  const schema = generateLocalBusinessSchema();

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};
