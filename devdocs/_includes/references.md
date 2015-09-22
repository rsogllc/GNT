{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}

{% comment %}<!-- Terms; must have tooltip description in "quotes"; alphabetical order -->{% endcomment %}
[bitcoin URI]: /devdocs/guide#term-bitcoin-uri "A URI which allows receivers to encode payment details so spenders don't have to manually enter addresses and other details"
[certificate chain]: /devdocs/examples#term-certificate-chain "A chain of certificates connecting a individual's leaf certificate to the certificate authority's root certificate"
[coinbase block height]: /devdocs/reference#term-coinbase-block-height "The current block's height encoded into the first bytes of the coinbase field"
[data-pushing op code]: https://en.bitcoin.it/wiki/Script#Constants "Any op code from 0x01 to 0x4e which pushes data on to the script evaluation stack"
[fiat]: /devdocs/guide#term-fiat "National currencies such as the dollar or euro"
[intermediate certificate]: /devdocs/examples#term-intermediate-certificate "A intermediate certificate authority certificate which helps connect a leaf (receiver) certificate to a root certificate authority"
[key index]: /devdocs/guide#term-key-index "An index number used in the HD wallet formula to generate child keys from a parent key"
[key pair]: /devdocs/guide#term-key-pair "A private key and its derived public key"
[label]: /devdocs/guide#term-label "The label parameter of a bitcoin: URI which provides the spender with the receiver's name (unauthenticated)"
[leaf certificate]: /devdocs/examples#term-leaf-certificate "The end-node in a certificate chain; in the payment protocol, it is the certificate belonging to the receiver of satoshis"
[merge]: /devdocs/guide#term-merge "Spending, in the same transaction, multiple outputs which can be traced back to different previous spenders, leaking information about how many satoshis you control"
[merge avoidance]: /devdocs/guide#term-merge-avoidance "A strategy for selecting which outputs to spend that avoids merging outputs with different histories that could leak private information"
[message]: /devdocs/guide#term-message "A parameter of bitcoin: URIs which allows the receiver to optionally specify a message to the spender"
[msg_tx]: /devdocs/reference#term-msg_tx "The TXID data type identifier of an inventory on the P2P network"
[msg_block]: /devdocs/reference#term-msg_block "The block header hash data type identifier of an inventory on the P2P network"
[msg_filtered_block]: /devdocs/reference#term-msg_block "An alternative to the block header hash data type identifier of an inventory on the P2P network used to request a merkle block"
[network]: /devdocs/guide#term-network "The Bitcoin P2P network which broadcasts transactions and blocks"
[op_checkmultisig]: /devdocs/reference#term-op-checkmultisig "Op code which returns true if one or more provided signatures (m) sign the correct parts of a transaction and match one or more provided public keys (n)"
[op_checksig]: /devdocs/reference#term-op-checksig "Op code which returns true if a signature signs the correct parts of a transaction and matches a provided public key"
[op_dup]: /devdocs/reference#term-op-dup "Operation which duplicates the entry below it on the stack"
[op_equal]: /devdocs/reference#term-op-equal "Operation which returns true if the two entries below it on the stack are equivalent"
[op_equalverify]: /devdocs/reference#term-op-equalverify "Operation which terminates the script in failure unless the two entries below it on the stack are equivalent"
[op_hash160]: /devdocs/reference#term-op-hash160 "Operation which converts the entry below it on the stack into a RIPEMD(SHA256()) hashed version of itself"
[op_return]: /devdocs/reference#term-op-return "Operation which terminates the script in failure"
[op_verify]: /devdocs/reference#term-op-verify "Operation which terminates the script if the entry below it on the stack is non-true (zero)"
[output index]: /devdocs/guide#term-output-index "The sequentially-numbered index of outputs in a single transaction starting from 0"
[PaymentDetails]: /devdocs/examples#term-paymentdetails "The PaymentDetails of the payment protocol which allows the receiver to specify the payment details to the spender"
[PaymentRequest]: /devdocs/examples#term-paymentrequest "The PaymentRequest of the payment protocol which contains and allows signing of the PaymentDetails"
[PaymentRequests]: /devdocs/examples#term-paymentrequest "The PaymentRequest of the payment protocol which contains and allows signing of the PaymentDetails"
[peer]: /devdocs/guide#term-peer "Peer on the P2P network who receives and broadcasts transactions and blocks"
[peers]: /devdocs/guide#term-peer "Peers on the P2P network who receive and broadcast transactions and blocks"
[PKI]: /devdocs/examples#term-pki "Public Key Infrastructure; usually meant to indicate the X.509 certificate system used for HTTP Secure (https)."
[point function]: /devdocs/guide#term-point-function "The ECDSA function used to create a public key from a private key"
[pp amount]: /devdocs/examples#term-pp-amount "Part of the Output part of the PaymentDetails part of a payment protocol where receivers can specify the amount of satoshis they want paid to a particular pubkey script"
[pp expires]: /devdocs/examples#term-pp-expires "The expires field of a PaymentDetails where the receiver tells the spender when the PaymentDetails expires"
[pp memo]: /devdocs/examples#term-pp-memo "The memo fields of PaymentDetails, Payment, and PaymentACK which allow spenders and receivers to send each other memos"
[pp merchant data]: /devdocs/examples#term-pp-merchant-data "The merchant_data part of PaymentDetails and Payment which allows the receiver to send arbitrary data to the spender in PaymentDetails and receive it back in Payments"
[pp PKI data]: /devdocs/examples#term-pp-pki-data "The pki_data field of a PaymentRequest which provides details such as certificates necessary to validate the request"
[pp pki type]: /devdocs/examples#term-pp-pki-type "The PKI field of a PaymentRequest which tells spenders how to validate this request as being from a specific recipient"
[pp script]: /devdocs/examples#term-pp-script "The script field of a PaymentDetails where the receiver tells the spender what pubkey scripts to pay"
[previous block header hash]: /devdocs/reference#term-previous-block-header-hash "A field in the block header which contains the SHA256(SHA256()) hash of the previous block's header"
[proper money handling]: /devdocs/reference#term-proper-money-handling "Bitcoin amounts need to be correctly processed without introducing rounding errors that could cause monetary loss"
[r]: /devdocs/guide#term-r-parameter "The payment request parameter in a bitcoin: URI"
[receipt]: /devdocs/guide#term-receipt "A cryptographically-verifiable receipt created using parts of a payment request and a confirmed transaction"
[recurrent rebilling]: /devdocs/guide#rebilling-recurring-payments "Billing a spender on a regular schedule"
[refund]: /devdocs/guide#issuing-refunds "A transaction which refunds some or all satoshis received in a previous transaction"
[root certificate]: /devdocs/examples#term-root-certificate "A certificate belonging to a certificate authority (CA)"
[ssl signature]: /devdocs/examples#term-ssl-signature "Signatures created and recognized by major SSL implementations such as OpenSSL"
[standard block relay]: /devdocs/guide#term-standard-block-relay "The regular block relay method: announcing a block with an inv message and waiting for a response"
[transaction]: /devdocs/guide#transactions "A transaction spending satoshis"
[transaction version number]: /devdocs/guide#term-transaction-version-number "A version number prefixed to transactions to allow upgrading""
[transactions]: /devdocs/guide#transactions "A transaction spending satoshis"
[unencrypted wallet]: /devdocs/reference#encryptwallet "A wallet that has not been encrypted with the encryptwallet RPC"
[unique addresses]: /devdocs/guide#term-unique-address "Address which are only used once to protect privacy and increase security"
[unlocked wallet]: /devdocs/reference#walletpassphrase "An encrypted wallet that has been unlocked with the walletpassphrase RPC"
[unsolicited block push]: /devdocs/guide#term-unsolicited-block-push "When a miner sends a block message without sending an inv message first"
[URI QR Code]: /devdocs/guide#term-uri-qr-code "A QR code containing a bitcoin: URI"
[v2 block]: /devdocs/reference#term-v2-block "The current version of Bitcoin blocks"
[verified payments]: /devdocs/guide#verifying-payment "Payments which the receiver believes won't be double spent"
[wallet support]: /devdocs/reference#term-wallet-support "A Bitcoin Core ./configure option that enables (default) or disables the wallet"

