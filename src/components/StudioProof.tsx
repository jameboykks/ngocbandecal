import { ArrowRight, MapPin } from 'lucide-react';
import { SITE } from '../data/site';

const PHOTOS = [
  {
    src: '/images/ngoc-ban/studio-facade-supercars.jpeg',
    title: 'Mặt tiền studio',
    desc: 'Biển hiệu Ngọc Bàn, khu vực thi công và các xe đã hoàn thiện ngay tại xưởng.',
    className: 'lg:col-span-7',
  },
  {
    src: '/images/ngoc-ban/studio-workshop-cars.jpeg',
    title: 'Khoang thi công',
    desc: 'Không gian làm việc nhiều xe, ánh sáng rõ để kiểm tra bề mặt và mép dán.',
    className: 'lg:col-span-5',
  },
];

export default function StudioProof() {
  return (
    <section id="studio" className="section-y bg-bg-primary overflow-hidden">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-5">
            <div className="eyebrow mb-5">Không Gian Thật</div>
            <h2 className="h-display text-5xl md:text-6xl">
              STUDIO <span className="text-gold-gradient">NGỌC BÀN</span>
            </h2>
            <p className="mt-6 max-w-xl font-serif text-xl italic leading-relaxed text-text-secondary">
              Không gian thi công chuyên nghiệp tại Đà Nẵng, nơi mỗi bề mặt sơn được xử lý kỹ trước khi bàn giao.
            </p>
          </div>

          <div className="lg:col-span-7 border-l border-border-gold pl-6">
            <div className="flex items-start gap-4">
              <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/35 text-accent">
                <MapPin size={18} />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-[0.24em] text-text-muted">Địa chỉ studio</div>
                <div className="mt-1 text-lg font-medium text-text-primary">{SITE.address}</div>
                <a href="/lien-he" className="mt-4 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.22em] text-accent">
                  Xem đường đi <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-12">
          {PHOTOS.map((photo) => (
            <figure key={photo.src} className={`${photo.className} group relative min-h-[360px] overflow-hidden bg-bg-contrast`}>
              <img
                src={photo.src}
                alt={photo.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-contrast via-bg-contrast/24 to-transparent" />
              <figcaption className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="mb-3 h-px w-12 bg-accent" />
                <h3 className="font-display text-3xl uppercase tracking-[0.08em] text-bg-primary">{photo.title}</h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-bg-primary/72">{photo.desc}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
