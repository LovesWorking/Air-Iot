import { useState, useEffect, useRef } from 'react';
export default function Events() {
  const [triggers, setTriggers] = useState([]);// Array of events
  const [events, setEvents] = useState([]);// Array of components
  useEffect(() => {
    getLocalDevices();
  }, [])
  const getLocalDevices = () => {// Grabs array of trigger events from local storeage
    const storage = JSON.parse(localStorage.getItem('triggerDeviceList'));
    storage && (triggers.length != storage.length) && setTriggers(storage)
  }
  function TriggersToComponents() {
    return (<>
      <div className='flex flex-wrap'>
        {triggers.map((el, i) => {
          return (<div key={i + 'Event-Container'}
            className='bg-white w-auto p-1 m-1 h-20 shadow-lg rounded-xl hover:bg-sky-500 cursor-pointer'>
            <div >Awair</div>
            <div className='font-bold' key={i}> {el.air.Name}</div>
          </div>)
        })}
      </div>
    </>)
  }
  return (<>
    <TriggersToComponents />
  </>)
}