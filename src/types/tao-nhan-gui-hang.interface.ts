import {IImage} from '@/utils/type'

export type TuGuiRaKhoType = {
  image: IImage
  note: string
  instruction: string
}

export type TaoNhanGuiHangAcfPageType = {
  data: {
    tu_gui_ra_kho: TuGuiRaKhoType
  }
}

export type DialogConfirmType = 'useLabel' | 'usePickup'
