import { useState, useEffect, useRef } from "react"
import addDevice from '../lib/addDevice';

export default function TriggerAdder({ setTriggers, refresh }) {
  const [airDevices, setAirDevices] = useState([])
  const [plugDevices, setPlugDevices] = useState([])
  const air = useRef(null);
  const underOver = useRef(null);
  const tempOrHumid = useRef(null);
  const plug = useRef(null);
  const onOrOF = useRef(null);
  const limit = useRef(null);

  function addTriggers() {
    const triggerObject = {
      air: JSON.parse(air.current.value),
      underOver: underOver.current.value,
      tempOrHumid: tempOrHumid.current.value,
      plug: JSON.parse(plug.current.value),
      onOrOF: onOrOF.current.value,
      limit: limit.current.value,
    };
    addDevice('trigger', setTriggers, triggerObject);
  }
  function setLocalDevices() {
    setAirDevices(JSON.parse(localStorage.getItem('airDeviceList')))
    setPlugDevices(JSON.parse(localStorage.getItem('plugDeviceList')))
  }
  useEffect(() => {
    setLocalDevices()
  }, [refresh])
  function DevicesToOptions(arr, deviceType) {
    return arr?.map((el, i) => {
      return (<>
        <option
          value={JSON.stringify({ Ip: el.ip, Name: el.name })}
        >{el.name}</option>
      </>)
    })

  }
  return (<>
    <br />
    <div className='flex flex-col space-y-10'>
      <div className="custom-select" >
        <p className=" flex-wrap">
          Turn plug
          <select ref={plug}>
            {DevicesToOptions(plugDevices, 'plug')}
          </select>
          <select ref={onOrOF}>
            <option>ON</option>
            <option>OFF</option>
          </select>
          when
          <select ref={air}>
            {DevicesToOptions(airDevices, 'air')}
          </select>

          <select ref={tempOrHumid}>
            <option>Temp</option>
            <option>Humid</option>
          </select>
          goes
          <select ref={underOver}>
            <option>Over</option>
            <option>Under</option>
          </select>
          <input ref={limit} className="w-10" defaultValue={75} />
        </p>
        <button onClick={addTriggers} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Trigger Event
        </button>
        <button onClick={setLocalDevices} className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Refresh
        </button>
      </div>

    </div>

  </>)
}