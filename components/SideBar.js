import { BsPlus, BsFillLightningFill } from 'react-icons/bs';
import { FaFire, FaPoo, FaLaptopHouse } from 'react-icons/fa';
import { WiThermometer } from 'react-icons/wi';
import { TbPlug } from 'react-icons/tb';
import { GiGreenhouse, GiRayGun, GiRadarSweep } from 'react-icons/gi';

export default function SideBar({ setTab, curTab }) {
  const SideBarIcon = ({ icon, text = 'tooltip 💡', tab }) => (
    <div onClick={() => { setTab(tab == curTab ? -1 : tab) }} className={tab == curTab ? 'bg-sky-500 text-white sidebar-icon group rounded-xl' : 'bg-white sidebar-icon group'} >
      {icon}
      <span className="sidebar-tooltip group-hover:scale-100" > {text}</span>
    </div >
  );
  return (<>
    <div className=" p-2 h-screen w-16 m-0 flex flex-col bg-gray-100 text-white shadow-lg">
      <SideBarIcon icon={<GiGreenhouse size="35" />} text={"Air Devices"} tab={0} />
      <SideBarIcon icon={<TbPlug size="35" />} text={'Plug Devices'} tab={1} />
      <SideBarIcon icon={<GiRadarSweep size="32" />} text={'Scan Local Netowrk For Plugs'} tab={2} />
      <SideBarIcon icon={<GiRayGun size="20" />} text={'Trigger Events'} tab={3} />
    </div>
  </>)
}
