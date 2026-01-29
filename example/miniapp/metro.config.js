const path = require('path');
const { getDefaultConfig } = require('@expo/metro-config');

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// Watch the monorepo packages for changes
config.watchFolders = [monorepoRoot];

// Resolve modules from ROOT node_modules first to ensure single copies
config.resolver.nodeModulesPaths = [
  path.resolve(monorepoRoot, 'node_modules'),
  path.resolve(projectRoot, 'node_modules'),
];

// Handle pnpm symlinks
config.resolver.unstable_enableSymlinks = true;

// Force react-related packages to resolve from root node_modules
config.resolver.extraNodeModules = {
  react: path.resolve(monorepoRoot, 'node_modules/react'),
  'react-dom': path.resolve(monorepoRoot, 'node_modules/react-dom'),
  'react-native': path.resolve(monorepoRoot, 'node_modules/react-native'),
  'react-native-web': path.resolve(monorepoRoot, 'node_modules/react-native-web'),
};

module.exports = config;
