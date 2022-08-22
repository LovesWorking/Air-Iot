import { useState, useEffect } from 'react';
import Column from '../components/Column'
import addDevice from '../lib/addDevice';
export default function AirDevices() {
  const [devices, setDevices] = useState([]); // Array of components
  const [airDevices, setAirDevices] = useState([]);// Array of devices
  const [showAir, setShowAir] = useState(false);
  useEffect(() => {
    getLocalDevices();
    airComponents();
  }, [airDevices])
  const getLocalDevices = () => {// Grabs array of devices from local storeage
    const storage = JSON.parse(localStorage.getItem('airDeviceList'));
    storage && (airDevices.length != storage.length) && setAirDevices(storage)
  }
  const deleteLocalDevice = (index) => {// Filters out index we want removed
    const storage = JSON.parse(localStorage.getItem('airDeviceList'));
    const newStoreage = storage.filter((el, i) => {
      return i != index
    });
    storage && localStorage.setItem('airDeviceList', JSON.stringify(newStoreage))
    setAirDevices(newStoreage);
  }
  const airComponents = () => {
    const output = [];
    for (let i = 0; i < airDevices.length; i++) {
      output.push(<div key={i} className='m-0.5   bg-white overflow-hidden flex items-center gap-4 p-4   hover:bg-emerald-300 cursor-pointer '>
        <p className='font-medium' >  {airDevices[i]?.name}</p>
        <div className='font-medium'> {airDevices[i]?.ip} </div>
        <div id={i} onClick={(e) => { deleteLocalDevice(e.target.id) }}>❌</div>
      </div >)
    }
    setDevices(output)
  }

  return (<>
    <Column
      showColumn={showAir}
      setShowColumn={setShowAir}
      addDevice={() => { addDevice('air', setAirDevices) }}
      getDevice={airComponents}
      devicesArr={devices}
      deviceType={'Air Devices'} />
  </>);
}
