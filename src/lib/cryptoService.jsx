// lib/cryptoService.js

// Basic XOR encryption for demonstration - in production use proper encryption libraries
export function encrypt(text, key) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
      result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return btoa(result); // Base64 encode for safe transit
  }
  
  export function decrypt(encryptedText, key) {
    try {
      const text = atob(encryptedText); // Base64 decode
      let result = '';
      for (let i = 0; i < text.length; i++) {
        result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
      }
      return result;
    } catch (e) {
      console.error('Decryption error:', e);
      return encryptedText; // Return original if decryption fails
    }
  }