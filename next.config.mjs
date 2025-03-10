import { withPayload } from '@payloadcms/next/withPayload'

const MINIO_URL_PUBLIC = process.env.MINIO_URL
  ? `https://${process.env.MINIO_URL}`
  : undefined || process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  images: {
    remotePatterns: [
      ...[MINIO_URL_PUBLIC].map((item) => {
        const url = new URL(item)

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', ''),
        }
      }),
    ],
  },
  reactStrictMode: true,
}

export default withPayload(nextConfig)
