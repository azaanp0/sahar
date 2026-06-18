import React from 'react';

const TopBarMarquee = () => {
  // العناصر المراد عرضها في الشريط
  const items = [
    { icon: '🚚', text: 'شحن سريع ومجاني للطلبات فوق 200 ر.س' },
    { icon: '🎁', text: 'عروض حصرية لفترة محدودة' },
    { icon: '💎', text: 'منتجات أصلية ومضمونة 100%' },
    { icon: '⭐', text: 'خصومات مميزة تصل إلى 30%' },
  ];

  return (
    <div className="announcement-bar bg-primary relative w-full overflow-hidden py-2.5 text-xs font-medium tracking-wide text-white border-b shadow-[0_2px_12px_rgba(0,0,0,0.04)] direction-rtl transition-all duration-300 ease">
      
      {/* تأثير الفخامة: ضباب شفاف على الأطراف ليعطي انطباع بالنعومة عند دخول وخروج النص */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10 announcement-gradient-left"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10 announcement-gradient-right"></div>

      {/* الحاوية الأساسية للأنيميشن */}
      <div className="flex w-max gap-12 animate-marquee hover:[animation-play-state:paused] cursor-pointer">
        
        {/* المجموعة الأولى */}
        <div className="flex shrink-0 items-center gap-12 select-none">
          {items.map((item, index) => (
            <div key={`group1-${index}`} className="flex items-center gap-2">
              <span className="text-sm opacity-90">{item.icon}</span>
              <span>{item.text}</span>
              {/* فاصل أنيق بين العناصر */}
              <span className="mx-2 text-white/40">✦</span>
            </div>
          ))}
        </div>

        {/* المجموعة الثانية (المكررة لضمان اللانهاية السلسة) */}
        <div className="flex shrink-0 items-center gap-12 select-none" aria-hidden="true">
          {items.map((item, index) => (
            <div key={`group2-${index}`} className="flex items-center gap-2">
              <span className="text-sm opacity-90">{item.icon}</span>
              <span>{item.text}</span>
              <span className="mx-2 text-white/40">✦</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default TopBarMarquee;
