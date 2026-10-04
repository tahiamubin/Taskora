import CodingProgress from "../components/CodingProgress";
import CommunityHelpBoard from "../components/CommunityHelpBoard";
import FinalCTA from "../components/FinalCTA";
import Gamification from "../components/Gamification";
import Goals from "../components/Goals";
import HeroSection from "../components/HeroSection";
import HowItWorks from "../components/HowItWorks";
import InterviewPrep from "../components/InterviewPrep";
import ProblemTracking from "../components/ProblemTracking";



export default function Home() {
  return (
    <div>
     <HeroSection></HeroSection>
     <ProblemTracking/>
     <InterviewPrep/>
     <Gamification/>
     <CodingProgress/>
     <Goals/>
     <CommunityHelpBoard/>
     <HowItWorks/>
     <FinalCTA/>
    </div>
  );
}
