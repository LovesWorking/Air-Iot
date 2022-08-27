import { useState, useEffect } from 'react';
import Column from '../components/Column'
import deviceToComponent from './DeviceToComponent';
export default function LocalDevices() {
  const [devices, setDevices] = useState([]); // Array of components
  const [airDevices, setAirDevices] = useState([]);// Array of devices
  useEffect(() => {
    fetch('/api/localDevices')
      .then(res => res.json())
      .then(results => {
        (airDevices.length !== results.length) && setAirDevices(results.localDevices)
      })
    deviceToComponent(null, airDevices, setAirDevices, setDevices)
  }, [airDevices])

  return (<>
    <Column
      devicesArr={devices}
      deviceType={'Local Plugs'}
    />
  </>);
}
