'use client'

import {cn, formatWeekday, getTomorrow} from '@/lib/utils'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import {
  CreateLabelFormValues,
  createLabelShippingSchema,
  SHIPPING_METHOD_OPTIONS,
} from '@/schema/create-label.schema'
import {zodResolver} from '@hookform/resolvers/zod'
import {useForm, useWatch} from 'react-hook-form'

import {useEffect, useRef, useState, useTransition} from 'react'
import Overview from '@/app/(non-gsap-layout)/tao-nhan-gui-hang/_components/CreateShippingLabel/CreateLabelForm/Overview'
import PopupConfirm from '@/app/(non-gsap-layout)/tao-nhan-gui-hang/_components/CreateShippingLabel/CreateLabelForm/PopupConfirm'
import Image from 'next/image'
import ICPlus from '@/components/icon/ICPlus'
import RHFNumberField from '@/app/(non-gsap-layout)/tao-nhan-gui-hang/_components/RHFFormControl/RHFNumberField'
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group'
import {Label} from '@/components/ui/label'
import RHFTextField from '@/app/(non-gsap-layout)/tao-nhan-gui-hang/_components/RHFFormControl/RHFTextField'
import RHFTextareaField from '@/app/(non-gsap-layout)/tao-nhan-gui-hang/_components/RHFFormControl/RHFTextareField'
import {Calendar} from '@/components/ui/calendar-customize'
import OverviewMobile from '@/app/(non-gsap-layout)/tao-nhan-gui-hang/_components/CreateShippingLabel/CreateLabelForm/OverviewMobile'
import CF7Request from '@/fetch/cf7Request'
import endpoints from '@/utils/endpoints'
import {DialogConfirmType} from '@/types/tao-nhan-gui-hang.interface'

