const yaml = require('js-yaml');
const fs   = require('fs');
const {RelayPool} = require('nostr')
const {Relay} = require('nostr')

try {

const lnprivate = Relay("wss://nostr.lnprivate.network")
const relays = yaml.load(fs.readFileSync('./relays.yaml', 'utf8'));
const pool = RelayPool(relays.relays)

pool.on('open', relay => {
	relay.subscribe("subid", {limit: 2, kinds:[1] })
});

pool.on('eose', relay => {
	relay.close()
});

pool.on('event', (relay, sub_id, ev) => {
	console.log(ev)
	lnprivate.send(["EVENT", ev]);

});
} catch (e) {
  console.log(e);
}


