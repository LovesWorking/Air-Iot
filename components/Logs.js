import { useState, useEffect } from 'react';
import Column from './Column'
import addDevice from '../lib/addDevice';
import deviceToComponent from './DeviceToComponent'// Converting device info to components
import getLocalDevices from '../lib/getLocalDevices';

export default function AirDevices() {
  const [logComponent, setLogComponents] = useState([]); // Array of components
  const [logs, setLogs] = useState([]);// Array of logComponent

  useEffect(() => {
    getLocalDevices('logs', logs, setLogs)
    deviceToComponent('logs', logs, setLogs, setLogComponents)
  }, [logs])


  return (<>
    <Column
      devicesArr={logComponent}
      deviceType={'logs'} />
  </>);
}
