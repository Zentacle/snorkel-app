module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['@babel/plugin-transform-private-methods', { loose: true }],
    ['@babel/plugin-transform-private-property-in-object', { loose: true }],
    [
      'babel-plugin-module-resolver',
      {
        root: ['./'],
        alias: {
          _assets: './assets',
          _components: './src/Components',
          _screens: './src/Screens',
          _utils: './src/utils',
          _redux: './src/redux',
        },
      },
    ],
  ],
};
