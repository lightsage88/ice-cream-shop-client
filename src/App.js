import { useState, useEffect } from "react";
import "./App.css";
import AppWrapper from "./Container/AppWrapper";
import Input from "./Component/Input";
import IceCreamShopList from "./Component/IceCreamShopList";
import Map from "./Component/Map";
const App = () => {
  console.log("process: ", process.env);
  const [location, setLocation] = useState("alpharetta, ga");

  const updateTargetCity = (e) => {
    let value;
    if (e !== "reset") {
      value = e.target.value;
    } else {
      value = 'alpharetta, ga';
    }
    setLocation(value);
  };
  return (
    <div>
      <Input updateTargetCity={updateTargetCity} />
      <IceCreamShopList location={location} />
    </div>
  );
}

export default App;
