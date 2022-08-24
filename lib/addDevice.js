export default function addDevice(deviceType, setArr, payload = null) {
  const deviceArray = JSON.parse(localStorage.getItem(`${deviceType}DeviceList`)) || [];// Assigns an empty aray if NULL
  if (payload) {// If payload push payload else push for plug/air devices

  } else {
    const deviceName = prompt('please enter the device name', '')
    const deviceIP = deviceName && prompt(`please enter ${deviceName} IP address`, '')
    if (deviceName && deviceIP) {
      payload = {
        name: deviceName,
        ip: deviceIP,
      };
    } else {
      return alert('please enter a valid name and IP')
    }
  }
  deviceArray.push(payload);
  localStorage.setItem(`${deviceType}DeviceList`, JSON.stringify(deviceArray))
  setArr && setArr(deviceArray);
}