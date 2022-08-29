const { Client } = require('tplink-smarthome-api');
const client = new Client();
const devices = [];
let ping = require('ping');
// Calls discovery which is async and will look for dvices on our local network
client.startDiscovery()
  // Client on is a call back which is called for every device found
  .on('plug-new', (plug) => {
    const { alias, host, mac, lastState } = plug;
    devices.push({//  Push found plugs into devices array
      name: alias,
      ip: host,
      mac: mac,
      state: lastState.inUse,
    });
  })
async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 100 } = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const response = await fetch(resource, {
    ...options,
    signal: controller.signal
  })
  clearTimeout(id);
  return response;
}
export default async function localAir(req, res) {
  const hosts = [];
  const output = [];
  for (let i = 0; i < 255; i++) {// Array of ip ranges
    hosts.push(`192.168.0.${i}`)
  }
  async function findAwair(arr) {// Find what devices are Awair Devices
    const validDevices = [];
    for (let i = 0; i < arr.length; i++) {
      const result = await fetchWithTimeout(`http://${arr[i].ip}/air-data/latest`).catch(err => {
        return { status: 404 }// Return status 404 on fetch error
      })
      if (result.status == 200) {
        try {
          const response = await result.json();
          validDevices.push({ ip: arr[i].ip, name: arr[i].name, state: true })
        } catch {
          // Invalid Awair Device 
        }
      }
    }
    return (validDevices);
  }
  const addressList = [];
  hosts.forEach(function (host) {// Scan range of ip devices to see which ones responds
    ping.sys.probe(host, function (isAlive) {
      addressList.push({ name: 'Awair', ip: host })
    });
  });

  setTimeout(() => { // Delay until we send a response as ping.sys.probe doesn't seem to work with await without a huge delay
    findAwair(addressList)
      .then(result => {
        return res.status(200).json({ localDevices: [...devices, ...result] })
      })
  }, 1000);

}