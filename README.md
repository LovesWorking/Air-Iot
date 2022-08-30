### AIR-IOT 
This is used for automating non-iot devices through air quality data. There is no limit to the amout devices you can connect.

This was created for the purpose of automating greenhouses, swamp-coolers or anything you need to automate through air-quality.

## Currently only supports  Awair Element and TP-Link - Kasa Smart Wi-Fi Plugs. 
Feel free to request other devices to be supported. 

## Quickstart

First, install, build and run the Next.JS app:

```bash
npm i
# Then
npm run build
# Then
npm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can also open the app on your phone or any other device as long as it's on the same network. Your URL will be your modem/router ip + port 3000 ie:

```bash
 192.168.0.1:3000
```
You'll  need the ip address of your Air quality device and smart plug.
Click 'Scan' and the Node.JS server will scan your local network for matching devices.

<img src="https://user-images.githubusercontent.com/111514077/187530961-98e4e674-2152-4ecc-b0f5-4119fc8a20f2.png" width="450" height="600">

You'll then click the leaf and plug icons. This is where your devices will be stored. Click the + button at the top to add a device.

<img src="https://user-images.githubusercontent.com/111514077/187532673-641fce2c-076a-4a51-a9c7-687b630cc29b.png" width="450" height="600">

<img src="https://user-images.githubusercontent.com/111514077/187533027-db2aed00-4045-4ea8-9f1f-591b5d7dff08.png" width="450" height="600">

Once you've added at least once air and plug device, you'll be able to create events! These will trigger the plug on or off bassed off the tempature or humidity from your air quality device.

<img src="https://user-images.githubusercontent.com/111514077/187533363-037e8862-746c-4475-932c-d463ef3300cd.png" width="450" height="600">

Finally, un-click the current tab you're on. You'll now see your events.

These will have the current tempature, humidity, watts and the event that needs to happen to trigger the plug on or off state.

<img src="https://user-images.githubusercontent.com/111514077/187533717-1ef33f34-7c83-4d4c-a421-b34a550417b1.png" width="450" height="600">

Whenever an event is triggered it will automatically be added to the logs tab. This will include the reason for the state change and the date/time.

<img src="https://user-images.githubusercontent.com/111514077/187534673-5f8bf71a-ee8f-40aa-a5a6-95674817e084.png" width="450" height="600">

## Contributing
Everyone is free to contribute. Fork the project, make changes and make a pull request. If you find bugs open an issue, or you can fix it yourself just by forking, making changes and making a pull request.

## Credits

plasticrake for creating a fantastic API for all tplink devices - tplink-smarthome-api

[George Georgovassilis and Thomas Baust](https://blog.georgovassilis.com/2016/05/07/controlling-the-tp-link-hs100-wi-fi-smart-plug/)
for figuring out the HS1XX encryption needed to comunicate to Tplink plugs.
