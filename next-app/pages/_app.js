import '../styles/Theme.css'
import '../styles/App.css'
import '../styles/App.mobile.css'
import '../styles/PriceSlider.css'
import '@rainbow-me/rainbowkit/styles.css'
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi'
import { AppProvider } from '../context/context'
import 'react-toastify/dist/ReactToastify.css'

import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from '@rainbow-me/rainbowkit'

import { infuraProvider } from 'wagmi/providers/infura'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

const { chains, provider } = configureChains(
  [chain.goerli, chain.localhost],
  [
    infuraProvider({ apiKey: process.env.INFURA_API_KEY, priority: 1 }),
    jsonRpcProvider({
      priority: 2,
      rpc: chain => ({
        http: `HTTP://127.0.0.1:7545`,
      }),
    }),
  ],
)

const { connectors } = getDefaultWallets({
  appName: 'Instagram',
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

const MyApp = ({ Component, pageProps }) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <AppProvider>
        <RainbowKitProvider chains={chains} theme={darkTheme()} coolMode>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </AppProvider>
    </WagmiConfig>
  )
}

export default MyApp
