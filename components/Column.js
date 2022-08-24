import TriggerAdder from '../components/TriggerAdder'
import { useState } from 'react'
import { HiOutlineRefresh } from 'react-icons/hi';
import { MdAddCircle } from 'react-icons/md';
export default function Column({ addDevice, devicesArr, deviceType, showTriggerAdder, setTriggers }) {
  const [refresh, setRefresh] = useState(0);
  return (<>
    <div className='flex w-10'>
      <div className='flex flex-col gap-0.5 px-4 py-3 font-semibold text-sm  bg-slate-50/90 backdrop-blur-sm ring-1'>
        <div className={`h-[10rem]  md:h-[15rem] lg:h-[20rem] xl:h[25rem] w-[21rem] overflow-y-auto `}>
          <div className="absolute top-0 left-0 right-0 px-4   dark:bg-slate-700/90 backdrop-blur-sm ring-1 ring-slate-900/10 dark:ring-black/10">
            <div className={`flex text-center `} >
              {addDevice && <button onClick={addDevice}
                className='m-1 cursor-pointer'> {< MdAddCircle size='18' />}</button>}
              <div className='absolute left-20 right-20' >{devicesArr.length}  {deviceType} Found</div>
              <div>.</div>
            </div>
          </div>
          <br />
          {devicesArr}
        </div>
        {showTriggerAdder && <TriggerAdder setTriggers={setTriggers} />}
      </div>
    </div>
  </>)
}