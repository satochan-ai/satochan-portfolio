import { About } from "@/components/sections/About";
import { AiWorkflow } from "@/components/sections/AiWorkflow";
import { CaseStudy } from "@/components/sections/CaseStudy";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Proof } from "@/components/sections/Proof";
import { SelectedWorks } from "@/components/sections/SelectedWorks";
import { Speaking } from "@/components/sections/Speaking";
import { Technology } from "@/components/sections/Technology";
import { WhatIDo } from "@/components/sections/WhatIDo";

export default function Home() {
  return (
    <>
      {/* 情報設計: 何者か → 証拠 → 実績 → なぜできるか */}
      <Hero />
      <Proof />
      <SelectedWorks />
      <WhatIDo />
      <CaseStudy />
      <AiWorkflow />
      <About />
      <Speaking />
      <Technology />
      <Contact />
    </>
  );
}