{% comment %}<!-- RPCs; alphabetical order -->{% endcomment %}
[rpc addmultisigaddress]: /devdocs/reference#addmultisigaddress
[rpc addnode]: /devdocs/reference#addnode
[rpc backupwallet]: /devdocs/reference#backupwallet
[rpc createmultisig]: /devdocs/reference#createmultisig
[rpc createrawtransaction]: /devdocs/reference#createrawtransaction
[rpc decoderawtransaction]: /devdocs/reference#decoderawtransaction
[rpc decodescript]: /devdocs/reference#decodescript
[rpc dumpprivkey]: /devdocs/reference#dumpprivkey
[rpc dumpwallet]: /devdocs/reference#dumpwallet
[rpc encryptwallet]: /devdocs/reference#encryptwallet
[rpc estimatefee]: /devdocs/reference#estimatefee
[rpc estimatepriority]: /devdocs/reference#estimatepriority
[rpc generate]: /devdocs/reference#generate
[rpc getaccount]: /devdocs/reference#getaccount
[rpc getaccountaddress]: /devdocs/reference#getaccountaddress
[rpc getaddednodeinfo]: /devdocs/reference#getaddednodeinfo
[rpc getaddressesbyaccount]: /devdocs/reference#getaddressesbyaccount
[rpc getbalance]: /devdocs/reference#getbalance
[rpc getbestblockhash]: /devdocs/reference#getbestblockhash
[rpc getblock]: /devdocs/reference#getblock
[rpc getblockchaininfo]: /devdocs/reference#getblockchaininfo
[rpc getblockcount]: /devdocs/reference#getblockcount
[rpc getblockhash]: /devdocs/reference#getblockhash
[rpc getblocktemplate]: /devdocs/reference#getblocktemplate
[rpc getchaintips]: /devdocs/reference#getchaintips
[rpc getconnectioncount]: /devdocs/reference#getconnectioncount
[rpc getdifficulty]: /devdocs/reference#getdifficulty
[rpc getgenerate]: /devdocs/reference#getgenerate
[rpc gethashespersec]: /devdocs/reference#gethashespersec
[rpc getinfo]: /devdocs/reference#getinfo
[rpc getmempoolinfo]: /devdocs/reference#getmempoolinfo
[rpc getmininginfo]: /devdocs/reference#getmininginfo
[rpc getnettotals]: /devdocs/reference#getnettotals
[rpc getnetworkhashps]: /devdocs/reference#getnetworkhashps
[rpc getnetworkinfo]: /devdocs/reference#getnetworkinfo
[rpc getnewaddress]: /devdocs/reference#getnewaddress
[rpc getpeerinfo]: /devdocs/reference#getpeerinfo
[rpc getrawchangeaddress]: /devdocs/reference#getrawchangeaddress
[rpc getrawmempool]: /devdocs/reference#getrawmempool
[rpc getrawtransaction]: /devdocs/reference#getrawtransaction
[rpc getreceivedbyaccount]: /devdocs/reference#getreceivedbyaccount
[rpc getreceivedbyaddress]: /devdocs/reference#getreceivedbyaddress
[rpc gettransaction]: /devdocs/reference#gettransaction
[rpc gettxout]: /devdocs/reference#gettxout
[rpc gettxoutproof]: /devdocs/reference#gettxoutproof
[rpc gettxoutsetinfo]: /devdocs/reference#gettxoutsetinfo
[rpc getunconfirmedbalance]: /devdocs/reference#getunconfirmedbalance
[rpc getwalletinfo]: /devdocs/reference#getwalletinfo
[rpc getwork]: /devdocs/reference#getwork
[rpc help]: /devdocs/reference#help
[rpc importaddress]: /devdocs/reference#importaddress
[rpc importprivkey]: /devdocs/reference#importprivkey
[rpc importwallet]: /devdocs/reference#importwallet
[rpc keypoolrefill]: /devdocs/reference#keypoolrefill
[rpc listaccounts]: /devdocs/reference#listaccounts
[rpc listaddressgroupings]: /devdocs/reference#listaddressgroupings
[rpc listlockunspent]: /devdocs/reference#listlockunspent
[rpc listreceivedbyaccount]: /devdocs/reference#listreceivedbyaccount
[rpc listreceivedbyaddress]: /devdocs/reference#listreceivedbyaddress
[rpc listsinceblock]: /devdocs/reference#listsinceblock
[rpc listtransactions]: /devdocs/reference#listtransactions
[rpc listunspent]: /devdocs/reference#listunspent
[rpc lockunspent]: /devdocs/reference#lockunspent
[rpc move]: /devdocs/reference#move
[rpc ping]: /devdocs/reference#ping-rpc
[rpc prioritisetransaction]: /devdocs/reference#prioritisetransaction
[rpc sendfrom]: /devdocs/reference#sendfrom
[rpc sendmany]: /devdocs/reference#sendmany
[rpc sendrawtransaction]: /devdocs/reference#sendrawtransaction
[rpc sendtoaddress]: /devdocs/reference#sendtoaddress
[rpc setaccount]: /devdocs/reference#setaccount
[rpc setgenerate]: /devdocs/reference#setgenerate
[rpc settxfee]: /devdocs/reference#settxfee
[rpc signmessage]: /devdocs/reference#signmessage
[rpc signrawtransaction]: /devdocs/reference#signrawtransaction
[rpc stop]: /devdocs/reference#stop
[rpc submitblock]: /devdocs/reference#submitblock
[rpc validateaddress]: /devdocs/reference#validateaddress
[rpc verifychain]: /devdocs/reference#verifychain
[rpc verifymessage]: /devdocs/reference#verifymessage
[rpc verifytxoutproof]: /devdocs/reference#verifytxoutproof
[rpc walletlock]: /devdocs/reference#walletlock
[rpc walletpassphrase]: /devdocs/reference#walletpassphrase
[rpc walletpassphrasechange]: /devdocs/reference#walletpassphrasechange

