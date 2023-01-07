const yaml = require('js-yaml');
const fs   = require('fs');
const {RelayPool} = require('nostr')
const {Relay} = require('nostr')

// const jb55 = "32e1827635450ebb3c5a7d12c1f8e7b2b514439ac10a67eef3d9fd9c5c68e245"
// const damus = "wss://relay.damus.io"
try {

const lnprivate = Relay("wss://nostr.lnprivate.network")
console.log(lnprivate)
  const relays = yaml.load(fs.readFileSync('./relays.yaml', 'utf8'));
  console.log(relays.relays);
const pool = RelayPool(relays.relays)

pool.on('open', relay => {
	relay.subscribe("subid", {limit: 2, kinds:[1] })
});

pool.on('eose', relay => {
	relay.close()
});

pool.on('event', (relay, sub_id, ev) => {
	lnprivate.send(["EVENT", ev]);

});
} catch (e) {
  console.log(e);
}


const testEvent = {
  id: '51141ab72db378c8c0f5cdf84ea2319af9ad294faa410edd55ca4606012637a7',
  pubkey: '50d94fc2d8580c682b071a542f8b1e31a200b0508bab95a33bef0855df281d63',
  created_at: 1667090312,
  kind: 1,
  tags: [],
  content: 'Cashu with Tor 😍',
  sig: 'f7877b0bc6a93ef5e0d51fae2184963c17a3d7f374259aeb315443aff1b5c0ca37e4a20eae1fdd5bc5584f2b8f9bea269fa68059ae6808e31c6f7212cec51e83'
}

