export function getRes(lang, key) {
  if (!lang) lang = 'en'

  return resolve(key, res[lang])
}

const res = {
  en: {
    pages: {
      about: {
        title: "On a Mission To Educate Pakistan About Cutting Edge Technologies",
        subtitle: "Crypto, Metaverse, Web 3.0, NFTs and much more"
      }
    },
    nav: {
      about: "About Us"
    }
  },
  ur: {
    pages: {
      about: {
        title: "پاکستان کو جدید ٹیکنولوجی سے اگاہ کرنے کے مشن پر",
        subtitle: "کریپٹو، میٹاورس، ویب ۳، این ایف ٹیز اور بہت کچھ"
      }
    },
    nav: {
      about: "ہمارے بارے میں"
    }
  }
}

function resolve(path, obj=this, separator='.') {
  const properties = Array.isArray(path) ? path : path.split(separator)
  return properties.reduce((prev, curr) => prev && prev[curr], obj)
}