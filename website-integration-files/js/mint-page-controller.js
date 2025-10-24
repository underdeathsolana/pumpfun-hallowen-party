// Page Controller for Mint Page
document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const connectWalletBtn = document.getElementById('connect-wallet-btn');
  const disconnectWalletBtn = document.getElementById('disconnect-wallet-btn');
  const mintNftBtn = document.getElementById('mint-nft-btn');
  const walletConnectSection = document.getElementById('wallet-connect-section');
  const walletInfo = document.getElementById('wallet-info');
  const walletAddress = document.getElementById('wallet-address');
  const walletBalance = document.getElementById('wallet-balance');
  const loading = document.getElementById('loading');
  const successMessage = document.getElementById('success-message');
  const errorMessage = document.getElementById('error-message');
  const errorText = document.getElementById('error-text');
  const nftPreview = document.getElementById('nft-preview');
  const nftImage = document.getElementById('nft-image');
  const nftName = document.getElementById('nft-name');
  const explorerLink = document.getElementById('explorer-link');
  const mintCount = document.getElementById('mint-count');

  // Connect Wallet
  connectWalletBtn.addEventListener('click', async function() {
    try {
      connectWalletBtn.disabled = true;
      connectWalletBtn.textContent = 'Connecting...';

      const result = await solanaWallet.connect();

      if (result.success) {
        // Hide connect section, show wallet info
        walletConnectSection.style.display = 'none';
        walletInfo.classList.add('show');

        // Display wallet address
        const shortAddress = result.publicKey.slice(0, 8) + '...' + result.publicKey.slice(-8);
        walletAddress.textContent = shortAddress;

        // Get and display balance
        try {
          const balance = await solanaWallet.getBalance();
          walletBalance.textContent = balance.toFixed(4) + ' SOL';
        } catch (e) {
          walletBalance.textContent = 'Error';
        }

        // Enable mint button
        mintNftBtn.disabled = false;

        console.log('Wallet connected successfully!');
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      alert('Failed to connect wallet: ' + error.message);
      connectWalletBtn.disabled = false;
      connectWalletBtn.textContent = '👻 Connect Wallet';
    }
  });

  // Disconnect Wallet
  disconnectWalletBtn.addEventListener('click', async function() {
    try {
      await solanaWallet.disconnect();
      
      // Show connect section, hide wallet info
      walletConnectSection.style.display = 'block';
      walletInfo.classList.remove('show');

      // Disable mint button
      mintNftBtn.disabled = true;

      // Reset messages
      successMessage.classList.remove('show');
      errorMessage.classList.remove('show');

      connectWalletBtn.disabled = false;
      connectWalletBtn.textContent = '👻 Connect Wallet';

      console.log('Wallet disconnected');
    } catch (error) {
      alert('Failed to disconnect: ' + error.message);
    }
  });

  // Mint NFT
  mintNftBtn.addEventListener('click', async function() {
    try {
      // Hide previous messages
      successMessage.classList.remove('show');
      errorMessage.classList.remove('show');
      nftPreview.classList.remove('show');

      // Show loading
      loading.classList.add('show');
      mintNftBtn.disabled = true;

      console.log('Starting mint...');

      // Mint NFT
      const result = await solanaMint.mintNFT();

      // Hide loading
      loading.classList.remove('show');

      if (result.success) {
        // Show success message
        successMessage.classList.add('show');
        nftPreview.classList.add('show');

        // Display NFT info
        nftImage.src = result.imageUrl;
        nftName.textContent = result.nftName;
        explorerLink.href = result.explorerUrl;
        explorerLink.textContent = result.signature.slice(0, 20) + '...';

        // Update mint count
        mintCount.textContent = solanaMint.getMintCount();

        // Re-enable mint button after 3 seconds
        setTimeout(() => {
          mintNftBtn.disabled = false;
        }, 3000);

        console.log('Mint successful!', result);
      }
    } catch (error) {
      console.error('Mint error:', error);

      // Hide loading
      loading.classList.remove('show');

      // Show error message
      errorMessage.classList.add('show');
      errorText.textContent = error.message;

      // Re-enable mint button
      mintNftBtn.disabled = false;
    }
  });

  // Check if wallet is already connected (on page load)
  window.addEventListener('load', async function() {
    try {
      const provider = await solanaWallet.detectProvider();
      if (provider && provider.isConnected) {
        connectWalletBtn.click();
      }
    } catch (e) {
      console.log('No wallet auto-connect');
    }
  });
});
