const pageConfig = {
  // Title for your status page
  title: "Swift Peak Hosting Status Page",
  // Links shown at the header of your status page, could set `highlight` to `true`
  links: [
    { link: 'https://www.swiftpeakhosting.co.uk/', label: 'Home' },
    { link: 'https://store.swiftpeakhosting.co.uk/dashboard', label: 'Store Dashboard' },
    { link: 'https://www.swiftpeakhosting.co.uk/', label: 'Documentation' },
    { link: 'mailto:support@swiftpeakh.com', label: 'Support', highlight: true },
  ],
};

const workerConfig = {
  // Write KV at most every 3 minutes unless the status changed
  kvWriteCooldownMinutes: 3,
  // Enable HTTP Basic auth for status page & API
  passwordProtection: 'admin:yourpassword',
  // Define all your monitors here
  monitors: [
    // Primary Website
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
    // Store Dashboard
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
    // Panel Maintenance
    {
      id: 'panel_maintenance_monitor',
      name: 'Control Panel (Maintenance)',
      method: 'GET',
      target: 'https://panel.swiftpeakhosting.co.uk/',
      tooltip: 'Currently down for maintenance',
      statusPageLink: 'https://panel.swiftpeakhosting.co.uk/',
      expectedCodes: [503], // Expecting a maintenance response code
      timeout: 10000,
    },
    // Node PHP Monitor
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
    // VPS Panel N4
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
    // VPS Panel Scotland
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
  ],
  notification: {
    appriseApiServer: "https://notify.swiftpeakh.com",
    recipientUrl: "tgram://botToken/ChatID",
    timeZone: "Europe/London",
    gracePeriod: 10,
  },
  callbacks: {
    onStatusChange: async (
      env,
      monitor,
      isUp,
      timeIncidentStart,
      timeNow,
      reason
    ) => {
      console.log(`Status of monitor ${monitor.name} changed to ${isUp ? 'UP' : 'DOWN'}`);
    },
    onIncident: async (
      env,
      monitor,
      timeIncidentStart,
      timeNow,
      reason
    ) => {
      console.log(`Ongoing incident detected for monitor ${monitor.name}: ${reason}`);
    },
  },
};

// Don't forget this, otherwise compilation fails.
export { pageConfig, workerConfig };
