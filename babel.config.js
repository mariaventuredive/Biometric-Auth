module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      "@babel/plugin-transform-react-jsx",
      {
        runtime: "automatic",
        importSource: "@dynatrace/react-native-plugin",
      },
    ],
  ],
};

