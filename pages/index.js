import { useRef, useState, useEffect } from 'react';
import AirDevices from '../components/AirDevices'
import PlugDevices from '../components/PlugDevices'
import LocalEvents from '../components/LocalEvents';
import addDevice from '../lib/addDevice';
import LocalDeviceScan from '../components/LocalDeviceScan'
import SideBar from '../components/SideBar';
import Events from '../components/Events';
export default function Home() {
  const [tab, setTab] = useState(-1);
  function ReturnTab(tab) {
    switch (tab) {
      case 0:
        return <AirDevices />
      case 1:
        return <PlugDevices />
      case 2:
        return <LocalDeviceScan />
      case 3:
        return <LocalEvents />
      default:
        return <Events />
    }
  }
  return (<>
    <title>AIR IOT</title>
    <div className='flex flex-col '>
      <SideBar curTab={tab} setTab={setTab} />
      {(ReturnTab(tab))}
    </div>
  </>)
}