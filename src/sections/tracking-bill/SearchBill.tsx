'use client'
import useStore from '@/app/(store)/store'
import { ICLoading } from '@/components/icon/ICLoading'
import ImageV2 from '@/components/image/ImageV2'
import useClickOutside from '@/hooks/useClickOutside'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

type SearchBillProps = {
  onSearch: () => void
  className?: string
  setIsSearchValue: React.Dispatch<React.SetStateAction<string>>
  issearchValue: string
  isLoading: boolean
}

const SearchBill = ({
  onSearch,
  className,
  setIsSearchValue,
  issearchValue,
  isLoading,
}: SearchBillProps) => {
  const {searchValue} = useStore((state) => state)
  const [isShowPaste, setIsShowPaste] = useState(false)
  const {ref, isOutside} = useClickOutside<HTMLDivElement>()

  useEffect(() => {
    if (isOutside) {
      setIsShowPaste(false)
    }
  }, [isOutside])

  const handlePaste = () => {
    navigator.clipboard.readText().then((text) => {
      setIsSearchValue(text)
    })
  }

  return (
    <>
      <div
        className={cn(
          'w-full p-5 rounded-[1.25rem] bg-background-elevation20 xsm:hidden',
          className,
        )}
      >
        <div
          ref={ref}
          className='p-[0.5rem_0.5rem_0.5rem_1rem] h-[3rem] rounded-[1.25rem] bg-background-elevation5 flex space-x-[0.625rem] items-center'
        >
          <input
            type='text'
            onFocus={() => setIsShowPaste(true)}
            value={issearchValue}
            onChange={(e) => setIsSearchValue(e.target.value)}
            placeholder='Nhập mã vận đơn'
            className='flex-1 text-pc-sub14m border-none bg-transparent outline-none text-black placeholder:text-black/30'
          />
          <button
            onClick={handlePaste}
            className={cn(
              'h-8 px-3 rounded-[1.25rem] bg-background-elevation30 flex-center text-pc-sub12s text-black/30 transition-all duration-300',
              isShowPaste ? 'opacity-100' : 'opacity-0 pointer-events-none',
            )}
          >
            Dán
          </button>
          <ImageV2
            src='/tracking-bill/icon-close.svg'
            width={40}
            height={40}
            alt=''
            onClick={() => setIsSearchValue('')}
            className={cn(
              'size-6 cursor-pointer object-contain',
              searchValue ? 'block' : 'hidden',
            )}
          />
        </div>
        <button
          onClick={onSearch}
          className='mt-3 p-[0.75rem_1.5rem] flex items-center justify-center w-full space-x-3 rounded-[1.25rem] bg-[#38B6FF] border-[1.5px] border-white/80 hover:opacity-80 transition-all duration-300'
        >
          <span className='text-background-elevation5 text-pc-sub16m'>
            Tra cứu
          </span>
          <ImageV2
            src='/tracking-bill/icon-search.svg'
            width={40}
            height={40}
            alt=''
            className='size-[1.125rem] object-contain'
          />
          {isLoading && <ICLoading className='size-[1.125rem]' />}
        </button>
      </div>
      <div
        className={cn(
          'p-[0.25rem_0.25rem_0.25rem_0.5rem] h-[3rem] rounded-[1.25rem] bg-background-elevation10X space-x-3 items-center xsm:flex hidden',
          className,
        )}
      >
        <ImageV2
          src='/tracking-bill/icon-search-mb.svg'
          width={40}
          height={40}
          alt=''
          className={cn(
            'size-[1.125rem] cursor-pointer object-contain',
            searchValue ? 'hidden' : 'block',
          )}
        />
        <input
          type='text'
          value={issearchValue}
          onChange={(e) => setIsSearchValue(e.target.value)}
          placeholder='Nhập mã vận đơn'
          className='flex-1 text-pc-sub14m xsm:text-mb-13M border-none bg-transparent outline-none text-black placeholder:text-black/30'
        />
        <ImageV2
          src='/tracking-bill/icon-close.svg'
          width={40}
          height={40}
          alt=''
          onClick={() => setIsSearchValue('')}
          className={cn(
            'size-6 cursor-pointer object-contain',
            searchValue ? 'block' : 'hidden',
          )}
        />
        <button
          onClick={onSearch}
          className='p-3 flex items-center justify-center rounded-[1.25rem] bg-[#38B6FF] border-[0.5px] border-white/80'
        >
          <span className='text-background-elevation5 text-pc-sub12s tracking-[-0.03rem] leading-[1.4]'>
            Tra cứu
          </span>
        </button>
      </div>
    </>
  )
}

export default SearchBill
