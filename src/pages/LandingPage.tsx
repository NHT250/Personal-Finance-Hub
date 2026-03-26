import React from 'react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Shield, Zap, BarChart3, Diamond, Star, ArrowRight, Globe, Lock } from 'lucide-react';
import { cn } from '../lib/utils';

export const LandingPage = ({ onGetStarted, onLogin }: { onGetStarted: () => void; onLogin: () => void }) => {
  return (
    <div className="min-h-screen bg-surface selection:bg-primary selection:text-white overflow-x-hidden">
      {/* Luxury Navigation */}
      <nav className="fixed top-0 w-full z-[100] px-8 py-8">
        <div className="max-w-7xl mx-auto glassmorphism rounded-full px-10 py-5 flex justify-between items-center border border-white/40 shadow-2xl shadow-primary/5">
          <div className="flex items-center gap-3">
            <img
              src="https://cdn.postimage.me/2026/03/12/logo.png"
              alt="Emerald Ledger logo"
              className="w-10 h-10 rounded-md object-contain bg-white"
              referrerPolicy="no-referrer"
            />
            <span className="text-2xl font-headline font-black tracking-tighter text-primary">PFH</span>
          </div>
          <div className="hidden md:flex items-center gap-10">
            {[
              { label: 'Xưởng may', id: 'atelier' },
              { label: 'Triết lý', id: 'philosophy' },
              { label: 'Bảo mật', id: 'security' },
              { label: 'Dịch vụ', id: 'concierge' }
            ].map((item) => (
              <a key={item.id} href={`#${item.id}`} className="text-sm font-bold text-on-surface-variant hover:text-primary transition-colors uppercase tracking-widest">
                {item.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-6">
            <button onClick={onLogin} className="text-sm font-bold text-primary hover:underline uppercase tracking-widest">
              Đăng nhập
            </button>
            <Button onClick={onGetStarted} size="md" className="px-10">
              Tham gia Atelier
            </Button>
          </div>
        </div>
      </nav>

      <main>
        {/* Ultra-Premium Hero */}
        <section className="relative min-h-screen flex items-center pt-32 pb-20 px-8">
          {/* Background Accents */}
          <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 -left-20 w-[400px] h-[400px] bg-secondary-container/20 rounded-full blur-[100px]"></div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
            <div className="space-y-12">
              <div className="inline-flex items-center gap-3 py-2 px-5 rounded-full bg-primary/5 border border-primary/10">
                <span className="flex h-2 w-2 rounded-full bg-primary animate-ping"></span>
                <span className="text-[10px] font-black tracking-[0.2em] uppercase text-primary font-headline">
                  Atelier Tài chính — Phiên bản 2024
                </span>
              </div>
              <h1 className="text-7xl md:text-8xl font-extrabold text-primary leading-[0.9] font-headline tracking-tighter">
                Nâng tầm <br />
                <span className="text-primary-container italic font-medium">Sự giàu có</span> của bạn
              </h1>
              <p className="text-2xl text-on-surface-variant font-light leading-relaxed max-w-xl">
                Trải nghiệm hệ sinh thái quản lý tài sản được thiết kế riêng cho những nhà lãnh đạo hiện đại. Nơi mỗi giao dịch là một di sản.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 pt-6">
                <Button onClick={onGetStarted} size="lg" className="px-12 py-6 text-lg">
                  Bắt đầu Hành trình
                </Button>
                <Button variant="tertiary" size="lg" className="px-12 py-6 text-lg border border-primary/10 hover:bg-surface-container-low">
                  Khám phá Triết lý
                </Button>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative">
              <div className="relative z-20 animate-in fade-in zoom-in duration-1000">
                <Card className="p-0 overflow-hidden rounded-xl shadow-[0_50px_100px_rgba(0,40,23,0.15)]">
                  <img 
                    src="https://i.pinimg.com/1200x/60/08/dc/6008dc8b5171c800cd9b493cd5dce198.jpg" 
                    alt="Tài chính cao cấp" 
                    className="w-full h-auto object-cover grayscale-[0.2] contrast-[1.1]"
                    referrerPolicy="no-referrer"
                  />
                </Card>
              </div>
              {/* Floating Insight Card */}
              <div className="absolute -bottom-10 -left-16 z-30 animate-bounce duration-[3000ms]">
                <Card variant="bright" className="p-8 rounded-md shadow-2xl flex items-center gap-6">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <BarChart3 size={28} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60">Hiệu suất từ đầu năm</p>
                    <p className="text-3xl font-headline font-black text-primary">+24.85%</p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Section - Asymmetric Grid */}
        <section id="philosophy" className="py-40 bg-white">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
              <div className="max-w-2xl space-y-6">
                <h2 className="text-5xl md:text-6xl font-extrabold text-primary font-headline tracking-tighter">
                  Nghệ thuật <br />Quản lý Tài sản
                </h2>
                <p className="text-xl text-on-surface-variant font-light leading-relaxed">
                  Chúng tôi tin rằng tài chính nên tinh tế như một phòng triển lãm tư nhân. Các công cụ của chúng tôi được chế tác cho sự chính xác, rõ ràng và tự tin tuyệt đối.
                </p>
              </div>
              <div className="hidden md:block w-32 h-px bg-primary/20 mb-8"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
              <div className="md:col-span-7">
                <Card variant="low" className="h-full p-16 flex flex-col justify-between group hover:bg-primary/5 transition-colors duration-500">
                  <div className="space-y-8">
                    <div className="w-20 h-20 rounded-md bg-white shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <Zap size={32} className="text-primary" />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-3xl font-extrabold text-primary">Dòng chảy Thông minh</h3>
                      <p className="text-on-surface-variant text-lg leading-relaxed max-w-md">
                        Phân tích dòng tiền dựa trên AI thích ứng với lối sống của bạn, tự động tối ưu hóa tài sản cho sự tăng trưởng qua nhiều thế hệ.
                      </p>
                    </div>
                  </div>
                  <div className="pt-12">
                    <button className="flex items-center gap-3 text-primary font-bold uppercase tracking-widest text-xs group">
                      Khám phá thêm <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </Card>
              </div>
              <div className="md:col-span-5 space-y-10">
                <Card className="p-12 bg-primary text-white shadow-2xl shadow-primary/20">
                  <Diamond size={32} className="text-white/40 mb-8" />
                  <h3 className="text-2xl font-bold mb-4">Mục tiêu Riêng biệt</h3>
                  <p className="text-white/70 leading-relaxed">
                    Thiết lập và theo dõi các cột mốc tài chính quan trọng với hình ảnh trực quan hóa tiến độ sâu sắc.
                  </p>
                </Card>
                <Card variant="low" className="p-12">
                  <Globe size={32} className="text-primary/40 mb-8" />
                  <h3 className="text-2xl font-bold text-primary mb-4">Tầm vóc Toàn cầu</h3>
                  <p className="text-on-surface-variant leading-relaxed">
                    Quản lý tài sản trên khắp các châu lục với câu chuyện tiền tệ thời gian thực và định tuyến hiệu quả về thuế.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Security Section - Tonal Layering */}
        <section id="security" className="py-40 bg-surface-bright relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute -inset-10 bg-primary/5 rounded-full blur-[80px]"></div>
              <Card className="p-0 overflow-hidden rounded-xl shadow-2xl relative z-10">
                <img 
                  src="https://i.pinimg.com/736x/24/ba/35/24ba352b5adfad34370a50611ba7fe54.jpg" 
                  alt="Bảo mật" 
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                />
              </Card>
            </div>
            <div className="space-y-12 order-1 lg:order-2">
              <h2 className="text-5xl md:text-6xl font-extrabold text-primary font-headline tracking-tighter leading-tight">
                Một Pháo đài <br />Kỹ thuật số Bất khả xâm phạm
              </h2>
              <p className="text-xl text-on-surface-variant font-light leading-relaxed">
                Các giao thức bảo mật cấp Thụy Sĩ kết hợp với mã hóa lượng tử đa lớp. Di sản của bạn được bảo vệ trước mọi biến động.
              </p>
              <div className="space-y-8">
                {[
                  { icon: Lock, title: 'Mã hóa Đầu cuối', desc: 'Bảo vệ cấp quân sự cho mọi gói dữ liệu.' },
                  { icon: Shield, title: 'Chủ quyền Sinh trắc học', desc: 'Danh tính của bạn là chìa khóa duy nhất cho xưởng may của bạn.' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-6 group">
                    <div className="w-14 h-14 rounded-full border border-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <item.icon size={24} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-lg font-bold text-primary">{item.title}</h4>
                      <p className="text-on-surface-variant text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-32 premium-gradient text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="text-center md:text-left space-y-6 border-b md:border-b-0 md:border-r border-white/10 pb-16 md:pb-0 md:pr-20">
              <p className="text-white/60 font-headline font-bold tracking-[0.3em] uppercase text-xs">Cộng đồng Ưu tú</p>
              <h2 className="text-8xl md:text-9xl font-extrabold font-headline tracking-tighter">1M<span className="text-white/40">+</span></h2>
              <p className="text-white/70 text-lg max-w-sm mx-auto md:mx-0">
                Hơn một triệu thành viên bao gồm các nhà lãnh đạo toàn cầu và các doanh nhân có tầm nhìn.
              </p>
            </div>
            <div className="text-center md:text-left space-y-8 md:pl-20">
              <div className="flex justify-center md:justify-start gap-1">
                {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={24} fill="currentColor" className="text-white" />)}
              </div>
              <h2 className="text-7xl md:text-8xl font-extrabold font-headline tracking-tighter">4.9<span className="text-white/40">/5</span></h2>
              <p className="text-white/70 text-lg max-w-sm mx-auto md:mx-0">
                Được trao giải "Giao diện Quản lý Tài sản Tốt nhất" tại Giải thưởng Fintech Xuất sắc 2023.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-48 px-8 bg-white">
          <div className="max-w-4xl mx-auto text-center space-y-16">
            <div className="space-y-6">
              <h2 className="text-6xl md:text-7xl font-extrabold text-primary font-headline tracking-tighter">Lời mời Tham gia</h2>
              <p className="text-xl text-on-surface-variant font-light max-w-2xl mx-auto">
                Vui lòng để lại thông tin của bạn. Đội ngũ Dịch vụ của chúng tôi sẽ liên hệ để hướng dẫn bạn những bước đầu tiên vào xưởng may.
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
              <input 
                type="email" 
                placeholder="Email chuyên nghiệp của bạn" 
                className="flex-1 px-8 py-5 rounded-full bg-surface-container-low border-none focus:ring-2 focus:ring-primary/20 outline-none font-body text-primary"
              />
              <Button onClick={onGetStarted} size="lg" className="px-12">
                Yêu cầu Truy cập
              </Button>
            </div>
            <div className="flex items-center justify-center gap-4 text-on-surface-variant/40">
              <span className="h-px w-12 bg-current"></span>
              <p className="text-[10px] font-black tracking-[0.3em] uppercase">Đảm bảo Quyền riêng tư Tuyệt đối</p>
              <span className="h-px w-12 bg-current"></span>
            </div>
          </div>
        </section>
      </main>

      {/* Refined Footer */}
      <footer className="bg-surface border-t border-outline-variant/10 py-24 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="col-span-1 md:col-span-2 space-y-8">
            <div className="flex items-center gap-3">
              <img
                src="https://cdn.postimage.me/2026/03/12/logo.png"
                alt="Emerald Ledger logo"
                className="w-10 h-10 rounded-md object-contain bg-white"
                referrerPolicy="no-referrer"
              />
              <span className="text-2xl font-headline font-black tracking-tighter text-primary">Emerald Ledger</span>
            </div>
            <p className="text-on-surface-variant max-w-xs leading-relaxed italic">
              Cung cấp các giải pháp quản lý tài sản tối ưu cho thế hệ lãnh đạo tiếp theo.
            </p>
          </div>
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Trải nghiệm</h4>
            <ul className="space-y-4 text-sm font-medium text-on-surface-variant">
              <li><a href="#" className="hover:text-primary transition-colors">Atelier</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Dịch vụ</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Triết lý</a></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Pháp lý</h4>
            <ul className="space-y-4 text-sm font-medium text-on-surface-variant">
              <li><a href="#" className="hover:text-primary transition-colors">Chính sách Bảo mật</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Điều khoản Dịch vụ</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Kiểm toán Bảo mật</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-on-surface-variant/40 uppercase font-headline font-bold tracking-widest">
          <p>© 2024 Emerald Ledger. Bảo lưu mọi quyền.</p>
          <p>Một thành viên của Tập đoàn The Fiscal Atelier</p>
        </div>
      </footer>
    </div>
  );
};
