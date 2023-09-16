import sanityClient from '@sanity/client';

export default sanityClient({
    projectId: 'pnm3puk3',
    dataset: 'production',
    useCdn: true,
})