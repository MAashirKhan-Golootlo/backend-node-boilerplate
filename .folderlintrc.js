module.exports = {
  rules: {
    '^src$': {
      allowed: ['**/*.ts', '**/*.d.ts']
    },
    '^src/features$': {
      allowed: ['**/*.ts']
    },
    '^src/docs$': {
      allowed: ['**/*.ts']
    }
  }
};
