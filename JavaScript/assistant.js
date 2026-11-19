/* SiemRide Smart Assistant — answers from the website's own tour & rental data (assistant-data.js).
   Loaded on demand when a visitor taps "Contact us" in the side menu. */
(function(){
  if(window.SR_ASSISTANT) return;
  var KB = window.SR_KB; if(!KB) return;
  var CO = KB.company;
  var scriptEl = document.querySelector('script[src*="JavaScript/script.js"]') ||
                 document.querySelector('script[src*="assistant.js"]') ||
                 document.currentScript;
  var ROOT = (scriptEl && scriptEl.src) ? scriptEl.src.replace(/(?:JavaScript\/)?(?:script|assistant)\.js.*$/, '') : '';
  if(!ROOT){
    var logoEl = document.querySelector('.header-logo-img, .panel-logo');
    if(logoEl && logoEl.src) ROOT = logoEl.src.replace(/Image\/logo2?\.png.*$/, '');
  }
  if(!ROOT){
    ROOT = location.href.replace(/\/[^/]*$/, '/');
  }
  if(!ROOT.endsWith('/')) ROOT += '/';

  var existingLogo = document.querySelector('.header-logo-img, .panel-logo, link[rel~="icon"]');
  var logo = (existingLogo && (existingLogo.src || existingLogo.href)) || (ROOT + 'Image/logo2.png');

  /* ---------- UI text (7 languages; tour/rental names stay as on the site) ---------- */
  var L = {
  en:{title:'SiemRide',status:'Online · instant answers',hello:"Hi there! 👋 Welcome to SiemRide. Ask me anything about our tours, rentals, prices or how to book.",ph:'Type your question…',
    c_tours:'Tours & prices',c_rent:'Rentals',c_incl:"What's included?",c_human:'Talk to a human',c_contact:'Contact info',c_book:'How to book',c_cheap:'Cheapest tour',c_sun:'Sunrise tour',
    details:'Details',book:'Book this',alltours:'All tours',allrent:'All rentals',back:'More options',from:'from',perday:'/ day',popular:'Popular',upto:'Up to',
    incl:'Included',excl:'Not included',hl:'Highlights',itin:'Itinerary',dur:'Duration',start:'Start time',price:'Price',loc:'Location',notice:'Good to know',
    t_intro:'We run {n} tours around Siem Reap. Which style do you like?',r_intro:'We rent bicycles, e-bikes, motorbikes, tuk tuks and cars & vans. Which one?',
    cat_moto:'Motorbike tours',cat_bike:'Bike tours',cat_ebike:'E-bike tours',r_bike:'Bicycles',r_ebike:'E-bikes',r_moto:'Motos',r_tuktuk:'Tuk Tuk',r_carvan:'Car / Van',
    in_cat:'Here are our {c}:',r_in:'Here is what we have for {c}:',fallback:"I'm not sure I understood that. Try a tour name, a rental type, prices or booking — or talk to our team.",
    closest:'Maybe you mean one of these?',human:'Our team is happy to help. Choose how to reach us:',call:'Call',wa:'WhatsApp',mail:'Email',msg:'Send a message',addr:'Address',
    book_how:'Booking is easy: tell us the tour or vehicle, your date and number of people. Tap below and we will reply on WhatsApp.',book_btn:'Book on WhatsApp',
    thanks:"You're welcome! Anything else I can help with?",bye:'Thanks for chatting! We are here whenever you need us.',more:'Anything else?',
    which_t:'Which tour would you like to know about?',ask_which:'Do you mean a tour or a rental?',as_tour:'{c} (tour)',as_rent:'{c} (rental)',
    price_sum:'Tours start from ${a} per rider. Rentals start from ${b} per day. Choose to see the full list:',deposit:'Deposit',info:'Good to know',need:'Info needed to book',
    pp:'per rider',cap:'Capacity',inclv:'Keylock & helmet included',noitin:'Full day-by-day details are on the tour page.',view:'View on tour page',
    nodur:'The exact hours are not listed for this tour — our team can confirm them for you.',lead:'Popular picks',cheap_t:'Our lowest-priced tour is:',sun_t:'Here are our sunrise options:',nomatch:'I could not find that on our website.'},
  km:{title:'SiemRide',status:'អនឡាញ · ឆ្លើយតបភ្លាមៗ',hello:'សួស្តី! 👋 សូមស្វាគមន៍មកកាន់ SiemRide។ សួរខ្ញុំអំពីដំណើរកម្សាន្ត ការជួល តម្លៃ ឬរបៀបកក់។',ph:'វាយសំណួររបស់អ្នក…',
    c_tours:'ដំណើរកម្សាន្ត និងតម្លៃ',c_rent:'ការជួល',c_incl:'រួមបញ្ចូលអ្វីខ្លះ?',c_human:'និយាយជាមួយបុគ្គលិក',c_contact:'ព័ត៌មានទំនាក់ទំនង',c_book:'របៀបកក់',
    details:'ព័ត៌មានលម្អិត',book:'កក់នេះ',alltours:'ដំណើរកម្សាន្តទាំងអស់',allrent:'ការជួលទាំងអស់',back:'ជម្រើសផ្សេងទៀត',from:'ចាប់ពី',perday:'/ ថ្ងៃ',popular:'ពេញនិយម',upto:'រហូតដល់',
    incl:'រួមបញ្ចូល',excl:'មិនរួមបញ្ចូល',hl:'ចំណុចពិសេស',itin:'កម្មវិធី',dur:'រយៈពេល',start:'ម៉ោងចាប់ផ្តើម',price:'តម្លៃ',loc:'ទីតាំង',notice:'ត្រូវដឹង',
    t_intro:'យើងមានដំណើរកម្សាន្ត {n} នៅសៀមរាប។ តើអ្នកចូលចិត្តបែបណា?',r_intro:'យើងជួលកង់ កង់អគ្គិសនី ម៉ូតូ តុកតុក និងឡាន។ តើអ្នកចង់បានអ្វី?',
    cat_moto:'ដំណើរកម្សាន្តម៉ូតូ',cat_bike:'ដំណើរកម្សាន្តកង់',cat_ebike:'ដំណើរកម្សាន្តកង់អគ្គិសនី',r_bike:'កង់',r_ebike:'កង់អគ្គិសនី',r_moto:'ម៉ូតូ',r_tuktuk:'តុកតុក',r_carvan:'ឡាន / ឡានដឹកអ្នកដំណើរ',
    in_cat:'នេះជា {c}របស់យើង៖',r_in:'នេះជាអ្វីដែលយើងមានសម្រាប់ {c}៖',fallback:'សុំទោស ខ្ញុំមិនទាន់យល់ទេ។ សូមសួរអំពីដំណើរកម្សាន្ត ការជួល តម្លៃ ឬការកក់ ឬនិយាយជាមួយក្រុមការងារ។',
    closest:'ប្រហែលជាអ្នកចង់បានមួយក្នុងចំណោមទាំងនេះ?',human:'ក្រុមការងាររបស់យើងរីករាយជួយ។ ជ្រើសរើសវិធីទំនាក់ទំនង៖',call:'ទូរស័ព្ទ',wa:'WhatsApp',mail:'អ៊ីមែល',msg:'ផ្ញើសារ',addr:'អាសយដ្ឋាន',
    book_how:'ការកក់ងាយស្រួល៖ ប្រាប់យើងអំពីដំណើរកម្សាន្ត ឬយានជំនិះ កាលបរិច្ឆេទ និងចំនួនមនុស្ស។ ចុចខាងក្រោម យើងនឹងឆ្លើយតបតាម WhatsApp។',book_btn:'កក់តាម WhatsApp',
    thanks:'អរគុណ! តើមានអ្វីផ្សេងទៀតដែលខ្ញុំអាចជួយបាន?',bye:'អរគុណដែលជជែក! យើងនៅទីនេះរាល់ពេលដែលអ្នកត្រូវការ។',more:'មានអ្វីទៀតទេ?',
    which_t:'តើអ្នកចង់ដឹងអំពីដំណើរកម្សាន្តមួយណា?',ask_which:'តើអ្នកចង់បានដំណើរកម្សាន្ត ឬការជួល?',as_tour:'{c} (ដំណើរកម្សាន្ត)',as_rent:'{c} (ការជួល)',
    price_sum:'ដំណើរកម្សាន្តចាប់ពី ${a} ក្នុងម្នាក់។ ការជួលចាប់ពី ${b} ក្នុងមួយថ្ងៃ។ ជ្រើសរើសដើម្បីមើលបញ្ជីពេញលេញ៖',deposit:'ប្រាក់កក់',info:'ត្រូវដឹង',need:'ព័ត៌មានដែលត្រូវការសម្រាប់កក់',
    pp:'ក្នុងម្នាក់',cap:'ចំណុះ',inclv:'រួមបញ្ចូលសោ និងមួកសុវត្ថិភាព',noitin:'ព័ត៌មានលម្អិតពេញលេញមាននៅទំព័រដំណើរកម្សាន្ត។',view:'មើលនៅទំព័រដំណើរកម្សាន្ត',
    nodur:'ម៉ោងពិតប្រាកដមិនបានបង្ហាញសម្រាប់ដំណើរកម្សាន្តនេះទេ — ក្រុមការងារអាចបញ្ជាក់ជូនអ្នក។',lead:'ជម្រើសពេញនិយម',cheap_t:'ដំណើរកម្សាន្តតម្លៃទាបបំផុតរបស់យើងគឺ៖',sun_t:'នេះជាជម្រើសថ្ងៃរះរបស់យើង៖',nomatch:'ខ្ញុំរកមិនឃើញនៅលើគេហទំព័ររបស់យើងទេ។'},
  zh:{title:'SiemRide',status:'在线 · 即时回复',hello:'你好！👋 欢迎来到 SiemRide。可以问我旅游线路、租赁、价格或如何预订。',ph:'输入您的问题…',
    c_tours:'旅游与价格',c_rent:'租赁',c_incl:'包含什么？',c_human:'联系真人',c_contact:'联系方式',c_book:'如何预订',
    details:'详情',book:'预订',alltours:'全部旅游',allrent:'全部租赁',back:'更多选项',from:'起',perday:'/ 天',popular:'热门',upto:'最多',
    incl:'包含',excl:'不包含',hl:'亮点',itin:'行程',dur:'时长',start:'出发时间',price:'价格',loc:'地点',notice:'温馨提示',
    t_intro:'我们在暹粒提供 {n} 条旅游线路，您喜欢哪种方式？',r_intro:'我们出租自行车、电动自行车、摩托车、嘟嘟车和汽车/面包车。需要哪一种？',
    cat_moto:'摩托车旅游',cat_bike:'自行车旅游',cat_ebike:'电动自行车旅游',r_bike:'自行车',r_ebike:'电动自行车',r_moto:'摩托车',r_tuktuk:'嘟嘟车',r_carvan:'汽车 / 面包车',
    in_cat:'这是我们的{c}：',r_in:'以下是{c}：',fallback:'抱歉，我没太明白。可以问问线路名称、租赁类型、价格或预订，或联系我们的团队。',
    closest:'您是不是想问这些？',human:'我们的团队乐意帮助您。请选择联系方式：',call:'电话',wa:'WhatsApp',mail:'邮件',msg:'发送留言',addr:'地址',
    book_how:'预订很简单：告诉我们线路或车辆、日期和人数。点击下方，我们会通过 WhatsApp 回复。',book_btn:'通过 WhatsApp 预订',
    thanks:'不客气！还有其他需要帮助的吗？',bye:'感谢聊天！需要时随时找我们。',more:'还有其他问题吗？',
    which_t:'您想了解哪条线路？',ask_which:'您指的是旅游还是租赁？',as_tour:'{c}（旅游）',as_rent:'{c}（租赁）',
    price_sum:'旅游每人 ${a} 起，租赁每天 ${b} 起。选择查看完整列表：',deposit:'押金',info:'温馨提示',need:'预订所需信息',
    pp:'每人',cap:'载客',inclv:'含车锁和头盔',noitin:'完整行程请查看旅游页面。',view:'在旅游页面查看',
    nodur:'此线路未列出具体时间，我们的团队可以为您确认。',lead:'热门推荐',cheap_t:'我们价格最低的旅游是：',sun_t:'这是我们的日出线路：',nomatch:'我在网站上没有找到相关内容。'},
  ja:{title:'SiemRide',status:'オンライン · 即時回答',hello:'こんにちは！👋 SiemRide へようこそ。ツアー、レンタル、料金、予約方法など何でもご質問ください。',ph:'ご質問を入力…',
    c_tours:'ツアーと料金',c_rent:'レンタル',c_incl:'含まれるもの',c_human:'スタッフと話す',c_contact:'連絡先',c_book:'予約方法',
    details:'詳細',book:'予約する',alltours:'すべてのツアー',allrent:'すべてのレンタル',back:'他の選択肢',from:'から',perday:'/ 日',popular:'人気',upto:'最大',
    incl:'含まれるもの',excl:'含まれないもの',hl:'ハイライト',itin:'行程',dur:'所要時間',start:'開始時刻',price:'料金',loc:'場所',notice:'ご案内',
    t_intro:'シェムリアップで {n} 件のツアーを催行しています。どのスタイルがお好みですか？',r_intro:'自転車、電動自転車、バイク、トゥクトゥク、車・バンをレンタルしています。どちらにしますか？',
    cat_moto:'バイクツアー',cat_bike:'自転車ツアー',cat_ebike:'電動自転車ツアー',r_bike:'自転車',r_ebike:'電動自転車',r_moto:'バイク',r_tuktuk:'トゥクトゥク',r_carvan:'車 / バン',
    in_cat:'{c}はこちらです：',r_in:'{c}のご案内です：',fallback:'申し訳ありません、理解できませんでした。ツアー名、レンタルの種類、料金、予約についてお尋ねいただくか、スタッフにご連絡ください。',
    closest:'こちらのことでしょうか？',human:'スタッフがお手伝いします。連絡方法をお選びください：',call:'電話',wa:'WhatsApp',mail:'メール',msg:'メッセージ送信',addr:'住所',
    book_how:'予約は簡単です。ツアーまたは車両、日付、人数をお知らせください。下のボタンから WhatsApp でご返信します。',book_btn:'WhatsApp で予約',
    thanks:'どういたしまして！他にご質問はありますか？',bye:'ご利用ありがとうございました。いつでもどうぞ。',more:'他に何かありますか？',
    which_t:'どのツアーについて知りたいですか？',ask_which:'ツアーとレンタル、どちらでしょうか？',as_tour:'{c}（ツアー）',as_rent:'{c}（レンタル）',
    price_sum:'ツアーは 1 名 ${a} から、レンタルは 1 日 ${b} からです。一覧をご覧ください：',deposit:'デポジット',info:'ご案内',need:'予約に必要な情報',
    pp:'1名あたり',cap:'定員',inclv:'鍵とヘルメット付き',noitin:'詳しい行程はツアーページをご覧ください。',view:'ツアーページで見る',
    nodur:'このツアーの正確な時間は掲載されていません。スタッフが確認いたします。',lead:'人気のおすすめ',cheap_t:'最も安いツアーはこちらです：',sun_t:'サンライズのツアーはこちらです：',nomatch:'ウェブサイトでは見つかりませんでした。'},
  ko:{title:'SiemRide',status:'온라인 · 즉시 답변',hello:'안녕하세요! 👋 SiemRide에 오신 것을 환영합니다. 투어, 렌탈, 가격, 예약 방법을 물어보세요.',ph:'질문을 입력하세요…',
    c_tours:'투어 및 가격',c_rent:'렌탈',c_incl:'포함 사항',c_human:'상담원 연결',c_contact:'연락처',c_book:'예약 방법',
    details:'자세히',book:'예약하기',alltours:'모든 투어',allrent:'모든 렌탈',back:'다른 옵션',from:'부터',perday:'/ 일',popular:'인기',upto:'최대',
    incl:'포함',excl:'불포함',hl:'하이라이트',itin:'일정',dur:'소요 시간',start:'시작 시간',price:'가격',loc:'위치',notice:'안내',
    t_intro:'시엠립에서 {n}개의 투어를 운영합니다. 어떤 스타일이 좋으세요?',r_intro:'자전거, 전기 자전거, 오토바이, 툭툭, 자동차/밴을 대여합니다. 어떤 것이 필요하세요?',
    cat_moto:'오토바이 투어',cat_bike:'자전거 투어',cat_ebike:'전기 자전거 투어',r_bike:'자전거',r_ebike:'전기 자전거',r_moto:'오토바이',r_tuktuk:'툭툭',r_carvan:'자동차 / 밴',
    in_cat:'{c} 목록입니다:',r_in:'{c} 안내입니다:',fallback:'죄송합니다, 잘 이해하지 못했어요. 투어 이름, 렌탈 종류, 가격, 예약에 대해 물어보시거나 팀에 문의하세요.',
    closest:'혹시 이 중에 있나요?',human:'저희 팀이 기꺼이 도와드립니다. 연락 방법을 선택하세요:',call:'전화',wa:'WhatsApp',mail:'이메일',msg:'메시지 보내기',addr:'주소',
    book_how:'예약은 간단합니다. 투어 또는 차량, 날짜, 인원을 알려주세요. 아래를 누르면 WhatsApp으로 답변드립니다.',book_btn:'WhatsApp으로 예약',
    thanks:'천만에요! 더 도와드릴 일이 있나요?',bye:'대화해 주셔서 감사합니다. 언제든 문의하세요.',more:'다른 질문이 있으신가요?',
    which_t:'어떤 투어가 궁금하세요?',ask_which:'투어인가요, 렌탈인가요?',as_tour:'{c} (투어)',as_rent:'{c} (렌탈)',
    price_sum:'투어는 1인 ${a}부터, 렌탈은 하루 ${b}부터입니다. 전체 목록을 선택하세요:',deposit:'보증금',info:'안내',need:'예약에 필요한 정보',
    pp:'1인당',cap:'정원',inclv:'자물쇠와 헬멧 포함',noitin:'자세한 일정은 투어 페이지에서 확인하세요.',view:'투어 페이지에서 보기',
    nodur:'이 투어의 정확한 시간은 표시되어 있지 않습니다. 저희 팀이 확인해 드립니다.',lead:'인기 추천',cheap_t:'가장 저렴한 투어입니다:',sun_t:'일출 투어입니다:',nomatch:'웹사이트에서 찾지 못했습니다.'},
  vi:{title:'SiemRide',status:'Trực tuyến · trả lời ngay',hello:'Xin chào! 👋 Chào mừng bạn đến với SiemRide. Hãy hỏi tôi về tour, thuê xe, giá hoặc cách đặt.',ph:'Nhập câu hỏi của bạn…',
    c_tours:'Tour & giá',c_rent:'Thuê xe',c_incl:'Bao gồm gì?',c_human:'Nói chuyện với nhân viên',c_contact:'Thông tin liên hệ',c_book:'Cách đặt',
    details:'Chi tiết',book:'Đặt ngay',alltours:'Tất cả tour',allrent:'Tất cả thuê xe',back:'Lựa chọn khác',from:'từ',perday:'/ ngày',popular:'Phổ biến',upto:'Tối đa',
    incl:'Bao gồm',excl:'Không bao gồm',hl:'Điểm nổi bật',itin:'Lịch trình',dur:'Thời gian',start:'Giờ bắt đầu',price:'Giá',loc:'Địa điểm',notice:'Lưu ý',
    t_intro:'Chúng tôi có {n} tour quanh Siem Reap. Bạn thích kiểu nào?',r_intro:'Chúng tôi cho thuê xe đạp, xe đạp điện, xe máy, tuk tuk và ô tô/xe van. Bạn cần loại nào?',
    cat_moto:'Tour xe máy',cat_bike:'Tour xe đạp',cat_ebike:'Tour xe đạp điện',r_bike:'Xe đạp',r_ebike:'Xe đạp điện',r_moto:'Xe máy',r_tuktuk:'Tuk Tuk',r_carvan:'Ô tô / Xe van',
    in_cat:'Đây là {c} của chúng tôi:',r_in:'Đây là những gì chúng tôi có cho {c}:',fallback:'Tôi chưa hiểu rõ. Hãy hỏi về tên tour, loại xe thuê, giá hoặc cách đặt — hoặc liên hệ nhóm của chúng tôi.',
    closest:'Có phải bạn muốn hỏi một trong những mục này?',human:'Đội ngũ của chúng tôi sẵn sàng giúp. Chọn cách liên hệ:',call:'Gọi',wa:'WhatsApp',mail:'Email',msg:'Gửi tin nhắn',addr:'Địa chỉ',
    book_how:'Đặt rất dễ: cho chúng tôi biết tour hoặc xe, ngày và số người. Nhấn bên dưới, chúng tôi sẽ trả lời qua WhatsApp.',book_btn:'Đặt qua WhatsApp',
    thanks:'Không có gì! Bạn cần giúp gì nữa không?',bye:'Cảm ơn bạn đã trò chuyện! Chúng tôi luôn sẵn sàng.',more:'Bạn cần gì nữa không?',
    which_t:'Bạn muốn biết về tour nào?',ask_which:'Bạn hỏi về tour hay thuê xe?',as_tour:'{c} (tour)',as_rent:'{c} (thuê xe)',
    price_sum:'Tour từ ${a}/người. Thuê xe từ ${b}/ngày. Chọn để xem danh sách đầy đủ:',deposit:'Đặt cọc',info:'Lưu ý',need:'Thông tin cần để đặt',
    pp:'mỗi người',cap:'Sức chứa',inclv:'Gồm khóa và mũ bảo hiểm',noitin:'Lịch trình chi tiết có trên trang tour.',view:'Xem trên trang tour',
    nodur:'Chưa có giờ chính xác cho tour này — đội ngũ của chúng tôi có thể xác nhận cho bạn.',lead:'Gợi ý phổ biến',cheap_t:'Tour giá thấp nhất của chúng tôi là:',sun_t:'Đây là các tour bình minh:',nomatch:'Tôi không tìm thấy mục này trên website.'},
  th:{title:'SiemRide',status:'ออนไลน์ · ตอบทันที',hello:'สวัสดี! 👋 ยินดีต้อนรับสู่ SiemRide ถามเรื่องทัวร์ เช่ารถ ราคา หรือวิธีจองได้เลย',ph:'พิมพ์คำถามของคุณ…',
    c_tours:'ทัวร์และราคา',c_rent:'เช่ารถ',c_incl:'รวมอะไรบ้าง?',c_human:'คุยกับเจ้าหน้าที่',c_contact:'ข้อมูลติดต่อ',c_book:'วิธีจอง',
    details:'รายละเอียด',book:'จองเลย',alltours:'ทัวร์ทั้งหมด',allrent:'เช่าทั้งหมด',back:'ตัวเลือกอื่น',from:'เริ่มที่',perday:'/ วัน',popular:'ยอดนิยม',upto:'สูงสุด',
    incl:'รวมอยู่ในราคา',excl:'ไม่รวม',hl:'ไฮไลต์',itin:'กำหนดการ',dur:'ระยะเวลา',start:'เวลาเริ่ม',price:'ราคา',loc:'สถานที่',notice:'ควรทราบ',
    t_intro:'เรามีทัวร์ {n} รายการรอบเสียมเรียบ คุณชอบแบบไหน?',r_intro:'เรามีเช่าจักรยาน อีไบค์ มอเตอร์ไซค์ ตุ๊กตุ๊ก และรถยนต์/รถตู้ ต้องการแบบไหน?',
    cat_moto:'ทัวร์มอเตอร์ไซค์',cat_bike:'ทัวร์จักรยาน',cat_ebike:'ทัวร์อีไบค์',r_bike:'จักรยาน',r_ebike:'อีไบค์',r_moto:'มอเตอร์ไซค์',r_tuktuk:'ตุ๊กตุ๊ก',r_carvan:'รถยนต์ / รถตู้',
    in_cat:'นี่คือ{c}ของเรา:',r_in:'นี่คือสิ่งที่เรามีสำหรับ{c}:',fallback:'ขออภัย ฉันยังไม่เข้าใจ ลองถามชื่อทัวร์ ประเภทรถเช่า ราคา หรือการจอง หรือคุยกับทีมงานของเรา',
    closest:'คุณหมายถึงรายการเหล่านี้หรือไม่?',human:'ทีมงานยินดีช่วยเหลือ เลือกช่องทางติดต่อ:',call:'โทร',wa:'WhatsApp',mail:'อีเมล',msg:'ส่งข้อความ',addr:'ที่อยู่',
    book_how:'จองง่ายๆ แจ้งทัวร์หรือรถ วันที่ และจำนวนคน กดด้านล่างแล้วเราจะตอบทาง WhatsApp',book_btn:'จองทาง WhatsApp',
    thanks:'ยินดีค่ะ/ครับ! มีอะไรให้ช่วยอีกไหม?',bye:'ขอบคุณที่คุยกับเรา! เรายินดีช่วยเสมอ',more:'มีอะไรอีกไหม?',
    which_t:'อยากทราบเรื่องทัวร์ไหน?',ask_which:'หมายถึงทัวร์หรือเช่ารถ?',as_tour:'{c} (ทัวร์)',as_rent:'{c} (เช่า)',
    price_sum:'ทัวร์เริ่มที่ ${a} ต่อคน เช่าเริ่มที่ ${b} ต่อวัน เลือกเพื่อดูรายการทั้งหมด:',deposit:'เงินมัดจำ',info:'ควรทราบ',need:'ข้อมูลที่ต้องใช้จอง',
    pp:'ต่อคน',cap:'ความจุ',inclv:'รวมกุญแจล็อกและหมวกกันน็อก',noitin:'ดูรายละเอียดทั้งหมดได้ที่หน้าทัวร์',view:'ดูในหน้าทัวร์',
    nodur:'ทัวร์นี้ยังไม่ระบุเวลาที่แน่นอน ทีมงานของเราสามารถยืนยันให้ได้',lead:'ตัวเลือกยอดนิยม',cheap_t:'ทัวร์ราคาต่ำสุดของเราคือ:',sun_t:'นี่คือทัวร์รับพระอาทิตย์ขึ้น:',nomatch:'ฉันไม่พบข้อมูลนี้บนเว็บไซต์'}
  };
  function lang(){ try{ return (window.SR && SR.lang && SR.lang()) || 'en'; }catch(e){ return 'en'; } }
  function T(k, vars){ var s = (L[lang()] && L[lang()][k]) || L.en[k] || k; if(vars) for(var v in vars) s = s.split('{'+v+'}').join(vars[v]); return s; }
  function esc(s){ return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); }

  /* ---------- text understanding ---------- */
  var STOP = 'the a an of to for in on at and or is are do you we i me my with from this that it can what how which where when about tell please there any have has be your our us get give show want like would could need'.split(' ');
  function norm(s){ return String(s||'').toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9฀-໿ក-៿぀-ヿ一-鿿가-힯\s$#-]/g,' ').replace(/\s+/g,' ').trim(); }
  function toks(s){ return norm(s).split(' ').filter(function(w){ return w.length>2 && STOP.indexOf(w)<0 && /^[a-z0-9$#-]+$/.test(w); }); }
  function has(q, list){ for(var i=0;i<list.length;i++) if(q.indexOf(list[i])>-1) return true; return false; }
  var K = {
    greet:['hello','hi ','hey','good morning','good evening','សួស្តី','สวัสดี','你好','こんにちは','안녕','xin chao'],
    thanks:['thank','thx','merci','អរគុណ','ขอบคุณ','谢谢','ありがとう','감사','cam on'],
    bye:['bye','goodbye','see you','ลาก่อน','再见','さようなら','안녕히'],
    human:['human','real person','agent','staff','someone','operator','talk to','speak to','เจ้าหน้าที่','人工','真人','スタッフ','상담','nhan vien','បុគ្គលិក'],
    contact:['contact','phone','call','whatsapp','email','e-mail','mail','address','where are','where is','location of','office','shop','โทร','ติดต่อ','电话','联系','地址','電話','連絡','전화','연락','dien thoai','lien he','ទូរស័ព្ទ','ទំនាក់ទំនង'],
    price:['price','cost','how much','cheap','rate','fee','pricing','$','ราคา','เท่าไหร่','价格','多少钱','费用','いくら','価格','料金','가격','얼마','gia','bao nhieu','តម្លៃ','ប៉ុន្មាន'],
    cheapest:['cheapest','lowest','budget','affordable','least expensive','ถูกที่สุด','最便宜','最安','가장 저렴','re nhat'],
    tour:['tour','trip','excursion','day trip','guide','ทัวร์','旅游','线路','导游','ツアー','투어','chuyen','ដំណើរកម្សាន្ត','ទេសចរណ៍'],
    rent:['rent','hire','rental','เช่า','租','レンタル','렌탈','대여','thue','ជួល'],
    book:['book','reserve','reservation','booking','order','จอง','预订','预定','予約','예약','dat ','កក់'],
    incl:['include','included','includes','come with','comes with','cover','รวม','包含','含まれ','포함','bao gom','រួមបញ្ចូល'],
    excl:['exclude','not included','extra','additional cost','bring','ไม่รวม','不包含','含まれない','불포함'],
    itin:['itinerary','schedule','plan','timeline','program','route','stops','day by day','กำหนดการ','行程','日程','일정','lich trinh'],
    dur:['how long','duration','hours','long is','takes','ระยะเวลา','多久','时长','所要','소요','bao lau'],
    start:['start','pickup','pick up','pick-up','meet','depart','leave','what time','เวลา','几点','出发','開始','시작','gio'],
    deposit:['deposit','passport','id card','security','มัดจำ','押金','デポジット','보증금','dat coc'],
    policy:['policy','minimum','rules','cancel','refund','delay','นโยบาย','政策','規則'],
    deliver:['deliver','delivery','drop off','hotel','free pickup','ส่ง','送','配送','배달','giao'],
    helmet:['helmet','lock','keylock','safety','หมวก','头盔','ヘルメット','헬멧','mu bao hiem'],
    popular:['popular','best','recommend','favorite','favourite','top','suggest','most','แนะนำ','推荐','おすすめ','추천','goi y'],
    sunrise:['sunrise','sun rise','dawn','พระอาทิตย์ขึ้น','日出','サンライズ','일출','binh minh'],
    sunset:['sunset','evening','พระอาทิตย์ตก','日落','夕日','일몰'],
    family:['family','kids','child','children','baby','เด็ก','家庭','孩子','子供','어린이','tre em'],
    need:['what do i need','what should i bring','requirement','documents','information needed','need to rent','what to bring'],
    nums:[]
  };
  var CATS = {
    moto:{words:['moto','motorbike','motorcycle','scooter','dirt bike','มอเตอร์ไซค์','摩托','バイク','오토바이','xe may','ម៉ូតូ'],t:'moto',r:'moto'},
    ebike:{words:['e-bike','ebike','e bike','electric','อีไบค์','电动','電動','전기','xe dap dien','កង់អគ្គិសនី'],t:'ebike',r:'ebike'},
    bike:{words:['bicycle','bike','cycle','cycling','mountain bike','จักรยาน','自行车','单车','自転車','자전거','xe dap','កង់'],t:'bike',r:'bike'},
    tuktuk:{words:['tuk','tuktuk','tuk-tuk','ตุ๊กตุ๊ก','嘟嘟','トゥクトゥク','툭툭','xe lam','តុកតុក'],t:null,r:'tuktuk'},
    carvan:{words:['car','van','taxi','minivan','sedan','suv','prius','mercedes','passenger','รถยนต์','รถตู้','汽车','面包车','車','バン','밴','자동차','o to','xe van','ឡាន'],t:null,r:'carvan'}
  };
  function detectCat(q){
    if(has(q,CATS.ebike.words)) return 'ebike';
    var order=['moto','tuktuk','carvan','bike']; // "bike" last so "e-bike" / "motorbike" do not fall into it
    for(var i=0;i<order.length;i++){
      var c=order[i], w=CATS[c].words;
      for(var j=0;j<w.length;j++){
        var x=w[j]; if(c==='carvan' && (x==='car'||x==='van')){ if(new RegExp('(^| )'+x+'( |s |$)').test(q)) return c; continue; }
        if(c==='bike' && (x==='bike'||x==='cycle')){ if(new RegExp('(^| )'+x+'(s)?( |$)').test(q)) return c; continue; }
        if(q.indexOf(x)>-1) return c;
      }
    }
    return null;
  }

  /* tour search: IDF-weighted word overlap on title, location and highlights */
  var docs = KB.tours.map(function(t){ return toks([t.title,t.location,t.short,t.highlights.join(' '),t.cat==='moto'?'motorbike':t.cat==='ebike'?'e-bike electric':'bicycle bike'].join(' ')); });
  var df = {}; docs.forEach(function(d){ var seen={}; d.forEach(function(w){ if(!seen[w]){ seen[w]=1; df[w]=(df[w]||0)+1; } }); });
  var GENERIC = {tour:1,siem:1,reap:1,motorbike:1,bike:1,ride:1,cambodia:1,trip:1,day:1,from:1,with:1,ebike:1,electric:1,bicycle:1,price:1,much:1,cost:1,included:1,include:1,tours:1,rental:1,rent:1};
  function findTours(q){
    var qt = toks(q).filter(function(w){ return !GENERIC[w]; });
    if(!qt.length) return [];
    var res = [];
    docs.forEach(function(d,i){
      var sc=0; qt.forEach(function(w){ if(d.indexOf(w)>-1) sc += Math.log(1 + KB.tours.length/(df[w]||1)); else { for(var k=0;k<d.length;k++){ if(w.length>3 && (d[k].indexOf(w)===0 || w.indexOf(d[k])===0) && d[k].length>3){ sc += 0.6*Math.log(1+KB.tours.length/(df[d[k]]||1)); break; } } } });
      if(sc>0) res.push({i:i,s:sc});
    });
    res.sort(function(a,b){return b.s-a.s;});
    return res;
  }
  function findRental(q){
    var out=[];
    Object.keys(KB.rentals).forEach(function(k){ KB.rentals[k].rows.forEach(function(r){
      var name=norm(r.cells[0]+' '+r.cells[1]); var hit=false;
      name.split(' ').forEach(function(w){ if(w.length>3 && !{bike:1,moto:1,city:1,automatic:1,with:1,child:1,seat:1,passenger:1,mountain:1,folding:1,tuktuk:1,'up':1}[w] && q.indexOf(w)>-1) hit=true; });
      if(hit) out.push({cat:k,row:r});
    }); });
    return out;
  }

  /* ---------- state, UI ---------- */
  var ctx = { tour:null, rcat:null, tcat:null };
  var store = { get:function(){ try{return JSON.parse(sessionStorage.getItem('sr_chat_v3')||'null');}catch(e){return null;} }, set:function(v){ try{sessionStorage.setItem('sr_chat_v3',JSON.stringify(v));}catch(e){} } };
  var log = [];
  var css = '' +
  '.sra{position:fixed;right:16px;bottom:16px;z-index:780;width:392px;max-width:calc(100vw - 24px);height:min(660px,calc(100vh - 32px));display:none;flex-direction:column;background:#fbf8f1;border-radius:22px;box-shadow:0 28px 70px rgba(10,24,8,.45),0 0 0 1px rgba(0,0,0,.06);overflow:hidden;font-family:"Work Sans",system-ui,sans-serif;color:#241f19;transform-origin:bottom right}' +
  '.sra.open{display:flex;animation:sraPop .28s cubic-bezier(.2,.8,.2,1)}@keyframes sraPop{from{opacity:0;transform:translateY(18px) scale(.96)}to{opacity:1;transform:none}}' +
  '.sra-h{display:flex;align-items:center;gap:12px;padding:14px 14px 14px 16px;background:linear-gradient(135deg,#3f8a2a 0%,#2C5E1A 55%,#1b3d10 100%);color:#fff;position:relative}' +
  '.sra-av{width:44px;height:44px;border-radius:50%;background:#fff;display:grid;place-items:center;flex:0 0 auto;position:relative;box-shadow:0 4px 12px rgba(0,0,0,.25)}.sra-av img{width:34px;height:34px;object-fit:contain}' +
  '.sra-av:after{content:"";position:absolute;right:0;bottom:0;width:11px;height:11px;border-radius:50%;background:#37d67a;border:2px solid #2C5E1A;animation:sraLive 2s infinite}@keyframes sraLive{0%,100%{box-shadow:0 0 0 0 rgba(55,214,122,.6)}70%{box-shadow:0 0 0 7px rgba(55,214,122,0)}}' +
  '.sra-t{flex:1;min-width:0}.sra-t b{display:block;font-size:16px;letter-spacing:.2px;line-height:1.2}.sra-t span{display:block;font-size:12px;opacity:.88;margin-top:2px}' +
  '.sra-x{width:34px;height:34px;border-radius:50%;border:0;background:rgba(255,255,255,.18);color:#fff;font-size:20px;line-height:1;cursor:pointer;transition:background .2s}.sra-x:hover{background:rgba(255,255,255,.32)}' +
  '.sra-b{flex:1;overflow-y:auto;padding:16px 14px 8px;display:flex;flex-direction:column;gap:12px;scroll-behavior:smooth;background:radial-gradient(circle at 20% 0%,#fff 0%,#f4efe3 100%)}' +
  '.sra-m{display:flex;gap:8px;align-items:flex-end;max-width:100%;animation:sraIn .25s ease}@keyframes sraIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}' +
  '.sra-m.u{justify-content:flex-end}.sra-m .sra-mav{width:26px;height:26px;border-radius:50%;background:#fff;flex:0 0 auto;display:grid;place-items:center;box-shadow:0 2px 6px rgba(0,0,0,.15)}.sra-mav img{width:20px;height:20px;object-fit:contain}' +
  '.sra-bub{background:#fff;border-radius:16px 16px 16px 4px;padding:10px 13px;font-size:14.5px;line-height:1.45;box-shadow:0 2px 8px rgba(36,31,25,.08);max-width:calc(100% - 36px);min-width:0;overflow-wrap:anywhere}' +
  '.sra-m.u .sra-bub{background:linear-gradient(135deg,#2C5E1A,#1f4a12);color:#fff;border-radius:16px 16px 4px 16px;max-width:82%}' +
  '.sra-bub p{margin:0 0 6px}.sra-bub p:last-child{margin-bottom:0}.sra-bub b{font-weight:700}' +
  '.sra-chips{display:flex;flex-wrap:wrap;gap:7px;margin-top:9px}' +
  '.sra-chip,.sra-btn{font:inherit;font-size:13px;font-weight:600;border:1.5px solid #2C5E1A;color:#2C5E1A;background:#fff;border-radius:99px;padding:7px 13px;cursor:pointer;transition:all .18s;text-decoration:none;display:inline-flex;align-items:center;gap:6px;line-height:1.2}' +
  '.sra-chip:hover,.sra-btn:hover{background:#2C5E1A;color:#fff;transform:translateY(-1px)}' +
  '.sra-btn.p{background:linear-gradient(135deg,#2fd06d,#1ba84f);border-color:transparent;color:#fff;box-shadow:0 5px 12px rgba(37,211,102,.35)}.sra-btn.p:hover{filter:brightness(1.05);background:linear-gradient(135deg,#2fd06d,#1ba84f)}' +
  '.sra-card{border:1px solid #eadfc9;border-radius:14px;background:#fffdf8;padding:10px 11px;margin-top:8px}.sra-card h4{margin:0 0 4px;font-size:14px;line-height:1.3;color:#1f4a12}' +
  '.sra-meta{display:flex;flex-wrap:wrap;gap:5px 10px;font-size:12px;color:#6b6258;margin-bottom:7px}.sra-pr{font-weight:800;color:#E8440A;font-size:15px}' +
  '.sra-card .sra-chips{margin-top:7px}.sra-list{margin:4px 0 0;padding-left:18px;font-size:13.5px}.sra-list li{margin:2px 0}' +
  '.sra-h5{font-size:11px;text-transform:uppercase;letter-spacing:.07em;color:#6b6258;margin:9px 0 2px;font-weight:700}' +
  '.sra-tl{margin:4px 0 0;padding:0;list-style:none;border-left:2px solid #dfd2b7}.sra-tl li{position:relative;padding:0 0 7px 12px;font-size:13px}.sra-tl li:before{content:"";position:absolute;left:-5px;top:5px;width:8px;height:8px;border-radius:50%;background:#FF8C42}.sra-tl b{color:#1f4a12}' +
  '.sra-row{display:flex;justify-content:space-between;gap:10px;font-size:13.5px;padding:5px 0;border-bottom:1px dashed #e6dbc4}.sra-row:last-child{border-bottom:0}.sra-pop{font-size:10px;font-weight:800;background:linear-gradient(135deg,#ff4d12,#ffb21f);color:#fff;border-radius:99px;padding:1px 7px;margin-left:5px;vertical-align:middle;text-transform:uppercase}' +
  '.sra-typing{display:inline-flex;gap:4px;padding:3px 2px}.sra-typing i{width:7px;height:7px;border-radius:50%;background:#9aa78f;animation:sraDot 1s infinite}.sra-typing i:nth-child(2){animation-delay:.15s}.sra-typing i:nth-child(3){animation-delay:.3s}@keyframes sraDot{0%,60%,100%{transform:translateY(0);opacity:.5}30%{transform:translateY(-5px);opacity:1}}' +
  '.sra-f{display:flex;gap:8px;padding:10px 12px;border-top:1px solid #eadfc9;background:#fff}' +
  '.sra-f input{flex:1;min-width:0;font:inherit;font-size:15px;border:1.5px solid #e2dac8;background:#f8f4ea;border-radius:99px;padding:11px 16px;color:#241f19;transition:border-color .2s,box-shadow .2s}.sra-f input:focus{outline:0;border-color:#2C5E1A;background:#fff;box-shadow:0 0 0 4px rgba(44,94,26,.12)}' +
  '.sra-s{width:44px;height:44px;border-radius:50%;border:0;background:linear-gradient(135deg,#3f8a2a,#1b3d10);color:#fff;cursor:pointer;display:grid;place-items:center;flex:0 0 auto;transition:transform .15s;box-shadow:0 5px 12px rgba(44,94,26,.35)}.sra-s:hover{transform:scale(1.07)}' +
  '@media (max-width:520px){.sra{right:0;bottom:0;left:0;width:100%;max-width:none;height:100%;max-height:100dvh;border-radius:0}.sra-f{padding-bottom:max(10px,env(safe-area-inset-bottom))}}' +
  '@media (prefers-reduced-motion:reduce){.sra.open,.sra-m{animation:none}.sra-av:after{animation:none}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var box = document.createElement('div'); box.className='sra'; box.setAttribute('role','dialog'); box.setAttribute('aria-label','SiemRide');
  box.innerHTML = '<div class="sra-h"><div class="sra-av"><img src="'+esc(logo)+'" alt="SiemRide" onerror="this.style.display=\'none\'"></div><div class="sra-t"><b data-k="title">SiemRide</b><span data-k="status"></span></div><button type="button" class="sra-x" aria-label="Close">&times;</button></div>' +
    '<div class="sra-b" aria-live="polite"></div>' +
    '<form class="sra-f" autocomplete="off"><input type="text" maxlength="300" aria-label="Message"><button class="sra-s" type="submit" aria-label="Send"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg></button></form>';
  document.body.appendChild(box);
  var body = box.querySelector('.sra-b'), form = box.querySelector('.sra-f'), input = form.querySelector('input');
  function paintChrome(){ box.querySelector('[data-k=title]').textContent=T('title'); box.querySelector('[data-k=status]').textContent=T('status'); input.placeholder=T('ph'); }

  function scrollDown(){ body.scrollTop = body.scrollHeight; }
  function addMsg(who, html, save){
    var m = document.createElement('div'); m.className='sra-m '+(who==='u'?'u':'b');
    m.innerHTML = (who==='b' ? '<span class="sra-mav"><img src="'+esc(logo)+'" alt="SiemRide" onerror="this.parentNode.style.display=\'none\'"></span>' : '') + '<div class="sra-bub">'+html+'</div>';
    body.appendChild(m); scrollDown();
    if(save!==false){ log.push({w:who,h:html}); store.set({log:log.slice(-40),ctx:ctx}); }
    return m;
  }
  function chips(list){ return '<div class="sra-chips">'+list.map(function(c){ return c.href ? '<a class="sra-btn'+(c.p?' p':'')+'" href="'+esc(c.href)+'" target="'+(c.self?'_self':'_blank')+'" rel="noopener">'+c.t+'</a>' : '<button type="button" class="sra-'+(c.p?'btn p':'chip')+'" data-act="'+esc(c.a)+'" data-arg="'+esc(c.g==null?'':c.g)+'">'+c.t+'</button>'; }).join('')+'</div>'; }
  function mainChips(){ return chips([{t:T('c_tours'),a:'say',g:'tours'},{t:T('c_rent'),a:'say',g:'rentals'},{t:T('c_book'),a:'say',g:'how to book'},{t:T('c_human'),a:'say',g:'talk to a human'}]); }
  function money(n){ return '$'+n; }
  function catName(c){ return T('cat_'+c); }
  function tourUrl(t){ return ROOT + 'Tours/Tours.html#' + t.cat; }
  function waLink(text){ return 'https://wa.me/'+CO.whatsapp+'?text='+encodeURIComponent(text); }

  /* ---------- answer builders ---------- */
  function tourCard(t, i, full){
    var h = '<div class="sra-card"><h4>'+esc(t.title)+'</h4><div class="sra-meta"><span>📍 '+esc(t.location)+'</span>'+(t.duration?'<span>⏱ '+esc(t.duration.replace(' (approx)',''))+'</span>':'')+'<span>'+esc(catName(t.cat))+'</span></div>' +
      '<div><span class="sra-pr">'+T('from')+' '+money(t.price)+'</span> <span class="sra-meta" style="display:inline">'+T('pp')+'</span></div>';
    h += chips([{t:T('details'),a:'tour',g:i},{t:T('book'),a:'book',g:'t'+i,p:1}]);
    return h+'</div>';
  }
  function ansTourList(cat){
    ctx.tcat=cat;
    var list = KB.tours.map(function(t,i){return {t:t,i:i};}).filter(function(x){ return !cat || x.t.cat===cat; });
    var h = '<p>'+(cat ? T('in_cat',{c:'<b>'+esc(catName(cat))+'</b>'}) : T('t_intro',{n:KB.tours.length}))+'</p>';
    if(!cat) return h + chips([{t:'🏍️ '+catName('moto'),a:'say',g:'moto tours'},{t:'🚲 '+catName('bike'),a:'say',g:'bike tours'},{t:'⚡ '+catName('ebike'),a:'say',g:'e-bike tours'},{t:T('c_cheap'),a:'say',g:'cheapest tour'}]);
    return h + list.map(function(x){ return tourCard(x.t,x.i); }).join('') + chips([{t:T('back'),a:'say',g:'tours'}]);
  }
  function ansTour(i, topic){
    var t = KB.tours[i]; ctx.tour=i; ctx.tcat=t.cat;
    var h='';
    if(topic==='incl'){ h='<p><b>'+esc(t.title)+'</b></p><div class="sra-h5">'+T('incl')+'</div><ul class="sra-list">'+t.included.map(function(x){return '<li>'+esc(x)+'</li>';}).join('')+'</ul>'+(t.excluded.length?'<div class="sra-h5">'+T('excl')+'</div><ul class="sra-list">'+t.excluded.map(function(x){return '<li>'+esc(x)+'</li>';}).join('')+'</ul>':''); }
    else if(topic==='itin'){ h='<p><b>'+esc(t.title)+'</b></p>'+(t.itinerary.length?'<ul class="sra-tl">'+t.itinerary.map(function(p){return '<li><b>'+esc(p[0])+'</b> — '+esc(p[1])+'</li>';}).join('')+'</ul>':'<p>'+T('noitin')+'</p>'); }
    else if(topic==='price'){ h='<p><b>'+esc(t.title)+'</b></p><p><span class="sra-pr">'+T('from')+' '+money(t.price)+'</span> '+T('pp')+'</p>'+(t.priceNote?'<p style="font-size:13px;color:#6b6258">'+esc(t.priceNote)+'</p>':''); }
    else if(topic==='dur'){ var dm=t.title.match(/(\d+)-Day/i); h='<p><b>'+esc(t.title)+'</b></p><p>'+(t.duration?'⏱ '+esc(t.duration)+(t.start?' · '+T('start')+': '+esc(t.start):''):(dm?'⏱ '+esc(dm[0])+' · ':'')+T('nodur'))+'</p>'; }
    else {
      h='<div class="sra-card" style="margin-top:0"><h4>'+esc(t.title)+'</h4><div class="sra-meta"><span>📍 '+esc(t.location)+'</span>'+(t.duration?'<span>⏱ '+esc(t.duration.replace(' (approx)',''))+'</span>':'')+(t.start?'<span>🕒 '+esc(t.start)+'</span>':'')+'</div>' +
        '<p style="margin:0 0 6px;font-size:13.5px">'+esc(t.short||'')+'</p><div class="sra-h5">'+T('hl')+'</div><ul class="sra-list">'+t.highlights.map(function(x){return '<li>'+esc(x)+'</li>';}).join('')+'</ul>' +
        '<div style="margin-top:8px"><span class="sra-pr">'+T('from')+' '+money(t.price)+'</span> <span class="sra-meta" style="display:inline">'+T('pp')+'</span></div>'+(t.notice?'<div class="sra-h5">'+T('notice')+'</div><p style="font-size:13px;margin:0">'+esc(t.notice)+'</p>':'')+'</div>';
    }
    var cs=[]; if(topic!=='incl') cs.push({t:T('c_incl'),a:'tour:incl',g:i}); if(topic!=='itin' && t.itinerary.length) cs.push({t:T('itin'),a:'tour:itin',g:i}); if(topic) cs.push({t:T('details'),a:'tour',g:i});
    cs.push({t:T('book'),a:'book',g:'t'+i,p:1}); cs.push({t:T('view'),href:tourUrl(t),self:1}); cs.push({t:T('alltours'),a:'say',g:'tours'});
    return h+chips(cs);
  }
  function rentRows(k){ return KB.rentals[k].rows.map(function(r){
    var second = k==='tuktuk'||k==='carvan' ? T('upto')+' '+r.cells[1].replace(/\D/g,'') : r.cells[1];
    return '<div class="sra-row"><span>'+esc(r.cells[0]+(k==='tuktuk'||k==='carvan'?'':' · '+r.cells[1]))+(k==='tuktuk'||k==='carvan'?' <small style="color:#6b6258">('+esc(second)+')</small>':'')+(r.popular?'<span class="sra-pop">'+T('popular')+'</span>':'')+'</span><b class="sra-pr" style="font-size:14px">'+money(r.price)+(k==='tuktuk'?'':' '+T('perday'))+'</b></div>'; }).join(''); }
  function ansRentCat(k, topic){
    ctx.rcat=k; var R=KB.rentals[k], inf=R.info; var h='';
    if(topic==='deposit'){ var d=inf['Deposit']; h='<p><b>'+T('deposit')+'</b></p><p>'+esc(d?d.join(' '):T('nomatch'))+'</p>'; }
    else if(topic==='need'){ var n=inf['Information Needed For Booking']||[]; h='<p><b>'+T('need')+'</b></p><ul class="sra-list">'+n.map(function(x){return '<li>'+esc(x)+'</li>';}).join('')+'</ul>'; }
    else if(topic==='info'){ var w=inf['Why Rent From Us']||inf['Why Ride With Us']||[], p=inf['Rental Policy']||[]; h='<p><b>'+T('info')+'</b></p><ul class="sra-list">'+w.concat(p).map(function(x){return '<li>'+esc(x)+'</li>';}).join('')+'</ul>'; }
    else { h='<p>'+T('r_in',{c:'<b>'+esc(T('r_'+k))+'</b>'})+'</p><div class="sra-card" style="margin-top:6px">'+rentRows(k)+'</div>'+((k==='bike'||k==='ebike'||k==='moto')?'<p style="font-size:12.5px;color:#6b6258;margin-top:8px">🔒 '+T('inclv')+'</p>':''); }
    return h+chips([{t:T('book'),a:'book',g:'r'+k,p:1},{t:T('info'),a:'rent:info',g:k},{t:T('deposit'),a:'rent:deposit',g:k},{t:T('c_rent'),a:'say',g:'rentals'}]);
  }
  function ansRentals(){
    return '<p>'+T('r_intro')+'</p>'+chips(['bike','ebike','moto','tuktuk','carvan'].map(function(k){ var m=Math.min.apply(null,KB.rentals[k].rows.map(function(r){return r.price;})); return {t:T('r_'+k)+' · '+T('from')+' '+money(m),a:'rent',g:k}; }));
  }
  function ansPriceSummary(){
    var a=Math.min.apply(null,KB.tours.map(function(t){return t.price;})), b=Math.min.apply(null,[].concat.apply([],Object.keys(KB.rentals).map(function(k){return KB.rentals[k].rows.map(function(r){return r.price;});})));
    return '<p>'+T('price_sum',{a:a,b:b})+'</p>'+chips([{t:T('alltours'),a:'say',g:'tours'},{t:T('allrent'),a:'say',g:'rentals'}]);
  }
  function ansContact(){
    return '<p>'+T('human')+'</p><div class="sra-card" style="margin-top:6px"><div class="sra-row"><span>📞 '+esc(CO.phone)+'</span></div><div class="sra-row"><span>✉️ '+esc(CO.email)+'</span></div><div class="sra-row"><span>📍 '+esc(CO.address)+'</span></div></div>' +
      chips([{t:'📞 '+T('call'),href:'tel:'+CO.tel,self:1},{t:'WhatsApp',href:waLink('Hello SiemRide!'),p:1},{t:'✉️ '+T('mail'),href:'mailto:'+CO.email,self:1},{t:'💬 '+T('msg'),a:'form'}]);
  }
  function ansBook(){
    return '<p>'+T('book_how')+'</p>'+chips([{t:'💬 '+T('book_btn'),href:waLink('Hello SiemRide! I would like to book. '),p:1},{t:T('alltours'),a:'say',g:'tours'},{t:T('allrent'),a:'say',g:'rentals'}]);
  }
  function closestChips(q){
    var r=findTours(q).slice(0,3); var c=r.map(function(x){ return {t:esc(KB.tours[x.i].title.length>46?KB.tours[x.i].title.slice(0,44)+'…':KB.tours[x.i].title),a:'tour',g:x.i}; });
    return c;
  }

  /* ---------- brain ---------- */
  function respond(raw){
    var q = norm(raw); if(!q) return mainChipsHtml();
    function mainChipsHtml(){ return '<p>'+T('more')+'</p>'+mainChips(); }
    var cat = detectCat(q);
    var isTour = has(q,K.tour), isRent = has(q,K.rent);
    var rr = findRental(q); var tm = findTours(q);
    var strongTour = tm.length && tm[0].s >= 1.4;
    var topicPrice = has(q,K.price), topicIncl = has(q,K.incl), topicExcl = has(q,K.excl), topicItin = has(q,K.itin), topicDur = has(q,K.dur), topicStart = has(q,K.start);

    if(has(q,K.thanks)) return '<p>'+T('thanks')+'</p>'+mainChips();
    if(has(q,K.bye)) return '<p>'+T('bye')+'</p>';
    if(has(q,K.human) || (has(q,K.contact) && !topicPrice)) return ansContact();
    if(q==='tours'||q==='tour') return ansTourList(null);
    if(q==='rentals'||q==='rental') return ansRentals();
    if(has(q,K.cheapest) && (isTour || !cat || cat==='moto' || cat==='bike' || cat==='ebike') && !isRent){
      var idx=0; KB.tours.forEach(function(t,i){ if((!cat||t.cat===cat) && (KB.tours[idx].price>t.price || (cat && KB.tours[idx].cat!==cat))) idx=i; });
      return '<p>'+T('cheap_t')+'</p>'+tourCard(KB.tours[idx],idx);
    }
    // a specific tour was named
    if(strongTour && (!cat || isTour || tm[0].s>=3.5) && !(isRent && !isTour)){
      var i=tm[0].i, topic=null;
      if(topicIncl) topic='incl'; else if(topicExcl) topic='incl'; else if(topicItin) topic='itin'; else if(topicPrice) topic='price'; else if(topicDur||topicStart) topic='dur';
      // several equally good matches (e.g. same tour in bike and e-bike) -> let the visitor pick
      var same = tm.filter(function(x){ return x.s >= tm[0].s*0.98; });
      if(same.length>1 && !cat && !topic && !(isTour&&false)) return '<p>'+T('closest')+'</p>'+same.slice(0,3).map(function(x){return tourCard(KB.tours[x.i],x.i);}).join('');
      if(same.length>1 && cat){ var f=same.filter(function(x){return KB.tours[x.i].cat===cat;}); if(f.length) i=f[0].i; }
      return ansTour(i,topic);
    }
    if(has(q,K.sunrise)){
      var s=[]; KB.tours.forEach(function(t,i){ if(/sunrise|dawn/i.test(t.title+' '+t.short)) s.push(i); });
      if(s.length) return '<p>'+T('sun_t')+'</p>'+s.map(function(i){return tourCard(KB.tours[i],i);}).join('');
    }
    // specific rental item
    if(has(q,K.need) && (cat||ctx.rcat) && !isTour) return ansRentCat(cat?CATS[cat].r:ctx.rcat,'need');
    if(rr.length && !isTour){ return ansRentCat(rr[0].cat, topicPrice?null:null); }
    // category words
    if(cat){
      if(isRent || (!isTour && (cat==='tuktuk'||cat==='carvan'))) return ansRentCat(CATS[cat].r);
      if(isTour && CATS[cat].t) return ansTourList(CATS[cat].t);
      if(!isTour && !isRent && CATS[cat].t){
        if(has(q,K.deposit)) return ansRentCat(cat,'deposit');
        return '<p>'+T('ask_which')+'</p>'+chips([{t:T('as_tour',{c:esc(catName(CATS[cat].t))}),a:'say',g:CATS[cat].t+' tours'},{t:T('as_rent',{c:esc(T('r_'+cat))}),a:'say',g:CATS[cat].r+' rental'}]);
      }
    }
    // follow-ups using remembered context
    if(ctx.tour!=null && (topicIncl||topicExcl)) return ansTour(ctx.tour,'incl');
    if(ctx.tour!=null && topicItin) return ansTour(ctx.tour,'itin');
    if(ctx.tour!=null && (topicDur||topicStart)) return ansTour(ctx.tour,'dur');
    if(ctx.tour!=null && topicPrice && !isRent) return ansTour(ctx.tour,'price');
    if(ctx.rcat && has(q,K.deposit)) return ansRentCat(ctx.rcat,'deposit');
    if(ctx.rcat && (has(q,K.policy)||has(q,K.deliver)||has(q,K.helmet))) return ansRentCat(ctx.rcat,'info');
    if(has(q,K.deposit)) return ansRentCat('moto','deposit');
    if(has(q,K.helmet)||has(q,K.deliver)||has(q,K.policy)) return ansRentCat(ctx.rcat||'moto','info');
    if(has(q,K.book)) return ansBook();
    if(topicPrice) return ansPriceSummary();
    if(isRent) return ansRentals();
    if(isTour || has(q,K.family)||has(q,K.sunset)||has(q,K.popular)){
      if(tm.length) return '<p>'+T('closest')+'</p>'+tm.slice(0,3).map(function(x){return tourCard(KB.tours[x.i],x.i);}).join('');
      return ansTourList(null);
    }
    if(has(q,K.greet) || q.length<3) return '<p>'+T('hello')+'</p>'+mainChips();
    if(tm.length && tm[0].s>=1.2) return '<p>'+T('closest')+'</p>'+tm.slice(0,3).map(function(x){return tourCard(KB.tours[x.i],x.i);}).join('');
    return '<p>'+T('fallback')+'</p>'+mainChips();
  }

  /* ---------- flow ---------- */
  var busy=false;
  function say(text, silent){
    if(busy) return; busy=true;
    if(!silent) addMsg('u', esc(text));
    var typing = addMsg('b','<span class="sra-typing"><i></i><i></i><i></i></span>', false);
    var html; try{ html = respond(text); }catch(e){ if(window.console) console.warn(e); html = '<p>'+T('fallback')+'</p>'+mainChips(); }
    var delay = Math.min(900, 350 + html.length/18);
    setTimeout(function(){ typing.remove(); addMsg('b', html); busy=false; if(window.innerWidth>520) input.focus(); }, delay);
  }
  function showBook(token){
    var txt='Hello SiemRide! I would like to book';
    if(token[0]==='t'){ var t=KB.tours[+token.slice(1)]; txt+=': '+t.title+' ('+catName(t.cat)+'). Date: ___  People: ___'; }
    else { var k=token.slice(1); txt+=' a rental: '+T('r_'+k)+'. Date: ___  How many: ___'; }
    window.open(waLink(txt),'_blank','noopener');
  }
  box.addEventListener('click', function(e){
    var b = e.target.closest('[data-act]'); if(!b) return;
    var a=b.getAttribute('data-act'), g=b.getAttribute('data-arg');
    if(a==='say'){ say(g); }
    else if(a==='tour'||a==='tour:incl'||a==='tour:itin'){ if(busy) return; busy=true; addMsg('u',esc(KB.tours[+g].title.slice(0,60))); var ty=addMsg('b','<span class="sra-typing"><i></i><i></i><i></i></span>',false); var html=ansTour(+g, a==='tour:incl'?'incl':a==='tour:itin'?'itin':null); setTimeout(function(){ ty.remove(); addMsg('b',html); busy=false; },450); }
    else if(a==='rent'||a==='rent:info'||a==='rent:deposit'){ if(busy) return; busy=true; addMsg('u',esc(T('r_'+g))); var ty2=addMsg('b','<span class="sra-typing"><i></i><i></i><i></i></span>',false); var h2=ansRentCat(g,a==='rent:info'?'info':a==='rent:deposit'?'deposit':null); setTimeout(function(){ ty2.remove(); addMsg('b',h2); busy=false; },450); }
    else if(a==='book'){ showBook(g); }
    else if(a==='form'){ var f=document.querySelector('.wa-float'); if(f) f.click(); else window.open(waLink('Hello SiemRide!'),'_blank','noopener'); }
  });
  form.addEventListener('submit', function(e){ e.preventDefault(); var v=input.value.trim(); if(!v) return; input.value=''; say(v); });
  box.querySelector('.sra-x').addEventListener('click', close);
  document.addEventListener('keydown', function(e){ if(e.key==='Escape') close(); });
  document.addEventListener('langchange', paintChrome);

  function open(){
    paintChrome(); box.classList.add('open');
    if(!body.children.length){
      var s = store.get();
      if(s && s.log && s.log.length){ ctx = s.ctx||ctx; log = s.log; s.log.forEach(function(m){ addMsg(m.w,m.h,false); }); }
      else { addMsg('b','<p>'+T('hello')+'</p>'+mainChips()); }
    }
    setTimeout(function(){ scrollDown(); if(window.innerWidth>520) input.focus(); },60);
  }
  function close(){ box.classList.remove('open'); }
  window.SR_ASSISTANT = { open:open, close:close };
})();
