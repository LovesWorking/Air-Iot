import { useEffect, useState } from "react";
import addDevice from '../lib/addDevice';
import getDate from '../lib/getDate'
export default function EventChecker({ deviceInfo, events, setRefresh }) {
  const [timer, setTimer] = useState(5)
  useEffect(() => {
    const interval = setInterval(() => {
      if (timer <= 0) {
        setTimer(5)
        setRefresh((prev => prev ? false : true))
        checkDevices();
      } else {
        setTimer(timer - 1)
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);
  function checkDevices() {
    deviceInfo.map((el, i) => {
      if (el.air && el.plug) {
        // Converting c to F if temp  
        const currentTempOrHumid = events[i].tempOrHumid == 'temp' ?
          Math.ceil(el.air[events[i].tempOrHumid] * 9 / 5 + 32)
          :
          el.air[events[i].tempOrHumid];
        if (currentTempOrHumid > events[i].limit) {// If current temp/humid is more than our limit turn state to on or off
          if (el.plug.status != events[i].onOrOF) {// Set state as it's not what it should be
            addDevice('logs', null, {
              name: `Turning ${events[i].plug.Name} ${events[i].onOrOF} as ${events[i].air.Name}  ${events[i].tempOrHumid + ' ' + currentTempOrHumid} is over limit of ${events[i].limit} `,
              ip: getDate()
            })
            fetch('/api/plug/updatePlug', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                "ip": events[i].plug.Ip,
                "state": events[i].onOrOF,
              })
            })
          }
        } else {// Not over limit so plug should be oposite of onOrOF
          if (el.plug.status == events[i].onOrOF) {// Set state as it's not what it should be
            addDevice('logs', null, {
              name: `Turning ${events[i].air.Name} ${events[i].onOrOF == 'on' ? 'off' : 'on'} as current ${events[i].tempOrHumid + ' ' + currentTempOrHumid} is under limit of ${events[i].limit} `,
              ip: getDate()
            })
            fetch('/api/plug/updatePlug', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                "ip": events[i].plug.Ip,
                "state": events[i].onOrOF == 'on' ? 'off' : 'on',
              })
            })
          }
        }
      }
    })

  }

  return <p className="font-semibold text-center">
    Updating plugs in {timer} seconds
  </p>
}
