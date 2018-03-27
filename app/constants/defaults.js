export const BODY_1280 = 1280;
export const BODY_960 = 960;
export const BODY_820 = 820;
export const BODY_600 = 600;
export const BODY_480 = 480;
// Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0) like Gecko PTST/379
// Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko
// curl -A "Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko" "https://fonts.googleapis.com/css?family=Nanum+Myeongjo:800&subset=korean"


export const FONTS = [
  // {
  //   id: 1,
  //   nameKo: "노토 산스",
  //   nameEn: "Noto Sans KR",
  //   fontName: "Noto Sans KR",
  //   weights: [
  //     {
  //       fontWeight: 100,
  //       weightName: "Extra Light"
  //     },
  //     {
  //       fontWeight: 300,
  //       weightName: "Light"
  //     },
  //     {
  //       fontWeight: 500,
  //       weightName: "Medium"
  //     },
  //     {
  //       fontWeight: 700,
  //       weightName: "Bold"
  //     },
  //     {
  //       fontWeight: 900,
  //       weightName: "Black"
  //     }
  //   ],
  //   fontUrl : "https://fonts.gstatic.com/s/notosanskr/v3/Pby7FmXiEBPT4ITbgNA5CgmOUln45bIX.woff",
  //   cssUrl : "https://fonts.googleapis.com/css?family=Noto+Sans+KR:100,300,500,700,900",
  //   foundryKo: "산돌커뮤니케이션",
  //   foundryEn: "Sandoll Communication",
  //   descriptionKo: "노토 산스는 조화로운 획의 두께와 높이로 여러 문자가 시각적으로 어우러지도록 디자인되었습니다. 노토 산스 로마자 버전의 특징을 한글에 적용해 자폭이 좁으면서도 닿자의 속 공간이 크게 디자인되었습니다. 2018년 현재 30가지 문자를 지원하고, 앞으로 모든 유니코드를 포함할 예정입니다.",
  //   descriptionEn: "Noto fonts are intended to be visually harmonious across multiple languages, with compatible heights and stroke thicknesses. Inheriting the visual characteristics of the Roman alphabet in Noto Sans, its Hangul portion is designed to be narrow in width with more open counters.",
  //   category: 1
  // },
  {
    id: 2,
    nameKo: "검은고딕",
    nameEn: "Black Han Sans",
    fontName: "Black Han Sans",
    weights: [
      {
        fontWeight: 400,
        weightName: "Regular"
      }
    ],
    fontUrl : "https://fonts.gstatic.com/s/blackhansans/v1/ea8Aad44WunzF9a-dL6toA8r8kqYK3M.woff",
    cssUrl : "https://fonts.googleapis.com/css?family=Black+Han+Sans",
    foundryKo: "산돌커뮤니케이션",
    foundryEn: "Sandoll Communication",
    descriptionKo: "일반적인 한글 고딕체에 비해 강한 인상을 주는 서체입니다.",
    descriptionEn: "Black Hans Sans makes a bold impression.",
    category: 1
  },
  {
    id: 20,
    nameKo: "나눔고딕",
    nameEn: "Nanum Gothic",
    fontName: "Nanum Gothic",
    weights: [
      {
        fontWeight: 400,
        weightName: "Regular"
      },
      {
        fontWeight: 700,
        weightName: "Bold"
      },
      {
        fontWeight: 800,
        weightName: "ExtraBold"
      }
    ],
    fontUrl : "https://fonts.gstatic.com/s/nanumgothic/v7/PN_oRfi-oW3hYwmKDpxS7F_LXv7Lw1sg.woff",
    cssUrl : "https://fonts.googleapis.com/css?family=Nanum+Gothic:400,700,800",
    foundryKo: "산돌커뮤니케이션",
    foundryEn: "Sandoll Communication",
    descriptionKo: "획의 마감을 곡선으로 표현해 기존의 한글 고딕체에 비해 부드러운 인상을 강조한 서체입니다.",
    descriptionEn: "Nanum Gothic is a sans-serif font that achieves a softer look with its curved terminals.",
    category: 1
  },
  {
    id: 30,
    nameKo: "나눔 고딕 코딩",
    nameEn: "Nanum Gothic Coding",
    fontName: "Nanum Gothic Coding",
    weights: [
      {
        fontWeight: 400,
        weightName: "Regular"
      },
      {
        fontWeight: 700,
        weightName: "Bold"
      }
    ],
    fontUrl : "https://fonts.gstatic.com/s/nanumgothiccoding/v6/8QIYdjzHisX_8vv59_xMxtPFW4IXROws8xgeQsh29Q.woff",
    cssUrl : "https://fonts.googleapis.com/css?family=Nanum+Gothic+Coding:400,700",
    foundryKo: "산돌커뮤니케이션",
    foundryEn: "Sandoll Communication",
    descriptionKo: "코딩을 위해 전문적 힌팅이 적용된 고정폭 서체입니다.",
    descriptionEn: "Nanum Gothic Coding is a fixed width font designed for coding with special hinting.",
    category: 1
  },
  {
    id: 21,
    nameKo: "나눔명조",
    nameEn: "Nanum Myeongjo",
    fontName: "Nanum Myeongjo",
    weights: [
      {
        fontWeight: 400,
        weightName: "Regular"
      },
      {
        fontWeight: 700,
        weightName: "Bold"
      },
      {
        fontWeight: 800,
        weightName: "ExtraBold"
      }
    ],
    fontUrl : "https://fonts.gstatic.com/s/nanummyeongjo/v6/9Bty3DZF0dXLMZlywRbVRNhxy2pLVGA5r_c.woff",
    cssUrl : "https://fonts.googleapis.com/css?family=Nanum+Myeongjo:400,700,800",
    foundryKo: "산돌커뮤니케이션",
    foundryEn: "Sandoll Communication",
    descriptionKo: "부리와 맺음 등의 마감을 직선적으로 표현해 기존의 한글 명조체보다 현대적인 인상을 주는 서체입니다.",
    descriptionEn: "Nanum Myungjo is a serif font that achieves a contemporary feel with its straight beaks and terminals.",
    category: 2
  },
  {
    id: 3,
    nameKo: "귀여운 폰트",
    nameEn: "Cute Font",
    fontName: "Cute Font",
    weights: [
      {
        fontWeight: 400,
        weightName: "Regular"
      }
    ],
    fontUrl : "https://fonts.gstatic.com/s/cutefont/v1/Noaw6Uny2oWPbSHMrY6flZlS.woff",
    cssUrl : "https://fonts.googleapis.com/css?family=Cute+Font",
    foundryKo: "윤디자인",
    foundryEn: "YoonDesign",
    descriptionKo: "획의 맺음이나 꺾임을 둥글게 표현하고, 가로획과 세로획의 대비를 통해 리듬감을 강조한 서체입니다.",
    descriptionEn: "CuteFont features round joints and terminals while emphasizing the rhythmic contrast of horizontal and vertical strokes.",
    category: 3
  },
  {
    id: 4,
    nameKo: "도현",
    nameEn: "DOHYEON",
    fontName: "Do Hyeon",
    weights: [
      {
        fontWeight: 400,
        weightName: "Regular"
      }
    ],
    fontUrl : "https://fonts.gstatic.com/s/dohyeon/v1/TwMN-I8CRRU2zM86HGE6bQE.woff",
    cssUrl : "https://fonts.googleapis.com/css?family=Do+Hyeon",
    foundryKo: "폰트릭스",
    foundryEn: "FontRix",
    descriptionKo: "아크릴 판에 자를 대고 잘라낸 옛 간판을 모티브로 삼은 서체입니다. 자음과 모음의 획이 서로 이어지는 것이 특징으로, 한글 폰트로는 최초로 ㅅ, ㅈ, ㅎ 등의 닿자 옆의 홀자에 따라 닿자의 형태가 자동으로 달라집니다.",
    descriptionEn: "DOHYEON is inspired by old and kitschy hand-cut vinyl letters on acrylic sheets. Consonants and vowels are visually connected, and it automatically selects the right consonant for its adjacent vowel.",
    category: 1
  },
  {
    id: 5,
    nameKo: "독도",
    nameEn: "Dokdo",
    fontName: "Dokdo",
    weights: [
      {
        fontWeight: 400,
        weightName: "Regular"
      }
    ],
    fontUrl : "https://fonts.gstatic.com/s/dokdo/v1/esDf315XNuCBLyLl6tE.woff",
    cssUrl : "https://fonts.googleapis.com/css?family=Dokdo",
    foundryKo: "폰트릭스",
    foundryEn: "FontRix",
    descriptionKo: "독도의 지질학적 질감을 통해 밝고 희망찬 인상을 강조한 서체입니다.",
    descriptionEn: "Dokdo aims to make a bright and hopeful impression using Dokdo’s geological texture.",
    category: 3
  },
  {
    id: 6,
    nameKo: "대한민국독도",
    nameEn: "Daehanminkook Dokdo",
    fontName: "East Sea Dokdo",
    weights: [
      {
        fontWeight: 400,
        weightName: "Regular"
      }
    ],
    fontUrl : "https://fonts.gstatic.com/s/eastseadokdo/v1/xfuo0Wn2V2_KanASqXSZp22m06_XE6w.woff",
    cssUrl : "https://fonts.googleapis.com/css?family=East+Sea+Dokdo",
    foundryKo: "폰트릭스",
    foundryEn: "FontRix",
    descriptionKo: "붓글씨의 특징을 반영해 굵기의 변화가 자유롭고, 세로 모임 글자의 곁줄기를 굵고 길게 강조해 바다 위로 솟은 독도의 이미지를 시각화한 서체입니다.",
    descriptionEn: "Designed with free brush strokes and pronounced vertical lines, Daehanminkook Dokdo represents the bold presence of Dokdo above the sea.",
    category: 3
  },
  {
    id: 7,
    nameKo: "고딕 A1",
    nameEn: "Gothic A1",
    fontName: "Gothic A1",
    weights: [
      {
        fontWeight: 100,
        weightName: "Thin"
      },
      {
        fontWeight: 200,
        weightName: "ExtraLight"
      },
      {
        fontWeight: 300,
        weightName: "Light"
      },
      {
        fontWeight: 400,
        weightName: "Regular"
      },
      {
        fontWeight: 500,
        weightName: "Medium"
      },
      {
        fontWeight: 600,
        weightName: "Semibold"
      },
      {
        fontWeight: 700,
        weightName: "Bold"
      },
      {
        fontWeight: 800,
        weightName: "ExtraBold"
      },
      {
        fontWeight: 900,
        weightName: "Black"
      }
    ],
    fontUrl : "https://fonts.gstatic.com/s/gothica1/v1/CSR44z5ZnPydRjlCCwlC6OA6RfN9.woff",
    cssUrl : "https://fonts.googleapis.com/css?family=Gothic+A1:100,200,300,400,500,600,700,800,900",
    foundryKo: "폰트릭스",
    foundryEn: "FontRix",
    descriptionKo: "다양한 굵기와 최적화된 공간 분배를 통해 매체에 구분 없이 사용할 수 있는 고딕체입니다.",
    descriptionEn: "Gothic_A1 is a versatile sans-serif typeface with multiple weights and optimized spatial distribution.",
    category: 1
  },
  {
    id: 8,
    nameKo: "구기",
    nameEn: "Gugi",
    fontName: "Gugi",
    weights: [
      {
        fontWeight: 400,
        weightName: "Regular"
      }
    ],
    fontUrl : "https://fonts.gstatic.com/s/gugi/v1/A2BVn5dXywshZAOK8w.woff",
    cssUrl : "https://fonts.googleapis.com/css?family=Gugi",
    foundryKo: "폰트릭스",
    foundryEn: "FontRix",
    descriptionKo: "‘훈민정음’에 나타난 한글의 형태적 특징과 구기 종목 스포츠에서 ‘공’의 움직임을 한글 구조에 적용해 공이 유기적으로 이동하는 모습을 반영한 서체입니다.",
    descriptionEn: "Gugi reflects Hangul’s visual characteristics found in Hunminjeongeum and uses the organic movement of a ball as its construction method.",
    category: 3
  },
  {
    id: 9,
    nameKo: "하이멜로디",
    nameEn: "Hi Melody",
    fontName: 'Hi Melody',
    weights: [
      {
        fontWeight: 400,
        weightName: "Regular"
      }
    ],
    fontUrl : "https://fonts.gstatic.com/s/himelody/v1/46ktlbP8Vnz0pJcqCTb0cmVD.woff",
    cssUrl : "https://fonts.googleapis.com/css?family=Hi+Melody",
    foundryKo: "폰트릭스",
    foundryEn: "FontRix",
    descriptionKo: "손글씨의 아기자기한 인상과 탈네모틀 구조의 리듬감을 강조한 서체입니다.",
    descriptionEn: "Himelody emphasizes the visual rhythm of its non-tetragonal structure and its cute handwritten quality.",
    category: 3
  },
  {
    id: 10,
    nameKo: "주아",
    nameEn: "Jua",
    fontName: 'Jua',
    weights: [
      {
        fontWeight: 400,
        weightName: "Regular"
      }
    ],
    fontUrl : "https://fonts.gstatic.com/s/jua/v1/co3KmW9ljjATfure.woff",
    cssUrl : "https://fonts.googleapis.com/css?family=Jua",
    foundryKo: "폰트릭스",
    foundryEn: "FontRix",
    descriptionKo: "붓으로 직접 쓴 옛 간판을 모티브로 삼아 획의 굵기가 일정하지 않고 동글동글한 느낌을 주는 복고적 서체입니다.",
    descriptionEn: "JUA is a retro typeface inspired by brush scripts of old signs made with irregular, round strokes.",
    category: 3
  },
  {
    id: 11,
    nameKo: "기랑해랑",
    nameEn: "Kirang Haerang",
    fontName: 'Kirang Haerang',
    weights: [
      {
        fontWeight: 400,
        weightName: "Regular"
      }
    ],
    fontUrl : "https://fonts.gstatic.com/s/kiranghaerang/v1/E21-_dn_gvvIjhYON1lpIU4-bfqiUvE.woff",
    cssUrl : "https://fonts.googleapis.com/css?family=Kirang+Haerang",
    foundryKo: "폰트릭스",
    foundryEn: "FontRix",
    descriptionKo: "삐뚤어진 글자 테두리 모양 원형을 채워 만든 서체입니다. 동그라미가 커진 것이 특징입니다.",
    descriptionEn: "KIRANGHAERANG features irregular outer shapes and mostly filled in circles of various sizes, creating an off-kilter, charming effect.",
    category: 3
  },
  {
    id: 12,
    nameKo: "서툰이야기",
    nameEn: "Poor Story",
    fontName: 'Poor Story',
    weights: [
      {
        fontWeight: 400,
        weightName: "Regular"
      }
    ],
    fontUrl : "https://fonts.gstatic.com/s/poorstory/v1/jizfREFUsnUct9P6cDfd0OStKw.woff",
    cssUrl : "https://fonts.googleapis.com/css?family=Poor+Story",
    foundryKo: "폰트릭스",
    foundryEn: "FontRix",
    descriptionKo: "직선적인 획의 기울기를 조금씩 달리해 삐뚤빼뚤하지만 또박또박 써내려간 손글씨의 감성을 표현한 서체입니다.",
    descriptionEn: "With various stroke weights and angles, Poorstory reflects the organic qualities of handwriting.",
    category: 3
  },
  {
    id: 13,
    nameKo: "송명",
    nameEn: "Song Myung",
    fontName: 'Song Myung',
    weights: [
      {
        fontWeight: 400,
        weightName: "Regular"
      }
    ],
    fontUrl : "https://fonts.gstatic.com/s/songmyung/v1/1cX2aUDWAJH5-EIC7DIhn1yggg.woff",
    cssUrl : "https://fonts.googleapis.com/css?family=Song+Myung",
    foundryKo: "폰트릭스",
    foundryEn: "FontRix",
    descriptionKo: "일반 한글 명조체에 비해 닿자를 상대적으로 크게 디자인하고, 불필요한 장식을 줄여 현대성을 강조한 서체입니다.",
    descriptionEn: "With less ornaments and larger consonants, SongMyung is a contemporary take on typical Hangul serif fonts.",
    category: 2
  },
  {
    id: 14,
    nameKo: "스타일리시",
    nameEn: "Stylish",
    fontName: 'Stylish',
    weights: [
      {
        fontWeight: 400,
        weightName: "Regular"
      }
    ],
    fontUrl : "https://fonts.gstatic.com/s/stylish/v1/m8JSjfhPYriQkk7-ToDzcw.woff",
    cssUrl : "https://fonts.googleapis.com/css?family=Stylish",
    foundryKo: "폰트릭스",
    foundryEn: "FontRix",
    descriptionKo: "기존 한글 명조체의 요소를 탈네모틀 구조에 적용하고, 글줄의 리듬감 있는 흐름을 표현한 서체입니다.",
    descriptionEn: "Stylish applies characteristics of Hangul serif fonts to a non-square frame structure with a rhythmical baseline.",
    category: 2
  },
  {
    id: 15,
    nameKo: "해바라기",
    nameEn: "Sunflower",
    fontName: 'Sunflower',
    weights: [
      {
        fontWeight: 400,
        weightName: "Regular"
      }
    ],
    fontUrl : "https://fonts.gstatic.com/s/sunflower/v1/RWmKoKeF8fUjqIj7Vc-8SeXB.woff",
    cssUrl : "https://fonts.googleapis.com/css?family=Sunflower",
    foundryKo: "폰트릭스",
    foundryEn: "FontRix",
    descriptionKo: "기하학적인 조형성을 바탕으로 곡선 표현을 부분적으로 적용한 서체입니다.",
    descriptionEn: "Sunflower features partial geometric curves.",
    category: 3
  },
  {
    id: 16,
    nameKo: "연성",
    nameEn: "Yeon Sung",
    fontName: 'Yeon Sung',
    weights: [
      {
        fontWeight: 400,
        weightName: "Regular"
      }
    ],
    fontUrl : "https://fonts.gstatic.com/s/yeonsung/v1/QldMNTpbohAGtsJvUn6BRFld.woff",
    cssUrl : "https://fonts.googleapis.com/css?family=Yeon+Sung",
    foundryKo: "폰트릭스",
    foundryEn: "FontRix",
    descriptionKo: "어수룩해 보이지만, 부리를 강조해 한 글자씩 정성스럽게 써내려간 듯한 인상을 주는 서체입니다.",
    descriptionEn: "YEONSUNG achieves a relaxed yet careful handwritten quality through pronounced serifs.",
    category: 3
  },
  {
    id: 17,
    nameKo: "흑백사진",
    nameEn: "Black And White Picture",
    fontName: "Black And White Picture",
    fontUrl : "https://fonts.gstatic.com/s/blackandwhitepicture/v1/TwMe-JAERlQd3ooUHBUXGmrmioKjjnRSFO-NqL5KZ8Q.woff",
    cssUrl : "https://fonts.googleapis.com/css?family=Black+And+White+Picture",
    weights: [
      {
        fontWeight: 400,
        weightName: "Regular"
      }
    ],
    foundryKo: "산돌커뮤니케이션",
    foundryEn: "Sandoll Communication",
    descriptionKo: "거칠고 낡은 질감을 통해 빛바랜 흑백사진의 감성을 표현한 서체입니다.",
    descriptionEn: "Black And White Picture expresses the nostalgia of faded black and white photos through its old and scratchy texture.",
    category: 3
  },
  {
    id: 18,
    nameKo: "나눔 손글씨 붓",
    nameEn: "Nanum Brush Script",
    fontName: "Nanum Brush Script",
    fontUrl : "https://fonts.gstatic.com/s/nanumbrushscript/v8/wXK2E2wfpokopxzthSqPbcR5_gVaxazCg6ps.woff",
    cssUrl : "https://fonts.googleapis.com/css?family=Nanum+Brush+Script",
    weights: [
      {
        fontWeight: 400,
        weightName: "Regular"
      }
    ],
    foundryKo: "산돌커뮤니케이션",
    foundryEn: "Sandoll Communication",
    descriptionKo: "붓글씨를 표현해 꾸미지 않은 편안함과 리듬감을 주는 서체입니다.",
    descriptionEn: "Nanum Brush Script combines the rhythmic qualities of brush script with a sense of comfort.",
    category: 3
  },
  {
    id: 19,
    nameKo: "나눔 손글씨 펜",
    nameEn: "Nanum Pen Script",
    fontName: "Nanum Pen Script",
    fontUrl : "https://fonts.gstatic.com/s/nanumpenscript/v6/daaDSSYiLGqEal3MvdA_FOL_3FkN6zP0bw.woff",
    cssUrl : "https://fonts.googleapis.com/css?family=Nanum+Pen+Script",
    weights: [
      {
        fontWeight: 400,
        weightName: "Regular"
      }
    ],
    foundryKo: "산돌커뮤니케이션",
    foundryEn: "Sandoll Communication",
    descriptionKo: "펜글씨를 표현해 꾸미지 않은 편안함과 리듬감을 주는 서체입니다.",
    descriptionEn: "Nanum Brush Script combines the rhythmic qualities of pen writing with a sense of comfort.",
    category: 3
  }
];

export const CATEGORIES = [
  {
    id: 1,
    nameKo: "고딕체",
    nameEn: "Sans-serif"
  }, 
  {
    id: 2,
    nameKo: "명조체",
    nameEn: "Serif"
  },
  {
    id: 3,
    nameKo: "손글씨 및 장식체",
    nameEn: "Script & Decorative"
  }
]