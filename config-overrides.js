// eslint-disable-next-line @typescript-eslint/no-var-requires
const { alias, configPaths } = require('react-app-rewire-alias');

module.exports = (config) => {
    const overrider = alias(configPaths('./tsconfig.paths.json'));

    return overrider(config);
};
