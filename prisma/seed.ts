import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL ?? 'file:./dev.db',
  authToken: process.env.DATABASE_AUTH_TOKEN,
})
const prisma = new PrismaClient({ adapter, log: ['error', 'warn'] })

const img = (files: string[]) =>
  JSON.stringify(files.map((f) => `/images/products/${f}`))

async function main() {
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()

  // ─── Categories ────────────────────────────────────────────────────────────

  const festo = await prisma.category.create({
    data: {
      name: 'شیرهای پنوماتیک فستو',
      slug: 'festo-pneumatic',
      description: 'شیرهای برقی و پنوماتیک برند فستو آلمان — انواع شیر MFH، VUVG، CPE و سری‌های دیگر',
    },
  })

  const rexroth = await prisma.category.create({
    data: {
      name: 'شیرهای برقی رکسروت',
      slug: 'rexroth',
      description: 'شیرهای کنترل جهت هیدرولیک و پنوماتیک برند بوش رکسروت — سری 4WE، 4WEH، M3SE',
    },
  })

  const saginomiya = await prisma.category.create({
    data: {
      name: 'پرشرسوئیچ ساژینومیا',
      slug: 'saginomiya',
      description: 'پرشرسوئیچ و سوئیچ فشار برند ساژینومیا ژاپن — نماینده فروش در ایران',
    },
  })

  const asco = await prisma.category.create({
    data: {
      name: 'شیرهای برقی آسکو',
      slug: 'asco',
      description: 'شیرهای برقی برند ASCO آمریکا — نماینده و توزیع‌کننده رسمی در ایران',
    },
  })

  const airtac = await prisma.category.create({
    data: {
      name: 'محصولات آیرتک',
      slug: 'airtac',
      description: 'شیرهای برقی و پنوماتیک، واحدهای مراقبت و جک‌های برند AirTAC و IRTEC',
    },
  })

  const shako = await prisma.category.create({
    data: {
      name: 'شیرهای پنوماتیک شاکو',
      slug: 'shako',
      description: 'شیرهای برقی و پنوماتیک برند Shako تایوان — انواع شیر سلونوئیدی و واحد مراقبت',
    },
  })

  const unid = await prisma.category.create({
    data: {
      name: 'شیرهای برقی یونید',
      slug: 'unid',
      description: 'شیرهای سلونوئیدی برند UNID — توزیع و فروش در ایران',
    },
  })

  const norgren = await prisma.category.create({
    data: {
      name: 'شیرهای پنوماتیک نورگرن',
      slug: 'norgren',
      description: 'شیرهای پنوماتیک، رگولاتور و واحدهای مراقبت برند Norgren انگلستان',
    },
  })

  const lmcAclOde = await prisma.category.create({
    data: {
      name: 'شیرهای برقی LMC، ACL و ODE',
      slug: 'lmc-acl-ode',
      description: 'شیرهای سلونوئیدی برندهای LMC، ACL و ODE — شامل مدل‌های استاندارد و ضدانفجار',
    },
  })

  const filtration = await prisma.category.create({
    data: {
      name: 'واحدهای فیلتراسیون',
      slug: 'filtration',
      description: 'واحدهای مراقبت (فیلتر، رگولاتور، روغن‌زن) برندهای مختلف',
    },
  })

  const jacks = await prisma.category.create({
    data: {
      name: 'جک‌های پنوماتیک',
      slug: 'pneumatic-jacks',
      description: 'جک‌های پنوماتیک کامپکت و استوانه‌ای برندهای LMC، TN، AirControl و طرح فستو',
    },
  })

  // ─── Products ──────────────────────────────────────────────────────────────

  // Festo
  await prisma.product.createMany({
    data: [
      {
        name: 'شیر برقی فستو MFH-5/2-D-1-C',
        slug: 'festo-mfh-5-2-d-1-c',
        sku: 'MFH-5/2-D-1-C',
        description: 'شیر سلونوئیدی ۵/۲ طرفه برند فستو آلمان با اتصال M5. مناسب برای کنترل جک‌های پنوماتیک. ولتاژ: 24VDC / 220VAC. طراحی ماژولار و قابلیت نصب روی منیفولد.',
        price: 0, stock: 1, featured: true, categoryId: festo.id,
        images: img(['festo-valve.jpg']),
      },
      {
        name: 'شیر برقی فستو MFH-3-1/4',
        slug: 'festo-mfh-3-1-4',
        sku: 'MFH-3-1/4',
        description: 'شیر سلونوئیدی ۳/۲ طرفه فستو با اتصال ۱/۴ اینچ. مناسب برای سیستم‌های هوای فشرده صنعتی. نرمال بسته (NC). ولتاژ: 24VDC.',
        price: 0, stock: 1, featured: true, categoryId: festo.id,
        images: img(['festo-valve.jpg']),
      },
      {
        name: 'شیر برقی فستو VUVG-L10-M52-AT-M7',
        slug: 'festo-vuvg-l10-m52-at-m7',
        sku: 'VUVG-L10-M52-AT-M7',
        description: 'شیر سلونوئیدی سری VUVG فستو با اتصال M7. مناسب نصب روی منیفولد MPA. وزن سبک، کمپکت، ایده‌آل برای اتوماسیون دقیق.',
        price: 0, stock: 1, featured: false, categoryId: festo.id,
        images: img(['festo-valve.jpg']),
      },
      {
        name: 'شیر برقی فستو CPE14-M1BH-5/3E-1/8',
        slug: 'festo-cpe14-m1bh-5-3e-1-8',
        sku: 'CPE14-M1BH-5/3E-1/8',
        description: 'شیر سری CPE فستو، ۵/۳ طرفه با وضعیت میانی تخلیه. اتصال ۱/۸ اینچ. مناسب برای کنترل جک‌های دوطرفه با توقف در موقعیت مید-استروک.',
        price: 0, stock: 1, featured: false, categoryId: festo.id,
        images: img(['festo-valve.jpg']),
      },
      {
        name: 'رگولاتور فشار فستو LFR-D-MINI',
        slug: 'festo-lfr-d-mini',
        sku: 'LFR-D-MINI',
        description: 'رگولاتور فشار سری MINI فستو با فیلتر یکپارچه. اتصال ۱/۸ و ۱/۴ اینچ. دامنه تنظیم: ۰.۱ تا ۱۲ بار. با گیج فشار.',
        price: 0, stock: 1, featured: false, categoryId: festo.id,
        images: img(['festo-care-unit.jpg']),
      },
      {
        name: 'شیر برقی فستو VUVB-ST12-M52-MZD',
        slug: 'festo-vuvb-st12-m52-mzd',
        sku: 'VUVB-ST12-M52-MZD',
        description: 'شیر سلونوئیدی سری VUVB فستو با اتصال M5. طراحی با مصرف انرژی پایین. مناسب برای نصب روی منیفولد و سیستم‌های اتوماسیون کمپکت.',
        price: 0, stock: 1, featured: false, categoryId: festo.id,
        images: img(['festo-valve.jpg']),
      },
    ],
  })

  // Rexroth
  await prisma.product.createMany({
    data: [
      {
        name: 'شیر برقی رکسروت 4WE6D',
        slug: 'rexroth-4we6d',
        sku: '4WE6D',
        description: 'شیر کنترل جهت هیدرولیک رکسروت سری 4WE6، تایپ D. NG6، با سلونوئید یک طرفه. فشار کاری تا ۳۵۰ بار. دبی تا ۶۰ لیتر در دقیقه.',
        price: 0, stock: 1, featured: true, categoryId: rexroth.id,
        images: img(['rexroth-4we6.jpg']),
      },
      {
        name: 'شیر برقی رکسروت 4WE6Y',
        slug: 'rexroth-4we6y',
        sku: '4WE6Y',
        description: 'شیر کنترل جهت هیدرولیک رکسروت سری 4WE6، تایپ Y. NG6، سلونوئید یک طرفه، وضعیت میانی Y. مناسب برای سیستم‌های هیدرولیک صنعتی.',
        price: 0, stock: 1, featured: true, categoryId: rexroth.id,
        images: img(['rexroth-4we6.jpg']),
      },
      {
        name: 'شیر برقی رکسروت 4WE10D',
        slug: 'rexroth-4we10d',
        sku: '4WE10D',
        description: 'شیر کنترل جهت هیدرولیک رکسروت سری 4WE10، NG10. فشار تا ۳۵۰ بار، دبی تا ۱۲۰ لیتر در دقیقه. مناسب برای سیستم‌های پرفشار صنعتی.',
        price: 0, stock: 1, featured: false, categoryId: rexroth.id,
        images: img(['rexroth-4we6.jpg']),
      },
      {
        name: 'شیر برقی رکسروت 4WEH16',
        slug: 'rexroth-4weh16',
        sku: '4WEH16',
        description: 'شیر کنترل جهت هیدرولیک رکسروت با پایلوت داخلی، NG16. مناسب برای جریان‌های بالا تا ۳۵۰ لیتر در دقیقه. ساخت سنگین صنعتی.',
        price: 0, stock: 1, featured: false, categoryId: rexroth.id,
        images: img(['rexroth-4weh16.jpg']),
      },
      {
        name: 'شیر یکطرفه رکسروت M3SE6',
        slug: 'rexroth-m3se6',
        sku: 'M3SE6',
        description: 'شیر یکطرفه قابل کنترل هیدرولیک رکسروت، NG6. مناسب برای قفل کردن سیلندرها در موقعیت‌های حساس. فشار تا ۳۵۰ بار.',
        price: 0, stock: 1, featured: false, categoryId: rexroth.id,
        images: img(['rexroth-4we6.jpg']),
      },
    ],
  })

  // SAGINOMIYA
  await prisma.product.createMany({
    data: [
      {
        name: 'پرشرسوئیچ ساژینومیا SNS-C110X',
        slug: 'saginomiya-sns-c110x',
        sku: 'SNS-C110X',
        description: 'پرشرسوئیچ برند ساژینومیا ژاپن، سری SNS. محدوده فشار: ۱ تا ۱۰ بار. خروجی سوئیچ SPDT. مناسب برای تهویه مطبوع، تبرید و صنایع عمومی.',
        price: 0, stock: 1, featured: true, categoryId: saginomiya.id,
        images: img(['saginomiya.jpg']),
      },
      {
        name: 'پرشرسوئیچ ساژینومیا SPS-C106XQ',
        slug: 'saginomiya-sps-c106xq',
        sku: 'SPS-C106XQ',
        description: 'پرشرسوئیچ دیافراگمی ساژینومیا، سری SPS. مناسب برای فشارهای پایین. محدوده: ۰.۰۵ تا ۶ بار. مقاوم در برابر ضربه و ارتعاش.',
        price: 0, stock: 1, featured: false, categoryId: saginomiya.id,
        images: img(['saginomiya.jpg']),
      },
      {
        name: 'پرشرسوئیچ ساژینومیا FPS-C103WA',
        slug: 'saginomiya-fps-c103wa',
        sku: 'FPS-C103WA',
        description: 'پرشرسوئیچ فشار بالا ساژینومیا، سری FPS. محدوده: تا ۳۰ بار. مناسب برای سیستم‌های هیدرولیک و صنایع سنگین.',
        price: 0, stock: 1, featured: false, categoryId: saginomiya.id,
        images: img(['saginomiya.jpg']),
      },
      {
        name: 'پرشرسوئیچ ساژینومیا ANS-C220XF',
        slug: 'saginomiya-ans-c220xf',
        sku: 'ANS-C220XF',
        description: 'پرشرسوئیچ اتوماتیک ساژینومیا، سری ANS. محدوده: ۰.۵ تا ۲۰ بار. با دیفرانسیال تنظیم‌پذیر. مناسب برای کمپرسورها.',
        price: 0, stock: 1, featured: false, categoryId: saginomiya.id,
        images: img(['saginomiya.jpg']),
      },
    ],
  })

  // ASCO
  await prisma.product.createMany({
    data: [
      {
        name: 'شیر برقی آسکو EF8327G004',
        slug: 'asco-ef8327g004',
        sku: 'EF8327G004',
        description: 'شیر سلونوئیدی آسکو سری 8327، ۲/۲ طرفه، نرمال بسته. اتصال ۱/۴ اینچ. ولتاژ ۲۴VDC. مناسب برای آب، هوا و گازهای خنثی.',
        price: 0, stock: 1, featured: true, categoryId: asco.id,
        images: img(['asco.jpg']),
      },
      {
        name: 'شیر برقی آسکو EF8210G009',
        slug: 'asco-ef8210g009',
        sku: 'EF8210G009',
        description: 'شیر سلونوئیدی آسکو سری 8210، ۲/۲ طرفه، اتصال ۳/۸ اینچ. مناسب برای سیالات مختلف. پوشش استنلس استیل.',
        price: 0, stock: 1, featured: false, categoryId: asco.id,
        images: img(['asco.jpg']),
      },
      {
        name: 'شیر برقی آسکو Red Hat II',
        slug: 'asco-red-hat-2',
        sku: 'RedHat-II',
        description: 'شیر سلونوئیدی معروف Red Hat II آسکو. کلاس F، مقاوم در دماهای بالا. برای بخار، روغن گرم و سیالات داغ صنعتی.',
        price: 0, stock: 1, featured: true, categoryId: asco.id,
        images: img(['asco-2.jpg']),
      },
      {
        name: 'شیر برقی آسکو SCG Series',
        slug: 'asco-scg-series',
        sku: 'SCG-SERIES',
        description: 'شیر سلونوئیدی آسکو سری SCG برای مصارف گازی. مناسب برای گاز طبیعی، پروپان و سایر گازهای صنعتی. طبق استانداردهای EN161.',
        price: 0, stock: 1, featured: false, categoryId: asco.id,
        images: img(['asco-2.jpg']),
      },
    ],
  })

  // AirTAC
  await prisma.product.createMany({
    data: [
      {
        name: 'شیر برقی آیرتک 4V210-08',
        slug: 'airtac-4v210-08',
        sku: '4V210-08',
        description: 'شیر سلونوئیدی ۵/۲ طرفه آیرتک، اتصال ۱/۴ اینچ. ولتاژ: 24VDC / 220VAC. فشار کاری: ۱.۵ تا ۸ بار. مناسب برای اتوماسیون صنعتی.',
        price: 0, stock: 1, featured: true, categoryId: airtac.id,
        images: img(['airtac-valve.jpg']),
      },
      {
        name: 'شیر برقی آیرتک 4V310-10',
        slug: 'airtac-4v310-10',
        sku: '4V310-10',
        description: 'شیر سلونوئیدی ۵/۲ طرفه آیرتک با اتصال ۳/۸ اینچ. سری ۴V300، مناسب برای جریان‌های بالاتر. فشار: ۱.۵ تا ۸ بار.',
        price: 0, stock: 1, featured: false, categoryId: airtac.id,
        images: img(['airtac-valve.jpg']),
      },
      {
        name: 'شیر پنوماتیک آیرتک 2A025-08',
        slug: 'airtac-2a025-08',
        sku: '2A025-08',
        description: 'شیر پنوماتیک ۲/۲ طرفه آیرتک، نرمال بسته. اتصال ۱/۴ اینچ. با تحریک پنوماتیک. مناسب برای محیط‌های انفجاری.',
        price: 0, stock: 1, featured: false, categoryId: airtac.id,
        images: img(['airtac-pneumatic.jpg']),
      },
      {
        name: 'واحد مراقبت آیرتک GC200-08',
        slug: 'airtac-gc200-08',
        sku: 'GC200-08',
        description: 'واحد مراقبت ۳ تایکه آیرتک (فیلتر + رگولاتور + روغن‌زن) اتصال ۱/۴ اینچ. مناسب برای تمیز‌سازی و تنظیم هوای ورودی سیستم‌های پنوماتیک.',
        price: 0, stock: 1, featured: false, categoryId: airtac.id,
        images: img(['airtac-care-unit.jpg']),
      },
    ],
  })

  // Shako
  await prisma.product.createMany({
    data: [
      {
        name: 'شیر برقی شاکو PU220-03',
        slug: 'shako-pu220-03',
        sku: 'PU220-03',
        description: 'شیر سلونوئیدی ۵/۲ طرفه شاکو، اتصال ۳/۸ اینچ. ولتاژ: 24VDC. فشار ۱.۵ تا ۸ بار. مناسب برای کنترل جک‌های پنوماتیک.',
        price: 0, stock: 1, featured: true, categoryId: shako.id,
        images: img(['shako.jpg']),
      },
      {
        name: 'شیر پنوماتیک شاکو CX100',
        slug: 'shako-cx100',
        sku: 'CX100',
        description: 'شیر پنوماتیک پایلوت‌دار شاکو، سری CX. فشار کاری ۱.۵ تا ۱۰ بار. مناسب برای کنترل سیستم‌های هوای فشرده با فشار بالا.',
        price: 0, stock: 1, featured: false, categoryId: shako.id,
        images: img(['shako.jpg']),
      },
      {
        name: 'شیر برقی شاکو PU320-06',
        slug: 'shako-pu320-06',
        sku: 'PU320-06',
        description: 'شیر سلونوئیدی ۵/۳ طرفه شاکو با اتصال ۱/۲ اینچ. وضعیت میانی: فشار بسته. مناسب برای جک‌های دوطرفه با نیاز به قفل موقعیت.',
        price: 0, stock: 1, featured: false, categoryId: shako.id,
        images: img(['shako.jpg']),
      },
    ],
  })

  // UNID
  await prisma.product.createMany({
    data: [
      {
        name: 'شیر برقی یونید UN-7521',
        slug: 'unid-un-7521',
        sku: 'UN-7521',
        description: 'شیر سلونوئیدی یونید، ۲/۲ طرفه نرمال بسته. اتصال ۱/۴ اینچ. ولتاژ: 24VDC / 220VAC. مناسب برای آب، هوا و سیالات خنثی.',
        price: 0, stock: 1, featured: true, categoryId: unid.id,
        images: img(['asco.jpg']),
      },
      {
        name: 'شیر برقی یونید UN-3504',
        slug: 'unid-un-3504',
        sku: 'UN-3504',
        description: 'شیر سلونوئیدی ۳/۲ طرفه یونید، نرمال بسته. مناسب برای سیگنال‌دهی و کنترل سیستم‌های پنوماتیک کوچک. اتصال ۱/۸ اینچ.',
        price: 0, stock: 1, featured: false, categoryId: unid.id,
        images: img(['asco.jpg']),
      },
    ],
  })

  // Norgren
  await prisma.product.createMany({
    data: [
      {
        name: 'شیر پنوماتیک نورگرن V61B513A-A3000',
        slug: 'norgren-v61b513a',
        sku: 'V61B513A-A3000',
        description: 'شیر سلونوئیدی ۵/۲ طرفه نورگرن، سری V61. اتصال ۱/۴ اینچ، ولتاژ 24VDC. طراحی مستحکم برای محیط‌های صنعتی سخت.',
        price: 0, stock: 1, featured: true, categoryId: norgren.id,
        images: img(['norgren-valve.jpg']),
      },
      {
        name: 'رگولاتور فشار نورگرن R07-200-RNBG',
        slug: 'norgren-r07-200-rnbg',
        sku: 'R07-200-RNBG',
        description: 'رگولاتور فشار نورگرن سری R07 با گیج مدور. دامنه تنظیم: ۰.۱ تا ۱۲ بار. اتصال ۱/۴ اینچ. مناسب برای تنظیم دقیق فشار در سیستم‌های پنوماتیک.',
        price: 0, stock: 1, featured: false, categoryId: norgren.id,
        images: img(['norgren-regulator.jpg']),
      },
      {
        name: 'واحد مراقبت نورگرن B07-2GK-AD3',
        slug: 'norgren-b07-2gk-ad3',
        sku: 'B07-2GK-AD3-RMG',
        description: 'واحد مراقبت ۳ تایکه نورگرن سری B07. فیلتر ۵ میکرون + رگولاتور + روغن‌زن. اتصال ۱/۴ اینچ. مناسب برای صنایع مختلف.',
        price: 0, stock: 1, featured: false, categoryId: norgren.id,
        images: img(['norgren-care-unit.jpg']),
      },
      {
        name: 'شیر پنوماتیک نورگرن M/57004/17',
        slug: 'norgren-m57004-17',
        sku: 'M/57004/17',
        description: 'شیر پنوماتیک ۵/۲ طرفه نورگرن با دو پایلوت. اتصال G1/4. مناسب برای سیستم‌هایی که نیاز به ثبت موقعیت (memory) دارند.',
        price: 0, stock: 1, featured: false, categoryId: norgren.id,
        images: img(['norgren-valve.jpg']),
      },
    ],
  })

  // LMC / ACL / ODE
  await prisma.product.createMany({
    data: [
      {
        name: 'شیر برقی LMC سری L212B',
        slug: 'lmc-l212b00',
        sku: 'L212B00',
        description: 'شیر سلونوئیدی LMC ایتالیا، ۲/۲ طرفه نرمال بسته. اتصال ۱/۴ اینچ. مناسب برای سیستم‌های آبی، بخار کم‌فشار و هوا.',
        price: 0, stock: 1, featured: true, categoryId: lmcAclOde.id,
        images: img(['acl.jpg']),
      },
      {
        name: 'شیر برقی LMC سری L325K',
        slug: 'lmc-l325k00',
        sku: 'L325K00',
        description: 'شیر سلونوئیدی LMC، ۳/۲ طرفه. اتصال ۱/۴ اینچ، سری L300. مناسب برای سیستم‌های پنوماتیک کوچک.',
        price: 0, stock: 1, featured: false, categoryId: lmcAclOde.id,
        images: img(['acl.jpg']),
      },
      {
        name: 'شیر برقی ACL E106DH18',
        slug: 'acl-e106dh18',
        sku: 'E106DH18',
        description: 'شیر سلونوئیدی ACL ایتالیا، ۲/۲ طرفه نرمال بسته. اتصال ۱/۴ اینچ. ولتاژ: 24VDC. مناسب برای آب سرد، هوا و گازهای خنثی.',
        price: 0, stock: 1, featured: false, categoryId: lmcAclOde.id,
        images: img(['acl.jpg']),
      },
      {
        name: 'شیر برقی ACL E124DH18T با تایمر',
        slug: 'acl-e124dh18t',
        sku: 'E124DH18T',
        description: 'شیر سلونوئیدی ACL با تایمر داخلی تنظیم‌پذیر. مناسب برای سیستم‌های آبیاری و کنترل تخلیه. اتصال ۱/۴ اینچ.',
        price: 0, stock: 1, featured: false, categoryId: lmcAclOde.id,
        images: img(['acl.jpg']),
      },
      {
        name: 'شیر برقی ODE 21A2KOB190',
        slug: 'ode-21a2kob190',
        sku: '21A2KOB190',
        description: 'شیر سلونوئیدی ODE ایتالیا، ۲/۲ طرفه نرمال بسته. پیستون از جنس استنلس استیل. مناسب برای آب، هوا، روغن و مایعات صنعتی.',
        price: 0, stock: 1, featured: false, categoryId: lmcAclOde.id,
        images: img(['ode-explosion.jpg']),
      },
      {
        name: 'شیر برقی ODE ضدانفجار EExm',
        slug: 'ode-explosion-proof',
        sku: 'ODE-EExm',
        description: 'شیر سلونوئیدی ضدانفجار ODE با استاندارد ATEX. مناسب برای محیط‌های خطر گاز و بخار قابل اشتعال. گروه II، دسته T3-T6.',
        price: 0, stock: 1, featured: false, categoryId: lmcAclOde.id,
        images: img(['ode-explosion.jpg']),
      },
    ],
  })

  // Filtration Units
  await prisma.product.createMany({
    data: [
      {
        name: 'واحد مراقبت آیرتک AW2000-02',
        slug: 'filtration-airtac-aw2000',
        sku: 'AW2000-02',
        description: 'فیلتر-رگولاتور آیرتک سری AW2000، اتصال ۱/۴ اینچ. فیلتر ۵ میکرون با رگولاتور یکپارچه و گیج فشار. سبک و کمپکت.',
        price: 0, stock: 1, featured: true, categoryId: filtration.id,
        images: img(['airtac-care-unit.jpg']),
      },
      {
        name: 'واحد مراقبت طرح آلمانی BFR2000',
        slug: 'filtration-bfr2000',
        sku: 'BFR2000',
        description: 'فیلتر-رگولاتور سری BFR با طراحی آلمانی (مشابه فستو/بوش). اتصال ۱/۴ اینچ. با کاپ شفاف پلاستیکی و تخلیه دستی/اتوماتیک.',
        price: 0, stock: 1, featured: false, categoryId: filtration.id,
        images: img(['german-care-unit.jpg']),
      },
      {
        name: 'واحد مراقبت SMC AC20-02D',
        slug: 'filtration-smc-ac20',
        sku: 'AC20-02D',
        description: 'واحد مراقبت کمپکت SMC سری AC، اتصال ۱/۴ اینچ. دارای تخلیه اتوماتیک. مناسب برای سیستم‌های دقیق اتوماسیون.',
        price: 0, stock: 1, featured: false, categoryId: filtration.id,
        images: img(['smc-care-unit.jpg']),
      },
      {
        name: 'واحد مراقبت طرح فستو LFR-D',
        slug: 'filtration-festo-lfr',
        sku: 'LFR-D-SERIES',
        description: 'واحد مراقبت با طراحی مشابه فستو سری LFR. فیلتر + رگولاتور یکپارچه. اتصال ۱/۴ و ۳/۸ اینچ. گیج آنالوگ.',
        price: 0, stock: 1, featured: false, categoryId: filtration.id,
        images: img(['festo-care-unit.jpg']),
      },
      {
        name: 'واحد مراقبت متال‌ورک Unitec',
        slug: 'filtration-metalwork',
        sku: 'METALWORK-UNITEC',
        description: 'واحد مراقبت ماژولار برند Metalwork ایتالیا، سری Unitec. قابلیت ترکیب فیلتر، رگولاتور و روغن‌زن. اتصال ۱/۴ تا ۱/۲ اینچ.',
        price: 0, stock: 1, featured: false, categoryId: filtration.id,
        images: img(['metalwork-care-unit.jpg']),
      },
      {
        name: 'واحد مراقبت نورگرن B07 Series',
        slug: 'filtration-norgren-b07',
        sku: 'B07-SERIES',
        description: 'واحد مراقبت ماژولار نورگرن سری B07. قابلیت ساخت ست‌های ۲ یا ۳ تایکه. فیلتر ۵ میکرون، رگولاتور و روغن‌زن مجزا.',
        price: 0, stock: 1, featured: false, categoryId: filtration.id,
        images: img(['norgren-care-unit.jpg']),
      },
    ],
  })

  // Pneumatic Jacks
  await prisma.product.createMany({
    data: [
      {
        name: 'جک پنوماتیک کامپکت LMC',
        slug: 'jack-lmc-compact',
        sku: 'LMC-COMPACT',
        description: 'جک پنوماتیک کامپکت LMC با طول کورس ۱۰ تا ۱۰۰ میلیمتر. قطر پیستون: ۳۲ تا ۱۰۰ میلیمتر. پوشش آنودایز و سیل BUNA-N.',
        price: 0, stock: 1, featured: true, categoryId: jacks.id,
        images: img(['jack-lmc.jpg']),
      },
      {
        name: 'جک پنوماتیک سری TN',
        slug: 'jack-tn-series',
        sku: 'TN-SERIES',
        description: 'جک پنوماتیک کامپکت سری TN (استاندارد ISO 21287). قطر: ۱۲ تا ۱۰۰ میلیمتر. کورس تا ۲۰۰ میلیمتر. با قابلیت نصب سنسور مغناطیسی.',
        price: 0, stock: 1, featured: true, categoryId: jacks.id,
        images: img(['jack-tn.jpg']),
      },
      {
        name: 'جک پنوماتیک آیرکنترل',
        slug: 'jack-aircontrol',
        sku: 'AIRCONTROL-CYL',
        description: 'جک پنوماتیک استوانه‌ای برند AirControl، بر اساس استاندارد ISO 15552. قطر: ۳۲ تا ۱۶۰ میلیمتر. مناسب برای صنایع مختلف.',
        price: 0, stock: 1, featured: false, categoryId: jacks.id,
        images: img(['jack-aircontrol.jpg']),
      },
      {
        name: 'جک پنوماتیک طرح فستو DSNU',
        slug: 'jack-festo-design',
        sku: 'DSNU-DESIGN',
        description: 'جک پنوماتیک با طراحی مشابه فستو سری DSNU. کمپکت، قطر ۱۲ تا ۶۳ میلیمتر. کورس استاندارد. اتصالات رویی و انتهایی.',
        price: 0, stock: 1, featured: false, categoryId: jacks.id,
        images: img(['jack-festo.jpg']),
      },
      {
        name: 'دیستریبیوتور جک کامپکت',
        slug: 'jack-distributor',
        sku: 'COMPACT-DIST',
        description: 'دیستریبیوتور (منیفولد) مخصوص جک‌های پنوماتیک کامپکت. ۲ تا ۸ خروجی. امکان کنترل چند جک از یک نقطه. ساخت آلومینیوم آنودایز.',
        price: 0, stock: 1, featured: false, categoryId: jacks.id,
        images: img(['jack-compact.jpg']),
      },
    ],
  })

  console.log('✅ Seed complete — سیال صنعت اپا (با تصاویر واقعی)')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
