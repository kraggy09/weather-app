import { useEffect, useState } from "react";

const Body = ({ search, buttonClick }) => {
  const [weather, setWeather] = useState(null);
  const [sym, setSym] = useState(null);
  const apiKey = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=a38f758c5edcf066e4c15e4bd4284d5c`;

  const icon = `https://openweathermap.org/img/wn/${sym}@2x.png
  `;

  const [initialRender, setInitialRender] = useState(true);
  useEffect(() => {
    if (weather != null) {
      if (weather.coord != null) {
        setSym(weather?.weather[0]?.icon);
      }
    }
  }, [weather]);

  async function getApi() {
    let data = await fetch(apiKey);
    const json = await data.json();
    console.log(json);

    setWeather(json);
  }

  useEffect(() => {
    if (initialRender) {
      setInitialRender(false);
    } else {
      getApi();
    }
  }, [buttonClick]);

  return (
    <div>
      {weather == null ? (
        <span>Please Search</span>
      ) : (
        <div>
          {weather.name == null ? (
            <div className="w-[80%] border p-5 rounded-2xl text-xl font-bold text-red-500 border-black text-center mt-10">
              City not found
            </div>
          ) : (
            <div>
              <div className="w-full h-[60vh] flex flex-col ">
                <p className="font-bold text-2xl">{weather.name}</p>
                <p className="text-5xl sm:text-6xl lg:text-9xl  text-center">
                  {weather.main.temp} °C
                </p>
              </div>
              <div class="w-full  bg-white bg-opacity-50 backdrop-blur rounded drop-shadow-lg flex justify-around items-center">
                <img
                  src={icon}
                  className="h-[100px] w-[100px] bg-gray-400 rounded-3xl"
                />
                <div className=" ">
                  <p className="border-b text-center">
                    {weather.main.humidity} %
                  </p>
                  <p>Humidity</p>
                </div>
                <div className=" ">
                  <p className="border-b">{weather.wind.speed} KM/H</p>
                  <p>Humidity</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Body;
