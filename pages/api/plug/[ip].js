const { Client } = require('tplink-smarthome-api');
const client = new Client();
export default function getPlugInfo(req, res) {
  console.log('method', req.method);
  if (req.method == 'GET') {// Send device status back
    let data = -1;
    client.getDevice({ host: req.query.ip }).then((device) => {
      device.getSysInfo().then((res => {
        data = res.relay_state
      })
      );
    });
    return setTimeout(() => {// Timeout to prevent hold on a HOST who doesn't respond
      return res.status(200).json({ status: data })
    }, 500);
  }
  if (req.method == 'POST') {
    console.log('body', req.body);
    return res.status(200).json({ msg: 'post' })
  }
  return res.status(500).json({ msg: 'Not a supported method' })


}