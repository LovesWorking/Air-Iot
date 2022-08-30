import { useState, useEffect, useRef } from 'react';
import getDeviceInfo from '../lib/deviceInfo';
import { FaTemperatureLow } from 'react-icons/fa';
import { GiDroplets } from 'react-icons/gi';
import { TbPlugConnectedX } from 'react-icons/tb';
import { MdOfflineBolt } from 'react-icons/md';
import EventChecker from './EventChecker';
export default function Events() {
  const [events, setEvents] = useState([]);// Array of events
  const [deviceInfo, setDeviceInfo] = useState([])//Array of air quality results from air device
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    getLocalDevices();
    const getData = async () => {
      const data = await getDeviceInfo(events)
      setDeviceInfo(data);
    }
    getData()
  }, [events, refresh])

  const getLocalDevices = () => {// Grabs array of events events from local storeage
    const storage = JSON.parse(localStorage.getItem('eventDeviceList'));
    storage && (events.length != storage.length) && setEvents(storage)
  }
  function EventsToComponents() {
    return (<>
      <div className='m-5 pb-20 h-full overflow-hidden
       overflow-x-auto    flex flex-wrap md:ml-20'>
        {events.map((el, i) => {
          return (<div key={i + 'Event-Container'}
            className=' space-x-1 bg-white w-36 h-fit
             p-1 m-1 shadow-lg rounded-xl hover:border-2
              border-sky-500 hover:-translate-y-3 
              ease-in-out duration-300 cursor-pointer'>
            <div className='p-1 m-1 font-bold  
            text-sizes text-center' > {el.air.Name}</div>
            <div className='flex flex-col space-x-2
             space-y-4 '>
              <img className='w-3/4' src='https://assets.website-files.com/606ca67e54e3f68fa1be1f6b/606ca6e82cd654086fc1581c_awair_logo.svg'></img>
              <div className='grid grid-cols-2 pb-7 '>
                {deviceInfo[i]?.air ?
                  <>
                    <div className='p-1 m-1 font-semibold w-1/3   text-sizes' >
                      <FaTemperatureLow size='20' color='#FF1493' />
                      {Math.ceil(deviceInfo[i].air.temp * 9 / 5 + 32)}°F </div>
                    <div className='p-1 m-1 fill-brand/60 font-semibold  w-1/3  text-sizes '>
                      <GiDroplets size='20' color='#00BFFF' />
                      {Math.ceil(deviceInfo[i].air.humid)}%</div>
                  </>
                  :
                  <div className='ml-10'>
                    <TbPlugConnectedX size='35' color='#FF1493' />
                  </div>

                }
              </div>
            </div>
            <div className='text-center m-1 flex flex-col items-center'>
              {el.plug.Name}
              {deviceInfo[i]?.plug?.status == -1 ?
                <TbPlugConnectedX size='35' color='#00BFFF' />
                :
                deviceInfo[i]?.plug?.status == 'on'
                  ?
                  <div className='flex'>
                    <MdOfflineBolt size='25' color='#00BFFF' />
                    <p>{Math.ceil(deviceInfo[i].plug.power)}w</p>
                  </div>
                  :
                  <div className='flex'>
                    <MdOfflineBolt size='25' color='gray' />
                    <p>0w</p>
                  </div>}
            </div>
            <p className='text-center m-2'>
              will turn
              {' ' + el.onOrOF + ' '}
              when

              {' ' + el.tempOrHumid + ' '}
              goes
              {' ' + el.underOver + ' '}
              {' ' + el.limit + ' '}
            </p>

          </div>)
        })}
      </div>
    </>)
  }
  return (<>
    <EventChecker deviceInfo={deviceInfo} events={events} setRefresh={setRefresh} />
    <EventsToComponents />
  </>)
}