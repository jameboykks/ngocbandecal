import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/site';
import 'swiper/css';
import 'swiper/css/pagination';

export default function Testimonials() {
  return (
    <section id="testimonials" className="section-y bg-bg-secondary relative">
      <div className="container-x">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="eyebrow mb-5 justify-center">Cảm Nhận Khách Hàng</div>
          <h2 className="h-display text-5xl md:text-6xl lg:text-7xl mb-5">
            <span className="text-gold-gradient">5.000+</span> KHÁCH HÀNG<br />ĐÃ TIN TƯỞNG
          </h2>
        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={24}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="!pb-14"
        >
          {TESTIMONIALS.map((t, i) => (
            <SwiperSlide key={i}>
              <div className="relative h-full p-8 md:p-10 bg-bg-card border border-border-gold gold-hover-glow group">
                <Quote
                  size={72}
                  className="absolute top-4 right-4 text-accent/[0.07] group-hover:text-accent/15 transition-colors"
                />
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={14} className="fill-accent text-accent" />
                  ))}
                </div>
                <p className="font-serif italic text-lg leading-relaxed text-text-primary mb-8 relative z-10">
                  "{t.text}"
                </p>
                <div className="pt-5 border-t border-border-gold">
                  <div className="font-display text-xl tracking-wider">{t.name}</div>
                  <div className="text-xs uppercase tracking-[0.18em] text-text-secondary mt-1">{t.area}</div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style>{`
        .swiper-pagination-bullet {
          background: var(--color-accent) !important;
          opacity: 0.3;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
          width: 24px;
          border-radius: 4px;
        }
      `}</style>
    </section>
  );
}
