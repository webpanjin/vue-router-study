
/**
 * 解密文本
 * @name decryptText
 * @function
 * @param {string} encryptText 需要解密的文本
 * @returns Promise
 */
 export const decryptText = async (encryptText) => {
    /** 如果没有密钥，需要先从服务器获取密钥 */
    if (secretKey === undefined && secretIv === undefined) {
      try {
        await obtainKeyFromServer();
      } catch (err) {
        throw new Error(err);
      }
    }
  
    let text = AES.decrypt(encryptText, CryptoJS.enc.Utf8.parse(secretKey), {
      iv: CryptoJS.enc.Utf8.parse(secretIv),
      mode: CryptoJS.mode.CBC,
      format: CryptoJS.format.Hex,
    }).toString(CryptoJS.enc.Utf8);
    try {
      text = JSON.parse(text);
    } catch (err) {
      console.log(err);
    }
  
    return text;
  };
  
  /**
   * 加密文本
   * @name encryptText
   * @function
   * @param {string | object | array} text 需要加密的文本
   */
  export const encryptText = async (text) => {
    /** 如果没有密钥，需要先从服务器获取密钥 */
    if (secretKey === undefined && secretIv === undefined) {
      try {
        await obtainKeyFromServer();
      } catch (err) {
        throw new Error(err);
      }
    }
  
    if (!isString(text)) text = JSON.stringify(text);
  
    return AES.encrypt(text, CryptoJS.enc.Utf8.parse(secretKey), {
      iv: CryptoJS.enc.Utf8.parse(secretIv),
      mode: CryptoJS.mode.CBC,
      format: CryptoJS.format.Hex,
    }).toString();
  };