{% comment %}<!-- REST requests; alphabetical order -->{% endcomment %}
[rest get block]: /devdocs/reference#get-block
[rest get block-notxdetails]: /devdocs/reference#get-blocknotxdetails
[rest get tx]: /devdocs/reference#get-tx

{% comment %}<!-- P2P protocol messages; alphabetical order -->{% endcomment %}
[addr message]: /devdocs/reference#addr "The P2P network message which relays IP addresses and port numbers of active nodes to other nodes and clients, allowing decentralized peer discovery."
[alert message]: /devdocs/reference#alert "The P2P network message which sends alerts in case of major software problems."
[block message]: /devdocs/reference#block "The P2P network message which sends a serialized block"
[filteradd message]: /devdocs/reference#filteradd "A P2P protocol message used to add a data element to an existing bloom filter."
[filterclear message]: /devdocs/reference#filterclear "A P2P protocol message used to remove an existing bloom filter."
[filterload message]: /devdocs/reference#filterclear "A P2P protocol message used to send a filter to a remote peer, requesting that they only send transactions which match the filter."
[getaddr message]: /devdocs/reference#getaddr "A P2P protool message used to request an addr message containing connection information for other nodes"
[getblocks message]: /devdocs/reference#getblocks "A P2P protocol message used to request an inv message containing a range of block header hashes"
[getdata message]: /devdocs/reference#getdata "A P2P protocol message used to request one or more transactions, blocks, or merkle blocks"
[getheaders message]: /devdocs/reference#getheaders "A P2P protocol message used to request a range of block headers"
[headers message]: /devdocs/reference#headers "A P2P protocol message containing one or more block headers"
[inv message]: /devdocs/reference#inv "A P2P protocol message used to send inventories of transactions and blocks known to the transmitting peer"
[mempool message]: /devdocs/reference#mempool "A P2P protocol message used to request one or more inv messages with currently-unconfirmed transactions"
[merkleblock message]: /devdocs/reference#merkleblock "A P2P protocol message used to request a filtered block useful for SPV proofs"
[notfound message]: /devdocs/reference#notfound "A P2P protocol message sent to indicate that the requested data was not available"
[ping message]: /devdocs/reference#ping "A P2P network message used to see if the remote host is still connected"
[pong message]: /devdocs/reference#pong "A P2P network message used to reply to a P2P network ping message"
[reject message]: /devdocs/reference#reject "A P2P network message used to indicate a previously-received message was rejected for some reason"
[tx message]: /devdocs/reference#tx "A P2P protocol message which sends a single serialized transaction"
[verack message]: /devdocs/reference#verack "A P2P network message sent in reply to a version message to confirm a connection has been established"
[version message]: /devdocs/reference#version "A P2P network message sent at the begining of a connection to allow protocol version negotiation"

