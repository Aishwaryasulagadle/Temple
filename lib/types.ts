export interface ContractorProfile {
  name: string;
  title: string;
  experience: string;
  phone: string;
  whatsapp: string;
  email: string;
  headOffice: string;
  quarryYards: string;
  panIndiaCoverage: string;
  bio: string;
  specializations: string[];
  stats: {
    templesCompleted: string;
    statesCovered: string;
    artisansEmployed: string;
    heritageYears: string;
  };
}

export interface Temple {
  id: string;
  name: string;
  deity: string;
  tradition: string;
  subType: string;
  stoneType: string;
  location: string;
  country: string;
  status: 'Completed' | 'In Progress' | string;
  year: string;
  height: string;
  area: string;
  coverImage: string;
  images: string[];
  description: string;
  features: string[];
  likes: number;
  featured?: boolean;
  createdAt: string;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  deity: string;
  tradition: string;
  state: string;
  location: string;
  budget: string;
  landArea?: string;
  message: string;
  date: string;
}

export interface DatabaseSchema {
  contractor: ContractorProfile;
  temples: Temple[];
  enquiries: Enquiry[];
}
