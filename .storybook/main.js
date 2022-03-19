module.exports = {
    stories: ['../src/packages/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        {
            name: '@storybook/addon-docs',
            options: {
                configureJSX: true,
            },
        },
    ],
    typescript: {
        check: false,
        checkOptions: {},
        reactDocgen: 'react-docgen-typescript',
        reactDocgenTypescriptOptions: {
            compilerOptions: {
                allowSyntheticDefaultImports: true,
                esModuleInterop: true,
            },
            shouldExtractLiteralValuesFromEnum: true,
            propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
        },
    },
}