{% comment %}<!-- Other internal site links; alphabetical order -->{% endcomment %}
[bandwidth sharing guide]: /en/full-node
[bcc contribute]: /en/bitcoin-core/contribute/
[bcc contribute code]: /{{page.lang}}/{% translate development url %}
[bcc contribute documentation]: /en/bitcoin-core/contribute/documentation
[bcc contribute issues]: /en/bitcoin-core/contribute/issues
[bcc contribute support]: /en/bitcoin-core/contribute/support
[bcc contribute translations]: /en/bitcoin-core/contribute/translations
[bcc decentralized peer discovery]: /en/bitcoin-core/features/privacy#decentralized-peer-discovery
[bcc documentation]: /en/bitcoin-core/help#documentation
[bcc download]: /en/download
[bcc features]: /en/bitcoin-core/features/
[bcc forums]: /en/bitcoin-core/help#forums
[bcc help]: /en/bitcoin-core/help
[bcc live help]: /en/bitcoin-core/help#live
[bcc main]: /en/bitcoin-core/
[bcc network support]: /en/bitcoin-core/features/network-support
[bcc privacy]: /en/bitcoin-core/features/privacy
[bcc privacy data leaking]: /en/bitcoin-core/features/privacy#perfect-privacy-for-received-transactions
[bcc requirements]: /en/bitcoin-core/features/requirements
[bcc user interface]: /en/bitcoin-core/features/user-interface
[bcc user interface lightweight]: /en/bitcoin-core/features/user-interface#lightweight
[bcc validation]: /en/bitcoin-core/features/validation
[bcc validation decentralization]: /en/bitcoin-core/features/validation#help-protect-decentralization
[bcc validation do you validate]: /en/bitcoin-core/features/validation#do-you-validate
[bcc validation protection]: /en/bitcoin-core/features/validation#how-validation-protects-your-bitcoins
[bcc version history]: /en/version-history

