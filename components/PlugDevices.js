import { useState, useEffect } from 'react';
import Column from './Column';
import addDevice from '../lib/addDevice';
import { RiDeleteBin6Line } from 'react-icons/ri';
import deviceToComponent from './DeviceToComponent'// Converting device info to components
import getLocalDevices from '../lib/getLocalDevices';
export default function PlugDevices() {
  const [devices, setDevices] = useState([]);// Array of components
  const [plugDevices, setPlugDevices] = useState([]);// Array of devices

  useEffect(() => {
    getLocalDevices('plug', plugDevices, setPlugDevices)
    deviceToComponent('plug', plugDevices, setPlugDevices, setDevices)
  }, [plugDevices])

  return (<>
    <Column
      addDevice={() => { addDevice('plug', setPlugDevices) }}
      devicesArr={devices}
      deviceType={'Plug Devices'}
    />
  </>);
}