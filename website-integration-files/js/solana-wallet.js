// Solana Wallet Connection Handler
class SolanaWallet {
  constructor() {
    this.provider = null;
    this.publicKey = null;
    this.connected = false;
  }

  // Detect Phantom Wallet
  async detectProvider() {
    if ('phantom' in window) {
      const provider = window.phantom?.solana;
      if (provider?.isPhantom) {
        return provider;
      }
    }
    
    // If Phantom not found, try Solflare
    if ('solflare' in window) {
      return window.solflare;
    }
    
    return null;
  }

  // Connect wallet
  async connect() {
    try {
      this.provider = await this.detectProvider();
      
      if (!this.provider) {
        throw new Error('Wallet tidak ditemukan! Install Phantom atau Solflare.');
      }

      // Connect to wallet
      const resp = await this.provider.connect();
      this.publicKey = resp.publicKey.toString();
      this.connected = true;

      console.log('Wallet connected:', this.publicKey);
      return {
        success: true,
        publicKey: this.publicKey,
      };
    } catch (error) {
      console.error('Wallet connection failed:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Disconnect wallet
  async disconnect() {
    try {
      if (this.provider && this.connected) {
        await this.provider.disconnect();
        this.publicKey = null;
        this.connected = false;
        console.log('Wallet disconnected');
      }
      return { success: true };
    } catch (error) {
      console.error('Disconnect failed:', error);
      return { success: false, error: error.message };
    }
  }

  // Get balance
  async getBalance() {
    if (!this.connected) {
      throw new Error('Wallet tidak terhubung!');
    }

    try {
      const connection = new solanaWeb3.Connection(
        SOLANA_CONFIG.RPC_ENDPOINT,
        'confirmed'
      );
      
      const publicKey = new solanaWeb3.PublicKey(this.publicKey);
      const balance = await connection.getBalance(publicKey);
      
      return balance / solanaWeb3.LAMPORTS_PER_SOL;
    } catch (error) {
      console.error('Failed to get balance:', error);
      throw error;
    }
  }

  // Sign and send transaction
  async signAndSendTransaction(transaction) {
    if (!this.connected || !this.provider) {
      throw new Error('Wallet tidak terhubung!');
    }

    try {
      const connection = new solanaWeb3.Connection(
        SOLANA_CONFIG.RPC_ENDPOINT,
        'confirmed'
      );

      // Get recent blockhash
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = new solanaWeb3.PublicKey(this.publicKey);

      // Sign transaction
      const signed = await this.provider.signTransaction(transaction);
      
      // Send transaction
      const signature = await connection.sendRawTransaction(signed.serialize());
      
      // Confirm transaction
      await connection.confirmTransaction(signature);
      
      return signature;
    } catch (error) {
      console.error('Transaction failed:', error);
      throw error;
    }
  }
}

// Create global instance
const solanaWallet = new SolanaWallet();
