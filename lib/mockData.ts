export type IncidentStatus = 'new' | 'verifying' | 'dispatched' | 'resolved'
export type IncidentSeverity = 'critical' | 'moderate' | 'low'
export type IncidentType = 'security' | 'logistics' | 'suppression' | 'materials'

export interface Incident {
  id: string
  status: IncidentStatus
  severity: IncidentSeverity
  type: IncidentType
  typeLabel: string
  state: string
  lga: string
  ward: string
  pu: string
  summary: string
  description: string
  reportedAt: string
  reportedBy: string
  lat: number
  lng: number
  hasMedia: boolean
}

export const mockIncidents: Incident[] = [
  {
    id: 'WD-001',
    status: 'new',
    severity: 'critical',
    type: 'security',
    typeLabel: 'Security Threat',
    state: 'Lagos',
    lga: 'Eti-Osa',
    ward: 'Ward 3',
    pu: 'PU-004',
    summary: 'Armed individuals reported at polling unit entrance intimidating voters. Situation escalating rapidly.',
    description: 'Multiple witnesses report 4-5 armed men in civilian clothes at the gate of PU-004, Ward 3, Eti-Osa LGA. They are preventing voters wearing certain party colours from entering. INEC officials appear afraid to act. The situation has been ongoing for about 45 minutes.',
    reportedAt: '2024-02-25T08:42:00Z',
    reportedBy: 'Anonymous',
    lat: 6.4541,
    lng: 3.3947,
    hasMedia: true,
  },
  {
    id: 'WD-002',
    status: 'new',
    severity: 'critical',
    type: 'suppression',
    typeLabel: 'Voter Suppression',
    state: 'Kano',
    lga: 'Nassarawa',
    ward: 'Ward 7',
    pu: 'PU-012',
    summary: 'Voters being turned away without valid justification. Queue disbanded by unknown officials.',
    description: 'At approximately 8:15 AM, unidentified persons claiming to be electoral officers began dispersing the queue. About 200 voters were told the unit was "not yet ready" but no official communication given. The INEC officials on ground are not responding to questions.',
    reportedAt: '2024-02-25T08:31:00Z',
    reportedBy: 'Citizen Observer',
    lat: 12.0022,
    lng: 8.5920,
    hasMedia: false,
  },
  {
    id: 'WD-003',
    status: 'new',
    severity: 'moderate',
    type: 'materials',
    typeLabel: 'Missing Materials',
    state: 'Rivers',
    lga: 'Port Harcourt',
    ward: 'Ward 11',
    pu: 'PU-009',
    summary: 'Ballot papers for presidential election missing. Only governorship ballots available.',
    description: 'We arrived at PU-009 and the presiding officer has confirmed that only governorship ballot papers were delivered. Presidential ballots are missing entirely. About 300 people are waiting. The officer has placed calls but no response from INEC HQ.',
    reportedAt: '2024-02-25T08:15:00Z',
    reportedBy: 'Party Agent (LP)',
    lat: 4.8156,
    lng: 7.0498,
    hasMedia: true,
  },
  {
    id: 'WD-004',
    status: 'verifying',
    severity: 'moderate',
    type: 'logistics',
    typeLabel: 'Delayed Staff',
    state: 'Abuja (FCT)',
    lga: 'Gwagwalada',
    ward: 'Ward 2',
    pu: 'PU-003',
    summary: 'INEC officials yet to arrive 2 hours after scheduled opening. Community growing restless.',
    description: 'Voting was supposed to start at 8:30 AM. It is now 10:45 AM and no INEC staff have shown up at PU-003. The materials box is present but locked. Party agents from 3 parties are on ground, voters are frustrated and some are leaving.',
    reportedAt: '2024-02-25T09:55:00Z',
    reportedBy: 'Party Agent (APC)',
    lat: 8.9403,
    lng: 7.0784,
    hasMedia: false,
  },
  {
    id: 'WD-005',
    status: 'verifying',
    severity: 'low',
    type: 'materials',
    typeLabel: 'Missing Materials',
    state: 'Oyo',
    lga: 'Ibadan North',
    ward: 'Ward 5',
    pu: 'PU-021',
    summary: 'Stamp pad ink ran out. Presiding officer improvising, validity of votes questioned.',
    description: 'The ink pad for thumb printing ran dry after approximately 80 voters. The presiding officer is now using a different stamp, which party agents are objecting to. There is no spare ink. About 50 voters are waiting.',
    reportedAt: '2024-02-25T10:12:00Z',
    reportedBy: 'Citizen Observer',
    lat: 7.3775,
    lng: 3.9470,
    hasMedia: true,
  },
  {
    id: 'WD-006',
    status: 'dispatched',
    severity: 'critical',
    type: 'security',
    typeLabel: 'Security Threat',
    state: 'Delta',
    lga: 'Oshimili South',
    ward: 'Ward 1',
    pu: 'PU-007',
    summary: 'Ballot box snatching attempt foiled. Suspects fled. Police en route. Unit secured.',
    description: 'Three men on motorcycles attempted to snatch the ballot box at 11:20 AM. Community members and party agents resisted. The men fired one shot into the air and fled. No casualties. The ballot box is intact. Police have been contacted and are 10 minutes away.',
    reportedAt: '2024-02-25T11:23:00Z',
    reportedBy: 'Community Observer',
    lat: 6.1845,
    lng: 6.7897,
    hasMedia: true,
  },
  {
    id: 'WD-007',
    status: 'dispatched',
    severity: 'moderate',
    type: 'suppression',
    typeLabel: 'Voter Suppression',
    state: 'Enugu',
    lga: 'Enugu North',
    ward: 'Ward 9',
    pu: 'PU-015',
    summary: 'Elderly and disabled voters denied accessible entry. Ramp unavailable, long queues.',
    description: 'The polling unit was set up on an elevated platform with no ramp access. Several elderly voters and two wheelchair users cannot enter. The presiding officer has refused to move the voting booth to an accessible location.',
    reportedAt: '2024-02-25T09:10:00Z',
    reportedBy: 'NGO Observer (Yiaga Africa)',
    lat: 6.4584,
    lng: 7.5464,
    hasMedia: false,
  },
  {
    id: 'WD-008',
    status: 'resolved',
    severity: 'low',
    type: 'logistics',
    typeLabel: 'Delayed Staff',
    state: 'Lagos',
    lga: 'Kosofe',
    ward: 'Ward 4',
    pu: 'PU-002',
    summary: 'Late staff arrival resolved. Voting commenced 90 minutes behind schedule. Now operational.',
    description: 'INEC officials arrived 90 minutes late due to transportation issues. Voting has now commenced and is proceeding smoothly. Queue is long but orderly. No further issues reported.',
    reportedAt: '2024-02-25T07:58:00Z',
    reportedBy: 'Party Agent (PDP)',
    lat: 6.5833,
    lng: 3.3833,
    hasMedia: false,
  },
  {
    id: 'WD-009',
    status: 'resolved',
    severity: 'moderate',
    type: 'materials',
    typeLabel: 'Missing Materials',
    state: 'Kaduna',
    lga: 'Chikun',
    ward: 'Ward 6',
    pu: 'PU-018',
    summary: 'Missing result sheets delivered by INEC logistics team. Voting resumed successfully.',
    description: 'Result sheets (EC8A) were absent from the materials delivered. INEC logistics unit was contacted and delivered the sheets 45 minutes later. Voting resumed at 10:55 AM and is proceeding normally.',
    reportedAt: '2024-02-25T09:40:00Z',
    reportedBy: 'Citizen Observer',
    lat: 10.5333,
    lng: 7.4333,
    hasMedia: false,
  },
]

export const getByStatus = (status: IncidentStatus) =>
  mockIncidents.filter(i => i.status === status)

export const stats = {
  total: mockIncidents.length,
  resolved: mockIncidents.filter(i => i.status === 'resolved').length,
  critical: mockIncidents.filter(i => i.severity === 'critical').length,
  dispatched: mockIncidents.filter(i => i.status === 'dispatched').length,
}

export const nigerianStates = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue',
  'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu',
  'Abuja (FCT)', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina',
  'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun',
  'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba',
  'Yobe', 'Zamfara',
]

export const tickerMessages = [
  '🟢 Ward 4, Kosofe – Delayed staff resolved, voting now underway',
  '🔴 Ward 3, Eti-Osa – Security threat reported, intervention dispatched',
  '🟡 Ward 7, Nassarawa – Voter suppression under verification',
  '🟢 Ward 6, Chikun – Missing materials delivered, voting resumed',
  '🔴 Ward 1, Oshimili South – Ballot box snatching attempt foiled',
  '🟡 Ward 11, Port Harcourt – Missing ballot papers, INEC notified',
  '🟢 All clear reported in 847 polling units across 12 states',
]
