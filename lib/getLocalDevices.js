export default function getLocalDevices(type, devices, setDevices) {// Grabs array of devices from local storeage
  const storage = JSON.parse(localStorage.getItem(`${type}DeviceList`));
  storage && (devices.length != storage.length) && setDevices(storage)
}