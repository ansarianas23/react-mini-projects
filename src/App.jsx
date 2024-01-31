import { useState } from "react"
import Header from "./components/Header"
import ImageSlider from "./components/ImageSlider"
import OTPInput from "./components/OTPInput";
import ActiveTab from "./components/ActiveTab";
import PillSelectorInput from "./components/PillSelectorInput";
import Pagination from "./components/Pagination";

function App() {

  const [currentProject, setCurrentProject] = useState("Image Slider");
  const projectList = [
    "Image Slider",
    "OTP Input",
    "Active Tab",
    "Pill Selector Input",
    "Pagination",
  ];


  return (
    <>
    <div>
      <Header currentProject={currentProject} setCurrentProject={setCurrentProject} projectList={projectList}/>
    </div>

    <div className="w-full">
      {currentProject === "Image Slider" && <ImageSlider/>}
      {currentProject === "OTP Input" && <OTPInput/>}
      {currentProject === "Active Tab" && <ActiveTab/>}
      {currentProject === "Pill Selector Input" && <PillSelectorInput/>}
      {currentProject === "Pagination" && <Pagination/>}
    </div>
    </>
  )
}

export default App
