import { z } from "zod";

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name."),
  phone: z
    .string()
    .trim()
    .min(10, "Please enter a valid phone number.")
    .max(15, "Please enter a valid phone number.")
    .regex(/^[+\d][\d\s-]{7,}$/, "Please enter a valid phone number."),
  email: z.string().trim().email("Please enter a valid email address."),
  city: z.string().trim().min(2, "Please choose a city."),
  eventType: z.string().trim().min(2, "Please choose an event type."),
  eventDate: z.string().trim().min(4, "Please tell us your event date."),
  guestCount: z.string().trim().min(1, "Please select a guest count."),
  message: z
    .string()
    .trim()
    .max(1000, "Please keep your message under 1000 characters.")
    .optional(),
});

export type EnquiryFormValues = z.infer<typeof enquirySchema>;

export const EVENT_TYPES = [
  "Wedding",
  "Pre-wedding / Haldi / Sangeet",
  "Engagement",
  "Corporate event",
  "Birthday / Anniversary",
  "Other celebration",
] as const;

export const GUEST_BANDS = ["Under 100", "100–300", "300–600", "600–1000", "1000+"] as const;

export const CITIES = [
  "Udaipur",
  "Jaipur",
  "Jodhpur",
  "Jaisalmer",
  "Sawai Madhopur",
  "Goa",
  "Other",
] as const;
