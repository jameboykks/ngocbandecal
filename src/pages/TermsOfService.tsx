import PageHero from '../components/PageHero';
import SEO from '../components/SEO';
import { SITE } from '../data/site';

const SECTIONS = [
  {
    title: '1. Giới thiệu dịch vụ',
    body: [
      `${SITE.fullName} cung cấp các dịch vụ:`,
      '• Wrap đổi màu xe ô tô bằng decal cao cấp (Avery Dennison, 3M, Teckwrap USA...)',
      '• Dán PPF (Paint Protection Film) bảo vệ sơn xe',
      '• Dán film cách nhiệt cho kính ô tô',
      '• Tem xe trang trí, decal sườn, decal carbon',
      '• Đánh bóng, hiệu chỉnh bề mặt sơn',
      '• Detailing — chăm sóc xe chuyên sâu, dọn nội thất',
      `Địa chỉ thi công: ${SITE.address}.`,
    ],
  },
  {
    title: '2. Quy trình đặt lịch',
    body: [
      '• Khách hàng liên hệ qua hotline, Zalo, Messenger hoặc form trên website để được tư vấn',
      '• Nhân viên tư vấn báo giá dựa trên dòng xe, chất liệu chọn và phạm vi thi công',
      '• Đặt lịch và đặt cọc (nếu có) — thường 10-30% giá trị dịch vụ',
      '• Khách hàng mang xe đến xưởng theo lịch hẹn',
      '• Thi công và bàn giao xe theo thời gian thống nhất',
      `• Thanh toán phần còn lại khi nhận xe`,
      'Mọi báo giá đều là báo giá tham khảo cho đến khi có xác nhận từ nhân viên kỹ thuật sau khi kiểm tra xe trực tiếp.',
    ],
  },
  {
    title: '3. Chính sách bảo hành',
    body: [
      'Thời gian bảo hành tùy thuộc chất liệu và dịch vụ:',
      '• Wrap đổi màu: 2-3 năm tùy hãng decal',
      '• PPF cao cấp: 5-10 năm (tự phục hồi vết xước nhẹ)',
      '• Film cách nhiệt: 3-5 năm',
      '• Tem xe, decal sườn: 1-2 năm',
      '',
      'Bảo hành KHÔNG áp dụng trong các trường hợp:',
      '• Tai nạn, va chạm gây bong tróc, rách decal/PPF',
      '• Tự ý sửa chữa, can thiệp lên lớp wrap/PPF tại nơi khác',
      '• Sử dụng hóa chất tẩy rửa mạnh không phù hợp',
      '• Bảo dưỡng không đúng quy định (sẽ được hướng dẫn khi bàn giao xe)',
      `Khi cần bảo hành, vui lòng đem xe đến ${SITE.address} hoặc liên hệ hotline ${SITE.hotline}.`,
    ],
  },
  {
    title: '4. Trách nhiệm của khách hàng',
    body: [
      '• Cung cấp thông tin xe và tình trạng sơn trung thực khi tư vấn',
      '• Thanh toán đúng thời hạn đã thống nhất',
      '• Tuân thủ hướng dẫn bảo dưỡng sau thi công (rửa xe đúng cách, tránh hóa chất mạnh trong 7 ngày đầu)',
      '• Báo lỗi/khiếu nại trong thời hạn bảo hành để được xử lý',
    ],
  },
  {
    title: '5. Trách nhiệm của Ngọc Bàn Decal',
    body: [
      '• Thi công đúng kỹ thuật, dùng đúng chất liệu đã thỏa thuận',
      '• Hoàn thành xe theo đúng thời gian cam kết',
      '• Bảo quản xe trong thời gian thi công tại xưởng',
      '• Thực hiện bảo hành kịp thời theo điều khoản',
      '• Bảo mật thông tin khách hàng theo Chính sách bảo mật',
    ],
  },
  {
    title: '6. Hủy lịch và hoàn cọc',
    body: [
      '• Khách hàng có thể hủy lịch trước ít nhất 24 giờ — được hoàn cọc 100%',
      '• Hủy trong vòng 24 giờ trước lịch hẹn — hoàn cọc 50%',
      '• Vắng mặt không báo trước — không hoàn cọc (để bù chi phí chuẩn bị)',
      'Ngọc Bàn có quyền hủy lịch trong trường hợp bất khả kháng (thiên tai, sự cố thiết bị) và hoàn cọc 100% cho khách.',
    ],
  },
  {
    title: '7. Giới hạn trách nhiệm',
    body: [
      'Ngọc Bàn Decal không chịu trách nhiệm với các thiệt hại gián tiếp như:',
      '• Mất thu nhập do xe không sử dụng được trong thời gian thi công đã thông báo',
      '• Hư hỏng do xe đã có khuyết tật ẩn (sơn yếu, gỉ sét bên trong) trước khi đến xưởng',
      '• Tình huống bất khả kháng (thiên tai, đình công, dịch bệnh)',
      'Trách nhiệm tối đa trong mọi trường hợp không vượt quá giá trị dịch vụ khách hàng đã thanh toán.',
    ],
  },
  {
    title: '8. Sở hữu trí tuệ',
    body: [
      'Hình ảnh, video, logo, tên thương hiệu "Ngọc Bàn Decal" và nội dung trên website thuộc sở hữu của chúng tôi. Cấm sao chép, sử dụng lại cho mục đích thương mại nếu không được cho phép bằng văn bản.',
      'Hình ảnh xe của khách hàng có thể được sử dụng cho mục đích quảng bá (Facebook, website, gallery) — nếu khách không muốn, vui lòng thông báo trước khi thi công.',
    ],
  },
  {
    title: '9. Giải quyết tranh chấp',
    body: [
      'Mọi tranh chấp phát sinh sẽ được ưu tiên giải quyết qua thương lượng, hòa giải. Nếu không thành, các bên đồng ý đưa ra Tòa án có thẩm quyền tại Đà Nẵng theo pháp luật Việt Nam.',
    ],
  },
  {
    title: '10. Điều khoản bổ sung',
    body: [
      'Điều khoản dịch vụ có thể được cập nhật theo thời gian. Phiên bản mới sẽ được đăng tại trang này. Việc tiếp tục sử dụng website/dịch vụ sau khi cập nhật được coi là đồng ý với phiên bản mới.',
      `Mọi thắc mắc về điều khoản, vui lòng liên hệ ${SITE.email} hoặc hotline ${SITE.hotline}.`,
    ],
  },
];

