const deviceInfo = async (devices, setDevices) => {
  const output = [];
  async function fetchWithTimeout(resource, options = {}) {
    const { timeout = 1000 } = options;
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(id);
    return response;
  }
  for (let i = 0; i < devices.length; i++) {
    const deviceObj = {};
    const airUrl = `http://${devices[i].air.Ip}/air-data/latest`
    await fetchWithTimeout(airUrl)
      .then(res => res.json())
      .then(results => {
        deviceObj['air'] = results
      })
      .catch(err => {
        deviceObj['air'] = null;
      })
    const plugUrl = `/api/plug/${devices[i].plug.Ip}`
    await fetchWithTimeout(plugUrl)
      .then(res => res.json())
      .then(data => {
        deviceObj['plug'] = data
      })
      .catch(err => {
        deviceObj['plug'] = null
      })
    output.push(deviceObj)
  }
  return (output);
}
export default deviceInfo;