[Bitcoin Core 0.6.0]: /en/release/v0.6.0
[Bitcoin Core 0.6.1]: /en/release/v0.6.1
[Bitcoin Core 0.7.0]: /en/release/v0.7.0
[Bitcoin Core 0.8.0]: /en/release/v0.8.0
[Bitcoin Core 0.9.0]: /en/release/v0.9.0
[Bitcoin Core 0.9.1]: /en/release/v0.9.1
[Bitcoin Core 0.9.2]: /en/release/v0.9.2
[Bitcoin Core 0.9.3]: /en/release/v0.9.3
{% comment %}<!-- TODOv0.10 update this to point to 0.10 release notes when released -->{% endcomment %}
[Bitcoin Core 0.10.0]: https://github.com/bitcoin/bitcoin/tree/0.10
[bitcoin URI subsection]: /devdocs/guide#bitcoin-uri
[bitcoind initial setup]: /devdocs/examples
[bitcoinpdf]: https://bitcoin.org/en/bitcoin-paper
[choose your wallet]: /en/choose-your-wallet
[communities]: /en/community
[core executable]: /en/download
[dev communities]: /en/development#devcommunities
[developer documentation]: /devdocs/documentation
[devex complex raw transaction]: /devdocs/examples#complex-raw-transaction
[devex payment protocol]: /devdocs/examples#payment-protocol
[devexamples]: /devdocs/examples
[devguide]: /devdocs/guide
[devguide avoiding key reuse]: /devdocs/guide#avoiding-key-reuse
[devguide hardened keys]: /devdocs/guide#hardened-keys
[devguide payment processing]: /devdocs/guide#payment-processing
[devguide wallets]: /devdocs/guide#wallets
[devref]: /devdocs/reference
[devref wallets]: /devdocs/reference#wallets
[locktime parsing rules]: /devdocs/guide#locktime_parsing_rules
[Merge Avoidance subsection]: /devdocs/guide#merge-avoidance
[micropayment channel]: /devdocs/guide#term-micropayment-channel
[not a specification]: /devdocs/reference#not-a-specification
[raw transaction format]: /devdocs/reference#raw-transaction-format
[REST]: /devdocs/reference#http-rest
[RPC]: /devdocs/reference#remote-procedure-calls-rpcs
[RPCs]: /devdocs/reference#remote-procedure-calls-rpcs
[section block chain]: /devdocs/guide#block-chain
[section block header]: /devdocs/reference#block-headers
[section block versions]: /devdocs/reference#block-versions
[section creating a bloom filter]: /devdocs/examples#creating-a-bloom-filter
[section compactSize unsigned integer]: /devdocs/reference#compactsize-unsigned-integers
[section detecting forks]: /devdocs/guide#detecting-forks
[section getblocktemplate]: /devdocs/guide#getblocktemplate-rpc
[section hash byte order]: /devdocs/reference#hash-byte-order
[section merkle trees]: /devdocs/reference#merkle-trees
[section merkleblock example]: /devdocs/examples#parsing-a-merkleblock
[section message header]: /devdocs/reference#message-headers
[section p2p reference]: /devdocs/reference#p2p-network
[section protocol versions]: /devdocs/reference#protocol-versions
[section rpc quick reference]: /devdocs/reference#rpc-quick-reference
[section serialized blocks]: /devdocs/reference#serialized-blocks
[section simple raw transaction]: /devdocs/examples#simple-raw-transaction
[section verifying payment]: /devdocs/guide#verifying-payment
[secure your wallet]: /en/secure-your-wallet
[signature script modification warning]: /devdocs/reference#signature_script_modification_warning
[v0.8 chain fork]: /en/alert/2013-03-11-chain-fork
[Verification subsection]: /devdocs/guide#verifying-payment
[X509Certificates]: /devdocs/examples#term-x509certificates

