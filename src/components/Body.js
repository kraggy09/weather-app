import { useEffect, useState } from "react";

const Body = ({ search, buttonClick }) => {
  const [weather, setWeather] = useState(null);
  const apiKey = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=a38f758c5edcf066e4c15e4bd4284d5c`;

  const [initialRender, setInitialRender] = useState(true);

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

  return <div>I am Body</div>;
};

export default Body;
