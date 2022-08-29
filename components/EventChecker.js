import { useEffect, useState } from "react";
export default function EventChecker({ deviceInfo, events, setRefresh }) {
  const [timer, setTimer] = useState(10)
  useEffect(() => {
    const interval = setInterval(() => {
      if (timer <= 0) {
        setTimer(10)
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
      if (el.air) {
        // Converting c to F if temp  
        const currentTempOrHumid = events[i].tempOrHumid == 'temp' ?
          Math.ceil(el.air[events[i].tempOrHumid] * 9 / 5 + 32)
          :
          el.air[events[i].tempOrHumid];
        if (currentTempOrHumid > events[i].limit) {// If current temp/humid is more than our limit turn state to on or off
          if (el.plug.status != events[i].onOrOF) {// Set state as it's not what it should be
            console.log(`Turning ${events[i].air.Name} ${events[i].onOrOF} as current ${events[i].tempOrHumid + ' ' + currentTempOrHumid} is ${events[i].underOver} limit of ${events[i].limit} `);
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
            console.log(`Turning ${events[i].air.Name} ${events[i].onOrOF == 'on' ? 'off' : 'on'} as current ${events[i].tempOrHumid + currentTempOrHumid} is ${events[i].overUnder} limit of ${events[i].limit} `);
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
