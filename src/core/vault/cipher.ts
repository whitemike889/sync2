import { pbkdf2, randomBytes, createCipheriv, createDecipheriv, createHash } from 'crypto'

const KDF_ITERATIONS = 10000
const CIPHER_ALGO = 'aes-128-cbc'
const HASH_ALGO = 'sha256'

function kdf(password: string, salt: Buffer, n: number) {
    return new Promise<Buffer>((resolve, reject) => {
        pbkdf2(password, salt, n, 32, HASH_ALGO, (err, k) => {
            if (err) {
                return reject(err)
            }
            resolve(k)
        })
    })
}

export type CipherGlob = {
    cipherText: string
    iv: string
    kdf: {
        n: number
    },
    mac: string
}

export async function encrypt(clearText: Buffer, password: string, salt: Buffer): Promise<CipherGlob> {
    const key = await kdf(password, salt, KDF_ITERATIONS)
    const encryptKey = key.slice(0, 16)
    const macPrefix = key.slice(16)
    const iv = randomBytes(16)

    const enc = createCipheriv(CIPHER_ALGO, encryptKey, iv)
    const cipherText = enc.update(clearText, 'hex') + enc.final('hex')
    const mac = createHash(HASH_ALGO).update(macPrefix).update(cipherText).digest('hex')

    return {
        cipherText: cipherText,
        iv: iv.toString('hex'),
        kdf: {
            n: KDF_ITERATIONS
        },
        mac
    }
}

export async function decrypt(glob: CipherGlob, password: string, salt: Buffer) {
    const key = await kdf(password, salt, glob.kdf.n)
    const encryptKey = key.slice(0, 16)
    const macPrefix = key.slice(16)

    const mac = createHash(HASH_ALGO).update(macPrefix).update(glob.cipherText).digest('hex')
    if (mac !== glob.mac) {
        throw new Error('wrong password')
    }
    const dec = createDecipheriv(CIPHER_ALGO, encryptKey, Buffer.from(glob.iv, 'hex'))
    return Buffer.concat([dec.update(glob.cipherText, 'hex'), dec.final()])
}