import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Shiva | Web Developer',
        short_name: 'Shiva',
        description: 'High-performance websites & web apps by Shiva.',
        start_url: '/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#8B5CF6',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    }
}
