import { TbLeaf, TbPlug } from 'react-icons/tb';
import { SiEventstore } from 'react-icons/si';
import { GiRadarSweep } from 'react-icons/gi';

export default function SideBar({ setTab, curTab }) {
  const SideBarIcon = ({ icon, text = 'tooltip 💡', tab }) => (
    <div onClick={() => { setTab(tab == curTab ? -1 : tab) }}
      className={tab == curTab ?
        ' text-sky-500 sidebar-icon group rounded-xl ' :
        'bg-white sidebar-icon group '} >
      {icon}
      <span className="sidebar-tooltip group-hover:scale-100" > {text}</span>
    </div >
  );
  return (<>
    <div className=" justify-between p-2 pt-0  m-0 flex  bg-gray-100 text-white shadow-lg md:flex-col md:h-screen md:w-16 fixed bottom-0 inset-x-0 md:justify-start  ">
      <div className='flex flex-col text-center'>
        <SideBarIcon icon={<TbLeaf size='50' />} text={"Air Devices"} tab={0} />
        <p className='select-none  font-bold  text-slate-600'>Air</p>
      </div>
      <div className='flex flex-col text-center'>
        <SideBarIcon icon={<TbPlug size='50' />} text={'Plug Devices'} tab={1} />
        <p className='select-none  font-bold  text-slate-600'>Plugs</p>
      </div>

      <div className='flex flex-col text-center'>
        <SideBarIcon icon={<GiRadarSweep size='50' />} text={'Scan Netowrk'} tab={2} />
        <p className='select-none  font-bold  text-slate-600'>Scan</p>
      </div>

      <div className='flex flex-col text-center'>
        <SideBarIcon icon={<SiEventstore size='50' />} text={'Events'} tab={3} />
        <p className='select-none  font-bold  text-slate-600'>Events</p>
      </div>

    </div>
  </>)
}
