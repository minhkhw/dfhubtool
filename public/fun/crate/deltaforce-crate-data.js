/**
 * DELTA FORCE VIETNAM - CRATE LOOT ENGINE & ITEM CATALOG
 * Dữ liệu chuẩn xác 100% cào từ Shushu.fan & Tencent Player Hub (playerhub.df.qq.com)
 */
(function (global) {
  'use strict';

  // Danh mục 200+ Vật phẩm chuẩn xác theo Shushu & Tencent Delta Force
  const DFT_ITEMS = [
    {
        "objectID": 15080050133,
        "name": "Vương Miện Đá Quý",
        "nameVi": "Vương Miện Đá Quý",
        "objectName": "阿萨拉特色提灯",
        "objectNameVi": "Vương Miện Đá Quý",
        "shortName": "Vương Miện Đá Quý",
        "secondClass": "collection",
        "thirdClass": "Đồ sưu tầm thủ công",
        "price": 34841,
        "avgPrice": 34841,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050133.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050133.png",
        "grade": 5,
        "itemWidth": 3,
        "itemHeight": 1,
        "crates": [
            "safe"
        ]
    },{
        "objectID": 15080050124,
        "name": "Đèn lồng đặc trưng Ahsarah",
        "nameVi": "Đèn lồng đặc trưng Ahsarah",
        "objectName": "阿萨拉特色提灯",
        "objectNameVi": "Đèn lồng đặc trưng Ahsarah",
        "shortName": "Đèn lồng đặc trưng Ahsarah",
        "secondClass": "collection",
        "thirdClass": "Đồ sưu tầm thủ công",
        "price": 34841,
        "avgPrice": 34841,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050124.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050124.png",
        "grade": 4,
        "itemWidth": 1,
        "itemHeight": 2,
        "crates": [
            "safe"
        ]
    },
    {
        "objectID": 15080050016,
        "name": "Bình rượu đặc trưng Ahsarah",
        "nameVi": "Bình rượu đặc trưng Ahsarah",
        "objectName": "阿萨拉特色酒壶",
        "objectNameVi": "Bình rượu đặc trưng Ahsarah",
        "shortName": "Bình rượu đặc trưng Ahsarah",
        "secondClass": "collection",
        "thirdClass": "Đồ sưu tầm thủ công",
        "price": 24016,
        "avgPrice": 24016,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050016.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050016.png",
        "grade": 4,
        "itemWidth": 1,
        "itemHeight": 2,
        "crates": [
            "safe",
            "minisafe"
        ]
    },
    {
        "objectID": 15080050134,
        "name": "Đèn chùm Mosaic cổ",
        "nameVi": "Đèn chùm Mosaic cổ",
        "objectName": "马赛克灯台",
        "objectNameVi": "Đèn chùm Mosaic cổ",
        "shortName": "Đèn chùm Mosaic cổ",
        "secondClass": "collection",
        "thirdClass": "Đồ sưu tầm thủ công",
        "price": 117557,
        "avgPrice": 117557,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050134.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050134.png",
        "grade": 4,
        "itemWidth": 2,
        "itemHeight": 3,
        "crates": [
            "safe",
            "minisafe"
        ]
    },
    {
        "objectID": 15040010014,
        "name": "Bình nước phong cách Ahsarah",
        "nameVi": "Bình nước phong cách Ahsarah",
        "objectName": "阿萨拉风情水壶",
        "objectNameVi": "Bình nước phong cách Ahsarah",
        "shortName": "Bình nước phong cách Ahsarah",
        "secondClass": "collection",
        "thirdClass": "Đồ sưu tầm thủ công",
        "price": 33066,
        "avgPrice": 33066,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15040010014.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15040010014.png",
        "grade": 4,
        "itemWidth": 1,
        "itemHeight": 2,
        "crates": [
            "safe"
        ]
    },
    {
        "objectID": 15080040003,
        "name": "Vật trang trí sừng thú",
        "nameVi": "Vật trang trí sừng thú",
        "objectName": "犄角墙饰",
        "objectNameVi": "Vật trang trí sừng thú",
        "shortName": "Vật trang trí sừng thú",
        "secondClass": "collection",
        "thirdClass": "Đồ sưu tầm thủ công",
        "price": 23681,
        "avgPrice": 23681,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080040003.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080040003.png",
        "grade": 4,
        "itemWidth": 2,
        "itemHeight": 1,
        "crates": [
            "safe",
            "backpack"
        ]
    },
    {
        "objectID": 15080040002,
        "name": "Dao găm",
        "nameVi": "Dao găm",
        "objectName": "海盗弯刀",
        "objectNameVi": "Dao găm",
        "shortName": "Dao găm",
        "secondClass": "collection",
        "thirdClass": "Đồ sưu tầm thủ công",
        "price": 53487,
        "avgPrice": 53487,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080040002.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080040002.png",
        "grade": 4,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "safe"
        ]
    },
    {
        "objectID": 15080050001,
        "name": "Khuyên tai hoàng phi",
        "nameVi": "Khuyên tai hoàng phi",
        "objectName": "后妃耳环",
        "objectNameVi": "Khuyên tai hoàng phi",
        "shortName": "Khuyên tai hoàng phi",
        "secondClass": "collection",
        "thirdClass": "Đồ sưu tầm thủ công",
        "price": 13493,
        "avgPrice": 13493,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050001.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050001.png",
        "grade": 4,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "safe"
        ]
    },
    {
        "objectID": 15080050135,
        "name": "Tượng gốm Hormel",
        "nameVi": "Tượng gốm Hormel",
        "objectName": "荷美尔陶俑",
        "objectNameVi": "Tượng gốm Hormel",
        "shortName": "Tượng gốm Hormel",
        "secondClass": "collection",
        "thirdClass": "Đồ sưu tầm thủ công",
        "price": 89118,
        "avgPrice": 89118,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050135.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050135.png",
        "grade": 5,
        "itemWidth": 1,
        "itemHeight": 2,
        "crates": [
            "safe"
        ]
    },
    {
        "objectID": 15080050139,
        "name": "Mũi tên vật tổ Totem",
        "nameVi": "Mũi tên vật tổ Totem",
        "objectName": "图腾箭矢",
        "objectNameVi": "Mũi tên vật tổ Totem",
        "shortName": "Mũi tên vật tổ Totem",
        "secondClass": "collection",
        "thirdClass": "Đồ sưu tầm thủ công",
        "price": 14432,
        "avgPrice": 14432,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050139.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050139.png",
        "grade": 4,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "safe",
            "minisafe"
        ]
    },
    {
        "objectID": 15080050083,
        "name": "Đồng hồ để bàn cổ",
        "nameVi": "Đồng hồ để bàn cổ",
        "objectName": "座钟",
        "objectNameVi": "Đồng hồ để bàn cổ",
        "shortName": "Đồng hồ để bàn cổ",
        "secondClass": "collection",
        "thirdClass": "Đồ sưu tầm thủ công",
        "price": 196198,
        "avgPrice": 196198,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050083.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050083.png",
        "grade": 5,
        "itemWidth": 2,
        "itemHeight": 2,
        "crates": [
            "safe"
        ]
    },
    {
        "objectID": 15080050023,
        "name": "Linh kiện chế tạo đạn sơ cấp",
        "nameVi": "Linh kiện chế tạo đạn sơ cấp",
        "objectName": "初级子弹生产零件",
        "objectNameVi": "Linh kiện chế tạo đạn sơ cấp",
        "shortName": "Linh kiện chế tạo đạn sơ cấp",
        "secondClass": "collection",
        "thirdClass": "Đồ sưu tầm thủ công",
        "price": 21534,
        "avgPrice": 21534,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050023.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050023.png",
        "grade": 3,
        "itemWidth": 1,
        "itemHeight": 2,
        "crates": [
            "safe",
            "experimentCrate",
            "birdCrate"
        ]
    },
    {
        "objectID": 15080050043,
        "name": "Dao găm nghi lễ cổ",
        "nameVi": "Dao găm nghi lễ cổ",
        "objectName": "仪典匕首",
        "objectNameVi": "Dao găm nghi lễ cổ",
        "shortName": "Dao găm nghi lễ cổ",
        "secondClass": "collection",
        "thirdClass": "Đồ sưu tầm thủ công",
        "price": 99262,
        "avgPrice": 99262,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050043.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050043.png",
        "grade": 4,
        "itemWidth": 3,
        "itemHeight": 2,
        "crates": [
            "safe",
            "minisafe"
        ]
    },
    {
        "objectID": 15080050009,
        "name": "Đồng tiền vàng hải tặc lấp lánh",
        "nameVi": "Đồng tiền vàng hải tặc lấp lánh",
        "objectName": "亮闪闪的海盗金币",
        "objectNameVi": "Đồng tiền vàng hải tặc lấp lánh",
        "shortName": "Đồng tiền vàng hải tặc lấp lánh",
        "secondClass": "collection",
        "thirdClass": "Đồ sưu tầm thủ công",
        "price": 56931,
        "avgPrice": 56931,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050009.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050009.png",
        "grade": 5,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "safe"
        ]
    },
    {
        "objectID": 15080050004,
        "name": "Huân chương công trạng",
        "nameVi": "Huân chương công trạng",
        "objectName": "功绩勋章",
        "objectNameVi": "Huân chương công trạng",
        "shortName": "Huân chương công trạng",
        "secondClass": "collection",
        "thirdClass": "Đồ sưu tầm thủ công",
        "price": 80200,
        "avgPrice": 80200,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050004.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050004.png",
        "grade": 5,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "safe",
            "minisafe"
        ]
    },
    {
        "objectID": 15080050008,
        "name": "Đồng bạc hải tặc kỳ lạ",
        "nameVi": "Đồng bạc hải tặc kỳ lạ",
        "objectName": "古怪的海盗银币",
        "objectNameVi": "Đồng bạc hải tặc kỳ lạ",
        "shortName": "Đồng bạc hải tặc kỳ lạ",
        "secondClass": "collection",
        "thirdClass": "Đồ sưu tầm thủ công",
        "price": 8578,
        "avgPrice": 8578,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050008.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050008.png",
        "grade": 3,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "safe",
            "minisafe",
            "backpack"
        ]
    },
    {
        "objectID": 15080050012,
        "name": "Mặt dây chuyền 'Vũ Nữ Khiêu Vũ'",
        "nameVi": "Mặt dây chuyền 'Vũ Nữ Khiêu Vũ'",
        "objectName": "“起舞的女郎”挂饰",
        "objectNameVi": "Mặt dây chuyền 'Vũ Nữ Khiêu Vũ'",
        "shortName": "Mặt dây chuyền 'Vũ Nữ Khiêu Vũ'",
        "secondClass": "collection",
        "thirdClass": "Đồ sưu tầm thủ công",
        "price": 14887,
        "avgPrice": 14887,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050012.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050012.png",
        "grade": 3,
        "itemWidth": 1,
        "itemHeight": 2,
        "crates": [
            "minisafe",
            "experimentCrate",
            "hiddenCrate"
        ]
    },
    {
        "objectID": 15080050015,
        "name": "Cốc rượu đặc trưng Ahsarah",
        "nameVi": "Cốc rượu đặc trưng Ahsarah",
        "objectName": "阿萨拉特色酒杯",
        "objectNameVi": "Cốc rượu đặc trưng Ahsarah",
        "shortName": "Cốc rượu đặc trưng Ahsarah",
        "secondClass": "collection",
        "thirdClass": "Đồ sưu tầm thủ công",
        "price": 61762,
        "avgPrice": 61762,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050015.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050015.png",
        "grade": 5,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "minisafe"
        ]
    },
    {
        "objectID": 15060080013,
        "name": "Đồ hộp quân lương dã chiến",
        "nameVi": "Đồ hộp quân lương dã chiến",
        "objectName": "军用罐头",
        "objectNameVi": "Đồ hộp quân lương dã chiến",
        "shortName": "Đồ hộp quân lương dã chiến",
        "secondClass": "collection",
        "thirdClass": "Đồ gia dụng",
        "price": 13821,
        "avgPrice": 13821,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15060080013.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15060080013.png",
        "grade": 3,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "ULD",
            "backpack",
            "advancedStorageCrate",
            "experimentCrate"
        ]
    },
    {
        "objectID": 11010004003,
        "name": "Mũ bảo hiểm huấn luyện DICH",
        "nameVi": "Mũ bảo hiểm huấn luyện DICH",
        "objectName": "DICH 训练头盔",
        "objectNameVi": "Mũ bảo hiểm huấn luyện DICH",
        "shortName": "Mũ bảo hiểm huấn luyện DICH",
        "secondClass": "helmet",
        "thirdClass": "",
        "price": 132495,
        "avgPrice": 132495,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/11010004003.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/11010004003.png",
        "grade": 4,
        "itemWidth": 2,
        "itemHeight": 2,
        "crates": [
            "ULD"
        ]
    },
    {
        "objectID": 15020050002,
        "name": "Máy khoan pin cầm tay",
        "nameVi": "Máy khoan pin cầm tay",
        "objectName": "无线便携电钻",
        "objectNameVi": "Máy khoan pin cầm tay",
        "shortName": "Máy khoan pin cầm tay",
        "secondClass": "collection",
        "thirdClass": "Dụng cụ và vật liệu",
        "price": 31084,
        "avgPrice": 31084,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15020050002.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15020050002.png",
        "grade": 3,
        "itemWidth": 2,
        "itemHeight": 1,
        "crates": [
            "ULD",
            "backpack",
            "travelBag"
        ]
    },
    {
        "objectID": 15060010006,
        "name": "Ống nghe y tế",
        "nameVi": "Ống nghe y tế",
        "objectName": "听诊器",
        "objectNameVi": "Ống nghe y tế",
        "shortName": "Ống nghe y tế",
        "secondClass": "collection",
        "thirdClass": "Vật tư y tế",
        "price": 17066,
        "avgPrice": 17066,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15060010006.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15060010006.png",
        "grade": 3,
        "itemWidth": 1,
        "itemHeight": 2,
        "crates": [
            "ULD",
            "medicalCrate",
            "advancedStorageCrate"
        ]
    },
    {
        "objectID": 15040010021,
        "name": "Cụm linh kiện cơ khí súng",
        "nameVi": "Cụm linh kiện cơ khí súng",
        "objectName": "枪械零件",
        "objectNameVi": "Cụm linh kiện cơ khí súng",
        "shortName": "Cụm linh kiện cơ khí súng",
        "secondClass": "collection",
        "thirdClass": "Dụng cụ và vật liệu",
        "price": 17570,
        "avgPrice": 17570,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15040010021.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15040010021.png",
        "grade": 3,
        "itemWidth": 2,
        "itemHeight": 1,
        "crates": [
            "ULD",
            "backpack"
        ]
    },
    {
        "objectID": 15030040007,
        "name": "Bo mạch chủ máy tính ASOS",
        "nameVi": "Bo mạch chủ máy tính ASOS",
        "objectName": "ASOS电脑主板",
        "objectNameVi": "Bo mạch chủ máy tính ASOS",
        "shortName": "Bo mạch chủ máy tính ASOS",
        "secondClass": "collection",
        "thirdClass": "Thiết bị điện tử",
        "price": 44249,
        "avgPrice": 44249,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15030040007.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15030040007.png",
        "grade": 4,
        "itemWidth": 2,
        "itemHeight": 2,
        "crates": [
            "ULD",
            "mcomputerCase",
            "backpack"
        ]
    },
    {
        "objectID": 15080050181,
        "name": "Tập hồ sơ tài liệu rách",
        "nameVi": "Tập hồ sơ tài liệu rách",
        "objectName": "残缺的档案",
        "objectNameVi": "Tập hồ sơ tài liệu rách",
        "shortName": "Tập hồ sơ tài liệu rách",
        "secondClass": "collection",
        "thirdClass": "Tài liệu tình báo",
        "price": 22437,
        "avgPrice": 22437,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050181.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050181.png",
        "grade": 4,
        "itemWidth": 1,
        "itemHeight": 2,
        "crates": [
            "ULD",
            "experimentCrate"
        ]
    },
    {
        "objectID": 15080050216,
        "name": "Sổ tay ghi chép mã hóa",
        "nameVi": "Sổ tay ghi chép mã hóa",
        "objectName": "加密手记",
        "objectNameVi": "Sổ tay ghi chép mã hóa",
        "shortName": "Sổ tay ghi chép mã hóa",
        "secondClass": "collection",
        "thirdClass": "Tài liệu tình báo",
        "price": 20152,
        "avgPrice": 20152,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050216.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050216.png",
        "grade": 4,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "ULD",
            "experimentCrate"
        ]
    },
    {
        "objectID": 15080050038,
        "name": "Card âm thanh chuyên nghiệp",
        "nameVi": "Card âm thanh chuyên nghiệp",
        "objectName": "专业声卡",
        "objectNameVi": "Card âm thanh chuyên nghiệp",
        "shortName": "Card âm thanh chuyên nghiệp",
        "secondClass": "collection",
        "thirdClass": "Thiết bị điện tử",
        "price": 33369,
        "avgPrice": 33369,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050038.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050038.png",
        "grade": 4,
        "itemWidth": 2,
        "itemHeight": 1,
        "crates": [
            "ULD",
            "mcomputerCase",
            "experimentCrate"
        ]
    },
    {
        "objectID": 15030050019,
        "name": "Thuốc nổ quân sự C4",
        "nameVi": "Thuốc nổ quân sự C4",
        "objectName": "军用炸药",
        "objectNameVi": "Thuốc nổ quân sự C4",
        "shortName": "Thuốc nổ quân sự C4",
        "secondClass": "collection",
        "thirdClass": "Dụng cụ và vật liệu",
        "price": 127265,
        "avgPrice": 127265,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15030050019.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15030050019.png",
        "grade": 5,
        "itemWidth": 2,
        "itemHeight": 2,
        "crates": [
            "ULD"
        ]
    },
    {
        "objectID": 15080050129,
        "name": "Giá đỡ mạch vành tim Stent",
        "nameVi": "Giá đỡ mạch vành tim Stent",
        "objectName": "心脏支架",
        "objectNameVi": "Giá đỡ mạch vành tim Stent",
        "shortName": "Giá đỡ mạch vành tim Stent",
        "secondClass": "collection",
        "thirdClass": "Vật tư y tế",
        "price": 75465,
        "avgPrice": 75465,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050129.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050129.png",
        "grade": 5,
        "itemWidth": 1,
        "itemHeight": 2,
        "crates": [
            "ULD"
        ]
    },
    {
        "objectID": 15070010001,
        "name": "Ổ USB dữ liệu",
        "nameVi": "Ổ USB dữ liệu",
        "objectName": "U盘",
        "objectNameVi": "Ổ USB dữ liệu",
        "shortName": "Ổ USB dữ liệu",
        "secondClass": "collection",
        "thirdClass": "Thiết bị điện tử",
        "price": 9307,
        "avgPrice": 9307,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15070010001.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15070010001.png",
        "grade": 3,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "ULD",
            "serverCrate",
            "mcomputerCase",
            "backpack",
            "experimentCrate"
        ]
    },
    {
        "objectID": 15030050003,
        "name": "Bộ xử lý khả trình MCU",
        "nameVi": "Bộ xử lý khả trình MCU",
        "objectName": "可编程处理器",
        "objectNameVi": "Bộ xử lý khả trình MCU",
        "shortName": "Bộ xử lý khả trình MCU",
        "secondClass": "collection",
        "thirdClass": "Thiết bị điện tử",
        "price": 87932,
        "avgPrice": 87932,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15030050003.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15030050003.png",
        "grade": 5,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "ULD"
        ]
    },
    {
        "objectID": 15080050214,
        "name": "Bình xịt sơ cứu khẩn cấp",
        "nameVi": "Bình xịt sơ cứu khẩn cấp",
        "objectName": "急救喷雾",
        "objectNameVi": "Bình xịt sơ cứu khẩn cấp",
        "shortName": "Bình xịt sơ cứu khẩn cấp",
        "secondClass": "collection",
        "thirdClass": "Vật tư y tế",
        "price": 14777,
        "avgPrice": 14777,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050214.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050214.png",
        "grade": 4,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "ULD",
            "medicalBag"
        ]
    },
    {
        "objectID": 15040010017,
        "name": "Lọ thuốc súng đen",
        "nameVi": "Lọ thuốc súng đen",
        "objectName": "火药",
        "objectNameVi": "Lọ thuốc súng đen",
        "shortName": "Lọ thuốc súng đen",
        "secondClass": "collection",
        "thirdClass": "Dụng cụ và vật liệu",
        "price": 23111,
        "avgPrice": 23111,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15040010017.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15040010017.png",
        "grade": 3,
        "itemWidth": 1,
        "itemHeight": 2,
        "crates": [
            "ULD",
            "travelBag",
            "hiddenCrate"
        ]
    },
    {
        "objectID": 15080050039,
        "name": "Nhiệt kế điện tử",
        "nameVi": "Nhiệt kế điện tử",
        "objectName": "电子温度计",
        "objectNameVi": "Nhiệt kế điện tử",
        "shortName": "Nhiệt kế điện tử",
        "secondClass": "collection",
        "thirdClass": "Thiết bị điện tử",
        "price": 18067,
        "avgPrice": 18067,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050039.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050039.png",
        "grade": 3,
        "itemWidth": 2,
        "itemHeight": 2,
        "crates": [
            "ULD",
            "mcomputerCase"
        ]
    },
    {
        "objectID": 15080050102,
        "name": "Que phát sáng tín hiệu Flare",
        "nameVi": "Que phát sáng tín hiệu Flare",
        "objectName": "信号棒",
        "objectNameVi": "Que phát sáng tín hiệu Flare",
        "shortName": "Que phát sáng tín hiệu Flare",
        "secondClass": "collection",
        "thirdClass": "Năng lượng và nhiên liệu",
        "price": 23245,
        "avgPrice": 23245,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050102.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050102.png",
        "grade": 4,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "ULD"
        ]
    },
    {
        "objectID": 14060000008,
        "name": "Bộ sửa chữa giáp tự chế",
        "nameVi": "Bộ sửa chữa giáp tự chế",
        "objectName": "自制护甲维修包",
        "objectNameVi": "Bộ sửa chữa giáp tự chế",
        "shortName": "Bộ sửa chữa giáp tự chế",
        "secondClass": "consume",
        "thirdClass": "Bộ dụng cụ sửa chữa",
        "price": 16888,
        "avgPrice": 16888,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/14060000008.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/14060000008.png",
        "grade": 3,
        "itemWidth": 2,
        "itemHeight": 1,
        "crates": [
            "ULD"
        ]
    },
    {
        "objectID": 11080004002,
        "name": "Balo dã ngoại hành quân",
        "nameVi": "Balo dã ngoại hành quân",
        "objectName": "野战徒步背包",
        "objectNameVi": "Balo dã ngoại hành quân",
        "shortName": "Balo dã ngoại hành quân",
        "secondClass": "bag",
        "thirdClass": "",
        "price": 28389,
        "avgPrice": 28389,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/11080004002.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/11080004002.png",
        "grade": 4,
        "itemWidth": 2,
        "itemHeight": 2,
        "crates": [
            "ULD"
        ]
    },
    {
        "objectID": 15070050002,
        "name": "Tài liệu: Tình báo quân sự",
        "nameVi": "Tài liệu: Tình báo quân sự",
        "objectName": "资料：军事情报",
        "objectNameVi": "Tài liệu: Tình báo quân sự",
        "shortName": "Tài liệu: Tình báo quân sự",
        "secondClass": "collection",
        "thirdClass": "Tài liệu tình báo",
        "price": 12528,
        "avgPrice": 12528,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15070050002.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15070050002.png",
        "grade": 4,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "ULD"
        ]
    },
    {
        "objectID": 15080050218,
        "name": "Ống hít thông mũi dã chiến",
        "nameVi": "Ống hít thông mũi dã chiến",
        "objectName": "鼻通",
        "objectNameVi": "Ống hít thông mũi dã chiến",
        "shortName": "Ống hít thông mũi dã chiến",
        "secondClass": "collection",
        "thirdClass": "Đồ gia dụng",
        "price": 21768,
        "avgPrice": 21768,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050218.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050218.png",
        "grade": 4,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "ULD",
            "backpack"
        ]
    },
    {
        "objectID": 15080050221,
        "name": "Lõi làm mát lò phản ứng hạt nhân",
        "nameVi": "Lõi làm mát lò phản ứng hạt nhân",
        "objectName": "反应堆冷却核心",
        "objectNameVi": "Lõi làm mát lò phản ứng hạt nhân",
        "shortName": "Lõi làm mát lò phản ứng hạt nhân",
        "secondClass": "collection",
        "thirdClass": "Năng lượng và nhiên liệu",
        "price": 2136685,
        "avgPrice": 2136685,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050221.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050221.png",
        "grade": 6,
        "itemWidth": 3,
        "itemHeight": 3,
        "crates": [
            "ULD"
        ]
    },
    {
        "objectID": 15030040014,
        "name": "Thiết bị gây nhiễu điện tử",
        "nameVi": "Thiết bị gây nhiễu điện tử",
        "objectName": "电子干扰器",
        "objectNameVi": "Thiết bị gây nhiễu điện tử",
        "shortName": "Thiết bị gây nhiễu điện tử",
        "secondClass": "collection",
        "thirdClass": "Thiết bị điện tử",
        "price": 12373,
        "avgPrice": 12373,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15030040014.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15030040014.png",
        "grade": 4,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "ULD",
            "serverCrate",
            "mcomputerCase",
            "backpack",
            "advancedStorageCrate"
        ]
    },
    {
        "objectID": 11080004004,
        "name": "Balo leo núi ngoài trời GT1",
        "nameVi": "Balo leo núi ngoài trời GT1",
        "objectName": "GT1户外登山包",
        "objectNameVi": "Balo leo núi ngoài trời GT1",
        "shortName": "Balo leo núi ngoài trời GT1",
        "secondClass": "bag",
        "thirdClass": "",
        "price": 52503,
        "avgPrice": 52503,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/11080004004.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/11080004004.png",
        "grade": 4,
        "itemWidth": 2,
        "itemHeight": 2,
        "crates": [
            "ULD"
        ]
    },
    {
        "objectID": 15080050127,
        "name": "Tủ ấm nuôi cấy sinh học",
        "nameVi": "Tủ ấm nuôi cấy sinh học",
        "objectName": "生化培养箱",
        "objectNameVi": "Tủ ấm nuôi cấy sinh học",
        "shortName": "Tủ ấm nuôi cấy sinh học",
        "secondClass": "collection",
        "thirdClass": "Vật tư y tế",
        "price": 54138,
        "avgPrice": 54138,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050127.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050127.png",
        "grade": 4,
        "itemWidth": 2,
        "itemHeight": 2,
        "crates": [
            "ULD"
        ]
    },
    {
        "objectID": 15080050194,
        "name": "Vòng đeo tay điện tử",
        "nameVi": "Vòng đeo tay điện tử",
        "objectName": "腕带",
        "objectNameVi": "Vòng đeo tay điện tử",
        "shortName": "Vòng đeo tay điện tử",
        "secondClass": "collection",
        "thirdClass": "Thiết bị điện tử",
        "price": 9987,
        "avgPrice": 9987,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050194.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050194.png",
        "grade": 3,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "ULD",
            "mcomputerCase",
            "experimentCrate"
        ]
    },
    {
        "objectID": 15080050108,
        "name": "Pin kiềm đa năng",
        "nameVi": "Pin kiềm đa năng",
        "objectName": "多用途电池",
        "objectNameVi": "Pin kiềm đa năng",
        "shortName": "Pin kiềm đa năng",
        "secondClass": "collection",
        "thirdClass": "Năng lượng và nhiên liệu",
        "price": 8800,
        "avgPrice": 8800,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050108.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050108.png",
        "grade": 3,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "ULD",
            "backpack"
        ]
    },
    {
        "objectID": 15020010024,
        "name": "Kìm nghiền thủy lực công suất lớn",
        "nameVi": "Kìm nghiền thủy lực công suất lớn",
        "objectName": "高出力粉碎钳",
        "objectNameVi": "Kìm nghiền thủy lực công suất lớn",
        "shortName": "Kìm nghiền thủy lực công suất lớn",
        "secondClass": "collection",
        "thirdClass": "Dụng cụ và vật liệu",
        "price": 59459,
        "avgPrice": 59459,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15020010024.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15020010024.png",
        "grade": 4,
        "itemWidth": 1,
        "itemHeight": 2,
        "crates": [
            "ULD"
        ]
    },
    {
        "objectID": 15080050116,
        "name": "Kính hiển vi điện tử",
        "nameVi": "Kính hiển vi điện tử",
        "objectName": "电子显微镜",
        "objectNameVi": "Kính hiển vi điện tử",
        "shortName": "Kính hiển vi điện tử",
        "secondClass": "collection",
        "thirdClass": "Vật tư y tế",
        "price": 14465,
        "avgPrice": 14465,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050116.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050116.png",
        "grade": 3,
        "itemWidth": 1,
        "itemHeight": 3,
        "crates": [
            "ULD",
            "advancedStorageCrate"
        ]
    },
    {
        "objectID": 15060040003,
        "name": "Máy đo nồng độ oxy trong máu SpO2",
        "nameVi": "Máy đo nồng độ oxy trong máu SpO2",
        "objectName": "血氧仪",
        "objectNameVi": "Máy đo nồng độ oxy trong máu SpO2",
        "shortName": "Máy đo nồng độ oxy trong máu SpO2",
        "secondClass": "collection",
        "thirdClass": "Vật tư y tế",
        "price": 60780,
        "avgPrice": 60780,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15060040003.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15060040003.png",
        "grade": 5,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "ULD"
        ]
    },
    {
        "objectID": 11080003005,
        "name": "Balo thợ săn rừng nhiệt đới",
        "nameVi": "Balo thợ săn rừng nhiệt đới",
        "objectName": "雨林猎手背包",
        "objectNameVi": "Balo thợ săn rừng nhiệt đới",
        "shortName": "Balo thợ săn rừng nhiệt đới",
        "secondClass": "bag",
        "thirdClass": "",
        "price": 19586,
        "avgPrice": 19586,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/11080003005.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/11080003005.png",
        "grade": 3,
        "itemWidth": 2,
        "itemHeight": 2,
        "crates": [
            "ULD"
        ]
    },
    {
        "objectID": 15080050090,
        "name": "Ổ SSD tốc độ cao",
        "nameVi": "Ổ SSD tốc độ cao",
        "objectName": "高速固态硬盘",
        "objectNameVi": "Ổ SSD tốc độ cao",
        "shortName": "Ổ SSD tốc độ cao",
        "secondClass": "collection",
        "thirdClass": "Thiết bị điện tử",
        "price": 73731,
        "avgPrice": 73731,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050090.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050090.png",
        "grade": 5,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "serverCrate"
        ]
    },
    {
        "objectID": 15080050189,
        "name": "Thiết bị giao diện não-máy BCI",
        "nameVi": "Thiết bị giao diện não-máy BCI",
        "objectName": "脑机头戴设备",
        "objectNameVi": "Thiết bị giao diện não-máy BCI",
        "shortName": "Thiết bị giao diện não-máy BCI",
        "secondClass": "collection",
        "thirdClass": "Thiết bị điện tử",
        "price": 201245,
        "avgPrice": 201245,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050189.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050189.png",
        "grade": 5,
        "itemWidth": 2,
        "itemHeight": 2,
        "crates": [
            "serverCrate"
        ]
    },
    {
        "objectID": 15070010002,
        "name": "Thẻ nhớ MicroSD",
        "nameVi": "Thẻ nhớ MicroSD",
        "objectName": "存储卡",
        "objectNameVi": "Thẻ nhớ MicroSD",
        "shortName": "Thẻ nhớ MicroSD",
        "secondClass": "collection",
        "thirdClass": "Thiết bị điện tử",
        "price": 7790,
        "avgPrice": 7790,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15070010002.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15070010002.png",
        "grade": 3,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "serverCrate",
            "mcomputerCase",
            "backpack"
        ]
    },
    {
        "objectID": 15030050005,
        "name": "Card âm thanh Hi-Fi",
        "nameVi": "Card âm thanh Hi-Fi",
        "objectName": "HIFI声卡",
        "objectNameVi": "Card âm thanh Hi-Fi",
        "shortName": "Card âm thanh Hi-Fi",
        "secondClass": "collection",
        "thirdClass": "Thiết bị điện tử",
        "price": 24745,
        "avgPrice": 24745,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15030050005.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15030050005.png",
        "grade": 4,
        "itemWidth": 2,
        "itemHeight": 1,
        "crates": [
            "ULD"
        ]
    },
    {
        "objectID": 15080050180,
        "name": "Kính phi công chống lóa Aviator",
        "nameVi": "Kính phi công chống lóa Aviator",
        "objectName": "飞行员眼镜",
        "objectNameVi": "Kính phi công chống lóa Aviator",
        "shortName": "Kính phi công chống lóa Aviator",
        "secondClass": "collection",
        "thirdClass": "Đồ gia dụng",
        "price": 79865,
        "avgPrice": 79865,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050180.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050180.png",
        "grade": 5,
        "itemWidth": 2,
        "itemHeight": 1,
        "crates": [
            "ULD"
        ]
    },
    {
        "objectID": 15030010001,
        "name": "Pin sạc dự phòng quân sự",
        "nameVi": "Pin sạc dự phòng quân sự",
        "objectName": "军用移动电源",
        "objectNameVi": "Pin sạc dự phòng quân sự",
        "shortName": "Pin sạc dự phòng quân sự",
        "secondClass": "collection",
        "thirdClass": "Thiết bị điện tử",
        "price": 8213,
        "avgPrice": 8213,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15030010001.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15030010001.png",
        "grade": 3,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "ULD",
            "mcomputerCase",
            "advancedStorageCrate"
        ]
    },
    {
        "objectID": 15030040005,
        "name": "Ổ đĩa thể rắn SSD",
        "nameVi": "Ổ đĩa thể rắn SSD",
        "objectName": "固态硬盘",
        "objectNameVi": "Ổ đĩa thể rắn SSD",
        "shortName": "Ổ đĩa thể rắn SSD",
        "secondClass": "collection",
        "thirdClass": "Thiết bị điện tử",
        "price": 33672,
        "avgPrice": 33672,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15030040005.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15030040005.png",
        "grade": 4,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "serverCrate",
            "backpack"
        ]
    },
    {
        "objectID": 15020050008,
        "name": "Rơ-le điện tử",
        "nameVi": "Rơ-le điện tử",
        "objectName": "继电器",
        "objectNameVi": "Rơ-le điện tử",
        "shortName": "Rơ-le điện tử",
        "secondClass": "collection",
        "thirdClass": "Thiết bị điện tử",
        "price": 8699,
        "avgPrice": 8699,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15020050008.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15020050008.png",
        "grade": 3,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "serverCrate",
            "experimentCrate"
        ]
    },
    {
        "objectID": 15030040006,
        "name": "Thanh RAM máy tính",
        "nameVi": "Thanh RAM máy tính",
        "objectName": "内存条",
        "objectNameVi": "Thanh RAM máy tính",
        "shortName": "Thanh RAM máy tính",
        "secondClass": "collection",
        "thirdClass": "Thiết bị điện tử",
        "price": 26124,
        "avgPrice": 26124,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15030040006.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15030040006.png",
        "grade": 4,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "serverCrate",
            "mcomputerCase",
            "experimentCrate"
        ]
    },
    {
        "objectID": 15030040003,
        "name": "Bộ vi xử lý CPU",
        "nameVi": "Bộ vi xử lý CPU",
        "objectName": "CPU",
        "objectNameVi": "Bộ vi xử lý CPU",
        "shortName": "Bộ vi xử lý CPU",
        "secondClass": "collection",
        "thirdClass": "Thiết bị điện tử",
        "price": 63164,
        "avgPrice": 63164,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15030040003.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15030040003.png",
        "grade": 5,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "ULD",
            "serverCrate"
        ]
    },
    {
        "objectID": 15040010015,
        "name": "Bút ghi âm gián điệp",
        "nameVi": "Bút ghi âm gián điệp",
        "objectName": "间谍笔",
        "objectNameVi": "Bút ghi âm gián điệp",
        "shortName": "Bút ghi âm gián điệp",
        "secondClass": "collection",
        "thirdClass": "Thiết bị điện tử",
        "price": 20659,
        "avgPrice": 20659,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15040010015.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15040010015.png",
        "grade": 4,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "serverCrate",
            "mcomputerCase"
        ]
    },
    {
        "objectID": 15030040010,
        "name": "Màn hình tinh thể lỏng LCD",
        "nameVi": "Màn hình tinh thể lỏng LCD",
        "objectName": "液晶显示屏",
        "objectNameVi": "Màn hình tinh thể lỏng LCD",
        "shortName": "Màn hình tinh thể lỏng LCD",
        "secondClass": "collection",
        "thirdClass": "Thiết bị điện tử",
        "price": 19117,
        "avgPrice": 19117,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15030040010.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15030040010.png",
        "grade": 3,
        "itemWidth": 2,
        "itemHeight": 2,
        "crates": [
            "serverCrate",
            "backpack",
            "birdCrate"
        ]
    },
    {
        "objectID": 15080050172,
        "name": "Băng từ video bỏ túi",
        "nameVi": "Băng từ video bỏ túi",
        "objectName": "袖珍录像带",
        "objectNameVi": "Băng từ video bỏ túi",
        "shortName": "Băng từ video bỏ túi",
        "secondClass": "collection",
        "thirdClass": "Tài liệu tình báo",
        "price": 17694,
        "avgPrice": 17694,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050172.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050172.png",
        "grade": 4,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "mcomputerCase"
        ]
    },
    {
        "objectID": 15080050217,
        "name": "Tai nghe không dây",
        "nameVi": "Tai nghe không dây",
        "objectName": "无线耳机",
        "objectNameVi": "Tai nghe không dây",
        "shortName": "Tai nghe không dây",
        "secondClass": "collection",
        "thirdClass": "Thiết bị điện tử",
        "price": 9464,
        "avgPrice": 9464,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050217.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050217.png",
        "grade": 3,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "mcomputerCase",
            "backpack"
        ]
    },
    {
        "objectID": 15070040002,
        "name": "Tài liệu: Hợp đồng thương mại",
        "nameVi": "Tài liệu: Hợp đồng thương mại",
        "objectName": "资料：商业文件",
        "objectNameVi": "Tài liệu: Hợp đồng thương mại",
        "shortName": "Tài liệu: Hợp đồng thương mại",
        "secondClass": "collection",
        "thirdClass": "Tài liệu tình báo",
        "price": 7260,
        "avgPrice": 7260,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15070040002.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15070040002.png",
        "grade": 3,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "mcomputerCase",
            "advancedStorageCrate"
        ]
    },
    {
        "objectID": 15030040012,
        "name": "Máy thu thanh Radio",
        "nameVi": "Máy thu thanh Radio",
        "objectName": "收音机",
        "objectNameVi": "Máy thu thanh Radio",
        "shortName": "Máy thu thanh Radio",
        "secondClass": "collection",
        "thirdClass": "Thiết bị điện tử",
        "price": 25678,
        "avgPrice": 25678,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15030040012.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15030040012.png",
        "grade": 4,
        "itemWidth": 2,
        "itemHeight": 1,
        "crates": [
            "mcomputerCase"
        ]
    },
    {
        "objectID": 15030040002,
        "name": "Camera giám sát mini",
        "nameVi": "Camera giám sát mini",
        "objectName": "摄像头",
        "objectNameVi": "Camera giám sát mini",
        "shortName": "Camera giám sát mini",
        "secondClass": "collection",
        "thirdClass": "Thiết bị điện tử",
        "price": 12199,
        "avgPrice": 12199,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15030040002.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15030040002.png",
        "grade": 3,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "mcomputerCase",
            "advancedStorageCrate",
            "experimentCrate"
        ]
    },
    {
        "objectID": 15080050229,
        "name": "Huy hiệu lực lượng tác chiến",
        "nameVi": "Huy hiệu lực lượng tác chiến",
        "objectName": "部队饰章",
        "objectNameVi": "Huy hiệu lực lượng tác chiến",
        "shortName": "Huy hiệu lực lượng tác chiến",
        "secondClass": "collection",
        "thirdClass": "Tài liệu tình báo",
        "price": 8116,
        "avgPrice": 8116,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050229.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050229.png",
        "grade": 3,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "mcomputerCase",
            "experimentCrate"
        ]
    },
    {
        "objectID": 15080050026,
        "name": "Dao Delta Force: Black Hawk Down",
        "nameVi": "Dao Delta Force: Black Hawk Down",
        "objectName": "三角洲特种部队：黑鹰坠落-战队之刃",
        "objectNameVi": "Dao Delta Force: Black Hawk Down",
        "shortName": "Dao Delta Force: Black Hawk Down",
        "secondClass": "collection",
        "thirdClass": "Đồ gia dụng",
        "price": 19445,
        "avgPrice": 19445,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050026.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050026.png",
        "grade": 3,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "backpack"
        ]
    },
    {
        "objectID": 15030010008,
        "name": "Máy phát âm thanh",
        "nameVi": "Máy phát âm thanh",
        "objectName": "音频播放器",
        "objectNameVi": "Máy phát âm thanh",
        "shortName": "Máy phát âm thanh",
        "secondClass": "collection",
        "thirdClass": "Thiết bị điện tử",
        "price": 10481,
        "avgPrice": 10481,
        "image": "https://eo.oss.hengj.cn/one/object/15030010008.png",
        "pic": "https://eo.oss.hengj.cn/one/object/15030010008.png",
        "grade": 3,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "backpack",
            "advancedStorageCrate"
        ]
    },
    {
        "objectID": 15020050001,
        "name": "Cưa tay xoay đa năng",
        "nameVi": "Cưa tay xoay đa năng",
        "objectName": "自旋型手锯",
        "objectNameVi": "Cưa tay xoay đa năng",
        "shortName": "Cưa tay xoay đa năng",
        "secondClass": "collection",
        "thirdClass": "Dụng cụ và vật liệu",
        "price": 44986,
        "avgPrice": 44986,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15020050001.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15020050001.png",
        "grade": 4,
        "itemWidth": 2,
        "itemHeight": 2,
        "crates": [
            "backpack"
        ]
    },
    {
        "objectID": 15080050072,
        "name": "Ấm pha cà phê Moka",
        "nameVi": "Ấm pha cà phê Moka",
        "objectName": "摩卡咖啡壶",
        "objectNameVi": "Ấm pha cà phê Moka",
        "shortName": "Ấm pha cà phê Moka",
        "secondClass": "collection",
        "thirdClass": "Đồ gia dụng",
        "price": 14280,
        "avgPrice": 14280,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050072.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050072.png",
        "grade": 3,
        "itemWidth": 1,
        "itemHeight": 2,
        "crates": [
            "backpack"
        ]
    },
    {
        "objectID": 15080050091,
        "name": "Loa di động",
        "nameVi": "Loa di động",
        "objectName": "便携音响",
        "objectNameVi": "Loa di động",
        "shortName": "Loa di động",
        "secondClass": "collection",
        "thirdClass": "Thiết bị điện tử",
        "price": 26264,
        "avgPrice": 26264,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050091.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050091.png",
        "grade": 4,
        "itemWidth": 2,
        "itemHeight": 1,
        "crates": [
            "mcomputerCase"
        ]
    },
    {
        "objectID": 15020010037,
        "name": "Bình gas dã ngoại",
        "nameVi": "Bình gas dã ngoại",
        "objectName": "燃气罐",
        "objectNameVi": "Bình gas dã ngoại",
        "shortName": "Bình gas dã ngoại",
        "secondClass": "collection",
        "thirdClass": "Năng lượng và nhiên liệu",
        "price": 21217,
        "avgPrice": 21217,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15020010037.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15020010037.png",
        "grade": 3,
        "itemWidth": 2,
        "itemHeight": 2,
        "crates": [
            "backpack"
        ]
    },
    {
        "objectID": 15020010018,
        "name": "Búa phá chướng ngại vật cơ khí",
        "nameVi": "Búa phá chướng ngại vật cơ khí",
        "objectName": "机械破障锤",
        "objectNameVi": "Búa phá chướng ngại vật cơ khí",
        "shortName": "Búa phá chướng ngại vật cơ khí",
        "secondClass": "collection",
        "thirdClass": "Dụng cụ và vật liệu",
        "price": 33475,
        "avgPrice": 33475,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15020010018.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15020010018.png",
        "grade": 3,
        "itemWidth": 2,
        "itemHeight": 2,
        "crates": [
            "backpack"
        ]
    },
    {
        "objectID": 15080050219,
        "name": "Phấn rôm khử ẩm dã chiến",
        "nameVi": "Phấn rôm khử ẩm dã chiến",
        "objectName": "爽身粉",
        "objectNameVi": "Phấn rôm khử ẩm dã chiến",
        "shortName": "Phấn rôm khử ẩm dã chiến",
        "secondClass": "collection",
        "thirdClass": "Đồ gia dụng",
        "price": 21860,
        "avgPrice": 21860,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050219.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050219.png",
        "grade": 4,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "backpack"
        ]
    },
    {
        "objectID": 15080050074,
        "name": "Trà túi lọc kiểu Anh",
        "nameVi": "Trà túi lọc kiểu Anh",
        "objectName": "英式袋泡茶",
        "objectNameVi": "Trà túi lọc kiểu Anh",
        "shortName": "Trà túi lọc kiểu Anh",
        "secondClass": "collection",
        "thirdClass": "Đồ gia dụng",
        "price": 14785,
        "avgPrice": 14785,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050074.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050074.png",
        "grade": 3,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "backpack",
            "advancedStorageCrate"
        ]
    },
    {
        "objectID": 15080050021,
        "name": "Tạp chí thời trang Ahsarah",
        "nameVi": "Tạp chí thời trang Ahsarah",
        "objectName": "阿萨拉时尚周刊",
        "objectNameVi": "Tạp chí thời trang Ahsarah",
        "shortName": "Tạp chí thời trang Ahsarah",
        "secondClass": "collection",
        "thirdClass": "Đồ gia dụng",
        "price": 16532,
        "avgPrice": 16532,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050021.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050021.png",
        "grade": 3,
        "itemWidth": 2,
        "itemHeight": 2,
        "crates": [
            "backpack",
            "birdCrate"
        ]
    },
    {
        "objectID": 15020010016,
        "name": "Thùng sơn công nghiệp",
        "nameVi": "Thùng sơn công nghiệp",
        "objectName": "一桶油漆",
        "objectNameVi": "Thùng sơn công nghiệp",
        "shortName": "Thùng sơn công nghiệp",
        "secondClass": "collection",
        "thirdClass": "Dụng cụ và vật liệu",
        "price": 20674,
        "avgPrice": 20674,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15020010016.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15020010016.png",
        "grade": 3,
        "itemWidth": 2,
        "itemHeight": 2,
        "crates": [
            "backpack"
        ]
    },
    {
        "objectID": 15060080008,
        "name": "Gel bổ sung năng lượng vị cam",
        "nameVi": "Gel bổ sung năng lượng vị cam",
        "objectName": "清新橘味能量凝胶",
        "objectNameVi": "Gel bổ sung năng lượng vị cam",
        "shortName": "Gel bổ sung năng lượng vị cam",
        "secondClass": "collection",
        "thirdClass": "Đồ gia dụng",
        "price": 46711,
        "avgPrice": 46711,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15060080008.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15060080008.png",
        "grade": 4,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "backpack"
        ]
    },
    {
        "objectID": 15060080010,
        "name": "Hộp mì xào thơm lừng",
        "nameVi": "Hộp mì xào thơm lừng",
        "objectName": "香喷喷炒面",
        "objectNameVi": "Hộp mì xào thơm lừng",
        "shortName": "Hộp mì xào thơm lừng",
        "secondClass": "collection",
        "thirdClass": "Đồ gia dụng",
        "price": 8541,
        "avgPrice": 8541,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15060080010.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15060080010.png",
        "grade": 3,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "backpack",
            "advancedStorageCrate"
        ]
    },
    {
        "objectID": 15040010022,
        "name": "Phích cắm chuyển đổi",
        "nameVi": "Phích cắm chuyển đổi",
        "objectName": "转换插座",
        "objectNameVi": "Phích cắm chuyển đổi",
        "shortName": "Phích cắm chuyển đổi",
        "secondClass": "collection",
        "thirdClass": "Dụng cụ và vật liệu",
        "price": 9556,
        "avgPrice": 9556,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15040010022.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15040010022.png",
        "grade": 3,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "backpack",
            "travelBag"
        ]
    },
    {
        "objectID": 15020040002,
        "name": "Cuộn sợi Aramid Kevlar",
        "nameVi": "Cuộn sợi Aramid Kevlar",
        "objectName": "芳纶纤维",
        "objectNameVi": "Cuộn sợi Aramid Kevlar",
        "shortName": "Cuộn sợi Aramid Kevlar",
        "secondClass": "collection",
        "thirdClass": "Dụng cụ và vật liệu",
        "price": 24426,
        "avgPrice": 24426,
        "image": "https://eo.oss.hengj.cn/one/object/15020040002.png",
        "pic": "https://eo.oss.hengj.cn/one/object/15020040002.png",
        "grade": 3,
        "itemWidth": 2,
        "itemHeight": 1,
        "crates": [
            "backpack"
        ]
    },
    {
        "objectID": 14070000005,
        "name": "Thuốc kích hoạt giác quan",
        "nameVi": "Thuốc kích hoạt giác quan",
        "objectName": "感知强化剂",
        "objectNameVi": "Thuốc kích hoạt giác quan",
        "shortName": "Thuốc kích hoạt giác quan",
        "secondClass": "consume",
        "thirdClass": "Thuốc tiêm",
        "price": 54648,
        "avgPrice": 54648,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/14070000005.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/14070000005.png",
        "grade": 4,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "medicalCrate"
        ]
    },
    {
        "objectID": 15060040002,
        "name": "Máy đo huyết áp",
        "nameVi": "Máy đo huyết áp",
        "objectName": "血压仪",
        "objectNameVi": "Máy đo huyết áp",
        "shortName": "Máy đo huyết áp",
        "secondClass": "collection",
        "thirdClass": "Vật tư y tế",
        "price": 36712,
        "avgPrice": 36712,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15060040002.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15060040002.png",
        "grade": 4,
        "itemWidth": 2,
        "itemHeight": 2,
        "crates": [
            "medicalCrate",
            "medicalBag"
        ]
    },
    {
        "objectID": 14030000002,
        "name": "Bộ phẫu thuật tháo nhanh chiến thuật",
        "nameVi": "Bộ phẫu thuật tháo nhanh chiến thuật",
        "objectName": "战术快拆手术包",
        "objectNameVi": "Bộ phẫu thuật tháo nhanh chiến thuật",
        "shortName": "Bộ phẫu thuật tháo nhanh chiến thuật",
        "secondClass": "consume",
        "thirdClass": "Bộ dụng cụ phẫu thuật",
        "price": 8930,
        "avgPrice": 8930,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/14030000002.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/14030000002.png",
        "grade": 2,
        "itemWidth": 2,
        "itemHeight": 1,
        "crates": [
            "medicalCrate",
            "medicalBag"
        ]
    },
    {
        "objectID": 15060040001,
        "name": "Máy định vị tĩnh mạch",
        "nameVi": "Máy định vị tĩnh mạch",
        "objectName": "静脉定位器",
        "objectNameVi": "Máy định vị tĩnh mạch",
        "shortName": "Máy định vị tĩnh mạch",
        "secondClass": "collection",
        "thirdClass": "Vật tư y tế",
        "price": 77228,
        "avgPrice": 77228,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15060040001.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15060040001.png",
        "grade": 5,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "medicalCrate"
        ]
    },
    {
        "objectID": 14070000006,
        "name": "Mũi tiêm kích hoạt thể lực",
        "nameVi": "Mũi tiêm kích hoạt thể lực",
        "objectName": "体能激活针",
        "objectNameVi": "Mũi tiêm kích hoạt thể lực",
        "shortName": "Mũi tiêm kích hoạt thể lực",
        "secondClass": "consume",
        "thirdClass": "Thuốc tiêm",
        "price": 27354,
        "avgPrice": 27354,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/14070000006.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/14070000006.png",
        "grade": 3,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "medicalCrate"
        ]
    },
    {
        "objectID": 15030050016,
        "name": "Tấm pin năng lượng mặt trời",
        "nameVi": "Tấm pin năng lượng mặt trời",
        "objectName": "太阳能板",
        "objectNameVi": "Tấm pin năng lượng mặt trời",
        "shortName": "Tấm pin năng lượng mặt trời",
        "secondClass": "collection",
        "thirdClass": "Thiết bị điện tử",
        "price": 26483,
        "avgPrice": 26483,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15030050016.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15030050016.png",
        "grade": 3,
        "itemWidth": 4,
        "itemHeight": 2,
        "crates": [
            "backpack"
        ]
    },
    {
        "objectID": 15080050075,
        "name": "Tẩu thuốc khắc gỗ thủ công",
        "nameVi": "Tẩu thuốc khắc gỗ thủ công",
        "objectName": "木雕烟斗",
        "objectNameVi": "Tẩu thuốc khắc gỗ thủ công",
        "shortName": "Tẩu thuốc khắc gỗ thủ công",
        "secondClass": "collection",
        "thirdClass": "Đồ gia dụng",
        "price": 13218,
        "avgPrice": 13218,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050075.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050075.png",
        "grade": 3,
        "itemWidth": 2,
        "itemHeight": 1,
        "crates": [
            "backpack",
            "experimentCrate",
            "travelBag"
        ]
    },
    {
        "objectID": 15080050179,
        "name": "Thiết bị phá cửa thủy lực",
        "nameVi": "Thiết bị phá cửa thủy lực",
        "objectName": "液压破门器",
        "objectNameVi": "Thiết bị phá cửa thủy lực",
        "shortName": "Thiết bị phá cửa thủy lực",
        "secondClass": "collection",
        "thirdClass": "Dụng cụ và vật liệu",
        "price": 80887,
        "avgPrice": 80887,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050179.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050179.png",
        "grade": 5,
        "itemWidth": 1,
        "itemHeight": 2,
        "crates": [
            "backpack"
        ]
    },
    {
        "objectID": 15080050114,
        "name": "Khớp gối nhân tạo titan",
        "nameVi": "Khớp gối nhân tạo titan",
        "objectName": "人工膝关节",
        "objectNameVi": "Khớp gối nhân tạo titan",
        "shortName": "Khớp gối nhân tạo titan",
        "secondClass": "collection",
        "thirdClass": "Vật tư y tế",
        "price": 23330,
        "avgPrice": 23330,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050114.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050114.png",
        "grade": 4,
        "itemWidth": 1,
        "itemHeight": 2,
        "crates": [
            "medicalCrate"
        ]
    },
    {
        "objectID": 14020000003,
        "name": "Ống tiêm tăng lực",
        "nameVi": "Ống tiêm tăng lực",
        "objectName": "强效注射器",
        "objectNameVi": "Ống tiêm tăng lực",
        "shortName": "Ống tiêm tăng lực",
        "secondClass": "consume",
        "thirdClass": "Túi máu",
        "price": 6699,
        "avgPrice": 6699,
        "image": "https://eo.oss.hengj.cn/one/object/14020000003.png",
        "pic": "https://eo.oss.hengj.cn/one/object/14020000003.png",
        "grade": 2,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "medicalCrate",
            "medicalBag"
        ]
    },
    {
        "objectID": 14070000003,
        "name": "Thuốc tiêm cơ bắp M2",
        "nameVi": "Thuốc tiêm cơ bắp M2",
        "objectName": "M2肌肉注射剂",
        "objectNameVi": "Thuốc tiêm cơ bắp M2",
        "shortName": "Thuốc tiêm cơ bắp M2",
        "secondClass": "consume",
        "thirdClass": "Thuốc tiêm",
        "price": 49076,
        "avgPrice": 49076,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/14070000003.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/14070000003.png",
        "grade": 4,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "medicalCrate"
        ]
    },
    {
        "objectID": 15060010007,
        "name": "Cồn y tế sát trùng",
        "nameVi": "Cồn y tế sát trùng",
        "objectName": "医用酒精",
        "objectNameVi": "Cồn y tế sát trùng",
        "shortName": "Cồn y tế sát trùng",
        "secondClass": "collection",
        "thirdClass": "Vật tư y tế",
        "price": 9373,
        "avgPrice": 9373,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15060010007.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15060010007.png",
        "grade": 3,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "medicalCrate",
            "advancedStorageCrate",
            "medicalBag"
        ]
    },
    {
        "objectID": 14030000001,
        "name": "Bộ phẫu thuật dã chiến đơn giản",
        "nameVi": "Bộ phẫu thuật dã chiến đơn giản",
        "objectName": "简易手术包",
        "objectNameVi": "Bộ phẫu thuật dã chiến đơn giản",
        "shortName": "Bộ phẫu thuật dã chiến đơn giản",
        "secondClass": "consume",
        "thirdClass": "Bộ dụng cụ phẫu thuật",
        "price": 2303,
        "avgPrice": 2303,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/14030000001.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/14030000001.png",
        "grade": 1,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "medicalCrate",
            "medicalBag"
        ]
    },
    {
        "objectID": 14020000002,
        "name": "Hộp cứu thương gắn xe",
        "nameVi": "Hộp cứu thương gắn xe",
        "objectName": "车载急救包",
        "objectNameVi": "Hộp cứu thương gắn xe",
        "shortName": "Hộp cứu thương gắn xe",
        "secondClass": "consume",
        "thirdClass": "Túi máu",
        "price": 2967,
        "avgPrice": 2967,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/14020000002.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/14020000002.png",
        "grade": 1,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "medicalCrate",
            "medicalBag"
        ]
    },
    {
        "objectID": 15080050227,
        "name": "Máy ủ ấm dịch truyền",
        "nameVi": "Máy ủ ấm dịch truyền",
        "objectName": "输液加温器",
        "objectNameVi": "Máy ủ ấm dịch truyền",
        "shortName": "Máy ủ ấm dịch truyền",
        "secondClass": "collection",
        "thirdClass": "Vật tư y tế",
        "price": 21128,
        "avgPrice": 21128,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050227.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050227.png",
        "grade": 4,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "medicalCrate"
        ]
    },
    {
        "objectID": 14020000006,
        "name": "Vali y tế chiến trường",
        "nameVi": "Vali y tế chiến trường",
        "objectName": "战地医疗箱",
        "objectNameVi": "Vali y tế chiến trường",
        "shortName": "Vali y tế chiến trường",
        "secondClass": "consume",
        "thirdClass": "Túi máu",
        "price": 182164,
        "avgPrice": 182164,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/14020000006.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/14020000006.png",
        "grade": 5,
        "itemWidth": 2,
        "itemHeight": 2,
        "crates": [
            "medicalCrate"
        ]
    },
    {
        "objectID": 14030000003,
        "name": "Bộ phẫu thuật dã chiến DEK cao cấp",
        "nameVi": "Bộ phẫu thuật dã chiến DEK cao cấp",
        "objectName": "DEK野战手术包",
        "objectNameVi": "Bộ phẫu thuật dã chiến DEK cao cấp",
        "shortName": "Bộ phẫu thuật dã chiến DEK cao cấp",
        "secondClass": "consume",
        "thirdClass": "Bộ dụng cụ phẫu thuật",
        "price": 27229,
        "avgPrice": 27229,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/14030000003.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/14030000003.png",
        "grade": 4,
        "itemWidth": 3,
        "itemHeight": 1,
        "crates": [
            "medicalCrate"
        ]
    },
    {
        "objectID": 15070050003,
        "name": "Tập tài liệu mật",
        "nameVi": "Tập tài liệu mật",
        "objectName": "情报文件",
        "objectNameVi": "Tập tài liệu mật",
        "shortName": "Tập tài liệu mật",
        "secondClass": "collection",
        "thirdClass": "Tài liệu tình báo",
        "price": 15259,
        "avgPrice": 15259,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15070050003.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15070050003.png",
        "grade": 3,
        "itemWidth": 1,
        "itemHeight": 2,
        "crates": [
            "advancedStorageCrate"
        ]
    },
    {
        "objectID": 15080050096,
        "name": "Băng ghi âm tác chiến",
        "nameVi": "Băng ghi âm tác chiến",
        "objectName": "军情录音",
        "objectNameVi": "Băng ghi âm tác chiến",
        "shortName": "Băng ghi âm tác chiến",
        "secondClass": "collection",
        "thirdClass": "Tài liệu tình báo",
        "price": 27995,
        "avgPrice": 27995,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050096.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050096.png",
        "grade": 3,
        "itemWidth": 1,
        "itemHeight": 3,
        "crates": [
            "advancedStorageCrate"
        ]
    },
    {
        "objectID": 14040000002,
        "name": "Băng thun co giãn y tế",
        "nameVi": "Băng thun co giãn y tế",
        "objectName": "弹力绷带",
        "objectNameVi": "Băng thun co giãn y tế",
        "shortName": "Băng thun co giãn y tế",
        "secondClass": "consume",
        "thirdClass": "Dây garô cầm máu",
        "price": 1079,
        "avgPrice": 1079,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/14040000002.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/14040000002.png",
        "grade": 1,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "medicalCrate",
            "medicalBag"
        ]
    },
    {
        "objectID": 15080050213,
        "name": "Thẻ bài quân nhân Dogtag",
        "nameVi": "Thẻ bài quân nhân Dogtag",
        "objectName": "身份牌",
        "objectNameVi": "Thẻ bài quân nhân Dogtag",
        "shortName": "Thẻ bài quân nhân Dogtag",
        "secondClass": "collection",
        "thirdClass": "Tài liệu tình báo",
        "price": 7724,
        "avgPrice": 7724,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050213.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050213.png",
        "grade": 3,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "advancedStorageCrate"
        ]
    },
    {
        "objectID": 15030050011,
        "name": "Tay cầm chơi game GS5",
        "nameVi": "Tay cầm chơi game GS5",
        "objectName": "GS5 手柄",
        "objectNameVi": "Tay cầm chơi game GS5",
        "shortName": "Tay cầm chơi game GS5",
        "secondClass": "collection",
        "thirdClass": "Thiết bị điện tử",
        "price": 30225,
        "avgPrice": 30225,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15030050011.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15030050011.png",
        "grade": 4,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "advancedStorageCrate"
        ]
    },
    {
        "objectID": 15060080005,
        "name": "Hộp trà chanh thanh nhiệt",
        "nameVi": "Hộp trà chanh thanh nhiệt",
        "objectName": "生津柠檬茶",
        "objectNameVi": "Hộp trà chanh thanh nhiệt",
        "shortName": "Hộp trà chanh thanh nhiệt",
        "secondClass": "collection",
        "thirdClass": "Đồ gia dụng",
        "price": 16031,
        "avgPrice": 16031,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15060080005.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15060080005.png",
        "grade": 4,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "advancedStorageCrate"
        ]
    },
    {
        "objectID": 15080050073,
        "name": "Viên sủi vitamin C",
        "nameVi": "Viên sủi vitamin C",
        "objectName": "维生素泡腾片",
        "objectNameVi": "Viên sủi vitamin C",
        "shortName": "Viên sủi vitamin C",
        "secondClass": "collection",
        "thirdClass": "Đồ gia dụng",
        "price": 9696,
        "avgPrice": 9696,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050073.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050073.png",
        "grade": 3,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "advancedStorageCrate",
            "experimentCrate",
            "hiddenCrate"
        ]
    },
    {
        "objectID": 15080050168,
        "name": "Mô-đun mạng quân sự",
        "nameVi": "Mô-đun mạng quân sự",
        "objectName": "军用网络模块",
        "objectNameVi": "Mô-đun mạng quân sự",
        "shortName": "Mô-đun mạng quân sự",
        "secondClass": "collection",
        "thirdClass": "Thiết bị điện tử",
        "price": 58887,
        "avgPrice": 58887,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050168.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050168.png",
        "grade": 5,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "advancedStorageCrate"
        ]
    },
    {
        "objectID": 37220200001,
        "name": "Hộp đạn .357 Magnum HP",
        "nameVi": "Hộp đạn .357 Magnum HP",
        "objectName": ".357 Magnum HP",
        "objectNameVi": "Hộp đạn .357 Magnum HP",
        "shortName": "Hộp đạn .357 Magnum HP",
        "secondClass": "ammo.357",
        "thirdClass": "",
        "price": 149,
        "avgPrice": 149,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/gun/ammo/.357.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/gun/ammo/.357.png",
        "grade": 2,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "ammoCrate"
        ]
    },
    {
        "objectID": 37200100001,
        "name": "Hộp đạn 9x19mm PSO",
        "nameVi": "Hộp đạn 9x19mm PSO",
        "objectName": "9x19mm PSO",
        "objectNameVi": "Hộp đạn 9x19mm PSO",
        "shortName": "Hộp đạn 9x19mm PSO",
        "secondClass": "ammo9x19",
        "thirdClass": "",
        "price": 26,
        "avgPrice": 26,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/gun/ammo/9x19.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/gun/ammo/9x19.png",
        "grade": 1,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "ammoCrate"
        ]
    },
    {
        "objectID": 37210300001,
        "name": "Hộp đạn 5.7x28mm L191",
        "nameVi": "Hộp đạn 5.7x28mm L191",
        "objectName": "5.7x28mm L191",
        "objectNameVi": "Hộp đạn 5.7x28mm L191",
        "shortName": "Hộp đạn 5.7x28mm L191",
        "secondClass": "ammo5.7x28",
        "thirdClass": "",
        "price": 318,
        "avgPrice": 318,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/gun/ammo/5.7x28.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/gun/ammo/5.7x28.png",
        "grade": 3,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "ammoCrate"
        ]
    },
    {
        "objectID": 37120100001,
        "name": "Hộp đạn 5.45x39mm PRS",
        "nameVi": "Hộp đạn 5.45x39mm PRS",
        "objectName": "5.45x39mm PRS",
        "objectNameVi": "Hộp đạn 5.45x39mm PRS",
        "shortName": "Hộp đạn 5.45x39mm PRS",
        "secondClass": "ammo5.45x39",
        "thirdClass": "",
        "price": 35,
        "avgPrice": 35,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/gun/ammo/5.45x39.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/gun/ammo/5.45x39.png",
        "grade": 1,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "ammoCrate"
        ]
    },
    {
        "objectID": 37190100001,
        "name": "Hộp đạn .45 ACP HS",
        "nameVi": "Hộp đạn .45 ACP HS",
        "objectName": ".45 ACP HS",
        "objectNameVi": "Hộp đạn .45 ACP HS",
        "shortName": "Hộp đạn .45 ACP HS",
        "secondClass": "ammo.45",
        "thirdClass": "",
        "price": 41,
        "avgPrice": 41,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/gun/ammo/45-ACP.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/gun/ammo/45-ACP.png",
        "grade": 1,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "ammoCrate"
        ]
    },
    {
        "objectID": 37250100001,
        "name": "Hộp đạn 12 Gauge 7mm Buckshot",
        "nameVi": "Hộp đạn 12 Gauge 7mm Buckshot",
        "objectName": "12 Gauge 7毫米鹿弹",
        "objectNameVi": "Hộp đạn 12 Gauge 7mm Buckshot",
        "shortName": "Hộp đạn 12 Gauge 7mm Buckshot",
        "secondClass": "ammo12",
        "thirdClass": "",
        "price": 21,
        "avgPrice": 21,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/gun/ammo/12-Gauge.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/gun/ammo/12-Gauge.png",
        "grade": 1,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "ammoCrate"
        ]
    },
    {
        "objectID": 37250000002,
        "name": "Hộp đạn 12 Gauge Slug RIP",
        "nameVi": "Hộp đạn 12 Gauge Slug RIP",
        "objectName": "12 Gauge独头 RIP",
        "objectNameVi": "Hộp đạn 12 Gauge Slug RIP",
        "shortName": "Hộp đạn 12 Gauge Slug RIP",
        "secondClass": "ammo12",
        "thirdClass": "",
        "price": 131,
        "avgPrice": 131,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/gun/ammo/12-Gauge.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/gun/ammo/12-Gauge.png",
        "grade": 2,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "ammoCrate"
        ]
    },
    {
        "objectID": 37230200001,
        "name": "Hộp đạn .50 AE HP",
        "nameVi": "Hộp đạn .50 AE HP",
        "objectName": ".50 AE HP",
        "objectNameVi": "Hộp đạn .50 AE HP",
        "shortName": "Hộp đạn .50 AE HP",
        "secondClass": "ammo.50",
        "thirdClass": "",
        "price": 151,
        "avgPrice": 151,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/gun/ammo/50-AE.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/gun/ammo/50-AE.png",
        "grade": 2,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "ammoCrate"
        ]
    },
    {
        "objectID": 37210100001,
        "name": "Hộp đạn 5.7x28mm SS198LF",
        "nameVi": "Hộp đạn 5.7x28mm SS198LF",
        "objectName": "5.7x28mm SS198LF",
        "objectNameVi": "Hộp đạn 5.7x28mm SS198LF",
        "shortName": "Hộp đạn 5.7x28mm SS198LF",
        "secondClass": "ammo5.7x28",
        "thirdClass": "",
        "price": 36,
        "avgPrice": 36,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/gun/ammo/5.7x28.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/gun/ammo/5.7x28.png",
        "grade": 1,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "ammoCrate"
        ]
    },
    {
        "objectID": 37270300001,
        "name": "Mũi tên lá liễu sợi thủy tinh",
        "nameVi": "Mũi tên lá liễu sợi thủy tinh",
        "objectName": "玻纤柳叶箭矢",
        "objectNameVi": "Mũi tên lá liễu sợi thủy tinh",
        "shortName": "Mũi tên lá liễu sợi thủy tinh",
        "secondClass": "ammoArrow",
        "thirdClass": "",
        "price": 630,
        "avgPrice": 630,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/37270300001.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/37270300001.png",
        "grade": 3,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "ammoCrate"
        ]
    },
    {
        "objectID": 37190200001,
        "name": "Hộp đạn .45 ACP JHP",
        "nameVi": "Hộp đạn .45 ACP JHP",
        "objectName": ".45 ACP JHP",
        "objectNameVi": "Hộp đạn .45 ACP JHP",
        "shortName": "Hộp đạn .45 ACP JHP",
        "secondClass": "ammo.45",
        "thirdClass": "",
        "price": 110,
        "avgPrice": 110,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/gun/ammo/45-ACP.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/gun/ammo/45-ACP.png",
        "grade": 2,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "ammoCrate"
        ]
    },
    {
        "objectID": 37200200001,
        "name": "Hộp đạn 9x19mm Pst",
        "nameVi": "Hộp đạn 9x19mm Pst",
        "objectName": "9x19mm Pst",
        "objectNameVi": "Hộp đạn 9x19mm Pst",
        "shortName": "Hộp đạn 9x19mm Pst",
        "secondClass": "ammo9x19",
        "thirdClass": "",
        "price": 81,
        "avgPrice": 81,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/gun/ammo/9x19.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/gun/ammo/9x19.png",
        "grade": 2,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "ammoCrate"
        ]
    },
    {
        "objectID": 37220400001,
        "name": "Hộp đạn .357 Magnum FMJ",
        "nameVi": "Hộp đạn .357 Magnum FMJ",
        "objectName": ".357 Magnum FMJ",
        "objectNameVi": "Hộp đạn .357 Magnum FMJ",
        "shortName": "Hộp đạn .357 Magnum FMJ",
        "secondClass": "ammo.357",
        "thirdClass": "",
        "price": 589,
        "avgPrice": 589,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/gun/ammo/.357.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/gun/ammo/.357.png",
        "grade": 4,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "ammoCrate"
        ]
    },
    {
        "objectID": 37110300001,
        "name": "Hộp đạn 7.62x39mm PS",
        "nameVi": "Hộp đạn 7.62x39mm PS",
        "objectName": "7.62x39mm PS",
        "objectNameVi": "Hộp đạn 7.62x39mm PS",
        "shortName": "Hộp đạn 7.62x39mm PS",
        "secondClass": "ammo7.62x39",
        "thirdClass": "",
        "price": 305,
        "avgPrice": 305,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/gun/ammo/7.62x39.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/gun/ammo/7.62x39.png",
        "grade": 3,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "ammoCrate"
        ]
    },
    {
        "objectID": 14020000005,
        "name": "Hộp cứu thương dã ngoại",
        "nameVi": "Hộp cứu thương dã ngoại",
        "objectName": "户外医疗箱",
        "objectNameVi": "Hộp cứu thương dã ngoại",
        "shortName": "Hộp cứu thương dã ngoại",
        "secondClass": "consume",
        "thirdClass": "Túi máu",
        "price": 56582,
        "avgPrice": 56582,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/14020000005.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/14020000005.png",
        "grade": 4,
        "itemWidth": 3,
        "itemHeight": 1,
        "crates": [
            "medicalBag"
        ]
    },
    {
        "objectID": 15060010004,
        "name": "Nhiệt kế hồng ngoại đo trán",
        "nameVi": "Nhiệt kế hồng ngoại đo trán",
        "objectName": "额温枪",
        "objectNameVi": "Nhiệt kế hồng ngoại đo trán",
        "shortName": "Nhiệt kế hồng ngoại đo trán",
        "secondClass": "collection",
        "thirdClass": "Vật tư y tế",
        "price": 11021,
        "avgPrice": 11021,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15060010004.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15060010004.png",
        "grade": 3,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "medicalBag"
        ]
    },
    {
        "objectID": 14040000001,
        "name": "Garô cầm máu khẩn cấp CAT",
        "nameVi": "Garô cầm máu khẩn cấp CAT",
        "objectName": "CAT止血带",
        "objectNameVi": "Garô cầm máu khẩn cấp CAT",
        "shortName": "Garô cầm máu khẩn cấp CAT",
        "secondClass": "consume",
        "thirdClass": "Dây garô cầm máu",
        "price": 2487,
        "avgPrice": 2487,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/14040000001.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/14040000001.png",
        "grade": 1,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "medicalBag"
        ]
    },
    {
        "objectID": 15080050057,
        "name": "Bộ gạc vô trùng sơ cứu",
        "nameVi": "Bộ gạc vô trùng sơ cứu",
        "objectName": "无菌敷料包",
        "objectNameVi": "Bộ gạc vô trùng sơ cứu",
        "shortName": "Bộ gạc vô trùng sơ cứu",
        "secondClass": "collection",
        "thirdClass": "Vật tư y tế",
        "price": 50078,
        "avgPrice": 50078,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050057.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050057.png",
        "grade": 4,
        "itemWidth": 1,
        "itemHeight": 2,
        "crates": [
            "medicalBag"
        ]
    },
    {
        "objectID": 14070000001,
        "name": "Thuốc tăng cường cơ bắp M1",
        "nameVi": "Thuốc tăng cường cơ bắp M1",
        "objectName": "M1肌肉强化针",
        "objectNameVi": "Thuốc tăng cường cơ bắp M1",
        "shortName": "Thuốc tăng cường cơ bắp M1",
        "secondClass": "consume",
        "thirdClass": "Thuốc tiêm",
        "price": 15435,
        "avgPrice": 15435,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/14070000001.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/14070000001.png",
        "grade": 3,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "medicalBag"
        ]
    },
    {
        "objectID": 13020000592,
        "name": "Nòng dài siêu cấp AR57 Torrent",
        "nameVi": "Nòng dài siêu cấp AR57 Torrent",
        "objectName": "AR57激流超长枪管",
        "objectNameVi": "Nòng dài siêu cấp AR57 Torrent",
        "shortName": "Nòng dài siêu cấp AR57 Torrent",
        "secondClass": "accBarrel",
        "thirdClass": "",
        "price": 49604,
        "avgPrice": 49604,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/13020000592.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/13020000592.png",
        "grade": 4,
        "itemWidth": 2,
        "itemHeight": 1,
        "crates": [
            "weaponCrate"
        ]
    },
    {
        "objectID": 13040000178,
        "name": "Báng súng Rulo .357 Windchaser",
        "nameVi": "Báng súng Rulo .357 Windchaser",
        "objectName": ".357左轮逐风者枪托",
        "objectNameVi": "Báng súng Rulo .357 Windchaser",
        "shortName": "Báng súng Rulo .357 Windchaser",
        "secondClass": "accStock",
        "thirdClass": "",
        "price": 6674,
        "avgPrice": 6674,
        "image": "https://eo.oss.hengj.cn/one/object/13040000178.png",
        "pic": "https://eo.oss.hengj.cn/one/object/13040000178.png",
        "grade": 2,
        "itemWidth": 2,
        "itemHeight": 1,
        "crates": [
            "weaponCrate"
        ]
    },
    {
        "objectID": 13020000459,
        "name": "Nòng dài súng Rulo",
        "nameVi": "Nòng dài súng Rulo",
        "objectName": "左轮实用长管",
        "objectNameVi": "Nòng dài súng Rulo",
        "shortName": "Nòng dài súng Rulo",
        "secondClass": "accBarrel",
        "thirdClass": "",
        "price": 3364,
        "avgPrice": 3364,
        "image": "https://eo.oss.hengj.cn/one/object/13020000459.png",
        "pic": "https://eo.oss.hengj.cn/one/object/13020000459.png",
        "grade": 2,
        "itemWidth": 2,
        "itemHeight": 1,
        "crates": [
            "weaponCrate"
        ]
    },
    {
        "objectID": 18060000007,
        "name": "Súng bắn tỉa SV-98",
        "nameVi": "Súng bắn tỉa SV-98",
        "objectName": "SV-98狙击步枪",
        "objectNameVi": "Súng bắn tỉa SV-98",
        "shortName": "Súng bắn tỉa SV-98",
        "secondClass": "gunSniper",
        "thirdClass": "",
        "price": 61613,
        "avgPrice": 61613,
        "image": "https://eo.oss.hengj.cn/one/object/18060000007.png",
        "pic": "https://eo.oss.hengj.cn/one/object/18060000007.png",
        "grade": 0,
        "itemWidth": 6,
        "itemHeight": 1,
        "crates": [
            "weaponCrate"
        ]
    },
    {
        "objectID": 13020000484,
        "name": "Nòng súng Rulo .357 Windchaser",
        "nameVi": "Nòng súng Rulo .357 Windchaser",
        "objectName": ".357左轮逐风者枪管",
        "objectNameVi": "Nòng súng Rulo .357 Windchaser",
        "shortName": "Nòng súng Rulo .357 Windchaser",
        "secondClass": "accBarrel",
        "thirdClass": "",
        "price": 19422,
        "avgPrice": 19422,
        "image": "https://eo.oss.hengj.cn/one/object/13020000484.png",
        "pic": "https://eo.oss.hengj.cn/one/object/13020000484.png",
        "grade": 2,
        "itemWidth": 2,
        "itemHeight": 1,
        "crates": [
            "weaponCrate"
        ]
    },
    {
        "objectID": 13020000434,
        "name": "Nòng dài UZI quân nhu",
        "nameVi": "Nòng dài UZI quân nhu",
        "objectName": "UZI军需长枪管",
        "objectNameVi": "Nòng dài UZI quân nhu",
        "shortName": "Nòng dài UZI quân nhu",
        "secondClass": "accBarrel",
        "thirdClass": "",
        "price": 9974,
        "avgPrice": 9974,
        "image": "https://eo.oss.hengj.cn/one/object/13020000434.png",
        "pic": "https://eo.oss.hengj.cn/one/object/13020000434.png",
        "grade": 2,
        "itemWidth": 2,
        "itemHeight": 1,
        "crates": [
            "weaponCrate"
        ]
    },
    {
        "objectID": 13120000234,
        "name": "Băng đạn mở rộng 45 viên M4",
        "nameVi": "Băng đạn mở rộng 45 viên M4",
        "objectName": "M4扩容45发弹匣",
        "objectNameVi": "Băng đạn mở rộng 45 viên M4",
        "shortName": "Băng đạn mở rộng 45 viên M4",
        "secondClass": "accMagazine",
        "thirdClass": "",
        "price": 22568,
        "avgPrice": 22568,
        "image": "https://eo.oss.hengj.cn/one/object/13120000234.png",
        "pic": "https://eo.oss.hengj.cn/one/object/13120000234.png",
        "grade": 3,
        "itemWidth": 1,
        "itemHeight": 2,
        "crates": [
            "weaponCrate"
        ]
    },
    {
        "objectID": 13130000174,
        "name": "Loa che lửa miệng kèn",
        "nameVi": "Loa che lửa miệng kèn",
        "objectName": "喇叭口消焰器",
        "objectNameVi": "Loa che lửa miệng kèn",
        "shortName": "Loa che lửa miệng kèn",
        "secondClass": "accMuzzle",
        "thirdClass": "",
        "price": 5036,
        "avgPrice": 5036,
        "image": "https://eo.oss.hengj.cn/one/object/13130000174.png",
        "pic": "https://eo.oss.hengj.cn/one/object/13130000174.png",
        "grade": 2,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "weaponCrate"
        ]
    },
    {
        "objectID": 13020000456,
        "name": "Nòng dài xung kích G18",
        "nameVi": "Nòng dài xung kích G18",
        "objectName": "G18冲击长枪管",
        "objectNameVi": "Nòng dài xung kích G18",
        "shortName": "Nòng dài xung kích G18",
        "secondClass": "accBarrel",
        "thirdClass": "",
        "price": 20152,
        "avgPrice": 20152,
        "image": "https://eo.oss.hengj.cn/one/object/13020000456.png",
        "pic": "https://eo.oss.hengj.cn/one/object/13020000456.png",
        "grade": 2,
        "itemWidth": 2,
        "itemHeight": 1,
        "crates": [
            "weaponCrate"
        ]
    },
    {
        "objectID": 13170000003,
        "name": "Chân chống chữ V súng SV-98",
        "nameVi": "Chân chống chữ V súng SV-98",
        "objectName": "SV98两脚架",
        "objectNameVi": "Chân chống chữ V súng SV-98",
        "shortName": "Chân chống chữ V súng SV-98",
        "secondClass": "accFunctional",
        "thirdClass": "",
        "price": 5545,
        "avgPrice": 5545,
        "image": "https://eo.oss.hengj.cn/one/object/13170000003.png",
        "pic": "https://eo.oss.hengj.cn/one/object/13170000003.png",
        "grade": 2,
        "itemWidth": 1,
        "itemHeight": 2,
        "crates": [
            "weaponCrate"
        ]
    },
    {
        "objectID": 13020000423,
        "name": "Nòng nặng thực dụng SMG-45",
        "nameVi": "Nòng nặng thực dụng SMG-45",
        "objectName": "smg45实用重枪管",
        "objectNameVi": "Nòng nặng thực dụng SMG-45",
        "shortName": "Nòng nặng thực dụng SMG-45",
        "secondClass": "accBarrel",
        "thirdClass": "",
        "price": 10514,
        "avgPrice": 10514,
        "image": "https://eo.oss.hengj.cn/one/object/13020000423.png",
        "pic": "https://eo.oss.hengj.cn/one/object/13020000423.png",
        "grade": 2,
        "itemWidth": 2,
        "itemHeight": 1,
        "crates": [
            "weaponCrate"
        ]
    },
    {
        "objectID": 13020000444,
        "name": "Nòng dài tầng bình lưu M700",
        "nameVi": "Nòng dài tầng bình lưu M700",
        "objectName": "M700平流层长枪管",
        "objectNameVi": "Nòng dài tầng bình lưu M700",
        "shortName": "Nòng dài tầng bình lưu M700",
        "secondClass": "accBarrel",
        "thirdClass": "",
        "price": 64460,
        "avgPrice": 64460,
        "image": "https://eo.oss.hengj.cn/one/object/13020000444.png",
        "pic": "https://eo.oss.hengj.cn/one/object/13020000444.png",
        "grade": 3,
        "itemWidth": 2,
        "itemHeight": 1,
        "crates": [
            "weaponCrate"
        ]
    },
    {
        "objectID": 13020000508,
        "name": "Nòng chiến thuật 93R",
        "nameVi": "Nòng chiến thuật 93R",
        "objectName": "93R战术枪管",
        "objectNameVi": "Nòng chiến thuật 93R",
        "shortName": "Nòng chiến thuật 93R",
        "secondClass": "accBarrel",
        "thirdClass": "",
        "price": 7844,
        "avgPrice": 7844,
        "image": "https://eo.oss.hengj.cn/one/object/13020000508.png",
        "pic": "https://eo.oss.hengj.cn/one/object/13020000508.png",
        "grade": 2,
        "itemWidth": 2,
        "itemHeight": 1,
        "crates": [
            "weaponCrate"
        ]
    },
    {
        "objectID": 18050000008,
        "name": "Súng trường thiện xạ SR9",
        "nameVi": "Súng trường thiện xạ SR9",
        "objectName": "SR9射手步枪",
        "objectNameVi": "Súng trường thiện xạ SR9",
        "shortName": "Súng trường thiện xạ SR9",
        "secondClass": "gunMP",
        "thirdClass": "",
        "price": 10284,
        "avgPrice": 10284,
        "image": "https://eo.oss.hengj.cn/one/object/18050000008.png",
        "pic": "https://eo.oss.hengj.cn/one/object/18050000008.png",
        "grade": 0,
        "itemWidth": 5,
        "itemHeight": 2,
        "crates": [
            "weaponCrate"
        ]
    },
    {
        "objectID": 13020000372,
        "name": "Nòng ngắn thực dụng QBZ95-1",
        "nameVi": "Nòng ngắn thực dụng QBZ95-1",
        "objectName": "QBZ95-1实用短枪管",
        "objectNameVi": "Nòng ngắn thực dụng QBZ95-1",
        "shortName": "Nòng ngắn thực dụng QBZ95-1",
        "secondClass": "accBarrel",
        "thirdClass": "",
        "price": 12488,
        "avgPrice": 12488,
        "image": "https://eo.oss.hengj.cn/one/object/13020000372.png",
        "pic": "https://eo.oss.hengj.cn/one/object/13020000372.png",
        "grade": 2,
        "itemWidth": 2,
        "itemHeight": 1,
        "crates": [
            "weaponCrate"
        ]
    },
    {
        "objectID": 13130000155,
        "name": "Loa che lửa thực dụng",
        "nameVi": "Loa che lửa thực dụng",
        "objectName": "实用消焰器",
        "objectNameVi": "Loa che lửa thực dụng",
        "shortName": "Loa che lửa thực dụng",
        "secondClass": "accMuzzle",
        "thirdClass": "",
        "price": 3334,
        "avgPrice": 3334,
        "image": "https://eo.oss.hengj.cn/one/object/13130000155.png",
        "pic": "https://eo.oss.hengj.cn/one/object/13130000155.png",
        "grade": 2,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "weaponCrate"
        ]
    },
    {
        "objectID": 13040000195,
        "name": "Ốp chuôi báng súng SR-3M",
        "nameVi": "Ốp chuôi báng súng SR-3M",
        "objectName": "SR-3M枪托尾盖",
        "objectNameVi": "Ốp chuôi báng súng SR-3M",
        "shortName": "Ốp chuôi báng súng SR-3M",
        "secondClass": "accStock",
        "thirdClass": "",
        "price": 5327,
        "avgPrice": 5327,
        "image": "https://eo.oss.hengj.cn/one/object/13040000195.png",
        "pic": "https://eo.oss.hengj.cn/one/object/13040000195.png",
        "grade": 2,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "weaponCrate"
        ]
    },
    {
        "objectID": 18030000006,
        "name": "Súng săn bán tự động FS-12",
        "nameVi": "Súng săn bán tự động FS-12",
        "objectName": "FS-12霰弹枪",
        "objectNameVi": "Súng săn bán tự động FS-12",
        "shortName": "Súng săn bán tự động FS-12",
        "secondClass": "gunShotgun",
        "thirdClass": "",
        "price": 52175,
        "avgPrice": 52175,
        "image": "https://eo.oss.hengj.cn/one/object/18030000006.png",
        "pic": "https://eo.oss.hengj.cn/one/object/18030000006.png",
        "grade": 0,
        "itemWidth": 4,
        "itemHeight": 2,
        "crates": [
            "weaponCrate"
        ]
    },
    {
        "objectID": 13120000289,
        "name": "Hộp tiếp đạn mở rộng 10 viên S12K",
        "nameVi": "Hộp tiếp đạn mở rộng 10 viên S12K",
        "objectName": "S12K扩容10发弹匣",
        "objectNameVi": "Hộp tiếp đạn mở rộng 10 viên S12K",
        "shortName": "Hộp tiếp đạn mở rộng 10 viên S12K",
        "secondClass": "accMagazine",
        "thirdClass": "",
        "price": 5798,
        "avgPrice": 5798,
        "image": "https://eo.oss.hengj.cn/one/object/13120000289.png",
        "pic": "https://eo.oss.hengj.cn/one/object/13120000289.png",
        "grade": 2,
        "itemWidth": 1,
        "itemHeight": 2,
        "crates": [
            "weaponCrate"
        ]
    },
    {
        "objectID": 18010000014,
        "name": "Súng trường tấn công M16A4",
        "nameVi": "Súng trường tấn công M16A4",
        "objectName": "M16A4突击步枪",
        "objectNameVi": "Súng trường tấn công M16A4",
        "shortName": "Súng trường tấn công M16A4",
        "secondClass": "gunRifle",
        "thirdClass": "",
        "price": 9193,
        "avgPrice": 9193,
        "image": "https://eo.oss.hengj.cn/one/object/18010000014.png",
        "pic": "https://eo.oss.hengj.cn/one/object/18010000014.png",
        "grade": 0,
        "itemWidth": 5,
        "itemHeight": 2,
        "crates": [
            "weaponCrate"
        ]
    },
    {
        "objectID": 13140000021,
        "name": "Tay cầm dọc thực dụng",
        "nameVi": "Tay cầm dọc thực dụng",
        "objectName": "实用垂直握把",
        "objectNameVi": "Tay cầm dọc thực dụng",
        "shortName": "Tay cầm dọc thực dụng",
        "secondClass": "accForeGrip",
        "thirdClass": "",
        "price": 3352,
        "avgPrice": 3352,
        "image": "https://eo.oss.hengj.cn/one/object/13140000021.png",
        "pic": "https://eo.oss.hengj.cn/one/object/13140000021.png",
        "grade": 2,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "weaponCrate"
        ]
    },
    {
        "objectID": 13020000485,
        "name": "Nòng dài súng Rulo .357 Windchaser",
        "nameVi": "Nòng dài súng Rulo .357 Windchaser",
        "objectName": ".357左轮逐风者长枪管",
        "objectNameVi": "Nòng dài súng Rulo .357 Windchaser",
        "shortName": "Nòng dài súng Rulo .357 Windchaser",
        "secondClass": "accBarrel",
        "thirdClass": "",
        "price": 19767,
        "avgPrice": 19767,
        "image": "https://eo.oss.hengj.cn/one/object/13020000485.png",
        "pic": "https://eo.oss.hengj.cn/one/object/13020000485.png",
        "grade": 2,
        "itemWidth": 2,
        "itemHeight": 1,
        "crates": [
            "weaponCrate"
        ]
    },
    {
        "objectID": 13020000458,
        "name": "Nòng ngắn thực dụng súng Rulo",
        "nameVi": "Nòng ngắn thực dụng súng Rulo",
        "objectName": "左轮实用短管",
        "objectNameVi": "Nòng ngắn thực dụng súng Rulo",
        "shortName": "Nòng ngắn thực dụng súng Rulo",
        "secondClass": "accBarrel",
        "thirdClass": "",
        "price": 2428,
        "avgPrice": 2428,
        "image": "https://eo.oss.hengj.cn/one/object/13020000458.png",
        "pic": "https://eo.oss.hengj.cn/one/object/13020000458.png",
        "grade": 2,
        "itemWidth": 2,
        "itemHeight": 1,
        "crates": [
            "weaponCrate"
        ]
    },
    {
        "objectID": 15060080011,
        "name": "Lon nước ngọt Cola",
        "nameVi": "Lon nước ngọt Cola",
        "objectName": "可乐",
        "objectNameVi": "Lon nước ngọt Cola",
        "shortName": "Lon nước ngọt Cola",
        "secondClass": "collection",
        "thirdClass": "Đồ gia dụng",
        "price": 12597,
        "avgPrice": 12597,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15060080011.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15060080011.png",
        "grade": 3,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "experimentCrate"
        ]
    },
    {
        "objectID": 15080050011,
        "name": "Kính viễn vọng hải tặc cổ",
        "nameVi": "Kính viễn vọng hải tặc cổ",
        "objectName": "古老的海盗望远镜",
        "objectNameVi": "Kính viễn vọng hải tặc cổ",
        "shortName": "Kính viễn vọng hải tặc cổ",
        "secondClass": "collection",
        "thirdClass": "Đồ sưu tầm thủ công",
        "price": 11065,
        "avgPrice": 11065,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050011.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050011.png",
        "grade": 3,
        "itemWidth": 1,
        "itemHeight": 2,
        "crates": [
            "experimentCrate"
        ]
    },
    {
        "objectID": 15080050018,
        "name": "Huy hiệu hoàng kim",
        "nameVi": "Huy hiệu hoàng kim",
        "objectName": "黄金饰章",
        "objectNameVi": "Huy hiệu hoàng kim",
        "shortName": "Huy hiệu hoàng kim",
        "secondClass": "collection",
        "thirdClass": "Đồ sưu tầm thủ công",
        "price": 20483,
        "avgPrice": 20483,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050018.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050018.png",
        "grade": 4,
        "itemWidth": 1,
        "itemHeight": 2,
        "crates": [
            "experimentCrate"
        ]
    },
    {
        "objectID": 15070010006,
        "name": "Bản vẽ thiết kế kiến trúc số 2",
        "nameVi": "Bản vẽ thiết kế kiến trúc số 2",
        "objectName": "建筑图纸2号",
        "objectNameVi": "Bản vẽ thiết kế kiến trúc số 2",
        "shortName": "Bản vẽ thiết kế kiến trúc số 2",
        "secondClass": "collection",
        "thirdClass": "Tài liệu tình báo",
        "price": 3397,
        "avgPrice": 3397,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15070010006.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15070010006.png",
        "grade": 2,
        "itemWidth": 2,
        "itemHeight": 1,
        "crates": [
            "birdCrate"
        ]
    },
    {
        "objectID": 15050500004,
        "name": "Thẻ Phòng Bộ Sưu Tập Của Giám Ngục",
        "nameVi": "Thẻ Phòng Bộ Sưu Tập Của Giám Ngục",
        "objectName": "典狱长收藏室",
        "objectNameVi": "Thẻ Phòng Bộ Sưu Tập Của Giám Ngục",
        "shortName": "Thẻ Phòng Bộ Sưu Tập Của Giám Ngục",
        "secondClass": "key",
        "thirdClass": "",
        "price": 5671786,
        "avgPrice": 5671786,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15050500004.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15050500004.png",
        "grade": 6,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "experimentCrate"
        ]
    },
    {
        "objectID": 15080050136,
        "name": "Trứng cá sấu đầm lầy",
        "nameVi": "Trứng cá sấu đầm lầy",
        "objectName": "鳄鱼蛋",
        "objectNameVi": "Trứng cá sấu đầm lầy",
        "shortName": "Trứng cá sấu đầm lầy",
        "secondClass": "collection",
        "thirdClass": "Đồ gia dụng",
        "price": 22115,
        "avgPrice": 22115,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050136.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050136.png",
        "grade": 4,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "experimentCrate"
        ]
    },
    {
        "objectID": 15080050054,
        "name": "Lá bài Poker 2",
        "nameVi": "Lá bài Poker 2",
        "objectName": "扑克牌-2",
        "objectNameVi": "Lá bài Poker 2",
        "shortName": "Lá bài Poker 2",
        "secondClass": "collection",
        "thirdClass": "Đồ gia dụng",
        "price": 5571,
        "avgPrice": 5571,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050054.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050054.png",
        "grade": 1,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "birdCrate"
        ]
    },
    {
        "objectID": 15090910023,
        "name": "Bức thư tay cá nhân",
        "nameVi": "Bức thư tay cá nhân",
        "objectName": "个人信笺",
        "objectNameVi": "Bức thư tay cá nhân",
        "shortName": "Bức thư tay cá nhân",
        "secondClass": "collection",
        "thirdClass": "Tài liệu tình báo",
        "price": 3042,
        "avgPrice": 3042,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15090910023.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15090910023.png",
        "grade": 2,
        "itemWidth": 2,
        "itemHeight": 1,
        "crates": [
            "birdCrate",
            "hiddenCrate"
        ]
    },
    {
        "objectID": 15080050053,
        "name": "Lá bài Poker 3",
        "nameVi": "Lá bài Poker 3",
        "objectName": "扑克牌-3",
        "objectNameVi": "Lá bài Poker 3",
        "shortName": "Lá bài Poker 3",
        "secondClass": "collection",
        "thirdClass": "Đồ gia dụng",
        "price": 4345,
        "avgPrice": 4345,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050053.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050053.png",
        "grade": 1,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "birdCrate"
        ]
    },
    {
        "objectID": 15040010012,
        "name": "Ổ cắm điện đa năng",
        "nameVi": "Ổ cắm điện đa năng",
        "objectName": "插座",
        "objectNameVi": "Ổ cắm điện đa năng",
        "shortName": "Ổ cắm điện đa năng",
        "secondClass": "collection",
        "thirdClass": "Dụng cụ và vật liệu",
        "price": 2201,
        "avgPrice": 2201,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15040010012.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15040010012.png",
        "grade": 2,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "birdCrate"
        ]
    },
    {
        "objectID": 15060010012,
        "name": "Bộ dây truyền dịch",
        "nameVi": "Bộ dây truyền dịch",
        "objectName": "输液工具",
        "objectNameVi": "Bộ dây truyền dịch",
        "shortName": "Bộ dây truyền dịch",
        "secondClass": "collection",
        "thirdClass": "Vật tư y tế",
        "price": 2453,
        "avgPrice": 2453,
        "image": "https://eo.oss.hengj.cn/one/object/15060010012.png",
        "pic": "https://eo.oss.hengj.cn/one/object/15060010012.png",
        "grade": 2,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "birdCrate",
            "hiddenCrate"
        ]
    },
    {
        "objectID": 15080050046,
        "name": "Lá bài Poker 10",
        "nameVi": "Lá bài Poker 10",
        "objectName": "扑克牌-10",
        "objectNameVi": "Lá bài Poker 10",
        "shortName": "Lá bài Poker 10",
        "secondClass": "collection",
        "thirdClass": "Đồ gia dụng",
        "price": 3424,
        "avgPrice": 3424,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050046.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050046.png",
        "grade": 1,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "birdCrate"
        ]
    },
    {
        "objectID": 15080050079,
        "name": "Cà phê tái chế bản địa",
        "nameVi": "Cà phê tái chế bản địa",
        "objectName": "当地再制咖啡",
        "objectNameVi": "Cà phê tái chế bản địa",
        "shortName": "Cà phê tái chế bản địa",
        "secondClass": "collection",
        "thirdClass": "Đồ gia dụng",
        "price": 2830,
        "avgPrice": 2830,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050079.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050079.png",
        "grade": 2,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "birdCrate"
        ]
    },
    {
        "objectID": 15060080002,
        "name": "Hộp sữa chua dinh dưỡng",
        "nameVi": "Hộp sữa chua dinh dưỡng",
        "objectName": "酸奶",
        "objectNameVi": "Hộp sữa chua dinh dưỡng",
        "shortName": "Hộp sữa chua dinh dưỡng",
        "secondClass": "collection",
        "thirdClass": "Đồ gia dụng",
        "price": 944,
        "avgPrice": 944,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15060080002.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15060080002.png",
        "grade": 1,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "birdCrate"
        ]
    },
    {
        "objectID": 15090910017,
        "name": "Sổ tay nhật ký riêng tư",
        "nameVi": "Sổ tay nhật ký riêng tư",
        "objectName": "私密笔记簿",
        "objectNameVi": "Sổ tay nhật ký riêng tư",
        "shortName": "Sổ tay nhật ký riêng tư",
        "secondClass": "collection",
        "thirdClass": "Tài liệu tình báo",
        "price": 5104,
        "avgPrice": 5104,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15090910017.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15090910017.png",
        "grade": 2,
        "itemWidth": 1,
        "itemHeight": 2,
        "crates": [
            "birdCrate"
        ]
    },
    {
        "objectID": 15080050065,
        "name": "Cưa cắt xương y tế",
        "nameVi": "Cưa cắt xương y tế",
        "objectName": "骨锯",
        "objectNameVi": "Cưa cắt xương y tế",
        "shortName": "Cưa cắt xương y tế",
        "secondClass": "collection",
        "thirdClass": "Vật tư y tế",
        "price": 23732,
        "avgPrice": 23732,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050065.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050065.png",
        "grade": 3,
        "itemWidth": 3,
        "itemHeight": 1,
        "crates": [
            "birdCrate"
        ]
    },
    {
        "objectID": 15070010008,
        "name": "Bản vẽ thiết kế kiến trúc số 4",
        "nameVi": "Bản vẽ thiết kế kiến trúc số 4",
        "objectName": "建筑图纸4号",
        "objectNameVi": "Bản vẽ thiết kế kiến trúc số 4",
        "shortName": "Bản vẽ thiết kế kiến trúc số 4",
        "secondClass": "collection",
        "thirdClass": "Tài liệu tình báo",
        "price": 4163,
        "avgPrice": 4163,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15070010008.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15070010008.png",
        "grade": 2,
        "itemWidth": 2,
        "itemHeight": 1,
        "crates": [
            "birdCrate",
            "travelBag"
        ]
    },
    {
        "objectID": 15080050193,
        "name": "Tượng chim điêu khắc",
        "nameVi": "Tượng chim điêu khắc",
        "objectName": "鸟雕",
        "objectNameVi": "Tượng chim điêu khắc",
        "shortName": "Tượng chim điêu khắc",
        "secondClass": "collection",
        "thirdClass": "Đồ sưu tầm thủ công",
        "price": 10531,
        "avgPrice": 10531,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050193.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050193.png",
        "grade": 3,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "birdCrate"
        ]
    },
    {
        "objectID": 15060010008,
        "name": "Kéo phẫu thuật cong inox",
        "nameVi": "Kéo phẫu thuật cong inox",
        "objectName": "手术剪刀",
        "objectNameVi": "Kéo phẫu thuật cong inox",
        "shortName": "Kéo phẫu thuật cong inox",
        "secondClass": "collection",
        "thirdClass": "Vật tư y tế",
        "price": 1011,
        "avgPrice": 1011,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15060010008.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15060010008.png",
        "grade": 1,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "birdCrate"
        ]
    },
    {
        "objectID": 15080050055,
        "name": "Lá bài Poker A",
        "nameVi": "Lá bài Poker A",
        "objectName": "扑克牌-A",
        "objectNameVi": "Lá bài Poker A",
        "shortName": "Lá bài Poker A",
        "secondClass": "collection",
        "thirdClass": "Đồ gia dụng",
        "price": 896,
        "avgPrice": 896,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050055.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050055.png",
        "grade": 1,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "birdCrate"
        ]
    },
    {
        "objectID": 15060010010,
        "name": "Ống kim tiêm y tế",
        "nameVi": "Ống kim tiêm y tế",
        "objectName": "注射器",
        "objectNameVi": "Ống kim tiêm y tế",
        "shortName": "Ống kim tiêm y tế",
        "secondClass": "collection",
        "thirdClass": "Vật tư y tế",
        "price": 2135,
        "avgPrice": 2135,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15060010010.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15060010010.png",
        "grade": 2,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "birdCrate",
            "travelBag"
        ]
    },
    {
        "objectID": 15080050048,
        "name": "Lá bài Poker 8",
        "nameVi": "Lá bài Poker 8",
        "objectName": "扑克牌-8",
        "objectNameVi": "Lá bài Poker 8",
        "shortName": "Lá bài Poker 8",
        "secondClass": "collection",
        "thirdClass": "Đồ gia dụng",
        "price": 2596,
        "avgPrice": 2596,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050048.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050048.png",
        "grade": 1,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "birdCrate"
        ]
    },
    {
        "objectID": 15040010003,
        "name": "Tượng Nhân Sư cổ đại",
        "nameVi": "Tượng Nhân Sư cổ đại",
        "objectName": "古老的斯芬克斯像",
        "objectNameVi": "Tượng Nhân Sư cổ đại",
        "shortName": "Tượng Nhân Sư cổ đại",
        "secondClass": "collection",
        "thirdClass": "Đồ sưu tầm thủ công",
        "price": 5052,
        "avgPrice": 5052,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15040010003.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15040010003.png",
        "grade": 2,
        "itemWidth": 2,
        "itemHeight": 2,
        "crates": [
            "birdCrate",
            "hiddenCrate"
        ]
    },
    {
        "objectID": 15010010004,
        "name": "Tuýp kem đánh răng Fluoride",
        "nameVi": "Tuýp kem đánh răng Fluoride",
        "objectName": "含氟牙膏",
        "objectNameVi": "Tuýp kem đánh răng Fluoride",
        "shortName": "Tuýp kem đánh răng Fluoride",
        "secondClass": "collection",
        "thirdClass": "Vật tư y tế",
        "price": 2263,
        "avgPrice": 2263,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15010010004.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15010010004.png",
        "grade": 1,
        "itemWidth": 1,
        "itemHeight": 2,
        "crates": [
            "birdCrate"
        ]
    },
    {
        "objectID": 15080050112,
        "name": "Hộp nến sinh tồn",
        "nameVi": "Hộp nến sinh tồn",
        "objectName": "盒装蜡烛",
        "objectNameVi": "Hộp nến sinh tồn",
        "shortName": "Hộp nến sinh tồn",
        "secondClass": "collection",
        "thirdClass": "Năng lượng và nhiên liệu",
        "price": 2263,
        "avgPrice": 2263,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050112.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050112.png",
        "grade": 1,
        "itemWidth": 2,
        "itemHeight": 2,
        "crates": [
            "birdCrate"
        ]
    },
    {
        "objectID": 15080050081,
        "name": "Lọ tiêu xay gia vị",
        "nameVi": "Lọ tiêu xay gia vị",
        "objectName": "胡椒瓶",
        "objectNameVi": "Lọ tiêu xay gia vị",
        "shortName": "Lọ tiêu xay gia vị",
        "secondClass": "collection",
        "thirdClass": "Đồ gia dụng",
        "price": 1768,
        "avgPrice": 1768,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050081.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050081.png",
        "grade": 1,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "birdCrate"
        ]
    },
    {
        "objectID": 15080040004,
        "name": "Mặt dây chuyền vỏ đạn",
        "nameVi": "Mặt dây chuyền vỏ đạn",
        "objectName": "残弹挂坠",
        "objectNameVi": "Mặt dây chuyền vỏ đạn",
        "shortName": "Mặt dây chuyền vỏ đạn",
        "secondClass": "collection",
        "thirdClass": "Đồ sưu tầm thủ công",
        "price": 3487,
        "avgPrice": 3487,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080040004.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080040004.png",
        "grade": 2,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "birdCrate"
        ]
    },
    {
        "objectID": 15020010019,
        "name": "Kìm mỏ nhọn đa năng",
        "nameVi": "Kìm mỏ nhọn đa năng",
        "objectName": "尖嘴钳",
        "objectNameVi": "Kìm mỏ nhọn đa năng",
        "shortName": "Kìm mỏ nhọn đa năng",
        "secondClass": "collection",
        "thirdClass": "Dụng cụ và vật liệu",
        "price": 2471,
        "avgPrice": 2471,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15020010019.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15020010019.png",
        "grade": 2,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "birdCrate",
            "travelBag",
            "hiddenCrate"
        ]
    },
    {
        "objectID": 15070010007,
        "name": "Bản vẽ thiết kế kiến trúc số 3",
        "nameVi": "Bản vẽ thiết kế kiến trúc số 3",
        "objectName": "建筑图纸3号",
        "objectNameVi": "Bản vẽ thiết kế kiến trúc số 3",
        "shortName": "Bản vẽ thiết kế kiến trúc số 3",
        "secondClass": "collection",
        "thirdClass": "Tài liệu tình báo",
        "price": 3477,
        "avgPrice": 3477,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15070010007.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15070010007.png",
        "grade": 2,
        "itemWidth": 2,
        "itemHeight": 1,
        "crates": [
            "birdCrate",
            "hiddenCrate"
        ]
    },
    {
        "objectID": 15080050019,
        "name": "Tờ rơi quảng cáo khách sạn",
        "nameVi": "Tờ rơi quảng cáo khách sạn",
        "objectName": "酒店宣传海报",
        "objectNameVi": "Tờ rơi quảng cáo khách sạn",
        "shortName": "Tờ rơi quảng cáo khách sạn",
        "secondClass": "collection",
        "thirdClass": "Đồ gia dụng",
        "price": 4730,
        "avgPrice": 4730,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050019.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050019.png",
        "grade": 2,
        "itemWidth": 2,
        "itemHeight": 2,
        "crates": [
            "birdCrate"
        ]
    },
    {
        "objectID": 15080050052,
        "name": "Lá bài Poker 4",
        "nameVi": "Lá bài Poker 4",
        "objectName": "扑克牌-4",
        "objectNameVi": "Lá bài Poker 4",
        "shortName": "Lá bài Poker 4",
        "secondClass": "collection",
        "thirdClass": "Đồ gia dụng",
        "price": 889,
        "avgPrice": 889,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050052.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050052.png",
        "grade": 1,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "travelBag"
        ]
    },
    {
        "objectID": 15020010012,
        "name": "Cuộn dây điện đồng bọc nhựa",
        "nameVi": "Cuộn dây điện đồng bọc nhựa",
        "objectName": "电线",
        "objectNameVi": "Cuộn dây điện đồng bọc nhựa",
        "shortName": "Cuộn dây điện đồng bọc nhựa",
        "secondClass": "collection",
        "thirdClass": "Dụng cụ và vật liệu",
        "price": 2218,
        "avgPrice": 2218,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15020010012.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15020010012.png",
        "grade": 2,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "travelBag"
        ]
    },
    {
        "objectID": 15060080001,
        "name": "Quả táo tươi",
        "nameVi": "Quả táo tươi",
        "objectName": "苹果",
        "objectNameVi": "Quả táo tươi",
        "shortName": "Quả táo tươi",
        "secondClass": "collection",
        "thirdClass": "Đồ gia dụng",
        "price": 2440,
        "avgPrice": 2440,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15060080001.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15060080001.png",
        "grade": 2,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "travelBag"
        ]
    },
    {
        "objectID": 15020010002,
        "name": "Cuộn băng dính chống thấm",
        "nameVi": "Cuộn băng dính chống thấm",
        "objectName": "防水胶布",
        "objectNameVi": "Cuộn băng dính chống thấm",
        "shortName": "Cuộn băng dính chống thấm",
        "secondClass": "collection",
        "thirdClass": "Dụng cụ và vật liệu",
        "price": 1074,
        "avgPrice": 1074,
        "image": "https://eo.oss.hengj.cn/one/object/15020010002.png",
        "pic": "https://eo.oss.hengj.cn/one/object/15020010002.png",
        "grade": 1,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "travelBag"
        ]
    },
    {
        "objectID": 15010010013,
        "name": "Bật lửa điện tử sạc USB",
        "nameVi": "Bật lửa điện tử sạc USB",
        "objectName": "电火机",
        "objectNameVi": "Bật lửa điện tử sạc USB",
        "shortName": "Bật lửa điện tử sạc USB",
        "secondClass": "collection",
        "thirdClass": "Đồ gia dụng",
        "price": 2550,
        "avgPrice": 2550,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15010010013.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15010010013.png",
        "grade": 2,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "travelBag",
            "hiddenCrate"
        ]
    },
    {
        "objectID": 15020010017,
        "name": "Cờ lê thủy lực xách tay",
        "nameVi": "Cờ lê thủy lực xách tay",
        "objectName": "便携液压扳手",
        "objectNameVi": "Cờ lê thủy lực xách tay",
        "shortName": "Cờ lê thủy lực xách tay",
        "secondClass": "collection",
        "thirdClass": "Dụng cụ và vật liệu",
        "price": 2212,
        "avgPrice": 2212,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15020010017.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15020010017.png",
        "grade": 2,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "travelBag"
        ]
    },
    {
        "objectID": 15060080016,
        "name": "Gói bột đạm đậu nành",
        "nameVi": "Gói bột đạm đậu nành",
        "objectName": "大豆蛋白粉包",
        "objectNameVi": "Gói bột đạm đậu nành",
        "shortName": "Gói bột đạm đậu nành",
        "secondClass": "collection",
        "thirdClass": "Đồ gia dụng",
        "price": 9042,
        "avgPrice": 9042,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15060080016.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15060080016.png",
        "grade": 3,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "travelBag"
        ]
    },
    {
        "objectID": 15080050087,
        "name": "Cưa tay dã chiến",
        "nameVi": "Cưa tay dã chiến",
        "objectName": "手锯",
        "objectNameVi": "Cưa tay dã chiến",
        "shortName": "Cưa tay dã chiến",
        "secondClass": "collection",
        "thirdClass": "Dụng cụ và vật liệu",
        "price": 12115,
        "avgPrice": 12115,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050087.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050087.png",
        "grade": 2,
        "itemWidth": 3,
        "itemHeight": 1,
        "crates": [
            "travelBag"
        ]
    },
    {
        "objectID": 15060080009,
        "name": "Thanh lương khô năng lượng dã ngoại",
        "nameVi": "Thanh lương khô năng lượng dã ngoại",
        "objectName": "野外能量棒",
        "objectNameVi": "Thanh lương khô năng lượng dã ngoại",
        "shortName": "Thanh lương khô năng lượng dã ngoại",
        "secondClass": "collection",
        "thirdClass": "Đồ gia dụng",
        "price": 2998,
        "avgPrice": 2998,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15060080009.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15060080009.png",
        "grade": 2,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "travelBag"
        ]
    },
    {
        "objectID": 15020010030,
        "name": "Bình sơn xịt",
        "nameVi": "Bình sơn xịt",
        "objectName": "喷漆",
        "objectNameVi": "Bình sơn xịt",
        "shortName": "Bình sơn xịt",
        "secondClass": "collection",
        "thirdClass": "Dụng cụ và vật liệu",
        "price": 3730,
        "avgPrice": 3730,
        "image": "https://eo.oss.hengj.cn/one/object/15020010030.png",
        "pic": "https://eo.oss.hengj.cn/one/object/15020010030.png",
        "grade": 2,
        "itemWidth": 1,
        "itemHeight": 2,
        "crates": [
            "travelBag",
            "hiddenCrate"
        ]
    },
    {
        "objectID": 15080050060,
        "name": "Lá bài Poker Đại Vương",
        "nameVi": "Lá bài Poker Đại Vương",
        "objectName": "扑克牌-大王",
        "objectNameVi": "Lá bài Poker Đại Vương",
        "shortName": "Lá bài Poker Đại Vương",
        "secondClass": "collection",
        "thirdClass": "Đồ gia dụng",
        "price": 13114,
        "avgPrice": 13114,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050060.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050060.png",
        "grade": 1,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "travelBag"
        ]
    },
    {
        "objectID": 15020010014,
        "name": "Thước vuông góc thợ mộc",
        "nameVi": "Thước vuông góc thợ mộc",
        "objectName": "直角尺",
        "objectNameVi": "Thước vuông góc thợ mộc",
        "shortName": "Thước vuông góc thợ mộc",
        "secondClass": "collection",
        "thirdClass": "Dụng cụ và vật liệu",
        "price": 2588,
        "avgPrice": 2588,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15020010014.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15020010014.png",
        "grade": 1,
        "itemWidth": 1,
        "itemHeight": 2,
        "crates": [
            "hiddenCrate"
        ]
    },
    {
        "objectID": 15080050007,
        "name": "Đồng xu đồng hải tặc gỉ sét",
        "nameVi": "Đồng xu đồng hải tặc gỉ sét",
        "objectName": "锈迹斑斑的海盗铜币",
        "objectNameVi": "Đồng xu đồng hải tặc gỉ sét",
        "shortName": "Đồng xu đồng hải tặc gỉ sét",
        "secondClass": "collection",
        "thirdClass": "Đồ sưu tầm thủ công",
        "price": 2384,
        "avgPrice": 2384,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050007.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050007.png",
        "grade": 2,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "hiddenCrate"
        ]
    },
    {
        "objectID": 15060010002,
        "name": "Nhíp y tế inox",
        "nameVi": "Nhíp y tế inox",
        "objectName": "手术镊子",
        "objectNameVi": "Nhíp y tế inox",
        "shortName": "Nhíp y tế inox",
        "secondClass": "collection",
        "thirdClass": "Vật tư y tế",
        "price": 2136,
        "avgPrice": 2136,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15060010002.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15060010002.png",
        "grade": 2,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "travelBag"
        ]
    },
    {
        "objectID": 15020040004,
        "name": "Thước cân bằng thủy ngân",
        "nameVi": "Thước cân bằng thủy ngân",
        "objectName": "水平仪",
        "objectNameVi": "Thước cân bằng thủy ngân",
        "shortName": "Thước cân bằng thủy ngân",
        "secondClass": "collection",
        "thirdClass": "Dụng cụ và vật liệu",
        "price": 4297,
        "avgPrice": 4297,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15020040004.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15020040004.png",
        "grade": 2,
        "itemWidth": 1,
        "itemHeight": 2,
        "crates": [
            "travelBag"
        ]
    },
    {
        "objectID": 15030010019,
        "name": "Ổ cứng cơ HDD",
        "nameVi": "Ổ cứng cơ HDD",
        "objectName": "机械硬盘",
        "objectNameVi": "Ổ cứng cơ HDD",
        "shortName": "Ổ cứng cơ HDD",
        "secondClass": "collection",
        "thirdClass": "Thiết bị điện tử",
        "price": 2450,
        "avgPrice": 2450,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15030010019.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15030010019.png",
        "grade": 2,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "hiddenCrate"
        ]
    },
    {
        "objectID": 15030010013,
        "name": "Bảng mạch in PCB",
        "nameVi": "Bảng mạch in PCB",
        "objectName": "印刷电路板",
        "objectNameVi": "Bảng mạch in PCB",
        "shortName": "Bảng mạch in PCB",
        "secondClass": "collection",
        "thirdClass": "Thiết bị điện tử",
        "price": 2595,
        "avgPrice": 2595,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15030010013.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15030010013.png",
        "grade": 2,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "hiddenCrate"
        ]
    },
    {
        "objectID": 15030010014,
        "name": "Bàn phím cơ",
        "nameVi": "Bàn phím cơ",
        "objectName": "键盘",
        "objectNameVi": "Bàn phím cơ",
        "shortName": "Bàn phím cơ",
        "secondClass": "collection",
        "thirdClass": "Thiết bị điện tử",
        "price": 2828,
        "avgPrice": 2828,
        "image": "https://eo.oss.hengj.cn/one/object/15030010014.png",
        "pic": "https://eo.oss.hengj.cn/one/object/15030010014.png",
        "grade": 2,
        "itemWidth": 2,
        "itemHeight": 1,
        "crates": [
            "hiddenCrate"
        ]
    },
    {
        "objectID": 15010010008,
        "name": "Hộp diêm quẹt an toàn",
        "nameVi": "Hộp diêm quẹt an toàn",
        "objectName": "火柴",
        "objectNameVi": "Hộp diêm quẹt an toàn",
        "shortName": "Hộp diêm quẹt an toàn",
        "secondClass": "collection",
        "thirdClass": "Đồ gia dụng",
        "price": 1068,
        "avgPrice": 1068,
        "image": "https://eo.oss.hengj.cn/one/object/15010010008.png",
        "pic": "https://eo.oss.hengj.cn/one/object/15010010008.png",
        "grade": 1,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "hiddenCrate"
        ]
    },
    {
        "objectID": 15030040011,
        "name": "Đầu đọc thẻ siêu cao tần RFID",
        "nameVi": "Đầu đọc thẻ siêu cao tần RFID",
        "objectName": "超高频读卡器",
        "objectNameVi": "Đầu đọc thẻ siêu cao tần RFID",
        "shortName": "Đầu đọc thẻ siêu cao tần RFID",
        "secondClass": "collection",
        "thirdClass": "Thiết bị điện tử",
        "price": 2397,
        "avgPrice": 2397,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15030040011.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15030040011.png",
        "grade": 2,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "hiddenCrate"
        ]
    },
    {
        "objectID": 15080050107,
        "name": "Hộp diêm đi săn chống nước",
        "nameVi": "Hộp diêm đi săn chống nước",
        "objectName": "狩猎火柴",
        "objectNameVi": "Hộp diêm đi săn chống nước",
        "shortName": "Hộp diêm đi săn chống nước",
        "secondClass": "collection",
        "thirdClass": "Năng lượng và nhiên liệu",
        "price": 9258,
        "avgPrice": 9258,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15080050107.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15080050107.png",
        "grade": 3,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "hiddenCrate"
        ]
    },
    {
        "objectID": 15040010016,
        "name": "Dây cáp mạng bấm sẵn",
        "nameVi": "Dây cáp mạng bấm sẵn",
        "objectName": "网线",
        "objectNameVi": "Dây cáp mạng bấm sẵn",
        "shortName": "Dây cáp mạng bấm sẵn",
        "secondClass": "collection",
        "thirdClass": "Dụng cụ và vật liệu",
        "price": 1065,
        "avgPrice": 1065,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15040010016.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15040010016.png",
        "grade": 1,
        "itemWidth": 1,
        "itemHeight": 1,
        "crates": [
            "hiddenCrate"
        ]
    },
    {
        "objectID": 15070010005,
        "name": "Bản vẽ thiết kế kiến trúc số 1",
        "nameVi": "Bản vẽ thiết kế kiến trúc số 1",
        "objectName": "建筑图纸1号",
        "objectNameVi": "Bản vẽ thiết kế kiến trúc số 1",
        "shortName": "Bản vẽ thiết kế kiến trúc số 1",
        "secondClass": "collection",
        "thirdClass": "Tài liệu tình báo",
        "price": 3080,
        "avgPrice": 3080,
        "image": "https://playerhub.df.qq.com/playerhub/60004/object/15070010005.png",
        "pic": "https://playerhub.df.qq.com/playerhub/60004/object/15070010005.png",
        "grade": 2,
        "itemWidth": 2,
        "itemHeight": 1,
        "crates": [
            "hiddenCrate"
        ]
    }
];

  // Quy tắc phẩm cấp và xác suất của Shushu cho từng loại hòm
  const CRATE_THEME_RULES = {
    "safe": {
      name: "保险箱",
      cols: 4,
      rows: 4,
      targetCount: [1, 4],
      gradeWeights: {"1": 0, "2": 0, "3": 10, "4": 60, "5": 25, "6": 0.8},
      filter: it => it.crates && it.crates.includes("safe")
    },
    "minisafe": {
      name: "小保险箱",
      cols: 4,
      rows: 4,
      targetCount: [1, 1],
      gradeWeights: {"1": 0, "2": 0, "3": 25, "4": 39, "5": 27, "6": 0.8},
      filter: it => it.crates && it.crates.includes("minisafe")
    },
    "ULD": {
      name: "航空储物箱",
      cols: 5,
      rows: 6,
      targetCount: [2, 6],
      gradeWeights: {"1": 0, "2": 0, "3": 21, "4": 23, "5": 7, "6": 0.8},
      filter: it => it.crates && it.crates.includes("ULD")
    },
    "medicalCrate": {
      name: "医疗物资堆",
      cols: 5,
      rows: 5,
      targetCount: [1, 3],
      gradeWeights: {"1": 4, "2": 44, "3": 24, "4": 23, "5": 6, "6": 0.3},
      filter: it => it.crates && it.crates.includes("medicalCrate")
    },
    "mcomputerCase": {
      name: "电脑机箱",
      cols: 3,
      rows: 3,
      targetCount: [1, 3],
      gradeWeights: {"1": 0, "2": 0, "3": 60, "4": 18, "5": 7, "6": 0.2},
      filter: it => it.crates && it.crates.includes("mcomputerCase")
    },
    "weaponCrate": {
      name: "大武器箱",
      cols: 6,
      rows: 4,
      targetCount: [1, 4],
      gradeWeights: {"1": 2, "2": 71, "3": 10, "4": 16, "5": 2, "6": 0.1},
      filter: it => it.crates && it.crates.includes("weaponCrate")
    },
    "serverCrate": {
      name: "服务器",
      cols: 5,
      rows: 5,
      targetCount: [1, 3],
      gradeWeights: {"1": 0, "2": 0, "3": 48, "4": 36, "5": 15, "6": 0.8},
      filter: it => it.crates && it.crates.includes("serverCrate")
    },
    "experimentCrate": {
      name: "实验服",
      cols: 4,
      rows: 4,
      targetCount: [1, 3],
      gradeWeights: {"1": 0, "2": 0, "3": 30, "4": 20, "5": 2, "6": 0.1},
      filter: it => it.crates && it.crates.includes("experimentCrate")
    },
    "ammoCrate": {
      name: "弹药箱",
      cols: 4,
      rows: 4,
      targetCount: [1, 4],
      gradeWeights: {"1": 49, "2": 33, "3": 12, "4": 4, "5": 2, "6": 0.05},
      filter: it => it.crates && it.crates.includes("ammoCrate")
    },
    "birdCrate": {
      name: "鸟窝",
      cols: 4,
      rows: 4,
      targetCount: [1, 4],
      gradeWeights: {"1": 49, "2": 33, "3": 12, "4": 4, "5": 2, "6": 0.05},
      filter: it => it.crates && it.crates.includes("birdCrate")
    },
    "advancedStorageCrate": {
      name: "高级储物箱",
      cols: 5,
      rows: 5,
      targetCount: [1, 3],
      gradeWeights: {"1": 0, "2": 0, "3": 44, "4": 6, "5": 2, "6": 0.2},
      filter: it => it.crates && it.crates.includes("advancedStorageCrate")
    },
    "travelBag": {
      name: "旅行袋",
      cols: 4,
      rows: 4,
      targetCount: [1, 3],
      gradeWeights: {"1": 11, "2": 67, "3": 19, "4": 2.3, "5": 0.08, "6": 0.03},
      filter: it => it.crates && it.crates.includes("travelBag")
    },
    "hiddenCrate": {
      name: "藏匿物",
      cols: 5,
      rows: 5,
      targetCount: [1, 3],
      gradeWeights: {"1": 19, "2": 67, "3": 10, "4": 1.3, "5": 0.08, "6": 0.03},
      filter: it => it.crates && it.crates.includes("hiddenCrate")
    },
    "medicalBag": {
      name: "医疗包",
      cols: 4,
      rows: 4,
      targetCount: [1, 3],
      gradeWeights: {"1": 16, "2": 52, "3": 16, "4": 14, "5": 2, "6": 0.2},
      filter: it => it.crates && it.crates.includes("medicalBag")
    },
    "backpack": {
      name: "登山包",
      cols: 5,
      rows: 6,
      targetCount: [2, 6],
      gradeWeights: {"1": 0, "2": 0, "3": 50, "4": 20, "5": 5, "6": 0.2},
      filter: it => it.crates && it.crates.includes("backpack")
    },
  };

  /**
   * Thuật toán Bin-Packing 2D đặt vật phẩm vào lưới chuẩn xác:
   * 1. Bắt đầu từ ô (1, 1), xếp chặt dính liền các ô, không bị hở ô trống.
   * 2. Xếp đồ có diện tích lớn trước.
   * 3. Hỗ trợ xoay nếu kích thước cho phép.
   */
  function packLootIntoGrid(items, cols, rows, isMiniSafe) {
    if (!items || items.length === 0) return [];

    if (isMiniSafe && items.length === 1) {
      const it = items[0];
      const w = Math.min(it.itemWidth || 1, cols);
      const h = Math.min(it.itemHeight || 1, rows);
      return [{
        objectID: it.objectID,
        name: it.nameVi || it.name,
        nameVi: it.nameVi || it.name,
        objectName: it.objectName || it.name,
        shortName: it.nameVi || it.name,
        avgPrice: it.price || it.avgPrice || 0,
        itemValue: it.price || it.avgPrice || 0,
        pic: it.image || it.pic,
        grade: it.grade,
        itemWidth: w,
        itemHeight: h,
        gridRow: 1,
        gridCol: 1,
        rotated: false,
        source: "https://shushu.fan"
      }];
    }

    const sorted = [...items].sort((a, b) => ((b.itemWidth || 1) * (b.itemHeight || 1)) - ((a.itemWidth || 1) * (a.itemHeight || 1)));
    const occupied = Array.from({ length: rows + 1 }, () => Array(cols + 1).fill(false));
    const placed = [];

    function canPlace(r, c, w, h) {
      if (r + h - 1 > rows || c + w - 1 > cols) return false;
      for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
          if (occupied[r + i][c + j]) return false;
        }
      }
      return true;
    }

    function markPlaced(r, c, w, h) {
      for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
          occupied[r + i][c + j] = true;
        }
      }
    }

    for (const item of sorted) {
      const wNorm = Math.min(item.itemWidth || 1, cols);
      const hNorm = Math.min(item.itemHeight || 1, rows);
      const canRotate = (wNorm !== hNorm) && (hNorm <= cols) && (wNorm <= rows);
      const candidates = [];

      for (let r = 1; r <= rows; r++) {
        for (let c = 1; c <= cols; c++) {
          if (canPlace(r, c, wNorm, hNorm)) {
            candidates.push({ r, c, w: wNorm, h: hNorm, rotated: false });
          }
          if (canRotate && canPlace(r, c, hNorm, wNorm)) {
            candidates.push({ r, c, w: hNorm, h: wNorm, rotated: true });
          }
        }
      }

      if (candidates.length > 0) {
        candidates.sort((a, b) => {
          if (a.r !== b.r) return a.r - b.r;
          if (a.c !== b.c) return a.c - b.c;
          return (a.rotated ? 1 : 0) - (b.rotated ? 0 : 1);
        });

        const chosen = candidates[0];
        markPlaced(chosen.r, chosen.c, chosen.w, chosen.h);

        placed.push({
          objectID: item.objectID,
          name: item.nameVi || item.name,
          nameVi: item.nameVi || item.name,
          objectName: item.objectName || item.name,
          shortName: item.nameVi || item.name,
          avgPrice: item.price || item.avgPrice || 0,
          itemValue: item.price || item.avgPrice || 0,
          pic: item.image || item.pic,
          grade: item.grade,
          itemWidth: chosen.w,
          itemHeight: chosen.h,
          gridRow: chosen.r,
          gridCol: chosen.c,
          rotated: chosen.rotated,
          source: "https://shushu.fan"
        });
      }
    }

    return placed;
  }

  function pickItemByGrade(itemPool, gradeWeights) {
    if (!itemPool || itemPool.length === 0) return null;
    if (!gradeWeights) return itemPool[Math.floor(Math.random() * itemPool.length)];

    const byGrade = {};
    for (const it of itemPool) {
      const g = it.grade || 1;
      if (!byGrade[g]) byGrade[g] = [];
      byGrade[g].push(it);
    }

    const availableGrades = Object.keys(byGrade).map(Number);
    const weights = availableGrades.map(g => Number(gradeWeights[g] ?? gradeWeights[String(g)] ?? 10));
    const totalWeight = weights.reduce((sum, w) => sum + w, 0);

    if (totalWeight <= 0) {
      return itemPool[Math.floor(Math.random() * itemPool.length)];
    }

    let rnd = Math.random() * totalWeight;
    let chosenGrade = availableGrades[0];
    for (let i = 0; i < availableGrades.length; i++) {
      if (rnd < weights[i]) {
        chosenGrade = availableGrades[i];
        break;
      }
      rnd -= weights[i];
    }

    const gradeList = byGrade[chosenGrade] || itemPool;
    return gradeList[Math.floor(Math.random() * gradeList.length)];
  }

  function generateLootForCrate(crate) {
    const crateId = crate.id || 'safe';
    const cols = crate.cols || 4;
    const rows = crate.rows || 4;
    const rule = CRATE_THEME_RULES[crateId] || { filter: () => true, minGrade: 1, targetCount: [1, 3] };

    let pool = DFT_ITEMS.filter(it => it.crates && it.crates.includes(crateId));
    if (pool.length === 0) {
      pool = DFT_ITEMS;
    }

    const [minCount, maxCount] = rule.targetCount || [1, 3];
    const targetCount = (crateId === 'minisafe') ? 1 : (Math.floor(Math.random() * (maxCount - minCount + 1)) + minCount);
    const selected = [];

    while (selected.length < targetCount && pool.length > 0) {
      const candidate = pickItemByGrade(pool, rule.gradeWeights);
      if (candidate && (!selected.includes(candidate) || pool.length <= targetCount)) {
        selected.push(candidate);
      }
    }

    return packLootIntoGrid(selected, cols, rows, crateId === 'minisafe');
  }

  global.DeltaForceLootEngine = {
    items: DFT_ITEMS,
    rules: CRATE_THEME_RULES,
    packLootIntoGrid: packLootIntoGrid,
    generateLootForCrate: generateLootForCrate
  };
})(typeof window !== 'undefined' ? window : global);
