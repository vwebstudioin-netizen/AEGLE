// ── Core / Shared Types ──

export interface BaseDocument {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SeoMeta {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface GeoCoordinates {
  lat: number;
  lng: number;
}

export interface WorkingHours {
  day: string;
  open: string;
  close: string;
  isClosed: boolean;
}

export interface ContactInfo {
  phone: string;
  email: string;
  fax?: string;
}

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
  linkedin?: string;
}

export interface ImageAsset {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  blurDataURL?: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  icon?: string;
  badge?: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// ── Doctor ──

export interface DoctorData extends BaseDocument {
  name: string;
  slug: string;
  title: string;
  credentials: string[];
  specialties: string[];
  departments: string[];
  image: string;
  bio: string;
  phone: string;
  education: EducationEntry[];
  boardCertifications: string[];
  languages: string[];
  acceptingNewPatients: boolean;
  telemedicineAvailable: boolean;
  locations: string[];
  rating: number;
  reviewCount: number;
  experience: number;
  publications?: string[];
  researchInterests?: string[];
  awards?: string[];
  featured: boolean;
  gender: string;
  npi?: string;
}

export interface EducationEntry {
  degree: string;
  institution: string;
  year: number;
}

// ── Department ──

export interface DepartmentData extends BaseDocument {
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  icon: string;
  image: string;
  heroImage?: string;
  head: string;
  headId?: string;
  phone: string;
  email: string;
  location: string;
  services: string[];
  conditions: string[];
  procedures: string[];
  doctors: string[];
  features: string[];
  stats: DepartmentStat[];
  faqs: FAQ[];
  featured: boolean;
  order: number;
}

export interface DepartmentStat {
  label: string;
  value: string;
  icon?: string;
}

// ── Institute / Center of Excellence ──

export interface InstituteData extends BaseDocument {
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  image: string;
  heroImage?: string;
  director: string;
  directorId?: string;
  departments: string[];
  services: string[];
  researchPrograms: string[];
  phone: string;
  email: string;
  website?: string;
  features: string[];
  stats: DepartmentStat[];
  featured: boolean;
}

// ── Service ──

export interface ServiceData extends BaseDocument {
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  icon: string;
  image: string;
  department: string;
  category: string;
  features: string[];
  preparationSteps?: string[];
  recoveryInfo?: string;
  priceRange?: string;
  promoTag?: string;
  estimatedDuration?: string;
  estimatedCost?: string;
  faqs: FAQ[];
  featured: boolean;
}

// ── Condition ──

export interface ConditionData extends BaseDocument {
  name: string;
  slug: string;
  description: string;
  overview: string;
  symptoms: string[];
  causes: string[];
  riskFactors: string[];
  diagnosis: string[];
  treatments: string[];
  prevention: string[];
  departments: string[];
  relatedConditions: string[];
  relatedProcedures: string[];
  letter: string;
}

// ── Procedure ──

export interface ProcedureData extends BaseDocument {
  name: string;
  slug: string;
  description: string;
  overview: string;
  preparation: string[];
  whatToExpect: string;
  recovery: string;
  risks: string[];
  departments: string[];
  relatedConditions: string[];
  estimatedDuration: string;
  anesthesia?: string;
  letter: string;
}

// ── Location ──

export interface LocationData extends BaseDocument {
  name: string;
  slug: string;
  type: "flagship" | "branch" | "clinic" | "express";
  description: string;
  address: Address;
  coordinates: GeoCoordinates;
  phone: string;
  fax?: string;
  email: string;
  image: string;
  images?: string[];
  hours: WorkingHours[];
  departments: string[];
  services: string[];
  amenities: string[];
  parkingInfo: string;
  publicTransit?: string;
  accessibilityFeatures: string[];
  erAvailable: boolean;
  featured: boolean;
}

// ── Appointment ──

export interface AppointmentData extends BaseDocument {
  patientId: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  doctorId: string;
  doctorName: string;
  departmentId: string;
  departmentName: string;
  date: string;
  time: string;
  visitType: "new" | "follow-up" | "second-opinion" | "telemedicine";
  status: "pending" | "confirmed" | "completed" | "cancelled" | "no-show";
  reason: string;
  notes?: string;
  insurance?: string;
  locationId?: string;
}

// ── Patient ──

export interface PatientData extends BaseDocument {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  address: Address;
  emergencyContact: EmergencyContact;
  insuranceProvider?: string;
  insurancePolicyNumber?: string;
  primaryCareDoctor?: string;
  medicalHistory?: string[];
  allergies?: string[];
  medications?: string[];
  profileImage?: string;
  familyMembers?: FamilyMember[];
}

export interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

export interface FamilyMember {
  name: string;
  relationship: string;
  dateOfBirth: string;
  patientId?: string;
}

// ── Test Results ──

export interface TestResultData extends BaseDocument {
  patientId: string;
  testName: string;
  category: string;
  orderedBy: string;
  orderedById: string;
  date: string;
  status: "pending" | "processing" | "completed" | "reviewed";
  results?: TestResultItem[];
  notes?: string;
  attachmentUrl?: string;
}

export interface TestResultItem {
  name: string;
  value: string;
  unit: string;
  referenceRange: string;
  flag?: "normal" | "high" | "low" | "critical";
}

// ── Medication ──

export interface MedicationData extends BaseDocument {
  patientId: string;
  name: string;
  genericName: string;
  dosage: string;
  frequency: string;
  prescribedBy: string;
  prescribedById: string;
  startDate: string;
  endDate?: string;
  refills: number;
  refillsUsed: number;
  status: "active" | "completed" | "discontinued";
  instructions?: string;
  sideEffects?: string[];
}

// ── Billing ──

export interface BillingStatementData extends BaseDocument {
  patientId: string;
  statementNumber: string;
  date: string;
  dueDate: string;
  items: BillingItem[];
  subtotal: number;
  insuranceCovered: number;
  patientResponsibility: number;
  status: "pending" | "partial" | "paid" | "overdue";
  paymentHistory: PaymentRecord[];
}

export interface BillingItem {
  description: string;
  code: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface PaymentRecord {
  date: string;
  amount: number;
  method: string;
  transactionId: string;
}

// ── Payment (Razorpay) ──

export interface Payment extends BaseDocument {
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  amount: number;
  currency: string;
  status: "created" | "paid" | "failed";
  patientId?: string;
  patientName: string;
  patientEmail: string;
  description: string;
  category: "consultation" | "lab" | "procedure" | "billing" | "donation" | "other";
  metadata?: Record<string, unknown>;
}

// ── Blog Post ──

export interface BlogPostData extends BaseDocument {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorId?: string;
  authorImage?: string;
  category: string;
  tags: string[];
  image: string;
  publishedAt: string;
  status: "draft" | "published" | "archived";
  featured: boolean;
  readingTime: number;
}

// ── News ──

export interface NewsData extends BaseDocument {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  publishedAt: string;
  source?: string;
  featured: boolean;
}

// ── Event ──

export interface EventData extends BaseDocument {
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  image: string;
  category: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  location: string;
  isVirtual: boolean;
  virtualLink?: string;
  capacity: number;
  registeredCount: number;
  isFree: boolean;
  price?: number;
  speakers?: EventSpeaker[];
  tags: string[];
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  registrationOpen: boolean;
  featured: boolean;
}

export interface EventSpeaker {
  name: string;
  title: string;
  image?: string;
  bio?: string;
}

// ── Event Registration ──

export interface EventRegistrationData extends BaseDocument {
  eventId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  attendees: number;
  specialRequirements?: string;
  status: "registered" | "confirmed" | "cancelled" | "attended";
}

// ── Patient Story ──

export interface PatientStoryData extends BaseDocument {
  title: string;
  slug: string;
  patientName: string;
  age: number;
  condition: string;
  department: string;
  doctorName: string;
  excerpt: string;
  content: string;
  image: string;
  videoUrl?: string;
  featured: boolean;
  publishedAt: string;
}

// ── Review ──

export interface ReviewData extends BaseDocument {
  patientName: string;
  email: string;
  doctorId?: string;
  doctorName?: string;
  departmentId?: string;
  departmentName?: string;
  rating: number;
  title: string;
  content: string;
  wouldRecommend: boolean;
  status: "pending" | "approved" | "rejected";
  response?: string;
  responseDate?: string;
}

// ── Clinical Trial ──

export interface ClinicalTrialData extends BaseDocument {
  title: string;
  slug: string;
  principalInvestigator: string;
  department: string;
  phase: string;
  status: "recruiting" | "active" | "completed" | "suspended";
  description: string;
  eligibility: string[];
  conditions: string[];
  startDate: string;
  endDate?: string;
  participantsNeeded: number;
  participantsEnrolled: number;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  nctNumber?: string;
}

// ── Publication (Research) ──

export interface PublicationData extends BaseDocument {
  title: string;
  authors: string[];
  department: string;
  journal: string;
  year: number;
  abstract: string;
  doi?: string;
  pubmedId?: string;
  link?: string;
  category: string;
}

// ── Education Program ──

export interface EducationProgramData extends BaseDocument {
  name: string;
  slug: string;
  type: "residency" | "fellowship" | "nursing" | "cme" | "allied-health" | "student";
  department: string;
  director: string;
  description: string;
  longDescription: string;
  image: string;
  duration: string;
  positions: number;
  requirements: string[];
  applicationDeadline?: string;
  features: string[];
  accreditation?: string;
}

// ── Job ──

export interface JobData extends BaseDocument {
  title: string;
  slug: string;
  department: string;
  category: string;
  type: "full-time" | "part-time" | "per-diem" | "contract" | "volunteer";
  location: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
  preferredQualifications: string[];
  benefits: string[];
  salaryRange?: string;
  postedDate: string;
  closingDate?: string;
  status: "open" | "closed" | "filled";
  featured: boolean;
}

// ── Job Application ──

export interface JobApplicationData extends BaseDocument {
  jobId: string;
  jobTitle: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  experience: string;
  coverLetter?: string;
  resumeUrl?: string;
  linkedIn?: string;
  startDate?: string;
  referral?: string;
  status: "received" | "screening" | "interview" | "offer" | "hired" | "rejected";
}

// ── Donation ──

export interface DonationData extends BaseDocument {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  amount: number;
  donationType: "one-time" | "monthly" | "annual";
  designation?: string;
  campaign?: string;
  honoree?: string;
  isAnonymous: boolean;
  message?: string;
  paymentId?: string;
  status: "pending" | "completed" | "failed" | "refunded";
}

// ── Campaign (Giving) ──

export interface CampaignData extends BaseDocument {
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  image: string;
  goal: number;
  raised: number;
  donorCount: number;
  startDate: string;
  endDate: string;
  status: "active" | "completed" | "upcoming";
  featured: boolean;
}

// ── Insurance Plan ──

export interface InsurancePlanData extends BaseDocument {
  provider: string;
  planName: string;
  planType: string;
  accepted: boolean;
  departments: string[];
  notes?: string;
  website?: string;
  phone?: string;
}

// ── ER Wait Time ──

export interface ErWaitTimeData extends BaseDocument {
  locationId: string;
  locationName: string;
  currentWait: number; // minutes
  lastUpdated: string;
  status: "low" | "moderate" | "high" | "critical";
  patientsWaiting: number;
}

// ── Gallery ──

export interface GalleryItemData extends BaseDocument {
  title: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  order: number;
}

// ── Contact Message ──

export interface ContactMessageData extends BaseDocument {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department?: string;
  subject: string;
  message: string;
  preferredContact: "email" | "phone";
  status: "new" | "read" | "replied" | "archived";
}

// ── Newsletter Subscriber ──

export interface NewsletterSubscriberData extends BaseDocument {
  email: string;
  firstName?: string;
  interests?: string[];
  status: "active" | "unsubscribed";
}

// ── Portal Message ──

export interface PortalMessageData extends BaseDocument {
  senderId: string;
  senderName: string;
  recipientId: string;
  recipientName: string;
  subject: string;
  message: string;
  priority: "normal" | "urgent";
  category: "general" | "prescription" | "appointment" | "test-results" | "billing";
  read: boolean;
  replied: boolean;
}

// ── International Inquiry ──

export interface InternationalInquiryData extends BaseDocument {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  language?: string;
  medicalCondition: string;
  travelAssistance: boolean;
  interpreterNeeded: boolean;
  preferredDates?: string;
  additionalNotes?: string;
  status: "new" | "in-review" | "responded" | "closed";
}

// ── Site Settings ──

export interface SiteSettingsData extends BaseDocument {
  key: string;
  value: string | number | boolean | Record<string, unknown>;
  category: string;
  label: string;
}

// ── FAQ ──

export interface FAQ {
  question: string;
  answer: string;
}

// ── Leadership ──

export interface LeaderData {
  name: string;
  title: string;
  image: string;
  bio: string;
  education?: string[];
  certifications?: string[];
  order: number;
}

// ── Award ──

export interface AwardData {
  title: string;
  organization: string;
  year: number;
  description: string;
  image?: string;
}

// ── Timeline Event ──

export interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  image?: string;
}

// ── Health Library Article ──

export interface HealthArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: string;
  readingTime: number;
  publishedAt: string;
  image?: string;
}

// ── Product (Shop) ──

export interface ProductData extends BaseDocument {
  name: string;
  slug: string;
  description: string;
  longDescription?: string;
  price: number;
  comparePrice?: number;
  salePrice?: number;
  currency: string;
  category: string;
  tags: string[];
  image?: string;
  images: string[];
  thumbnail: string;
  sku: string;
  stock: number;
  featured: boolean;
  active: boolean;
  inStock?: boolean;
  rating: number;
  reviewCount: number;
  weight?: string;
  volume?: string;
  ingredients?: string | string[];
  howToUse?: string;
  suitableFor?: string[];
  skinType?: string[];
  brand: string;
}

// ── Loyalty Program ──

export interface LoyaltyTier {
  name: string;
  minPoints: number;
  benefits: string[];
  color: string;
}

export interface LoyaltyMember extends BaseDocument {
  patientId: string;
  points: number;
  tier: "bronze" | "silver" | "gold" | "platinum";
  history: LoyaltyTransaction[];
}

export interface LoyaltyTransaction {
  date: string;
  description: string;
  points: number;
  type: "earned" | "redeemed";
}

// ── Component Props Helpers ──

export interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export interface ListPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

// ── Enquiry ──

export interface EnquiryData extends BaseDocument {
  name: string;
  phone: string;
  interest: string;
  status: "new" | "contacted" | "converted" | "closed";
  source: "chatbot" | "website" | "phone" | "walkin";
  notes: string;
}

// ── Chat Message (for OpenAI chatbot) ──

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}
