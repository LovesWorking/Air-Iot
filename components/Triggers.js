import { useState, useEffect } from 'react';
import Column from './Column';
import addDevice from '../lib/addDevice';
export default function Triggers() {
  const [devices, setDevices] = useState([]);// Array of components
  const [triggers, setTriggers] = useState([]);// Array of devices
  const [showTriggers, setShowTriggers] = useState(false);
  useEffect(() => {
    getLocalDevices();
    plugComponents();
  }, [triggers])
  const getLocalDevices = () => {// Grabs array of devices from local storeage
    const storage = JSON.parse(localStorage.getItem('triggerDeviceList'));
    storage && (triggers.length != storage.length) && setTriggers(storage)
  }
  const deleteLocalDevice = (index) => {// Filters out index we want removed
    const storage = JSON.parse(localStorage.getItem('triggerDeviceList'));
    const newStoreage = storage.filter((el, i) => {
      return i != index
    });
    storage && localStorage.setItem('triggerDeviceList', JSON.stringify(newStoreage))
    setTriggers(newStoreage);
  }
  const plugComponents = () => {
    const output = [];
    for (let i = 0; i < triggers.length; i++) {
      output.push(<div key={i} className='m-0.5   bg-white overflow-hidden flex items-center gap-4 p-4   hover:bg-emerald-300 cursor-pointer '>
        <p className='font-medium' >  {i} {triggers[i].name}</p>
        <div className='font-medium'> {triggers[i].ip} </div>
        <div id={i} onClick={(e) => { deleteLocalDevice(e.target.id) }}>❌</div>
      </div >)
    }
    setDevices(output)
  }
  function addTrigger(triggers) {
    const triggerObject = {
      airName: triggers.airName,
      airIP: triggers.airIP,
      temp: {
        over: triggers.temp,
        under: triggers.temp,
      },
      humid: {
        over: triggers.humid,
        under: triggers.humid,
      },
      plug: {
        plugName: triggers.plugName,
        plugIP: triggers.plugIP,
      },
    };
    addDevice('trigger', setTriggers, triggerObject);
  }
  return (<>
    <Column
      showColumn={showTriggers}
      setShowColumn={setShowTriggers}
      addDevice={addTrigger}
      getDevice={plugComponents}
      devicesArr={devices}
      deviceType={'Triggers'} />
  </>);
}


