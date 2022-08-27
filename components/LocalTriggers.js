import { useState, useEffect, useRef } from 'react';
import Column from './Column';
import addDevice from '../lib/addDevice';
import getLocalDevices from '../lib/getLocalDevices';
import deleteLocalDevice from '../lib/deleteDevice';
import { RiDeleteBin6Line } from 'react-icons/ri';

export default function LocalTriggers() {
  const [devices, setDevices] = useState([]);// Array of components
  const [triggers, setTriggers] = useState([]);// Array of devices
  useEffect(() => {
    getLocalDevices('trigger', triggers, setTriggers)
    plugComponents();
  }, [triggers])

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
        <div className='text-rose-700'>
          <RiDeleteBin6Line size='20' onClick={() => { deleteLocalDevice('trigger', i, setTriggers) }} />
        </div>
      </div >)
    }
    setDevices(output)
  }
  function addTrigger() {
    addDevice('trigger', setTriggers);
  }

  return (<>
    <Column
      devicesArr={devices}
      deviceType={'Triggers'}
      showTriggerAdder={true}
      setTriggers={setTriggers}
    />
  </>);
}