{% comment %}<!-- Official reference documents (BIPs should not use zero padding:
     BIP32 not BIP0032); alphabetical order -->{% endcomment %}
[BIP14]: https://github.com/bitcoin/bips/blob/master/bip-0014.mediawiki
[BIP16]: https://github.com/bitcoin/bips/blob/master/bip-0016.mediawiki
[BIP21]: https://github.com/bitcoin/bips/blob/master/bip-0021.mediawiki
[BIP22]: https://github.com/bitcoin/bips/blob/master/bip-0022.mediawiki
[BIP23]: https://github.com/bitcoin/bips/blob/master/bip-0023.mediawiki
[BIP30]: https://github.com/bitcoin/bips/blob/master/bip-0030.mediawiki
[BIP31]: https://github.com/bitcoin/bips/blob/master/bip-0031.mediawiki
[BIP32]: https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki
[BIP34]: https://github.com/bitcoin/bips/blob/master/bip-0034.mediawiki
[BIP35]: https://github.com/bitcoin/bips/blob/master/bip-0035.mediawiki
[BIP37]: https://github.com/bitcoin/bips/blob/master/bip-0037.mediawiki
[BIP39]: https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki
[BIP50]: https://github.com/bitcoin/bips/blob/master/bip-0050.mediawiki
[BIP61]: https://github.com/bitcoin/bips/blob/master/bip-0061.mediawiki
[BIP62]: https://github.com/bitcoin/bips/blob/master/bip-0062.mediawiki
[BIP66]: https://github.com/bitcoin/bips/blob/master/bip-0066.mediawiki
[BIP70]: https://github.com/bitcoin/bips/blob/master/bip-0070.mediawiki
[BIP71]: https://github.com/bitcoin/bips/blob/master/bip-0071.mediawiki
[BIP72]: https://github.com/bitcoin/bips/blob/master/bip-0072.mediawiki
[CVE-2012-2459]: https://en.bitcoin.it/wiki/CVEs#CVE-2012-2459
[RFC5737]: http://tools.ietf.org/html/rfc5737
[secp256k1]: http://www.secg.org/sec2-v2.pdf

