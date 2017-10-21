var audiolist = {
  lib: {
    chiness: {
      audioUrl: "/static/mp3/audio5.mp3",
      title: "图书馆"
    },
    english: {
      audioUrl: "/static/mp3/audio5.mp3",
      title: "library"
    }
  },
  tech: {
    chiness: {
      audioUrl: "/static/mp3/audio2.mp3",
      title: "教学楼"
    },
    english: {
      audioUrl: "/static/mp3/audio2.mp3",
      title: "Teaching building"
    }
  },
  dormitory: {
    chiness: {
      audioUrl: "/static/mp3/audio3.mp3",
      title: "宿舍"
    },
    english: {
      audioUrl: "/static/mp3/audio3.mp3",
      title: "dormitory"
    }
  },
  canteen: {
    chiness: {
      audioUrl: "/static/mp3/audio4.mp3",
      title: "饭堂"
    },
    english: {
      audioUrl: "/static/mp3/audio4.mp3",
      title: "canteen"
    }
  },
  slient: {
    chiness: {
      audioUrl: "/static/mp3/slient.mp3",
      title: "无声"
    },
    english: {
      audioUrl: "/static/mp3/audio5.mp3",
      title: "nothing"
    }
  }
};
var imglist = [
  {
    id: "lib",
    imgUrl: [
      "/static/img/img1.jpg",
      "/static/img/img3.jpg",
      "/static/img/img4.jpg"
    ]
  },
  {
    id: "tech",
    imgUrl: [
      "/static/img/img4.jpg",
      "/static/img/img5.jpg",
      "/static/img/img6.jpg"
    ]
  },
  {
    id: "dormitory",
    imgUrl: [
      "/static/img/img7.jpg",
      "/static/img/img8.jpg",
      "/static/img/img10.jpg"
    ]
  },
  {
    id: "canteen",
    imgUrl: [
      "/static/img/img8.jpg",
      "/static/img/img2.jpg",
      "/static/img/img9.jpg"
    ]
  }
];
var declist = [
  {
    id: "lib",
    chiness: {
      title: "南海明珠 ",
      dec:
        "南海明珠,佛教福地。有“百岛之市”美誉的珠海，1980年经国务院批准成为中国五个经济特区之一。据2010年普查，珠海陆地面积1701平方千米，海岸线长604公里，大小岛屿146个。 "
    },
    english: {
      title: "Pearlof the South ChinaSea",
      dec:
        "Zhuhai,with a reputation of ‘City of Islands’，was approved by the State Council to be one of the Five Economic Zones in 1980.According to the census statistics of 2010，the land area of Zhuhai reaches 1,701 square kilometers,its coastline,604 kilometers and its islands ,large or small,146."
    }
  },
  {
    id: "tech",
    chiness: {
      title: "长明灯式八大圣迹灵塔",
      dec: `1、迦毘罗卫城蓝毗尼园佛陀降生处。
            2、摩揭陀国尼连禅河边菩提树下佛陀成道处。
			3、迦尸国波罗奈城鹿野苑佛陀初转法轮处。
			4、舍卫国袛陀园佛陀现大神通处。
			5、桑伽尸国曲女城佛陀于忉利天安居毕，自七宝宝阶降下处。
			6、王舍城提婆达多破僧，僧众分离二处，佛陀化之使归一味处。
			7、广严城佛陀思念寿量，将入涅槃处。
			8、拘尸那城娑罗林内佛陀入涅槃处。`
    },
    english: {
      title: " Eight holy sites",
      dec: `1 Lumbini of Kapilavatthu,where the Buddha was born.
			2 The Buddha attained enlightenment under the bodhi tree by the Nilian River in Magadha.
			3 The Buddha firstly turned the Dharma wheel at Sarmath,the city of Varanasi,Kashi.
			4 The Buddha demonstrated great magical powers at the Jeta Grove in Sravasti.
			5 The Buddha was descending from the seven treasured steps after the vassa in Kannauj,Kashi.
			6 Devadatta split the sengha,separating the monks and believers,and the Buddha returned them into union.
			7 The Buddha considered the problem of life and approached nirvana in Kushinagara.
			8 The Buddha entered into Nirvana in a jungle of sal trees in Kushinagara.`
    }
  },
  {
    id: "dormitory",
    chiness: {
      title: "石质长明灯",
      dec: "以供在佛前昼夜不灭,故名。比喻指引人朝向光明，努力前进，永不休废的慈悲。"
    },
    english: {
      title: "Ever-lasting lamp",
      dec:
        "It is named so as it is placed before the Buddha statue symbolizing brightness through day and night.It is a manifestation of the compassion to lead people to the bright in an ever constant and progressing manner."
    }
  },
  {
    id: "canteen",
    chiness: {
      title: "八部图案",
      dec: "独角瑞兽、狮子、麒麟"
    },
    english: {
      title: "Buddhist Guarding images ",
      dec: "Auspicious animal with a single horn,lion,Qilin"
    }
  }
];
var IconlayerMessage = {
  route: [
    {
      id: "route1"
    },
    {
      id: "route2"
    }
  ],
  sight: [
    {
      id: "lib",
      title: "图书馆",
      dec:
        "祈福邮局。观音山祈福邮局精巧别致，古色古香；邮局快递的不仅是一份开光物品，更是一份祝福，一份爱心。祈福邮局。观音山祈福邮局精巧别致，古色古香；邮局快递的不仅是一份开光物品，更是一份祝福，一份爱心。祈福邮局。观音山祈福邮局精巧别致，古色古香；邮局快递的不仅是一份开光物品，更是一份祝福，一份爱心。",
      location: [113.408545, 23.020018],
      imgurl: "/static/img/img1.jpg",

      type: "sight"
    },
    {
      id: "tech",
      title: "教学楼",
      location: [113.410195, 23.020654],
      dec:
        "钟鼓楼。古代城市中的钟鼓楼原为专用报时之用。自唐代起，寺庙内也设钟和鼓，祈福邮局。观音山祈福邮局精巧别致，古色古香；邮局快递的不仅是一份开光物品，更是一份祝福，一份爱心。祈福邮局。观音山祈福邮局精巧别致，古色古香；邮局快递的不仅是一份开光物品，更是一份祝福，一份爱心。元",
      imgurl: "/static/img/img2.jpg",
      video: "/static/video/vedio.mp4",
      type: "sight"
    },
    {
      id: "dormitory",
      title: "宿舍",
      location: [113.407314, 23.020773],
      dec:
        "祈福邮局。祈福邮局。观音山祈福邮局精巧别致，古色古香；邮局快递的不仅是一份开光物品，更是一份祝福，一份爱心。祈福邮局。观音山祈福邮局精巧别致，古色古香；邮局快递的不仅是一份开光物品，更是一份祝福，一份爱心。观音山祈福邮局精巧别致，古色古香；邮局快递的不仅是一份开光物品，更是一份祝福，一",
      imgurl: "/static/img/img3.jpg",
      video: "/static/video/vedio.mp4",
      type: "sight"
    },
    {
      id: "canteen",
      title: "饭堂",
      location: [113.41024, 23.021807],
      dec:
        "祈福邮局。祈福邮局。观音山祈福邮局精巧别致，古色古香；邮局快递的不仅是一份开光物品，更是一份祝福，一份爱心。祈福邮局。观音山祈福邮局精巧别致，古色古香；邮局快递的不仅是一份开光物品，更是一份祝福，一份爱心。观音山祈福邮局精巧别致，古色古香；邮局快递的不仅是一份开光物品，更是一份祝.",
      imgurl: "/static/img/img4.jpg",
      type: "sight"
    }
  ],
  wc: [
    {
      id: "wc1",
      title: "厕所",
      location: [113.406617, 23.019857],
      type: "wc"
    },
    {
      id: "wc2",
      title: "厕所",
      location: [113.407239, 23.022385],
      type: "wc"
    }
  ],
  food: [
    {
      id: "food1",
      title: "餐饮",
      location: [113.408377, 23.022375],
      type: "food"
    },
    {
      id: "food2",
      title: "餐饮",
      location: [113.410988, 23.022457],
      type: "food"
    }
  ],
  park: [
    {
      id: "park1",
      title: "停车场",
      location: [113.410934, 23.021045],
      type: "park"
    },
    {
      id: "park2",
      title: "停车场",
      location: [113.40881, 23.023978],
      type: "park"
    }
  ],
  stop: [
    {
      id: "stop1",
      title: "车站",
      location: [113.410366, 23.021272],
      type: "stop"
    },
    {
      id: "stop2",
      title: "车站",
      location: [113.407758, 23.021005],
      type: "stop"
    }
  ],
  panoramic: [
    {
      id: "panoramic1",
      title: "全景点",
      location: [113.409657, 23.017628],
      type: "panoramic"
    },
    {
      id: "panoramic2",
      title: "全景点",
      location: [113.408219, 23.022822],
      type: "panoramic"
    }
  ],
  other: [
    {
      id: "other1",
      title: "其他",
      location: [113.40573, 23.021835],
      type: "other"
    },
    {
      id: "other2",
      title: "其他",
      location: [113.407232, 23.019151],
      type: "other"
    }
  ]
};
