export interface PackageInfo {
  weight: number
  labelType: string
  uploadedFileName?: string
  isLabelSent: boolean
}

export interface LeadData {
  index: number
  fullname: string
  phone: string
  email: string
  customerCode: string
  pickupDate: string | null
  address: string
  packages: PackageInfo[]
}

export const MOCK_LEAD_DATA: LeadData[] = [
  {
    index: 1,
    fullname: 'Lead 1',
    phone: '0123 456 xxx',
    email: 'email1@gmail.com',
    customerCode: 'KH 123',
    pickupDate: '10/15/2025',
    address: 'Westminter Blvd, Westminster CA 92683, USA',
    packages: [
      {
        weight: 10,
        labelType: 'Drop - Off',
        uploadedFileName: 'Tenfile1.pdf',
        isLabelSent: true,
      },
      {
        weight: 20,
        labelType: 'Drop - Off',
        uploadedFileName: 'Labell.pdf',
        isLabelSent: false,
      },
      {
        weight: 30,
        labelType: 'Drop - Off',
        isLabelSent: false,
      },
    ],
  },
  {
    index: 2,
    fullname: 'Lead 2',
    phone: '0123 456 xxx',
    email: 'email2@gmail.com',
    customerCode: 'KH 123',
    pickupDate: '10/15/2025',
    address: 'Westminter Blvd, Westminster CA 92683, USA',
    packages: [
      {
        weight: 5,
        labelType: 'Drop - Off',
        uploadedFileName: 'Tenfile2.pdf',
        isLabelSent: true,
      },
      {
        weight: 12,
        labelType: 'Drop - Off',
        isLabelSent: false,
      },
    ],
  },
  {
    index: 3,
    fullname: 'Lead 3',
    phone: '0123 456 xxx',
    email: 'email3@gmail.com',
    customerCode: 'KH 123',
    pickupDate: null,
    address: 'Westminter Blvd, Westminster CA 92683, USA',
    packages: [
      {
        weight: 10,
        labelType: 'Drop - Off',
        isLabelSent: false,
      },
    ],
  },
  {
    index: 4,
    fullname: 'Lead 4',
    phone: '0123 456 xxx',
    email: 'email4@gmail.com',
    customerCode: 'KH 123',
    pickupDate: '10/15/2025',
    address: 'Westminter Blvd, Westminster CA 92683, USA',
    packages: [
      {
        weight: 10,
        labelType: 'Drop - Off',
        uploadedFileName: 'Tenfile4.pdf',
        isLabelSent: true,
      },
    ],
  },
  {
    index: 5,
    fullname: 'Lead 5',
    phone: '0123 456 xxx',
    email: 'email5@gmail.com',
    customerCode: 'KH 123',
    pickupDate: '10/15/2025',
    address: 'Westminter Blvd, Westminster CA 92683, USA',
    packages: [
      {
        weight: 10,
        labelType: 'Drop - Off',
        isLabelSent: false,
      },
    ],
  },
  {
    index: 6,
    fullname: 'Lead 6',
    phone: '0123 456 xxx',
    email: 'email6@gmail.com',
    customerCode: 'KH 123',
    pickupDate: '10/15/2025',
    address: 'Westminter Blvd, Westminster CA 92683, USA',
    packages: [
      {
        weight: 10,
        labelType: 'Drop - Off',
        uploadedFileName: 'Tenfile6.pdf',
        isLabelSent: false,
      },
    ],
  },
  {
    index: 7,
    fullname: 'Lead 7',
    phone: '0123 456 xxx',
    email: 'email7@gmail.com',
    customerCode: 'KH 123',
    pickupDate: '10/15/2025',
    address: 'Westminter Blvd, Westminster CA 92683, USA',
    packages: [
      {
        weight: 10,
        labelType: 'Drop - Off',
        isLabelSent: false,
      },
    ],
  },
  {
    index: 8,
    fullname: 'Lead 8',
    phone: '0123 456 xxx',
    email: 'email8@gmail.com',
    customerCode: 'KH 123',
    pickupDate: '10/15/2025',
    address: 'Westminter Blvd, Westminster CA 92683, USA',
    packages: [
      {
        weight: 10,
        labelType: 'Drop - Off',
        uploadedFileName: 'Tenfile8.pdf',
        isLabelSent: true,
      },
    ],
  },
  {
    index: 9,
    fullname: 'Lead 9',
    phone: '0123 456 xxx',
    email: 'email9@gmail.com',
    customerCode: 'KH 123',
    pickupDate: null,
    address: 'Westminter Blvd, Westminster CA 92683, USA',
    packages: [
      {
        weight: 10,
        labelType: 'Drop - Off',
        isLabelSent: false,
      },
    ],
  },
  {
    index: 10,
    fullname: 'Lead 10',
    phone: '0123 456 xxx',
    email: 'email10@gmail.com',
    customerCode: 'KH 123',
    pickupDate: '10/15/2025',
    address: 'Westminter Blvd, Westminster CA 92683, USA',
    packages: [
      {
        weight: 10,
        labelType: 'Drop - Off',
        uploadedFileName: 'Tenfile10.pdf',
        isLabelSent: true,
      },
    ],
  },
]
