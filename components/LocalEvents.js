import { useState, useEffect, useRef } from 'react';
import Column from './Column';
import addDevice from '../lib/addDevice';
import getLocalDevices from '../lib/getLocalDevices';
import deleteLocalDevice from '../lib/deleteDevice';
import { RiDeleteBin6Line } from 'react-icons/ri';

export default function LocalEvents() {
  const [devices, setDevices] = useState([]);// Array of components
  const [events, setEvents] = useState([]);// Array of devices
  useEffect(() => {
    getLocalDevices('event', events, setEvents)
    eventComponent();
  }, [events])

  const eventComponent = () => {
    const output = [];
    for (let i = 0; i < events.length; i++) {
      output.push(<div key={i + 'Event-Form'} className={'selection-primary'}>
        {' ' + events[i].plug.Name + ' '}
        will turn  {' ' + events[i].onOrOF + ' '}
        when
        {' ' + events[i].air.Name + ' '}
        {' ' + events[i].tempOrHumid + ' '}
        goes
        {' ' + events[i].underOver + ' '}
        {' ' + events[i].limit + ' '}
        <div className='text-rose-700'>
          <RiDeleteBin6Line size='20' onClick={() => { deleteLocalDevice('event', i, setEvents) }} />
        </div>
      </div >)
    }
    setDevices(output)
  }

  return (<>
    <Column
      devicesArr={devices}
      deviceType={'Events'}
      showEventAdder={true}
      setEvents={setEvents}
    />
  </>);
}


