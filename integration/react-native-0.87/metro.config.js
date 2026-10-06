// Uses React Native's own Metro config, so module resolution behaves exactly
// like a real RN app: resolverMainFields defaults to ["react-native",
// "browser", "main"], which is what makes bundlers load bignumber.js's
// "browser" IIFE build (the root cause of issue #126).
const { getDefaultConfig } = require("@react-native/metro-config");

module.exports = getDefaultConfig(__dirname);
