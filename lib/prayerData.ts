// Simulated prayer data for Community Prayer Map
// 100 prayers with global distribution

export interface Prayer {
  id: number;
  text: string;
  location: {
    city: string;
    country: string;
    lat: number;
    lng: number;
  };
  theme: string;
  type: 'prayer' | 'praise';
  timestamp: Date;
}

const themes = ['Healing', 'Peace', 'Hope', 'Faith', 'Provision', 'Strength', 'Guidance', 'Gratitude', 'Family', 'Health'];

// Helper to create timestamps
const now = new Date();
const hoursAgo = (h: number) => new Date(now.getTime() - h * 60 * 60 * 1000);
const daysAgo = (d: number) => new Date(now.getTime() - d * 24 * 60 * 60 * 1000);

export const prayers: Prayer[] = [
  // North America (20)
  { id: 1, text: "Praying for my mother's cancer treatment to be successful", location: { city: "New York", country: "USA", lat: 40.7128, lng: -74.0060 }, theme: "Healing", type: "prayer", timestamp: hoursAgo(2) },
  { id: 2, text: "Thank God! My son got accepted to college!", location: { city: "Los Angeles", country: "USA", lat: 34.0522, lng: -118.2437 }, theme: "Gratitude", type: "praise", timestamp: hoursAgo(5) },
  { id: 3, text: "Seeking guidance for a major career decision", location: { city: "Chicago", country: "USA", lat: 41.8781, lng: -87.6298 }, theme: "Guidance", type: "prayer", timestamp: hoursAgo(8) },
  { id: 4, text: "Praying for financial provision for our family", location: { city: "Houston", country: "USA", lat: 29.7604, lng: -95.3698 }, theme: "Provision", type: "prayer", timestamp: hoursAgo(12) },
  { id: 5, text: "Praise God for healing my wife's heart condition!", location: { city: "Toronto", country: "Canada", lat: 43.6532, lng: -79.3832 }, theme: "Healing", type: "praise", timestamp: hoursAgo(18) },
  { id: 6, text: "Need strength to overcome addiction", location: { city: "Phoenix", country: "USA", lat: 33.4484, lng: -112.0740 }, theme: "Strength", type: "prayer", timestamp: daysAgo(1) },
  { id: 7, text: "Praying for peace in my troubled marriage", location: { city: "Philadelphia", country: "USA", lat: 39.9526, lng: -75.1652 }, theme: "Peace", type: "prayer", timestamp: daysAgo(1.5) },
  { id: 8, text: "Asking for hope during unemployment", location: { city: "San Antonio", country: "USA", lat: 29.4241, lng: -98.4936 }, theme: "Hope", type: "prayer", timestamp: daysAgo(2) },
  { id: 9, text: "Thank you Lord for my healthy newborn baby!", location: { city: "San Diego", country: "USA", lat: 32.7157, lng: -117.1611 }, theme: "Family", type: "praise", timestamp: daysAgo(2) },
  { id: 10, text: "Praying for strength during chemotherapy", location: { city: "Dallas", country: "USA", lat: 32.7767, lng: -96.7970 }, theme: "Health", type: "prayer", timestamp: daysAgo(3) },
  { id: 11, text: "Seeking faith during difficult times", location: { city: "Vancouver", country: "Canada", lat: 49.2827, lng: -123.1207 }, theme: "Faith", type: "prayer", timestamp: daysAgo(3) },
  { id: 12, text: "Praying for my children's protection at school", location: { city: "Miami", country: "USA", lat: 25.7617, lng: -80.1918 }, theme: "Family", type: "prayer", timestamp: daysAgo(4) },
  { id: 13, text: "Praise the Lord for provision in my business!", location: { city: "Montreal", country: "Canada", lat: 45.5017, lng: -73.5673 }, theme: "Provision", type: "praise", timestamp: daysAgo(4) },
  { id: 14, text: "Need guidance for choosing the right church", location: { city: "Atlanta", country: "USA", lat: 33.7490, lng: -84.3880 }, theme: "Guidance", type: "prayer", timestamp: daysAgo(5) },
  { id: 15, text: "Praying for inner peace and anxiety relief", location: { city: "Boston", country: "USA", lat: 42.3601, lng: -71.0589 }, theme: "Peace", type: "prayer", timestamp: daysAgo(5) },
  { id: 16, text: "Thank God for answered prayers - got the job!", location: { city: "Seattle", country: "USA", lat: 47.6062, lng: -122.3321 }, theme: "Gratitude", type: "praise", timestamp: daysAgo(6) },
  { id: 17, text: "Praying for hope for my struggling teenager", location: { city: "Denver", country: "USA", lat: 39.7392, lng: -104.9903 }, theme: "Hope", type: "prayer", timestamp: daysAgo(6) },
  { id: 18, text: "Need faith to trust God's plan", location: { city: "Washington DC", country: "USA", lat: 38.9072, lng: -77.0369 }, theme: "Faith", type: "prayer", timestamp: daysAgo(7) },
  { id: 19, text: "Praying for strength after losing my father", location: { city: "Mexico City", country: "Mexico", lat: 19.4326, lng: -99.1332 }, theme: "Strength", type: "prayer", timestamp: daysAgo(8) },
  { id: 20, text: "Praise for complete recovery from surgery!", location: { city: "Calgary", country: "Canada", lat: 51.0447, lng: -114.0719 }, theme: "Health", type: "praise", timestamp: daysAgo(10) },

  // Europe (20)
  { id: 21, text: "Praying for my husband's healing from depression", location: { city: "London", country: "UK", lat: 51.5074, lng: -0.1278 }, theme: "Healing", type: "prayer", timestamp: hoursAgo(1) },
  { id: 22, text: "Thank God for reuniting our family!", location: { city: "Paris", country: "France", lat: 48.8566, lng: 2.3522 }, theme: "Family", type: "praise", timestamp: hoursAgo(4) },
  { id: 23, text: "Seeking peace amid political turmoil", location: { city: "Berlin", country: "Germany", lat: 52.5200, lng: 13.4050 }, theme: "Peace", type: "prayer", timestamp: hoursAgo(7) },
  { id: 24, text: "Praying for guidance in my ministry", location: { city: "Rome", country: "Italy", lat: 41.9028, lng: 12.4964 }, theme: "Guidance", type: "prayer", timestamp: hoursAgo(10) },
  { id: 25, text: "Praise God for provision during tough times!", location: { city: "Madrid", country: "Spain", lat: 40.4168, lng: -3.7038 }, theme: "Provision", type: "praise", timestamp: hoursAgo(14) },
  { id: 26, text: "Need strength to care for elderly parents", location: { city: "Amsterdam", country: "Netherlands", lat: 52.3676, lng: 4.9041 }, theme: "Strength", type: "prayer", timestamp: hoursAgo(20) },
  { id: 27, text: "Praying for hope for refugees in our city", location: { city: "Vienna", country: "Austria", lat: 48.2082, lng: 16.3738 }, theme: "Hope", type: "prayer", timestamp: daysAgo(1) },
  { id: 28, text: "Seeking deeper faith in Christ", location: { city: "Dublin", country: "Ireland", lat: 53.3498, lng: -6.2603 }, theme: "Faith", type: "prayer", timestamp: daysAgo(1.5) },
  { id: 29, text: "Thank you Lord for my sister's healing!", location: { city: "Barcelona", country: "Spain", lat: 41.3851, lng: 2.1734 }, theme: "Healing", type: "praise", timestamp: daysAgo(2) },
  { id: 30, text: "Praying for health for my pregnant wife", location: { city: "Munich", country: "Germany", lat: 48.1351, lng: 11.5820 }, theme: "Health", type: "prayer", timestamp: daysAgo(2) },
  { id: 31, text: "Need gratitude in my heart daily", location: { city: "Stockholm", country: "Sweden", lat: 59.3293, lng: 18.0686 }, theme: "Gratitude", type: "prayer", timestamp: daysAgo(3) },
  { id: 32, text: "Praying for family reconciliation", location: { city: "Warsaw", country: "Poland", lat: 52.2297, lng: 21.0122 }, theme: "Family", type: "prayer", timestamp: daysAgo(4) },
  { id: 33, text: "Praise for God's guidance in new job!", location: { city: "Prague", country: "Czech Republic", lat: 50.0755, lng: 14.4378 }, theme: "Guidance", type: "praise", timestamp: daysAgo(5) },
  { id: 34, text: "Seeking provision for missions trip", location: { city: "Lisbon", country: "Portugal", lat: 38.7223, lng: -9.1393 }, theme: "Provision", type: "prayer", timestamp: daysAgo(5) },
  { id: 35, text: "Praying for peace in Ukraine", location: { city: "Kyiv", country: "Ukraine", lat: 50.4501, lng: 30.5234 }, theme: "Peace", type: "prayer", timestamp: daysAgo(6) },
  { id: 36, text: "Need strength during divorce proceedings", location: { city: "Brussels", country: "Belgium", lat: 50.8503, lng: 4.3517 }, theme: "Strength", type: "prayer", timestamp: daysAgo(7) },
  { id: 37, text: "Thank God for hope restored in my life!", location: { city: "Copenhagen", country: "Denmark", lat: 55.6761, lng: 12.5683 }, theme: "Hope", type: "praise", timestamp: daysAgo(8) },
  { id: 38, text: "Praying for faith to overcome doubt", location: { city: "Oslo", country: "Norway", lat: 59.9139, lng: 10.7522 }, theme: "Faith", type: "prayer", timestamp: daysAgo(10) },
  { id: 39, text: "Seeking healing for chronic pain", location: { city: "Helsinki", country: "Finland", lat: 60.1699, lng: 24.9384 }, theme: "Healing", type: "prayer", timestamp: daysAgo(12) },
  { id: 40, text: "Praise for good health reports!", location: { city: "Athens", country: "Greece", lat: 37.9838, lng: 23.7275 }, theme: "Health", type: "praise", timestamp: daysAgo(15) },

  // Asia (20)
  { id: 41, text: "Praying for wisdom in business decisions", location: { city: "Tokyo", country: "Japan", lat: 35.6762, lng: 139.6503 }, theme: "Guidance", type: "prayer", timestamp: hoursAgo(3) },
  { id: 42, text: "Thank God for family reunited after pandemic!", location: { city: "Seoul", country: "South Korea", lat: 37.5665, lng: 126.9780 }, theme: "Gratitude", type: "praise", timestamp: hoursAgo(6) },
  { id: 43, text: "Praying for healing from diabetes", location: { city: "Shanghai", country: "China", lat: 31.2304, lng: 121.4737 }, theme: "Health", type: "prayer", timestamp: hoursAgo(9) },
  { id: 44, text: "Seeking peace in family disputes", location: { city: "Mumbai", country: "India", lat: 19.0760, lng: 72.8777 }, theme: "Peace", type: "prayer", timestamp: hoursAgo(15) },
  { id: 45, text: "Praise for God's provision during floods!", location: { city: "Bangkok", country: "Thailand", lat: 13.7563, lng: 100.5018 }, theme: "Provision", type: "praise", timestamp: hoursAgo(22) },
  { id: 46, text: "Praying for strength to witness boldly", location: { city: "Singapore", country: "Singapore", lat: 1.3521, lng: 103.8198 }, theme: "Strength", type: "prayer", timestamp: daysAgo(1) },
  { id: 47, text: "Need hope for my children's future", location: { city: "Hong Kong", country: "China", lat: 22.3193, lng: 114.1694 }, theme: "Hope", type: "prayer", timestamp: daysAgo(1.5) },
  { id: 48, text: "Praying for deep faith in our church", location: { city: "Jakarta", country: "Indonesia", lat: -6.2088, lng: 106.8456 }, theme: "Faith", type: "prayer", timestamp: daysAgo(2) },
  { id: 49, text: "Thank you for healing my father's stroke!", location: { city: "Manila", country: "Philippines", lat: 14.5995, lng: 120.9842 }, theme: "Healing", type: "praise", timestamp: daysAgo(2) },
  { id: 50, text: "Praying for my family's spiritual growth", location: { city: "Delhi", country: "India", lat: 28.7041, lng: 77.1025 }, theme: "Family", type: "prayer", timestamp: daysAgo(3) },
  { id: 51, text: "Seeking guidance for ministry direction", location: { city: "Kuala Lumpur", country: "Malaysia", lat: 3.1390, lng: 101.6869 }, theme: "Guidance", type: "prayer", timestamp: daysAgo(4) },
  { id: 52, text: "Praise God for job provision!", location: { city: "Taipei", country: "Taiwan", lat: 25.0330, lng: 121.5654 }, theme: "Gratitude", type: "praise", timestamp: daysAgo(4) },
  { id: 53, text: "Praying for peace in our community", location: { city: "Hanoi", country: "Vietnam", lat: 21.0285, lng: 105.8542 }, theme: "Peace", type: "prayer", timestamp: daysAgo(5) },
  { id: 54, text: "Need strength during persecution", location: { city: "Dhaka", country: "Bangladesh", lat: 23.8103, lng: 90.4125 }, theme: "Strength", type: "prayer", timestamp: daysAgo(6) },
  { id: 55, text: "Thank God for hope renewed!", location: { city: "Osaka", country: "Japan", lat: 34.6937, lng: 135.5023 }, theme: "Hope", type: "praise", timestamp: daysAgo(7) },
  { id: 56, text: "Praying for faith during trials", location: { city: "Kolkata", country: "India", lat: 22.5726, lng: 88.3639 }, theme: "Faith", type: "prayer", timestamp: daysAgo(8) },
  { id: 57, text: "Seeking healing for mental health issues", location: { city: "Bangalore", country: "India", lat: 12.9716, lng: 77.5946 }, theme: "Healing", type: "prayer", timestamp: daysAgo(10) },
  { id: 58, text: "Praying for healthy pregnancy", location: { city: "Chennai", country: "India", lat: 13.0827, lng: 80.2707 }, theme: "Health", type: "prayer", timestamp: daysAgo(12) },
  { id: 59, text: "Thank you for family restoration!", location: { city: "Busan", country: "South Korea", lat: 35.1796, lng: 129.0756 }, theme: "Family", type: "praise", timestamp: daysAgo(15) },
  { id: 60, text: "Praying for provision for orphanage", location: { city: "Ho Chi Minh City", country: "Vietnam", lat: 10.8231, lng: 106.6297 }, theme: "Provision", type: "prayer", timestamp: daysAgo(18) },

  // Africa (15)
  { id: 61, text: "Praying for healing from malaria", location: { city: "Lagos", country: "Nigeria", lat: 6.5244, lng: 3.3792 }, theme: "Healing", type: "prayer", timestamp: hoursAgo(4) },
  { id: 62, text: "Thank God for rain for our crops!", location: { city: "Nairobi", country: "Kenya", lat: -1.2921, lng: 36.8219 }, theme: "Gratitude", type: "praise", timestamp: hoursAgo(11) },
  { id: 63, text: "Praying for peace in our region", location: { city: "Cairo", country: "Egypt", lat: 30.0444, lng: 31.2357 }, theme: "Peace", type: "prayer", timestamp: hoursAgo(16) },
  { id: 64, text: "Seeking guidance for church planting", location: { city: "Johannesburg", country: "South Africa", lat: -26.2041, lng: 28.0473 }, theme: "Guidance", type: "prayer", timestamp: daysAgo(1) },
  { id: 65, text: "Praise God for provision during famine!", location: { city: "Addis Ababa", country: "Ethiopia", lat: 9.0320, lng: 38.7469 }, theme: "Provision", type: "praise", timestamp: daysAgo(2) },
  { id: 66, text: "Praying for strength to rebuild", location: { city: "Accra", country: "Ghana", lat: 5.6037, lng: -0.1870 }, theme: "Strength", type: "prayer", timestamp: daysAgo(3) },
  { id: 67, text: "Need hope for our nation", location: { city: "Dar es Salaam", country: "Tanzania", lat: -6.7924, lng: 39.2083 }, theme: "Hope", type: "prayer", timestamp: daysAgo(4) },
  { id: 68, text: "Praying for faith during hardship", location: { city: "Kinshasa", country: "DR Congo", lat: -4.4419, lng: 15.2663 }, theme: "Faith", type: "prayer", timestamp: daysAgo(5) },
  { id: 69, text: "Thank you Lord for healing my child!", location: { city: "Cape Town", country: "South Africa", lat: -33.9249, lng: 18.4241 }, theme: "Healing", type: "praise", timestamp: daysAgo(6) },
  { id: 70, text: "Praying for health for our village", location: { city: "Kampala", country: "Uganda", lat: 0.3476, lng: 32.5825 }, theme: "Health", type: "prayer", timestamp: daysAgo(8) },
  { id: 71, text: "Seeking family unity", location: { city: "Casablanca", country: "Morocco", lat: 33.5731, lng: -7.5898 }, theme: "Family", type: "prayer", timestamp: daysAgo(10) },
  { id: 72, text: "Praise for God's guidance in decisions!", location: { city: "Kigali", country: "Rwanda", lat: -1.9403, lng: 29.8739 }, theme: "Guidance", type: "praise", timestamp: daysAgo(12) },
  { id: 73, text: "Praying for peace in Sudan", location: { city: "Khartoum", country: "Sudan", lat: 15.5007, lng: 32.5599 }, theme: "Peace", type: "prayer", timestamp: daysAgo(15) },
  { id: 74, text: "Need provision for school fees", location: { city: "Lusaka", country: "Zambia", lat: -15.3875, lng: 28.3228 }, theme: "Provision", type: "prayer", timestamp: daysAgo(20) },
  { id: 75, text: "Thank God for strength to persevere!", location: { city: "Harare", country: "Zimbabwe", lat: -17.8292, lng: 31.0522 }, theme: "Strength", type: "praise", timestamp: daysAgo(25) },

  // South America (12)
  { id: 76, text: "Praying for healing from heart disease", location: { city: "São Paulo", country: "Brazil", lat: -23.5505, lng: -46.6333 }, theme: "Healing", type: "prayer", timestamp: hoursAgo(2) },
  { id: 77, text: "Thank God for hope in our community!", location: { city: "Buenos Aires", country: "Argentina", lat: -34.6037, lng: -58.3816 }, theme: "Hope", type: "praise", timestamp: hoursAgo(8) },
  { id: 78, text: "Praying for peace during economic crisis", location: { city: "Lima", country: "Peru", lat: -12.0464, lng: -77.0428 }, theme: "Peace", type: "prayer", timestamp: hoursAgo(17) },
  { id: 79, text: "Seeking faith to trust God's timing", location: { city: "Bogotá", country: "Colombia", lat: 4.7110, lng: -74.0721 }, theme: "Faith", type: "prayer", timestamp: daysAgo(1) },
  { id: 80, text: "Praise for guidance in career change!", location: { city: "Rio de Janeiro", country: "Brazil", lat: -22.9068, lng: -43.1729 }, theme: "Guidance", type: "praise", timestamp: daysAgo(2) },
  { id: 81, text: "Praying for provision for our ministry", location: { city: "Santiago", country: "Chile", lat: -33.4489, lng: -70.6693 }, theme: "Provision", type: "prayer", timestamp: daysAgo(3) },
  { id: 82, text: "Need strength during grief", location: { city: "Caracas", country: "Venezuela", lat: 10.4806, lng: -66.9036 }, theme: "Strength", type: "prayer", timestamp: daysAgo(4) },
  { id: 83, text: "Praying for family salvation", location: { city: "Quito", country: "Ecuador", lat: -0.1807, lng: -78.4678 }, theme: "Family", type: "prayer", timestamp: daysAgo(6) },
  { id: 84, text: "Thank you for health restored!", location: { city: "Medellín", country: "Colombia", lat: 6.2442, lng: -75.5812 }, theme: "Health", type: "praise", timestamp: daysAgo(8) },
  { id: 85, text: "Praying for gratitude in all things", location: { city: "Montevideo", country: "Uruguay", lat: -34.9011, lng: -56.1645 }, theme: "Gratitude", type: "prayer", timestamp: daysAgo(12) },
  { id: 86, text: "Seeking healing for addiction", location: { city: "Asunción", country: "Paraguay", lat: -25.2637, lng: -57.5759 }, theme: "Healing", type: "prayer", timestamp: daysAgo(16) },
  { id: 87, text: "Praise for God's peace in storms!", location: { city: "La Paz", country: "Bolivia", lat: -16.4897, lng: -68.1193 }, theme: "Peace", type: "praise", timestamp: daysAgo(22) },

  // Oceania (8)
  { id: 88, text: "Praying for guidance in parenting", location: { city: "Sydney", country: "Australia", lat: -33.8688, lng: 151.2093 }, theme: "Guidance", type: "prayer", timestamp: hoursAgo(5) },
  { id: 89, text: "Thank God for provision for our church!", location: { city: "Melbourne", country: "Australia", lat: -37.8136, lng: 144.9631 }, theme: "Provision", type: "praise", timestamp: hoursAgo(13) },
  { id: 90, text: "Praying for strength in ministry", location: { city: "Auckland", country: "New Zealand", lat: -36.8509, lng: 174.7645 }, theme: "Strength", type: "prayer", timestamp: daysAgo(1) },
  { id: 91, text: "Seeking hope for prodigal child", location: { city: "Brisbane", country: "Australia", lat: -27.4698, lng: 153.0251 }, theme: "Hope", type: "prayer", timestamp: daysAgo(3) },
  { id: 92, text: "Praise for faith strengthened!", location: { city: "Perth", country: "Australia", lat: -31.9505, lng: 115.8605 }, theme: "Faith", type: "praise", timestamp: daysAgo(5) },
  { id: 93, text: "Praying for healing from autoimmune disease", location: { city: "Wellington", country: "New Zealand", lat: -41.2866, lng: 174.7756 }, theme: "Healing", type: "prayer", timestamp: daysAgo(7) },
  { id: 94, text: "Need health for aging parents", location: { city: "Adelaide", country: "Australia", lat: -34.9285, lng: 138.6007 }, theme: "Health", type: "prayer", timestamp: daysAgo(10) },
  { id: 95, text: "Thank you for family blessings!", location: { city: "Gold Coast", country: "Australia", lat: -28.0167, lng: 153.4000 }, theme: "Family", type: "praise", timestamp: daysAgo(15) },

  // Middle East (5)
  { id: 96, text: "Praying for peace in our land", location: { city: "Jerusalem", country: "Israel", lat: 31.7683, lng: 35.2137 }, theme: "Peace", type: "prayer", timestamp: hoursAgo(7) },
  { id: 97, text: "Seeking guidance for refugees", location: { city: "Amman", country: "Jordan", lat: 31.9454, lng: 35.9284 }, theme: "Guidance", type: "prayer", timestamp: daysAgo(2) },
  { id: 98, text: "Praise God for faith preserved!", location: { city: "Beirut", country: "Lebanon", lat: 33.8938, lng: 35.5018 }, theme: "Faith", type: "praise", timestamp: daysAgo(4) },
  { id: 99, text: "Praying for provision during hardship", location: { city: "Dubai", country: "UAE", lat: 25.2048, lng: 55.2708 }, theme: "Provision", type: "prayer", timestamp: daysAgo(8) },
  { id: 100, text: "Need hope for persecuted believers", location: { city: "Istanbul", country: "Turkey", lat: 41.0082, lng: 28.9784 }, theme: "Hope", type: "prayer", timestamp: daysAgo(12) },
];

