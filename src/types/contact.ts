// ============================================
// CONTACT SECTION TYPE DEFINITIONS
// ============================================

export interface SocialLink {
  icon: string;
  label: string;
  value: string;
  href: string;
}

export interface ContactFormData {
  name: string;
  company: string | null;
  email: string;
  message: string;
}
