import { BsPlus, BsFillLightningFill } from 'react-icons/bs';
import { FaFire, FaPoo, FaLaptopHouse } from 'react-icons/fa';
import { WiThermometer } from 'react-icons/wi';
import { TbPlug } from 'react-icons/tb';
import { GiGreenhouse, GiRayGun, GiRadarSweep } from 'react-icons/gi';

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
    <div className=" justify-between p-2  m-0 flex  bg-gray-100 text-white shadow-lg md:flex-col md:h-screen md:w-16 fixed bottom-0 inset-x-0 md:justify-start  ">
      <SideBarIcon icon={<GiGreenhouse size='fill' />} text={"Air Devices"} tab={0} />
      <SideBarIcon icon={<TbPlug size='fill' />} text={'Plug Devices'} tab={1} />
      <SideBarIcon icon={<GiRadarSweep size='fill' />} text={'Scan Local Netowrk For Plugs'} tab={2} />
      <SideBarIcon icon={<GiRayGun size='fill' />} text={'Trigger Events'} tab={3} />
    </div>
  </>)
}
