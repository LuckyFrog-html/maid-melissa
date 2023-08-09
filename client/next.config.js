/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");
const nextConfig = {
    i18n,
    trailingSlash: true,
    compiler: {
        removeConsole: {
            exclude: ['error', 'log'],
        },
    }
}

module.exports = nextConfig