export default function CreateLabelForm() {
  const [isPending, setTransition] = useTransition()
  const [dialogConfirmType, setDialogConfirmType] =
    useState<DialogConfirmType | null>(null)
  const [confirmEmail, setConfirmEmail] = useState<string>('')
  const [openOverviewMobile, setOpenOverviewMobile] = useState<boolean>(false)
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false)
  const isMounted = useRef<boolean>(false)

  const form = useForm<CreateLabelFormValues>({
    resolver: zodResolver(createLabelShippingSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      customerCode: '',
      city: '',
      cityCode: '',
      streetName: '',
      houseNumber: '',
      detailedAddress: '',
      shippingMethod: SHIPPING_METHOD_OPTIONS.USE_LABEL,
      pickupDate: getTomorrow(),
      packageWeights: [0],
    },
  })

  const {handleSubmit, control, setValue} = form

  const {pickupDate, shippingMethod, packageWeights} = useWatch({
    control,
  })

  const handleSubmitForm = async (data: CreateLabelFormValues) => {
    if (isPending) return
    setTransition(async () => {
      const dataForm = {
        fullname: data.fullName,
        email: data.email,
      }
      const request = new CF7Request(dataForm)
      let endpointForm: {id: string; unitTag: string} | null = null
      if (data.shippingMethod === SHIPPING_METHOD_OPTIONS.USE_LABEL) {
        endpointForm = endpoints.useLabelForm
        setDialogConfirmType('useLabel')
      }
      if (data.shippingMethod === SHIPPING_METHOD_OPTIONS.UPS_PICKUP) {
        endpointForm = endpoints.usePickupForm
        setDialogConfirmType('usePickup')
      }
      if (!endpointForm) return

      const response = await request.send(endpointForm)
      if (response?.invalid_fields?.length === 0) {
        setOpenConfirmDialog(true)
        setConfirmEmail(data.email)
        form.reset()
      }
    })
    if (openOverviewMobile) {
      setOpenOverviewMobile(false)
    }
  }

  const handleErrorSubmitForm = () => {
    console.log('Chạy vào đây')
    if (openOverviewMobile) {
      setOpenOverviewMobile(false)
    }
  }

  // Thêm kiện hàng
  const handleAddPackage = () => {
    const currentWeights = packageWeights || [0]
    setValue('packageWeights', [...currentWeights, 0], {
      shouldValidate: false,
    })
  }

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true
      return
    }
    // Reset lại ngày lấy hàng khi đổi phương thức giao hàng
    if (shippingMethod === SHIPPING_METHOD_OPTIONS.UPS_PICKUP) {
      setValue('pickupDate', getTomorrow(), {
        shouldValidate: false,
      })
    }
  }, [shippingMethod, setValue])

  useEffect(() => {
    if (!openConfirmDialog) {
      setConfirmEmail('')
      setDialogConfirmType(null)
    }
  }, [openConfirmDialog])

  return (
    <>
      <Form {...form}>
        <form
          id='create-label-form'
          onSubmit={handleSubmit(handleSubmitForm, handleErrorSubmitForm)}
          className='relative flex items-start justify-between space-x-[1.5rem] pt-[0.25rem] xsm:block xsm:space-x-0'
        >
          <div className='max-w-[56.25rem] basis-full space-y-[1.25rem] rounded-[3rem] bg-[#F8F8F8] p-[1.75rem] xsm:w-full xsm:max-w-full xsm:space-y-[1rem] xsm:p-0'>
            {/* Thông tin người gửi */}
            <div className='space-y-[0.875rem] xsm:rounded-[2rem] xsm:bg-white xsm:px-[1rem] xsm:pb-[1.25rem] xsm:pt-[1rem] xsm:shadow-[0_2px_6px_-1px_rgba(15,15,16,0.04)]'>
              <p className='text-[1rem] font-semibold leading-[1.3] tracking-[-0.03rem] text-[#33A6E8] xsm:text-[0.875rem] xsm:tracking-[-0.02625rem]'>
                Thông tin người gửi
              </p>
              <div className='grid grid-cols-2 gap-x-[1.25rem] gap-y-[0.875rem] xsm:grid-cols-1 xsm:gap-x-0 xsm:gap-y-[1rem]'>
                <div className='col-span-1'>
                  <RHFTextField
                    required
                    control={control}
                    name='fullName'
                    label='Họ và tên'
                    placeholder='Nhập họ và tên'
                  />
                </div>
                <div className='col-span-1'>
                  <RHFTextField
                    required
                    control={control}
                    name='phone'
                    label='Số điện thoại'
                    placeholder='Nhập số điện thoại'
                    icon='/icons/icon-america.svg'
                  />
                </div>
                <div className='col-span-1'>
                  <RHFTextField
                    required
                    control={control}
                    name='email'
                    label='Email'
                    placeholder='Nhập email'
                    description='<p>*Email để nhận label và hoá đơn (sau có thể tích hợp hoá đơn)</p>'
                  />
                </div>
                <div className='col-span-1'>
                  <RHFTextField
                    required
                    control={control}
                    name='customerCode'
                    label='Mã khách hàng'
                    placeholder='Nhập mã khách hàng'
                  />
                </div>
              </div>
            </div>

            {/* Thông tin địa chỉ lấy hàng */}
            <div className='space-y-[0.875rem] xsm:rounded-[2rem] xsm:bg-white xsm:px-[1rem] xsm:pb-[1.25rem] xsm:pt-[1rem] xsm:shadow-[0_2px_6px_-1px_rgba(15,15,16,0.04)]'>
              <p className='text-[1rem] font-semibold leading-[1.3] tracking-[-0.03rem] text-[#33A6E8]'>
                Địa chỉ lấy hàng
              </p>
              <div className='grid grid-cols-2 gap-x-[0.5rem] gap-y-[0.875rem]'>
                <div className='col-span-1'>
                  <RHFTextField
                    required
                    control={control}
                    name='city'
                    label='Thành phố'
                    placeholder='Nhập thành phố'
                  />
                </div>
                <div className='col-span-1'>
                  <RHFTextField
                    required
                    control={control}
                    name='cityCode'
                    label='Mã thành phố'
                    placeholder='Nhập mã'
                  />
                </div>
                <div className='col-span-1'>
                  <RHFTextField
                    required
                    control={control}
                    name='streetName'
                    label='Tên đường'
                    placeholder='Nhập tên đường'
                  />
                </div>
                <div className='col-span-1'>
                  <RHFTextField
                    required
                    control={control}
                    name='houseNumber'
                    label='Số nhà'
                    placeholder='Nhập số nhà'
                  />
                </div>
                <div className='col-span-2'>
                  <RHFTextareaField
                    required
                    control={control}
                    name='detailedAddress'
                    label='Địa chỉ nhận hàng chi tiết'
                    placeholder='Nhập địa chỉ nhận hàng chi tiết'
                    description='<p>*Tên nhà hàng, hay tiệm nail...</p>'
                    textareaClassName='xsm:h-[3.625rem]'
                  />
                </div>
              </div>
            </div>

            {/* Thông tin vận chuyển */}
            <div>
              <FormField
                control={control}
                name='shippingMethod'
                render={({field}) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                        className='gap-0 space-y-[1rem]'
                      >
                        {Object.keys(SHIPPING_METHOD_OPTIONS).map(
                          (option: string, index: number) => {
                            const isUpsPickup =
                              SHIPPING_METHOD_OPTIONS[option] ===
                              SHIPPING_METHOD_OPTIONS.UPS_PICKUP
                            const isActive =
                              field.value === SHIPPING_METHOD_OPTIONS[option]
                            return (
                              <Label
                                key={index}
                                className={cn(
                                  'flex h-[3.625rem] flex-1 cursor-pointer items-center gap-0 space-x-[0.75rem] rounded-[1.5rem] bg-white px-[1rem] ring-1 ring-[#DCDFE4] xsm:h-auto xsm:bg-[#EFEFEF] xsm:p-[0.875rem] xsm:ring-0',
                                  isActive && '!bg-[#38B6FF] ring-[#38B6FF]',
                                  isActive && isUpsPickup && 'rounded-b-none',
                                )}
                              >
                                <div
                                  className={cn(
                                    'relative flex size-[1.375rem] shrink-0 items-center justify-center rounded-full border-[0.0875rem] border-solid border-[#A3DDFF] xsm:size-[1.125rem]',
                                    isActive && 'border-white bg-white',
                                  )}
                                >
                                  <div
                                    className={cn(
                                      'size-[1.125rem] rounded-full border border-solid border-transparent xsm:size-[0.875rem]',
                                      isActive && 'border-[#38B6FF]',
                                    )}
                                  />
                                </div>
                                <span
                                  className={cn(
                                    'text-[0.875rem] font-semibold tracking-[-0.0175rem] text-black xsm:text-[0.8125rem] xsm:leading-[1.4] xsm:tracking-[-0.01625rem]',
                                    isActive && 'text-white',
                                  )}
                                >
                                  {SHIPPING_METHOD_OPTIONS[option]}
                                </span>
                                <RadioGroupItem
                                  hidden
                                  value={SHIPPING_METHOD_OPTIONS[option]}
                                />
                              </Label>
                            )
                          },
                        )}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage className='px-[1rem] text-[0.75rem] font-medium leading-[140%] tracking-[-0.0225rem]' />
                  </FormItem>
                )}
              />
              <div
                className={cn(
                  'hidden',
                  shippingMethod === SHIPPING_METHOD_OPTIONS.UPS_PICKUP &&
                    'block',
                )}
              >
                <div className='flex space-x-[1.125rem] rounded-b-[1.5rem] bg-white px-[1rem] pb-[1.5rem] pt-[1rem] xsm:block xsm:space-x-0 xsm:space-y-[1rem] xsm:pb-[1.25rem]'>
                  <div className='max-w-[24.8125rem] flex-1 space-y-[2.5rem] xsm:w-full xsm:space-y-[1.25rem]'>
                    <div className='space-y-[1.25rem]'>
                      <div className='space-y-[0.5rem]'>
                        <p className='text-[0.875rem] font-semibold tracking-[-0.0175rem] text-black/80'>
                          Chọn thời gian (*)
                        </p>
                        <div className='space-y-[0.5rem] text-[0.8125rem] font-medium leading-[1.5] tracking-[-0.02438rem] text-black/80 [&_strong]:font-semibold [&_strong]:text-[rgba(0,0,0,0.92)]'>
                          <p>
                            Thời gian lấy hàng chỉ có thể chọn thời gian từ{' '}
                            <strong>Thứ 2 - Thứ 6</strong>
                          </p>
                          <p>
                            Phải gửi thông tin{' '}
                            <strong>Trước 24h và trước 1 ngày</strong>
                          </p>
                        </div>
                      </div>
                      <div className='space-y-[0.625rem]'>
                        <p className='space-x-[0.5rem] text-[0.875rem] font-medium leading-[1.5] tracking-[-0.0175rem] text-black/80 xsm:text-[0.8125rem] xsm:tracking-[-0.01625rem] [&_strong]:font-semibold [&_strong]:text-[#38B6FF]'>
                          <span>Thời gian bạn lựa chọn:</span>
                          {pickupDate ? (
                            <strong>
                              {formatWeekday(pickupDate)} -{' '}
                              {pickupDate.toLocaleDateString('vi-VN', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                              })}
                            </strong>
                          ) : (
                            <strong>Chưa chọn ngày</strong>
                          )}
                        </p>
                        {pickupDate && (
                          <p className='text-[0.8125rem] font-medium leading-[1.5] tracking-[-0.02438rem] text-black/60 xsm:text-[0.75rem]'>
                            (*Nếu bạn muốn UPS lấy hàng vào ngày{' '}
                            {pickupDate.toLocaleDateString('vi-VN', {
                              day: '2-digit',
                              month: '2-digit',
                            })}
                            . Thì bạn cần gửi thông tin lấy hàng trước 24h ngày{' '}
                            {(() => {
                              const previousDay = new Date(pickupDate)
                              previousDay.setDate(previousDay.getDate() - 1)
                              return previousDay.toLocaleDateString('vi-VN', {
                                day: '2-digit',
                                month: '2-digit',
                              })
                            })()}{' '}
                            )
                          </p>
                        )}
                      </div>
                    </div>
                    <div className='space-y-[0.5rem]'>
                      <p className='flex items-center space-x-[0.375rem]'>
                        <Image
                          alt=''
                          width={48}
                          height={48}
                          src='/icons/icon-note.svg'
                          className='h-auto w-[1.5rem] shrink-0 xsm:w-[1.35rem]'
                        />
                        <span className='text-[1rem] font-bold leading-[1.5] tracking-[-0.03rem] text-[#33A6E8] xsm:text-[0.875rem] xsm:tracking-[-0.02625rem]'>
                          LƯU Ý
                        </span>
                      </p>
                      <ul className='list-disc space-y-[0.5rem] text-[0.875rem] font-medium leading-[1.5] tracking-[-0.02625rem] xsm:text-[0.75rem] xsm:tracking-[-0.0225rem] [&_li]:ml-[1.125rem]'>
                        <li>
                          <p className='text-[#F00]'>
                            Không chọn được giờ, UPS sẽ lấy theo ngày, bắt buộc
                            có máy in để in ra dán lên thùng
                          </p>
                        </li>
                        <li>
                          <p className='text-[#F00]'>
                            Báo chính xác khoảng số lbs, nếu chênh quá 3 LBS sẽ
                            thu thêm phí từ UPS
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className='max-w-[24.8125rem] flex-1 xsm:w-full'>
                    {/* Calendar component */}
                    <FormField
                      control={control}
                      name='pickupDate'
                      render={({field}) => (
                        <FormItem>
                          <FormControl>
                            <Calendar
                              mode='single'
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => {
                                // Disable dates in the past and today
                                const today = new Date()
                                today.setHours(0, 0, 0, 0)
                                return date <= today
                              }}
                              className='w-full rounded-[1rem] bg-[#F8F8F8] p-[0.75rem]'
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Thông tin kiện hàng */}
            <div className='space-y-[0.875rem] rounded-[1.5rem] bg-white p-[1.25rem] shadow-[0_2px_6px_-1px_rgba(15,15,16,0.04)] xsm:rounded-[2rem] xsm:px-[1rem] xsm:pt-[1rem]'>
              <p className='text-[1rem] font-semibold leading-[1.3] tracking-[-0.03rem] text-[#33A6E8]'>
                Số kiện hàng bạn muốn gửi
              </p>
              <div className='space-y-[0.5rem]'>
                <p className='flex items-center space-x-[0.375rem]'>
                  <Image
                    alt=''
                    width={48}
                    height={48}
                    src='/icons/icon-note.svg'
                    className='h-auto w-[1.5rem] shrink-0'
                  />
                  <span className='text-[1rem] font-semibold leading-[1.3] tracking-[-0.03rem] text-[#33A6E8] xsm:text-[0.875rem] xsm:tracking-[-0.02625rem]'>
                    LƯU Ý
                  </span>
                </p>
                <ul className='list-disc'>
                  <li className='ml-[1.125rem] xsm:ml-[0.875rem]'>
                    <p className='text-[0.875rem] font-medium leading-[1.5] tracking-[-0.02625rem] text-[#F00] xsm:text-[0.75rem] xsm:tracking-[-0.0225rem]'>
                      1 bưu kiện tối đa 49LBS, nếu nhiều hơn chia thành 2 bưu
                      kiện.
                    </p>
                  </li>
                </ul>
              </div>
              <div className='space-y-[0.875rem]'>
                {Array.isArray(packageWeights) &&
                  packageWeights?.map((_, index) => (
                    <div
                      key={index}
                      className='space-y-[0.875rem] pb-[0.625rem]'
                    >
                      <div className='flex items-center justify-between'>
                        <p className='text-[0.875rem] font-semibold leading-[1.3] tracking-[-0.02625rem] text-black xsm:text-[0.8125rem] xsm:tracking-[-0.02438rem]'>
                          Kiện hàng số {index + 1}
                        </p>
                      </div>
                      <div className='w-full'>
                        <RHFNumberField
                          required
                          control={control}
                          name={`packageWeights.${index}`}
                          label='Nhập số cân nặng dự kiến (LBS) (1 Kg ≈ 2.20462 LBS )'
                          placeholder='Nhập khối lượng kiện hàng'
                          description='<p>*1 thúng <strong>tối đa 49 lbs</strong>, nếu quá phải tách ra 2 kiện</p>'
                          labelClassName='w-[14rem]'
                        />
                      </div>
                    </div>
                  ))}
              </div>
              <button
                type='button'
                onClick={handleAddPackage}
                className='h-[1.75rem] space-x-[0.25rem] rounded-[1.25rem] border border-solid border-[#38B6FF] px-[0.875rem] text-[#38B6FF] flex-center xsm:h-[2.25rem] xsm:w-full'
              >
                <span className='text-[0.75rem] font-medium leading-[1.3] tracking-[-0.0225rem]'>
                  Thêm kiện hàng
                </span>
                <ICPlus className='size-[0.5rem] shrink-0 text-current' />
              </button>
            </div>
          </div>
          <div className='sticky top-[5.5rem] max-w-[30.25rem] basis-full self-baseline xsm:hidden'>
            <Overview
              control={control}
              isPending={isPending}
            />
          </div>

          <OverviewMobile
            open={openOverviewMobile}
            setOpen={setOpenOverviewMobile}
            control={control}
            isPending={isPending}
          />
        </form>
      </Form>
      <PopupConfirm
        open={openConfirmDialog}
        setOpen={setOpenConfirmDialog}
        dialogConfirmType={dialogConfirmType}
        email={confirmEmail}
      />
    </>
  )
}
