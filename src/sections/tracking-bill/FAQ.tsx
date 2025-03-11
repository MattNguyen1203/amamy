import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/sections/tracking-bill/accordion'

type FAQProps = {
  dataFAQ?: {
    Title: string
    content: string
  }[]
}

const FAQ = ({dataFAQ}: FAQProps) => {
  return (
    <div className='w-full p-5 xsm:p-4 rounded-[1.25rem] bg-background-elevation20'>
      <h4 className='text-pc-heading20b xsm:text-mb-h2 text-black'>
        Câu hỏi thường gặp
      </h4>
      <Accordion
        type='single'
        collapsible
        className='mt-5 xsm:mt-4 flex flex-col space-y-4'
      >
        {dataFAQ?.map((item, index) => (
          <AccordionItem
            key={index}
            value={`faq-${index}`}
          >
            <AccordionTrigger>{item.Title}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
export default FAQ
