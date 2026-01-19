
export const getIconSlug = (name: string): string | null => {
    const lower = name.toLowerCase().trim();

    // Custom mappings
    const map: Record<string, string> = {
        'reactjs': 'react',
        'react js': 'react',
        'react': 'react',
        'react native': 'react',
        'nextjs': 'nextdotjs',
        'next.js': 'nextdotjs',
        'vuejs': 'vuedotjs',
        'vue': 'vuedotjs',
        'angular 5': 'angular',
        'angular': 'angular',
        'jquery': 'jquery',
        'javascript': 'javascript',
        'typescript': 'typescript',
        'golang': 'go',
        'go': 'go',
        'nodejs': 'nodedotjs',
        'node.js': 'nodedotjs',
        'express': 'express',
        'expressjs': 'express',
        'php': 'php',
        'laravel': 'laravel',
        'codeigniter': 'codeigniter',
        'grpc': 'grpc',
        'graphql': 'graphql',
        'flutter': 'flutter',
        'ionic': 'ionic',
        'sql': 'sqlite',
        'nosql': 'mongodb',
        'mysql': 'mysql',
        'postgresql': 'postgresql',
        'firebase': 'firebase',
        'prisma': 'prisma',
        'docker': 'docker',
        'kubernetes': 'kubernetes',
        'git': 'git',
        'bamboo': 'bamboo',
        'helm chart': 'helm',
        'grafana': 'grafana',
        'microservices': '',
        'rest api': '',
        'mqtt': 'mqtt',
        'apollo': 'apollographql',
        'redux': 'redux',
        'bootstrap': 'bootstrap',
        'ajax': 'javascript',
        'chartjs': 'chartdotjs',
        'html': 'html5',
        'css': 'css3',
        'networking': '',
        'hardware': '',
        'troubleshooting': '',
        'sass': 'sass',
        'tailwindcss': 'tailwindcss'
    };

    if (Object.prototype.hasOwnProperty.call(map, lower)) {
        return map[lower] === '' ? null : map[lower];
    }

    // Default clean up
    return lower.replace(/\s+/g, '').replace(/\./g, 'dot');
};

export const getIconUrl = (name: string): string | null => {
    const slug = getIconSlug(name);
    if (!slug) return null;
    return `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${slug}.svg`;
};
