import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Search, HelpCircle, Mail, Phone, MessageSquare, ChevronDown, User, CreditCard, ShieldCheck, Target, ArrowRight, Users } from 'lucide-react';
import { Button } from '../components/Button';
import { cn } from '../lib/utils';

const faqs = [
  {
    question: "Làm thế nào để kết nối tài khoản ngân hàng của tôi?",
    answer: "Bạn có thể kết nối ngân hàng bằng cách vào Tài khoản > Liên kết Ngân hàng. Chọn tổ chức tài chính của bạn từ danh sách và làm theo các bước xác thực an toàn do ngân hàng cung cấp."
  },
  {
    question: "Dữ liệu của tôi có an toàn với Emerald Ledger không?",
    answer: "Chúng tôi dùng mã hóa lượng tử cấp Thụy Sĩ và chủ quyền sinh trắc học đa lớp. Câu chuyện tài chính của bạn được bảo vệ bởi pháo đài kỹ thuật số tiên tiến nhất hiện nay."
  },
  {
    question: "Làm thế nào để thay đổi hạn mức ngân sách hàng tháng?",
    answer: "Vào phần Mục tiêu và chọn 'Cài đặt Ngân sách'. Bạn có thể điều chỉnh hạn mức từng danh mục để phản ánh tốt hơn triết lý tài chính hiện tại của mình."
  },
  {
    question: "Tôi có thể xuất dữ liệu báo cáo sang Excel không?",
    answer: "Có, mọi màn hình phân tích và sổ cái đều có tùy chọn 'Tải xuống'. Bạn có thể xuất dữ liệu dưới định dạng PDF, CSV hoặc Excel để quản lý bên ngoài."
  }
];

