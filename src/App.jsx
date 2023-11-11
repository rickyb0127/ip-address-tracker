import { useEffect, useState } from 'react';
import MapView from './components/MapView';

function App() {
  const emptyLocationData = {
    location: "n/a",
    ipAddress: "n/a",
    locationText: "n/a",
    timeZone: "n/a",
    isp: "n/a"
  };

  const ipifyApiKey = import.meta.env.VITE_IPIFY_API_KEY;
  const [isAppReady, setIsAppReady] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [locationData, setLocationData] = useState(emptyLocationData);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchIP() {
      try {
        const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${ipifyApiKey}`);
        const json = await response.json();

        if(json.messages) {
          setErrorMessage(json.messages);
        } else {
          const updatedLocationData = {
            location: [json?.location?.lat, json?.location?.lng],
            ipAddress: json?.ip,
            locationText: `${json?.location?.city}, ${json?.location?.region}`,
            timeZone: `UTC ${json?.location?.timezone}`,
            isp: json?.isp
          }
  
          setLocationData(updatedLocationData);
        }

        setIsAppReady(true);
      } catch(err) {
        console.log(err);
        setErrorMessage(err);
        setIsAppReady(true);
      }
    };

    fetchIP();
  },[]);

  const searchTriggered = async() => {
    try {
      const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${ipifyApiKey}&ipAddress=${searchText}`);
      const json = await response.json();

      if(json.messages) {
        setErrorMessage(json.messages);
      } else {
        const updatedLocationData = {
          location: [json?.location?.lat, json?.location?.lng],
          ipAddress: json?.ip,
          locationText: `${json?.location?.city}, ${json?.location?.region}`,
          timeZone: `UTC ${json?.location.timezone}`,
          isp: json?.isp
        }
  
        console.log(updatedLocationData)
  
        setLocationData(updatedLocationData);
      }
    } catch(err) {
      console.log(err);
      setErrorMessage(err);
    }
  };

  return (
    <>
      {isAppReady ?
        <div className="w-full h-full max-h-[100%] mobile:max-w-none tablet:max-w-none desktop:max-w-[1440px] mx-auto">
          <div className="mobile:bg-bg-mobile tablet:bg-bg-desktop desktop:bg-bg-desktop bg-no-repeat bg-cover w-full h-[280px]">
            <div className={`flex w-full h-[40px] justify-between px-[20px] items-center ${errorMessage && "bg-alert-bar-red text-error-text"}`}>
              {errorMessage && 
                  <>
                    <div className="flex">{errorMessage}</div>
                    <div onClick={() => {setErrorMessage("")}} className="flex cursor-pointer">x</div>
                  </>
              }
            </div>
            <div className="relative flex flex-col mobile:h-auto tablet:h-[350px] desktop:h-[350px] mobile:gap-[30px] tablet:gap-0 desktop:gap-0 z-[99999] pt-[30px] items-center justify-between">
              <div className="flex text-white text-[28px]">IP Address Tracker</div>
              <div className="flex mobile:w-[450px] tablet:w-[500px] desktop:w-[500px] h-[50px] items-center">
                <input 
                  placeholder="Search for any IP address or domain" 
                  className="flex outline-none mobile:w-[400px] tablet:w-[450px] desktop:w-[450px] h-[50px] pl-[18px] rounded-tl-xl rounded-bl-xl cursor-pointer"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <button onClick={() => searchTriggered()} className="flex w-[50px] h-[50px] bg-black items-center justify-center rounded-tr-xl rounded-br-xl">
                  <img src="./images/icon-arrow.svg" />
                </button>
              </div>
              <div className="flex mobile:flex-col tablet:flex-row desktop:flex-row mobile:w-[450px] tablet:w-[90%] desktop:w-[1000px] mobile:h-auto tablet:h-[150px] desktop:h-[150px] mobile:gap-[10px] tablet:gap-0 desktop:gap-0 mobile:py-[20px] tablet:py-0 desktop:py-0 bg-white rounded-xl items-center">
                <div className="flex flex-col h-[70px] mobile:w-full tablet:w-[25%] desktop:w-[25%] items-center justify-center text-center mobile:border-none tablet:border-r desktop:border-r border-dark-gray">
                  <div className="flex text-dark-gray text-[12px] font-medium">IP ADDRESS</div>
                  <div className="flex text-[24px]">{locationData.ipAddress}</div>
                </div>
                <div className="flex flex-col h-[70px] tablet:w-[25%] desktop:w-[25%] items-center justify-center text-center mobile:border-none tablet:border-r desktop:border-r border-dark-gray">
                  <div className="flex text-dark-gray text-[12px] font-medium">LOCATION</div>
                  <div className="flex text-[24px]">{locationData.locationText}</div>
                </div>
                <div className="flex flex-col h-[70px] tablet:w-[25%] desktop:w-[25%] items-center justify-center text-center mobile:border-none tablet:border-r desktop:border-r border-dark-gray">
                  <div className="flex text-dark-gray text-[12px] font-medium">TIMEZONE</div>
                  <div className="flex text-[24px]">{locationData.timeZone}</div>
                </div>
                <div className="flex flex-col h-[70px] tablet:w-[25%] desktop:w-[25%] items-center justify-center text-center">
                  <div className="flex text-dark-gray text-[12px] font-medium">ISP</div>
                  <div className="flex text-[24px]">{locationData.isp}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-full">
            <MapView location={locationData.location} />
          </div>
        </div> :
        <div>Loading</div>
      }
    </>
  )
}

export default App;