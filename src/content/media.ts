import type { HeroMedia, ImageAsset } from "@/types/content";

/**
 * Image + video registry. TEMPORARY stock assets (Pexels / Unsplash / Mixkit) — see public/media/CREDITS.md.
 * To swap a picture: drop the new file into public/media/…, then update src, width, height, alt here
 * (run `node scripts/optimize-image.mjs` to produce the file, width/height and blurDataURL).
 * Creator names marked "See source page" must be verified from the sourceUrl before launch.
 */
export const media = {
  atmoBar: {
    "src": "/media/gallery/bar.webp",
    "width": 1800,
    "height": 1200,
    "alt": "A softly lit backbar of bottles glowing amber behind a dark bar.",
    "blurDataURL": "data:image/webp;base64,UklGRoIAAABXRUJQVlA4IHYAAABQBACdASoYABAAPu1iqk2ppaQiMAgBMB2JZACdMoADVQioS3YzemI3pEIAAP7ursXaEe7fPLUTg/4AiX8hpJeDisIlYbDtESFIIfrK/UBwI9ItkagiCNLU9viqPr2VshmZpG5QHpV0sjX7ghN3TNwCOkDqAAAA",
    "color": "#4c2f10",
    "objectPosition": "50% 50%",
    "credit": {
      "creator": "See source page (Pexels contributor)",
      "sourceUrl": "https://www.pexels.com/photo/11828428/",
      "license": "Pexels License",
      "licenseUrl": "https://www.pexels.com/license/"
    }
  },
  atmoDetail: {
    "src": "/media/gallery/detail.webp",
    "width": 1400,
    "height": 1400,
    "alt": "A small white ceramic dish and wooden chopsticks on a timber table.",
    "blurDataURL": "data:image/webp;base64,UklGRoIAAABXRUJQVlA4IHYAAAAwBQCdASoYABgAPu1oqU+ppiOiKA1RMB2JYwCdMy/Bbrnd/iAKrluMEMZaWUXKDG2eLAD+ntOkfwDbudvdM2WYasenVk70Qobzsf33J/6Vcv03GMv8GLhfIFFDDITbJWCQOtVQB2roxq/crDEYVN/CLTev/AAA",
    "color": "#816c58",
    "objectPosition": "50% 50%",
    "credit": {
      "creator": "See source page (Unsplash contributor)",
      "sourceUrl": "https://unsplash.com/photos/large-p-20891773.jpg",
      "license": "Unsplash License",
      "licenseUrl": "https://unsplash.com/license"
    }
  },
  atmoKitchen: {
    "src": "/media/gallery/kitchen.webp",
    "width": 854,
    "height": 1068,
    "alt": "Noodles tossed in a wok over a roaring gas flame.",
    "blurDataURL": "data:image/webp;base64,UklGRsoAAABXRUJQVlA4IL4AAADwBQCdASoYAB4APu1sqlEppiOiqAqpMB2JbACdMoR/gNKAwPhfEFnKA+d+c5RfDTin/LMekqI5YAD+TBQJz2KxH0dRMJ0/8FbGLoPtIBOrBwd5g6ouCSIVmni5jxvZAGupAHsRzbynK/1WpsqcRPe2F6uwglmCUgSs9tRY1HOCuH0VcUf/GhzisZXsgApPGGBDxs36FQulw8DTjkKeAh/H28rN4MTBePYjxJ/DNh6CihKNj+N4PwyLwLhfMAAA",
    "color": "#72513e",
    "objectPosition": "50% 50%",
    "credit": {
      "creator": "See source page (Pexels contributor)",
      "sourceUrl": "https://www.pexels.com/photo/3054690/",
      "license": "Pexels License",
      "licenseUrl": "https://www.pexels.com/license/"
    }
  },
  atmoPlating: {
    "src": "/media/gallery/plating.webp",
    "width": 1500,
    "height": 2000,
    "alt": "A chef's hand finishing a plated dish in warm kitchen light.",
    "blurDataURL": "data:image/webp;base64,UklGRvAAAABXRUJQVlA4IOQAAACQBgCdASoYACAAPu1uq1EppiOiqAqpMB2JYgCdMoM6Jn/Ur4oAFrQ6PzDZRBVsucTUmZC/aoxfZjUUDEYAAP7BIbD3q18hcAp6KizWDSF2fYbU7nTT7sNSOagVCJK9vnuEyXYbTZmgclgLqeEkb1aq+d2H1AhwOdtxkMu01vP+WAYby1P9fHPlGZj4QSd9O2pFVPMsvV2WHSIPjNUn01fampqM+XUEcxgFVMIGDMmQ+v8IBpXkMXS2ESz8YzTMrdxupyxfm6vnYhLQVUHoSpTclf2WaMupVFgmWiy3HrPol0dwAAA=",
    "color": "#644b2f",
    "objectPosition": "50% 50%",
    "credit": {
      "creator": "See source page (Pexels contributor)",
      "sourceUrl": "https://www.pexels.com/photo/3297884/",
      "license": "Pexels License",
      "licenseUrl": "https://www.pexels.com/license/"
    }
  },
  atmoPour: {
    "src": "/media/gallery/pour.webp",
    "width": 1600,
    "height": 2000,
    "alt": "A hand catching a thin stream of liquid poured from a bottle against a dark background.",
    "blurDataURL": "data:image/webp;base64,UklGRqYAAABXRUJQVlA4IJoAAADQBQCdASoYAB4APu1iq1AppSOisBgIATAdiWYAnTKAAX8rJz5/R4Kxsa4VrLY5s6yWDV83ETcQAP2+5k3lDaYv3USYH1q5SmqA3P369KSVDLdj2qlgSC4FqLuv5SpYHlRKm51g7FLzK4mYoMPSa4Qn+0yaKJ3PSi9PbdPxZOLEAmZtJNqIw6uxKcCw3YOZOIn0z+R69uUyY8AA",
    "color": "#684a30",
    "objectPosition": "50% 50%",
    "credit": {
      "creator": "See source page (Pexels contributor)",
      "sourceUrl": "https://www.pexels.com/photo/12099383/",
      "license": "Pexels License",
      "licenseUrl": "https://www.pexels.com/license/"
    }
  },
  atmoSteam: {
    "src": "/media/gallery/steam.webp",
    "width": 1280,
    "height": 1600,
    "alt": "Steam rising from a dark bowl, backlit against a window.",
    "blurDataURL": "data:image/webp;base64,UklGRqYAAABXRUJQVlA4IJoAAADQBACdASoYAB4APu1eq1CppKOisBgIATAdiUAToAHsMEczRQPnIxkzjJ3nGaws2AD+VHerOxnvI/xtKkpblCwbRaSxxSMKSbN/160tJgy6tJZvhc0b63Fn165NPIohF4omlDtqOzbh5pMhWCsHaO8JSsj3fDrMYvsKcpVxXOg7Dq3KyOtYRQn+I0YrEB0W0Ng83kglRHNjQAAA",
    "color": "#705b40",
    "objectPosition": "50% 50%",
    "credit": {
      "creator": "See source page (Unsplash contributor)",
      "sourceUrl": "https://unsplash.com/photos/L5820105.jpg",
      "license": "Unsplash License",
      "licenseUrl": "https://unsplash.com/license"
    }
  },
  atmoTable: {
    "src": "/media/gallery/table.webp",
    "width": 1635,
    "height": 1090,
    "alt": "Raised glasses of red wine above a candlelit table of shared plates.",
    "blurDataURL": "data:image/webp;base64,UklGRpAAAABXRUJQVlA4IIQAAADwAwCdASoYABAAPu1iqU2ppaOiMAgBMB2JZgCdABcNb9iX7ma55FZAAP6CVmF8GiM/ICruGhV2p08vKHJzpICnj+sP2O7My/yuK8Sw+uoD9cLZYE60KtFLrX+fIevBaZ0Fm6pzV18rOkCdO+5JpITQR+WkRg7vzX6mz9FOUZsKFIwAAAA=",
    "color": "#825a37",
    "objectPosition": "50% 50%",
    "credit": {
      "creator": "See source page (Pexels contributor)",
      "sourceUrl": "https://www.pexels.com/photo/3171201/",
      "license": "Pexels License",
      "licenseUrl": "https://www.pexels.com/license/"
    }
  },
  ctaEvening: {
    "src": "/media/cta/evening.webp",
    "width": 2400,
    "height": 1350,
    "alt": "A long timber table set for dinner, lit by rows of candles.",
    "blurDataURL": "data:image/webp;base64,UklGRnwAAABXRUJQVlA4IHAAAADwAwCdASoYAA4APu1kqU2ppaQiMAgBMB2JaACsLwABY4HQCdMjcIQAAP70MtwruD6KH+Gp5ALT+/tgJN80BGSDdjtwjphDJRe/BesAmUyqejGHgOXlgRHVYl0kgiRFfFRmxgXRIck5Uw39+b94AAAA",
    "color": "#543428",
    "objectPosition": "50% 50%",
    "credit": {
      "creator": "See source page (Pexels contributor)",
      "sourceUrl": "https://www.pexels.com/photo/4992827/",
      "license": "Pexels License",
      "licenseUrl": "https://www.pexels.com/license/"
    }
  },
  dishBlackCod: {
    "src": "/media/dishes/black-cod.webp",
    "width": 1440,
    "height": 1800,
    "alt": "A glazed fish fillet plated on a ceramic dish.",
    "blurDataURL": "data:image/webp;base64,UklGRq4AAABXRUJQVlA4IKIAAABwBQCdASoYAB4APulcp02pJKOiN/VYASAdCWIAnQA7rXqG5DNgcqQBBcrkhH+j+/iI65SAAP7lsyczCzGSpInrbQBzw9BGKSMybMNZcLJ1vkHq/zjJfw6KGPwhtweNDF5KM3+DD5EtM6tU1skJCd16gJlYehQ22jqBon5lN7k03ZbK0oXZhe4UrvUFMdrgBndYSX3FXA0zzPoCsXH7ZJNK+AA=",
    "color": "#5e4f3f",
    "objectPosition": "50% 50%",
    "credit": {
      "creator": "See source page (Pexels contributor)",
      "sourceUrl": "https://www.pexels.com/photo/16064370/",
      "license": "Pexels License",
      "licenseUrl": "https://www.pexels.com/license/"
    }
  },
  dishCheesecake: {
    "src": "/media/dishes/cheesecake.webp",
    "width": 1600,
    "height": 2000,
    "alt": "A slice of matcha Basque cheesecake with a vivid green top on a grey plate.",
    "blurDataURL": "data:image/webp;base64,UklGRqYAAABXRUJQVlA4IJoAAABQBQCdASoYAB4APt1kpE2opqOiN/qoARAbiWwAuwAh3vmMvEgaO8ii8f1seBCxWERtmdAA/ujIXYQjyJROO6b3mMOkAkkYcFhu/yX7pqBGuS4ypItb2cOUh5TT2l10SHCf5Ivm4SSf/5M5uKiu4bkSW+IrYopGc7PVZT27jGVImMmO4/Tfht5GOgPQpPgg+s/4hjtZJtpx7mAA",
    "color": "#5c5440",
    "objectPosition": "50% 50%",
    "credit": {
      "creator": "See source page (Pexels contributor)",
      "sourceUrl": "https://www.pexels.com/photo/29300014/",
      "license": "Pexels License",
      "licenseUrl": "https://www.pexels.com/license/"
    }
  },
  dishDuck: {
    "src": "/media/dishes/duck.webp",
    "width": 2000,
    "height": 1333,
    "alt": "Sliced roast duck with crisp skin and orange segments in a cream bowl.",
    "blurDataURL": "data:image/webp;base64,UklGRpIAAABXRUJQVlA4IIYAAABQBACdASoYABAAPu1iqk2ppaQiMAgBMB2JZgCdMoADK7uYXU9B8VG7APCAAP1T7125dST6pTeW41EmYP5nbop8VmVXyD/tuRFDmoD760s7pZVB2fqAZaN3QCqNj95GSeJHMk3/f1ExGbfiXkiOG2atwvduKZ8mQPxAG7Ql74gkiBemkAAAAA==",
    "color": "#af835d",
    "objectPosition": "50% 50%",
    "credit": {
      "creator": "See source page (Pexels contributor)",
      "sourceUrl": "https://www.pexels.com/photo/28559554/",
      "license": "Pexels License",
      "licenseUrl": "https://www.pexels.com/license/"
    }
  },
  dishDumplings: {
    "src": "/media/dishes/dumplings.webp",
    "width": 1400,
    "height": 1400,
    "alt": "Delicate steamed dumplings topped with a small garnish on a blue-grey plate.",
    "blurDataURL": "data:image/webp;base64,UklGRrAAAABXRUJQVlA4IKQAAABQBQCdASoYABgAPu1wsFKppiSiqAgBMB2JQBOmWOgo0z1UbiK01y8+I3XOwSfcPQkZDAAA/FlCb3G06Qss3En+B/ch4kdAZLp4mjVCBMOxy6H/QXmne2sqbfzFMiTQKVnmuT8P0tobacyrhXCl7+wlxj0YezH6ZKstn3goWJomvM5vcJicHVPVDUj7+a+U2YC1sNObGcAc5znYnd0Neb7fKAAAAA==",
    "color": "#8c7c6b",
    "objectPosition": "50% 50%",
    "credit": {
      "creator": "See source page (Pexels contributor)",
      "sourceUrl": "https://www.pexels.com/photo/36170479/",
      "license": "Pexels License",
      "licenseUrl": "https://www.pexels.com/license/"
    }
  },
  storyChef: {
    "src": "/media/story/chef.webp",
    "width": 1600,
    "height": 2000,
    "alt": "A cook's hands placing a final garnish on a dish in a dark bowl.",
    "blurDataURL": "data:image/webp;base64,UklGRuwAAABXRUJQVlA4IOAAAACwBQCdASoYAB4APu1kqE2ppaOiMAgBMB2JZACsIOZCCfZsScW44P4JPfHpGALC1fvxABbveAAA/ua9HZdFCigjdGJ9Z5xCVH9WnQ5rJ2XwH68jR1Ig1JJjOtIrBZcZ7rR4Hb4Pw9WgUoZK1lCW+GDAi9dQ3SWihdYbvSzrVVE9YynAhsp2157hko/JmjdK1vbLLCd4RL9j0Wdtde6OBM7Xo6fBcPwfWj1w5N+izU47NBP92n2BbJrRxpgXhsTB9lROD3u4/gFzumT/JQuRlfcfP/TrhHPax04NE6mxWwAAAA==",
    "color": "#7e6950",
    "objectPosition": "50% 50%",
    "credit": {
      "creator": "See source page (Pexels contributor)",
      "sourceUrl": "https://www.pexels.com/photo/30507463/",
      "license": "Pexels License",
      "licenseUrl": "https://www.pexels.com/license/"
    }
  },
  storyIngredients: {
    "src": "/media/story/ingredients.webp",
    "width": 1400,
    "height": 1867,
    "alt": "A bunch of fresh herbs tied with twine on dark slate.",
    "blurDataURL": "data:image/webp;base64,UklGRoAAAABXRUJQVlA4IHQAAABwBQCdASoYACAAPuVgpU2pJaOiMAwBIByJYwDM0CG7wlFidMSm0Xiyav7jsfaN5Ge2uV4AAP7r5LZE80UlYYeBE7Qyq0icWSbYUB0g8Mo66j4QRJAziTKqUWd0OSehAbq8KZHa0aWMSUrTbjjSKO9GdqAAAA==",
    "color": "#464e44",
    "objectPosition": "50% 50%",
    "credit": {
      "creator": "See source page (Pexels contributor)",
      "sourceUrl": "https://www.pexels.com/photo/4113887/",
      "license": "Pexels License",
      "licenseUrl": "https://www.pexels.com/license/"
    }
  },
  storyInterior: {
    "src": "/media/story/interior.webp",
    "width": 2200,
    "height": 1467,
    "alt": "A dim dining room with banquette seating and tables laid for the evening under warm light.",
    "blurDataURL": "data:image/webp;base64,UklGRnAAAABXRUJQVlA4IGQAAACQAwCdASoYABAAPu1mq04ppaQiMAgBMB2JQBOgBCm6pQXdZmAAAP7wzLkqc9pTeapkFrbZ8E41/2Ep0zZQ0brv6A3Jgvt1nXbbh9GhGt8Ua8Vdluf5q1f+GNQmKw+j6E4gKsAA",
    "color": "#412616",
    "objectPosition": "50% 50%",
    "credit": {
      "creator": "See source page (Unsplash contributor)",
      "sourceUrl": "https://unsplash.com/photos/4OcwZ7SwsJI",
      "license": "Unsplash License",
      "licenseUrl": "https://unsplash.com/license"
    }
  },
  storyTable: {
    "src": "/media/story/table.webp",
    "width": 2000,
    "height": 1250,
    "alt": "Hands reaching across a candlelit table of shared dishes, seen from above.",
    "blurDataURL": "data:image/webp;base64,UklGRnwAAABXRUJQVlA4IHAAAADQAwCdASoYAA8APu1iqk4ppaQiMAgBMB2JQBOgBH58xi33AKRmNdwA/njVrfRRoWhK6ajtTdE2tyMefJCXek5T1H3uCGtRRR/343YxYckegGkcsP8qfILRUDTnVoI3vDLzDBhG9dWVli8pBIFf2gAA",
    "color": "#977d6a",
    "objectPosition": "50% 50%",
    "credit": {
      "creator": "See source page (Pexels contributor)",
      "sourceUrl": "https://www.pexels.com/photo/5638730/",
      "license": "Pexels License",
      "licenseUrl": "https://www.pexels.com/license/"
    }
  },
} satisfies Record<string, ImageAsset>;

