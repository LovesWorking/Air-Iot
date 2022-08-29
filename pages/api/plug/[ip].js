const { Client } = require('tplink-smarthome-api');
const client = new Client();
export default function getPlugInfo(req, res) {
  if (req.method == 'GET') {// Send device status back
    let data = -1;
    client.getDevice({ host: req.query.ip }).then((device) => {
      device.getSysInfo().then((res => {
        data = (res.relay_state == 1 ? 'on' : 'off')
      })
      );
    });
    return setTimeout(() => {// Timeout to prevent hold on a HOST who doesn't respond
      return res.status(200).json({ status: data })
    }, 500);
  } else if (req.method == 'POST') {
    client.getDevice({ host: req.body.ip }).then((device) => {
      if (device.deviceType === 'plug') {
        device.setPowerState(req.body.state == 'on' ? true : false);
        return res.status(200).json({ msg: `Turned ${device.alias} ${req.body.state}` })
      } else {
        return res.status(404).json({ msg: 'Not a plug device' })
      }
    });

    return setTimeout(() => {// Timeout to prevent hold on a HOST who doesn't respond
      return res.status(500).json({ msg: 'Plug took too long to respond make sure plug is on the same network or update timeout times in api/plug/[ip]' })
    }, 500);
  } else {
    return res.status(500).json({ msg: `${req.method} is not a supported method` })
  }
}