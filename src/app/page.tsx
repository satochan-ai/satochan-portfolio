import { About } from "@/components/sections/About";
import { AiWorkflow } from "@/components/sections/AiWorkflow";
import { CaseStudy } from "@/components/sections/CaseStudy";
import { Consultation } from "@/components/sections/Consultation";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Philosophy } from "@/components/sections/Philosophy";
import { Proof } from "@/components/sections/Proof";
import { SelectedWorks } from "@/components/sections/SelectedWorks";
import { Speaking } from "@/components/sections/Speaking";
import { Technology } from "@/components/sections/Technology";
import { UseCases } from "@/components/sections/UseCases";
import { WhatIDo } from "@/components/sections/WhatIDo";

export default function Home() {
  return (
    <>
      {/* 情報設計: 何者か → 経験と事例 → 改善の進め方 → 相談 */}
      <Hero />
      <Proof />
      <SelectedWorks />
      <CaseStudy />
      <WhatIDo />
      <Philosophy />
      <AiWorkflow />
      <About />
      <Speaking />
      <Consultation />
      <UseCases />
      <Technology />
      <Contact />
    </>
  );
}
