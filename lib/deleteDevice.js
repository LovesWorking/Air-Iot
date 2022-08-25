export default function deleteLocalDevice(type, index, setDevice) {// Filters out index we want removed
  const storage = JSON.parse(localStorage.getItem(`${type}DeviceList`));
  const newStoreage = storage.filter((el, i) => {
    return i != index
  });
  storage && localStorage.setItem(`${type}DeviceList`, JSON.stringify(newStoreage))
  setDevice(newStoreage);
}