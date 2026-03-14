import { z } from "zod";

// ── Contact Form ──
export const contactFormSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50),
  lastName: z.string().min(1, "Last name is required").max(50),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  department: z.string().optional(),
  subject: z.string().min(1, "Subject is required").max(100),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
  preferredContact: z.enum(["email", "phone"]).default("email"),
});
export type ContactFormValues = z.infer<typeof contactFormSchema>;

// ── Appointment Booking ──
export const appointmentFormSchema = z.object({
  patientName: z.string().min(1, "Patient name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  department: z.string().min(1, "Department is required"),
  doctor: z.string().optional(),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  visitType: z.enum(["new", "follow-up", "second-opinion", "telemedicine"]),
  insurance: z.string().optional(),
  reason: z.string().min(1, "Reason for visit is required").max(500),
  notes: z.string().max(1000).optional(),
});
export type AppointmentFormValues = z.infer<typeof appointmentFormSchema>;

// ── Review ──
export const reviewFormSchema = z.object({
  patientName: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  doctor: z.string().optional(),
  department: z.string().optional(),
  rating: z.number().min(1).max(5),
  title: z.string().min(1, "Title is required").max(100),
  content: z.string().min(20, "Review must be at least 20 characters").max(2000),
  wouldRecommend: z.boolean(),
});
export type ReviewFormValues = z.infer<typeof reviewFormSchema>;

// ── Newsletter ──
export const newsletterFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z.string().optional(),
  interests: z.array(z.string()).optional(),
});
export type NewsletterFormValues = z.infer<typeof newsletterFormSchema>;

// ── Job Application ──
export const jobApplicationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  position: z.string().min(1, "Position is required"),
  experience: z.string().min(1, "Experience is required"),
  coverLetter: z.string().max(3000).optional(),
  resumeUrl: z.string().optional(),
  linkedIn: z.string().url().optional().or(z.literal("")),
  startDate: z.string().optional(),
  referral: z.string().optional(),
});
export type JobApplicationValues = z.infer<typeof jobApplicationSchema>;

// ── Patient Profile ──
export const patientProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["male", "female", "other", "prefer-not-to-say"]),
  address: z.object({
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zip: z.string().min(5, "ZIP must be at least 5 digits"),
    country: z.string().default("US"),
  }),
  emergencyContact: z.object({
    name: z.string().min(1, "Emergency contact name is required"),
    phone: z.string().min(10, "Phone must be at least 10 digits"),
    relationship: z.string().min(1, "Relationship is required"),
  }),
  insuranceProvider: z.string().optional(),
  insurancePolicyNumber: z.string().optional(),
});
export type PatientProfileValues = z.infer<typeof patientProfileSchema>;

// ── Donation ──
export const donationFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  amount: z.number().min(1, "Minimum donation is ₹1"),
  donationType: z.enum(["one-time", "monthly", "annual"]),
  designation: z.string().optional(),
  campaign: z.string().optional(),
  honoree: z.string().optional(),
  isAnonymous: z.boolean().default(false),
  message: z.string().max(500).optional(),
});
export type DonationFormValues = z.infer<typeof donationFormSchema>;

// ── Event Registration ──
export const eventRegistrationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  eventId: z.string().min(1, "Event is required"),
  attendees: z.number().min(1).max(10).default(1),
  specialRequirements: z.string().max(500).optional(),
});
export type EventRegistrationValues = z.infer<typeof eventRegistrationSchema>;

// ── International Patient Inquiry ──
export const internationalInquirySchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  country: z.string().min(1, "Country is required"),
  language: z.string().optional(),
  medicalCondition: z.string().min(1, "Medical condition is required").max(2000),
  travelAssistance: z.boolean().default(false),
  interpreterNeeded: z.boolean().default(false),
  preferredDates: z.string().optional(),
  additionalNotes: z.string().max(2000).optional(),
});
export type InternationalInquiryValues = z.infer<typeof internationalInquirySchema>;

// ── Portal Message ──
export const portalMessageSchema = z.object({
  recipientId: z.string().min(1, "Recipient is required"),
  subject: z.string().min(1, "Subject is required").max(200),
  message: z.string().min(1, "Message is required").max(5000),
  priority: z.enum(["normal", "urgent"]).default("normal"),
  category: z.enum(["general", "prescription", "appointment", "test-results", "billing"]),
});
export type PortalMessageValues = z.infer<typeof portalMessageSchema>;

// ── Referral ──
export const referralFormSchema = z.object({
  referringPhysician: z.string().min(1, "Referring physician is required"),
  referringFacility: z.string().optional(),
  referringPhone: z.string().min(10),
  referringEmail: z.string().email(),
  patientName: z.string().min(1, "Patient name is required"),
  patientDOB: z.string().min(1, "Date of birth is required"),
  patientPhone: z.string().min(10),
  diagnosis: z.string().min(1, "Diagnosis is required"),
  department: z.string().min(1, "Department is required"),
  urgency: z.enum(["routine", "urgent", "emergent"]),
  notes: z.string().max(2000).optional(),
});
export type ReferralFormValues = z.infer<typeof referralFormSchema>;
