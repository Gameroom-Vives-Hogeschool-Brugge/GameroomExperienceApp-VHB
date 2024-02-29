import EncryptorService from "../src/services/encryptionService.ts";

const encryptorService = new EncryptorService();

const encrypted = encryptorService.encrypt("test");
console.log(encrypted);
console.log(encryptorService.decrypt(encrypted));
console.log(encryptorService.createToken());