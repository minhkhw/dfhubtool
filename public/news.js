(() => {
  const stories = window.DFVNNews || [];
  const homeGrid = document.getElementById('homeNewsGrid');
  const featured = document.getElementById('newsFeatured');
  const feed = document.getElementById('newsFeed');
  const detail = document.getElementById('newsDetail');
  const intro = document.querySelector('.news-intro');
  const archive = document.querySelector('.news-archive');
  const search = document.getElementById('newsSearch');
  const count = document.getElementById('newsCount');
  let activeFilter = 'all';

  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char]);
  const officialUrl = value => {
    try {
      const url = new URL(value);
      return url.protocol === 'https:' && url.hostname === 'deltaforce.garena.vn' ? url.href : 'https://deltaforce.garena.vn/';
    } catch { return 'https://deltaforce.garena.vn/'; }
  };
  const articleSlug = story => {
    try { return new URL(officialUrl(story.source)).pathname.split('/').filter(Boolean).pop(); }
    catch { return ''; }
  };
  const articleHref = story => `/news?article=${encodeURIComponent(articleSlug(story))}`;
  const card = (story, compact = false) => {
    const href = escapeHtml(articleHref(story));
    const title = escapeHtml(story.title);
    const image = escapeHtml(story.image || 'assets/dfvn-battlefield-banner.png');
    const label = escapeHtml(story.categoryLabel || 'TIN TỨC');
    const date = escapeHtml(story.displayDate);
    const summary = escapeHtml(story.summary);
    const pinBadge = story.pinned ? '<span class="news-card-pin" title="Ghim nổi bật" aria-label="Ghim nổi bật"></span>' : '';
    const imageLink = `<a class="news-thumb" href="${href}" aria-label="Đọc bài: ${title}">${pinBadge}<img src="${image}" alt="Ảnh minh họa: ${title}" loading="lazy" decoding="async"><span class="news-thumb-code">DELTA FORCE <i></i> OFFICIAL</span></a>`;
    return `<article class="${compact ? 'news-row-card home-news-card' : 'news-row-card'}">
      ${imageLink}
      <div class="news-card-copy"><div class="news-card-meta"><span class="news-tag">${label}</span><time datetime="${escapeHtml(story.date)}">${date}</time></div><h2><a href="${href}">${title}</a></h2><p>${summary}</p><a class="news-more" href="${href}">Đọc bài <svg aria-hidden="true" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4"/></svg></a></div>
    </article>`;
  };

  const details = {
    'thong-bao-cap-nhat-30-09-2026': {
      intro: 'Bản cập nhật ngày 30/09 được phát hành không gián đoạn nên trận đấu và ghép trận không dừng. Nếu gặp lỗi sau khi cập nhật, khởi động lại game; bản cũ cần cập nhật mới để đăng nhập.',
      sections: [
        { heading: 'Cập nhật cửa hàng · Rút thưởng Pháo Cầu Vồng', meta: ['02/10–31/10', 'Cửa hàng → Nổi Bật'], image: 'assets/news-garena/articles/rainbow-cannon-draw.jpg', text: 'Vòng quay không lặp phần thưởng. Lượt đầu tiên có giá 10 Xu Delta hoặc Vé Delta; khi lấy hết quà trong một vòng, vòng tiếp theo tự mở. Trúng giải đặc biệt cuối vòng sẽ nhận ngẫu nhiên một skin Pháo Cầu Vồng cùng các phần thưởng khác còn thiếu trong vòng.', items: ['Skin Pháo Cầu Vồng cho AWM SR, P90 và MP5.', 'Ảnh đại diện theo bộ, thẻ quân nhân, charm và sơn phun.', 'Hộp TurBrick Quà Tặng Kỷ Niệm Delta.', 'Thẻ EXP Vũ Khí Cao Cấp.'] },
        { heading: 'Cân bằng vũ khí · FS-12 Shotgun', meta: ['Chế độ Gỡ Bom'], text: 'Các hệ số sát thương của FS-12 được điều chỉnh như sau:', items: ['Tay/chân: 0,6 → 0,4.', 'Vùng bụng: 1,0 → 0,9.', 'Hệ số giảm thương: 0,9/0,8 → 0,8/0,7.'] },
        { heading: 'Sửa lỗi và tối ưu hóa', text: 'Các sửa lỗi của bản này tập trung vào vị trí ngoài giới hạn và thao tác với NC8.', items: ['Chặn vị trí có thể đi ra ngoài giới hạn gần điểm đặt bom A tại Quá Cảnh.', 'Chặn vị trí ngoài giới hạn ở đường giữa Trang Viên Shariq.', 'Sửa lỗi NC8 bị rơi tại một số vị trí ở Trang Viên Shariq khiến không thể nhặt lại.', 'Sửa lỗi có thể gỡ NC8 bất kể khoảng cách theo chiều dọc.'] }
      ]
    },
    'thong-bao-chuyen-ung-dung-garena-delta-force-viet-nam': {
      intro: 'Garena thông báo sẽ phát hành ứng dụng mới Garena Delta Force Việt Nam trên App Store và Google Play. Dữ liệu nhân vật, tiến trình và vật phẩm tiếp tục được giữ khi đăng nhập bằng đúng tài khoản đã liên kết.',
      sections: [
        { heading: 'Thông tin ứng dụng và dữ liệu', text: 'Ứng dụng cũ vẫn chơi được đến bản cập nhật kế tiếp; ứng dụng mới dùng được sau khi ra mắt. Nhân vật được giữ nguyên và đăng nhập bằng cùng tài khoản.', items: ['Ứng dụng hiện tại: Garena Delta Force.', 'Ứng dụng mới: Garena Delta Force Việt Nam.', 'Tiến trình và vật phẩm được bảo toàn khi tài khoản được liên kết đúng.'] },
        { heading: 'Lưu ý · Apple ID và tài khoản Khách', image: 'assets/news-garena/articles/app-transfer-account-steps.jpg', text: 'Nếu đang dùng Apple ID hoặc tài khoản Khách, hãy liên kết trước với một tài khoản Garena, Google, Facebook hoặc LINE còn trống (chưa có nhân vật) để bảo đảm đồng bộ.', items: ['Trong game: Thiết Lập → Tài khoản.', 'Có thể dùng trang liên kết tài khoản ngoài ứng dụng.'] },
        { heading: 'Các bước cần làm', text: 'Thực hiện theo thứ tự khi ứng dụng mới được phát hành:', items: ['Liên kết tài khoản trước nếu hiện đăng nhập bằng Apple ID hoặc tài khoản Khách.', 'Tải Garena Delta Force Việt Nam từ App Store hoặc Google Play sau khi ứng dụng chính thức ra mắt.', 'Đăng nhập bằng đúng tài khoản đã liên kết.', 'Xác nhận nhân vật và tiến trình hiện có đã đồng bộ.'] },
        { heading: 'Thời gian phát hành', text: 'Ngày phát hành chính thức và hướng dẫn chi tiết sẽ được cập nhật trên website cùng các kênh truyền thông của Garena Delta Force Việt Nam.' }
      ]
    },
    'cap-nhat-thong-bao-23-09': {
      intro: 'Bản tin sinh nhật hai năm chia nội dung thành hoạt động dùng chung, Chiến Dịch, Chiến Trường, hoạt động hàng tuần và cập nhật cửa hàng. Các mốc dưới đây là những nhóm sự kiện được nêu trong thông báo ngày 22/09.',
      sections: [
        { heading: 'Sự kiện áp dụng cho cả hai chế độ', text: 'Chuỗi nhiệm vụ đăng nhập và nhiệm vụ trận đấu mở tổng cộng tối đa 3.900 Vé Delta giới hạn; mốc đầu bảo đảm 1.000 vé khi đăng nhập và hoàn thành trận vào ngày khai mạc.', items: ['Hoạt động Trứng Phục Sinh dẫn người chơi tìm manh mối ở Layali và các chiến trường Ahsarah.', 'Bảng rút thưởng Trung Thu mở quà đăng nhập, câu đố và ngoại trang Thỏ Ngọc.', 'Nở Rộ là truyện tương tác bốn chương về Vlinder, đi cùng các vật phẩm chủ đề.'] },
        { heading: 'Chiến Dịch · Xu Sinh Nhật và hoạt động Haavk', text: 'Nhiều nhiệm vụ Chiến Dịch cho Xu Sinh Nhật để đổi vật phẩm trong cửa hàng giới hạn. Các hoạt động kể chuyện Haavk, tìm dấu vết, tổ đội và thu hồi quân nhu diễn ra theo lịch riêng.', items: ['Phi Hổ có nhiệm vụ sinh tồn và phần thưởng cộng tác; cửa hàng đổi vật phẩm mở thời gian ngắn.', 'Các gói thưởng bao gồm skin vũ khí, charm, thẻ quân nhân, ảnh đại diện, sơn phun, vé quân trang và đồ sưu tầm.'] },
        { heading: 'Chiến Trường · chế độ và phần thưởng', text: 'Chuỗi sự kiện chiến trường dùng Xu Sinh Nhật làm điểm đổi thưởng, đồng thời có hoạt động theo chế độ mới và nhiệm vụ phương tiện.', items: ['Chủ Lực Cuồng Nộ đưa trận 8v8 trên biển với mục tiêu chiếm cờ dưới nước.', 'Siêu Cường Hóa và Phương Tiện Đối Đầu trao Xu Sinh Nhật qua các trận có tăng cường sức mạnh hoặc nhiệm vụ phương tiện.', 'Mốc thưởng gồm GTQ-35, skin AS VAL/G3/QBZ95-1, charm, thẻ, ảnh đại diện, sơn phun và vé.'] },
        { heading: 'Sự kiện hàng tuần', text: 'Các mục quân nhu hàng tuần, nhân đôi Công trạng, nhiệm vụ vũ khí chỉ định, cửa hàng Xu Tekniq và đổi điểm trận được tách theo chế độ và thời gian.' },
        { heading: 'Cửa hàng · chế tạo Phi Hổ', text: 'Nghiên cứu đặc vụ Vyron – Phi Hổ mở cơ chế tích lũy tiến trình chế tạo đến 100%; tối đa 50 lượt sẽ nhận đủ phần thưởng sự kiện. Bộ thưởng có skin Vyron/G18, thẻ tên, sơn phun, ảnh đại diện, câu nói, hộp TurBrick, thẻ EXP và vé rút thưởng.' }
      ]
    },
    'thong-bao-cap-nhat-17-09': {
      intro: 'Bản cập nhật ngày 17/09 được phát hành không gián đoạn: trận đấu và ghép trận vẫn hoạt động. Nếu bản vá chưa hoàn tất, khởi động lại game; phiên bản cũ cần cập nhật trước khi đăng nhập.',
      sections: [
        { heading: 'Sự kiện trong cả hai chế độ · Tập kết Quân Đoàn', meta: ['17/09–15/10', 'Chiến Dịch + Chiến Trường'], image: 'assets/news-garena/articles/2026-09-17/legion-rally.jpg', text: 'Tạo hoặc tham gia Quân Đoàn, tích điểm qua đăng nhập hằng ngày, phát triển Quân Đoàn và hoàn thành trận. Số thành viên cùng số trận đóng góp quyết định tốc độ mở các mốc; các mốc lớn có thể đạt ngay từ tuần đầu.', items: ['Điểm Quân Đoàn dùng để mở các mốc thưởng.', 'QCQ171 Cơ Giáp Tác Chiến: skin Siêu Việt miễn phí.', 'Bộ skin Đen Thời Thượng cho M1911, MCX LT và M700.', 'Thẻ Quân Nhân giới hạn, hành động độc đáo và các phần quà khác.'] },
        { heading: 'Sự kiện Chiến Dịch · Tiếp Tế Sắp Được Thả', meta: ['17/09–30/09', 'Chiến Dịch'], image: 'assets/news-garena/articles/2026-09-17/campaign-supply-drop.jpg', text: 'Quân nhu thả rơi xuất hiện trong các trận tại năm khu vực: Đập Nước Zero, Thung Lũng Layali, AZ3, Brakkesh và Trạm Không Gian Haavk.' },
        { heading: 'Sự kiện hàng tuần · Quân Nhu', meta: ['18/09–24/09'], text: 'Hai nhiệm vụ Quân Nhu Hàng Tuần tính trận riêng cho từng chế độ.', items: ['Chiến Dịch: nhận Vé Trang Bị Thường và Vé Trang Bị Cao Cấp khi tham gia trận.', 'Chiến Trường: nhận Thẻ EXP Vũ Khí Nâng Cao, Thẻ EXP Vũ Khí Trung Cấp và Thẻ Nhân Đôi EXP Chiến Trường dùng cho một trận.'] },
        { heading: 'Tăng Công Trạng Cuối Tuần', meta: ['19/09–20/09', 'Chiến Trường'], image: 'assets/news-garena/articles/2026-09-17/double-merit.jpg', text: 'Ba trận xếp hạng Chiến Trường đầu tiên trong thời gian sự kiện được tính nhân đôi Công trạng.' },
        { heading: 'Lựa Chọn Của Chuyên Gia', meta: ['18/09–24/09'], text: 'Hoàn thành nhiệm vụ bằng hai vũ khí chỉ định MK4 và PKM để nhận vật phẩm tiêu hao.', items: ['Thẻ EXP Vũ Khí Trung Cấp.', 'Thẻ EXP Vũ Khí Cao Cấp.', 'Thẻ Trang Bị.'] },
        { heading: 'Cửa Hàng Xu Tekniq', meta: ['18/09–24/09'], image: 'assets/news-garena/articles/2026-09-17/tekniq-shop.jpg', text: 'Cửa hàng giới hạn thời gian cho phép dùng Xu Tekniq đổi các quyền lợi sau:', items: ['Chìa Lượng Tử.', 'Phiếu Hậu Cần.', 'Vé Đặc Quyền Két An Toàn Nâng Cao có thời hạn 7 ngày.'] },
        { heading: 'Tổng Kết Chiến Công', meta: ['18/09–24/09', 'Chiến Trường'], text: 'Tích lũy điểm trong trận Chiến Trường để nhận vật phẩm đã định trước.', items: ['Chìa Lượng Tử.', 'Phiếu Hậu Cần.'] },
        { heading: 'Cập nhật cửa hàng · Rút thưởng Sắc Đỏ Thẫm', meta: ['18/09–17/10'], image: 'assets/news-garena/articles/2026-09-17/crimson-red-draw.jpg', text: 'Mở trong Cửa hàng → Nổi bật → Sắc Đỏ Thẫm. Lượt đầu có giá 10 Xu Delta hoặc Vé Delta. Vật phẩm trong cùng vòng không trùng; sau khi nhận đủ vòng, vòng kế tiếp tự mở. Khi trúng giải đặc biệt, người chơi nhận ngẫu nhiên một skin trong bộ cùng các món còn thiếu của vòng đó.', items: ['Skin M250, R93 hoặc S12K thuộc bộ Sắc Đỏ Thẫm.', 'Ảnh đại diện, thẻ quân nhân, sơn phun.', 'Hộp TurBrick – Quà Tặng Kỷ Niệm Delta.', 'Thẻ EXP Vũ Khí Cao Cấp.'] },
        { heading: 'Gói Quân Nhu Rise Series Mùa 2', meta: ['18/09–17/10'], image: 'assets/news-garena/articles/2026-09-17/rise-series-pack.jpg', text: 'Gói nằm tại Cửa hàng → Lựa chọn Hàng đầu → Gói Quân Nhu Rise Series Mùa 2. Giá mua được thông báo là 180 Vé Delta hoặc Xu Delta.', items: ['Cử chỉ Kéo Búa Bao dành cho hai người chơi.', 'K417 Tiểu Đội Hỗ Trợ.'] },
        { heading: 'Cân bằng đặc vụ · Nox', meta: ['Chiến Dịch Sinh Tồn'], text: 'Giảm sát thương duy trì của Drone Truy Mệnh và tăng thời gian trước khi Lựu Đạn Choáng Chiến Lược phát nổ để đối thủ có thêm thời gian phản ứng.', items: ['Drone Truy Mệnh: sát thương mỗi giây sau khi trúng đòn 10 → 5.', 'Lựu Đạn Choáng Chiến Lược: độ trễ ngòi nổ 0,4 → 0,6 giây.'] },
        { heading: 'Cân bằng đặc vụ · Rover', text: 'Các điều chỉnh của Clover được chia riêng cho Chiến Dịch và Chiến Trường; Súng Trường Phi Tiêu cũng được tăng sát thương và thêm khả năng hỗ trợ hồi phục.', items: ['Chiến Dịch — Hung Thần Clover: hồi chiêu 120 → 90 giây; phục hồi sau khi bị đẩy lùi 15 → 12 giây; thời gian hoạt động 40 → 50 giây.', 'Chiến Trường — Hung Thần Clover: hồi chiêu 90 → 75 giây; sát thương 45 → 55.', 'Súng Trường Phi Tiêu: sát thương trúng trực tiếp 70 → 90; sát thương vùng theo thời gian 7 → 13.', 'Đồng minh trong vùng được hồi 7 HP mỗi giây trong 8 giây; hiệu ứng dừng khi họ nhận sát thương.'] },
        { heading: 'Điều chỉnh bản đồ · Phố Cổ Mog', text: 'Các thay đổi bao phủ giai đoạn Hộ Tống, chế độ Công/Thủ và trực thăng UH-60 Black Hawk.', items: ['Hộ Tống — khi hết giờ, Tử Chiến bắt đầu nếu số người tấn công quanh đoàn xe nhiều hơn số phòng thủ, bất kể trạng thái xe.', 'Radio quân dụng giảm thời gian tương tác; thời gian hồi tín hiệu được đặt thành 90 giây.', 'Công/Thủ — mở rộng vùng chiếm Mục Tiêu A, căn cứ triển khai phía trên Phân Khu A và căn cứ của bên tấn công tại Phân Khu C.', 'UH-60 Black Hawk — tăng sát thương súng máy và tối ưu đường tuần tra.'] },
        { heading: 'Cập nhật hệ thống', text: 'Mục Tình Báo G.T.I. được đổi tên chính thức thành Sổ Tay G.T.I.' },
        { heading: 'Sửa lỗi và tối ưu hóa', text: 'Bản vá ghi nhận các sửa lỗi sau:', items: ['Vé Trang Bị Tùy Chỉnh Nhiệm Vụ Mùa Giải dùng được trên bản đồ thường.', 'Bổ sung lựa chọn tải Tài Nguyên HD cho một số mô-đun trong Trung Tâm Tải Xuống.', 'Sửa lỗi một số Đặc Vụ không dùng được K416 ở Chiến Trường.', 'Sửa lỗi Vũ Khí Mới Mùa Giải không mở khóa sau Nhiệm Vụ Kho Giáp ở Chiến Trường.', 'Khôi phục tiếng bước chân Sineva khi âm thanh bị mất.', 'Sửa biểu tượng cảnh báo còn sót sau khi Tên Do Thám của Luna quét.', 'Ngăn Vyron ra khỏi khu vực cho phép tại Thung Lũng Layali.', 'Sửa tiến trình bị kẹt ở Nhiệm Vụ Tiền Thưởng Giá Trị Cao: Phá Sóng tại Layali.', 'Sửa lỗi có thể xuất hiện hai Reis trong cùng khu vực Layali.', 'Sửa lỗi hiển thị tại một số vị trí trên Layali.', 'Sửa lỗi hộp hàng không do trực thăng Đại Bàng Xanh mang theo đôi khi không có chiến lợi phẩm trong nhiệm vụ Zola.', 'Sửa sai lệch giữa phản hồi trúng đích của Lựu Đạn EMP Raptor và bán kính hiệu ứng thật.', 'Sửa lỗi giảm hồi chiêu Trang Bị Chiến Thuật của Vyron và Tempest đôi khi không kích hoạt sau khi hạ Đặc Vụ địch.', 'Sửa lỗi sập game khi khởi chạy trên một số phiên bản Windows 10.', 'Sửa lỗi Đặc Vụ đôi khi hiện mô hình chi tiết thấp.', 'Sửa lỗi nhận dạng kẻ địch của Clover.', 'Sửa điều kiện hoàn thành thành tích Chiến Trường “Chào Tiểu Đội”.', 'Sửa lỗi một số hiệu ứng bổ trợ Phụ Kiện Thompson SMG không hoạt động đúng.'] }
      ]
    },
    'cap-nhat-hotfix-0911': {
      intro: 'Bản cập nhật ngày 10/09 không làm gián đoạn trận đấu hoặc ghép trận. Nội dung gồm luân phiên bản đồ, cân bằng Phố Cổ Mog, đội Trỗi Dậy Hudson và danh sách sửa lỗi.',
      sections: [
        { heading: 'Luân phiên bản đồ · Chiến Dịch', text: 'AZ3 – Thường hiện luôn có sẵn trong danh sách bản đồ.' },
        { heading: 'Cân bằng Chiến Trường · Công/Thủ tại Phố Cổ Mog', text: 'Điểm triển khai của Phân Khu B/C và ranh giới chiến đấu Phân Khu C được điều chỉnh; số căn cứ phía trên vị trí đội tấn công tại C giảm. C2 chuyển thành Mục Tiêu Phụ.' },
        { heading: 'Cân bằng Chiến Trường · Giai đoạn Hộ Tống', text: 'Thay đổi cách gây sát thương lên đoàn xe và thời lượng kiểm soát các trạm.', items: ['Mìn Chống Tăng, Tên Lửa Tự Dẫn và Pháo Oanh Tạc gây ít sát thương hơn lên xe.', 'Tăng nhẹ tốc độ đoàn xe.', 'Thời gian ban đầu của trạm kiểm soát là 4 phút 30 giây; mỗi trạm cộng thêm 45 giây.', 'Thu hẹp khoảng cách giữa điểm triển khai của đội tấn công và đoàn xe.', 'Điều chỉnh vị trí căn cứ của bên phòng thủ ở Giai Đoạn 2.'] },
        { heading: 'Cân bằng Đội Trỗi Dậy Hudson', text: 'Đội Trỗi Dậy có thêm khoảng thời gian dễ bị tấn công khi thay đạn, đổi hướng và giữa các loạt bắn. Đội này không còn khả năng khóa mục tiêu xuyên tường.' },
        { heading: 'Sửa lỗi và tối ưu hóa', text: 'Bản sửa bao gồm mở khóa tính năng, lỗi nhiệm vụ, giao diện, âm thanh, phương tiện, điều khiển và các chế độ:', items: ['Tính Năng Bản Đồ mở khóa ở Cấp độ Chiến Dịch 4.', 'Kho Giáp Chiến Trường hiển thị Vũ Khí Mới của mùa hiện tại.', 'Sửa lỗi có lúc bị kẹt tại điểm triển khai C1 trên Phố Cổ Mog.', 'Sửa nội dung văn bản sai trong một số nhiệm vụ mùa.', 'Sửa nạp đạn bất thường.', 'Sửa thông báo nổi bị lặp trong Xã Giao → Hoạt động người chơi.', 'Sửa điểm số cuối trận hiển thị sai trong Tử Chiến – Phố Cổ Mog.', 'Sửa Hòm Bị Hạ của kẻ địch đôi khi biến mất.', 'Sửa tình trạng người chơi bị kẹt sau khi bị Clover tấn công.', 'Sửa độ bền của Dòng Câu Cá thu được trong trận.', 'Giảm yêu cầu Nhiệm Vụ Giai Đoạn 1 của Taj Faris tại Layali xuống còn một lần hoàn thành.', 'Sửa vật phẩm nhiệm vụ Taj Faris đôi khi không tương tác được.', 'Tối ưu điều kiện hoàn thành nhiệm vụ Zola “Gió Nhẹ Vẫn Thổi”.', 'Bổ sung lời nhắc của Joe Reed: Câu Cá mở khóa tại Cấp 17 Chiến Dịch Sinh Tồn.', 'Sửa một số nhiệm vụ câu cá có yêu cầu không khớp mục tiêu.', 'Sửa lỗi không kéo được vật phẩm trong Nhà Kho và Balo bằng tay cầm.', 'Sửa hướng phát âm thanh Giải Cứu.', 'Sửa vị trí mũ Reis trong Mũ của Anh Hùng Đã Mất.', 'Sửa ống ngắm có thể hiển thị sai khi ngắm.', 'Sửa tương tác bất thường trong Ngừng Hoạt Động Khẩn Cấp.', 'Giảm giật phương tiện do dao động tốc độ khung hình.', 'Sửa lỗi không thể trao đổi xu liên tục trong Chọn Cuối Tuần.', 'Sửa tùy chỉnh Vũ Khí Cận Chiến Ngẫu Nhiên.'] }
      ]
    },
    'thong-bao-cap-nhat-08-09': {
      intro: 'Tổng quan Mùa 11 “Kỷ Nguyên Mới” chia thành sự kiện dùng chung, chiến dịch, chiến trường, hoạt động hàng tuần và nội dung cửa hàng.',
      sections: [
        { heading: 'Ra mắt mùa và điểm danh', text: 'Mùa mới bắt đầu ngày 08/09 trên PC và mobile. Điểm danh mùa mở 08–17/09, có M4A1 Vệ Binh Haavk, hộp TurBrick kỷ niệm và phần thưởng ngày đăng nhập.' },
        { heading: 'Sinh nhật hai tuổi và vũ khí mùa mới', text: 'Chuỗi sinh nhật chạy đến 09/11 với nhiệm vụ tích điểm. Cửa hàng vũ khí mùa bổ sung chín skin thuộc các bộ Cá Mập Trắng, Vệ Binh Haavk và Vũ Điệu Cần Cẩu; các gói quân nhu S11 cũng được cập nhật.' },
        { heading: 'Chiến Dịch · bản đồ, Rover và nhiệm vụ', text: 'Phố Cổ Mog, đặc vụ hỗ trợ Rover/Rowan Walsh, MDR và Thompson gia nhập nội dung mùa. Các nhiệm vụ theo bản đồ trao thẻ, vé quân trang và vật phẩm; hoạt động Haavk có phụ kiện giới hạn.' },
        { heading: 'Chiến Trường và hoạt động hàng tuần', text: 'Thử thách mùa S11 có điểm cốt lõi theo nhiệm vụ tuần. Phố Cổ Mog đi kèm hoạt động bản đồ; các sự kiện hàng tuần gồm quân nhu, nhân đôi Công trạng, nhiệm vụ vũ khí chỉ định, cửa hàng Tekniq và đổi điểm trận.' },
        { heading: 'Thẻ mùa và cửa hàng', text: 'Thẻ mùa có Rover miễn phí, Hackclaw, trang bị vũ khí, hộp an toàn, TurBrick và vật phẩm chiến thuật. Cập nhật cửa hàng còn có MandelBrick Vận Tốc Cực Hạn, điều chỉnh vật phẩm cũ và vòng quay Tái Sinh.' }
      ]
    },
    'thong-bao-cap-nhat-mua-11': {
      intro: 'Thông báo này ghi lịch triển khai S11 trên PC/mobile, các dịch vụ tạm ngừng và danh sách nội dung mới của “Kỷ Nguyên Mới”.',
      sections: [
        { heading: 'Lịch cập nhật PC và mobile', text: 'Ngày 08/09, xếp hạng hai chế độ ngừng hoạt động từ 07:30; Chiến Dịch, ghép trận, Chợ và Nhà Đấu Giá dừng lúc 08:59. Bản PC và Android/iOS dự kiến phát hành lúc 10:00.' },
        { heading: 'Đặc vụ và Chiến Dịch', text: 'Rover là đặc vụ hỗ trợ mới. Layali được nâng cấp và có chế độ Câu Cá; Trạm Không Gian Haavk bổ sung Con Đường Tộc Trưởng – Tuần Tra Polaris.' },
        { heading: 'Chiến Trường và chế độ mới', text: 'Phố Cổ Mog gia nhập bản đồ chiến trường; mùa mới còn thêm đấu 1v1, vũ khí, đạn mới cùng các tinh chỉnh cân bằng.' },
        { heading: 'Tuần Tra Polaris · nội dung Haavk', text: 'Bài công bố mô tả nhiệm vụ GTI truy tìm Desmoulins trên trạm không gian, các vai trò Giám đốc An ninh và Sĩ quan Tùy tùng, cách mở khóa danh tính, quyền tiếp cận và bộ kỹ năng của tiểu đội.' }
      ]
    },
    'ung-tuyen-may-chu-thu-nghiem': {
      intro: 'Garena tuyển người chơi Việt Nam cho máy chủ thử nghiệm kéo dài khoảng một đến hai tuần, dự kiến vào giữa hoặc cuối tháng 8; bản dựng thử có thể còn lỗi.',
      sections: [
        { heading: 'Nội dung thử nghiệm và điều kiện', text: 'Người được chọn có thể trải nghiệm sớm đặc vụ, bản đồ và nội dung chưa phát hành. Đợt đầu chỉ hỗ trợ Android, cấp quyền theo từng đợt; người chơi FPS chiến thuật tích cực được khuyến khích đăng ký.' },
        { heading: 'Cấu hình và ứng dụng', text: 'Thiết bị tham khảo Android 7.1 trở lên, RAM 4 GB. Bản thử cài riêng, không thay thế ứng dụng hiện có; cần chừa dung lượng lưu trữ.' },
        { heading: 'Đăng ký và kết quả', text: 'Điền khảo sát bằng email đang sử dụng và kiểm tra chính xác địa chỉ. Kết quả dự kiến gửi trước 15/08/2026; người được chọn nhận tài khoản thử, liên kết tải và hướng dẫn cài đặt.' },
        { heading: 'Lưu ý', text: 'Số lượng có hạn; gửi biểu mẫu không đồng nghĩa chắc chắn được chọn. Tài khoản thử nghiệm tách biệt và không tác động tài khoản game chính.' }
      ]
    },
    'cuoc-thi-len-dinh-cung-clover': {
      intro: 'Cuộc thi “Lên Đỉnh Cùng Clover” tìm người chơi có kỹ năng cá nhân và khả năng kiếm Tekniq Alloy tốt. Người chơi máy chủ Garena Delta Force Việt Nam có thể tham gia; nhận đăng ký từ 31/08, thi đấu 08–18/09.',
      sections: [
        { heading: 'Đăng ký Creator và đội hình', text: 'Người tham gia đăng ký Creator nếu có kênh, sau đó gửi UID và danh sách đồng đội theo biểu mẫu. Đội hình có 2–10 người và phải có ít nhất một Creator Đặc Nhiệm; mỗi cá nhân được dùng tối đa hai UID.' },
        { heading: 'Nội dung thi đấu', text: 'Creator chính livestream hỗ trợ người chơi đồng hành: tối thiểu 5 buổi, dùng Rover trong các trận hợp lệ, chơi từ 18:00 đến 02:00 và đạt ít nhất 30 trận được tính theo thành tích Tekniq Alloy. Chỉ trận được phát trực tiếp mới hợp lệ.' },
        { heading: 'Bằng chứng và nội dung cộng đồng', text: 'Sau mỗi buổi, trưởng nhóm gửi bản ghi cho BTC; Creator đồng hành cần làm tối thiểu 5 video trong thời gian thi. Thông báo còn nêu hạng mục đua view và nội dung đăng tải để xác nhận thành tích.' },
        { heading: 'Điều kiện ghi nhận', text: 'Thông tin đồng đội phải gửi lại đầy đủ; nếu thiếu dữ liệu, kết quả có thể không được ghi nhận. Các chỉ số hạ gục và vai trò người chơi đồng hành tuân theo thể lệ của BTC.' }
      ]
    },
    'kich-hoat-secure-boot-va-tpm': {
      intro: 'Hướng dẫn này giải thích thông báo yêu cầu Secure Boot/TPM trên Windows 10/11 và trình tự kiểm tra ổ đĩa, chuyển GPT nếu cần, rồi bật các tính năng trong firmware.',
      sections: [
        { heading: 'Vì sao xuất hiện yêu cầu', text: 'Secure Boot và TPM hỗ trợ bảo vệ quá trình khởi động và tính toàn vẹn hệ thống. Garena lưu ý thông báo có thể xuất hiện khi tài khoản bị nghi ngờ rò rỉ bảo mật hoặc có hoạt động bất thường; không nên cho mượn tài khoản.' },
        { heading: 'Bước 1 · kiểm tra kiểu phân vùng', text: 'Mở Disk Management bằng Windows + X, tìm ổ chứa Windows và mở Properties → Volumes để xem Partition Style. Nếu là GPT thì chuyển sang bước thiết lập firmware; nếu là MBR cần chuyển đổi trước.' },
        { heading: 'Bước 2 · chuyển MBR sang GPT', text: 'Dùng công cụ mbr2gpt theo trình tự xác thực rồi chuyển đổi ổ hệ thống; xác định đúng số đĩa nếu máy có nhiều ổ. Sao lưu dữ liệu quan trọng và làm theo từng bước hướng dẫn trước khi thay đổi phân vùng.' },
        { heading: 'Bước 3 · bật Secure Boot và TPM', text: 'Khởi động vào BIOS/UEFI, bật TPM 2.0 và Secure Boot theo tên mục tương ứng với bo mạch chủ. Tên menu có thể khác nhau giữa các nhà sản xuất; hoàn tất thì lưu cấu hình và khởi động lại Windows.' }
      ]
    },
    'danh-sach-phan-mem-phan-cung-bi-cam': {
      intro: 'Bài hướng dẫn phân loại công cụ PC và mobile bị cấm hoặc không khuyến khích vì có thể làm game thoát, ảnh hưởng công bằng hoặc dẫn tới xử lý tài khoản.',
      sections: [
        { heading: 'PC · nhóm bị cấm', text: 'Danh mục gồm phần cứng can thiệp, công cụ phân tích/chỉnh sửa, tăng tốc, script tự động và môi trường máy ảo.', items: ['Phần cứng macro, thiết bị phân màn hình và thiết bị can thiệp tín hiệu.', 'Công cụ sửa bộ nhớ, gỡ lỗi, phân tích tiến trình và tăng tốc.', 'Script tự động/macro và phần mềm bên thứ ba can thiệp đồ họa, bảo mật hoặc game process.'] },
        { heading: 'PC · không khuyến khích', text: 'Bài nguồn liệt kê phần mềm điều khiển từ xa, streaming, capture khung hình, AI và mod hình ảnh có khả năng ảnh hưởng cạnh tranh công bằng.' },
        { heading: 'Mobile · nhóm bị cấm', text: 'Không dùng ngoại vi chuột/phím hoặc macro can thiệp, môi trường gỡ lỗi/phân tích, công cụ chỉnh sửa ứng dụng và thư viện bên thứ ba tác động hoạt động game.' },
        { heading: 'Phạm vi danh sách', text: 'Danh sách có thể được cập nhật thêm khi phát hiện công cụ mới. Mức xử lý phụ thuộc loại công cụ và ảnh hưởng; đối chiếu bài chính thức trước khi bật phần mềm chạy nền.' }
      ]
    },
    'delta-force-pc-series-2026-season-I-chinh-thuc-khoi-tranh': {
      intro: 'Delta Force PC Series 2026 – Season I mở đăng ký 14–20/09, thi đấu online từ 22/09 đến 11/10 trên PC ở chế độ Chiến Dịch, máy chủ Esports.',
      sections: [
        { heading: 'Thông tin giải', text: 'Mùa đầu tiên nối tiếp DFUT Winter 2026, quy tụ đội tuyển cũ và mới. Rolebook cùng biểu mẫu đăng ký được liên kết trong thông báo Garena.' },
        { heading: 'Vòng bảng · 22/09–01/10', text: 'Thi đấu vòng tròn tính điểm hai lượt, tối đa bốn ván mỗi trận. Mốc Match Point MandelBricks là 25; 18 đội vào vòng chung kết tổng, các trận diễn ra online dưới giám sát trọng tài.' },
        { heading: 'Vòng chung kết · 03/10–11/10', text: 'Tối đa sáu ván mỗi trận theo nhánh thắng/nhánh thua, Match Point 40. Giải đấu phát livestream trên các kênh Chiến Thần Delta Force và Garena Delta Force.' },
        { heading: 'Đăng ký đội', text: 'Tối đa 30 đội. Mỗi đội có tối đa 3 thành viên chính thức và 1 dự bị; tuyển thủ chỉ thi đấu cho một đội trong suốt mùa. Tên đội có giới hạn ký tự và phải tuân thủ quy định nội dung.' }
      ]
    },
    'Delta-Force-Ultimate-Winter-2026-Operations-PC-MO': {
      intro: 'DFUT Winter 2026 là giải đấu quốc gia trên PC và Mobile, tổng thưởng 400 triệu đồng, có chung kết offline và hai suất hướng tới Pan Pacific Operations Cup.',
      sections: [
        { heading: 'Thông tin giải đấu', text: 'Giải thi đấu chế độ Chiến Dịch trên hai nền tảng. Đây là mùa DFUT đầu tiên gom PC và Mobile vào cùng một mùa giải.' },
        { heading: 'Đăng ký và đội hình', text: 'Đăng ký qua biểu mẫu của BTC; số đội không giới hạn. Mỗi đội tối đa 3 thành viên chính thức và 1 dự bị; tuyển thủ chỉ đăng ký cho một đội. Tên đội có giới hạn độ dài và tiêu chuẩn nội dung.' },
        { heading: 'Cơ cấu giải thưởng', text: 'Tổng quỹ 400.000.000 VNĐ được chia thành 340 triệu cho PC và 60 triệu cho Mobile. Bài nguồn có hình bảng phân bổ chi tiết theo thứ hạng và hạng mục.' },
        { heading: 'Chung kết và suất quốc tế', text: 'Vòng chung kết tổ chức offline; hai suất thi đấu quốc tế được nêu cho Pan Pacific Operations Cup, hướng tới suất tham dự Delta Force Invitational.' }
      ]
    },
    'thong-bao-09-09': {
      intro: 'Garena trả lời từng vấn đề được báo sau cập nhật mùa mới: nhiệm vụ câu cá, chứng chỉ cấp 20, bản đồ AZ3, vũ khí không hiện và lỗi đổi thưởng.',
      sections: [
        { heading: 'Nhiệm vụ câu cá của Joe Reed', text: 'Cá giao theo nhiệm vụ cần đặt trong giỏ cạnh NPC. Với chứng chỉ Ngư Dân cấp 20, cần câu đúng Cá Đối và Cá Rô Chó theo khối lượng; tên một loại cá đang bị dịch nhầm trong tiếng Việt.' },
        { heading: 'AZ3 và vũ khí', text: 'AZ3 – Thường được mở lâu dài trong mùa để hỗ trợ nhiệm vụ mùa. Lỗi một số vũ khí không hiện ở mục sử dụng của đặc vụ đã được ghi nhận; nhiệm vụ Kho Quân Sự để mở vũ khí mới dự kiến bổ sung trong bản sửa sớm.' },
        { heading: 'Lỗi cửa hàng và tiền tệ', text: 'Lỗi hiển thị Xu Delta đã được sửa ngày 08/09. Các gói quà và vũ khí cận chiến bị lỗi khi rút thưởng vẫn đang được điều tra.' },
        { heading: 'Các lỗi còn lại', text: 'Một số vấn đề nhỏ khác cũng đang được xác minh; bài đăng xin lỗi người chơi và cập nhật hướng xử lý khi có bản vá.' }
      ]
    },
    'cap-nhat-27-08': {
      intro: 'Bản cập nhật 27/08 gồm hoạt động phiếu quân trang, nhân đôi điểm xếp hạng cuối mùa, điểm danh skin G3 và lịch hé lộ Mùa Kỷ Nguyên Mới.',
      sections: [
        { heading: 'Sự kiện đa chế độ', text: 'Đăng nhập và làm nhiệm vụ hoạt động từ 27/08 đến 07/09 để lấy 20 Phiếu Quân Trang; nhóm nhiệm vụ thứ hai làm mới sau bảy ngày. Trận xếp hạng 03–07/09 có điểm gấp đôi ở cả Chiến Dịch và Chiến Trường.' },
        { heading: 'Điểm danh nhận G3', text: 'Đăng nhập 01–10/09 theo các mốc để nhận phiếu; ngày 08–10/09 có thể nhận skin G3 Tinh Thần Chiến Sĩ.' },
        { heading: 'Xem trước mùa và vé giới hạn', text: 'Chuỗi xem trước diễn ra 01–07/09 trước khi Kỷ Nguyên Mới ra mắt ngày 08/09. Vé Delta hữu hạn hết hạn 03/09 lúc 23:59 UTC+0.' },
        { heading: 'Chiến Dịch và hoạt động tuần', text: 'Chuột Lén Lút xuất hiện ở Layali, Đập Nước Zero và Brakkesh; tương tác bằng Bắn Tim để nhận bản đồ kho báu. Hoạt động tuần có quân nhu, nhân đôi Công trạng, nhiệm vụ SG552/M82, cửa hàng Tekniq và đổi điểm.' }
      ]
    },
    'cap-nhat-20-08': {
      intro: 'Thông báo 20/08 tiếp tục hoạt động Săn Gốm Đổi Đời, đưa Chuột Lén Lút trở lại và mở các nhiệm vụ Chiến Trường cùng phần thưởng tuần.',
      sections: [
        { heading: 'Chiến Dịch · Săn Gốm Đổi Đời', text: 'Từ 21–27/08, tìm rương trong trận để hoàn thành nhiệm vụ, tích lũy EXP May Mắn rồi đổi phần thưởng trong cửa hàng sự kiện.' },
        { heading: 'Chuột Lén Lút và bản đồ kho báu', text: 'Từ 19–27/08, Chuột xuất hiện tại Brakkesh, Đập Nước Zero và Layali. Dùng hành động Bắn Tim để tương tác, lấy bản đồ kho báu của khu vực.' },
        { heading: 'Chiến Trường · nhiệm vụ đội', text: 'Thử Thách Uy Thế Trên Không yêu cầu bảo vệ phương tiện VIP và đối phó mục tiêu nguy hiểm trong Săn Lùng Siêu Đẳng; hoạt động Lập Đội Cùng Nhau khuyến khích mời bạn bè phối hợp.' },
        { heading: 'Hoạt động hàng tuần và cửa hàng', text: 'Phần còn lại gồm quân nhu tuần, ba trận đầu nhân đôi Công trạng, nhiệm vụ SG552/M82, cửa hàng Xu Tekniq và đổi điểm lấy chìa khóa hoặc thẻ trang bị.' }
      ]
    },
    'cap-nhat-06-08': {
      intro: 'Bản cập nhật 06/08 mở chuỗi Săn Gốm Đổi Đời tháng 8, tặng tổng cộng 2.600 Vé Delta giới hạn và đưa kho báu lên nhiều bản đồ Chiến Dịch.',
      sections: [
        { heading: 'Sự kiện đa chế độ · 2.600 vé', text: 'Đăng nhập ngày đầu để nhận chắc chắn 1.000 vé; nhiệm vụ ngày và các mốc tiến độ giúp cộng dồn đến 2.600 Vé Delta hữu hạn.' },
        { heading: 'Săn Gốm · bản đồ kho báu', text: 'Từ 08/08 đến 07/09, lần theo gợi ý tại Layali, Nhà Máy Hạt Nhân/AZ3, Brakkesh và Trạm Không Gian Haavk để tìm quân nhu ẩn.', items: ['Mỗi khu vực có mốc mở riêng và manh mối/bản đồ tương ứng.', 'EXP sự kiện đổi được thẻ quân nhân, sơn phun, gói chọn bản đồ và vật phẩm giới hạn.', 'Phần thưởng miễn phí có skin QJB201 Thanh Lịch Toàn Quốc và vật phẩm chủ đề sự kiện.'] },
        { heading: 'Nhiệm vụ Đập Nước Zero', text: 'Giải tín hiệu và câu đố tại Đập Nước Zero, thu thập quân nhu để nhận EXP sự kiện; một số vật phẩm trao đổi được mở theo tiến độ.' },
        { heading: 'Hoạt động phụ và điều kiện', text: 'Các nhiệm vụ có thời gian khác nhau theo bản đồ. Kiểm tra bảng sự kiện để biết khu vực, ngày mở, điều kiện tương tác và trạng thái nhận thưởng.' }
      ]
    },
    'cap-nhat-giua-mua-10': {
      intro: 'Bản tin giữa mùa 10 gom sự kiện skin miễn phí, vé Delta giới hạn, hoạt động Chiến Dịch và Chiến Trường, nhiệm vụ cân bằng cùng nội dung shop.',
      sections: [
        { heading: 'Sự kiện đa chế độ', text: 'Sự kiện Jingdezhen cho EXP khi tham gia trận ở cả hai chế độ để đổi bộ Bình Minh Nở Rộ và thẻ trang bị. Chuỗi nhiệm vụ khác tặng tối đa 2.600 vé Delta, trong đó mốc đăng nhập khai mạc có gói tối thiểu 1.000 vé.' },
        { heading: 'Chiến Dịch · hoạt động giữa mùa', text: 'Từ 31/07, nhiệm vụ và thử thách trận thưởng EXP mùa để đổi skin VSS/AUG/M1911/Vityaz, thẻ quân nhân, sơn phun và thẻ trang bị. Các mục khác gồm Thủ Lĩnh Đụng Độ, săn kho báu, thẻ Ahsarah và gói bản đồ kho báu.' },
        { heading: 'Chiến Trường', text: 'Thử thách giữa mùa dùng EXP để đổi skin dòng Sóng Cổ Điển và vật phẩm chiến thuật. Hoạt động bản đồ, nhiệm vụ vũ khí và phần thưởng phụ được mở theo thời hạn riêng.' },
        { heading: 'Cân bằng và sửa lỗi', text: 'Ghi chú giữa mùa liệt kê thay đổi đặc vụ/vũ khí theo chế độ và các tối ưu gameplay; xem mục cân bằng trong bài nguồn để đối chiếu từng trị số.' }
      ]
    },
    'cap-nhat-24-07': {
      intro: 'Bản cập nhật 24/07 mang tới điểm danh giữa mùa, Chọn & Chinh Phục, hoạt động Chiến Trường Thiết Giáp và chuỗi thưởng tuần.',
      sections: [
        { heading: 'Điểm danh và Chọn & Chinh Phục', text: 'Đăng nhập tám ngày từ 24/07 đến 06/08 để nhận KC-17 Giai Điệu Chuột Nhắt. Liên minh thi đấu đến 23/08; tổng kết 24–26/08 và phát thưởng 27–29/08.', items: ['Nhiệm vụ trận và xã hội mở UZI Bé Mèo Gầm Gừ, thẻ quân nhân và sơn.', 'Top 100 điểm liên minh có cơ hội nhận QBZ-95 Cơ Giáp Tác Chiến, Vector Bé Mèo Gầm Gừ cùng vật phẩm độc quyền.'] },
        { heading: 'Chiến Trường Thiết Giáp', text: 'Chơi chế độ trong thời hạn sự kiện để nhận Phiếu Quân Trang.' },
        { heading: 'Hoạt động hàng tuần', text: 'Bản tin liệt kê quân nhu tuần, ba trận đầu nhân đôi Công trạng, nhiệm vụ dùng QBZ95-1/AR57, cửa hàng Xu Tekniq và hoạt động đổi điểm lấy thưởng.' },
        { heading: 'Cửa hàng và phần thưởng', text: 'Các mốc tuần có thẻ EXP vũ khí, thẻ trang bị, chìa lượng tử và quyền lợi rương; mốc đổi và thời hạn hiển thị trong sự kiện.' }
      ]
    },
    'cap-nhat-mua-10-meltdown': {
      intro: 'Thông báo 30/06 nêu lịch bảo trì riêng cho PC và mobile, dung lượng tải và nội dung trọng tâm của Mùa MeltDown.',
      sections: [
        { heading: 'Lộ trình cập nhật', text: 'Xếp hạng hai chế độ tạm dừng từ 07:30; đến 08:59 đóng truy cập Chiến Dịch, ghép trận, Chợ và Nhà Đấu Giá. Bản cập nhật dự kiến phát hành lúc 09:00 cho PC lẫn Android/iOS.' },
        { heading: 'Dung lượng tải', text: 'PC cần tải khoảng 33,5 GB. Mobile cần khoảng 1,52 GB dữ liệu; bộ cài HD có thể xấp xỉ 38,28 GB.' },
        { heading: 'Nội dung mùa mới', text: 'MeltDown bổ sung N-2 (Gabriel Muriel), bản đồ Chiến Dịch AZ3 Nhà Máy Hạt Nhân, Đấu Trường La Mã cho Chiến Trường, phương tiện, vũ khí, chế độ Chiến Dịch và hệ thống mới trong Căn Cứ Ngầm.' },
        { heading: 'Đặc vụ Kỹ Sư N-2', text: 'Bộ kỹ năng gồm súng phóng lựu băng giá, bi đông tạo vùng lạnh, lựu đạn choáng tự dẫn và hiệu ứng Tuyết Lở/Băng Vĩnh Cửu điều chỉnh khả năng di chuyển đối thủ tùy chế độ.' }
      ]
    }
  };

  const renderArticle = () => {
    if (!detail) return;
    const slug = new URLSearchParams(location.search).get('article');
    const story = stories.find(item => articleSlug(item) === slug);
    if (!slug) return;
    if (!story) {
      detail.hidden = false;
      detail.innerHTML = '<div class="news-article-not-found"><a class="news-back" href="/news"><svg class="ui-arrow-icon ui-arrow-icon--leading" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5m6-6-6 6 6 6"/></svg> Tất cả tin</a><h1>Không tìm thấy bản tin</h1><p>Bản tin này hiện không có trong danh sách.</p></div>';
    } else {
      const content = details[slug] || { intro: story.summary, sections: [] };
      const sections = content.sections.map(section => `<section class="news-article-section"><h2>${escapeHtml(section.heading)}</h2>${section.meta?.length ? `<div class="news-section-meta">${section.meta.map(value => `<span>${escapeHtml(value)}</span>`).join('')}</div>` : ''}${section.image ? `<figure class="news-article-section-media"><img src="${escapeHtml(section.image)}" alt="${escapeHtml(section.heading)}"><figcaption>${escapeHtml(section.heading)}</figcaption></figure>` : ''}<p>${escapeHtml(section.text)}</p>${section.items?.length ? `<ul>${section.items.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>` : ''}</section>`).join('');
      detail.innerHTML = `<a class="news-back" href="/news"><svg class="ui-arrow-icon ui-arrow-icon--leading" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5m6-6-6 6 6 6"/></svg> Tất cả tin</a>
        <article class="news-article">
          <div class="news-article-copy">
            <header class="news-article-header"><div class="news-card-meta"><span class="news-tag">${escapeHtml(story.categoryLabel)}</span><time datetime="${escapeHtml(story.date)}">${escapeHtml(story.displayDate)}</time></div><h1>${escapeHtml(story.title)}</h1><p class="news-article-lead">${escapeHtml(content.intro)}</p></header>
            <div class="news-article-body">${sections}<p class="news-article-note">Bài được biên soạn theo các mục và thông tin trong thông báo Garena. Mở nguồn để xem bản gốc và điều kiện mới nhất.</p><a class="news-official-link" href="${escapeHtml(officialUrl(story.source))}" target="_blank" rel="noopener noreferrer">Xem thông báo đầy đủ từ Garena <svg aria-hidden="true" viewBox="0 0 20 20"><path d="M11 3h6v6M17 3 9 11"/><path d="M15 11v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/></svg></a></div>
          </div>
        </article>`;
      detail.hidden = false;
      document.title = `${story.title} | Delta Force`;
    }
    intro?.setAttribute('hidden', '');
    archive?.setAttribute('hidden', '');
    window.scrollTo(0, 0);
  };

  if (homeGrid) homeGrid.innerHTML = stories.slice(0, 3).map(story => card(story, true)).join('');
  if (featured && stories.length) featured.innerHTML = card(stories[0]);

  const renderFeed = () => {
    if (!feed) return;
    const query = (search?.value || '').trim().toLocaleLowerCase('vi');
    const filtered = stories.filter(story => {
      const matchesFilter = activeFilter === 'all' || story.category === activeFilter;
      const matchesText = !query || `${story.title} ${story.summary} ${story.categoryLabel}`.toLocaleLowerCase('vi').includes(query);
      return matchesFilter && matchesText;
    });
    feed.innerHTML = filtered.length ? filtered.map(story => card(story)).join('') : '<div class="news-empty"><span>⌕</span><h2>Chưa tìm thấy bản tin phù hợp</h2><p>Thử từ khóa khác hoặc chọn danh mục “Tất cả”.</p></div>';
    if (count) count.textContent = `${String(filtered.length).padStart(2, '0')} BẢN TIN`;
  };
  renderFeed();
  renderArticle();
  search?.addEventListener('input', renderFeed);
  document.querySelectorAll('[data-news-filter]').forEach(button => button.addEventListener('click', () => {
    activeFilter = button.dataset.newsFilter;
    document.querySelectorAll('[data-news-filter]').forEach(item => {
      const selected = item === button;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    renderFeed();
  }));
})();
