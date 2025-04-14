import {NewsObject} from '@/utils/type'

export interface IAbout {
  banner: IBannerAbout
  amamy_special: IAmamySpecialAbout
  amamy_quality: IAmamyQualityAbout
  amamy_service: IAmamyServiceAbout
  list_port: {
    title: string
    posts: {
      title: string
      slug: string
      thumbnail: string
      categories: string[]
      date: string
    }[]
  }
  withDHS: NewsObject
}
export interface IBannerAbout {
  subtitle: string
  title: string
  list_infomation: IBannerAbout_ListInfomation[]
}
export interface IBannerAbout_ListInfomation {
  number: string
  title: string
  description: string
  description_mb: string
  label: string
}
export interface IAmamySpecialAbout {
  title: string
  description: string
  image: {
    url: string
    alt: string
  }
}
export interface IAmamyQualityAbout {
  title: string
  description: string
  list_quality: IAmamyQualityAbout_ListQuality[]
}
export interface IAmamyQualityAbout_ListQuality {
  image: {
    url: string
    alt: string
  }
  subtitle: string
  title: string
  description: string
}
export interface IAmamyServiceAbout {
  title: string
  phone: string
  list_amamy_service: IAmamyServiceAbout_ListAmamyService[]
}
export interface IAmamyServiceAbout_ListAmamyService {
  title: string
  description: string
}
