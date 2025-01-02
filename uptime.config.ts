const pageConfig = {
  title: "Swift Peak Hosting Status Page",
  links: [
    { link: 'https://www.swiftpeakhosting.co.uk/', label: 'Home' },
    { link: 'https://store.swiftpeakhosting.co.uk/dashboard', label: 'Store Dashboard' },
    { link: 'https://www.swiftpeakhosting.co.uk/', label: 'Documentation' },
    { link: 'https://www.swiftpeakhosting.co.uk/contact', label: 'Support', highlight: true },
  ],
};

const workerConfig = {
  kvWriteCooldownMinutes: 3,
  monitors: [
    {
      id: 'primary_website_monitor',
      name: 'Swift Peak Hosting Website',
      method: 'GET',
      target: 'https://www.swiftpeakhosting.co.uk',
      tooltip: 'Main website for Swift Peak Hosting',
      statusPageLink: 'https://www.swiftpeakhosting.co.uk',
      expectedCodes: [200],
      timeout: 10000,
      headers: {
        'User-Agent': 'SwiftPeakMonitor/1.0',
      },
    },
    {
      id: 'store_dashboard_monitor',
      name: 'Store Dashboard',
      method: 'GET',
      target: 'https://store.swiftpeakhosting.co.uk/dashboard',
      tooltip: 'Store dashboard for client purchases',
      statusPageLink: 'https://store.swiftpeakhosting.co.uk/dashboard',
      expectedCodes: [200],
      timeout: 10000,
    },
    {
      id: 'node1_php_monitor',
      name: 'Node 1 PHP Service',
      method: 'GET',
      target: 'https://n1php.swiftpeakhosting.co.uk',
      tooltip: 'PHP service on Node 1',
      statusPageLink: 'https://n1php.swiftpeakhosting.co.uk',
      expectedCodes: [200],
      timeout: 10000,
    },
    {
      id: 'vps_panel_n4_monitor',
      name: 'VPS Panel Node 4',
      method: 'GET',
      target: 'https://vps-panel-n4.swiftpeakhosting.co.uk/#v1:0:18:4:::::::14',
      tooltip: 'VPS management panel for Node 4',
      statusPageLink: 'https://vps-panel-n4.swiftpeakhosting.co.uk/#v1:0:18:4:::::::14',
      expectedCodes: [200],
      timeout: 10000,
    },
    {
      id: 'vps_panel_n1_scotland_monitor',
      name: 'VPS Panel Node 1 Scotland',
      method: 'GET',
      target: 'https://vps-panel-n1-scotland.swiftpeakhosting.co.uk/#v1:0:18:4:::::::',
      tooltip: 'VPS management panel for Node 1 in Scotland',
      statusPageLink: 'https://vps-panel-n1-scotland.swiftpeakhosting.co.uk/#v1:0:18:4:::::::',
      expectedCodes: [200],
      timeout: 10000,
    },

    {
      id: 'vps_panel_n1_USA_monitor',
      name: 'Coming Soon VPS Panel Node 1 USA',
      method: 'GET',
      target: 'https://vps-panel-n1-scotland.swiftpeakhosting.co.uk/#v1:0:18:4:::::::',
      tooltip: 'VPS management panel for Node 1 in USA',
      statusPageLink: 'https://vps-panel-n1-scotland.swiftpeakhosting.co.uk/#v1:0:18:4:::::::',
      expectedCodes: [200],
      timeout: 10000,
    },
  ],
  notification: {
    appriseApiServer: "https://notify.swiftpeakh.com",
    recipientUrl: "tgram://botToken/ChatID",
    timeZone: "Europe/London",
    gracePeriod: 10,
  },
  callbacks: {
    onStatusChange: async (
      env: Record<string, any>, // Type for environment variables
      monitor: { name: string }, // Minimal type; expand as needed
      isUp: boolean,
      timeIncidentStart: Date | null,
      timeNow: Date,
      reason: string
    ) => {
      console.log(`Status of monitor ${monitor.name} changed to ${isUp ? 'UP' : 'DOWN'}`);
    },
    onIncident: async (
      env: Record<string, any>,
      monitor: { name: string },
      timeIncidentStart: Date,
      timeNow: Date,
      reason: string
    ) => {
      console.log(`Ongoing incident detected for monitor ${monitor.name}: ${reason}`);
    },
  },
};

// Don't forget this, otherwise compilation fails.
export { pageConfig, workerConfig };
