import PageHero from '../components/PageHero';
import SEO from '../components/SEO';
import { SITE } from '../data/site';

const SECTIONS = [
  {
    title: '1. Thông tin chúng tôi thu thập',
    body: [
      'Khi anh/chị liên hệ qua website ngocbandecal.vn, gọi hotline, gửi tin nhắn qua Zalo/Messenger hoặc điền form báo giá, chúng tôi có thể thu thập:',
      '• Họ tên',
      '• Số điện thoại',
      '• Email (nếu cung cấp)',
      '• Dòng xe và loại dịch vụ quan tâm',
      '• Nội dung tin nhắn',
      'Ngoài ra, hệ thống tự động ghi lại một số dữ liệu kỹ thuật như loại trình duyệt, hệ điều hành, địa chỉ IP, thời gian truy cập và đường dẫn trang đã xem (qua công cụ phân tích Google Analytics).',
    ],
  },
  {
    title: '2. Mục đích sử dụng thông tin',
    body: [
      'Dữ liệu thu thập được sử dụng cho các mục đích sau:',
      '• Liên hệ tư vấn báo giá dịch vụ wrap, PPF, film cách nhiệt, detailing và tem xe',
      '• Đặt lịch thi công và chăm sóc khách hàng',
      '• Bảo hành sau dịch vụ',
      '• Gửi thông tin khuyến mãi, dịch vụ mới (chỉ khi được sự đồng ý)',
      '• Cải thiện chất lượng website và trải nghiệm người dùng',
      '• Tuân thủ nghĩa vụ pháp lý theo quy định pháp luật Việt Nam',
    ],
  },
  {
    title: '3. Chia sẻ thông tin với bên thứ ba',
    body: [
      'Chúng tôi KHÔNG bán, cho thuê hay chia sẻ thông tin cá nhân của khách hàng cho mục đích thương mại của bên thứ ba. Một số bên thứ ba có thể tiếp xúc dữ liệu của khách:',
      '• Google Analytics — phân tích lưu lượng và hành vi truy cập website (dữ liệu ẩn danh)',
      '• Google Ads — đo lường hiệu quả chiến dịch quảng cáo (nếu khách hàng đến từ quảng cáo)',
      '• Vercel — đơn vị cung cấp hosting website (lưu trữ logs kỹ thuật)',
      '• Zalo, Facebook Messenger — khi khách hàng chủ động chat qua các nền tảng này',
      'Các bên thứ ba này đều có chính sách bảo mật riêng và cam kết tuân thủ tiêu chuẩn quốc tế.',
    ],
  },
  {
    title: '4. Cookies và công nghệ theo dõi',
    body: [
      'Website ngocbandecal.vn sử dụng cookies để:',
      '• Ghi nhớ tùy chọn người dùng (ngôn ngữ, theme)',
      '• Đo lường lưu lượng truy cập qua Google Analytics',
      '• Tối ưu quảng cáo Google Ads (nếu áp dụng)',
      'Anh/chị có thể tắt cookies trong trình duyệt bất cứ lúc nào. Tuy nhiên một số tính năng có thể không hoạt động đầy đủ.',
    ],
  },
  {
    title: '5. Lưu trữ và bảo mật dữ liệu',
    body: [
      'Thông tin khách hàng được lưu trữ trên hệ thống nội bộ của Ngọc Bàn Decal với các biện pháp bảo mật:',
      '• Mã hóa kết nối HTTPS/SSL toàn bộ website',
      '• Truy cập dữ liệu khách hàng chỉ giới hạn cho nhân viên có trách nhiệm',
      '• Sao lưu định kỳ và bảo vệ khỏi truy cập trái phép',
      'Thời gian lưu trữ: tối đa 3 năm kể từ lần liên hệ cuối, sau đó dữ liệu sẽ được xóa hoặc ẩn danh hóa.',
    ],
  },
  {
    title: '6. Quyền của khách hàng',
    body: [
      'Theo Nghị định 13/2023/NĐ-CP về Bảo vệ dữ liệu cá nhân, khách hàng có các quyền:',
      '• Quyền được biết thông tin nào được thu thập',
      '• Quyền truy cập, chỉnh sửa thông tin của mình',
      '• Quyền yêu cầu xóa thông tin cá nhân khỏi hệ thống',
      '• Quyền rút lại sự đồng ý cho phép xử lý dữ liệu',
      '• Quyền khiếu nại nếu phát hiện vi phạm',
      `Để thực hiện các quyền trên, vui lòng liên hệ ${SITE.email} hoặc hotline ${SITE.hotline}.`,
    ],
  },
  {
    title: '7. Trẻ em dưới 16 tuổi',
    body: [
      'Website không hướng đến đối tượng trẻ em dưới 16 tuổi và không cố ý thu thập thông tin của trẻ em. Nếu phát hiện đã thu thập nhầm, chúng tôi sẽ xóa ngay lập tức.',
    ],
  },
  {
    title: '8. Thay đổi chính sách',
    body: [
      'Chính sách bảo mật có thể được cập nhật khi có thay đổi về dịch vụ hoặc quy định pháp luật. Phiên bản mới sẽ được đăng tại trang này kèm ngày hiệu lực. Khuyến nghị khách hàng kiểm tra định kỳ.',
    ],
  },
  {
    title: '9. Thông tin liên hệ',
    body: [
      'Mọi câu hỏi về chính sách bảo mật, vui lòng liên hệ:',
      `• Đơn vị: ${SITE.fullName}`,
      `• Chủ shop: ${SITE.owner}`,
      `• Địa chỉ: ${SITE.address}`,
      `• Hotline: ${SITE.hotline}`,
      `• Email: ${SITE.email}`,
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Chính Sách Bảo Mật"
        description="Chính sách bảo mật thông tin khách hàng tại Ngọc Bàn Decal Đà Nẵng. Tuân thủ Nghị định 13/2023/NĐ-CP về Bảo vệ dữ liệu cá nhân."
        path="/chinh-sach-bao-mat"
      />
      <PageHero
        eyebrow="Điều Khoản Pháp Lý"
        title="CHÍNH SÁCH"
        highlight="BẢO MẬT"
        subtitle="Cam kết bảo mật thông tin khách hàng — tuân thủ Nghị định 13/2023/NĐ-CP về Bảo vệ dữ liệu cá nhân của Chính phủ Việt Nam."
        crumbs={[{ label: 'Chính sách bảo mật' }]}
      />

      <article className="section-y bg-bg-primary">
        <div className="container-x max-w-3xl">
          <div className="mb-12 pb-8 border-b border-border-gold text-text-secondary">
            <div className="text-[11px] tracking-[0.25em] uppercase text-accent mb-2">Hiệu lực từ</div>
            <div className="font-display text-2xl text-text-primary">26/05/2026</div>
            <p className="mt-4 text-base leading-relaxed font-serif italic">
              Bằng việc sử dụng website {SITE.fullName}, anh/chị đồng ý với các điều khoản nêu trong chính sách này.
              Vui lòng đọc kỹ trước khi cung cấp thông tin cá nhân.
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
            Tài liệu này được soạn theo Nghị định 13/2023/NĐ-CP và Luật An ninh mạng 2018. Nếu có khác biệt
            giữa bản tiếng Việt và bất kỳ bản dịch nào, bản tiếng Việt có giá trị pháp lý cao nhất.
          </div>
        </div>
      </article>
    </>
  );
}
