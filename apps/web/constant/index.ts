//NAVIGATION
export const NAV_LINKS = [
  { href: '/', key: 'home', label: 'Home' },
  { href: '/products', key: 'product', label: 'Product' },
  { href: '/custom-product', key: 'custom', label: 'Custom' },
  {
    href: '/',
    key: 'about-us',
    label: 'About Us',
    subNav: [
      { subHref: '/', subKey: 'story', subLabel: 'Story' },
      { subHref: '/', subKey: 'store', subLabel: 'Store' },
      { subHref: '/', subKey: 'blog-workshop', subLabel: 'Blog Workshop' },
    ],
  },
];

//CONTACT
export const SOCIAL_ICON_LINKS = [
  { href: '/', icon: '/tokopedia.svg' },
  { href: '/', icon: '/shopee.svg' },
  { href: '/', icon: '/whatsapp.svg' },
];

//COFFEESHOP
export const COFFEESHOP_CLIENT = [
  { href: '/', label: 'COFFEESHOP', image: '/Coffeeshop/coffeeshop1.jpg' },
  { href: '/', label: 'COFFEESHOP', image: '/Coffeeshop/coffeeshop2.jpg' },
  { href: '/', label: 'COFFEESHOP', image: '/Coffeeshop/coffeeshop3.png' },
];

//PARTNERSHIP
export const PARTNERSHIP1 = [
  { logo: '/Partnership/cust1.PNG' },
  { logo: '/Partnership/cust2.PNG' },
  { logo: '/Partnership/cust3.PNG' },
  { logo: '/Partnership/cust4.PNG' },
  { logo: '/Partnership/cust5.PNG' },
  { logo: '/Partnership/cust6.PNG' },
];

export const PARTNERSHIP2 = [
  { logo: '/Partnership/cust7.PNG' },
  { logo: '/Partnership/cust8.PNG' },
  { logo: '/Partnership/cust9.PNG' },
  { logo: '/Partnership/cust10.PNG' },
  { logo: '/Partnership/cust11.PNG' },
  { logo: '/Partnership/cust12.PNG' },
];

//TESTIMONIAL
export const TESTIMONIAL = [
  {
    name: 'Customer',
    description:
      'Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum',
    image: '/rafi.jpeg',
  },
  {
    name: 'Customer',
    description:
      'Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum',
    image: '/nopal.PNG',
  },
  {
    name: 'Customer',
    description:
      'Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum',
    image: '/rafi.jpeg',
  },
  {
    name: 'Customer',
    description:
      'Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum',
    image: '/nopal.PNG',
  },
];

//FOOTER
export const FOOTER_ABOUT = [
  {
    title: 'Tentang Patera',
    description:
      'Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem',
    social: '/instagram.svg',
    admin: 'Admin Page' 
  },
];

export const DEVELOPER_TEAM = [
  { title: 'Developer Team', email: 'developer@gmail.com'},
];

export const PATERA_STORE = [
  {
    title: 'Patera Store',
    address:
      'Gg. Ledok Tukangan Blok DN 2 No.243, RT.02/RW.01, Tegal Panggung, Kec. Danurejan, Kota Yogyakarta, Daerah Istimewa Yogyakarta 55212',
    contact: '0821-1001-2575',
  },
];

//PRODUCTS
export const SAMPLE_PRODUCT = [
  { image: '/Collection/Vase_Cup.jpg', name: 'Choco Milk' },
  { image: '/Collection/Vase_Cup.jpg', name: 'Choco Milk' },
  { image: '/Collection/Vase_Cup.jpg', name: 'Choco Milk' },
  { image: '/Collection/Vase_Cup.jpg', name: 'Choco Milk' },
  { image: '/Collection/Vase_Cup.jpg', name: 'Choco Milk' },
];

//SAMPLE PRODUCT ID
export const SAMPLE_PRODUCT_ID = [
  { image: '/Collection/Vase_Cup.jpg', name: 'Vase Cup' },
];
