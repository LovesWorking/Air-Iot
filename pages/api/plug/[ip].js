const { Client } = require('tplink-smarthome-api');
const client = new Client();



export default function getPlugInfo(req, res) {
  let data = -1;
  client.getDevice({ host: req.query.ip }).then((device) => {
    device.getSysInfo().then((res => {
      data = res.relay_state
    })
    );
  });

  setTimeout(() => {// Timeout to prevent hold on a HOST who doesn't respond
    return res.status(200).json({ status: data })
  }, 450);
}