// Get prayers filtered by criteria
export function filterPrayers(
  prayers: Prayer[],
  type: 'all' | 'prayer' | 'praise',
  themes: string[],
  timeRange: '24h' | '7d' | '30d' | 'all'
): Prayer[] {
  const now = new Date();
  
  return prayers.filter(prayer => {
    // Type filter
    if (type !== 'all' && prayer.type !== type) return false;
    
    // Theme filter
    if (themes.length > 0 && !themes.includes(prayer.theme)) return false;
    
    // Time filter
    if (timeRange !== 'all') {
      const hoursDiff = (now.getTime() - prayer.timestamp.getTime()) / (1000 * 60 * 60);
      if (timeRange === '24h' && hoursDiff > 24) return false;
      if (timeRange === '7d' && hoursDiff > 168) return false;
      if (timeRange === '30d' && hoursDiff > 720) return false;
    }
    
    return true;
  });
}

// Get time ago string
export function getTimeAgo(timestamp: Date): string {
  const now = new Date();
  const diff = now.getTime() - timestamp.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);
  
  if (hours < 1) return 'Just now';
  if (hours === 1) return '1 hour ago';
  if (hours < 24) return `${hours} hours ago`;
  if (days === 1) return '1 day ago';
  return `${days} days ago`;
}
