import { useState, useEffect } from 'react';
import Column from './Column';
import addDevice from '../lib/addDevice';
export default function PlugDevices() {
  const [devices, setDevices] = useState([]);// Array of components
  const [plugDevices, setPlugDevices] = useState([]);// Array of devices

  useEffect(() => {
    getLocalDevices();
    plugComponents();
  }, [plugDevices])
  const getLocalDevices = () => {// Grabs array of devices from local storeage
    const storage = JSON.parse(localStorage.getItem('plugDeviceList'));
    storage && (plugDevices.length != storage.length) && setPlugDevices(storage)
  }
  const deleteLocalDevice = (index) => {// Filters out index we want removed
    const storage = JSON.parse(localStorage.getItem('plugDeviceList'));
    const newStoreage = storage.filter((el, i) => {
      return i != index
    });
    storage && localStorage.setItem('plugDeviceList', JSON.stringify(newStoreage))
    setPlugDevices(newStoreage);
  }
  const plugComponents = () => {
    const output = [];
    for (let i = 0; i < plugDevices.length; i++) {
      output.push(<div key={i} className={'selection-primary'}>
        <p className='font-medium' >  {plugDevices[i].name}</p>
        <div className='font-medium'> {plugDevices[i].ip} </div>
        <div id={i} onClick={(e) => { deleteLocalDevice(e.target.id) }}>❌</div>
      </div >)
    }
    setDevices(output)
  }

  return (<>
    <Column
      addDevice={() => { addDevice('plug', setPlugDevices) }}
      devicesArr={devices}
      deviceType={'Plug Devices'}
    />
  </>);
}