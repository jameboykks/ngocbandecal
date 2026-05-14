import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { FAQS } from '../data/site';

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="section-y bg-bg-primary relative">
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="eyebrow mb-5">Câu Hỏi Thường Gặp</div>
            <h2 className="h-display text-5xl md:text-6xl mb-6">
              CÒN <span className="text-gold-gradient">THẮC MẮC</span>?
            </h2>
            <p className="font-serif italic text-lg text-text-secondary mb-8">
              Những câu hỏi khách hàng quan tâm nhất khi quyết định wrap, dán PPF hay film cách nhiệt cho xe.
            </p>
            <a href="tel:0969646801" className="inline-flex items-center gap-2 text-[12px] tracking-[0.25em] uppercase text-accent hover:text-accent-light transition">
              Hỏi trực tiếp →
            </a>
          </div>

          <div className="lg:col-span-8">
            <div className="border-t border-border-gold">
              {FAQS.map((f, i) => (
                <div key={i} className="border-b border-border-gold">
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="w-full flex items-start justify-between gap-6 py-6 text-left group"
                  >
                    <span className="flex gap-5 items-start">
                      <span className="font-display text-sm text-accent shrink-0 mt-1">0{i + 1}</span>
                      <span className="font-display text-lg md:text-xl tracking-wider text-text-primary group-hover:text-accent transition">
                        {f.q}
                      </span>
                    </span>
                    <motion.span
                      animate={{ rotate: open === i ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="shrink-0 w-9 h-9 rounded-full border border-border-gold flex items-center justify-center group-hover:border-accent transition"
                    >
                      <Plus size={16} className="text-accent" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pl-12 pr-12 pb-6 text-text-secondary leading-relaxed">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
