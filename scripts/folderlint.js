#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '..', '.folderlintrc.js');
const config = require(configPath);

function matchPattern(value, pattern) {
  const regex = new RegExp(pattern.replace(/[.*+?^${}()|[\]\]/g, '\$&').replace(/\\*\\*/g, '.*').replace(/\\*/g, '[^/]*'));
  return regex.test(value);
}

function lint(dir, rules, errors = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  entries.forEach((entry) => {
    const fullPath = path.join(dir, entry.name);
    const relative = path.relative(process.cwd(), fullPath).replace(/\/g, '/');

    Object.entries(rules).forEach(([pattern, rule]) => {
      if (matchPattern(relative, pattern)) {
        if (entry.isDirectory()) {
          lint(fullPath, rules, errors);
        } else {
          const allowed = rule.allowed || [];
          const disallowed = rule.disallowed || [];
          const isAllowed =
            allowed.length === 0 ||
            allowed.some((allowPattern) => matchPattern(relative, allowPattern));
          const isDisallowed = disallowed.some((disallowPattern) => matchPattern(relative, disallowPattern));

          if (!isAllowed) {
            errors.push(`File ${relative} is not allowed here`);
          }

          if (isDisallowed) {
            errors.push(`File ${relative} violates disallowed pattern`);
          }
        }
      }
    });
  });

  return errors;
}

function main() {
  const root = path.join(__dirname, '..');
  const errors = lint(root, config.rules);

  if (errors.length) {
    console.error('Folder lint failed:');
    errors.forEach((err) => console.error(`  - ${err}`));
    process.exit(1);
  }

  console.log('✓ Folder structure looks good');
}

main();
