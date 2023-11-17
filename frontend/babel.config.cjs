// babel.config.cjs
module.exports = function (api) {
  // Cache the returned value forever and don't call this function again.
  api.cache(true);

  // ... (add any other caching configurations if needed)

  // Return the Babel configuration.
  return {
    presets: ["@babel/preset-env", "@babel/preset-react"],
    plugins: [],
  };
};
