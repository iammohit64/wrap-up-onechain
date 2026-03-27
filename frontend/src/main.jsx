import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// --- OneChain / Sui Imports ---
import { SuiClientProvider, WalletProvider } from '@mysten/dapp-kit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// REQUIRED: DApp Kit base styles for the connect button and modals
import '@mysten/dapp-kit/dist/index.css'

const queryClient = new QueryClient()

// ✅ FIX: Use OneChain's official RPC endpoint instead of Sui's!
const networks = {
  testnet: {
    url: 'https://rpc-testnet.onelabs.cc:443',
  },
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networks} defaultNetwork="testnet">
        {/* autoConnect remembers the user's wallet session */}
        <WalletProvider autoConnect>
          <App />
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  </StrictMode>,
)