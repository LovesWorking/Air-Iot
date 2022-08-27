import { useState, useEffect } from 'react';
import Column from '../components/Column'
import deviceToComponent from '../components/DeviceToComponent';
export default function LocalAir() {
  const [devices, setDevices] = useState([]); // Array of components
  const [airDevices, setAirDevices] = useState([]);// Array of local devices
  useEffect(() => {
    const getLocalDevices = async () => {
      const data = await fetch('/api/localAir')
      const { localDevices } = await data.json();
      setAirDevices(localDevices)
      deviceToComponent('air', localDevices, setAirDevices, setDevices)
    }
    getLocalDevices();
  }, [])

  return (<>
    <Column
      devicesArr={devices}
      deviceType={'Air Devices'}
    />
  </>);
}
