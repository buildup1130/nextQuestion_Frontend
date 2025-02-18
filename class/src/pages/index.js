import MainContainerLogic from "@/components/common/MainContainer/MainContainer.Container";
import { Main__IconBar } from "./styles";
import MainCarouselLogic from "@/components/unit/MainCarousel/MainCarousel.Container";

export default function Home() {
  return (
    <MainContainerLogic>
      <Main__IconBar>
        <img src = "/image/Vector.png"/>
        <img src = "/image/material-symbols_settings.png"/>
      </Main__IconBar>
      <MainCarouselLogic></MainCarouselLogic>
    </MainContainerLogic>
  );
}
