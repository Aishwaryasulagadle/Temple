import fs from 'fs';
import path from 'path';
import { DatabaseSchema, Temple, ContractorProfile, Enquiry } from './types';

const DB_FILE = path.join(process.cwd(), 'data', 'temple_data.json');

export function readDb(): DatabaseSchema {
  try {
    if (!fs.existsSync(DB_FILE)) {
      const dataDir = path.dirname(DB_FILE);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      return {
        contractor: {
          name: "Acharya Someshwar Sthapati & Sons",
          title: "Chief Master Temple Contractor & Shilpa Shastra Architect",
          experience: "35+ Years of Master Turnkey Execution across Pan-India",
          phone: "+91 98909 33567",
          whatsapp: "919890933567",
          email: "temple@gmail.com",
          headOffice: "GINI Viviana, Balewadi Highstreet, Balewadi, Pune - 411045, Maharashtra, India",
          quarryYards: "Pune (Maharashtra), Makrana (Rajasthan), Jaisalmer & Karkala (Karnataka)",
          panIndiaCoverage: "Maharashtra, Gujarat, Rajasthan, Tamil Nadu, Karnataka, Andhra Pradesh, Telangana, Uttar Pradesh, Madhya Pradesh, Delhi NCR, and International Exports.",
          bio: "Chief Master Contractor specialized in turnkey structural temple construction across Pan-India.",
          specializations: [],
          stats: {
            templesCompleted: "1,200+",
            statesCovered: "22 Indian States",
            artisansEmployed: "350+ Karigars & Sthapatis",
            heritageYears: "75+ Years & 4 Generations"
          }
        },
        temples: [],
        enquiries: []
      };
    }
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Database read error:', err);
    return {
      contractor: {} as ContractorProfile,
      temples: [],
      enquiries: []
    };
  }
}

export function writeDb(data: DatabaseSchema): boolean {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Database write error:', err);
    return false;
  }
}
