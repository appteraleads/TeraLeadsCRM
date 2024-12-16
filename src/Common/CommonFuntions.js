import CryptoJS from "crypto-js";
import parsePhoneNumber from 'libphonenumber-js';
const SECRET_KEY = "ed1fd0c7deea4aa7023c2195fb097a27";

export const decryptPassword = (encryptedPassword, iv) => {
  const bytes = CryptoJS.AES.decrypt(
    encryptedPassword,
    CryptoJS?.enc?.Utf8?.parse(SECRET_KEY),
    {
      iv: CryptoJS?.enc?.Base64?.parse(iv), // Convert IV from base64
    }
  );

  return bytes?.toString(CryptoJS?.enc?.Utf8); // Return decrypted password as string
};

export const parsePhone = (phone) => {
    const phoneNumber = parsePhoneNumber(phone);
  
    if (phoneNumber && phoneNumber.isValid()) {
      return {
        country: phoneNumber.country, 
        countryCode: phoneNumber.countryCallingCode, 
        number: phoneNumber.nationalNumber, 
      };
    } else {
      throw new Error("Invalid phone number");
    }
  };