export const Support = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl p-16 premium-gradient text-white shadow-2xl shadow-primary/20">
        <div className="relative z-10 max-w-2xl space-y-10">
          <div className="space-y-4">
            <h2 className="text-5xl font-headline font-extrabold tracking-tighter leading-tight">Chúng tôi có thể giúp gì cho bạn?</h2>
            <p className="text-white/70 text-xl font-light leading-relaxed">
              Khám phá các hướng dẫn, tài liệu và sự hỗ trợ chuyên gia cho mọi khía cạnh trong quản lý tài sản của bạn.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-6">
            <Button variant="secondary" className="bg-white text-primary hover:bg-white/90 border-none shadow-xl px-10 py-6 text-base">
              Khám phá Hướng dẫn
            </Button>
            <Button variant="tertiary" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md px-10 py-6 text-base">
              Gửi Yêu cầu
            </Button>
          </div>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none">
          <img 
            src="https://picsum.photos/seed/support-bg/800/800" 
            alt="Support Background" 
            className="w-full h-full object-cover grayscale contrast-150"
            referrerPolicy="no-referrer"
          />
        </div>
      </section>

      {/* Help Categories */}
      <section className="space-y-10">
        <div className="space-y-2">
          <h3 className="text-3xl font-headline font-extrabold text-on-surface tracking-tighter">Danh mục Hỗ trợ</h3>
          <p className="text-on-surface-variant font-medium">Chọn một lĩnh vực để tìm giải pháp hiệu quả nhất</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: User, title: 'Tài khoản', desc: 'Cài đặt, hồ sơ và bảo mật sinh trắc học.', color: 'bg-secondary-container/20 text-secondary' },
            { icon: CreditCard, title: 'Giao dịch', desc: 'Quản lý sổ cái và đồng bộ hóa ngân hàng.', color: 'bg-primary-container/20 text-primary' },
            { icon: Target, title: 'Ngân sách', desc: 'Thiết lập hạn mức và các cột mốc tài chính.', color: 'bg-tertiary-container/10 text-tertiary' },
            { icon: ShieldCheck, title: 'Bảo mật', desc: '2FA, quyền riêng tư và chủ quyền dữ liệu.', color: 'bg-surface-container-high text-on-surface-variant' },
          ].map((cat) => (
            <Card key={cat.title} variant="lowest" className="p-10 flex flex-col items-start gap-8 group hover:shadow-2xl transition-all duration-500 cursor-pointer border border-outline-variant/5">
              <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-inner", cat.color)}>
                <cat.icon size={32} />
              </div>
              <div className="space-y-2">
                <h4 className="font-headline font-bold text-xl text-on-surface">{cat.title}</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed">{cat.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQs & Contact */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8 space-y-10">
          <h3 className="text-3xl font-headline font-extrabold text-on-surface tracking-tighter">Câu hỏi Thường gặp</h3>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-surface-container-low rounded-2xl overflow-hidden shadow-sm transition-all border border-outline-variant/5">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex justify-between items-center p-8 text-left hover:bg-white transition-all group"
                >
                  <span className="font-headline font-bold text-lg text-on-surface group-hover:text-primary transition-colors">{faq.question}</span>
                  <ChevronDown size={20} className={cn("text-on-surface-variant transition-transform duration-500", openFaq === i && "rotate-180")} />
                </button>
                <div className={cn(
                  "px-8 overflow-hidden transition-all duration-500 ease-in-out",
                  openFaq === i ? "max-h-40 pb-8 opacity-100" : "max-h-0 opacity-0"
                )}>
                  <p className="text-on-surface-variant text-base leading-relaxed font-light">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <Card variant="lowest" className="p-10 shadow-2xl border border-outline-variant/5 space-y-10">
            <h3 className="text-2xl font-headline font-bold text-primary tracking-tighter">Hỗ trợ Trực tiếp</h3>
            <div className="space-y-10">
              <div className="flex gap-6 items-start group">
                <div className="w-12 h-12 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary shrink-0 group-hover:scale-110 transition-transform">
                  <MessageSquare size={24} />
                </div>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h4 className="font-headline font-bold text-on-surface">Chat Trực tuyến</h4>
                    <p className="text-xs text-on-surface-variant font-medium">Thời gian chờ trung bình: 2 phút</p>
                  </div>
                  <Button size="sm" className="px-8 font-bold uppercase tracking-widest text-[10px]">Bắt đầu Chat</Button>
                </div>
              </div>

              <div className="flex gap-6 items-start group">
                <div className="w-12 h-12 rounded-full bg-tertiary-container/10 flex items-center justify-center text-tertiary shrink-0 group-hover:scale-110 transition-transform">
                  <Mail size={24} />
                </div>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h4 className="font-headline font-bold text-on-surface">Hỗ trợ qua Email</h4>
                    <p className="text-xs text-on-surface-variant font-medium">Phản hồi trong vòng 24 giờ</p>
                  </div>
                  <Button variant="secondary" size="sm" className="px-8 font-bold uppercase tracking-widest text-[10px] bg-surface-container-low border-none">Gửi Email</Button>
                </div>
              </div>

              <div className="flex gap-6 items-start group">
                <div className="w-12 h-12 rounded-full bg-primary-container/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                  <Phone size={24} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-headline font-bold text-on-surface">Đường dây nóng Ưu tiên</h4>
                  <p className="text-xs text-on-surface-variant font-medium">1800-EMERALD</p>
                  <p className="text-[10px] text-on-surface-variant/40 font-bold uppercase tracking-widest">Thứ 2 - Thứ 6, 8:00 - 18:00</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-10 bg-primary text-white relative overflow-hidden shadow-2xl shadow-primary/20">
            <div className="relative z-10 space-y-6">
              <div className="space-y-2">
                <h4 className="font-headline font-bold text-xl">Cộng đồng Atelier</h4>
                <p className="text-white/70 text-sm leading-relaxed">
                  Tham gia cùng hơn 50.000 thành viên tầm nhìn để chia sẻ triết lý tài chính và mẹo làm chủ tài sản.
                </p>
              </div>
              <button className="text-xs font-bold text-white flex items-center gap-3 hover:underline uppercase tracking-widest">
                Truy cập Diễn đàn <ArrowRight size={16} />
              </button>
            </div>
            <div className="absolute -right-6 -bottom-6 opacity-10">
              <Users size={120} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
