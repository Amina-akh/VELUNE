export type Occasion =
  | 'birthday'
  | 'anniversary'
  | 'first-date'
  | 'apology'
  | 'no-reason'
  | 'holiday'
  | 'other'

export type Budget = '3900-4900' | '5000-6900' | '7900-9900' | '10000+'

export type DeliveryType = 'address' | 'hands' | 'reception' | 'anonymous'

export interface OrderFormData {
  // Contact
  clientName: string
  phone: string
  telegram: string

  // Occasion
  occasion: Occasion | ''
  occasionOther: string
  deliveryDate: string
  deliveryTime: string
  isUrgent: boolean

  // About her
  herName: string
  herAge: string
  herPersonality: string
  herLikes: string
  herDislikes: string
  herStyle: string

  // Preferences
  budget: Budget | ''
  colorPreference: string
  notes: string

  // Delivery
  deliveryType: DeliveryType | ''
  address: string
  recipientPhone: string
  cardMessage: string
  anonymous: boolean
}

export const initialOrderForm: OrderFormData = {
  clientName: '',
  phone: '',
  telegram: '',
  occasion: '',
  occasionOther: '',
  deliveryDate: '',
  deliveryTime: '',
  isUrgent: false,
  herName: '',
  herAge: '',
  herPersonality: '',
  herLikes: '',
  herDislikes: '',
  herStyle: '',
  budget: '',
  colorPreference: '',
  notes: '',
  deliveryType: '',
  address: '',
  recipientPhone: '',
  cardMessage: '',
  anonymous: false,
}

export interface SavedOrder extends OrderFormData {
  id: string
  createdAt: string
  status: 'pending'
}
