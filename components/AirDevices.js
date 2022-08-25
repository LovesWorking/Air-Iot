import { useState, useEffect } from 'react';
import Column from './Column'
import addDevice from '../lib/addDevice';
import deviceToComponent from './DeviceToComponent'// Converting device info to components
import getLocalDevices from '../lib/getLocalDevices';

export default function AirDevices() {
  const [devices, setDevices] = useState([]); // Array of components
  const [airDevices, setAirDevices] = useState([]);// Array of devices

  useEffect(() => {
    getLocalDevices('air', airDevices, setAirDevices)
    deviceToComponent('air', airDevices, setAirDevices, setDevices)
  }, [airDevices])


  return (<>
    <Column
      addDevice={() => { addDevice('air', setAirDevices) }}
      devicesArr={devices}
      deviceType={'Air Devices'} />
  </>);
}
