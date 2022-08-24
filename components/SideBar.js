import { BsPlus, BsFillLightningFill } from 'react-icons/bs';
import { FaFire, FaPoo, FaLaptopHouse } from 'react-icons/fa';
import { WiThermometer } from 'react-icons/wi';
import { TbPlug } from 'react-icons/tb';
import { GiGreenhouse, GiRayGun, GiRadarSweep } from 'react-icons/gi';
export default function SideBar() {

  return (<>
    <div className=" h-screen w-16 m-0 flex flex-col bg-gray-900 text-white shadow-lg">
      <SideBarIcon icon={<GiGreenhouse size="35" />} text={"Air Devices"} />
      <SideBarIcon icon={<TbPlug size="35" />} text={'Plug Devices'} />
      <SideBarIcon icon={<GiRadarSweep size="32" />} text={'Scan For Local plugs'} />
      <SideBarIcon icon={<GiRayGun size="20" />} text={'Trigger Events'} />
    </div>
  </>)
}
const SideBarIcon = ({ icon, text = 'tooltip 💡' }) => (
  <div className="sidebar-icon group">
    {icon}
    <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
  </div>
);