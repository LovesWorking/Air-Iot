import { useState, useEffect } from 'react';
import Column from '../components/Column'
export default function AirDevices({ addDevice }) {
  const [devices, setDevices] = useState([]); // Array of components
  const [airDevices, setairDevices] = useState([]);// Array of devices
  const [showAir, setShowAir] = useState(false);
  useEffect(() => {
    getLocalDevices();
  }, [])
  const getLocalDevices = () => {
    const storage = JSON.parse(localStorage.getItem('airDeviceList'));
    storage && setairDevices(storage)
  }
  const deleteLocalDevice = (index) => {
    const storage = JSON.parse(localStorage.getItem('airDeviceList'));
    const newStoreage = storage.filter((el, i) => {
      return i != index
    });
    storage && localStorage.setItem('airDeviceList', JSON.stringify(newStoreage))
    getLocalDevices();
    setairDevices(newStoreage);
    getAir();
  }
  const getAir = async () => {
    getLocalDevices();
    const output = [];

    async function fetchWithTimeout(resource, options = {}) {
      const { timeout = 1000 } = options;
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeout);
      const response = await fetch(resource, {
        ...options,
        signal: controller.signal
      });
      clearTimeout(id);
      return response;
    }

    for (let i = 0; i < airDevices.length; i++) {
      const url = `http://${airDevices[i].ip}/air-data/latest`
      await fetchWithTimeout(url)
        .then(res => res.json())
        .then(results => {
          output.push(<div key={i} className='m-0.5   bg-white overflow-hidden flex items-center gap-4 p-4   hover:bg-emerald-300 cursor-pointer '>
            <p className='font-medium' >  {airDevices[i].name}</p>
            <div className='font-medium' > 🌡  {Math.ceil(results.temp * 9 / 5 + 32)} F </div>
            <div className='font-medium'> 💧  {Math.ceil(results.humid)} %</div>
            <div className='font-medium'> {airDevices[i].ip} </div>
            <div id={i} onClick={(e) => { deleteLocalDevice(e.target.id) }}>❌</div>
          </div >)
        })
        .catch(err => {
          output.push(<div key={i} className='m-0.5   bg-white overflow-hidden flex items-center gap-4 p-4   hover:bg-emerald-300 cursor-pointer '>
            <p className='font-medium' >  {airDevices[i].name}</p>
            <p className='font-medium'> {airDevices[i].ip}</p>
            <p className='fa fa-chain-broken' />
            <div id={i} onClick={(e) => { deleteLocalDevice(e.target.id) }}>❌</div>
          </div>)
        })
    }
    setDevices(output)
  }
  return (<>
    <Column
      showColumn={showAir}
      setShowColumn={setShowAir}
      addDevice={addDevice}
      getDevice={getAir}
      devicesArr={devices}
      deviceType={'Air Devices'} />
  </>);
}
