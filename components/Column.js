import EventForm from '../components/EventForm'
import { useState } from 'react'
import { HiOutlineRefresh } from 'react-icons/hi';
import { MdOutlineAddBox } from 'react-icons/md';
export default function Column({ addDevice, devicesArr, deviceType, showEventAdder, setEvents }) {
  return (<>
    <div className='select-none fixed left-20 right-20 font-semibold text-center' >
      {addDevice && <button onClick={addDevice}
        className='select-none m-1 cursor-pointer'> {< MdOutlineAddBox size='18' />}</button>}
      {devicesArr.length}  {deviceType} Found</div>
    <br />
    <div className='flex flex-col pb-28 h-full overflow-hidden overflow-y-auto md:pl-16'>
      {devicesArr}
      {showEventAdder && <EventForm setEvents={setEvents} />}
    </div>
  </>)
}