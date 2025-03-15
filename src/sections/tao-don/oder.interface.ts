export interface ICreateOder {
  thumbnail: string
  title: string
  type: string
  id: number
  information?: IInformationOrder
  slug?: string
}
export interface IInformationTimeOrder {
  time_content?: string
  stock?: string
}
export interface IInformationNoteOrder_NoteMore {
  text?: string
  agree_with?: string
}
export interface IInformationNoteOrder {
  Item_that_can_be_sent?: string
  note_more?: IInformationNoteOrder_NoteMore[]
  unable_to_send?: string
  delivery_in_germany_must_read?: string
  cargo_insurance?: string
  closing_policy?: string[]
}
export interface IInformationInstructOrder_SelectBranch {
  title: string
  content: string
}
export interface IInformationInstructOrder {
  packing_instructions?: string
  images?: string
  select_branch?: IInformationInstructOrder_SelectBranch[]
  note_more?: string
  shipping_instructions_image?: string[]
}
export interface IInformationOrder {
  time?: IInformationTimeOrder
  note?: IInformationNoteOrder
  instruct?: IInformationInstructOrder
}
