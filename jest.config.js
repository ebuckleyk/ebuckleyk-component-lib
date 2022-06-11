module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    ".(css|less|scss)$": "identity-obj-proxy",
  },
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.stories.{ts,tsx}",
    "!src/stories/**",
    "!<rootDir>/node_modules/"
  ]
}