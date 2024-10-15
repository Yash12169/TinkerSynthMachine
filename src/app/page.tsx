import LoadingCase from "@/components/LoadingCase";
import LoadingSine from "@/components/machine/LoadingSine";
// import LoadingEarth from "@/components/machine/LoadingEarth";
import LoadingBezier from "@/components/machine/PinkGraph";
import TinkersynthMachine from "@/components/machine/TinkerSynthMachine";

export default function Home() {
  return (
    <div>
      {/* <Machine/> */}
      <LoadingBezier isPoweredOn={true} prefersReducedMotion={false}/>
      <LoadingCase/>
      <LoadingSine isPoweredOn={true} prefersReducedMotion={false}/>
      {/* <LoadingEarth isPoweredOn={true}/> */}
      <TinkersynthMachine/>
    </div>
  );
}