export default function TermsOfService() {
  return (
    <>
      <SEO
        title="Điều Khoản Dịch Vụ"
        description="Điều khoản và điều kiện sử dụng dịch vụ wrap, PPF, film cách nhiệt tại Ngọc Bàn Decal Đà Nẵng. Bảo hành, hủy lịch, trách nhiệm các bên."
        path="/dieu-khoan"
      />
      <PageHero
        eyebrow="Điều Khoản Pháp Lý"
        title="ĐIỀU KHOẢN"
        highlight="DỊCH VỤ"
        subtitle="Điều khoản sử dụng dịch vụ wrap, PPF, film cách nhiệt tại Ngọc Bàn Decal — quy định quyền và nghĩa vụ của các bên."
        crumbs={[{ label: 'Điều khoản' }]}
      />

      <article className="section-y bg-bg-primary">
        <div className="container-x max-w-3xl">
          <div className="mb-12 pb-8 border-b border-border-gold text-text-secondary">
            <div className="text-[11px] tracking-[0.25em] uppercase text-accent mb-2">Hiệu lực từ</div>
            <div className="font-display text-2xl text-text-primary">26/05/2026</div>
            <p className="mt-4 text-base leading-relaxed font-serif italic">
              Bằng việc đặt lịch dịch vụ tại {SITE.fullName}, khách hàng đồng ý với các điều khoản dưới đây.
            </p>
          </div>

          <div className="space-y-10">
            {SECTIONS.map((s) => (
              <section key={s.title}>
                <h2 className="font-display text-2xl md:text-3xl tracking-wider text-text-primary mb-5 text-balance">
                  {s.title}
                </h2>
                <div className="space-y-3 text-base leading-relaxed text-text-primary/85">
                  {s.body.map((p, i) => (
                    <p key={i} className="whitespace-pre-line">{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-border-gold text-sm text-text-muted italic font-serif">
            Điều khoản này áp dụng theo pháp luật Việt Nam. Mọi tranh chấp giải quyết tại Tòa án có thẩm quyền tại Đà Nẵng.
          </div>
        </div>
      </article>
    </>
  );
}
