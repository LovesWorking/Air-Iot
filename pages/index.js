import { useRef, useState, useEffect } from 'react';
import AirDevices from '../components/AirDevices'
import PlugDevices from '../components/PlugDevices'
import Triggers from '../components/Triggers';
import addDevice from '../lib/addDevice';
import LocalPlugs from '../components/LocalPlugs'
export default function Home() {


  // name: 'Swap-Cooler-Test',
  // ip: '192.168.0.125',
  // mac: 'B0:A7:B9:08:92:3D',
  // state: true
  // 192.168.0.144
  console.log('rendered');

  return (<div className='grid place-content-center'>
    <br />
    <AirDevices />
    <LocalPlugs />
    <PlugDevices addDevice={() => { addDevice('plug') }} />
    <Triggers />
    <button onClick={() => { localStorage.setItem('airDeviceList', JSON.stringify([])) }}>Delete All Local storage Devices</button>
  </div>
  )
}
