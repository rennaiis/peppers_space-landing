import {NOT_MOB} from "./adaptive-settings";
import { image } from "@/utils/ps/frontend";

export const header = {
  logo: {
    icon: "intro/lotoLogo",
    href: 'https://www.stoloto.ru/ruslotto/game?int=left&draw=1804'
  },
  menuList: {
    customMenuItems: [
      {
        itemsText: "победители",
        link: 'winners'
      },
      {
        itemsText: "o лотерее",
        link: 'about'
      },
      {
        itemsText: "как участвовать",
        link: 'steps'
      },
      {
        itemsText: "Безопасность",
        link: 'buy'
      },
      {
        itemsText: "Приложение",
        link: 'app'
      },    
    ],
  },
  spaceLogo: {
    icon: 'intro/spaceDay', 
  }, 
}
export const intro = {
  triangle: "intro/triangle",
  rightBg: {
    sourceData:{
      sources: [
        {
          srcSet: `${image("intro/redBg-m.webp")} 1x, ${image("intro/redBg-m@2x.webp")} 2x`, 
          media: `(max-width: ${NOT_MOB - 1}px)`,
          type:"image/webp"
        },
        {
          srcSet: `${image("intro/redBg-m.png")} 1x, ${image("intro/redBg-m@2x.png")} 2x`, 
          media: `(max-width: ${NOT_MOB - 1}px)`
        },
        {
          srcSet: image("intro/redBg.webp"),
          type:"image/webp"
        }, 
      ], 
    },
    imgAttr: {
      src: image("intro/redBg.png"),
    }
  },
  bgItems: [
     {
      modifier: 'space',
      sourceData:{
        sources: [
          {
            srcSet: `${image("intro/space-m.webp")} 1x, ${image("intro/space-m@2x.webp")} 2x`, 
            media: `(max-width: ${NOT_MOB - 1}px)`,
            type:"image/webp"
          },
          {
            srcSet: `${image("intro/space-m.png")} 1x, ${image("intro/space-m@2x.png")} 2x`, 
            media: `(max-width: ${NOT_MOB - 1}px)`
          },
          {
            srcSet: image("intro/space.webp"),
            type:"image/webp"
          }, 
        ], 
      },
      imgAttr: {
        src: image("intro/space.png"),
      }
    },
    {
      modifier: 'rocket',
      sourceData:{
        sources: [
          {
            srcSet: `${image("intro/rocket-m.webp")} 1x, ${image("intro/rocket-m@2x.webp")} 2x`, 
            media: `(max-width: ${NOT_MOB - 1}px)`,
            type:"image/webp"
          },
          {
            srcSet: `${image("intro/rocket-m.png")} 1x, ${image("intro/rocket-m@2x.png")} 2x`, 
            media: `(max-width: ${NOT_MOB - 1}px)`
          },
          {
            srcSet: image("intro/rocket.webp"),
            type:"image/webp"
          }, 
        ], 
      },
      imgAttr: {
        src: image("intro/rocket.png"),
      }
    },
    {
      modifier: 'car',
      sourceData:{
        sources: [
          {
            srcSet: `${image("intro/car-m.webp")} 1x, ${image("intro/car-m@2x.webp")} 2x`, 
            media: `(max-width: ${NOT_MOB - 1}px)`,
            type:"image/webp"
          },
          {
            srcSet: `${image("intro/car-m.png")} 1x, ${image("intro/car-m@2x.png")} 2x`, 
            media: `(max-width: ${NOT_MOB - 1}px)`
          },
          {
            srcSet: image("intro/car.webp"),
            type:"image/webp"
          }, 
        ], 
      },
      imgAttr: {
        src: image("intro/car.png"),
      }
    },
    
    {
      modifier: 'man',
      sourceData:{
        sources: [
          {
            srcSet: `${image("intro/man-m.webp")} 1x, ${image("intro/man-m@2x.webp")} 2x`, 
            media: `(max-width: ${NOT_MOB - 1}px)`,
            type:"image/webp"
          },
          {
            srcSet: `${image("intro/man-m.png")} 1x, ${image("intro/man-m@2x.png")} 2x`, 
            media: `(max-width: ${NOT_MOB - 1}px)`
          },
          {
            srcSet: image("intro/man.webp"),
            type:"image/webp"
          }, 
        ], 
      },
      imgAttr: {
        src: image("intro/man.png"),
      }
    },
  ],
  content: [
    {
      caption: 'разыграем', 
      className:"intro__caption_1 intro__caption_big"
    },
    {
      caption: 'автомобиль', 
      className:"intro__caption_2 intro__caption_white"
    },
    {
      caption: 'премиум-класса', 
      className:"intro__caption_3"
    },
    {
      caption: 'Джекпот 800&nbsp;000&nbsp;000&nbsp;₽',
      tag:"h1",
      className:"intro__caption_4 intro__caption_red"
    },
    {
      caption: 'Призы по&nbsp;300&nbsp;000&nbsp;₽',
      className:"intro__caption_5"
    }
  ],
  button: {
    className:"customButton_yellow",
    tag: 'a',
    text: "Участвовать",
    href: "https://www.stoloto.ru/",
    target: '_blank'
  },
  tv: {
    logo: {
      sourceData:{
        sources: [
          {
            srcSet: `${image("ntv.webp")} 1x, ${image("ntv-m@2x.webp")} 2x`, 
            media: `(max-width: ${NOT_MOB - 1}px)`,
            type:"image/webp"
          },
          {
            srcSet: `${image("ntv.png")} 1x, ${image("ntv-m@2x.png")} 2x`, 
            media: `(max-width: ${NOT_MOB - 1}px)`
          },
          {
            srcSet: image("ntv.webp"),
            type:"image/webp"
          }, 
        ], 
      },
      imgAttr: {
        src: image("ntv.png"),
      }
    },
    caption: 'Смотрите трансляцию 1435-го тиража 10&nbsp;апреля на&nbsp;НТВ'
  }
}
export const winners = {
  back: {
    modifier: 'back',
    dataDepth: '1',
    sourceData:{
      sources: [
        {
          srcSet: `${image("winners/bg-m.webp")} 1x, ${image("winners/bg-m@2x.webp")} 2x`, 
          media: `(max-width: ${NOT_MOB - 1}px)`,
          type:"image/webp"
        },
        {
          srcSet: `${image("winners/bg-m.png")} 1x, ${image("winners/bg-m@2x.png")} 2x`, 
          media: `(max-width: ${NOT_MOB - 1}px)`
        },
        {
          srcSet: image("winners/bg.webp"),
          type:"image/webp"
        }, 
      ], 
    },
    imgAttr: {
      src: image("winners/bg.png"),
    }
  },
  bgItems: [
    {
      modifier: 'man',
      dataDepth: '1.5',
      sourceData:{
        sources: [
          {
            srcSet: `${image("winners/man-m.webp")} 1x, ${image("winners/man-m@2x.webp")} 2x`, 
            media: `(max-width: ${NOT_MOB - 1}px)`,
            type:"image/webp"
          },
          {
            srcSet: `${image("winners/man-m.png")} 1x, ${image("winners/man-m@2x.png")} 2x`, 
            media: `(max-width: ${NOT_MOB - 1}px)`
          },
          {
            srcSet: image("winners/man.webp"),
            type:"image/webp"
          }, 
        ], 
      },
      imgAttr: {
        src: image("winners/man.png"),
      }
    },
    
  ],
  title: 'Победители',
  link: {
    text: 'Ещё больше историй смотрите в&nbsp;соцсетях',
    icon: 'winners/arrow',
    href: 'https://www.stoloto.ru/winners?int=sitemap'
  },
  button: {
    target: '_blank',
    className:"customButton_yellow",
    tag: 'a',
    text: "Хочу так же!",
    href: "https://www.stoloto.ru/"
  },
  rightArrow:  'winners/rightArrow',
  leftArrow:  'winners/leftArrow',
  winnersList: [
    {
      name: 'Ольга',
      surname: 'Сусакина',
      prize: 'Загородный дом', 
      video: 'https://rutube.ru/play/embed/56447d16a6548119f344da25d0f21fa5/',
      icon: {
        sourceData:{
          sources: [
            {
              srcSet: `${image("winners/cup.webp")} 1x, ${image("winners/cup-m@2x.webp")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`,
              type:"image/webp"
            },
            {
              srcSet: `${image("winners/cup.png")} 1x, ${image("winners/cup-m@2x.png")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`
            },
            {
              srcSet: image("winners/cup.webp"),
              type:"image/webp"
            }, 
          ], 
        },
        imgAttr: {
          src: image("winners/cup.png"),
        }
      },     
      img: {
        sourceData:{
          sources: [
            {
              srcSet: `${image("winners/people/OlgaSusakina.webp")} 1x, ${image("winners/people/OlgaSusakina-m@2x.webp")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`,
              type:"image/webp"
            },
            {
              srcSet: `${image("winners/people/OlgaSusakina.png")} 1x, ${image("winners/people/OlgaSusakina-m@2x.png")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`
            },
            {
              srcSet: image("winners/people/OlgaSusakina.webp"),
              type:"image/webp"
            }, 
          ], 
        },
        imgAttr: {
          src: image("winners/OlgaSusakina.png"),
        }
      },      
    },
    {
      name: 'Андрей',
      surname: 'Павлик',
      prize: 'Автомобиль', 
      video: 'https://rutube.ru/play/embed/26492bdd30eda9821fe906a0ff9e0e00/',
      icon: {
        sourceData:{
          sources: [
            {
              srcSet: `${image("winners/cup.webp")} 1x, ${image("winners/cup-m@2x.webp")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`,
              type:"image/webp"
            },
            {
              srcSet: `${image("winners/cup.png")} 1x, ${image("winners/cup-m@2x.png")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`
            },
            {
              srcSet: image("winners/cup.webp"),
              type:"image/webp"
            }, 
          ], 
        },
        imgAttr: {
          src: image("winners/cup.png"),
        }
      },     
      img: {
        sourceData:{
          sources: [
            {
              srcSet: `${image("winners/people/AndreyPavlic.webp")} 1x, ${image("winners/people/AndreyPavlic-m@2x.webp")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`,
              type:"image/webp"
            },
            {
              srcSet: `${image("winners/people/AndreyPavlic.png")} 1x, ${image("winners/people/AndreyPavlic-m@2x.png")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`
            },
            {
              srcSet: image("winners/people/AndreyPavlic.webp"),
              type:"image/webp"
            }, 
          ], 
        },
        imgAttr: {
          src: image("winners/AndreyPavlic.png"),
        }
      },      
    },
    {
      name: 'Анастасия',
      surname: 'Малюта',
      prize: '600 000 ₽',
      video: 'https://rutube.ru/play/embed/26492bdd30eda9821fe906a0ff9e0e00/', 
      icon: {
        sourceData:{
          sources: [
            {
              srcSet: `${image("winners/cup.webp")} 1x, ${image("winners/cup-m@2x.webp")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`,
              type:"image/webp"
            },
            {
              srcSet: `${image("winners/cup.png")} 1x, ${image("winners/cup-m@2x.png")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`
            },
            {
              srcSet: image("winners/cup.webp"),
              type:"image/webp"
            }, 
          ], 
        },
        imgAttr: {
          src: image("winners/cup.png"),
        }
      },     
      img: {
        sourceData:{
          sources: [
            {
              srcSet: `${image("winners/people/AnastasiaMaluta.webp")} 1x, ${image("winners/people/AnastasiaMaluta-m@2x.webp")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`,
              type:"image/webp"
            },
            {
              srcSet: `${image("winners/people/AnastasiaMaluta.png")} 1x, ${image("winners/people/AnastasiaMaluta-m@2x.png")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`
            },
            {
              srcSet: image("winners/people/AnastasiaMaluta.webp"),
              type:"image/webp"
            }, 
          ], 
        },
        imgAttr: {
          src: image("winners/AnastasiaMaluta.png"),
        }
      },      
    },
    {
      name: 'Анна',
      surname: 'Макарова',
      prize: '1 000 000 ₽ ',
      video: 'https://rutube.ru/play/embed/5415c033db387d544d3ba239f793baee/',  
      icon: {
        sourceData:{
          sources: [
            {
              srcSet: `${image("winners/cup.webp")} 1x, ${image("winners/cup-m@2x.webp")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`,
              type:"image/webp"
            },
            {
              srcSet: `${image("winners/cup.png")} 1x, ${image("winners/cup-m@2x.png")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`
            },
            {
              srcSet: image("winners/cup.webp"),
              type:"image/webp"
            }, 
          ], 
        },
        imgAttr: {
          src: image("winners/cup.png"),
        }
      },    
      img: {
        sourceData:{
          sources: [
            {
              srcSet: `${image("winners/people/AnnaMakarova.webp")} 1x, ${image("winners/people/AnnaMakarova-m@2x.webp")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`,
              type:"image/webp"
            },
            {
              srcSet: `${image("winners/people/AnnaMakarova.png")} 1x, ${image("winners/people/AnnaMakarova-m@2x.png")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`
            },
            {
              srcSet: image("winners/people/AnnaMakarova.webp"),
              type:"image/webp"
            }, 
          ], 
        },
        imgAttr: {
          src: image("winners/AnnaMakarova.png"),
        }
      },     
    },
    {
      name: 'Рахима',
      surname: 'Игнатова',
      prize: '1 000 000 ₽ ', 
      video: 'https://rutube.ru/play/embed/26492bdd30eda9821fe906a0ff9e0e00/', 
      icon: {
        sourceData:{
          sources: [
            {
              srcSet: `${image("winners/cup.webp")} 1x, ${image("winners/cup-m@2x.webp")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`,
              type:"image/webp"
            },
            {
              srcSet: `${image("winners/cup.png")} 1x, ${image("winners/cup-m@2x.png")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`
            },
            {
              srcSet: image("winners/cup.webp"),
              type:"image/webp"
            }, 
          ], 
        },
        imgAttr: {
          src: image("winners/cup.png"),
        }
      },    
      img: {
        sourceData:{
          sources: [
            {
              srcSet: `${image("winners/people/RahimaIgnatova.webp")} 1x, ${image("winners/people/RahimaIgnatova-m@2x.webp")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`,
              type:"image/webp"
            },
            {
              srcSet: `${image("winners/people/RahimaIgnatova.png")} 1x, ${image("winners/people/RahimaIgnatova-m@2x.png")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`
            },
            {
              srcSet: image("winners/people/RahimaIgnatova.webp"),
              type:"image/webp"
            }, 
          ], 
        },
        imgAttr: {
          src: image("winners/RahimaIgnatova.png"),
        }
      },     
    },
    {
      name: 'Татьяна',
      surname: 'Зеликова',
      prize: '812 500 ₽', 
      video: 'https://rutube.ru/play/embed/5415c033db387d544d3ba239f793baee/', 
      icon: {
        sourceData:{
          sources: [
            {
              srcSet: `${image("winners/cup.webp")} 1x, ${image("winners/cup-m@2x.webp")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`,
              type:"image/webp"
            },
            {
              srcSet: `${image("winners/cup.png")} 1x, ${image("winners/cup-m@2x.png")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`
            },
            {
              srcSet: image("winners/cup.webp"),
              type:"image/webp"
            }, 
          ], 
        },
        imgAttr: {
          src: image("winners/cup.png"),
        }
      },     
      img: {
        sourceData:{
          sources: [
            {
              srcSet: `${image("winners/people/TatianaZelikova.webp")} 1x, ${image("winners/people/TatianaZelikova-m@2x.webp")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`,
              type:"image/webp"
            },
            {
              srcSet: `${image("winners/people/TatianaZelikova.png")} 1x, ${image("winners/people/TatianaZelikova-m@2x.png")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`
            },
            {
              srcSet: image("winners/people/TatianaZelikova.webp"),
              type:"image/webp"
            }, 
          ], 
        },
        imgAttr: {
          src: image("winners/TatianaZelikova.png"),
        }
      },     
    },
    {
      name: 'Елена',
      surname: 'Войтевич',
      prize: '1 000 000 ₽ ', 
      video: 'https://rutube.ru/play/embed/26492bdd30eda9821fe906a0ff9e0e00/', 
      icon: {
        sourceData:{
          sources: [
            {
              srcSet: `${image("winners/cup.webp")} 1x, ${image("winners/cup-m@2x.webp")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`,
              type:"image/webp"
            },
            {
              srcSet: `${image("winners/cup.png")} 1x, ${image("winners/cup-m@2x.png")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`
            },
            {
              srcSet: image("winners/cup.webp"),
              type:"image/webp"
            }, 
          ], 
        },
        imgAttr: {
          src: image("winners/cup.png"),
        }
      },     
      img: {
        sourceData:{
          sources: [
            {
              srcSet: `${image("winners/people/ElenaVoitovich.webp")} 1x, ${image("winners/people/ElenaVoitovich-m@2x.webp")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`,
              type:"image/webp"
            },
            {
              srcSet: `${image("winners/people/ElenaVoitovich.png")} 1x, ${image("winners/people/ElenaVoitovich-m@2x.png")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`
            },
            {
              srcSet: image("winners/people/ElenaVoitovich.webp"),
              type:"image/webp"
            }, 
          ], 
        },
        imgAttr: {
          src: image("winners/ElenaVoitovich.png"),
        }
      },     
    },
    {
      name: 'Роман',
      surname: 'Варганов',
      prize: '1 000 000 ₽ ', 
      video: 'https://rutube.ru/play/embed/5415c033db387d544d3ba239f793baee/', 
      icon: {
        sourceData:{
          sources: [
            {
              srcSet: `${image("winners/cup.webp")} 1x, ${image("winners/cup-m@2x.webp")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`,
              type:"image/webp"
            },
            {
              srcSet: `${image("winners/cup.png")} 1x, ${image("winners/cup-m@2x.png")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`
            },
            {
              srcSet: image("winners/cup.webp"),
              type:"image/webp"
            }, 
          ], 
        },
        imgAttr: {
          src: image("winners/cup.png"),
        }
      },     
      img: {
        sourceData:{
          sources: [
            {
              srcSet: `${image("winners/people/RomanVarganov.webp")} 1x, ${image("winners/people/RomanVarganov-m@2x.webp")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`,
              type:"image/webp"
            },
            {
              srcSet: `${image("winners/people/RomanVarganov.png")} 1x, ${image("winners/people/RomanVarganov-m@2x.png")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`
            },
            {
              srcSet: image("winners/people/RomanVarganov.webp"),
              type:"image/webp"
            }, 
          ], 
        },
        imgAttr: {
          src: image("winners/RomanVarganov.png"),
        }
      },     
    },
  ]
}
export const results = {
  title: 'Итоги 2021 года', 
  button: {
    target: '_blank',
    className:"customButton_yellow",
    tag: 'a',
    text: "Участвовать",
    href: "https://www.stoloto.ru/"
  },
  back: {
    modifier: 'back', 
    sourceData:{
      sources: [
        {
          srcSet: `${image("results/bg-m.webp")} 1x, ${image("results/bg-m@2x.webp")} 2x`, 
          media: `(max-width: ${NOT_MOB - 1}px)`,
          type:"image/webp"
        },
        {
          srcSet: `${image("results/bg-m.png")} 1x, ${image("results/bg-m@2x.png")} 2x`, 
          media: `(max-width: ${NOT_MOB - 1}px)`
        },
        {
          srcSet: image("results/bg.webp"),
          type:"image/webp"
        }, 
      ], 
    },
    imgAttr: {
      src: image("results/bg.png"),
    }
  },
  bgItems: [
    {
      modifier: 'rocket', 
      sourceData:{
        sources: [
          {
            srcSet: image("results/rocket.webp"),
            type:"image/webp"
          }, 
        ], 
      },
      imgAttr: {
        src: image("results/rocket.png"),
      }
    },
    {
      modifier: 'star1', 
      sourceData:{
        sources: [
          {
            srcSet: image("results/star1.webp"),
            type:"image/webp"
          }, 
        ], 
      },
      imgAttr: {
        src: image("results/star1.png"),
      }
    },
    {
      modifier: 'star2', 
      sourceData:{
        sources: [
          {
            srcSet: image("results/star2.webp"),
            type:"image/webp"
          }, 
        ], 
      },
      imgAttr: {
        src: image("results/star2.png"),
      }
    },
    {
      modifier: 'star3', 
      sourceData:{
        sources: [
          {
            srcSet: image("results/star3.webp"),
            type:"image/webp"
          }, 
        ], 
      },
      imgAttr: {
        src: image("results/star3.png"),
      }
    },
    {
      modifier: 'star4', 
      sourceData:{
        sources: [
          {
            srcSet: image("results/star4.webp"),
            type:"image/webp"
          }, 
        ], 
      },
      imgAttr: {
        src: image("results/star4.png"),
      }
    },
  ],
  
  sticker: [{
    img: '/images/stickers/stickerRocket',
  }
  ], 
  resultsList: [
    {
      img: {
        sourceData:{
        sources: [
          {
            srcSet: `${image("results/list/res1-m.webp")} 1x, ${image("results/list/res1-m@2x.webp")} 2x`, 
            media: `(max-width: ${NOT_MOB - 1}px)`,
            type:"image/webp"
          },
          {
            srcSet: `${image("results/list/res1-m.png")} 1x, ${image("results/list/res1-m@2x.png")} 2x`, 
            media: `(max-width: ${NOT_MOB - 1}px)`
          },
          {
            srcSet: image("results/list/res1.webp"),
            type:"image/webp"
          }, 
        ], 
      },
      imgAttr: {
          src: image("results/list/res1.png"),
        }
      },
      title: '>169 ',
      num: 'млн', 
      text: 'билетов куплено',
      mod: 'keyboard'
    },
    {
     img: {
        sourceData:{
        sources: [
          {
            srcSet: `${image("results/list/res2-m.webp")} 1x, ${image("results/list/res2-m@2x.webp")} 2x`, 
            media: `(max-width: ${NOT_MOB - 1}px)`,
            type:"image/webp"
          },
          {
            srcSet: `${image("results/list/res2-m.png")} 1x, ${image("results/list/res2-m@2x.png")} 2x`, 
            media: `(max-width: ${NOT_MOB - 1}px)`
          },
          {
            srcSet: image("results/list/res2.webp"),
            type:"image/webp"
          }, 
        ], 
      },
      imgAttr: {
          src: image("results/list/res2.png"),
        }
      },
      title: '~8,4 ', 
      num: 'млрд',
      text: 'рублей выиграно',
      mod: 'cup'
    },
    {
      img: {
        sourceData:{
        sources: [
          {
            srcSet: `${image("results/list/res3-m.webp")} 1x, ${image("results/list/res3-m@2x.webp")} 2x`, 
            media: `(max-width: ${NOT_MOB - 1}px)`,
            type:"image/webp"
          },
          {
            srcSet: `${image("results/list/res3-m.png")} 1x, ${image("results/list/res3-m@2x.png")} 2x`, 
            media: `(max-width: ${NOT_MOB - 1}px)`
          },
          {
            srcSet: image("results/list/res3.webp"),
            type:"image/webp"
          }, 
        ], 
      },
      imgAttr: {
          src: image("results/list/res3.png"),
        }
      },
      title: '703', 
      text: 'миллионера',
      mod: 'safe'
    },
    {
      img: {
        sourceData:{
        sources: [
          {
            srcSet: `${image("results/list/res4-m.webp")} 1x, ${image("results/list/res4-m@2x.webp")} 2x`, 
            media: `(max-width: ${NOT_MOB - 1}px)`,
            type:"image/webp"
          },
          {
            srcSet: `${image("results/list/res4-m.png")} 1x, ${image("results/list/res4-m@2x.png")} 2x`, 
            media: `(max-width: ${NOT_MOB - 1}px)`
          },
          {
            srcSet: image("results/list/res4.webp"),
            type:"image/webp"
          }, 
        ], 
      },
      imgAttr: {
          src: image("results/list/res4.png"),
        }
      },
      title: '«Русское лото»', 
      text: 'получило премию &laquo;Марка &#8470;&nbsp;1&nbsp;в России&raquo;',
      mod: 'mark'
    },
  ]
}
export const steps = {
    title: 'Как участвовать',
    back: {
      modifier: 'back',
      dataDepth: 1,
      sourceData:{
        sources: [
          {
            srcSet: `${image("instruction/bg-m.webp")} 1x, ${image("instruction/bg-m@2x.webp")} 2x`, 
            media: `(max-width: ${NOT_MOB - 1}px)`,
            type:"image/webp"
          },
          {
            srcSet: `${image("instruction/bg-m.png")} 1x, ${image("instruction/bg-m@2x.png")} 2x`, 
            media: `(max-width: ${NOT_MOB - 1}px)`
          },
          {
            srcSet: image("instruction/bg.webp"),
            type:"image/webp"
          }, 
        ], 
      },
      imgAttr: {
        src: image("instruction/bg.png"),
      }
    },
    bgItems: [
      {
        modifier: 'circle', 
        dataDepth: 1.2,
        sourceData:{
          sources: [
            {
              srcSet: image("instruction/circle.webp"),
              type:"image/webp"
            }, 
          ], 
        },
        imgAttr: {
          src: image("instruction/circle.png"),
        }
      },
      {
        modifier: 'sattelite', 
        dataDepth: 1.6,
        sourceData:{
          sources: [
            {
              srcSet: image("instruction/sattelite.webp"),
              type:"image/webp"
            }, 
          ], 
        },
        imgAttr: {
          src: image("instruction/sattelite.png"),
        }
      },
    ],
  
  steps: [
    {
      img: {
        sourceData:{
          sources: [
            {
              srcSet: `${image("instruction/step1-m.webp")} 1x, ${image("instruction/step1-m@2x.webp")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`,
              type:"image/webp"
            },
            {
              srcSet: `${image("instruction/step1-m.png")} 1x, ${image("instruction/step1-m@2x.png")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`
            },
            {
              srcSet: image("instruction/step1.webp"),
              type:"image/webp"
            }, 
          ], 
        },
        imgAttr: {
          src: image("instruction/step1.png"),
        }
      }, 
      modifier: 'left',
      number: '1', 
      text: 'Выберите билет'
    },
    {
      img: {
        sourceData:{
          sources: [
            {
              srcSet: `${image("instruction/step2-m.webp")} 1x, ${image("instruction/step2-m@2x.webp")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`,
              type:"image/webp"
            },
            {
              srcSet: `${image("instruction/step2-m.png")} 1x, ${image("instruction/step2-m@2x.png")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`
            },
            {
              srcSet: image("instruction/step2.webp"),
              type:"image/webp"
            }, 
          ], 
        },
        imgAttr: {
          src: image("instruction/step2.png"),
        }
      },  
      modifier: 'right',
      trackMod: '2',
      number: '2', 
      text: 'Оплатите картой или другим удобным способом',
      line: '/images/instruction/track1-2.svg'
    },
    {
      img: {
        sourceData:{
          sources: [
            {
              srcSet: `${image("instruction/step3-m.webp")} 1x, ${image("instruction/step3-m@2x.webp")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`,
              type:"image/webp"
            },
            {
              srcSet: `${image("instruction/step3-m.png")} 1x, ${image("instruction/step3-m@2x.png")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`
            },
            {
              srcSet: image("instruction/step3.webp"),
              type:"image/webp"
            }, 
          ], 
        },
        imgAttr: {
          src: image("instruction/step3.png"),
        }
      },  
      modifier: 'left',
      trackMod: '3',
      number: '3', 
      text: 'Смотрите трансляцию розыгрыша или проверьте билет на&nbsp;сайте',
      href: 'stoloto.ru',
      line: '/images/instruction/track2-3.svg'
    },
    {
      img: {
        sourceData:{
          sources: [
            {
              srcSet: `${image("instruction/step4-m.webp")} 1x, ${image("instruction/step4-m@2x.webp")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`,
              type:"image/webp"
            },
            {
              srcSet: `${image("instruction/step4-m.png")} 1x, ${image("instruction/step4-m@2x.png")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`
            },
            {
              srcSet: image("instruction/step4.webp"),
              type:"image/webp"
            }, 
          ], 
        },
        imgAttr: {
          src: image("instruction/step4.png"),
        }
      }, 
      modifier: 'right',
      trackMod: '4',
      number: '4', 
      text: 'Насладитесь ожиданием, предвкушением&nbsp;и, возможно, радостью победы',
      line: '/images/instruction/track3-4.svg'
    }
  ],
  button: {
    target: '_blank',
    className:"customButton_yellow",
    tag: 'a',
    text: "Участвовать",
    href: "https://www.stoloto.ru/"
  }
}
export const buy = {
  video: `/images/buy/rules.mp4`,
  title: 'Покупайте билеты лотереи онлайн&nbsp;&mdash; это безопасно',
  
  bgItems: [
    {
      modifier: 'back', 
      sourceData:{
          sources: [
            {
              srcSet: `${image("buy/bg-m.webp")} 1x, ${image("buy/bg-m@2x.webp")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`,
              type:"image/webp"
            },
            {
              srcSet: `${image("buy/bg-m.png")} 1x, ${image("buy/bg-m@2x.png")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`
            },
            {
              srcSet: image("buy/bg.webp"),
              type:"image/webp"
            }, 
          ], 
        },
        imgAttr: {
          src: image("buy/bg.png"),
        }
    }
  ],
  button: {
    target: '_blank',
    className:"customButton_yellow",
    tag: 'a',
    text: "Купить билет",
    href: "https://www.stoloto.ru/"
  }, 
  img: {
    sourceData:{
        sources: [
          {
            srcSet: `${image("buy/videoPreview-m.webp")} 1x, ${image("buy/videoPreview-m@2x.webp")} 2x`, 
            media: `(max-width: ${NOT_MOB - 1}px)`,
            type:"image/webp"
          },
          {
            srcSet: `${image("buy/videoPreview-m.png")} 1x, ${image("buy/videoPreview-m@2x.png")} 2x`, 
            media: `(max-width: ${NOT_MOB - 1}px)`
          },
          {
            srcSet: image("buy/videoPreview.webp"),
            type:"image/webp"
          }, 
        ], 
      },
      imgAttr: {
        src: image("buy/videoPreview.png"),
      }
  }, 
  list: [
    { picModifier: '1',
      icon: "buy/card1Icon",
      modifier: 'safety',
      title: 'безопасная регистрация',
      text: 'При регистрации вы&nbsp;указываете только свой электронный адрес и&nbsp;номер телефона. На&nbsp;этот номер мы&nbsp;будем отправлять вам sms с&nbsp;паролем для получения выигрышей на&nbsp;сайте.',
    },
    {
      picModifier: '2',
      modifier: 'safety',
      icon: "buy/card2Icon", 
      title: 'безопасность данных',
      text: 'Мы&nbsp;не&nbsp;сохраняем номера банковских карт, платёжные пароли и&nbsp;другие данные, которые вы&nbsp;вводите при оплате билетов. Вся информация хранится только на&nbsp;стороне платёжной системы, которую вы&nbsp;выбираете сами.',
      icons:[
        {
          icon:"buy/visa"
        },
        {
          icon:"buy/mastercard"
        },
        {
          icon:"buy/mir"
        }
      ]
    },
    {
      picModifier: '3',
      modifier: 'safety',
      icon: "buy/card3Icon", 
      title: 'Государственные лотереи',
      text: 'Организаторами всех лотерей России являются Министерство спорта и&nbsp;Министерство финансов. Они следят за&nbsp;тем, чтобы все розыгрыши проводились честно, победители вовремя получали выигрыши.',
    },
    {
      picModifier: '4',
      modifier: 'safety',
      icon: "buy/card4Icon", 
      title: 'Ваш билет никогда не&nbsp;потеряется',
      text: 'Вся информация о&nbsp;купленных билетах хранится в&nbsp;вашем личном кабинете. Если возникнут проблемы, вы&nbsp;сможете обратиться в&nbsp;нашу службу поддержки. Мы&nbsp;всегда вам поможем.',
    },
]

}
export const app = {
  title: 'Скачайте мобильное приложение &laquo;Столото&raquo;',
  back: {

    modifier: 'back', 
    sourceData:{
        sources: [
          {
            srcSet: `${image("app/bg-m.webp")} 1x, ${image("app/bg-m@2x.webp")} 2x`, 
            media: `(max-width: ${NOT_MOB - 1}px)`,
            type:"image/webp"
          },
          {
            srcSet: `${image("app/bg-m.png")} 1x, ${image("app/bg-m@2x.png")} 2x`, 
            media: `(max-width: ${NOT_MOB - 1}px)`
          },
          {
            srcSet: image("app/bg.webp"),
            type:"image/webp"
          }, 
        ], 
      },
      imgAttr: {
        src: image("app/bg.png"),
      }
  },
  phone: {
      modifier: 'phone',
      dataDepth: 0.2,
      sourceData:{
          sources: [
            {
              srcSet: `${image("app/phone-m.webp")} 1x, ${image("app/phone-m@2x.webp")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`,
              type:"image/webp"
            },
            {
              srcSet: `${image("app/phone-m.png")} 1x, ${image("app/phone-m@2x.png")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`
            },
            {
              srcSet: image("app/phone.webp"),
              type:"image/webp"
            }, 
          ], 
        },
        imgAttr: {
          src: image("app/phone.png"),
        }
      },
  bgItems: [ 
      {
        modifier: 'circle', 
        dataDepth: 0.5,
        sourceData:{
          sources: [
            {
              srcSet: image("app/circle.webp"),
              type:"image/webp"
            }, 
          ], 
        },
        imgAttr: {
          src: image("app/circle.png"),
        }
      },
      {
        modifier: 'spaceman', 
        dataDepth: 0.8,
        sourceData:{
          sources: [
            {
              srcSet: image("app/spaceman.webp"),
              type:"image/webp"
            }, 
          ], 
        },
        imgAttr: {
          src: image("app/spaceman.png"),
        }
      },
      {
        modifier: 'ellipsePart',
        dataDepth: 0.5, 
        sourceData:{
          sources: [
            {
              srcSet: image("app/ellipsePart.webp"),
              type:"image/webp"
            }, 
          ], 
        },
        imgAttr: {
          src: image("app/ellipsePart.png"),
        }
      },
  ],
  cards: [
    {
      img: {
         sourceData:{
          sources: [
            {
              srcSet: `${image("app/card1Icon.webp")} 1x, ${image("app/card1Icon-m@2x.webp")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`,
              type:"image/webp"
            },
            {
              srcSet: `${image("app/card1Icon.png")} 1x, ${image("app/card1Icon-m@2x.png")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`
            },
            {
              srcSet: image("app/card1Icon.webp"),
              type:"image/webp"
            }, 
          ], 
        },
        imgAttr: {
          src: image("app/card1Icon.png"),
        }
      }, 
      text: 'Удобная и&nbsp;безопасная оплата'
    },
    {
      img: {
         sourceData:{
          sources: [
            {
              srcSet: `${image("app/card2Icon.webp")} 1x, ${image("app/card2Icon-m@2x.webp")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`,
              type:"image/webp"
            },
            {
              srcSet: `${image("app/card2Icon.png")} 1x, ${image("app/card2Icon-m@2x.png")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`
            },
            {
              srcSet: image("app/card2Icon.webp"),
              type:"image/webp"
            }, 
          ], 
        },
        imgAttr: {
          src: image("app/card2Icon.png"),
        }
      }, 
      text: 'Быстрый вывод денег на&nbsp;карту'
    },
    {
      img: {
         sourceData:{
          sources: [
            {
              srcSet: `${image("app/card3Icon.webp")} 1x, ${image("app/card3Icon-m@2x.webp")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`,
              type:"image/webp"
            },
            {
              srcSet: `${image("app/card3Icon.png")} 1x, ${image("app/card3Icon-m@2x.png")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`
            },
            {
              srcSet: image("app/card3Icon.webp"),
              type:"image/webp"
            }, 
          ], 
        },
        imgAttr: {
          src: image("app/card3Icon.png"),
        }
      }, 
      text: 'Лотереи всегда под рукой'
    },
    {
      img: {
         sourceData:{
          sources: [
            {
              srcSet: `${image("app/card4Icon.webp")} 1x, ${image("app/card4Icon-m@2x.webp")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`,
              type:"image/webp"
            },
            {
              srcSet: `${image("app/card4Icon.png")} 1x, ${image("app/card4Icon-m@2x.png")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`
            },
            {
              srcSet: image("app/card4Icon.webp"),
              type:"image/webp"
            }, 
          ], 
        },
        imgAttr: {
          src: image("app/card4Icon.png"),
        }
      },  
      text: 'Push-уведомления о&nbsp;выигрышах'
    },
  ], 
  apps: [
    {
      img: {
         sourceData:{
          sources: [
            {
              srcSet: `${image("app/apple-m.webp")} 1x, ${image("app/apple-m@2x.webp")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`,
              type:"image/webp"
            },
            {
              srcSet: `${image("app/apple-m.png")} 1x, ${image("app/apple-m@2x.png")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`
            },
            {
              srcSet: image("app/apple.webp"),
              type:"image/webp"
            }, 
          ], 
        },
        imgAttr: {
          src: image("app/apple.png"),
        }
      },  
      href: 'https://www.stoloto.ru/mobile-applications'
    },
    {
      img: {
         sourceData:{
          sources: [
            {
              srcSet: `${image("app/android-m.webp")} 1x, ${image("app/android-m@2x.webp")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`,
              type:"image/webp"
            },
            {
              srcSet: `${image("app/android-m.png")} 1x, ${image("app/android-m@2x.png")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`
            },
            {
              srcSet: image("app/android.webp"),
              type:"image/webp"
            }, 
          ], 
        },
        imgAttr: {
          src: image("app/android.png"),
        }
      },  
      href: 'https://www.stoloto.ru/mobile-applications'
    },
    {
      img: {
         sourceData:{
          sources: [
            {
              srcSet: `${image("app/huawei-m.webp")} 1x, ${image("app/huawei-m@2x.webp")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`,
              type:"image/webp"
            },
            {
              srcSet: `${image("app/huawei-m.png")} 1x, ${image("app/huawei-m@2x.png")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`
            },
            {
              srcSet: image("app/huawei.webp"),
              type:"image/webp"
            }, 
          ], 
        },
        imgAttr: {
          src: image("app/huawei.png"),
        }
      }, 
      href: 'https://www.stoloto.ru/mobile-applications'
    }, 
    {
      img: {
         sourceData:{
          sources: [
            {
              srcSet: `${image("app/samsung-m.webp")} 1x, ${image("app/samsung-m@2x.webp")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`,
              type:"image/webp"
            },
            {
              srcSet: `${image("app/samsung-m.png")} 1x, ${image("app/samsung-m@2x.png")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`
            },
            {
              srcSet: image("app/samsung.webp"),
              type:"image/webp"
            }, 
          ], 
        },
        imgAttr: {
          src: image("app/samsung.png"),
        }
      }, 
      href: 'https://www.stoloto.ru/mobile-applications'
    },  
    {
      img: {
         sourceData:{
          sources: [
            {
              srcSet: `${image("app/xiaomi-m.webp")} 1x, ${image("app/xiaomi-m@2x.webp")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`,
              type:"image/webp"
            },
            {
              srcSet: `${image("app/xiaomi-m.png")} 1x, ${image("app/xiaomi-m@2x.png")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`
            },
            {
              srcSet: image("app/xiaomi.webp"),
              type:"image/webp"
            }, 
          ], 
        },
        imgAttr: {
          src: image("app/xiaomi.png"),
        }
      }, 
      href: 'https://www.stoloto.ru/mobile-applications'
    }],

  sticker: [{
    img: '/images/stickers/stickerSpaceman',
    className: 'sticker sticker_spaceman'
  }]
}
export const space = {
    title: 'Победителей будет больше!',
    bgItems: [
      {
        modifier: 'back', 
        sourceData:{
          sources: [
            {
              srcSet: `${image("space/bg-m.webp")} 1x, ${image("space/bg-m@2x.webp")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`,
              type:"image/webp"
            },
            {
              srcSet: `${image("space/bg-m.png")} 1x, ${image("space/bg-m@2x.png")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`
            },
            {
              srcSet: image("space/bg.webp"),
              type:"image/webp"
            }, 
          ], 
        },
        imgAttr: {
          src: image("app/bg.png"),
        }
      }
    ],
    button: {
      target: '_blank',
      className:"customButton_yellow",
      tag: 'a',
      text: "Купить билеты",
      href: "https://www.stoloto.ru/"
    },
    tv: {
      logo: {
        sourceData:{
          sources: [
            {
              srcSet: `${image("ntv.webp")} 1x, ${image("ntv-m@2x.webp")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`,
              type:"image/webp"
            },
            {
              srcSet: `${image("ntv.png")} 1x, ${image("ntv-m@2x.png")} 2x`, 
              media: `(max-width: ${NOT_MOB - 1}px)`
            },
            {
              srcSet: image("ntv.webp"),
              type:"image/webp"
            }, 
          ], 
        },
        imgAttr: {
          src: image("ntv.png"),
        }
    },
    caption: 'Смотрите трансляцию 1435-го тиража 10&nbsp;апреля на&nbsp;НТВ'
    }
      
}


