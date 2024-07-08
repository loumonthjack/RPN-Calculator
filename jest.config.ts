/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/*.test.ts'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
    },
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json',
        },
    },
    collectCoverage: true,
    collectCoverageFrom: ['**/*.ts'],
    coverageDirectory: 'coverage',
    coverageReporters: ['text-summary', 'lcov'],
};

