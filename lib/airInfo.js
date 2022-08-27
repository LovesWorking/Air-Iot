const getAir = async (devices, setDevices) => {
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
    console.log('ip = ', devices[i].air.Ip);
    const url = `http://${devices[i].air.Ip}/air-data/latest`
    await fetchWithTimeout(url)
      .then(res => res.json())
      .then(results => {
        output.push(results)
      })
      .catch(err => {
        output.push('error')
      })
  }
  console.log(output);
  setDevices(output);
}
export default getAir;