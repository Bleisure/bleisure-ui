const { addDecorator } = require('@storybook/react')
const { withPropsTable } = require('storybook-addon-react-docgen')

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            date: /Date$/,
            select: /(colour|scale|font)$/,
        },
    },
    backgrounds: {
        default: 'dark',
        values: [
            {
                name: 'light',
                value: '#ffffff',
            },
            {
                name: 'dark',
                value: '#1E2226',
            },
        ],
    },
}

addDecorator(withPropsTable)
