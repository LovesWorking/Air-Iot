import { useEffect, useState } from "react";
export default function EventChecker({ deviceInfo, events, setRefresh }) {
  const [timer, setTimer] = useState(10)
  useEffect(() => {
    const interval = setInterval(() => {
      if (timer <= 0) {
        setTimer(10)
        setRefresh((prev => prev ? false : true))
      } else {
        setTimer(timer - 1)
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);
  function checkDevices() {
    deviceInfo.map(el => {

      // deviceInfo data 
      // "air": {
      //     "temp": 23.21,
      //     "humid": 53.75,
      // },
      // "plug": {
      //     "status": 1 // 1 on 0 off -1 disc
      // },

      // events data 
      //   {
      //     "air": {
      //         "Ip": "192.168.0.169",
      //         "Name": "Greenhouse"
      //     },
      //     "underOver": "over",
      //     "tempOrHumid": "humidity",
      //     "plug": {
      //         "Ip": "192.168.0.125",
      //         "Name": "Exhaust Fan"
      //     },
      //     "onOrOF": "on",
      //     "limit": "75"
      // }
    })
  }

  return <p className="font-semibold text-center">
    Updating plugs in {timer} seconds
  </p>
}
