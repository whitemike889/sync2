import type { abi } from 'thor-devkit/dist/abi'

const transferABI: abi.Function.Definition = {
    constant: false,
    inputs: [
        {
            name: '_to',
            type: 'address'
        },
        {
            name: '_value',
            type: 'uint256'
        }
    ],
    name: 'transfer',
    outputs: [
        {
            name: '',
            type: 'bool'
        }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
}
const vip180balanceOf: abi.Function.Definition = {
    constant: true,
    inputs: [
        {
            name: '_owner',
            type: 'address'
        }
    ],
    name: 'balanceOf',
    outputs: [
        {
            name: 'balance',
            type: 'uint256'
        }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
}
const transferEvent: abi.Event.Definition = {
    anonymous: false,
    inputs: [
        {
            indexed: true,
            name: '_from',
            type: 'address'
        },
        {
            indexed: true,
            name: '_to',
            type: 'address'
        },
        {
            indexed: false,
            name: '_value',
            type: 'uint256'
        }
    ],
    name: 'Transfer',
    type: 'event'
}
const paramsGet: abi.Function.Definition = {
    constant: true,
    inputs: [{ name: '_key', type: 'bytes32' }],
    name: 'get',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
}

const VTHO: M.TokenSpec = {
    symbol: 'VTHO',
    name: 'VeChain Thor',
    address: '0x0000000000000000000000000000456e65726779',
    decimals: 18,
    desc: 'Represents the underlying cost of using VeChainThor',
    icon: '3ac553ea77911248ab4519bca020e0aa2891a6c6.png',
    totalSupply: ''
}
const VET: M.TokenSpec = {
    symbol: 'VET',
    name: 'VeChain',
    address: '',
    decimals: 18,
    desc: '',
    icon: '',
    totalSupply: ''
}

export const abis = {
    transfer: transferABI,
    balanceOf: vip180balanceOf,
    paramsGet,
    transferEvent
}

export const tokenSpecs = {
    VTHO, VET
}

export const urls = {
    get tos() { return 'https://tos.vecha.in:5678/' },
    get tokenRegistry() { return 'https://vechain.github.io/token-registry/' },
    get explorerMain() {
        return 'http://explore.vechain.org/'
    },
    get explorerTest() {
        return 'https://explore-testnet.vechain.org/'
    }
}

export const gids = {
    get main() { return '0x00000000851caf3cfdb6e899cf5958bfb1ac3413d346d43539627e6be7ec1b4a' },
    get test() { return '0x000000000b2bce3c70bc649a02749e8687721b09ed2e15997f466536b20bb127' }
}
