import Image from 'next/image';
import PageTransition from '../../../components/PageTransition';
import { CONTACTS } from '../../../content/contact.js';

export const metadata = {
  title: 'Contact - Luke McMeans',
};

export default function ContactPage() {
  return (
    <PageTransition>
      <div className="contacts">
        {CONTACTS.map((item, index) => (
          <a key={item.href} href={item.href} className="contact-item glass-card" target="_blank" rel="noopener noreferrer">
            <Image
              className="contact-image"
              src={item.src}
              width={50}
              height={50}
              alt=""
              priority={index === 0}
            />
            {item.label}
          </a>
        ))}
      </div>
    </PageTransition>
  );
}
