import '../src/tokens/index.css'

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    backgrounds: {
      default: 'foam',
      values: [
        { name: 'foam',    value: '#F6F3EE' },
        { name: 'white',   value: '#FFFFFF' },
        { name: 'mulberry', value: '#2E0524' },
        { name: 'dark',    value: '#180113' },
      ],
    },
    docs: {
      theme: {
        base: 'light',
        brandTitle: '_able Design System',
        brandUrl: 'https://ablegroup.io',
        fontBase: "'Host Grotesk', sans-serif",
        fontCode: "'DM Mono', monospace",
        colorPrimary: '#42C9AE',
        colorSecondary: '#2E0524',
        appBg: '#F6F3EE',
        appBorderColor: '#D3D3D3',
        textColor: '#180113',
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Global theme',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark',  icon: 'moon', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'light'
      return (
        <div
          data-theme={theme}
          style={{
            background: theme === 'dark' ? '#180113' : '#F6F3EE',
            padding: 32,
            minHeight: 200,
            fontFamily: "'Host Grotesk', sans-serif",
          }}
        >
          <Story />
        </div>
      )
    },
  ],
}

export default preview
