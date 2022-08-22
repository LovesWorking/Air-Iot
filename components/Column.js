export default function Column({ showColumn, setShowColumn, addDevice, getDevice, devicesArr, deviceType }) {
  return (<>
    <div className='flex flex-col gap-0.5 px-4 py-3 font-semibold text-sm text-slate-900 dark:text-slate-200 bg-slate-50/90 dark:bg-slate-700/90 backdrop-blur-sm ring-1 ring-slate-900/10 dark:ring-black/10'>
      <div className={`${showColumn ? 'h-[10rem]  md:h-[15rem] lg:h-[20rem]' : 'h-1'} xl:h[25rem] w-[21rem] overflow-y-auto `}>
        <div className="absolute top-0 left-0 right-0 px-4   dark:bg-slate-700/90 backdrop-blur-sm ring-1 ring-slate-900/10 dark:ring-black/10">
          <div className={`flex text-center`} >
            <button className={showColumn ? 'fa  fa-compress' : 'fa  fa-expand'} onClick={() => setShowColumn(showColumn ? false : true)} />
            <button onClick={addDevice} className='m-1 fa fa-plus-circle ' />
            <button onClick={getDevice} className='m-1 fa fa-refresh ' />
            <div className='absolute left-20 right-20' >{devicesArr.length}  {deviceType} Found</div>
          </div>
        </div>
        {devicesArr}
      </div>
    </div>
  </>)
}