/* eslint-disable @typescript-eslint/no-explicit-any */
interface ImageSize {
  thumbnail: string
  'thumbnail-width': number
  'thumbnail-height': number
  medium: string
  'medium-width': number
  'medium-height': number
  medium_large: string
  'medium_large-width': number
  'medium_large-height': number
  large: string
  'large-width': number
  'large-height': number
  '1536x1536': string
  '1536x1536-width': number
  '1536x1536-height': number
  '2048x2048': string
  '2048x2048-width': number
  '2048x2048-height': number
}

export interface IImage {
  ID: number
  id: number
  title: string
  filename: string
  filesize: number
  url: string
  link: string
  alt: string
  author: string
  description: string
  caption: string
  name: string
  status: string
  uploaded_to: number
  date: string
  modified: string
  menu_order: number
  mime_type: string
  type: string
  subtype: string
  icon: string
  width: number
  height: number
  sizes: ImageSize
}
export interface IBanner {
  background_pc: IImage
  background_mobile: IImage
  user_list: IImage[]
  user_number: string
  review_title: string
  title: string
}

export interface IFaq {
  answer: string
  question: string
}

export interface IFaqs {
  title: string
  faqs: IFaq[]
}

interface ImageFlag {
  ID: number
  id: number
  title: string
  filename: string
  filesize: number
  url: string
  link: string
  alt: string
  author: string
  description: string
  caption: string
  name: string
  status: string
  uploaded_to: number
  date: string
  modified: string
  menu_order: number
  mime_type: string
  type: string
  subtype: string
  icon: string
  width: number
  height: number
  sizes: {
    thumbnail: string
    'thumbnail-width': number
    'thumbnail-height': number
    medium: string
    'medium-width': number
    'medium-height': number
    medium_large: string
    'medium_large-width': number
    'medium_large-height': number
    large: string
    'large-width': number
    'large-height': number
    '1536x1536': string
    '1536x1536-width': number
    '1536x1536-height': number
    '2048x2048': string
    '2048x2048-width': number
    '2048x2048-height': number
  }
}

export interface StrengthItem {
  flag: ImageFlag
  title?: string
  header?: string
  subtitle: string
  list_des: {
    description: string
  }[]
}

export interface StrengthsObject {
  title: string
  subtitle: string
  list_strengths: {
    item_1: StrengthItem
    item_2: StrengthItem
    item_3: StrengthItem
  }
}

interface ImageFlag {
  ID: number
  id: number
  title: string
  filename: string
  filesize: number
  url: string
  link: string
  alt: string
  author: string
  description: string
  caption: string
  name: string
  status: string
  uploaded_to: number
  date: string
  modified: string
  menu_order: number
  mime_type: string
  type: string
  subtype: string
  icon: string
  width: number
  height: number
  sizes: {
    thumbnail: string
    'thumbnail-width': number
    'thumbnail-height': number
    medium: string
    'medium-width': number
    'medium-height': number
    medium_large: string
    'medium_large-width': number
    'medium_large-height': number
    large: string
    'large-width': number
    'large-height': number
    '1536x1536': string
    '1536x1536-width': number
    '1536x1536-height': number
    '2048x2048': string
    '2048x2048-width': number
    '2048x2048-height': number
  }
}

interface Link {
  ID: number
  title: string
  slug: string
  content: string
  excerpt: string
  status: string
  type: string
  author: string
  date: string
  modified: string
  categories: any[]
  tags: any[]
  thumbnail: boolean
  meta: {
    _edit_last: string[]
    _edit_lock: string[]
    _thumbnail_id?: string[]
    _cdp_origin?: string[]
    _cdp_origin_site?: string[]
    _cdp_origin_title?: string[]
    _cdp_counter?: string[]
    _wp_old_slug?: string[]
  }
}

interface CountryItem {
  country: string
  flag_img: ImageFlag
  link: Link
}

export interface ShippingServiceObject {
  title: string
  background: ImageFlag
  hotline: string
  background2: ImageFlag
  list_country: CountryItem[]
}

export interface ImageIcon {
  ID: number
  id: number
  title: string
  filename: string
  filesize: number
  url: string
  link: string
  alt: string
  author: string
  description: string
  caption: string
  name: string
  status: string
  uploaded_to: number
  date: string
  modified: string
  menu_order: number
  mime_type: string
  type: string
  subtype: string
  icon: string
  width: number
  height: number
  sizes: {
    thumbnail: string
    'thumbnail-width': number
    'thumbnail-height': number
    medium: string
    'medium-width': number
    'medium-height': number
    medium_large: string
    'medium_large-width': number
    'medium_large-height': number
    large: string
    'large-width': number
    'large-height': number
    '1536x1536': string
    '1536x1536-width': number
    '1536x1536-height': number
    '2048x2048': string
    '2048x2048-width': number
    '2048x2048-height': number
  }
}

interface Link {
  ID: number
  title: string
  slug: string
  content: string
  excerpt: string
  status: string
  type: string
  author: string
  date: string
  modified: string
  categories: any[]
  tags: any[]
  thumbnail: boolean
  meta: {
    _edit_last: string[]
    _edit_lock: string[]
    _thumbnail_id?: string[]
    _cdp_origin?: string[]
    _cdp_origin_site?: string[]
    _cdp_origin_title?: string[]
    _cdp_counter?: string[]
    _wp_old_slug?: string[]
  }
}

interface ServiceItem1 {
  icon: ImageIcon
  subtitle: string
  title: string
  description: string
  link: Link
}

