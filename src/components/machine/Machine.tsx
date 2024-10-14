"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(MotionPathPlugin);
export default function Machine() {
    const wavePathRef = useRef(null)
    const wavePoints = "8,8.54169244022377 10,8.258668616516482 12,10.922004726910203 14,15.633994636897816 16,20.806411373766178 18,24.695836141522186 20,25.99129641210315 22,24.256143342215672 24,20.07522897102479 26,14.857775538343576 28,10.362381943776715 30,8.104269038017334 32,8.84455810800782 34,12.333726745800853 36,17.39571306486055 38,22.32432003144273"
    const waveRef = useRef(null);
  const pointRef = useRef(null);

  useEffect(() => {
    const wave = waveRef.current;
    const point = pointRef.current;

    gsap.set(wave, { strokeDasharray: "0 480" });
    gsap.set(point, { x: 0, y: 0 });

    const tl = gsap.timeline({ repeat: -1 });

    tl.to(wave, {
      strokeDasharray: "480 480",
      duration: 4,
      ease: "linear"
    });

    tl.to(point, {
      motionPath: {
        path: "#wave",
        align: "#wave",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
      },
      duration: 4,
      ease: "linear"
    })
    }, [0]);






    useEffect(()=>{
        gsap.fromTo(wavePathRef.current,{x:0},{
            x:-24,
            duration: .5,
            ease:"none",
            repeat: -1,
        })
    },[])
    
  return (
    <div>
      {/* outer case of machine */}
      {/* <svg
              width="145"
              height="177"
              viewBox="0 0 145 177"
              fill="none"
              style={{display:"block"}}
            >
              <mask
                id="Rlsefnnija"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="145"
                height="177"
              >
                <path
                  d="M12 4.99999L4 13L0 17V21V171V177H6H122H128L132 173L140 165C140 165 142.13 162.531 143 160.5C143.923 158.346 144 155 144 155V6.99999C144 6.99999 144.28 3.27999 143 2C141.72 0.72001 138 0.999992 138 0.999992H22C22 0.999992 18.1537 1.07698 16 1.99999C13.9695 2.87021 12 4.99999 12 4.99999Z"
                  fill="#FFFFFF"
                ></path>
              </mask>
              <g mask="url(#Rlsefnnija)">
                <path d="M16 1L0 17H128L144 1H16Z" fill="#ABABAB"></path>
                <path d="M144 1L128 17V177L144 161V1Z" fill="#959595"></path>
                <rect y="17" width="128" height="160" fill="#C4C4C4"></rect>
              </g>
            </svg> */}
<svg xmlns="http://www.w3.org/2000/svg" width="48" height="34" viewBox="0 0 48 34">
  <rect width="48" height="34" rx="4" fill="#2B2B2B"/>
  <path id="wave" d="M0,17 Q6,25 12,17 T24,17 T36,17 T48,17" stroke="#32FF98" stroke-width="2" fill="none" stroke-linecap="round">
    <animate attributeName="d" 
             values="M0,17 Q6,25 12,17 T24,19 T36,17 T48,17;
                     M0,17 Q6,9 12,17 T24,19 T36,17 T48,17;
                     M0,17 Q6,25 12,17 T24,19 T36,17 T48,17"
             dur="2s"
             repeatCount="indefinite"/>
  </path>
</svg>
    </div>
  );
}
