
/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['@patternfly/react-core', '@patternfly/react-icons', '@patternfly/react-styles'],
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'picsum.photos',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;