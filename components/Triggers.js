import { useState, useEffect, useRef } from 'react';
import Column from './Column';
import addDevice from '../lib/addDevice';
export default function Triggers() {
  const [devices, setDevices] = useState([]);// Array of components
  const [triggers, setTriggers] = useState([]);// Array of devices
  const [showTriggers, setShowTriggers] = useState(false);
  // Triggeradder states
  useEffect(() => {
    getLocalDevices();
    plugComponents();
  }, [triggers])
  const getLocalDevices = () => {// Grabs array of devices from local storeage
    const storage = JSON.parse(localStorage.getItem('triggerDeviceList'));
    storage && (triggers.length != storage.length) && setTriggers(storage)
  }
  const deleteLocalDevice = (index) => {// Filters out index we want removed
    console.log('delete ', index);
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
      output.push(<div key={i} className={'selection-primary'}>
        {' ' + triggers[i].plug.Name + ' '}
        will turn  {' ' + triggers[i].onOrOF + ' '}
        when
        {' ' + triggers[i].air.Name + ' '}
        {' ' + triggers[i].tempOrHumid + ' '}
        goes
        {' ' + triggers[i].underOver + ' '}
        {' ' + triggers[i].limit + ' '}
        <div id={i} onClick={(e) => { deleteLocalDevice(e.target.id) }}>❌</div>
      </div >)
    }
    setDevices(output)
  }
  function addTrigger() {
    addDevice('trigger', setTriggers);
  }

  return (<>
    <Column
      showColumn={showTriggers}
      setShowColumn={setShowTriggers}
      getDevice={plugComponents}
      devicesArr={devices}
      deviceType={'Triggers'}
      showTriggerAdder={true}
      setTriggers={setTriggers}
    />
  </>);
}


