import { useRef, useState, useEffect } from 'react';
import AirDevices from '../components/AirDevices'
import PlugDevices from '../components/PlugDevices'
import LocalTriggers from '../components/LocalTriggers';
import addDevice from '../lib/addDevice';
import LocalDeviceScan from '../components/LocalDeviceScan'
import SideBar from '../components/SideBar';
import Events from '../components/Events';
export default function Home() {
  const [tab, setTab] = useState(-1);
  function ReturnTab(tab) {
    let output;
    switch (tab) {
      case 0:
        return <AirDevices />
      case 1:
        return <PlugDevices />
      case 2:
        return <LocalDeviceScan />
      case 3:
        return <LocalTriggers />
      default:
        return <Events />
    }
    return output;
  }
  return (<>
    <div className='flex flex-col '>
      <SideBar curTab={tab} setTab={setTab} />
      {(ReturnTab(tab))}
    </div>
  </>)
}