'use client'
import useStore from '@/app/(store)/store'
import ImageV2 from '@/components/image/ImageV2'
import {Button} from '@/components/ui/button'
import {Checkbox} from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {useScrollToTop} from '@/hooks/useScrollToTop'
import {cn} from '@/lib/utils'
import {
  IInformationNoteOrder,
  IInformationNoteOrder_NoteMore,
} from '@/sections/tao-don/oder.interface'
import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {z} from 'zod'
export default function CeateNote({
  data,
  handleClickcurrentTab,
  type,
}: {
  data?: IInformationNoteOrder
  handleClickcurrentTab: (nextTab: string) => void
  type?: string
}) {
  const FormSchema = z.object({
    be_sent: z.boolean().refine((value) => value === true, {
      message: 'Vui lòng đồng ý với điều khoản của chúng tôi.',
    }),
    note: z.array(
      z.boolean().refine((value) => value === true, {
        message: 'Vui lòng đồng ý với điều khoản của chúng tôi.',
      }),
    ),
    delivery: z.boolean().refine((value) => value === true, {
      message: 'Vui lòng đồng ý với điều khoản của chúng tôi.',
    }),
    cargoinsurance: z.boolean().refine((value) => value === true, {
      message: 'Vui lòng đồng ý với điều khoản của chúng tôi.',
    }),
    closingPolicy: z.boolean().refine((value) => value === true, {
      message: 'Vui lòng đồng ý với điều khoản của chúng tôi.',
    }),
  })
  const {stepOrder, setStepOrder} = useStore((state) => state)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      be_sent:
        stepOrder > 3
          ? true
          : !data?.Item_that_can_be_sent || !data?.unable_to_send,
      note: Array.isArray(data?.note_more)
        ? data?.note_more.map(() => (stepOrder > 3 ? true : false))
        : [],
      delivery: stepOrder > 3 ? true : !data?.delivery_in_germany_must_read,
      cargoinsurance: stepOrder > 3 ? true : !data?.cargo_insurance,
      closingPolicy: stepOrder > 3 ? true : !data?.closing_policy,
    },
  })
  function onSubmit(values: z.infer<typeof FormSchema>) {
    if (stepOrder < 4) {
      setStepOrder(4)
    }
    handleClickcurrentTab('4')
    useScrollToTop()
  }
  return (
    <div className=''>
      <p className='text-black text-pc-sub16b mb-[1.5rem] xsm:mb-[0.75rem]'>
        Lưu ý quan trọng khi gửi hàng
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-[1.5rem] xsm:space-y-[0.75rem]'
        >
          {data?.Item_that_can_be_sent && data?.unable_to_send && (
            <div className='p-[1rem] rounded-[1.25rem] bg-white space-y-[1rem]'>
              {data?.Item_that_can_be_sent && (
                <div>
                  <p className='xsm:text-pc-sub14s mb-[0.3rem] text-black font-montserrat text-[1rem] font-semibold leading-[1.625] tracking-[-0.03rem]'>
                    {type === 'viethan'
                      ? 'Mặt hàng có thể gửi nhưng rủi ro (cần đọc kỹ):'
                      : 'Mặt hàng có thể gửi:'}
                  </p>
                  <div
                    className='[&_h3]:text-pc-tab-title [&_h3]:text-black [&_strong]:text-pc-sub14s [&_strong]:text-black *:text-[rgba(0,0,0,0.90)] *:text-pc-14 *:xsm:text-mb-13 [&_span]:text-pc-sub12s [&_ul]:content-ul [&_ul]:!my-0 marker:[&_ul_li]:text-[rgba(0,0,0,0.80)] [&_ol]:content-ol [&_ol>li]:my-[0.5rem] [&_ol]:!my-0 xsm:marker:[&_ul_li]:text-[0.5rem]'
                    dangerouslySetInnerHTML={{
                      __html: data?.Item_that_can_be_sent || '',
                    }}
                  ></div>
                </div>
              )}
              {data?.unable_to_send && (
                <div>
                  <p className='xsm:text-pc-sub14s mb-[0.3rem] text-black font-montserrat text-[1rem] font-semibold leading-[1.625] tracking-[-0.03rem]'>
                    Không thể gửi:
                  </p>
                  <div
                    className='[&_h3]:text-pc-tab-title [&_h3]:text-black [&_strong]:text-pc-sub14s [&_strong]:text-black *:text-[rgba(0,0,0,0.90)] *:text-pc-14 *:xsm:text-mb-13 [&_ul]:content-ul [&_ul]:!my-0 marker:[&_ul_li]:text-[#F00] [&_ol]:content-ol [&_ol>li]:my-[0.5rem] [&_ol]:!my-0 xsm:marker:[&_ul_li]:text-[0.5rem]'
                    dangerouslySetInnerHTML={{
                      __html: data?.unable_to_send || '',
                    }}
                  ></div>
                </div>
              )}
              <FormField
                control={form.control}
                name='be_sent'
                render={({field}) => (
                  <FormItem className='relative flex flex-row items-center space-y-0 space-x-[0.5rem] border-none'>
                    <FormControl>
                      <Checkbox
                        className='[&_.svg-none-check]:aria-[checked=false]:block size-[1.5rem] xsm:size-[1.25rem] flex-center border-none data-[state=checked]:bg-[#FFEC1F] bg-[#FFEC1F] data-[state=checked]:text-[#000000] text-[#000000]'
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className='space-y-1 leading-none'>
                      <FormLabel className='xsm:text-mb-13M xsm:line-clamp-2 cursor-pointer text-pc-sub14m text-black'>
                        Tôi đã đọc và chấp nhận chính sách gửi hàng
                      </FormLabel>
                    </div>
                    <FormMessage className='!text-[#F00] text-pc-sub12m absolute bottom-[-80%] left-0' />
                  </FormItem>
                )}
              />
            </div>
          )}
          {Array.isArray(data?.note_more) &&
            data?.note_more?.map(
              (item: IInformationNoteOrder_NoteMore, index: number) => (
                <div
                  key={index}
                  className='p-[1rem] rounded-[1.25rem] bg-white space-y-[1rem]'
                >
                  <div
                    className='[&_h3]:text-pc-tab-title [&_h3]:text-black [&_strong]:text-pc-sub14s [&_strong]:text-black *:text-[rgba(0,0,0,0.90)] *:text-pc-14 *:xsm:text-mb-13 [&_ul]:content-ul [&_ul]:!my-0 marker:[&_ul_li]:text-[rgba(0,0,0,0.80)] [&_ol]:content-ol [&_ol>li]:my-[0.5rem] [&_ol]:!my-0 xsm:marker:[&_ul_li]:text-[0.5rem]'
                    dangerouslySetInnerHTML={{
                      __html: item?.text || '',
                    }}
                  ></div>
                  <FormField
                    control={form.control}
                    name={`note.${index}`}
                    render={({field}) => (
                      <FormItem className='relative flex flex-row items-center space-y-0 space-x-[0.5rem] border-none'>
                        <FormControl>
                          <Checkbox
                            className='[&_.svg-none-check]:aria-[checked=false]:block size-[1.5rem] xsm:size-[1.25rem] flex-center border-none data-[state=checked]:bg-[#FFEC1F] bg-[#FFEC1F] data-[state=checked]:text-[#000000] text-[#000000]'
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className='space-y-1 leading-none'>
                          <FormLabel className='text-pc-sub14m text-black xsm:text-mb-13M xsm:line-clamp-2'>
                            {item?.agree_with ||
                              'Tôi đã đọc và đồng ý với chính sách về kiện hàng'}
                          </FormLabel>
                        </div>
                        <FormMessage className='!text-[#F00] text-pc-sub12m absolute bottom-[-80%] left-0' />
                      </FormItem>
                    )}
                  />
                </div>
              ),
            )}
          {data?.cargo_insurance && (
            <div className='p-[1rem] rounded-[1.25rem] bg-white space-y-[1rem]'>
              <p className='xsm:text-pc-sub14s mb-[0.3rem] text-black font-montserrat text-[1rem] font-semibold leading-[1.625] tracking-[-0.03rem]'>
                Bảo hiểm hàng hoá
              </p>
              <div
                className='[&_h3]:text-pc-tab-title [&_h3]:text-black [&_strong]:text-pc-sub14s [&_strong]:text-black *:text-[rgba(0,0,0,0.90)] *:text-pc-14 *:xsm:text-mb-13 [&_ul]:content-ul [&_ol]:content-ol [&_ol>li]:my-[0.5rem] [&_ol]:!my-0 [&_ul]:!my-0 marker:[&_ul_li]:text-[rgba(0,0,0,0.80)] xsm:marker:[&_ul_li]:text-[0.5rem]'
                dangerouslySetInnerHTML={{
                  __html: data?.cargo_insurance || '',
                }}
              ></div>
              <FormField
                control={form.control}
                name={`cargoinsurance`}
                render={({field}) => (
                  <FormItem className='relative flex flex-row items-center space-y-0 space-x-[0.5rem] border-none'>
                    <FormControl>
                      <Checkbox
                        className='[&_.svg-none-check]:aria-[checked=false]:block size-[1.5rem] xsm:size-[1.25rem] flex-center border-none data-[state=checked]:bg-[#FFEC1F] bg-[#FFEC1F] data-[state=checked]:text-[#000000] text-[#000000]'
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className='space-y-1 leading-none'>
                      <FormLabel className='cursor-pointer text-pc-sub14m text-black xsm:text-mb-13M xsm:line-clamp-2'>
                        Tôi đã đọc và chấp nhận chính sách bảo hiểm hàng hóa
                      </FormLabel>
                    </div>
                    <FormMessage className='!text-[#F00] text-pc-sub12m absolute bottom-[-80%] left-0' />
                  </FormItem>
                )}
              />
            </div>
          )}
          {data?.closing_policy && (
            <div className='p-[1rem] rounded-[1.25rem] bg-white space-y-[1rem]'>
              {Array.isArray(data?.closing_policy) &&
                data?.closing_policy?.map((item: string, index: number) => (
                  <ImageV2
                    key={index}
                    src={item}
                    alt=''
                    width={850 * 2}
                    height={483 * 2}
                    className='max-h-[80vh] h-auto w-full object-cover rounded-[1.25rem]'
                  />
                ))}
              <FormField
                control={form.control}
                name={`closingPolicy`}
                render={({field}) => (
                  <FormItem className='relative flex flex-row items-center space-y-0 space-x-[0.5rem] border-none'>
                    <FormControl>
                      <Checkbox
                        className='[&_.svg-none-check]:aria-[checked=false]:block size-[1.5rem] xsm:size-[1.25rem] flex-center border-none data-[state=checked]:bg-[#FFEC1F] bg-[#FFEC1F] data-[state=checked]:text-[#000000] text-[#000000]'
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className='space-y-1 leading-none'>
                      <FormLabel className='cursor-pointer text-pc-sub14m text-black xsm:text-mb-13M xsm:line-clamp-2'>
                        Tôi đã đọc và chấp nhận chính sách đóng hàng chiều Đức -
                        Việt
                      </FormLabel>
                    </div>
                    <FormMessage className='!text-[#F00] text-pc-sub12m absolute bottom-[-80%] left-0' />
                  </FormItem>
                )}
              />
            </div>
          )}
          {data?.delivery_in_germany_must_read && (
            <div className='p-[1rem] rounded-[1.25rem] bg-white space-y-[1rem]'>
              <div>
                <p className='xsm:text-pc-sub14s mb-[0.3rem] text-black font-montserrat text-[1rem] font-semibold leading-[1.625] tracking-[-0.03rem]'>
                  Giao hàng ở Đức (phải đọc)
                </p>
                <div
                  className='[&_h3]:text-pc-tab-title [&_h3]:text-black [&_strong]:text-pc-sub14s [&_strong]:text-black *:text-[rgba(0,0,0,0.90)] *:text-pc-14 *:xsm:text-mb-13 [&_ul]:content-ul [&_ul]:!my-0 marker:[&_ul_li]:text-[rgba(0,0,0,0.80)] [&_ol]:content-ol [&_ol>li]:my-[0.5rem] [&_ol]:!my-0 xsm:marker:[&_ul_li]:text-[0.5rem]'
                  dangerouslySetInnerHTML={{
                    __html: data?.delivery_in_germany_must_read || '',
                  }}
                ></div>
              </div>
              <FormField
                control={form.control}
                name='delivery'
                render={({field}) => (
                  <FormItem className='relative flex flex-row items-center space-y-0 space-x-[0.5rem] border-none'>
                    <FormControl>
                      <Checkbox
                        className='[&_.svg-none-check]:aria-[checked=false]:block size-[1.5rem] xsm:size-[1.25rem] flex-center border-none data-[state=checked]:bg-[#FFEC1F] bg-[#FFEC1F] data-[state=checked]:text-[#000000] text-[#000000]'
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className='space-y-1 leading-none'>
                      <FormLabel className='cursor-pointer text-pc-sub14m text-black xsm:text-mb-13M xsm:line-clamp-2'>
                        Tôi đã đọc và chấp nhận chính sách giao hàng ở Đức
                      </FormLabel>
                    </div>
                    <FormMessage className='!text-[#F00] text-pc-sub12m absolute bottom-[-80%] left-0' />
                  </FormItem>
                )}
              />
            </div>
          )}
          <div className='xsm:p-[1rem] xsm:bg-[#FAFAFA] xsm:shadow-lg xsm:space-x-[0.5rem] xsm:fixed xsm:bottom-0 xsm:z-[51] disabled:xsm:opacity-[1] xsm:left-0 xsm:right-0 flex items-center justify-between sm:w-full'>
            <div
              onClick={() => handleClickcurrentTab('2')}
              className='xsm:flex-1 cursor-pointer p-[0.75rem_1.5rem] flex-center rounded-[1.25rem] bg-[#D9F1FF]'
            >
              <p className='text-pc-sub16m text-black'>Quay lại</p>
            </div>
            <Button
              type='submit'
              disabled={!form.formState.isValid}
              className={cn(
                'xsm:flex-1 hover:bg-[#38B6FF] mt-[0rem] ml-auto h-[2.8125rem] flex-center p-[0.75rem_1.5rem] rounded-[1.25rem] border-[1.5px] border-solid border-[rgba(255,255,255,0.80)] bg-[#38B6FF]',
                !form.formState.isValid &&
                  'bg-[#F0F0F0] [&_p]:text-[rgba(0,0,0,0.30)]',
              )}
            >
              <p className='text-white text-pc-sub16m'>Tiếp tục</p>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
