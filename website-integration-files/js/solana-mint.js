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
      throw new Error('Wallet not connected!');
    }

    try {
      console.log('Starting mint process...');

      // Get random metadata
      const { uri, imageUrl, index } = this.getRandomMetadataURI();
      const nftName = `${SOLANA_CONFIG.COLLECTION.name} #${index}`;

      console.log('Minting NFT:', nftName);
      console.log('Metadata URI:', uri);

      // Check if SPL Token library is loaded
      if (typeof splToken === 'undefined' && typeof window.splToken === 'undefined') {
        throw new Error('SPL Token library not loaded! Please refresh the page.');
      }

      // Access SPL Token - try multiple ways
      const SPL_TOKEN = window.splToken || splToken;
      
      if (!SPL_TOKEN) {
        throw new Error('SPL Token library not accessible! Please refresh the page.');
      }

      // Get required constants and functions
      const TOKEN_PROGRAM_ID = SPL_TOKEN.TOKEN_PROGRAM_ID || new solanaWeb3.PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');
      const ASSOCIATED_TOKEN_PROGRAM_ID = SPL_TOKEN.ASSOCIATED_TOKEN_PROGRAM_ID || new solanaWeb3.PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL');
      
      console.log('✅ SPL Token library loaded successfully');
      console.log('TOKEN_PROGRAM_ID:', TOKEN_PROGRAM_ID.toString());

      // Create mint account
      const mintKeypair = solanaWeb3.Keypair.generate();
      const userPublicKey = new solanaWeb3.PublicKey(solanaWallet.publicKey);

      console.log('Mint account:', mintKeypair.publicKey.toString());

      // Get minimum balance for rent exemption (82 bytes for mint account)
      const lamports = await this.connection.getMinimumBalanceForRentExemption(82);
      console.log('Rent exemption lamports:', lamports);

      // Create transaction
      const transaction = new solanaWeb3.Transaction();

      // Add create account instruction
      transaction.add(
        solanaWeb3.SystemProgram.createAccount({
          fromPubkey: userPublicKey,
          newAccountPubkey: mintKeypair.publicKey,
          lamports,
          space: 82, // Mint account size
          programId: TOKEN_PROGRAM_ID,
        })
      );

      // Add initialize mint instruction
      transaction.add(
        SPL_TOKEN.createInitializeMintInstruction(
          mintKeypair.publicKey,
          0, // decimals
          userPublicKey, // mint authority
          userPublicKey // freeze authority
        )
      );

      // Get associated token account
      const associatedTokenAccount = await SPL_TOKEN.getAssociatedTokenAddress(
        mintKeypair.publicKey,
        userPublicKey,
        false,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
      );

      console.log('Associated token account:', associatedTokenAccount.toString());

      // Add create associated token account instruction
      transaction.add(
        SPL_TOKEN.createAssociatedTokenAccountInstruction(
          userPublicKey, // payer
          associatedTokenAccount, // associated token account
          userPublicKey, // owner
          mintKeypair.publicKey, // mint
          TOKEN_PROGRAM_ID,
          ASSOCIATED_TOKEN_PROGRAM_ID
        )
      );

      // Add mint to instruction
      transaction.add(
        SPL_TOKEN.createMintToInstruction(
          mintKeypair.publicKey, // mint
          associatedTokenAccount, // destination
          userPublicKey, // authority
          1, // amount (1 NFT)
          [],
          TOKEN_PROGRAM_ID
        )
      );

      // Get recent blockhash
      const { blockhash } = await this.connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = userPublicKey;

      // Sign with mint keypair
      transaction.partialSign(mintKeypair);

      console.log('Transaction ready, requesting wallet signature...');

      // Send transaction
      const signature = await solanaWallet.signAndSendTransaction(transaction);

      console.log('✅ Mint successful! Signature:', signature);

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
      console.error('❌ Mint failed:', error);
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