/** Hero video + posters. Replace the files in public/media/hero/ and keep these paths (or edit them). */
export const hero: HeroMedia = {
  "poster": {
    "src": "/media/hero/poster.webp",
    "width": 1920,
    "height": 1080,
    "alt": "A cook tosses food in a wok over a roaring gas flame in a busy kitchen.",
    "blurDataURL": "data:image/webp;base64,UklGRm4AAABXRUJQVlA4IGIAAAAwBACdASoYAA4APu1iqk2ppaQiMAgBMB2JZQC7ACL8s4vm5F+Ota/EPkAA/ghw2+yfnVezf2fz4hTtSOLsbKsKIg+5kwasm++DWDyohen7AcM1mi5EMsKmpMG+ftUICvAAAA==",
    "color": "#362f24",
    "objectPosition": "50% 50%",
    "credit": {
      "creator": "See source page (Pexels contributor)",
      "sourceUrl": "https://www.pexels.com/video/2894888/",
      "license": "Pexels License",
      "licenseUrl": "https://www.pexels.com/license/"
    }
  },
  "posterPortrait": {
    "src": "/media/hero/poster-portrait.webp",
    "width": 540,
    "height": 960,
    "alt": "A cook tosses food in a wok over a roaring gas flame in a busy kitchen.",
    "blurDataURL": "data:image/webp;base64,UklGRuwAAABXRUJQVlA4IOAAAADwBgCdASoYACsAPu1orE8ppiQiJW5hMB2JYgCsL/8DI35eKSbfzumgTN3rEPw+6RiYErZjyfZ+EQnK3aVh8lcAAMoWiqRbmGBnStCkVpIINWYnbh5hQj/XRotL9JSTDmzlzAD9dJtSOL3iZm3BvvTv8N1SmEnZEj+VGylNFQP1oqpbaxnb/hI5dp4238BlXSerloaJ0Nm2oYJg4mLOuYr87UTaek5xmIreF46O2SiLPcb/fOBYlDyEJV+7QmJv10q3ptwSUvzNlw1s1m5d40hqikFGltIgBuz6rUxkWZUAAA==",
    "color": "#544b3a",
    "objectPosition": "50% 50%",
    "credit": {
      "creator": "See source page (Pexels contributor)",
      "sourceUrl": "https://www.pexels.com/video/2894888/",
      "license": "Pexels License",
      "licenseUrl": "https://www.pexels.com/license/"
    }
  },
  "videoLabel": "A cook tosses food in a wok over a roaring gas flame in a busy kitchen.",
  "durationSeconds": 12,
  "variants": {
    "landscape": [
      {
        "src": "/media/hero/tinmo-hero-1080.mp4",
        "type": "video/mp4"
      }
    ],
    "landscapeLite": [
      {
        "src": "/media/hero/tinmo-hero-720.mp4",
        "type": "video/mp4"
      }
    ],
    "portrait": [
      {
        "src": "/media/hero/tinmo-hero-portrait.mp4",
        "type": "video/mp4"
      }
    ]
  },
  "credit": {
    "creator": "See source page (Pexels contributor)",
    "sourceUrl": "https://www.pexels.com/video/2894888/",
    "license": "Pexels License",
    "licenseUrl": "https://www.pexels.com/license/"
  }
};
