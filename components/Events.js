import { useState, useEffect, useRef } from 'react';
import getAir from '../lib/airInfo';
import { FaTemperatureLow } from 'react-icons/fa';
import { GiDroplets } from 'react-icons/gi';

export default function Events() {
  const [triggers, setTriggers] = useState([]);// Array of events
  const [events, setEvents] = useState([]);// Array of components
  const [airQuality, setAirQuality] = useState([])
  useEffect(() => {
    getLocalDevices();
    getAir(triggers, setAirQuality)
  }, [triggers])
  const getLocalDevices = () => {// Grabs array of trigger events from local storeage
    const storage = JSON.parse(localStorage.getItem('triggerDeviceList'));
    storage && (triggers.length != storage.length) && setTriggers(storage)
  }
  //192.168.0.144
  function TriggersToComponents() {
    return (<>
      <div className='ml-20 flex flex-wrap'>
        {triggers.map((el, i) => {
          return (<div key={i + 'Event-Container'}
            className='space-x-1 bg-white w-1/4 h-1/4 p-1 m-1 shadow-lg rounded-xl hover:bg-sky-500 cursor-pointer'>
            <div className='font-bold' key={i}> {el.air.Name}</div>
            <div className='flex flex-col space-x-5 space-y-4'>
              <img className='w-3/4' src='https://assets.website-files.com/606ca67e54e3f68fa1be1f6b/606ca6e82cd654086fc1581c_awair_logo.svg'></img>
              <div className='flex  space-x-10'>
                <div className='font-bold' key={i + 'ip'}>
                  <FaTemperatureLow size='30' color='red' />
                  {Math.ceil(airQuality[i]?.temp * 9 / 5 + 32)} °F</div>
                <div className='font-bold' key={i + 'ip'}>
                  <GiDroplets size='30' color='blue' />
                  {Math.ceil(airQuality[i]?.humid)}%</div>
              </div>
            </div>
          </div>)
        })}
      </div>
    </>)
  }
  return (<>
    <TriggersToComponents />
  </>)
}