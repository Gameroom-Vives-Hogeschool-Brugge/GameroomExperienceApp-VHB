/// <reference types="vite/client" />

interface ImportMetaEnv {
readonly VITE_ENCRYPTOR_KEY: string
}

interface ImportMeta {
readonly env: ImportMetaEnv
}