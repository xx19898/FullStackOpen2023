module.exports= {
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{js,jsx}'],
    coverageDirectory: 'coverage',
    testEnvironment: 'jsdom',
    moduleNameMapper: {'^.+\\.(css|less)$': '<rootDir>/tests/CSSStub.js'},
    setupFilesAfterEnv: ['<rootDir>/jest-setup.js']
}