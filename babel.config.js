// module.exports = {
//     presets: ['@babel/preset-env', '@babel/preset-react']
// }

module.exports = {
    presets: ['@babel/preset-react', '@babel/preset-env'],
    plugins: ['@babel/plugin-proposal-class-properties',
        '@babel/plugin-transform-runtime'],
};
