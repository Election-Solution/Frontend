export type IncidentStatus = "new" | "checking" | "resolved";
export type Severity = "low" | "medium" | "high";

export interface Incident {
  id: string;
  state: string;
  lga: string;
  ward: string;
  pollingUnit: string;
  issueType: string;
  summary: string;
  severity: Severity;
  status: IncidentStatus;
  // rough coordinates within Nigeria for the simple SVG map
  lat: number;
  lng: number;
  reportedAt: string;
}

export const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
  "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu",
  "FCT - Abuja", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina",
  "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo",
  "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara",
];

export const ISSUE_TYPES = [
  "Missing items",
  "Staff are late",
  "Security/Wahala",
  "Other",
];

export const mockIncidents: Incident[] = [
  {
    id: "WDA-1042",
    state: "Lagos", lga: "Ikeja", ward: "Ward 3", pollingUnit: "PU 014",
    issueType: "Staff are late",
    summary: "INEC officials still no show by 9am. Voters are waiting outside the gate with their PVCs.",
    severity: "medium", status: "new",
    lat: 6.6018, lng: 3.3515, reportedAt: "2 min ago",
  },
  {
    id: "WDA-1041",
    state: "Kano", lga: "Nassarawa", ward: "Ward 5", pollingUnit: "PU 022",
    issueType: "Missing items",
    summary: "Result sheets never arrive. Voting started but no way to record. Tension dey rise small.",
    severity: "high", status: "new",
    lat: 12.0022, lng: 8.5919, reportedAt: "6 min ago",
  },
  {
    id: "WDA-1039",
    state: "Rivers", lga: "Port Harcourt", ward: "Ward 8", pollingUnit: "PU 003",
    issueType: "Security/Wahala",
    summary: "Group of young men disturbing the queue. Police presence is light. Voters dey worry.",
    severity: "high", status: "checking",
    lat: 4.8156, lng: 7.0498, reportedAt: "18 min ago",
  },
  {
    id: "WDA-1038",
    state: "FCT - Abuja", lga: "Gwagwalada", ward: "Ward 2", pollingUnit: "PU 011",
    issueType: "Other",
    summary: "BVAS machine no dey read fingerprints well. Officials are trying restart now.",
    severity: "medium", status: "checking",
    lat: 8.9426, lng: 7.0826, reportedAt: "31 min ago",
  },
  {
    id: "WDA-1031",
    state: "Oyo", lga: "Ibadan North", ward: "Ward 1", pollingUnit: "PU 007",
    issueType: "Staff are late",
    summary: "Officials arrived late but accreditation has now started smoothly. Calm on the ground.",
    severity: "low", status: "resolved",
    lat: 7.4474, lng: 3.9020, reportedAt: "1 hr ago",
  },
  {
    id: "WDA-1029",
    state: "Enugu", lga: "Enugu East", ward: "Ward 4", pollingUnit: "PU 019",
    issueType: "Missing items",
    summary: "Backup ballot papers were delivered. Voting resumed. Everything calm now.",
    severity: "low", status: "resolved",
    lat: 6.4413, lng: 7.5139, reportedAt: "2 hr ago",
  },
  {
    id: "WDA-1027",
    state: "Kaduna", lga: "Chikun", ward: "Ward 6", pollingUnit: "PU 005",
    issueType: "Other",
    summary: "All clear. Voters moving in and out smoothly. No issue reported by observers.",
    severity: "low", status: "resolved",
    lat: 10.4806, lng: 7.4145, reportedAt: "3 hr ago",
  },
];
