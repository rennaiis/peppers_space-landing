import gsap from "gsap";
import MotionPathPlugin from "gsap/MotionPathPlugin";
import {LocalTimeline} from "./LocalTimeline";

global.gsap = gsap;

gsap.registerPlugin(MotionPathPlugin);
gsap.localTimeline = new LocalTimeline();

export default gsap;
