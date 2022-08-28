import { RiDeleteBin6Line } from 'react-icons/ri';
import deleteLocalDevice from '../lib/deleteDevice';
export default function deviceToComponent(type, device, setDevice, setDeviceComponents) {
  const output = [];
  for (let i = 0; i < device.length; i++) {
    output.push(<div key={i + 'selection-primary'} className={'selection-primary'} >
      <p className='font-medium' >  {device[i]?.name}</p>
      <div className='font-medium'> {device[i]?.ip} </div>
      {device[i].state !== undefined ?
        <div className='font-medium'> {device[i]?.state ? '🟢' : '🔴'} </div>
        :
        <div className='text-rose-700'>
          <RiDeleteBin6Line size='20' onClick={() => { deleteLocalDevice(type, i, setDevice) }} />
        </div>
      }
    </div >)
  }
  setDeviceComponents(output)
}