import React from "react";
import { motion } from "framer-motion";
import { FaLeaf, FaCalculator, FaTools } from "react-icons/fa";
import "../styles/howworks.css";

const cardVariants = {
  offscreen: { opacity: 0, y: 40, scale: 0.95 },
  onscreen: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", bounce: 0.2, duration: 0.8 }
  }
};

const HowWorks: React.FC = () => (
  <section id="How-works" className="how-it-works">
    <motion.h2
      className="howworks-title"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      Como Funciona
    </motion.h2>

    <div className="steps-grid">
      <motion.div
        className="step-card"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.5 }}
        variants={cardVariants}
      >
        <FaLeaf size={48} color="#2d5a27" />
        <h3>Escolha uma ferramenta sustentável</h3>
        <p>
          Navegue por utilitários que facilitam sua rotina e promovem práticas digitais mais verdes e conscientes.
        </p>
      </motion.div>

      <motion.div
        className="step-card"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.5 }}
        variants={cardVariants}
      >
        <FaCalculator size={48} color="#4a7c59" />
        <h3>Use calculadoras e conversores</h3>
        <p>
          Aproveite ferramentas como calculadoras ambientais, conversores de unidades, geradores e validadores, tudo em um só lugar.
        </p>
      </motion.div>

      <motion.div
        className="step-card"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.5 }}
        variants={cardVariants}
      >
        <FaTools size={48} color="#6ba368" />
        <h3>Ganhe tempo e produtividade</h3>
        <p>
          Simplifique tarefas do dia a dia, otimize processos e contribua para um mundo digital mais eficiente e sustentável.
        </p>
      </motion.div>
    </div>

    <motion.a
      href="#about-section"
      className="btn-primary howworks-btn"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
    >
      Explorar Utilitários
    </motion.a>
  </section>
);

export default HowWorks;