{% comment %}<!-- Other external site links; alphabetical order -->{% endcomment %}
[#bitcoin]: https://webchat.freenode.net/?channels=bitcoin&uio=d4
[#bitcoin-dev]: https://webchat.freenode.net/?channels=bitcoin-dev&uio=d4
[#bitcoin-mining]: https://webchat.freenode.net/?channels=bitcoin-mining&uio=d4
[#bitcoin-wiki]: https://webchat.freenode.net/?channels=bitcoin-wiki&uio=d4
[0bin]: http://0bin.net/
[bcc automated testing]: https://github.com/bitcoin/bitcoin/blob/master/README.md#automated-testing
[bcc configuration]: https://en.bitcoin.it/wiki/Running_bitcoin
[bcc data directory]: https://en.bitcoin.it/wiki/Data_directory
[bcc issues]: https://github.com/bitcoin/bitcoin/issues
[bcc new issue]: https://github.com/bitcoin/bitcoin/issues/new
[bcc pulls]: https://github.com/bitcoin/bitcoin/pulls
[bcc tor]: https://en.bitcoin.it/wiki/Tor
[bcc tor hs]: https://en.bitcoin.it/wiki/Tor#Hidden_services
[BFGMiner]: https://github.com/luke-jr/bfgminer
[Bitcoin beginners]: http://www.reddit.com/r/bitcoinbeginners
[Bitcoin Core]: https://bitcoin.org/en/download
[Bitcoin Core 0.1.6]: https://github.com/bitcoin/bitcoin/commit/cc0b4c3b62367a2aebe5fc1f4d0ed4b97e9c2ac9
[Bitcoin Core 0.2.9]: https://github.com/bitcoin/bitcoin/commit/42605ce8bcc9bd01b86491c74fee14de77960868
[Bitcoin Core 0.3.11]: https://github.com/bitcoin/bitcoin/commit/343328c6b8db85e58a1feea85f0d10e62967fa19
[Bitcoin Core 0.3.15]: https://github.com/bitcoin/bitcoin/commit/c891967b6fcab2e8dc4ce0c787312b36c07efa4d
[Bitcoin Core 0.3.18]: https://github.com/bitcoin/bitcoin/commit/82201801336f64ee77851b9eaab9383ee4e442f0
[Bitcoin Core build unix]: https://github.com/bitcoin/bitcoin/blob/master/doc/build-unix.md
[Bitcoin Core docs directory]: https://github.com/bitcoin/bitcoin/tree/master/doc
[bitcoin core fee drop commit]: https://github.com/bitcoin/bitcoin/commit/6a4c196dd64da2fd33dc7ae77a8cdd3e4cf0eff1
[Bitcoin Core issue #2381]: https://github.com/bitcoin/bitcoin/issues/2381
[Bitcoin Core master]: https://github.com/bitcoin/bitcoin
[Bitcoin Core pull #4468]: https://github.com/bitcoin/bitcoin/pull/4468
[Bitcoin core transifex]: https://www.transifex.com/projects/p/bitcoin/
[Bitcoin reddit]: http://www.reddit.com/r/Bitcoin
[Bitcoin reddit new]: http://www.reddit.com/r/Bitcoin/new
[Bitcoin Seeder]: https://github.com/sipa/bitcoin-seeder
[Bitcoin stackexchange]: http://bitcoin.stackexchange.com
[Bitcoin stackexchange tag bitcoin-qt]: http://bitcoin.stackexchange.com/questions/tagged/bitcoin-qt
[bitcoin-documentation mailing list]: https://groups.google.com/forum/#!forum/bitcoin-documentation
[BitcoinJ]: http://bitcoinj.github.io
[BitcoinJ documentation about pending transaction safety]: https://bitcoinj.github.io/security-model#pending-transactions
[bitcoinj micropayment tutorial]: https://bitcoinj.github.io/working-with-micropayments
[block170]: https://www.biteasy.com/block/00000000d1145790a8694403d4063f323d499e655c83426834d4ce2f8dd4a2ee
[casascius address utility]: https://github.com/casascius/Bitcoin-Address-Utility
[core alert.cpp]: https://github.com/bitcoin/bitcoin/blob/master/src/alert.cpp
[core base58.h]: https://github.com/bitcoin/bitcoin/blob/master/src/base58.h
[core chainparams.cpp]: https://github.com/bitcoin/bitcoin/blob/master/src/chainparams.cpp
[core git]: https://github.com/bitcoin/bitcoin
[core paymentrequest.proto]: https://github.com/bitcoin/bitcoin/blob/master/src/qt/paymentrequest.proto
[core script.h]: https://github.com/bitcoin/bitcoin/blob/master/src/script/script.h
[creative commons attribution 3.0 license]: https://creativecommons.org/licenses/by/3.0/
[DER]: https://en.wikipedia.org/wiki/X.690#DER_encoding
[dig command]: https://en.wikipedia.org/wiki/Dig_%28Unix_command%29
[DNS A records]: http://tools.ietf.org/html/rfc1035#section-3.2.2
[DNS Seed Policy]: https://github.com/bitcoin/bitcoin/blob/master/doc/dnsseed-policy.md
[docs issue]: https://github.com/bitcoin-dot-org/bitcoin.org/issues
[ECDSA]: https://en.wikipedia.org/wiki/Elliptic_Curve_DSA
[edit bandwidth sharing guide]: https://github.com/bitcoin-dot-org/bitcoin.org/edit/master/en/full-node.md
[Electrum server]: https://github.com/spesmilo/electrum-server
[Eloipool]: https://github.com/luke-jr/eloipool
[errors in docs]: https://github.com/bitcoin-dot-org/bitcoin.org/issues?q=is%3Aissue+label%3A%22Dev+Docs%22
[fake satoshi transaction]: https://www.reddit.com/r/Bitcoin/comments/3fv42j/blockchaininfo_spoofed_transactions_problem_aug_4/
[forum tech support]: https://bitcointalk.org/index.php?board=4.0
[ghash betcoin double spend]: https://bitcointalk.org/index.php?topic=321630.msg3445371
[gitian sigs]: https://github.com/bitcoin/gitian.sigs
[high-speed block relay network]: https://www.mail-archive.com/bitcoin-development@lists.sourceforge.net/msg03189.html
[HMAC-SHA512]: https://en.wikipedia.org/wiki/HMAC
[HTTP basic authentication]: https://en.wikipedia.org/wiki/Basic_access_authentication
[HTTP longpoll]: https://en.wikipedia.org/wiki/Push_technology#Long_polling
[information theoretic security]: https://en.wikipedia.org/wiki/Information_theoretic_security
[inherit bitcoins]: http://bitcoin.stackexchange.com/q/38692/21052
[IP-to-IP payment protocol]: https://en.bitcoin.it/wiki/IP_Transactions
[IPv4-mapped IPv6 addresses]: http://en.wikipedia.org/wiki/IPv6#IPv4-mapped_IPv6_addresses
[irc channels]: https://en.bitcoin.it/wiki/IRC_channels
[JSON-RPC version 1.0]: http://json-rpc.org/wiki/specification
[JSON-RPC request batching]: http://www.jsonrpc.org/specification#batch
[july 2015 chain forks]: https://en.bitcoin.it/wiki/July_2015_chain_forks
[libblkmaker]: https://github.com/bitcoin/libblkmaker
[localhost]: https://en.wikipedia.org/wiki/Localhost
[lying consistently is hard]: https://groups.google.com/forum/#!msg/bitcoinj/Ys13qkTwcNg/9qxnhwnkeoIJ
[makeseeds script]: https://github.com/bitcoin/bitcoin/tree/master/contrib/seeds
[mozilla's bug reporting documentation]: https://developer.mozilla.org/en-US/docs/Mozilla/QA/Bug_writing_guidelines#Writing_precise_steps_to_reproduce
[murmur3]: https://en.wikipedia.org/wiki/MurmurHash
[man-in-the-middle]: https://en.wikipedia.org/wiki/Man-in-the-middle_attack
[MIME]: https://en.wikipedia.org/wiki/Internet_media_type
[MIT license]: http://opensource.org/licenses/MIT
[mozrootstore]: https://www.mozilla.org/en-US/about/governance/policies/security-group/certs/
[native irc client]: https://en.wikipedia.org/wiki/List_of_IRC_clients
[netcat]: https://en.wikipedia.org/wiki/Netcat
[nop op codes]: https://en.bitcoin.it/wiki/Script#Reserved_words
[offline transactions]: http://bitcoin.stackexchange.com/a/34122/21052
[open a pull request]: https://github.com/bitcoin-dot-org/bitcoin.org#working-with-github
[open an issue]: https://github.com/bitcoin-dot-org/bitcoin.org/issues/new
[Payment Request Generator]: http://bitcoincore.org/~gavin/createpaymentrequest.php
[Piotr Piasecki's testnet faucet]: https://tpfaucet.appspot.com/
[prime symbol]: https://en.wikipedia.org/wiki/Prime_%28symbol%29
[protobuf]: https://developers.google.com/protocol-buffers/
[python-bitcoinlib]: https://github.com/petertodd/python-bitcoinlib
[python-blkmaker]: https://gitorious.org/bitcoin/python-blkmaker
[setup tor]: https://www.torproject.org/
[SHA256]: https://en.wikipedia.org/wiki/SHA-2
[Stratum mining protocol]: http://mining.bitcoin.cz/stratum-mining
[study of SPV privacy over tor]: http://arxiv.org/abs/1410.6079
[Tor]: https://en.wikipedia.org/wiki/Tor_%28anonymity_network%29
[transifex]: https://www.transifex.com/projects/p/bitcoinorg/
[unix epoch time]: https://en.wikipedia.org/wiki/Unix_time
[URI encoded]: https://tools.ietf.org/html/rfc3986
[wiki bitcoin core compatible devices arm]: https://en.bitcoin.it/wiki/Bitcoin_Core_compatible_devices#ARM-based_Chipsets
[wiki bitcoin core documentation]: https://en.bitcoin.it/wiki/Category:Bitcoin_Core_documentation
[wiki create account]: https://en.bitcoin.it/w/index.php?title=Special:UserLogin&type=signup
[wiki enable editing]: https://en.bitcoin.it/wiki/Bitcoin_Wiki:Editing_privileges
[wiki getblocktemplate]: https://en.bitcoin.it/wiki/Getblocktemplate
[wiki proper money handling]: https://en.bitcoin.it/wiki/Proper_Money_Handling_%28JSON-RPC%29
[wiki template bitcoin core documentation]: https://en.bitcoin.it/wiki/Template:Bitcoin_Core_documentation
[wiki script]: https://en.bitcoin.it/wiki/Script
[x509]: https://en.wikipedia.org/wiki/X.509

{% comment %}<!-- Direct links to code; link to a specific commit to prevent code
changes from moving the referenced object, but also update links
periodically to point to recent code. Last update: 2014-11-12 --> {% endcomment %}
[core bloom.cpp hash]: https://github.com/bitcoin/bitcoin/blob/cbf28c6619fe348a258dfd7d08bdbd2392d07511/src/bloom.cpp#L46
[MAX_SIZE]: https://github.com/bitcoin/bitcoin/blob/60abd463ac2eaa8bc1d616d8c07880dc53d97211/src/serialize.h#L23
[rpcprotocol.h]: https://github.com/bitcoin/bitcoin/blob/f914f1a746d7f91951c1da262a4a749dd3ebfa71/src/rpcprotocol.h
