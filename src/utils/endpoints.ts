const endpoints = {
  product: {
    list: '/products',
  },
  contactForm: {
    id: '486',
    unitTag: 'aa5f7bd',
  },
  calculateOrderDelivery: 'tinh-gia-van-chuyen',
  createShippingLabel: 'tao-nhan-gui-hang',
  americaPartner: 'trang-doi-tac-my',
  pageACF: (pageId: number) =>
    `pages/${pageId}?_fields=acf&acf_format=standard`,
  useLabelForm: {
    id: '14394',
    unitTag: 'e84f70e',
  },
  usePickupForm: {
    id: '14393',
    unitTag: '5153e5b',
  },
}

export default endpoints
