import CryptoJS from 'crypto-js';

export default class EncryptionService {
    encryptorKey: string

    constructor() {
        this.encryptorKey = import.meta.env.VITE_ENCRYPTOR_KEY
    }

    encrypt = (text: string): any => {
        const encryptorKey = import.meta.env.VITE_ENCRYPTOR_KEY;
        const encrypted = CryptoJS.AES.encrypt(text, encryptorKey).toString();

        return encrypted
    }

    decrypt = (encryptedData: any): any => {
        const encryptorKey = import.meta.env.VITE_ENCRYPTOR_KEY;
        const decrypted = CryptoJS.AES.decrypt(encryptedData, encryptorKey).toString(CryptoJS.enc.Utf8);

        return decrypted
    }

    encryptObject = (object: any) : any =>  {
        const encryptorKey = import.meta.env.VITE_ENCRYPTOR_KEY;
        const encryptedObject = CryptoJS.AES.encrypt(JSON.stringify(object), encryptorKey).toString();

        return encryptedObject
    }

    decryptObject = (encryptedObject: any) => {
        const encryptorKey = import.meta.env.VITE_ENCRYPTOR_KEY;
        const decryptedData = CryptoJS.AES.decrypt(encryptedObject, encryptorKey).toString(CryptoJS.enc.Utf8);
        const decryptedObject = JSON.parse(decryptedData);

        return decryptedObject
    }
}