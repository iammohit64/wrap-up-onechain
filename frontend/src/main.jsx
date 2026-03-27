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

// Change your networks constant in main.jsx to this:
const rpcUrl = window.location.hostname === 'localhost' 
  ? 'https://rpc-testnet.onelabs.cc/' 
  : '/onechain-rpc'; // <--- Uses Vercel proxy in production to bypass CORS

const networks = {
  testnet: { url: rpcUrl },
};

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