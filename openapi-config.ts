import type { ConfigFile } from '@rtk-query/codegen-openapi';

const config: ConfigFile = {
    schemaFile: 'http://0.0.0.0:8000/openapi.json',
    apiFile: './src/api/splitApi.ts',
    apiImport: 'splitApi',
    outputFile: './src/api/generatedApi.ts',
    exportName: 'TSTApi',
    hooks: true,
    tag: true,
};

export default config;
