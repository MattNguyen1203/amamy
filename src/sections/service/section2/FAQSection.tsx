import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {IServiceFAQ} from '@/utils/type'

interface Prop {
  faqs: IServiceFAQ[]
}

export function FAQSection({faqs}: Prop) {
  return (
    <div className='w-full max-w-3xl rounded-[1.25rem] bg-[#f5f5f9] p-[1.25rem]'>
      <h2 className='font-montserrat font-bold text-[1.25rem] leading-[1.2] tracking-[-0.04em] text-black mb-[1.25rem]'>
        Câu hỏi thường gặp
      </h2>
      <Accordion
        type='single'
        collapsible
        defaultValue='item-0'
        className='w-full space-y-[0.875rem]'
      >
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className='border-none bg-white rounded-2xl  overflow-hidden p-[1.25rem]'
          >
            <AccordionTrigger className='flex w-full items-center p-0 justify-between text-left hover:no-underline [&[data-state=open]>svg]:rotate-180 [&>svg]:text-[#38B6FF] font-montserrat font-semibold text-[1rem] leading-[1.625rem] tracking-[-0.03em] text-black flex-grow'>
              <span className='leading-[1.625rem] font-normal'>
                {faq.question}
              </span>
            </AccordionTrigger>
            <AccordionContent className='mt-[1.25rem]  text-[#000000CC] text-[0.875rem] p-0'>
              <p className='leading-[1.315rem]'>{faq.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
