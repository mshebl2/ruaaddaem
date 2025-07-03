import React, { useState, useEffect } from 'react';
import { Instagram, MessageSquare, Star, Users, TrendingUp, MapPin, Phone, MessageCircle, Heart, Share, Bookmark, ThumbsUp, Play, Settings, Plus, Minus, X, Menu } from 'lucide-react';

function App() {
  const [selectedCurrency, setSelectedCurrency] = useState<'SAR' | 'JOD'>('SAR');
  const [isLoaded, setIsLoaded] = useState(false);
  const [showCustomPackage, setShowCustomPackage] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [fallingIcons, setFallingIcons] = useState<Array<{id: number, icon: string, left: number, delay: number}>>([]);
  const [customPackage, setCustomPackage] = useState({
    likes: 0,
    comments: 0,
    shares: 0,
    saves: 0,
    views: 0,
    followerType: 'عرب',
    nationality: 'سعوديين'
  });

  useEffect(() => {
    setIsLoaded(true);
    
    // إضافة structured data للصفحة
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "خدمات دعم وسائل التواصل الاجتماعي",
      "description": "خدمات دعم وتنشيط حسابات الإنستقرام والتيكتوك - لايكات، كومنتات، متابعين حقيقيين",
      "provider": {
        "@type": "Organization",
        "name": "رواد الرقمية"
      },
      "areaServed": ["Saudi Arabia", "Jordan"],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "باقات دعم وسائل التواصل الاجتماعي",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "الباقة الأساسية"
            }
          },
          {
            "@type": "Offer", 
            "itemOffered": {
              "@type": "Service",
              "name": "الباقة المتوسطة"
            }
          }
        ]
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);
    
    // إنشاء ايقونات متساقطة
    const createFallingIcon = () => {
      const icons = ['heart', 'message', 'share', 'bookmark', 'thumbsup', 'star'];
      const randomIcon = icons[Math.floor(Math.random() * icons.length)];
      const randomLeft = Math.random() * 100;
      const randomDelay = Math.random() * 2;
      
      const newIcon = {
        id: Date.now() + Math.random(),
        icon: randomIcon,
        left: randomLeft,
        delay: randomDelay
      };
      
      setFallingIcons(prev => [...prev, newIcon]);
      
      // إزالة الايقونة بعد انتهاء الانيميشن
      setTimeout(() => {
        setFallingIcons(prev => prev.filter(icon => icon.id !== newIcon.id));
      }, 8000);
    };
    
    // إنشاء ايقونة جديدة كل ثانيتين
    const interval = setInterval(createFallingIcon, 2000);
    
    return () => {
      clearInterval(interval);
      // تنظيف structured data عند إلغاء التحميل
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      scripts.forEach(script => {
        if (script.textContent?.includes('خدمات دعم وسائل التواصل الاجتماعي')) {
          script.remove();
        }
      });
    };
  }, []);

  const currencies = {
    SAR: { name: 'ريال سعودي', symbol: 'ر.س' },
    JOD: { name: 'دينار أردني', symbol: 'د.أ' }
  };

  const packages = [
    {
      id: 1,
      name: "الباقة الأساسية",
      prices: { SAR: "50", JOD: "18" },
      features: [
        "قصف واحد لايكات شهرياً",
        "أو قصف واحد كومنتات",
        "دعم فني أساسي",
        "تقرير شهري",
        "ضمان الجودة"
      ],
      popular: false,
      highlight: "قصف واحد"
    },
    {
      id: 2,
      name: "الباقة المتوسطة",
      prices: { SAR: "100", JOD: "35" },
      features: [
        "قصف لايكات شهرياً",
        "قصف كومنتات شهرياً",
        "دعم فني متقدم",
        "تقرير أسبوعي",
        "ضمان النتائج",
        "استشارة مجانية"
      ],
      popular: true,
      highlight: "لايك + كومنت"
    },
    {
      id: 3,
      name: "الباقة المتقدمة",
      prices: { SAR: "150", JOD: "53" },
      features: [
        "2 قصف لايكات شهرياً",
        "قصف كومنتات شهرياً",
        "دعم على مدار الساعة",
        "تقارير مفصلة",
        "استراتيجية نمو",
        "أولوية في التنفيذ"
      ],
      popular: false,
      highlight: "2 لايك + كومنت"
    },
    {
      id: 4,
      name: "الباقة الاحترافية",
      prices: { SAR: "200", JOD: "70" },
      features: [
        "3 قصف لايكات شهرياً",
        "قصف كومنتات شهرياً",
        "إدارة شاملة للحساب",
        "تحليل متقدم للبيانات",
        "استشارة تسويقية شخصية",
        "دعم VIP مخصص"
      ],
      popular: false,
      highlight: "3 لايك + كومنت"
    }
  ];

  const services = [
    {
      icon: Heart,
      title: "زيادة اللايكات",
      description: "قصف لايكات حقيقية من حسابات نشطة لزيادة التفاعل على منشوراتك",
      color: "from-pink-500 to-red-500"
    },
    {
      icon: MessageSquare,
      title: "كومنتات متفاعلة",
      description: "كومنتات حقيقية ومتنوعة تزيد من مصداقية المحتوى وتشجع التفاعل",
      color: "from-blue-500 to-purple-500"
    },
    {
      icon: Users,
      title: "زيادة المتابعين",
      description: "متابعين حقيقيين مهتمين بمحتواك لبناء جمهور قوي ومتفاعل",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: Share,
      title: "مشاركات ومشاهدات",
      description: "زيادة المشاركات والمشاهدات لتوسيع نطاق وصول المحتوى",
      color: "from-orange-500 to-yellow-500"
    },
    {
      icon: Bookmark,
      title: "حفظ المنشورات",
      description: "زيادة عدد مرات حفظ المنشورات مما يدل على قيمة المحتوى",
      color: "from-purple-500 to-indigo-500"
    },
    {
      icon: TrendingUp,
      title: "تحسين الوصول",
      description: "استراتيجيات متقدمة لتحسين ظهور المحتوى في خوارزميات المنصات",
      color: "from-cyan-500 to-blue-500"
    }
  ];

  const followerTypes = ['عرب', 'أجانب', 'مختلط'];
  const nationalities = ['سعوديين', 'مصريين', 'إماراتيين', 'كويتيين', 'قطريين', 'بحرينيين', 'عمانيين', 'أردنيين', 'لبنانيين', 'سوريين', 'عراقيين', 'مغاربة', 'جزائريين', 'تونسيين', 'ليبيين', 'سودانيين', 'يمنيين'];

  const handlePackageSelect = (packageName: string, price: string) => {
    const currencyName = currencies[selectedCurrency].name;
    const message = `السلام عليكم، أريد الاستفسار عن ${packageName} بسعر ${price} ${currencyName} شهرياً`;
    const whatsappUrl = `https://wa.me/962778623769?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCustomPackageInquiry = () => {
    const details = `
الباقة المخصصة:
- ${customPackage.likes} لايك
- ${customPackage.comments} كومنت
- ${customPackage.shares} مشاركة
- ${customPackage.saves} حفظ
- ${customPackage.views} مشاهدة
- نوع المتابعين: ${customPackage.followerType}
- الجنسية: ${customPackage.nationality}`;
    
    const message = `السلام عليكم، أريد معرفة سعر الباقة المخصصة:\n${details}`;
    const whatsappUrl = `https://wa.me/962778623769?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleContactUs = () => {
    const message = `السلام عليكم، أريد الاستفسار عن خدمات دعم وسائل التواصل الاجتماعي`;
    const whatsappUrl = `https://wa.me/962778623769?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSocialClick = (platform: string) => {
    const message = `السلام عليكم، أريد الاستفسار عن خدمات ${platform}`;
    const whatsappUrl = `https://wa.me/962778623769?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const updateCustomPackage = (field: string, value: number | string) => {
    setCustomPackage(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const incrementValue = (field: string, step: number = 100) => {
    setCustomPackage(prev => ({
      ...prev,
      [field]: Math.max(0, prev[field] + step)
    }));
  };

  const decrementValue = (field: string, step: number = 100) => {
    setCustomPackage(prev => ({
      ...prev,
      [field]: Math.max(0, prev[field] - step)
    }));
  };

  const renderFallingIcon = (iconType: string) => {
    switch(iconType) {
      case 'heart':
        return <Heart className="w-4 h-4 sm:w-6 sm:h-6" />;
      case 'message':
        return <MessageSquare className="w-4 h-4 sm:w-6 sm:h-6" />;
      case 'share':
        return <Share className="w-4 h-4 sm:w-6 sm:h-6" />;
      case 'bookmark':
        return <Bookmark className="w-4 h-4 sm:w-6 sm:h-6" />;
      case 'thumbsup':
        return <ThumbsUp className="w-4 h-4 sm:w-6 sm:h-6" />;
      case 'star':
        return <Star className="w-4 h-4 sm:w-6 sm:h-6" />;
      default:
        return <Heart className="w-4 h-4 sm:w-6 sm:h-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-white relative">
      {/* خلفية سوشيال ميديا متحركة */}
      <div className="social-bg">
        <div className="floating-icon">
          <Heart className="w-8 h-8 sm:w-12 sm:h-12 text-pink-300" />
        </div>
        <div className="floating-icon">
          <MessageSquare className="w-6 h-6 sm:w-10 sm:h-10 text-blue-300" />
        </div>
        <div className="floating-icon">
          <Share className="w-10 h-10 sm:w-14 sm:h-14 text-green-300" />
        </div>
        <div className="floating-icon">
          <Bookmark className="w-6 h-6 sm:w-8 sm:h-8 text-purple-300" />
        </div>
        <div className="floating-icon">
          <Users className="w-12 h-12 sm:w-16 sm:h-16 text-orange-300" />
        </div>
        <div className="floating-icon">
          <TrendingUp className="w-8 h-8 sm:w-12 sm:h-12 text-cyan-300" />
        </div>
      </div>

      {/* ايقونات التفاعل المتساقطة */}
      <div className="falling-icons-container">
        {fallingIcons.map((icon) => (
          <div
            key={icon.id}
            className="falling-icon"
            style={{
              left: `${icon.left}%`,
              animationDelay: `${icon.delay}s`
            }}
          >
            {renderFallingIcon(icon.icon)}
          </div>
        ))}
      </div>

      {/* Custom Package Modal */}
      {showCustomPackage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[95vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 sm:p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-lg sm:text-2xl font-bold instagram-gradient-text flex items-center space-x-2 space-x-reverse">
                  <Settings className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span>صمم باقتك على راحتك</span>
                </h3>
                <button
                  onClick={() => setShowCustomPackage(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="إغلاق"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                </button>
              </div>
            </div>
            
            <div className="p-4 sm:p-6">
              <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
                {/* Left Column - Services */}
                <div className="space-y-4 sm:space-y-6">
                  <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">اختر الخدمات التي تريدها:</h4>
                  
                  {/* Likes */}
                  <div className="bg-gradient-to-r from-pink-50 to-red-50 p-3 sm:p-4 rounded-xl border border-pink-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-pink-600" />
                        <span className="font-semibold text-gray-800 text-sm sm:text-base">عدد اللايكات</span>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <button
                          onClick={() => decrementValue('likes')}
                          className="w-7 h-7 sm:w-8 sm:h-8 bg-pink-500 text-white rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors"
                          aria-label="تقليل اللايكات"
                        >
                          <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                        <span className="w-16 sm:w-20 text-center font-bold text-sm sm:text-lg">{customPackage.likes}</span>
                        <button
                          onClick={() => incrementValue('likes')}
                          className="w-7 h-7 sm:w-8 sm:h-8 bg-pink-500 text-white rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors"
                          aria-label="زيادة اللايكات"
                        >
                          <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Comments */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 sm:p-4 rounded-xl border border-blue-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                        <span className="font-semibold text-gray-800 text-sm sm:text-base">عدد الكومنتات</span>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <button
                          onClick={() => decrementValue('comments', 10)}
                          className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                          aria-label="تقليل الكومنتات"
                        >
                          <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                        <span className="w-16 sm:w-20 text-center font-bold text-sm sm:text-lg">{customPackage.comments}</span>
                        <button
                          onClick={() => incrementValue('comments', 10)}
                          className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                          aria-label="زيادة الكومنتات"
                        >
                          <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Shares */}
                  <div className="bg-gradient-to-r from-green-50 to-teal-50 p-3 sm:p-4 rounded-xl border border-green-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Share className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                        <span className="font-semibold text-gray-800 text-sm sm:text-base">عدد المشاركات</span>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <button
                          onClick={() => decrementValue('shares', 10)}
                          className="w-7 h-7 sm:w-8 sm:h-8 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                          aria-label="تقليل المشاركات"
                        >
                          <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                        <span className="w-16 sm:w-20 text-center font-bold text-sm sm:text-lg">{customPackage.shares}</span>
                        <button
                          onClick={() => incrementValue('shares', 10)}
                          className="w-7 h-7 sm:w-8 sm:h-8 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                          aria-label="زيادة المشاركات"
                        >
                          <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Saves */}
                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-3 sm:p-4 rounded-xl border border-purple-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Bookmark className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                        <span className="font-semibold text-gray-800 text-sm sm:text-base">عدد مرات الحفظ</span>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <button
                          onClick={() => decrementValue('saves', 10)}
                          className="w-7 h-7 sm:w-8 sm:h-8 bg-purple-500 text-white rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors"
                          aria-label="تقليل الحفظ"
                        >
                          <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                        <span className="w-16 sm:w-20 text-center font-bold text-sm sm:text-lg">{customPackage.saves}</span>
                        <button
                          onClick={() => incrementValue('saves', 10)}
                          className="w-7 h-7 sm:w-8 sm:h-8 bg-purple-500 text-white rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors"
                          aria-label="زيادة الحفظ"
                        >
                          <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Views */}
                  <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-3 sm:p-4 rounded-xl border border-orange-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                        <span className="font-semibold text-gray-800 text-sm sm:text-base">عدد المشاهدات</span>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <button
                          onClick={() => decrementValue('views', 1000)}
                          className="w-7 h-7 sm:w-8 sm:h-8 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
                          aria-label="تقليل المشاهدات"
                        >
                          <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                        <span className="w-16 sm:w-20 text-center font-bold text-sm sm:text-lg">{customPackage.views}</span>
                        <button
                          onClick={() => incrementValue('views', 1000)}
                          className="w-7 h-7 sm:w-8 sm:h-8 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
                          aria-label="زيادة المشاهدات"
                        >
                          <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Preferences & Summary */}
                <div className="space-y-4 sm:space-y-6">
                  <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">اختر نوعية المتابعين:</h4>
                  
                  {/* Follower Type */}
                  <div className="bg-gray-50 p-3 sm:p-4 rounded-xl">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">نوع المتابعين:</label>
                    <div className="grid grid-cols-3 gap-2">
                      {followerTypes.map((type) => (
                        <button
                          key={type}
                          onClick={() => updateCustomPackage('followerType', type)}
                          className={`p-2 sm:p-3 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                            customPackage.followerType === type
                              ? 'instagram-gradient text-white'
                              : 'bg-white text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Nationality */}
                  <div className="bg-gray-50 p-3 sm:p-4 rounded-xl">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">الجنسية المفضلة:</label>
                    <select
                      value={customPackage.nationality}
                      onChange={(e) => updateCustomPackage('nationality', e.target.value)}
                      className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm sm:text-base"
                    >
                      {nationalities.map((nationality) => (
                        <option key={nationality} value={nationality}>
                          {nationality}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Package Summary */}
                  <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-4 sm:p-6 rounded-xl border-2 border-pink-200">
                    <h5 className="text-base sm:text-lg font-bold text-gray-800 mb-4">ملخص الباقة:</h5>
                    <div className="space-y-2 text-xs sm:text-sm">
                      {customPackage.likes > 0 && (
                        <div className="flex justify-between">
                          <span>لايكات:</span>
                          <span className="font-semibold">{customPackage.likes.toLocaleString()}</span>
                        </div>
                      )}
                      {customPackage.comments > 0 && (
                        <div className="flex justify-between">
                          <span>كومنتات:</span>
                          <span className="font-semibold">{customPackage.comments.toLocaleString()}</span>
                        </div>
                      )}
                      {customPackage.shares > 0 && (
                        <div className="flex justify-between">
                          <span>مشاركات:</span>
                          <span className="font-semibold">{customPackage.shares.toLocaleString()}</span>
                        </div>
                      )}
                      {customPackage.saves > 0 && (
                        <div className="flex justify-between">
                          <span>حفظ:</span>
                          <span className="font-semibold">{customPackage.saves.toLocaleString()}</span>
                        </div>
                      )}
                      {customPackage.views > 0 && (
                        <div className="flex justify-between">
                          <span>مشاهدات:</span>
                          <span className="font-semibold">{customPackage.views.toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span>نوع المتابعين:</span>
                        <span className="font-semibold">{customPackage.followerType}</span>
                      </div>
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span>الجنسية:</span>
                        <span className="font-semibold">{customPackage.nationality}</span>
                      </div>
                    </div>
                  </div>

                  {/* Inquiry Button */}
                  <button
                    onClick={handleCustomPackageInquiry}
                    disabled={Object.values(customPackage).slice(0, 5).every(val => val === 0)}
                    className="w-full instagram-gradient text-white py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all btn-bounce"
                  >
                    اعرف سعر الباقة المخصصة
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className={`wave-bg text-white py-3 sm:py-4 sticky top-0 z-50 shadow-lg ${isLoaded ? 'fade-in' : ''}`}>
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3 space-x-reverse slide-in-left">
              <Instagram className="w-6 h-6 sm:w-8 sm:h-8 pulse-icon" />
              <h1 className="text-lg sm:text-2xl font-bold">رواد الرقمية</h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4 space-x-reverse slide-in-right">
              {/* أيقونات سوشيال ميديا متحركة */}
              <div className="social-icons">
                <div 
                  className="social-icon instagram-icon"
                  onClick={() => handleSocialClick('Instagram')}
                >
                  <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div 
                  className="social-icon tiktok-icon"
                  onClick={() => handleSocialClick('TikTok')}
                >
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div 
                  className="social-icon whatsapp-icon"
                  onClick={handleContactUs}
                >
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
              </div>
              
              {/* Currency Selector */}
              <div className="flex items-center space-x-2 space-x-reverse bg-white/20 rounded-full px-3 sm:px-4 py-2 glow">
                <select
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value as 'SAR' | 'JOD')}
                  className="bg-transparent text-white border-none outline-none cursor-pointer text-xs sm:text-sm font-semibold"
                >
                  <option value="SAR" className="text-gray-800">🇸🇦 ريال سعودي</option>
                  <option value="JOD" className="text-gray-800">🇯🇴 دينار أردني</option>
                </select>
              </div>
              <button
                onClick={handleContactUs}
                className="whatsapp-btn text-white px-4 sm:px-6 py-2 rounded-full font-semibold flex items-center space-x-2 space-x-reverse btn-bounce text-sm sm:text-base"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>تواصل معنا</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                aria-label="فتح القائمة"
              >
                <Menu className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-white/20">
              <div className="flex flex-col space-y-3 pt-4">
                {/* Currency Selector Mobile */}
                <div className="flex items-center justify-center space-x-2 space-x-reverse bg-white/20 rounded-full px-4 py-2">
                  <select
                    value={selectedCurrency}
                    onChange={(e) => setSelectedCurrency(e.target.value as 'SAR' | 'JOD')}
                    className="bg-transparent text-white border-none outline-none cursor-pointer text-sm font-semibold"
                  >
                    <option value="SAR" className="text-gray-800">🇸🇦 ريال سعودي</option>
                    <option value="JOD" className="text-gray-800">🇯🇴 دينار أردني</option>
                  </select>
                </div>
                
                {/* Social Icons Mobile */}
                <div className="flex justify-center space-x-4 space-x-reverse">
                  <div 
                    className="social-icon instagram-icon"
                    onClick={() => handleSocialClick('Instagram')}
                  >
                    <Instagram className="w-5 h-5 text-white" />
                  </div>
                  <div 
                    className="social-icon tiktok-icon"
                    onClick={() => handleSocialClick('TikTok')}
                  >
                    <Play className="w-5 h-5 text-white" />
                  </div>
                  <div 
                    className="social-icon whatsapp-icon"
                    onClick={handleContactUs}
                  >
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                </div>
                
                <button
                  onClick={handleContactUs}
                  className="whatsapp-btn text-white px-6 py-2 rounded-full font-semibold flex items-center justify-center space-x-2 space-x-reverse btn-bounce"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>تواصل معنا</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className={`wave-bg text-white py-12 sm:py-20 ${isLoaded ? 'slide-up' : ''}`} id="home">
        <div className="container mx-auto px-3 sm:px-4 text-center">
          <h2 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6">
            نحن <span className="text-yellow-300 pulse-icon">رواد الرقمية</span>
          </h2>
          <p className="text-base sm:text-xl mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed font-medium px-4">
            متخصصون في خدمات دعم وتنشيط حسابات الإنستقرام والتيكتوك - لايكات، كومنتات، متابعين، مشاركات وأكثر
          </p>
          
          {/* أيقونات ثلاثية الأبعاد كبيرة */}
          <div className="flex justify-center items-center space-x-6 sm:space-x-8 space-x-reverse mb-6 sm:mb-8">
            <div className="icon-3d instagram-3d mobile-icon-3d" onClick={() => handleSocialClick('Instagram')}>
              <Instagram />
            </div>
            <div className="icon-3d tiktok-3d mobile-icon-3d" onClick={() => handleSocialClick('TikTok')}>
              <Play />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
            <button
              onClick={handleContactUs}
              className="whatsapp-btn text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg flex items-center space-x-2 space-x-reverse btn-bounce glow w-full sm:w-auto justify-center"
            >
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>ابدأ رحلتك معنا</span>
            </button>
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 sm:space-x-reverse text-xs sm:text-sm">
              <div className="flex items-center space-x-1 space-x-reverse">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-300 pulse-icon" />
                <span>+1000 عميل راضٍ</span>
              </div>
              <div className="flex items-center space-x-1 space-x-reverse">
                <ThumbsUp className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-300 pulse-icon" />
                <span>نتائج مضمونة</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={`py-12 sm:py-20 bg-gray-50 ${isLoaded ? 'fade-in' : ''}`} id="services">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="text-center mb-12 sm:mb-16 slide-up">
            <h3 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6 instagram-gradient-text">خدماتنا المتخصصة</h3>
            <p className="text-base sm:text-xl text-gray-700 max-w-2xl mx-auto font-medium px-4">
              نقدم مجموعة شاملة من خدمات الدعم والتنشيط لحساباتك على وسائل التواصل الاجتماعي
            </p>
            
            {/* أيقونات ثلاثية الأبعاد صغيرة */}
            <div className="flex justify-center items-center space-x-4 sm:space-x-6 space-x-reverse mt-6 sm:mt-8">
              <div className="small-icon-3d small-instagram-3d mobile-small-icon-3d" onClick={() => handleSocialClick('Instagram')}>
                <Instagram />
              </div>
              <div className="small-icon-3d small-tiktok-3d mobile-small-icon-3d" onClick={() => handleSocialClick('TikTok')}>
                <Play />
              </div>
            </div>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`service-card rounded-2xl p-6 sm:p-8 text-center text-white bg-gradient-to-br ${service.color} shadow-lg ${
                  index % 2 === 0 ? 'slide-in-left' : 'slide-in-right'
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <service.icon className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 text-white pulse-icon" />
                <h4 className="text-lg sm:text-2xl font-bold mb-3 sm:mb-4 text-white">{service.title}</h4>
                <p className="text-white leading-relaxed font-medium text-sm sm:text-base">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className={`py-12 sm:py-20 bg-white ${isLoaded ? 'slide-up' : ''}`} id="packages">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h3 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6 instagram-gradient-text">اختر الباقة المناسبة لك</h3>
            <p className="text-base sm:text-xl text-gray-700 max-w-2xl mx-auto font-medium px-4">
              باقات مرنة تناسب جميع احتياجاتك من الدعم الأساسي إلى الخدمات الاحترافية المتقدمة
            </p>
            
            {/* أيقونات ثلاثية الأبعاد صغيرة */}
            <div className="flex justify-center items-center space-x-4 sm:space-x-6 space-x-reverse mt-4 sm:mt-6 mb-6 sm:mb-8">
              <div className="small-icon-3d small-instagram-3d mobile-small-icon-3d" onClick={() => handleSocialClick('Instagram')}>
                <Instagram />
              </div>
              <div className="small-icon-3d small-tiktok-3d mobile-small-icon-3d" onClick={() => handleSocialClick('TikTok')}>
                <Play />
              </div>
            </div>
            
            <div className="flex justify-center mt-6 sm:mt-8">
              <div className="bg-gray-100 rounded-full p-1 flex items-center space-x-1 space-x-reverse glow">
                <button
                  onClick={() => setSelectedCurrency('SAR')}
                  className={`px-3 sm:px-6 py-2 rounded-full font-semibold transition-all duration-300 text-xs sm:text-base ${
                    selectedCurrency === 'SAR'
                      ? 'instagram-gradient text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  🇸🇦 ريال سعودي
                </button>
                <button
                  onClick={() => setSelectedCurrency('JOD')}
                  className={`px-3 sm:px-6 py-2 rounded-full font-semibold transition-all duration-300 text-xs sm:text-base ${
                    selectedCurrency === 'JOD'
                      ? 'instagram-gradient text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  🇯🇴 دينار أردني
                </button>
              </div>
            </div>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {packages.map((pkg, index) => (
              <div
                key={pkg.id}
                className={`package-card rounded-2xl p-4 sm:p-6 border-2 bg-white relative shadow-lg ${
                  pkg.popular ? 'border-pink-500 shadow-2xl lg:scale-105 glow' : 'border-gray-200'
                } ${index % 2 === 0 ? 'slide-in-left' : 'slide-in-right'}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                    <span className="instagram-gradient text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold pulse-icon">
                      الأكثر شعبية
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-4 sm:mb-6">
                  <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold text-pink-700 mb-2 sm:mb-3 inline-block">
                    {pkg.highlight}
                  </div>
                  <h4 className="text-base sm:text-xl font-bold mb-2 sm:mb-3 instagram-gradient-text">{pkg.name}</h4>
                  <div className="mb-3 sm:mb-4">
                    <span className="text-xl sm:text-3xl font-bold text-gray-800">{pkg.prices[selectedCurrency]}</span>
                    <span className="text-gray-600 mr-1 sm:mr-2 font-medium text-sm sm:text-base">{currencies[selectedCurrency].symbol}</span>
                    <span className="text-xs sm:text-sm text-gray-500 block font-medium">شهرياً</span>
                  </div>
                </div>
                
                <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2 space-x-reverse text-xs sm:text-sm">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 feature-icon flex-shrink-0 pulse-icon" />
                      <span className="text-gray-800 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={() => handlePackageSelect(pkg.name, pkg.prices[selectedCurrency])}
                  className={`w-full py-2 sm:py-3 rounded-xl font-semibold transition-all duration-300 text-xs sm:text-sm btn-bounce ${
                    pkg.popular
                      ? 'instagram-gradient text-white hover:shadow-lg hover:scale-105 glow'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  اختر هذه الباقة
                </button>
              </div>
            ))}
          </div>

          {/* Custom Package Button */}
          <div className="text-center mt-8 sm:mt-12">
            <button
              onClick={() => setShowCustomPackage(true)}
              className="custom-package-btn text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg flex items-center space-x-2 sm:space-x-3 space-x-reverse mx-auto btn-bounce glow"
            >
              <Settings className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>صمم باقتك على راحتك</span>
            </button>
            <p className="text-gray-600 mt-2 sm:mt-3 font-medium text-sm sm:text-base px-4">
              اختر بنفسك عدد اللايكات والكومنتات ونوعية المتابعين
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className={`py-12 sm:py-20 bg-gray-50 ${isLoaded ? 'fade-in' : ''}`}>
        <div className="container mx-auto px-3 sm:px-4">
          <div className="text-center mb-12 sm:mb-16 slide-up">
            <h3 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6 instagram-gradient-text">لماذا تختار رواد الرقمية؟</h3>
            
            {/* أيقونات ثلاثية الأبعاد صغيرة */}
            <div className="flex justify-center items-center space-x-4 sm:space-x-6 space-x-reverse mt-4 sm:mt-6">
              <div className="small-icon-3d small-instagram-3d mobile-small-icon-3d" onClick={() => handleSocialClick('Instagram')}>
                <Instagram />
              </div>
              <div className="small-icon-3d small-tiktok-3d mobile-small-icon-3d" onClick={() => handleSocialClick('TikTok')}>
                <Play />
              </div>
            </div>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center slide-in-left">
              <div className="bg-gradient-to-r from-pink-100 to-purple-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 pulse-icon">
                <Star className="w-6 h-6 sm:w-8 sm:h-8 text-pink-600" />
              </div>
              <h4 className="text-lg sm:text-xl font-bold mb-2 text-gray-800">جودة مضمونة</h4>
              <p className="text-gray-700 font-medium text-sm sm:text-base">نضمن جودة الخدمة ونتائج حقيقية ومؤثرة</p>
            </div>
            
            <div className="text-center slide-in-right">
              <div className="bg-gradient-to-r from-blue-100 to-cyan-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 pulse-icon">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
              </div>
              <h4 className="text-lg sm:text-xl font-bold mb-2 text-gray-800">حسابات حقيقية</h4>
              <p className="text-gray-700 font-medium text-sm sm:text-base">نعمل مع حسابات حقيقية ونشطة فقط</p>
            </div>
            
            <div className="text-center slide-in-left">
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 pulse-icon">
                <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
              </div>
              <h4 className="text-lg sm:text-xl font-bold mb-2 text-gray-800">نتائج سريعة</h4>
              <p className="text-gray-700 font-medium text-sm sm:text-base">تبدأ النتائج في الظهور خلال 24-48 ساعة</p>
            </div>
            
            <div className="text-center slide-in-right">
              <div className="bg-gradient-to-r from-orange-100 to-yellow-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 pulse-icon">
                <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" />
              </div>
              <h4 className="text-lg sm:text-xl font-bold mb-2 text-gray-800">دعم مستمر</h4>
              <p className="text-gray-700 font-medium text-sm sm:text-base">فريق دعم متاح على مدار الساعة</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className={`py-12 sm:py-20 bg-white ${isLoaded ? 'slide-up' : ''}`} id="contact">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h3 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6 instagram-gradient-text">تواصل معنا</h3>
            <p className="text-base sm:text-xl text-gray-700 max-w-2xl mx-auto font-medium px-4">
              نحن هنا لمساعدتك في تحقيق أهدافك على وسائل التواصل الاجتماعي
            </p>
            
            {/* أيقونات ثلاثية الأبعاد صغيرة */}
            <div className="flex justify-center items-center space-x-4 sm:space-x-6 space-x-reverse mt-4 sm:mt-6">
              <div className="small-icon-3d small-instagram-3d mobile-small-icon-3d" onClick={() => handleSocialClick('Instagram')}>
                <Instagram />
              </div>
              <div className="small-icon-3d small-tiktok-3d mobile-small-icon-3d" onClick={() => handleSocialClick('TikTok')}>
                <Play />
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 shadow-lg slide-in-left glow">
              <div className="flex items-center space-x-3 sm:space-x-4 space-x-reverse mb-4 sm:mb-6">
                <div className="bg-green-100 p-2 sm:p-3 rounded-full pulse-icon">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl font-bold text-gray-800">رقم الهاتف</h4>
                  <p className="text-gray-700 font-medium text-sm sm:text-base">+962778623769</p>
                </div>
              </div>
              <button
                onClick={handleContactUs}
                className="whatsapp-btn text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold w-full flex items-center justify-center space-x-2 space-x-reverse btn-bounce text-sm sm:text-base"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>راسلنا على الواتساب</span>
              </button>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 shadow-lg slide-in-right glow">
              <div className="flex items-center space-x-3 sm:space-x-4 space-x-reverse mb-4 sm:mb-6">
                <div className="bg-blue-100 p-2 sm:p-3 rounded-full pulse-icon">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl font-bold text-gray-800">نخدم</h4>
                  <p className="text-gray-700 font-medium text-sm sm:text-base">🇯🇴 الأردن</p>
                  <p className="text-gray-700 font-medium text-sm sm:text-base">🇸🇦 المملكة العربية السعودية</p>
                </div>
              </div>
              <div className="bg-white p-3 sm:p-4 rounded-xl">
                <p className="text-xs sm:text-sm text-gray-700 text-center font-medium">
                  خدماتنا متاحة لجميع العملاء في المنطقة العربية
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`wave-bg text-white py-8 sm:py-12 ${isLoaded ? 'fade-in' : ''}`}>
        <div className="container mx-auto px-3 sm:px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 space-x-reverse mb-3 sm:mb-4">
              <Instagram className="w-6 h-6 sm:w-8 sm:h-8 pulse-icon" />
              <h2 className="text-xl sm:text-2xl font-bold">رواد الرقمية</h2>
            </div>
            <p className="text-gray-200 mb-4 sm:mb-6 font-medium text-sm sm:text-base">
              شريكك المثالي في تنمية حضورك الرقمي
            </p>
            
            {/* أيقونات ثلاثية الأبعاد صغيرة في الفوتر */}
            <div className="flex justify-center items-center space-x-4 sm:space-x-6 space-x-reverse mb-4 sm:mb-6">
              <div className="small-icon-3d small-instagram-3d mobile-small-icon-3d" onClick={() => handleSocialClick('Instagram')}>
                <Instagram />
              </div>
              <div className="small-icon-3d small-tiktok-3d mobile-small-icon-3d" onClick={() => handleSocialClick('TikTok')}>
                <Play />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <button
                onClick={handleContactUs}
                className="whatsapp-btn text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold flex items-center space-x-2 space-x-reverse btn-bounce glow text-sm sm:text-base"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>تواصل معنا الآن</span>
              </button>
              <p className="text-xs sm:text-sm text-gray-300">
                © 2024 رواد الرقمية. جميع الحقوق محفوظة.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;