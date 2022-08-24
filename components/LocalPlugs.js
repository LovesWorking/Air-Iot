import { useState, useEffect } from 'react';
import Column from '../components/Column'
export default function AirDevices() {
  const [devices, setDevices] = useState([]); // Array of components
  const [airDevices, setAirDevices] = useState([]);// Array of devices
  const [refreshs, setRefreshs] = useState(0); // Refresh button state

  const [showLocalPlugs, setShowLocalplugs] = useState(false);
  useEffect(() => {
    getLocalDevices();
    localPlugComponents();
  }, [airDevices, refreshs])
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
      output.push(<div key={i} className={'selection-primary'}>
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
      deviceType={'Local Plugs'}
      setRefreshs={setRefreshs}
      refreshs={refreshs} />
  </>);
}
