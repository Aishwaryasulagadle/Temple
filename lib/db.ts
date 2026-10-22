import fs from 'fs';
import path from 'path';
import { DatabaseSchema, Temple, ContractorProfile, Enquiry } from './types';

// In-memory cache across serverless warm invocations on Vercel
declare global {
  // eslint-disable-next-line no-var
  var __temple_memory_db__: DatabaseSchema | undefined;
}

const DB_FILE = path.join(process.cwd(), 'data', 'temple_data.json');
const TMP_DB_FILE = path.join('/tmp', 'temple_data.json');

export function readDb(): DatabaseSchema {
  // 1. If in-memory state exists, return it
  if (globalThis.__temple_memory_db__) {
    return globalThis.__temple_memory_db__;
  }

  // 2. Check /tmp (for Vercel serverless environment across warm lambdas)
  try {
    if (fs.existsSync(TMP_DB_FILE)) {
      const data = fs.readFileSync(TMP_DB_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      globalThis.__temple_memory_db__ = parsed;
      return parsed;
    }
  } catch (e) {
    // continue
  }

  // 3. Read from project DB_FILE
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      globalThis.__temple_memory_db__ = parsed;
      return parsed;
    }
  } catch (err) {
    console.error('Database read error:', err);
  }

  // Fallback defaults
  const defaultSchema: DatabaseSchema = {
    contractor: {
      name: "Acharya Someshwar Sthapati & Sons",
      title: "Chief Master Temple Contractor & Shilpa Shastra Architect",
      experience: "35+ Years of Master Turnkey Execution across Pan-India",
      phone: "+91 95353 43935",
      whatsapp: "919535343935",
      email: "omkartemplecontractions@gmail.com",
      headOffice: "At Loha, Tq Loha, Dist Nanded, Maharashtra - 431708",
      quarryYards: "Pune (Maharashtra), Makrana (Rajasthan), Jaisalmer & Karkala (Karnataka)",
      panIndiaCoverage: "Maharashtra, Gujarat, Rajasthan, Tamil Nadu, Karnataka, Andhra Pradesh, Telangana, Uttar Pradesh, Madhya Pradesh, Delhi NCR, and International Exports.",
      bio: "Chief Master Contractor specialized in turnkey structural temple construction across Pan-India.",
      specializations: [],
      stats: {
        templesCompleted: "1,200+",
        statesCovered: "22 Indian States",
        artisansEmployed: "20+ Years Experience",
        heritageYears: "4 Generations"
      }
    },
    temples: [],
    enquiries: []
  };

  globalThis.__temple_memory_db__ = defaultSchema;
  return defaultSchema;
}

export function writeDb(data: DatabaseSchema): boolean {
  // Always update in-memory cache
  globalThis.__temple_memory_db__ = data;

  // Try writing to project DB_FILE (local development)
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err: any) {
    // Expected on Vercel read-only filesystem (EROFS)
  }

  // Also try writing to writable /tmp on serverless environments
  try {
    fs.writeFileSync(TMP_DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    // Ephemeral fallback
  }

  return true;
}
