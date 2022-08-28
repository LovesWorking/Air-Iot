import { useState, useEffect } from 'react';
import Column from '../components/Column'
import deviceToComponent from './DeviceToComponent';
export default function LocalDevices() {
  const [devices, setDevices] = useState([]); // Array of components
  const [airDevices, setAirDevices] = useState([]);// Array of devices
  useEffect(() => {
    const getDevices = async () => {
      const res = await fetch('/api/localDevices')
      const data = await res.json()
      setAirDevices(data.localDevices)
      deviceToComponent(null, data.localDevices, setAirDevices, setDevices)
    }
    getDevices();
  }, [])

  return (<>
    <Column
      devicesArr={devices}
      deviceType={'Devices'}
    />
  </>);
}
