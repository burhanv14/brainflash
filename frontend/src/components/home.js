import Header from './header';
import DisplayCards from './displayCards';
import Spline from '@splinetool/react-spline';

export default function Home() {

  return (
    <div className="h-screen w-full flex flex-col">
        <div class="absolute w-full h-screen bg-fixed object-cover z-0">
            <Spline scene="https://prod.spline.design/leDcXUMRUnNRCeyM/scene.splinecode" />
        </div>
      <Header />
      <div className="bg-blue-200 w-full h-full flex justify-center items-center">
        <DisplayCards/> 
        </div>
    </div>
  );
}
