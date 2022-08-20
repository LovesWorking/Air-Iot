import { useRef, useState, useEffect } from 'react';
import AirDevices from '../components/AirDevices'
export default function Home() {
  const [airDevices, setairDevices] = useState([]);

  function addAwair() {
    const deviceName = prompt('please enter the devices name', '')
    const deviceIP = prompt(`please enter ${deviceName} IP address`, '')
    if (deviceName && deviceIP) {// Device or ip is valid
      // Check if array of devices exist already so we can
      // Push on more devices onto the current list
      const deviceArray = JSON.parse(localStorage.getItem('airDeviceList')) || [];// Assigns an empty aray if NULL
      const myDeviceObject = {
        name: deviceName,
        ip: deviceIP,
      };
      deviceArray.push(myDeviceObject);
      localStorage.setItem('airDeviceList', JSON.stringify(deviceArray))
    } else {// invalid name / ip entered
      alert('please enter a valid name and IP')
    }
  }
  const getLocalDevices = () => {
    const storage = JSON.parse(localStorage.getItem('airDeviceList'));
    storage && setairDevices(storage)
  }
  useEffect(() => {// Grab device list from local storage on load
    getLocalDevices();
  }, [])
  // 192.168.0.144
  // plUG ICOn fa-plug
  // fa-minus and fa-plus open/close
  return (<div className='grid place-content-center'>
    <br />
    <AirDevices addAwair={addAwair} arr={airDevices} getLocalDevices={getLocalDevices} />
    <button onClick={() => { localStorage.setItem('airDeviceList', JSON.stringify([])) }}>Delete All Local storage Devices</button>
  </div>
  )
}
