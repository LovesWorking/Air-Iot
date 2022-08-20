import { useState } from 'react';
export default function AirDevices({ arr, getLocalDevices, addAwair }) {
  const [devices, setDevices] = useState([]);
  const getAir = async () => {
    getLocalDevices();
    const output = [];
    for (let i = 0; i < arr.length; i++) {
      const url = `http://${arr[i].ip}/air-data/latest`
      await fetch(url)
        .then(res => res.json())
        .then(results => {
          output.push(<div key={i} className='  bg-white overflow-hidden flex items-center gap-4 p-4   hover:bg-emerald-300 cursor-pointer '>
            <p className='font-medium' >  {arr[i].name}</p>
            <div className='font-medium' > 🌡  {Math.ceil(results.temp * 9 / 5 + 32)} F </div>
            <div className='font-medium'> 💧  {Math.ceil(results.humid)} %</div>
          </div >)
        })
        .catch(err => {
          output.push(<div key={i} className='p-1 m-0   bg-amber-200 overflow-hidden  flex items-center gap-4 p-4  hover:bg-emerald-300 cursor-pointer '>
            <p className='font-medium'>IP: {arr[i].ip} Timed Out</p>
          </div>)
        })
    }
    setDevices(output)
  }
  return (<>

    <div className='flex flex-col gap-0.5 px-4 py-3 font-semibold text-sm text-slate-900 dark:text-slate-200 bg-slate-50/90 dark:bg-slate-700/90 backdrop-blur-sm ring-1 ring-slate-900/10 dark:ring-black/10'>
      <div className='h-[10rem]  md:h-[15rem] lg:h-[20rem] xl:h[25rem] w-[21rem] overflow-y-auto '>
        <div className="absolute top-0 left-0 right-0 px-4   dark:bg-slate-700/90 backdrop-blur-sm ring-1 ring-slate-900/10 dark:ring-black/10">
          <div className='flex text-center'>
            <button onClick={addAwair} className='m-1 fa fa-plus-circle ' />
            <button onClick={getAir} className='m-2 fa fa-refresh ' />
            <div className='absolute left-20 right-20' >Awair</div>
          </div>
        </div>
        {devices}
      </div>
    </div>
  </>);
}

