import { createClient } from '@sanity/client';

export default createClient({
    projectId: 'pnm3puk3',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2024-01-01',
});