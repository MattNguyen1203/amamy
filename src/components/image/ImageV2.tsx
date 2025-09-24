'use client'

import {StaticImport} from 'next/dist/shared/lib/get-img-props'
import NextImage, {ImageProps} from 'next/image'
import {useEffect, useState} from 'react'

export interface IImageProps extends ImageProps {
  fallbackImage?: string
}

const fallbackImg = '/fallbackImage.gif'

const ImageV2 = ({
  src,
  fallbackImage = fallbackImg,
  style = {},
  draggable = false,
  ...rest
}: IImageProps) => {
  const [imgSrc, setImgSrc] = useState<string | StaticImport>(src)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    setImgSrc(src)
  }, [src])

  const handleError = () => {
    if (!isError) {
      setImgSrc(fallbackImage)
      setIsError(true)
    }
  }

  // Auto-add sizes prop when using fill and alt text when missing
  const imageProps = {
    ...rest,
    ...(rest.fill &&
      !rest.sizes && {
        sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
      }),
    // Auto-add alt text when missing or empty
    alt: rest.alt || 'Image',
  }

  return (
    <NextImage
      src={imgSrc || fallbackImage}
      {...imageProps}
      placeholder='blur'
      blurDataURL={fallbackImg}
      onError={handleError}
      style={{
        ...style,
        objectFit: isError || !imgSrc ? 'cover' : style.objectFit,
      }}
      draggable={draggable}
    />
  )
}

export default ImageV2
