import PageHero from '../components/PageHero';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import { ExternalLink, ZoomIn } from 'lucide-react';

const PRICE_IMAGES = [
  {
    title: 'Bảng giá PPF Film ô tô',
    desc: 'Các gói PPF theo thương hiệu, dòng xe và thời gian bảo hành.',
    src: '/images/ngoc-ban/price-ppf.jfif',
  },
  {
    title: 'Bảng giá wrap đổi màu',
    desc: 'Các gói wrap đổi màu theo sedan, SUV, MPV và bảo hành.',
    src: '/images/ngoc-ban/price-wrap.jfif',
  },
  {
    title: 'Bảng giá detailing',
    desc: 'Rửa xe, vệ sinh nội thất, đánh bóng, tẩy ố và các gói chăm sóc xe.',
    src: '/images/ngoc-ban/price-detailing.jfif',
  },
];

const TABLE = [
  {
    cat: 'WRAP ĐỔI MÀU',
    rows: [
      { item: 'Xe 4 chỗ — Avery Standard', price: '8 - 12 triệu' },
      { item: 'Xe 4 chỗ — Teckwrap Premium', price: '12 - 18 triệu' },
      { item: 'Xe 4 chỗ — 3M Pro', price: '15 - 22 triệu' },
      { item: 'SUV 7 chỗ — Avery Standard', price: '10 - 15 triệu' },
      { item: 'SUV 7 chỗ — Teckwrap Premium', price: '15 - 22 triệu' },
      { item: 'Xe sang (Mercedes, BMW, Audi...)', price: 'Liên hệ' },
    ],
  },
  {
    cat: 'DÁN PPF',
    rows: [
      { item: 'PPF đầu xe 4 chỗ', price: '6 - 10 triệu' },
      { item: 'PPF toàn xe 4 chỗ — 3M Pro', price: '20 - 35 triệu' },
      { item: 'PPF toàn xe 4 chỗ — Premium', price: '35 - 60 triệu' },
      { item: 'PPF toàn xe SUV 7 chỗ', price: '30 - 70 triệu' },
      { item: 'PPF xe sang (Porsche, Range Rover)', price: 'Liên hệ' },
    ],
  },
  {
    cat: 'FILM CÁCH NHIỆT',
    rows: [
      { item: 'Film cách nhiệt thường — toàn xe', price: '3 - 5 triệu' },
      { item: 'Ceramax cao cấp — toàn xe', price: '8 - 14 triệu' },
      { item: '3M Crystalline — toàn xe', price: '15 - 25 triệu' },
      { item: 'Film chuyển màu (Chameleon)', price: '12 - 20 triệu' },
    ],
  },
  {
    cat: 'CHĂM SÓC XE',
    rows: [
      { item: 'Đánh bóng + phủ Ceramic 9H', price: '3 - 6 triệu' },
      { item: 'Detailing nội thất sâu', price: '1.5 - 3 triệu' },
      { item: 'Vệ sinh khoang máy', price: '500k - 1.5 triệu' },
      { item: 'Khử mùi diệt khuẩn ozone', price: '500k - 1 triệu' },
    ],
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Bảng Giá Tham Khảo"
        title="MINH BẠCH"
        highlight="& CẠNH TRANH"
        subtitle="Bảng giá chi tiết theo từng dịch vụ và dòng xe. Giá thực tế tuỳ chất liệu và độ phức tạp — vui lòng liên hệ để nhận báo giá chính xác."
        crumbs={[{ label: 'Bảng giá' }]}
      />

      <Pricing />

      <section id="bang-gia-goc" className="section-y bg-bg-primary">
        <div className="container-x">
          <div className="mb-10 grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <div className="eyebrow mb-5">Bảng Giá Gốc Tại Studio</div>
              <h2 className="h-display text-4xl md:text-5xl">
                XEM NHANH <span className="text-gold-gradient">BẢNG GIÁ</span>
              </h2>
            </div>
            <p className="font-serif text-lg italic leading-relaxed text-text-secondary lg:col-span-5">
              Tham khảo nhanh các hạng mục phổ biến tại studio. Chi phí thực tế sẽ được tư vấn theo dòng xe, vật liệu và tình trạng bề mặt.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {PRICE_IMAGES.map((item) => (
              <article key={item.src} className="luxury-surface border border-border-gold p-3">
                <a href={item.src} target="_blank" rel="noopener" className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden bg-bg-contrast">
                    <img
                      src={item.src}
                      alt={item.title}
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-contrast/72 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                    <div className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-accent text-bg-primary opacity-0 transition group-hover:opacity-100">
                      <ZoomIn size={18} />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-2xl uppercase tracking-[0.08em] text-text-primary">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-text-secondary">{item.desc}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                      Phóng to ảnh <ExternalLink size={13} />
                    </span>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-bg-secondary">
        <div className="container-x">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="eyebrow mb-5 justify-center">Chi Tiết Theo Dịch Vụ</div>
            <h2 className="h-display text-4xl md:text-5xl">
              GIÁ <span className="text-gold-gradient">CHI TIẾT</span>
            </h2>
          </div>

          <div className="space-y-12">
            {TABLE.map(group => (
              <div key={group.cat}>
                <div className="flex items-center gap-4 mb-4">
                  <h3 className="font-display text-2xl tracking-wider text-accent">{group.cat}</h3>
                  <span className="flex-1 h-px bg-border-gold" />
                </div>
                <div className="border border-border-gold overflow-hidden">
                  {group.rows.map((r, i) => (
                    <div
                      key={r.item}
                      className={[
                        'flex justify-between items-center px-6 py-4 hover:bg-accent/5 transition-colors',
                        i % 2 === 0 ? 'bg-bg-card' : 'bg-bg-primary',
                      ].join(' ')}
                    >
                      <span className="text-text-primary text-sm md:text-base">{r.item}</span>
                      <span className="font-display text-base md:text-lg text-gold-gradient tracking-wider">{r.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-text-secondary max-w-2xl mx-auto font-serif italic">
            ⚠️ Bảng giá mang tính tham khảo, áp dụng cho thời điểm hiện tại. Giá có thể thay đổi theo chính sách hãng và biến động chất liệu nhập khẩu.
          </p>
        </div>
      </section>

      <FAQ />
    </>
  );
}
