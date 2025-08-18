import type { Preview } from '@storybook/react-vite'
import '../src/index.css'
import { CurrencyContext } from '../src/contexts'
import { withRouter, reactRouterParameters } from 'storybook-addon-remix-react-router'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    reactRouter: {
      ...reactRouterParameters,
      initialEntries: ['/'],
      initialIndex: 0,
    },
  },
  decorators: [
    withRouter,
    (Story, { parameters }) => {
      return (
        <CurrencyContext value={{ currency: 'usd', setCurrency: () => {} }}>
          <Story {...parameters} />
        </CurrencyContext>
      )
    },
  ],
}

export default preview
