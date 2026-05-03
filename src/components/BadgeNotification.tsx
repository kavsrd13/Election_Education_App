// src/components/BadgeNotification.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award } from 'lucide-react';

interface BadgeNotificationProps {
  badge: string | null;
  message?: string;
}

export const BadgeNotification: React.FC<BadgeNotificationProps> = ({
  badge,
  message,
}) => {
  return (
    <AnimatePresence>
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: -60, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -60, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
        >
          <div
            className="flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #1A3A6B, #2563EB)',
              border: '2px solid rgba(255,255,255,0.2)',
            }}
          >
            <motion.div
              animate={{ rotate: [0, -20, 20, -20, 0], scale: [1, 1.3, 1] }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-2xl"
            >
              🏅
            </motion.div>
            <div>
              <div className="text-white font-display font-bold text-sm">
                Badge Unlocked: {badge}!
              </div>
              {message && (
                <div className="text-blue-200 text-xs mt-0.5">{message}</div>
              )}
            </div>
            <Award className="text-civic-gold" size={20} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
