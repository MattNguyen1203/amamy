interface ImageSize {
    thumbnail: string;
    "thumbnail-width": number;
    "thumbnail-height": number;
    medium: string;
    "medium-width": number;
    "medium-height": number;
    medium_large: string;
    "medium_large-width": number;
    "medium_large-height": number;
    large: string;
    "large-width": number;
    "large-height": number;
    "1536x1536": string;
    "1536x1536-width": number;
    "1536x1536-height": number;
    "2048x2048": string;
    "2048x2048-width": number;
    "2048x2048-height": number;
}

export interface IImage {
    ID: number;
    id: number;
    title: string;
    filename: string;
    filesize: number;
    url: string;
    link: string;
    alt: string;
    author: string;
    description: string;
    caption: string;
    name: string;
    status: string;
    uploaded_to: number;
    date: string;
    modified: string;
    menu_order: number;
    mime_type: string;
    type: string;
    subtype: string;
    icon: string;
    width: number;
    height: number;
    sizes: ImageSize;
}
export interface IBanner {
    background_pc: IImage;
    background_mobile: IImage;
    user_list: IImage[];
    user_number: string;
    review_title: string;
    title: string;
}

export interface IFaq {
    title: string
}

export interface IFaqs {
    answer: string
    question: string
}

interface ImageFlag {
    ID: number;
    id: number;
    title: string;
    filename: string;
    filesize: number;
    url: string;
    link: string;
    alt: string;
    author: string;
    description: string;
    caption: string;
    name: string;
    status: string;
    uploaded_to: number;
    date: string;
    modified: string;
    menu_order: number;
    mime_type: string;
    type: string;
    subtype: string;
    icon: string;
    width: number;
    height: number;
    sizes: {
        thumbnail: string;
        'thumbnail-width': number;
        'thumbnail-height': number;
        medium: string;
        'medium-width': number;
        'medium-height': number;
        medium_large: string;
        'medium_large-width': number;
        'medium_large-height': number;
        large: string;
        'large-width': number;
        'large-height': number;
        '1536x1536': string;
        '1536x1536-width': number;
        '1536x1536-height': number;
        '2048x2048': string;
        '2048x2048-width': number;
        '2048x2048-height': number;
    };
}

interface StrengthItem {
    flag: ImageFlag;
    title?: string;
    header?: string;
    subtitle: string;
    list_des: {
        description: string;
    }[];
}

interface StrengthsObject {
    title: string;
    subtitle: string;
    list_strengths: {
        item_1: StrengthItem;
        item_2: StrengthItem;
        item_3: StrengthItem;
    };
}

interface ImageFlag {
    ID: number;
    id: number;
    title: string;
    filename: string;
    filesize: number;
    url: string;
    link: string;
    alt: string;
    author: string;
    description: string;
    caption: string;
    name: string;
    status: string;
    uploaded_to: number;
    date: string;
    modified: string;
    menu_order: number;
    mime_type: string;
    type: string;
    subtype: string;
    icon: string;
    width: number;
    height: number;
    sizes: {
        thumbnail: string;
        'thumbnail-width': number;
        'thumbnail-height': number;
        medium: string;
        'medium-width': number;
        'medium-height': number;
        medium_large: string;
        'medium_large-width': number;
        'medium_large-height': number;
        large: string;
        'large-width': number;
        'large-height': number;
        '1536x1536': string;
        '1536x1536-width': number;
        '1536x1536-height': number;
        '2048x2048': string;
        '2048x2048-width': number;
        '2048x2048-height': number;
    };
}

interface Link {
    ID: number;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    status: string;
    type: string;
    author: string;
    date: string;
    modified: string;
    categories: any[];
    tags: any[];
    thumbnail: boolean;
    meta: {
        _edit_last: string[];
        _edit_lock: string[];
        _thumbnail_id?: string[];
        _cdp_origin?: string[];
        _cdp_origin_site?: string[];
        _cdp_origin_title?: string[];
        _cdp_counter?: string[];
        _wp_old_slug?: string[];
    };
}

interface CountryItem {
    country: string;
    flag_img: ImageFlag;
    link: Link;
}

export interface ShippingServiceObject {
    title: string;
    background: ImageFlag;
    hotline: string;
    background2: ImageFlag;
    list_country: CountryItem[];
}

export interface ImageIcon {
    ID: number;
    id: number;
    title: string;
    filename: string;
    filesize: number;
    url: string;
    link: string;
    alt: string;
    author: string;
    description: string;
    caption: string;
    name: string;
    status: string;
    uploaded_to: number;
    date: string;
    modified: string;
    menu_order: number;
    mime_type: string;
    type: string;
    subtype: string;
    icon: string;
    width: number;
    height: number;
    sizes: {
        thumbnail: string;
        'thumbnail-width': number;
        'thumbnail-height': number;
        medium: string;
        'medium-width': number;
        'medium-height': number;
        medium_large: string;
        'medium_large-width': number;
        'medium_large-height': number;
        large: string;
        'large-width': number;
        'large-height': number;
        '1536x1536': string;
        '1536x1536-width': number;
        '1536x1536-height': number;
        '2048x2048': string;
        '2048x2048-width': number;
        '2048x2048-height': number;
    };
}

interface Link {
    ID: number;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    status: string;
    type: string;
    author: string;
    date: string;
    modified: string;
    categories: any[];
    tags: any[];
    thumbnail: boolean;
    meta: {
        _edit_last: string[];
        _edit_lock: string[];
        _thumbnail_id?: string[];
        _cdp_origin?: string[];
        _cdp_origin_site?: string[];
        _cdp_origin_title?: string[];
        _cdp_counter?: string[];
        _wp_old_slug?: string[];
    };
}

interface ServiceItem1 {
    icon: ImageIcon;
    subtitle: string;
    title: string;
    description: string;
    link: Link;
}

interface ServiceItem2 {
    image: ImageIcon;
    title: string;
    link: Link;
}

export interface Card {
    number: string;
    unit: string;
    title: string;
    subtitle_2: string;
    number_percent: string;
    title_2: string;
}

export interface ServicesObject {
    list_service_1: ServiceItem1[];
    list_service_2: ServiceItem2[];
    card: Card;
}


interface Meta {
    _edit_last: string[];
    _edit_lock: string[];
    _thumbnail_id?: string[];
    _cdp_origin?: string[];
    _cdp_origin_site?: string[];
    _cdp_origin_title?: string[];
    _cdp_counter?: string[];
    _wp_old_slug?: string[];
}

interface NewsItem {
    ID: number;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    status: string;
    type: string;
    author: string;
    date: string;
    modified: string;
    categories: string[];
    tags: string[];
    thumbnail: string;
    meta: Meta;
}

export interface NewsObject {
    title: string;
    subtitle: string;
    tag_title_pc: string;
    tag_title_mb: string;
    list_news: NewsItem[];
}


export interface IHomePage {
    banner: IBanner;
    faq: IFaq;
    faqs: IFaqs[];
    section3: {
        list_strengths: StrengthsObject;
        subtitle: string;
        title: string;
    },
    section_country: ShippingServiceObject,
    services: ServicesObject,
    withDHS: NewsObject
}