export const closeButton = `${image('closeButton.svg')}`
export const pauseButton = '/images/pauseButton.svg'
export const playBut = '/icons/buy/play.svg'
export const pauseBut = '/icons/buy/pause.svg'
export const footerContent = {
  bgItems: [
    {
      modifier: 'helmet', 
      sourceData:{
        sources: [
          {
            srcSet: image("footer/helmet.webp"),
            type:"image/webp"
          }, 
        ], 
      },
      imgAttr: {
        src: image("footer/helmet.png"),
      }
    },
    {
      modifier: 'star1', 
      sourceData:{
        sources: [
          {
            srcSet: image("footer/star1.webp"),
            type:"image/webp"
          }, 
        ], 
      },
      imgAttr: {
        src: image("footer/star1.png"),
      }
    },
    {
      modifier: 'star2', 
      sourceData:{
        sources: [
          {
            srcSet: image("footer/star2.webp"),
            type:"image/webp"
          }, 
        ], 
      },
      imgAttr: {
        src: image("footer/star2.png"),
      }
    },
    {
      modifier: 'star3', 
      sourceData:{
        sources: [
          {
            srcSet: image("footer/star3.webp"),
            type:"image/webp"
          }, 
        ], 
      },
      imgAttr: {
        src: image("footer/star3.png"),
      }
    },
    {
      modifier: 'star4', 
      sourceData:{
        sources: [
          {
            srcSet: image("footer/star4.webp"),
            type:"image/webp"
          }, 
        ], 
      },
      imgAttr: {
        src: image("footer/star4.png"),
      }
    },
  ],
  orgsText: `Организаторами лотерей являются Министерство спорта&nbsp;РФ и&nbsp;Министерство финансов&nbsp;РФ.`, 
  associationsText:  `&laquo;Столото&raquo; (АО&nbsp;&laquo;ТК&nbsp;&laquo;Центр&raquo;) состоит во&nbsp;Всемирной и&nbsp;Европейской лотерейных ассоциациях (The World Lottery Association и&nbsp;The European Lotteries Association). Это гарантирует соблюдение прав участников, случайность определения победителей, своевременную выплату выигрышей, конфиденциальность личных данных.`,
  associationsCaptions: ['WLA&nbsp;&mdash; международное объединение компаний-операторов государственных лотерей.', 'ELA&nbsp;&mdash; объединение лотерейных компаний из&nbsp;Европы и&nbsp;соседних регионов.'],
  orgsIcons: [
  {
    sourceData:{
      sources: [
        {
          srcSet: `${image("footer/sprortMin-m.webp")} 1x, ${image("footer/sprortMin-m@2x.webp")} 2x`, 
          media: `(max-width: ${NOT_MOB - 1}px)`,
          type:"image/webp"
        },
        {
          srcSet: `${image("footer/sprortMin-m.png")} 1x, ${image("footer/sprortMin-m@2x.png")} 2x`, 
          media: `(max-width: ${NOT_MOB - 1}px)`
        },
        {
          srcSet: image("footer/sprortMin.webp"),
          type:"image/webp"
        }, 
      ], 
    },
    imgAttr: {
      src: image("app/xiaomi.png"),
    }
  },
  {
    sourceData:{
      sources: [
        {
          srcSet: `${image("footer/financeMin-m.webp")} 1x, ${image("footer/financeMin-m@2x.webp")} 2x`, 
          media: `(max-width: ${NOT_MOB - 1}px)`,
          type:"image/webp"
        },
        {
          srcSet: `${image("footer/financeMin-m.png")} 1x, ${image("footer/financeMin-m@2x.png")} 2x`, 
          media: `(max-width: ${NOT_MOB - 1}px)`
        },
        {
          srcSet: image("footer/financeMin.webp"),
          type:"image/webp"
        }, 
      ], 
    },
    imgAttr: {
      src: image("app/xiaomi.png"),
    }
  }
],
  associationsIcon:
  {
    sourceData:{
      sources: [
        {
          srcSet: `${image("footer/associations-m.webp")} 1x, ${image("footer/associations-m@2x.webp")} 2x`, 
          media: `(max-width: ${NOT_MOB - 1}px)`,
          type:"image/webp"
        },
        {
          srcSet: `${image("footer/associations-m.png")} 1x, ${image("footer/associations-m@2x.png")} 2x`, 
          media: `(max-width: ${NOT_MOB - 1}px)`
        },
        {
          srcSet: image("footer/associations.webp"),
          type:"image/webp"
        }, 
      ], 
    },
    imgAttr: {
      src: image("app/xiaomi.png"),
    }
  },
  logo: 'footer/logo', 
  rules: [`Изображение автомобиля может отличаться от&nbsp;разыгрываемого приза в&nbsp;тираже &laquo;Русского лото&raquo; &#8470;&nbsp;1435. Денежный эквивалент автомобиля&nbsp;&mdash; 4&nbsp;990&nbsp;000&nbsp;рублей.`,
  `Фраза &laquo;Джекпот 800&nbsp;000&nbsp;000&nbsp;₽&raquo; указывает на&nbsp;минимальный гарантированный размер средств призового фонда в&nbsp;категории &laquo;Джекпот&raquo;.`,
  `Победитель премии &laquo;Марка &#8470;&nbsp;1&raquo; в&nbsp;России в&nbsp;2021 году в&nbsp;категории &laquo;лотереи&raquo;.`,
  `Фраза &laquo;Победителей будет больше!&raquo; означает, что розыгрыш будет вестись до&nbsp;87-го хода включительно и&nbsp;в&nbsp;таком тираже победителей будет больше, чем в&nbsp;тиражах, в&nbsp;которых розыгрыш ведётся до&nbsp;86-го хода включительно.`,
  `&laquo;ВГЛ 4&nbsp;Спорт&raquo; (алгоритм определения выигрышей &#8470;&nbsp;3), коммерческое наименование&nbsp;&mdash; &laquo;Русское лото&raquo;, срок проведения&nbsp;&mdash; до&nbsp;31.12.2029. Рекламируемый тираж&nbsp;&mdash; &#8470;&nbsp;1435 (розыгрыш 09.04.2022). Информация об&nbsp;организаторе лотереи, о&nbsp;правилах ее&nbsp;проведения, призовом фонде, количестве призов или выигрышей, о&nbsp;сроках, месте и&nbsp;порядке их&nbsp;получения&nbsp;&mdash; на&nbsp;stoloto.ru. Розыгрыши проводятся еженедельно. Выигрыши носят вероятностный характер. 
  Лотерея не&nbsp;является способом заработка и&nbsp;источником дохода. АО&nbsp;&laquo;ТК&nbsp;&laquo;Центр&raquo;, ОГРН 1127746385095, адрес: 109316, 
  Москва, Волгоградский пр-т, д.&nbsp;43, корп.&nbsp;3, этаж&nbsp;10, пом. XXV, ком. 13Б. Реклама.&nbsp;18+`],
  socials: [
    {
      icon: 'footer/vk',
      href: 'https://vk.ru/stoloto'
    },
    {
      icon: 'footer/ok',
      href: 'https://ok.ru/group/51641404162294'
    },
    {
      icon: 'footer/tiktok',
      href: 'https://www.tiktok.com/@stoloto'
    },
    {
      icon: 'footer/rutube',
      href: 'https://rutube.ru/u/stoloto/'
    },
  ]
}