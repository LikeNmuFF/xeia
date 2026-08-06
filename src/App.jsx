import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoginScreen from "./components/LoginScreen";
import IntroScreen from "./components/IntroScreen";
import Timeline from "./components/Timeline";
import InteractiveMoment from "./components/InteractiveMoment";
import FinaleScreen from "./components/FinaleScreen";
import HomeScreen from "./components/HomeScreen";
import Gallery from "./components/Gallery";
import Photobooth from "./components/Photobooth";

function App() {
  const [screen, setScreen] = useState("login");
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("dev") === "true") {
      setUnlocked(true);
      const hasOpened = localStorage.getItem("hasOpenedBefore");
      setScreen(hasOpened ? "home" : "intro");
    }
  }, []);

  const handleUnlock = () => {
    setUnlocked(true);
    const hasOpened = localStorage.getItem("hasOpenedBefore");
    setScreen(hasOpened ? "home" : "intro");
  };

  const handleIntroComplete = () => {
    localStorage.setItem("hasOpenedBefore", "true");
    setScreen("timeline");
  };

  const handleTimelineComplete = () => {
    setScreen("interactive");
  };

  const handleInteractiveComplete = () => {
    setScreen("finale");
  };

  const handleFinaleComplete = () => {
    setScreen("home");
  };

  const handleNavigate = (target) => {
    setScreen(target);
  };

  const handleBack = () => {
    setScreen("home");
  };

  const pageVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    },
    exit: { 
      opacity: 0, 
      x: -50,
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      <AnimatePresence mode="wait">
        {screen === "login" && (
          <motion.div
            key="login"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <LoginScreen onUnlock={handleUnlock} />
          </motion.div>
        )}
        {screen === "intro" && unlocked && (
          <motion.div
            key="intro"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <IntroScreen onComplete={handleIntroComplete} />
          </motion.div>
        )}
        {screen === "timeline" && (
          <motion.div
            key="timeline"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Timeline onComplete={handleTimelineComplete} />
          </motion.div>
        )}
        {screen === "interactive" && (
          <motion.div
            key="interactive"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <InteractiveMoment onComplete={handleInteractiveComplete} />
          </motion.div>
        )}
        {screen === "finale" && (
          <motion.div
            key="finale"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <FinaleScreen onComplete={handleFinaleComplete} />
          </motion.div>
        )}
        {screen === "home" && (
          <motion.div
            key="home"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <HomeScreen onNavigate={handleNavigate} />
          </motion.div>
        )}
        {screen === "gallery" && (
          <motion.div
            key="gallery"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Gallery onBack={handleBack} />
          </motion.div>
        )}
        {screen === "photobooth" && (
          <motion.div
            key="photobooth"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Photobooth onBack={handleBack} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
