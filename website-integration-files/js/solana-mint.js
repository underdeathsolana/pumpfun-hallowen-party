// Solana NFT Mint Handler
class SolanaMint {
  constructor() {
    this.connection = new solanaWeb3.Connection(
      SOLANA_CONFIG.RPC_ENDPOINT,
      'confirmed'
    );
    this.mintCount = 0;
  }

  // Get random metadata URI
  getRandomMetadataURI() {
    const randomIndex = Math.floor(Math.random() * SOLANA_CONFIG.METADATA_URIS.length);
    return {
      uri: SOLANA_CONFIG.METADATA_URIS[randomIndex],
      imageUrl: SOLANA_CONFIG.IMAGE_URLS[randomIndex],
      index: randomIndex + 1,
    };
  }

  // Mint NFT (simplified version for HTML)
  async mintNFT() {
    if (!solanaWallet.connected) {
      throw new Error('Wallet belum terhubung!');
    }

    try {
      console.log('Starting mint process...');

      // Get random metadata
      const { uri, imageUrl, index } = this.getRandomMetadataURI();
      const nftName = `${SOLANA_CONFIG.COLLECTION.name} #${index}`;

      console.log('Minting NFT:', nftName);
      console.log('Metadata URI:', uri);

      // Create mint account
      const mintKeypair = solanaWeb3.Keypair.generate();
      const userPublicKey = new solanaWeb3.PublicKey(solanaWallet.publicKey);

      // Get minimum balance for rent exemption
      const lamports = await this.connection.getMinimumBalanceForRentExemption(
        splToken.MintLayout.span
      );

      // Create transaction
      const transaction = new solanaWeb3.Transaction();

      // Add create account instruction
      transaction.add(
        solanaWeb3.SystemProgram.createAccount({
          fromPubkey: userPublicKey,
          newAccountPubkey: mintKeypair.publicKey,
          lamports,
          space: splToken.MintLayout.span,
          programId: splToken.TOKEN_PROGRAM_ID,
        })
      );

      // Add initialize mint instruction
      transaction.add(
        splToken.createInitializeMintInstruction(
          mintKeypair.publicKey,
          0, // decimals
          userPublicKey, // mint authority
          userPublicKey, // freeze authority
          splToken.TOKEN_PROGRAM_ID
        )
      );

      // Get associated token account
      const associatedTokenAccount = await splToken.getAssociatedTokenAddress(
        mintKeypair.publicKey,
        userPublicKey
      );

      // Add create associated token account instruction
      transaction.add(
        splToken.createAssociatedTokenAccountInstruction(
          userPublicKey,
          associatedTokenAccount,
          userPublicKey,
          mintKeypair.publicKey
        )
      );

      // Add mint to instruction
      transaction.add(
        splToken.createMintToInstruction(
          mintKeypair.publicKey,
          associatedTokenAccount,
          userPublicKey,
          1 // amount (1 NFT)
        )
      );

      // Sign with mint keypair
      transaction.partialSign(mintKeypair);

      // Send transaction
      const signature = await solanaWallet.signAndSendTransaction(transaction);

      console.log('Mint successful! Signature:', signature);

      this.mintCount++;

      return {
        success: true,
        signature,
        nftName,
        imageUrl,
        metadataUri: uri,
        explorerUrl: `https://explorer.solana.com/tx/${signature}?cluster=${SOLANA_CONFIG.NETWORK}`,
      };
    } catch (error) {
      console.error('Mint failed:', error);
      throw error;
    }
  }

  // Get mint count
  getMintCount() {
    return this.mintCount;
  }
}

// Create global instance
const solanaMint = new SolanaMint();
