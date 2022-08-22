const { Client } = require('tplink-smarthome-api');
const client = new Client();
const devices = [];
export default async function getIotDevices(req, res) {
  if (req.method === 'GET') {
    // Calls discovery which is async and will look for dvices on our local network
    client.startDiscovery()
    // Client on is a call back which is called for every device found
    client.on('plug-new', (plug) => {
      const { alias, host, mac, lastState } = plug;
      devices.push({//  Push found plugs into devices array
        name: alias,
        ip: host,
        mac: mac,
        state: lastState.inUse,
      });
    })
    setTimeout(() => {
      console.log(devices);
      return res.status(200).send(JSON.stringify(devices))
    }, 1000);
  } else {
    return res.status(500).send('Request method not supported')
  }
}