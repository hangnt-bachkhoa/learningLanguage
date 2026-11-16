import { LessonDto } from "../services/farm-api.service";

export const DEFAULT_LESSONS: LessonDto[] = [
  {
    "id": 1,
    "title": "Fruits & Vegetables (Nông sản & Trái cây)",
    "languageCode": "en",
    "levelTag": "Pre-A1",
    "orderIndex": 1,
    "isUnlocked": true,
    "requiredLevel": 1,
    "requiredCropId": null,
    "requiredCropQty": 0,
    "requiredCropName": null,
    "requiredCrops": [],
    "bestStarsClaimed": 0
  },
  {
    "id": 3,
    "title": "Văn phòng (Office)",
    "languageCode": "en",
    "levelTag": "TOEIC 450",
    "orderIndex": 3,
    "isUnlocked": true,
    "requiredLevel": 1,
    "requiredCropId": null,
    "requiredCropQty": 0,
    "requiredCropName": null,
    "requiredCrops": [],
    "bestStarsClaimed": 0
  },
  {
    "id": 4,
    "title": "Nhân sự (Human Resources)",
    "languageCode": "en",
    "levelTag": "TOEIC 450",
    "orderIndex": 4,
    "isUnlocked": true,
    "requiredLevel": 1,
    "requiredCropId": null,
    "requiredCropQty": 0,
    "requiredCropName": null,
    "requiredCrops": [],
    "bestStarsClaimed": 0
  },
  {
    "id": 5,
    "title": "Kinh doanh (Business)",
    "languageCode": "en",
    "levelTag": "TOEIC 450",
    "orderIndex": 5,
    "isUnlocked": true,
    "requiredLevel": 1,
    "requiredCropId": null,
    "requiredCropQty": 0,
    "requiredCropName": null,
    "requiredCrops": [],
    "bestStarsClaimed": 0
  },
  {
    "id": 6,
    "title": "Tài chính (Finance)",
    "languageCode": "en",
    "levelTag": "TOEIC 450",
    "orderIndex": 6,
    "isUnlocked": true,
    "requiredLevel": 1,
    "requiredCropId": null,
    "requiredCropQty": 0,
    "requiredCropName": null,
    "requiredCrops": [],
    "bestStarsClaimed": 0
  },
  {
    "id": 7,
    "title": "Ngân hàng (Banking)",
    "languageCode": "en",
    "levelTag": "TOEIC 450",
    "orderIndex": 7,
    "isUnlocked": true,
    "requiredLevel": 1,
    "requiredCropId": null,
    "requiredCropQty": 0,
    "requiredCropName": null,
    "requiredCrops": [],
    "bestStarsClaimed": 0
  },
  {
    "id": 8,
    "title": "Marketing & Quảng cáo (Marketing & Advertising)",
    "languageCode": "en",
    "levelTag": "TOEIC 450",
    "orderIndex": 8,
    "isUnlocked": false,
    "requiredLevel": 2,
    "requiredCropId": "carrot",
    "requiredCropQty": 2,
    "requiredCropName": "Cà rốt",
    "requiredCrops": [
      {
        "cropId": "carrot",
        "qty": 2,
        "cropNameVi": "Cà rốt"
      }
    ],
    "bestStarsClaimed": 0
  },
  {
    "id": 9,
    "title": "Khách sạn (Hotel)",
    "languageCode": "en",
    "levelTag": "TOEIC 450",
    "orderIndex": 9,
    "isUnlocked": false,
    "requiredLevel": 2,
    "requiredCropId": "cucumber",
    "requiredCropQty": 2,
    "requiredCropName": "Dưa chuột",
    "requiredCrops": [
      {
        "cropId": "cucumber",
        "qty": 2,
        "cropNameVi": "Dưa chuột"
      }
    ],
    "bestStarsClaimed": 0
  },
  {
    "id": 10,
    "title": "Nhà hàng (Restaurant)",
    "languageCode": "en",
    "levelTag": "TOEIC 450",
    "orderIndex": 10,
    "isUnlocked": false,
    "requiredLevel": 2,
    "requiredCropId": "radish",
    "requiredCropQty": 2,
    "requiredCropName": "Củ cải đỏ",
    "requiredCrops": [
      {
        "cropId": "radish",
        "qty": 2,
        "cropNameVi": "Củ cải đỏ"
      }
    ],
    "bestStarsClaimed": 0
  },
  {
    "id": 11,
    "title": "Giao thông (Transportation)",
    "languageCode": "en",
    "levelTag": "TOEIC 450",
    "orderIndex": 11,
    "isUnlocked": false,
    "requiredLevel": 3,
    "requiredCropId": "potato",
    "requiredCropQty": 2,
    "requiredCropName": "Khoai tây",
    "requiredCrops": [
      {
        "cropId": "potato",
        "qty": 2,
        "cropNameVi": "Khoai tây"
      }
    ],
    "bestStarsClaimed": 0
  },
  {
    "id": 12,
    "title": "Du lịch (Travel)",
    "languageCode": "en",
    "levelTag": "TOEIC 450",
    "orderIndex": 12,
    "isUnlocked": false,
    "requiredLevel": 3,
    "requiredCropId": "corn",
    "requiredCropQty": 2,
    "requiredCropName": "Bắp ngô",
    "requiredCrops": [
      {
        "cropId": "corn",
        "qty": 2,
        "cropNameVi": "Bắp ngô"
      }
    ],
    "bestStarsClaimed": 0
  },
  {
    "id": 13,
    "title": "Mua sắm (Shopping)",
    "languageCode": "en",
    "levelTag": "TOEIC 450",
    "orderIndex": 13,
    "isUnlocked": false,
    "requiredLevel": 3,
    "requiredCropId": "carrot",
    "requiredCropQty": 3,
    "requiredCropName": "Cà rốt",
    "requiredCrops": [
      {
        "cropId": "carrot",
        "qty": 3,
        "cropNameVi": "Cà rốt"
      }
    ],
    "bestStarsClaimed": 0
  },
  {
    "id": 14,
    "title": "Dịch vụ khách hàng (Customer Service)",
    "languageCode": "en",
    "levelTag": "TOEIC 450",
    "orderIndex": 14,
    "isUnlocked": false,
    "requiredLevel": 3,
    "requiredCropId": "potato",
    "requiredCropQty": 3,
    "requiredCropName": "Khoai tây",
    "requiredCrops": [
      {
        "cropId": "potato",
        "qty": 3,
        "cropNameVi": "Khoai tây"
      }
    ],
    "bestStarsClaimed": 0
  },
  {
    "id": 15,
    "title": "Công nghệ (Technology)",
    "languageCode": "en",
    "levelTag": "TOEIC 600",
    "orderIndex": 15,
    "isUnlocked": false,
    "requiredLevel": 4,
    "requiredCropId": "tomato",
    "requiredCropQty": 2,
    "requiredCropName": "Cà chua",
    "requiredCrops": [
      {
        "cropId": "tomato",
        "qty": 2,
        "cropNameVi": "Cà chua"
      }
    ],
    "bestStarsClaimed": 0
  },
  {
    "id": 16,
    "title": "Y tế (Healthcare)",
    "languageCode": "en",
    "levelTag": "TOEIC 600",
    "orderIndex": 16,
    "isUnlocked": false,
    "requiredLevel": 4,
    "requiredCropId": "strawberry",
    "requiredCropQty": 2,
    "requiredCropName": "Dâu tây",
    "requiredCrops": [
      {
        "cropId": "strawberry",
        "qty": 2,
        "cropNameVi": "Dâu tây"
      }
    ],
    "bestStarsClaimed": 0
  },
  {
    "id": 17,
    "title": "Giáo dục (Education)",
    "languageCode": "en",
    "levelTag": "TOEIC 600",
    "orderIndex": 17,
    "isUnlocked": false,
    "requiredLevel": 4,
    "requiredCropId": "orange",
    "requiredCropQty": 2,
    "requiredCropName": "Cam sành",
    "requiredCrops": [
      {
        "cropId": "orange",
        "qty": 2,
        "cropNameVi": "Cam sành"
      }
    ],
    "bestStarsClaimed": 0
  },
  {
    "id": 18,
    "title": "Logistics (Logistics)",
    "languageCode": "en",
    "levelTag": "TOEIC 600",
    "orderIndex": 18,
    "isUnlocked": false,
    "requiredLevel": 5,
    "requiredCropId": "pumpkin",
    "requiredCropQty": 2,
    "requiredCropName": "Bí ngô",
    "requiredCrops": [
      {
        "cropId": "pumpkin",
        "qty": 2,
        "cropNameVi": "Bí ngô"
      }
    ],
    "bestStarsClaimed": 0
  },
  {
    "id": 19,
    "title": "Giao nhận hàng hóa (Shipping)",
    "languageCode": "en",
    "levelTag": "TOEIC 600",
    "orderIndex": 19,
    "isUnlocked": false,
    "requiredLevel": 5,
    "requiredCropId": "wheat",
    "requiredCropQty": 2,
    "requiredCropName": "Lúa mì",
    "requiredCrops": [
      {
        "cropId": "wheat",
        "qty": 2,
        "cropNameVi": "Lúa mì"
      }
    ],
    "bestStarsClaimed": 0
  },
  {
    "id": 20,
    "title": "Xây dựng (Construction)",
    "languageCode": "en",
    "levelTag": "TOEIC 600",
    "orderIndex": 20,
    "isUnlocked": false,
    "requiredLevel": 5,
    "requiredCropId": "tomato",
    "requiredCropQty": 3,
    "requiredCropName": "Cà chua",
    "requiredCrops": [
      {
        "cropId": "tomato",
        "qty": 3,
        "cropNameVi": "Cà chua"
      }
    ],
    "bestStarsClaimed": 0
  },
  {
    "id": 21,
    "title": "Bất động sản (Real Estate)",
    "languageCode": "en",
    "levelTag": "TOEIC 600",
    "orderIndex": 21,
    "isUnlocked": false,
    "requiredLevel": 5,
    "requiredCropId": "strawberry",
    "requiredCropQty": 3,
    "requiredCropName": "Dâu tây",
    "requiredCrops": [
      {
        "cropId": "strawberry",
        "qty": 3,
        "cropNameVi": "Dâu tây"
      }
    ],
    "bestStarsClaimed": 0
  },
  {
    "id": 22,
    "title": "Môi trường (Environment)",
    "languageCode": "en",
    "levelTag": "TOEIC 600",
    "orderIndex": 22,
    "isUnlocked": false,
    "requiredLevel": 6,
    "requiredCropId": "orange",
    "requiredCropQty": 3,
    "requiredCropName": "Cam sành",
    "requiredCrops": [
      {
        "cropId": "orange",
        "qty": 3,
        "cropNameVi": "Cam sành"
      }
    ],
    "bestStarsClaimed": 0
  },
  {
    "id": 23,
    "title": "Thời tiết (Weather)",
    "languageCode": "en",
    "levelTag": "TOEIC 600",
    "orderIndex": 23,
    "isUnlocked": false,
    "requiredLevel": 6,
    "requiredCropId": "pumpkin",
    "requiredCropQty": 3,
    "requiredCropName": "Bí ngô",
    "requiredCrops": [
      {
        "cropId": "pumpkin",
        "qty": 3,
        "cropNameVi": "Bí ngô"
      }
    ],
    "bestStarsClaimed": 0
  },
  {
    "id": 24,
    "title": "Pháp luật (Law)",
    "languageCode": "en",
    "levelTag": "TOEIC 600",
    "orderIndex": 24,
    "isUnlocked": false,
    "requiredLevel": 6,
    "requiredCropId": "wheat",
    "requiredCropQty": 3,
    "requiredCropName": "Lúa mì",
    "requiredCrops": [
      {
        "cropId": "wheat",
        "qty": 3,
        "cropNameVi": "Lúa mì"
      }
    ],
    "bestStarsClaimed": 0
  },
  {
    "id": 25,
    "title": "Bảo hiểm (Insurance)",
    "languageCode": "en",
    "levelTag": "TOEIC 600",
    "orderIndex": 25,
    "isUnlocked": false,
    "requiredLevel": 6,
    "requiredCropId": "tomato",
    "requiredCropQty": 2,
    "requiredCropName": "Cà chua",
    "requiredCrops": [
      {
        "cropId": "tomato",
        "qty": 2,
        "cropNameVi": "Cà chua"
      },
      {
        "cropId": "strawberry",
        "qty": 2,
        "cropNameVi": "Dâu tây"
      }
    ],
    "bestStarsClaimed": 0
  },
  {
    "id": 26,
    "title": "Sản xuất (Manufacturing)",
    "languageCode": "en",
    "levelTag": "TOEIC 600",
    "orderIndex": 26,
    "isUnlocked": false,
    "requiredLevel": 6,
    "requiredCropId": "pumpkin",
    "requiredCropQty": 2,
    "requiredCropName": "Bí ngô",
    "requiredCrops": [
      {
        "cropId": "pumpkin",
        "qty": 2,
        "cropNameVi": "Bí ngô"
      },
      {
        "cropId": "wheat",
        "qty": 2,
        "cropNameVi": "Lúa mì"
      }
    ],
    "bestStarsClaimed": 0
  },
  {
    "id": 27,
    "title": "Chuỗi cung ứng (Supply Chain)",
    "languageCode": "en",
    "levelTag": "TOEIC 800",
    "orderIndex": 27,
    "isUnlocked": false,
    "requiredLevel": 7,
    "requiredCropId": "lemon",
    "requiredCropQty": 2,
    "requiredCropName": "Chanh",
    "requiredCrops": [
      {
        "cropId": "lemon",
        "qty": 2,
        "cropNameVi": "Chanh"
      }
    ],
    "bestStarsClaimed": 0
  },
  {
    "id": 28,
    "title": "Giao tiếp (Communication)",
    "languageCode": "en",
    "levelTag": "TOEIC 800",
    "orderIndex": 28,
    "isUnlocked": false,
    "requiredLevel": 7,
    "requiredCropId": "blueberry",
    "requiredCropQty": 2,
    "requiredCropName": "Việt quất",
    "requiredCrops": [
      {
        "cropId": "blueberry",
        "qty": 2,
        "cropNameVi": "Việt quất"
      }
    ],
    "bestStarsClaimed": 0
  },
  {
    "id": 29,
    "title": "Hội nghị (Meetings)",
    "languageCode": "en",
    "levelTag": "TOEIC 800",
    "orderIndex": 29,
    "isUnlocked": false,
    "requiredLevel": 7,
    "requiredCropId": "peach",
    "requiredCropQty": 2,
    "requiredCropName": "Đào tiên",
    "requiredCrops": [
      {
        "cropId": "peach",
        "qty": 2,
        "cropNameVi": "Đào tiên"
      }
    ],
    "bestStarsClaimed": 0
  },
  {
    "id": 30,
    "title": "Quản lý dự án (Project Management)",
    "languageCode": "en",
    "levelTag": "TOEIC 800",
    "orderIndex": 30,
    "isUnlocked": false,
    "requiredLevel": 8,
    "requiredCropId": "banana",
    "requiredCropQty": 2,
    "requiredCropName": "Chuối chín",
    "requiredCrops": [
      {
        "cropId": "banana",
        "qty": 2,
        "cropNameVi": "Chuối chín"
      }
    ],
    "bestStarsClaimed": 0
  },
  {
    "id": 31,
    "title": "Hành chính văn phòng (Administrative Tasks)",
    "languageCode": "en",
    "levelTag": "TOEIC 800",
    "orderIndex": 31,
    "isUnlocked": false,
    "requiredLevel": 8,
    "requiredCropId": "watermelon",
    "requiredCropQty": 2,
    "requiredCropName": "Dưa hấu",
    "requiredCrops": [
      {
        "cropId": "watermelon",
        "qty": 2,
        "cropNameVi": "Dưa hấu"
      }
    ],
    "bestStarsClaimed": 0
  },
  {
    "id": 32,
    "title": "Thể thao (Sports)",
    "languageCode": "en",
    "levelTag": "TOEIC 800",
    "orderIndex": 32,
    "isUnlocked": false,
    "requiredLevel": 8,
    "requiredCropId": "lemon",
    "requiredCropQty": 3,
    "requiredCropName": "Chanh",
    "requiredCrops": [
      {
        "cropId": "lemon",
        "qty": 3,
        "cropNameVi": "Chanh"
      }
    ],
    "bestStarsClaimed": 0
  },
  {
    "id": 33,
    "title": "Giải trí (Entertainment)",
    "languageCode": "en",
    "levelTag": "TOEIC 800",
    "orderIndex": 33,
    "isUnlocked": false,
    "requiredLevel": 8,
    "requiredCropId": "blueberry",
    "requiredCropQty": 3,
    "requiredCropName": "Việt quất",
    "requiredCrops": [
      {
        "cropId": "blueberry",
        "qty": 3,
        "cropNameVi": "Việt quất"
      }
    ],
    "bestStarsClaimed": 0
  },
  {
    "id": 34,
    "title": "Nghệ thuật (Arts)",
    "languageCode": "en",
    "levelTag": "TOEIC 800",
    "orderIndex": 34,
    "isUnlocked": false,
    "requiredLevel": 8,
    "requiredCropId": "peach",
    "requiredCropQty": 3,
    "requiredCropName": "Đào tiên",
    "requiredCrops": [
      {
        "cropId": "peach",
        "qty": 3,
        "cropNameVi": "Đào tiên"
      }
    ],
    "bestStarsClaimed": 0
  },
  {
    "id": 35,
    "title": "Thời trang (Fashion)",
    "languageCode": "en",
    "levelTag": "TOEIC 800",
    "orderIndex": 35,
    "isUnlocked": false,
    "requiredLevel": 9,
    "requiredCropId": "banana",
    "requiredCropQty": 3,
    "requiredCropName": "Chuối chín",
    "requiredCrops": [
      {
        "cropId": "banana",
        "qty": 3,
        "cropNameVi": "Chuối chín"
      }
    ],
    "bestStarsClaimed": 0
  },
  {
    "id": 36,
    "title": "Sự kiện (Events)",
    "languageCode": "en",
    "levelTag": "TOEIC 800",
    "orderIndex": 36,
    "isUnlocked": false,
    "requiredLevel": 9,
    "requiredCropId": "watermelon",
    "requiredCropQty": 3,
    "requiredCropName": "Dưa hấu",
    "requiredCrops": [
      {
        "cropId": "watermelon",
        "qty": 3,
        "cropNameVi": "Dưa hấu"
      }
    ],
    "bestStarsClaimed": 0
  },
  {
    "id": 37,
    "title": "Phương tiện truyền thông (Media)",
    "languageCode": "en",
    "levelTag": "TOEIC 800",
    "orderIndex": 37,
    "isUnlocked": false,
    "requiredLevel": 9,
    "requiredCropId": "lemon",
    "requiredCropQty": 2,
    "requiredCropName": "Chanh",
    "requiredCrops": [
      {
        "cropId": "lemon",
        "qty": 2,
        "cropNameVi": "Chanh"
      },
      {
        "cropId": "blueberry",
        "qty": 2,
        "cropNameVi": "Việt quất"
      }
    ],
    "bestStarsClaimed": 0
  },
  {
    "id": 38,
    "title": "Điện thoại (Telecommunications)",
    "languageCode": "en",
    "levelTag": "TOEIC 800",
    "orderIndex": 38,
    "isUnlocked": false,
    "requiredLevel": 9,
    "requiredCropId": "peach",
    "requiredCropQty": 2,
    "requiredCropName": "Đào tiên",
    "requiredCrops": [
      {
        "cropId": "peach",
        "qty": 2,
        "cropNameVi": "Đào tiên"
      },
      {
        "cropId": "banana",
        "qty": 2,
        "cropNameVi": "Chuối chín"
      }
    ],
    "bestStarsClaimed": 0
  },
  {
    "id": 39,
    "title": "Nông nghiệp (Agriculture)",
    "languageCode": "en",
    "levelTag": "TOEIC 800",
    "orderIndex": 39,
    "isUnlocked": false,
    "requiredLevel": 9,
    "requiredCropId": "watermelon",
    "requiredCropQty": 2,
    "requiredCropName": "Dưa hấu",
    "requiredCrops": [
      {
        "cropId": "watermelon",
        "qty": 2,
        "cropNameVi": "Dưa hấu"
      },
      {
        "cropId": "blueberry",
        "qty": 2,
        "cropNameVi": "Việt quất"
      }
    ],
    "bestStarsClaimed": 0
  },
  {
    "id": 40,
    "title": "Thực phẩm và đồ uống (Food & Beverage)",
    "languageCode": "en",
    "levelTag": "TOEIC 900",
    "orderIndex": 40,
    "isUnlocked": false,
    "requiredLevel": 10,
    "requiredCropId": "grapes",
    "requiredCropQty": 2,
    "requiredCropName": "Nho tím",
    "requiredCrops": [
      {
        "cropId": "grapes",
        "qty": 2,
        "cropNameVi": "Nho tím"
      }
    ],
    "bestStarsClaimed": 0
  },
  {
    "id": 41,
    "title": "Vận tải (Transportation Systems)",
    "languageCode": "en",
    "levelTag": "TOEIC 900",
    "orderIndex": 41,
    "isUnlocked": false,
    "requiredLevel": 10,
    "requiredCropId": "apple",
    "requiredCropQty": 2,
    "requiredCropName": "Táo",
    "requiredCrops": [
      {
        "cropId": "apple",
        "qty": 2,
        "cropNameVi": "Táo"
      }
    ],
    "bestStarsClaimed": 0
  },
  {
    "id": 42,
    "title": "An toàn lao động (Workplace Safety)",
    "languageCode": "en",
    "levelTag": "TOEIC 900",
    "orderIndex": 42,
    "isUnlocked": false,
    "requiredLevel": 10,
    "requiredCropId": "cherry",
    "requiredCropQty": 2,
    "requiredCropName": "Cherry",
    "requiredCrops": [
      {
        "cropId": "cherry",
        "qty": 2,
        "cropNameVi": "Cherry"
      }
    ],
    "bestStarsClaimed": 0
  },
  {
    "id": 43,
    "title": "Tài nguyên thiên nhiên (Natural Resources)",
    "languageCode": "en",
    "levelTag": "TOEIC 900",
    "orderIndex": 43,
    "isUnlocked": false,
    "requiredLevel": 10,
    "requiredCropId": "grapes",
    "requiredCropQty": 3,
    "requiredCropName": "Nho tím",
    "requiredCrops": [
      {
        "cropId": "grapes",
        "qty": 3,
        "cropNameVi": "Nho tím"
      }
    ],
    "bestStarsClaimed": 0
  },
  {
    "id": 44,
    "title": "Sản phẩm và dịch vụ (Products & Services)",
    "languageCode": "en",
    "levelTag": "TOEIC 900",
    "orderIndex": 44,
    "isUnlocked": false,
    "requiredLevel": 11,
    "requiredCropId": "apple",
    "requiredCropQty": 3,
    "requiredCropName": "Táo",
    "requiredCrops": [
      {
        "cropId": "apple",
        "qty": 3,
        "cropNameVi": "Táo"
      }
    ],
    "bestStarsClaimed": 0
  },
  {
    "id": 45,
    "title": "Quan hệ đối tác (Partnerships)",
    "languageCode": "en",
    "levelTag": "TOEIC 900",
    "orderIndex": 45,
    "isUnlocked": false,
    "requiredLevel": 11,
    "requiredCropId": "cherry",
    "requiredCropQty": 3,
    "requiredCropName": "Cherry",
    "requiredCrops": [
      {
        "cropId": "cherry",
        "qty": 3,
        "cropNameVi": "Cherry"
      }
    ],
    "bestStarsClaimed": 0
  },
  {
    "id": 46,
    "title": "Quản lý thời gian (Time Management)",
    "languageCode": "en",
    "levelTag": "TOEIC 900",
    "orderIndex": 46,
    "isUnlocked": false,
    "requiredLevel": 11,
    "requiredCropId": "grapes",
    "requiredCropQty": 2,
    "requiredCropName": "Nho tím",
    "requiredCrops": [
      {
        "cropId": "grapes",
        "qty": 2,
        "cropNameVi": "Nho tím"
      },
      {
        "cropId": "apple",
        "qty": 2,
        "cropNameVi": "Táo"
      }
    ],
    "bestStarsClaimed": 0
  },
  {
    "id": 47,
    "title": "Bảo trì thiết bị (Equipment Maintenance)",
    "languageCode": "en",
    "levelTag": "TOEIC 900",
    "orderIndex": 47,
    "isUnlocked": false,
    "requiredLevel": 11,
    "requiredCropId": "apple",
    "requiredCropQty": 2,
    "requiredCropName": "Táo",
    "requiredCrops": [
      {
        "cropId": "apple",
        "qty": 2,
        "cropNameVi": "Táo"
      },
      {
        "cropId": "cherry",
        "qty": 2,
        "cropNameVi": "Cherry"
      }
    ],
    "bestStarsClaimed": 0
  },
  {
    "id": 48,
    "title": "Xuất nhập khẩu (Import & Export)",
    "languageCode": "en",
    "levelTag": "TOEIC 900",
    "orderIndex": 48,
    "isUnlocked": false,
    "requiredLevel": 12,
    "requiredCropId": "grapes",
    "requiredCropQty": 3,
    "requiredCropName": "Nho tím",
    "requiredCrops": [
      {
        "cropId": "grapes",
        "qty": 3,
        "cropNameVi": "Nho tím"
      },
      {
        "cropId": "cherry",
        "qty": 2,
        "cropNameVi": "Cherry"
      }
    ],
    "bestStarsClaimed": 0
  },
  {
    "id": 49,
    "title": "Phát triển sản phẩm (Product Development)",
    "languageCode": "en",
    "levelTag": "TOEIC 900",
    "orderIndex": 49,
    "isUnlocked": false,
    "requiredLevel": 12,
    "requiredCropId": "apple",
    "requiredCropQty": 3,
    "requiredCropName": "Táo",
    "requiredCrops": [
      {
        "cropId": "apple",
        "qty": 3,
        "cropNameVi": "Táo"
      },
      {
        "cropId": "grapes",
        "qty": 2,
        "cropNameVi": "Nho tím"
      }
    ],
    "bestStarsClaimed": 0
  },
  {
    "id": 50,
    "title": "Khủng hoảng và quản lý rủi ro (Crisis & Risk Management)",
    "languageCode": "en",
    "levelTag": "TOEIC 900",
    "orderIndex": 50,
    "isUnlocked": false,
    "requiredLevel": 12,
    "requiredCropId": "cherry",
    "requiredCropQty": 3,
    "requiredCropName": "Cherry",
    "requiredCrops": [
      {
        "cropId": "cherry",
        "qty": 3,
        "cropNameVi": "Cherry"
      },
      {
        "cropId": "apple",
        "qty": 2,
        "cropNameVi": "Táo"
      }
    ],
    "bestStarsClaimed": 0
  },
  {
    "id": 51,
    "title": "Đàm phán (Negotiations)",
    "languageCode": "en",
    "levelTag": "TOEIC 900",
    "orderIndex": 51,
    "isUnlocked": false,
    "requiredLevel": 12,
    "requiredCropId": "grapes",
    "requiredCropQty": 3,
    "requiredCropName": "Nho tím",
    "requiredCrops": [
      {
        "cropId": "grapes",
        "qty": 3,
        "cropNameVi": "Nho tím"
      },
      {
        "cropId": "apple",
        "qty": 3,
        "cropNameVi": "Táo"
      }
    ],
    "bestStarsClaimed": 0
  },
  {
    "id": 52,
    "title": "Hoạt động từ thiện (Charity & Non-profit)",
    "languageCode": "en",
    "levelTag": "TOEIC 900",
    "orderIndex": 52,
    "isUnlocked": false,
    "requiredLevel": 12,
    "requiredCropId": "apple",
    "requiredCropQty": 3,
    "requiredCropName": "Táo",
    "requiredCrops": [
      {
        "cropId": "apple",
        "qty": 3,
        "cropNameVi": "Táo"
      },
      {
        "cropId": "cherry",
        "qty": 3,
        "cropNameVi": "Cherry"
      }
    ],
    "bestStarsClaimed": 0
  }
];
