import { QrCode } from 'lucide-react';
import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { socials } from '../data';


import QRCode from 'qrcode';

export function Dock() {
  const [showQR, setShowQR] = useState(false);
  const qrCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (showQR && qrCanvasRef.current) {
      QRCode.toCanvas(
        qrCanvasRef.current,
        'https://divyamjha.vercel.app/',
        {
          width: 200,
          margin: 1,
          color: {
            dark: '#000000',
            light: '#ffffff'
          }
        },
        (error: Error | null | undefined) => {
          if (error) console.error(error);
        }
      );
    }
  }, [showQR]);

  return (
    <>
      <motion.div
        className="dock"
        initial={{ y: 100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 20 }}
      >
        <motion.button
          className="dock-item"
          onClick={() => setShowQR(true)}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          title="QR Code"
        >
          <QrCode size={18} />
        </motion.button>

        <div className="dock-divider" />

        <motion.a
          className="dock-item"
          href={socials.github}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          title="GitHub"
        >
          <FaGithub size={18} />
        </motion.a>

        <motion.a
          className="dock-item"
          href={socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          title="LinkedIn"
        >
          <FaLinkedin size={18} />
        </motion.a>

        <motion.a
          className="dock-item"
          href={socials.x}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          title="X (Twitter)"
        >
          <FaXTwitter size={18} />
        </motion.a>

      </motion.div>

      <AnimatePresence>
        {showQR && (
          <motion.div
            className="qr-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowQR(false)}
          >
            <motion.div
              className="qr-modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3>Scan to visit</h3>
              <canvas ref={qrCanvasRef} width={200} height={200} style={{ imageRendering: 'pixelated' }} />
              <button className="qr-close" onClick={() => setShowQR(false)}>
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

