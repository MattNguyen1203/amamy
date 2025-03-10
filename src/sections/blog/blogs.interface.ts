export interface ICategoryBlog {
  id: number
  slug: string
  name: string
}
export interface IItemPostBlog {
  title: string
  date: string
  slug: string
  image: {
    url: string
    alt: string
  }
  categories: string
}

export interface IFavouriteBlog {
  title: string
  slug: string
  category: string
}
export interface IDetailBlog {
  title: string
  ID: number
  slug: string
  content: string
  excerpt: string
  type: string
  date: string
  categories: string[]
  image: {
    url: string
    alt: string
  }
}
