import React, { useEffect } from "react";
import { motion } from "framer-motion";
import "../styles/home.css";
import About from "./About";
import Contact from "./Contact";
import HowWorks from "./HowWorks";

const Home: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="home">
      <div className="hero">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Bem-vindo ao <strong>SIMPLIFY</strong>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Encontre ferramentas e apps úteis em segundos! <br />
          O <strong>SIMPLIFY</strong> reúne as melhores soluções para você simplificar sua vida com facilidade.
        </motion.p>
        <motion.a
          href="#How-works"
          className="btn-primary"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Como funciona
        </motion.a>
      </div>
    </section>
  );
};

export default Home;
