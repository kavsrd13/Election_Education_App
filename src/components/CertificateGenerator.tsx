// src/components/CertificateGenerator.tsx
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Download, Award, Star } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface CertificateGeneratorProps {
  initialName: string;
  quizScore: number | null;
  completedDate: string | null;
  onSave: (name: string) => void;
}

export const CertificateGenerator: React.FC<CertificateGeneratorProps> = ({
  initialName,
  quizScore,
  completedDate,
  onSave,
}) => {
  const [name, setName] = useState(initialName);
  const [isGenerating, setIsGenerating] = useState(false);
  const [saved, setSaved] = useState(!!initialName);
  const certRef = useRef<HTMLDivElement>(null);

  const totalQuestions = 10;
  const scoreText = quizScore !== null ? `${quizScore}/${totalQuestions}` : 'N/A';
  const date =
    completedDate ??
    new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

  const handleSave = () => {
    if (!name.trim()) return;
    onSave(name.trim());
    setSaved(true);
  };

  const handleDownload = async () => {
    if (!certRef.current) return;
    setIsGenerating(true);
    try {
      const canvas = await html2canvas(certRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });
      const pdfW = pdf.internal.pageSize.getWidth();
      const pdfH = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'PNG', 0, 0, pdfW, pdfH);
      pdf.save(`Election-Journey-Certificate-${name.replace(/\s+/g, '-')}.pdf`);
    } catch (err) {
      console.error('PDF generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Name input */}
      {!saved && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <p className="text-sm font-medium text-slate-600">
            🏆 Enter your full name to generate your certificate:
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              placeholder="Your full name..."
              className="flex-1 px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-400 focus:outline-none text-sm bg-white"
              aria-label="Enter your full name for the certificate"
            />
            <button
              onClick={handleSave}
              disabled={!name.trim()}
              className="px-5 py-3 rounded-xl text-white font-semibold text-sm disabled:opacity-50 transition-all"
              style={{ background: 'linear-gradient(135deg, #1A3A6B, #2563EB)' }}
            >
              Generate
            </button>
          </div>
        </motion.div>
      )}

      {/* Certificate preview */}
      {saved && name && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="space-y-4"
        >
          {/* Certificate */}
          <div
            ref={certRef}
            className="certificate-container rounded-2xl overflow-hidden"
            style={{
              background: 'white',
              border: '8px double #1A3A6B',
              padding: '48px',
              minHeight: '420px',
              position: 'relative',
            }}
          >
            {/* Corner decorations */}
            <div
              style={{
                position: 'absolute', top: 16, left: 16, width: 32, height: 32,
                borderTop: '4px solid #FF9933', borderLeft: '4px solid #FF9933',
              }}
            />
            <div
              style={{
                position: 'absolute', top: 16, right: 16, width: 32, height: 32,
                borderTop: '4px solid #FF9933', borderRight: '4px solid #FF9933',
              }}
            />
            <div
              style={{
                position: 'absolute', bottom: 16, left: 16, width: 32, height: 32,
                borderBottom: '4px solid #FF9933', borderLeft: '4px solid #FF9933',
              }}
            />
            <div
              style={{
                position: 'absolute', bottom: 16, right: 16, width: 32, height: 32,
                borderBottom: '4px solid #FF9933', borderRight: '4px solid #FF9933',
              }}
            />

            {/* Header strip */}
            <div
              style={{
                background: 'linear-gradient(135deg, #1A3A6B, #2563EB)',
                margin: '-48px -48px 32px -48px',
                padding: '20px 48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ color: 'white', fontFamily: 'Outfit, sans-serif', fontSize: 22, fontWeight: 800 }}>
                  🗳️ Election Journey
                </div>
                <div style={{ color: '#93C5FD', fontSize: 12, marginTop: 2 }}>
                  Civic Education Program
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <div style={{ width: 24, height: 8, background: '#FF9933', borderRadius: 4 }} />
                <div style={{ width: 24, height: 8, background: '#FFFFFF', borderRadius: 4 }} />
                <div style={{ width: 24, height: 8, background: '#138808', borderRadius: 4 }} />
              </div>
            </div>

            {/* Certificate body */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 48, marginBottom: 8 }}>🏅</div>
              <div
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: 28,
                  fontWeight: 800,
                  color: '#1A3A6B',
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  marginBottom: 4,
                }}
              >
                Responsible Citizen Certificate
              </div>
              <div
                style={{
                  width: 80,
                  height: 3,
                  background: 'linear-gradient(90deg, #FF9933, #2563EB, #138808)',
                  borderRadius: 2,
                  margin: '12px auto',
                }}
              />
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  color: '#64748B',
                  fontSize: 14,
                  marginBottom: 16,
                }}
              >
                This certifies that
              </p>
              <div
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: 36,
                  fontWeight: 800,
                  color: '#FF9933',
                  marginBottom: 16,
                  borderBottom: '2px solid #FED7AA',
                  paddingBottom: 8,
                  display: 'inline-block',
                  minWidth: 320,
                }}
              >
                {name}
              </div>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  color: '#475569',
                  fontSize: 13,
                  lineHeight: 1.7,
                  maxWidth: 600,
                  margin: '16px auto',
                }}
              >
                has successfully completed the <strong>Election Journey</strong> learning program and
                understands the complete election process, voter responsibility, ethical voting,
                EVM/VVPAT awareness, and responsible democratic participation.
              </p>

              {/* Stats row */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 32,
                  marginTop: 20,
                  flexWrap: 'wrap',
                }}
              >
                <div
                  style={{
                    background: '#F0F9FF',
                    border: '1px solid #BAE6FD',
                    borderRadius: 12,
                    padding: '10px 20px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ color: '#0369A1', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>Quiz Score</div>
                  <div style={{ color: '#1A3A6B', fontSize: 22, fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>{scoreText}</div>
                </div>
                <div
                  style={{
                    background: '#F0FDF4',
                    border: '1px solid #BBF7D0',
                    borderRadius: 12,
                    padding: '10px 20px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ color: '#15803D', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>Completed</div>
                  <div style={{ color: '#138808', fontSize: 14, fontWeight: 700, fontFamily: 'Outfit, sans-serif' }}>{date}</div>
                </div>
                <div
                  style={{
                    background: '#FFFBEB',
                    border: '1px solid #FDE68A',
                    borderRadius: 12,
                    padding: '10px 20px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ color: '#B45309', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>Badge</div>
                  <div style={{ color: '#FF9933', fontSize: 18, fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>⭐ Informed Voter</div>
                </div>
              </div>

              {/* Footer */}
              <div
                style={{
                  marginTop: 28,
                  paddingTop: 16,
                  borderTop: '1px dashed #E2E8F0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  color: '#94A3B8',
                  fontSize: 11,
                }}
              >
                <span>🇮🇳</span>
                <span>Election Journey — Civic Education Initiative</span>
                <span>|</span>
                <span>Non-partisan Educational Content</span>
              </div>
            </div>
          </div>

          {/* Download button */}
          <motion.button
            onClick={handleDownload}
            disabled={isGenerating}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 rounded-2xl font-display font-bold text-white text-base flex items-center justify-center gap-3 shadow-lg"
            style={{
              background: isGenerating
                ? '#94A3B8'
                : 'linear-gradient(135deg, #F59E0B, #FF9933, #138808)',
            }}
          >
            {isGenerating ? (
              <>
                <motion.div
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 0.7, ease: 'linear' }}
                />
                Generating PDF...
              </>
            ) : (
              <>
                <Download size={20} />
                Download PDF Certificate
              </>
            )}
          </motion.button>

          {/* Edit name */}
          <button
            onClick={() => setSaved(false)}
            className="w-full py-2 text-sm text-slate-400 hover:text-slate-600 transition-colors"
          >
            ✏️ Change name
          </button>
        </motion.div>
      )}
    </div>
  );
};
