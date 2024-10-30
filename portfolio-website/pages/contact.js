import Image from "next/image";
import { motion } from 'framer-motion';
import { variants } from '../utils/variants.js';

export default function HomePage() {
  return (
    <motion.div
          variants={variants}
          initial="initial"
          animate="enter"
          exit="exit"
        >
      <title>Luke McMeans - Contact</title>
      <div className="contacts">
        <a href="mailto:elukemcmeans@gmail.com" className="contact-item" target="_blank" rel="noopener noreferrer">
          <Image
            className="contact-image"
            src='/images/socials/mail.png'
            width={50}
            height={50}
          />
          elukemcmeans@gmail.com
        </a>
        <a href="tel:+1-703-431-6232" className="contact-item" target="_blank" rel="noopener noreferrer">
          <Image
            className="contact-image"
            src='/images/socials/phone.png'
            width={50}
            height={50}
          />
          (703) 431-6232
        </a>
        <a href="https://linkedin.com/in/luke-mcmeans" className="contact-item" target="_blank" rel="noopener noreferrer">
          <Image
            className="contact-image"
            src='/images/socials/linkedin.png'
            width={50}
            height={50}
          />
          in/luke-mcmeans
        </a>
        <a href="https://github.com/McMeans" className="contact-item" target="_blank" rel="noopener noreferrer">
          <Image
            className="contact-image"
            src='/images/socials/github.png'
            width={50}
            height={50}
          />
          McMeans
        </a>
        <a href="https://discord.com/" className="contact-item" target="_blank" rel="noopener noreferrer">
          <Image
            className="contact-image"
            src='/images/socials/discord.png'
            width={50}
            height={50}
          />
          @luke.mcmeans
        </a>
      </div>
    </motion.div>
  );
}