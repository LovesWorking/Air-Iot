import { useState, useEffect } from 'react';
import Column from '../components/Column'
export default function AirDevices() {
  const [devices, setDevices] = useState([]); // Array of components
  const [airDevices, setAirDevices] = useState([]);// Array of devices
  const [showLocalPlugs, setShowLocalplugs] = useState(false);
  useEffect(() => {
    getLocalDevices();
    localPlugComponents();
    console.log(99);
  }, [airDevices])
  const getLocalDevices = () => {// Grabs array of devices from local storeage
    fetch('/api/findlocalplugs')
      .then(res => res.json())
      .then(results => {
        (airDevices.length !== results.length) && setAirDevices(results)
      })
  }

  const localPlugComponents = () => {
    const output = [];
    for (let i = 0; i < airDevices.length; i++) {
      output.push(<div key={i} className='m-0.5   bg-white overflow-hidden flex items-center gap-4 p-4   hover:bg-emerald-300 cursor-pointer '>
        <p className='font-medium' >  {airDevices[i]?.name}</p>
        <div className='font-medium'> {airDevices[i]?.ip} </div>
        <div className='font-medium'> {airDevices[i]?.state ? '🟢' : '🔴'} </div>
      </div >)
    }
    setDevices(output)
  }

  return (<>
    <Column
      showColumn={showLocalPlugs}
      setShowColumn={setShowLocalplugs}
      getDevice={localPlugComponents}
      devicesArr={devices}
      deviceType={'Local Plugs'} />
  </>);
}
