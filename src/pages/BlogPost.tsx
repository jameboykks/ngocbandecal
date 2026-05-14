import { Link, useParams, Navigate } from 'react-router-dom';
import { Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import { POSTS, SITE } from '../data/site';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const idx = POSTS.findIndex(p => p.slug === slug);
  const post = POSTS[idx];
  if (!post) return <Navigate to="/blog" replace />;
  const next = POSTS[(idx + 1) % POSTS.length];
  const related = POSTS.filter((_, i) => i !== idx).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={post.cat}
        title={post.title}
        cover={post.cover}
        crumbs={[
          { label: 'Blog', to: '/blog' },
          { label: post.cat },
        ]}
      />

      <article className="section-y bg-bg-primary">
        <div className="container-x max-w-4xl">
          <div className="flex items-center gap-4 text-[11px] tracking-[0.2em] uppercase text-text-secondary mb-10 pb-6 border-b border-border-gold">
            <span>{post.date}</span>
            <span>•</span>
            <span className="flex items-center gap-1.5"><Clock size={12} /> {post.readTime}</span>
            <span>•</span>
            <span className="text-accent">{post.cat}</span>
          </div>

          <div className="prose-gold space-y-6 text-text-primary leading-relaxed">
            {post.body.map((para, i) => (
              <p key={i} className={i === 0 ? 'text-xl font-serif italic text-text-secondary first-letter:font-display first-letter:text-5xl first-letter:text-accent first-letter:float-left first-letter:mr-3 first-letter:mt-1' : 'text-lg'}>
                {para}
              </p>
            ))}
          </div>

          {/* CTA inside post */}
          <div className="mt-16 p-8 bg-bg-card border border-border-gold text-center">
            <div className="eyebrow mb-4 justify-center">Cần Tư Vấn?</div>
            <h3 className="h-display text-3xl md:text-4xl mb-4">
              GỌI NGAY <span className="text-gold-gradient">{SITE.hotline}</span>
            </h3>
            <p className="text-text-secondary mb-5 font-serif italic">Đội ngũ Ngọc Bàn sẵn sàng tư vấn miễn phí mọi câu hỏi về dịch vụ.</p>
            <Link to="/lien-he" className="inline-flex items-center gap-2 px-6 py-3 border border-accent text-accent text-[12px] tracking-[0.25em] uppercase hover:bg-accent hover:text-bg-primary transition">
              Liên Hệ Tư Vấn <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </article>

      {/* Related */}
      <section className="section-y bg-bg-secondary border-t border-border-gold">
        <div className="container-x">
          <div className="flex items-center justify-between mb-10">
            <h3 className="h-display text-3xl md:text-4xl">BÀI VIẾT <span className="text-gold-gradient">LIÊN QUAN</span></h3>
            <Link to="/blog" className="hidden md:inline-flex items-center gap-2 text-[12px] tracking-[0.25em] uppercase text-text-secondary hover:text-accent transition">
              Xem tất cả <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {related.map(p => (
              <Link to={`/blog/${p.slug}`} key={p.slug} className="group block">
                <div className="aspect-[16/10] overflow-hidden border border-border-gold mb-4 bg-bg-card">
                  <img src={p.cover} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                </div>
                <div className="text-[10px] tracking-[0.25em] uppercase text-accent mb-2">{p.cat}</div>
                <h4 className="font-display text-lg tracking-wider group-hover:text-accent transition">{p.title}</h4>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Prev/Next nav */}
      <section className="border-y border-border-gold">
        <div className="container-x flex items-center justify-between py-8 gap-4">
          <Link to="/blog" className="inline-flex items-center gap-2 text-[12px] tracking-[0.25em] uppercase text-text-secondary hover:text-accent transition">
            <ArrowLeft size={14} /> Tất cả bài viết
          </Link>
          <Link to={`/blog/${next.slug}`} className="inline-flex items-center gap-3 group">
            <div className="text-right">
              <div className="text-[11px] tracking-[0.25em] uppercase text-text-secondary">Bài kế tiếp</div>
              <div className="font-display text-base md:text-lg tracking-wider text-text-primary group-hover:text-accent transition truncate max-w-[300px]">{next.title}</div>
            </div>
            <ArrowRight size={20} className="text-accent group-hover:translate-x-1 transition" />
          </Link>
        </div>
      </section>
    </>
  );
}
