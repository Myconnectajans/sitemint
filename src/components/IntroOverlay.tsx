"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Raleway } from "next/font/google";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["200","300","400","500","600","700","800"],
  style: ["normal","italic"],
});

/**
 * Intro: black screen with two sequential lines, sleek typography.
 * Repeats on every refresh.
 */
const INTRO_DISABLED = process.env.NEXT_PUBLIC_INTRO_DISABLED === "1";
export default function IntroOverlay() {
  if (INTRO_DISABLED) return null;
  const [visible, setVisible] = useState(true);
  useEffect(()=>{
    try{
      if (localStorage.getItem("skip_intro_once") === "1") {
        localStorage.removeItem("skip_intro_once");
        setVisible(false);
        return; // skip timers below
      }
    }catch{}
  },[]);

  const [step, setStep] = useState<0|1|2>(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 2400);            // first line duration
    const t2 = setTimeout(() => setStep(2), 2400 + 2400);     // switch to fade
    const t3 = setTimeout(() => {
      setVisible(false);
      document.documentElement.style.overflow = "";
    }, 2400 + 2400 + 900);                                    // fade out

    document.documentElement.style.overflow = "hidden";
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: step === 2 ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9 }}
          className="fixed inset-0 z-[1000] bg-black grid place-items-center"
          aria-hidden
        >
          <div className={`${raleway.className} text-white text-center px-6`}>
            <motion.p
              key={step}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.8 }}
              className="text-[9vw] md:text-6xl leading-[1.05] tracking-wide"
            >
              {step === 0 ? (
                <>
                  <span className="font-light">Hayalinizdeki</span>{" "}
                  <span className="font-extrabold ">Kurumsal</span>{" "}
                  <span className="font-light">Kimliğe</span>{" "}
                  <span className="font-medium">Uygun Fiyatla</span>{" "}
                  <span className="font-semibold">Ulaşın</span>
                </>
              ) : (
                <>
                  <span className="font-light">Türkiye&apos;nin</span>{" "}
                  <span className="font-extrabold">Creative</span>{" "}
                  <span className="font-light">Web</span>{" "}
                  <span className="font-light">Platformu</span>
                </>
              )}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