interface ServiceItem2 {
  image: ImageIcon
  title: string
  link: Link
}

export interface Card {
  number: string
  unit: string
  title: string
  subtitle_2: string
  number_percent: string
  title_2: string
}

export interface ServicesObject {
  list_service_1: ServiceItem1[]
  list_service_2: ServiceItem2[]
  card: Card
}

interface Meta {
  _acf_changed: boolean
  footnotes: string
  _edit_last: string[]
  _edit_lock: string[]
  _thumbnail_id?: string[]
  _cdp_origin?: string[]
  _cdp_origin_site?: string[]
  _cdp_origin_title?: string[]
  _cdp_counter?: string[]
  _wp_old_slug?: string[]
}

interface NewsItem {
  ID: number
  title: string
  slug: string
  content: string
  excerpt: string
  status: string
  type: string
  author: string
  date: string
  modified: string
  categories: string[]
  tags: string[]
  thumbnail: string
  meta: Meta
}
export interface ListNewsObject {
  post: NewsItem[]
  year: string
  name_event: string
}
export interface NewsObject {
  title: string
  subtitle: string
  tag_title_pc: string
  tag_title_mb: string
  list_news_event: ListNewsObject
}

export interface IHomePage {
  banner: IBanner
  faq: IFaqs
  section3: StrengthsObject
  section_country: ShippingServiceObject
  services: ServicesObject
  withDHS: NewsObject
}

export interface Guid {
  rendered: string
}

export interface Title {
  rendered: string
}

export interface Content {
  rendered: string
  protected: boolean
}

export interface Excerpt {
  rendered: string
  protected: boolean
}

export interface Image {
  ID: number
  id: number
  title: string
  filename: string
  filesize: number
  url: string
  link: string
  alt: string
  author: string
  description: string
  caption: string
  name: string
  status: string
  uploaded_to: number
  date: string
  modified: string
  menu_order: number
  mime_type: string
  type: string
  subtype: string
  icon: string
  width: number
  height: number
  sizes: Record<string, string | number>
}

export interface ListInformation {
  number: string
  title: string
  description: string
  label: string
}

export interface Banner {
  subtitle: string
  title: string
  list_infomation: ListInformation[]
}

export interface AmamySpecial {
  title: string
  description: string
  image: Image
}

export interface ListQuality {
  image: Image
  subtitle: string
  title: string
  description: string
}

export interface AmamyQuality {
  title: string
  description: string
  list_quality: ListQuality[]
}

export interface AmamyServiceItem {
  title: string
  description: string
}

export interface AmamyService {
  title: string
  phone: string
  list_amamy_service: AmamyServiceItem[]
}

export interface OurJourneyItem {
  post: string
  year: string
  name_event: string
}

export interface OurJourney {
  title: string
  subtitle: string
  tag_title_pc: string
  tag_title_mb: string
  list_news_event: OurJourneyItem[]
}

export interface AmamyData {
  amamy_service: AmamyService
  our_journey: OurJourney
}

export interface Acf {
  banner: Banner
  amamy_special: AmamySpecial
  amamy_quality: AmamyQuality
  amamy_service: AmamyService
  our_journey: OurJourney
}

export interface AboutWPResponse {
  banner: Banner
  amamy_special: AmamySpecial
  amamy_quality: AmamyQuality
  amamy_service: AmamyService
  withDHS: NewsObject
}

export interface Banner {
  title: string
  description: string
  image: Image
}

export interface TalkToAi {
  title: string
  description: string
  button_text: string
  link: string
}

export interface Service {
  title: string
  description: string
  icon: string
}

export interface ListServices {
  title: string
  services: Service[]
}

export interface Feedback {
  customer_name: string
  feedback_text: string
  rating: number
}

export interface FeedbackCustomer {
  title: string
  feedbacks: Feedback[]
}

export interface Image {
  url: string
  alt: string
}

export interface IServiceData {
  banner: Banner
  talk_to_ai: TalkToAi
  list_services: ListServices
  feedback_customer: FeedbackCustomer
}

export interface ListServicesData {
  list_services_data: any | null
}

export interface IServiceFAQ {
  question: string
  answer: string
}

export interface IServicePage {
  banner: {
    title: string
    sub_title: string
  }
  talk_to_ai: {
    title: string
    subtitle: string
    box_chat: {
      title: string
      customer_chat: string
      ai_chat: string
    }
    list_faq: IServiceFAQ[]
  }
  list_services: {
    title: string
    phone: string
  }
  feedback_customer: {
    title: string
    subtitle: string
    list_feedback: Feedback[]
  }
}

export interface Feedback {
  ID: number
  title: string
  slug: string
  content: string
  excerpt: string
  status: string
  type: string
  author: {
    name: string
    position: string
    avatar: Image
  }
  date: string
  modified: string
  categories: string[]
  tags: string[]
  thumbnail: boolean
  rating: number
}

export interface ServiceLink {
  title: string
  url: string
  target: string
}

export interface ServiceData {
  icons: string
  subtitle: string
  title: string
  description: string
  link: ServiceLink
}

export interface IListServiceResponse {
  data: {
    list_services_data: ServiceData[]
  }
  message: string
  status: number
}
export interface Post {
  title: string
  date: string
  slug: string
  image: Image
  categories: string
}

export interface IBlogResponse {
  total_items: number
  current_paged: number
  total_paged: number
  posts: Post[]
}
