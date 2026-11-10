// All portfolio content lives here. Edit this file to update the site.
// Images go in /public (e.g. /public/apps/bilingo/1.png → "/apps/bilingo/1.png").
// Anything marked TODO is a placeholder — replace or delete it before publishing.

export type StoreLinks = { playStore?: string; appStore?: string; web?: string };

export type FlowStep = { title: string; caption: string };
export type Decision = { title: string; body: string };
export type Wireframe = { src?: string; caption: string };

export type CaseStudy = {
  timeline: string;
  summary: string;
  problem: string;
  users: { name: string; need: string }[];
  goals: string[];
  flow: FlowStep[];
  wireframes: Wireframe[];
  decisions: Decision[];
  accessibility: string[];
  engineering: Decision[];
  outcome: string;
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  role: string;
  year: string;
  platforms: string[];
  stack: string[];
  accent: string;
  screenshots: string[]; // leave empty to show a styled placeholder screen
  storeGraphics?: boolean; // true when screenshots are store promo images that already include a phone frame
  links: StoreLinks;
  metrics?: { label: string; value: string }[];
  featured: boolean;
  caseStudy?: CaseStudy;
};

export const profile = {
  name: "Anurenj",
  initials: "AJ",
  role: "Mobile App Developer & UX Designer",
  location: "India · Open to remote", // TODO
  headline: "I design and build mobile apps people trust.",
  intro:
    "I take products from user flow to App Store — sketching the journey, designing the UI, then shipping it in React Native and Expo for iOS and Android.", // TODO: your own words
  bio: [
    "I'm a mobile developer who designs. For the past 3+ years I've worked across the whole product: mapping user flows, wireframing, polishing UI in Figma, and building production apps in React Native with Expo and EAS.", // TODO
    "I care about the details that make an app feel trustworthy — clear copy, honest loading and error states, accessible touch targets, and screens that still make sense to someone using the app for the first time.", // TODO
  ],
  email: "anurenjatbusiness@gmail.com",
  cvUrl: "/cv.pdf", // TODO: put your CV at /public/cv.pdf
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/your-handle" }, // TODO
    { label: "GitHub", href: "https://github.com/your-handle" }, // TODO
    { label: "Behance", href: "https://www.behance.net/your-handle" }, // TODO or delete
  ],
  stats: [
    { value: "3+", label: "Years building mobile" }, // TODO
    { value: "iOS + Android", label: "From one React Native codebase" },
    { value: "Flow → Store", label: "Design and development, end to end" },
  ],
};

export const process = [
  { step: "01", title: "Understand", body: "Talk to users and stakeholders, define the job the app must do, and agree on what success looks like." },
  { step: "02", title: "Map the flow", body: "Turn goals into user flows and edge cases — empty, loading, error, offline — before any pixels." },
  { step: "03", title: "Wireframe", body: "Low-fidelity screens to test structure and hierarchy fast, without colour getting in the way." },
  { step: "04", title: "Design the UI", body: "Polished, accessible UI in Figma with a small component system that maps one-to-one to code." },
  { step: "05", title: "Build", body: "React Native + Expo, typed with TypeScript, wired to real APIs with auth, secure storage and push." },
  { step: "06", title: "Ship & learn", body: "EAS builds and OTA updates to the stores, then iterate on real usage and feedback." },
];

export const toolkit = [
  {
    group: "Mobile",
    items: ["React Native", "Expo", "EAS Build & Update", "TypeScript", "React Navigation", "Zustand / Redux", "TanStack Query", "SecureStore", "Push notifications"],
  },
  {
    group: "UX & UI",
    items: ["Figma", "User flows", "Wireframes", "Prototyping", "Design systems", "Accessibility (WCAG)", "UX copy", "Usability testing"],
  },
  {
    group: "API & backend",
    items: ["REST APIs", "Auth & tokens", "Node.js / Express", "MongoDB", "Swagger / OpenAPI", "Real-time updates"],
  },
];

// Set enabled: false to hide this section.
export const ai = {
  enabled: true,
  title: "AI where it helps — with a human in the loop",
  intro:
    "I use AI in the products I build and in how I build them, and design those features so people can see what the AI did and correct it.", // TODO
  points: [
    { title: "In products", body: "LLM-backed features such as generated content and assistants, connected to a real backend." }, // TODO
    { title: "In my workflow", body: "Faster prototyping, UX copy drafts and code review — always checked before it ships." },
    { title: "Responsibly", body: "Clear labelling, fallbacks when the model fails, no sensitive data sent without need, and a human review step." },
  ],
};

export const projects: Project[] = [
  {
    slug: "trackolet",
    name: "Trackolet",
    tagline: "Fleet tracking for businesses — live vehicle map, trip replay, SOS and geofence alerts, and exportable reports.",
    category: "Logistics · Real-time GPS",
    role: "UX design & React Native development", // TODO: confirm
    year: "2026", // TODO
    platforms: ["Android"],
    stack: ["React Native", "TypeScript", "Google Maps", "Push notifications", "English + Hindi"], // TODO: confirm
    accent: "#ff8a3d",
    screenshots: ["/apps/trackolet/1.png", "/apps/trackolet/2.png", "/apps/trackolet/3.png"],
    links: { playStore: "https://play.google.com/store/apps/details?id=app.trackolet.default" },
    featured: true,
    caseStudy: {
      timeline: "TODO",
      summary:
        "Trackolet is a fleet tracking app for businesses that run vehicles, machinery and other mobile assets. It turns a constant stream of GPS positions into a live map, trip history, alerts and reports that operations teams can act on from their phone.",
      problem:
        "Fleet managers were tied to a desktop dashboard. When a vehicle sent an SOS, crossed a geofence or went offline, they found out late — and pulling a report for a customer meant waiting until they were back at a computer.",
      users: [
        { name: "Fleet manager", need: "Needs to see the whole fleet at a glance and react the moment something goes wrong." },
        { name: "Operations / admin", need: "Needs trip, stoppage and geofence reports to share with customers and management." },
      ],
      goals: [
        "Keep large fleets readable on a small screen",
        "Surface emergencies instantly, even when the app is closed",
        "Make any report exportable and shareable from the phone",
        "Support English and Hindi from day one",
      ],
      flow: [
        { title: "Fleet overview", caption: "Running, stopped, idle and offline counts" },
        { title: "Find a vehicle", caption: "Search, filter, or tap a map cluster" },
        { title: "Live track / replay", caption: "Follow it now or replay any day's trip" },
        { title: "Alert → report", caption: "SOS or geofence alert, then export PDF / Excel" },
      ],
      wireframes: [
        { caption: "Entity list with live status" },
        { caption: "Trip history & trail" },
        { caption: "Clustered fleet map" },
      ],
      decisions: [
        {
          title: "Clustered markers for big fleets",
          body: "Thousands of vehicles become numbered clusters that split apart as you zoom, so the map stays readable instead of turning into a wall of pins.",
        },
        {
          title: "Status first, details on tap",
          body: "Each vehicle row leads with a colour-and-label status (Moving, Idle, Stopped, Offline), speed and battery, with Live Track and History one tap away.",
        },
        {
          title: "A separate SOS dashboard",
          body: "Emergencies get their own screen and push notifications, so a critical alert is never buried among routine ignition and speed events.",
        },
        {
          title: "Trips as a timeline",
          body: "Trip history reads like a timeline — start and end place names, distance, duration and alert count — with a Play trip button to replay it on the map.",
        },
      ],
      accessibility: [
        "Status shown with text labels, not colour alone",
        "Available in English and Hindi",
        "Light and dark themes for day and night shifts",
        "Readable place names instead of raw coordinates",
      ],
      engineering: [
        { title: "Real-time positions", body: "TODO: how live positions reach the app (polling / sockets) and how the map updates without re-rendering the whole fleet." },
        { title: "Push alerts & reports", body: "TODO: push notification setup for SOS, geofence and over-speed events, and PDF / Excel export and sharing from the device." },
      ],
      outcome: "TODO: Results — fleet size handled (the dashboard shows 18,000+ entities), client feedback, or what you learned.",
    },
  },
  {
    slug: "jesi",
    name: "JESi",
    tagline: "Project tracking for JES customers and engineers — upload projects, follow progress and chat about changes.",
    category: "Engineering · Collaboration",
    role: "UX design & React Native development", // TODO: confirm
    year: "2025", // TODO
    platforms: ["Android"], // TODO: add iOS if it's on the App Store
    stack: ["React Native", "TypeScript", "Real-time chat", "Push notifications"], // TODO: confirm
    accent: "#ff4d6d",
    screenshots: ["/apps/jesi/1.png", "/apps/jesi/2.png", "/apps/jesi/3.png", "/apps/jesi/4.png"],
    storeGraphics: true,
    links: { playStore: "https://play.google.com/store/apps/details?id=com.jesi.android" },
    featured: true,
    caseStudy: {
      timeline: "TODO",
      summary:
        "JESi connects JES engineering customers with the engineers working on their projects. Customers upload Quantity Takeoff and Revit projects, follow progress in real time, and chat with engineers about corrections — all in one app.",
      problem:
        "Project updates were scattered across email and calls. Customers didn't know where their project stood, and correction requests got lost between threads, slowing delivery.",
      users: [
        { name: "Customer", need: "Wants to upload a project, know its status at any moment, and ask for changes without chasing anyone." },
        { name: "JES engineer", need: "Needs clear requests and one place to share updates and final output." },
      ],
      goals: [
        "Project status visible at a glance",
        "Corrections handled in-app, tied to the project",
        "Notifications for every status change",
      ],
      flow: [
        { title: "Upload project", caption: "QTO or Revit, with details and files" },
        { title: "Track progress", caption: "Status, due date and completion" },
        { title: "Chat with engineer", caption: "Ask for corrections in context" },
        { title: "Get final output", caption: "Delivered link and status: Completed" },
      ],
      wireframes: [
        { caption: "Project list" },
        { caption: "Dashboard" },
        { caption: "Project chat" },
      ],
      decisions: [
        {
          title: "Dashboard that answers \"how far along?\"",
          body: "A large completion gauge plus counts for sent, received, ongoing and requested projects tells customers where things stand in one glance.",
        },
        {
          title: "Chat tied to each project",
          body: "Conversations live inside the project, so every correction request has context and structured replies — status, delivery date and final output link.",
        },
        {
          title: "Centre action for the AI assistant",
          body: "The raised \"JESi AI\" button in the tab bar keeps help one tap away from any screen.",
        },
      ],
      accessibility: [
        "Status shown as labelled chips, not colour alone",
        "Search and filters on every project list",
        "Clear, large primary actions",
      ],
      engineering: [
        { title: "Real-time updates", body: "TODO: how status changes and chat messages reach the app (sockets / push) and how unread counts stay in sync." },
        { title: "File uploads", body: "TODO: uploading project files reliably on mobile networks, with progress and retry." },
      ],
      outcome: "TODO: Results or what changed for JES and its customers.",
    },
  },
  {
    slug: "scorelix",
    name: "Scorelix",
    tagline: "A mobile companion for Odoo ERP — role-based dashboards for sales, finance, HR and inventory leads.",
    category: "Enterprise · ERP dashboards",
    role: "UX design & React Native development", // TODO: confirm
    year: "2026", // TODO
    platforms: ["Android"],
    stack: ["React Native", "TypeScript", "Odoo API", "Role-based access", "PDF export"], // TODO: confirm
    accent: "#4d7cff",
    screenshots: ["/apps/scorelix/1.jpg", "/apps/scorelix/2.jpg"],
    links: { playStore: "https://play.google.com/store/apps/details?id=com.scorelix.app" },
    featured: false,
  },
  {
    slug: "bilingo",
    name: "BiLingo",
    tagline: "Turns scrolling time into learning time — quick English, German and Maths lessons that pop up when you've scrolled too long.",
    category: "Education · Digital wellbeing",
    role: "UX design & React Native development", // TODO: confirm
    year: "2026",
    platforms: ["Android"],
    stack: ["React Native", "Expo", "TypeScript", "Android usage access", "AI content pipeline"], // TODO: confirm
    accent: "#a08cff",
    screenshots: ["/apps/bilingo/1.png", "/apps/bilingo/2.png", "/apps/bilingo/3.png"],
    storeGraphics: true,
    links: { playStore: "https://play.google.com/store/apps/details?id=com.dmonly.app" },
    featured: false,
    caseStudy: {
      timeline: "TODO · e.g. 4 months",
      summary:
        "BiLingo is a friendly study ghost that lives on your phone. Instead of asking people to set aside time to study, it turns the small moments they already spend on their phone — unlocking it, or scrolling too long — into bite-sized lessons in English, German and Maths.",
      problem:
        "People lose hours to short-video and social feeds, and traditional learning apps ask for a separate study session that rarely happens. The challenge was to meet users inside the habit they already have, without feeling like a nag or a spy.",
      users: [
        { name: "Habitual scroller", need: "Wants to cut screen time, but blocking apps outright just makes them uninstall the blocker." },
        { name: "Busy learner", need: "Wants to keep vocabulary fresh in English or German without a long daily session." },
      ],
      goals: [
        "Learning that fits into seconds, not sessions",
        "Interruptions that feel friendly, not punishing",
        "Earn trust: track time in apps, never what users do in them",
      ],
      flow: [
        { title: "Pick apps", caption: "Choose which apps eat your time" },
        { title: "Set a limit", caption: "1, 5 or 10 minutes" },
        { title: "Ghost pops in", caption: "Time's up — a quick lesson appears" },
        { title: "Learn & unlock", caption: "Finish the card, streak continues" },
      ],
      wireframes: [
        { caption: "Word-of-the-day interruption" },
        { caption: "Block list & limits" },
        { caption: "WordFlow swipe cards" },
      ],
      decisions: [
        {
          title: "A mascot, not a warning",
          body: "The study ghost delivers every interruption. A character with personality makes \"Enough scrolling! Let's learn.\" feel playful instead of scolding — so people keep the app installed.",
        },
        {
          title: "Reels, but productive",
          body: "WordFlow borrows the vertical swipe pattern users already know from short-video feeds: new words, der/die/das quizzes, spelling tiles, word searches and read-aloud cards, one swipe at a time.",
        },
        {
          title: "Two-button interruptions",
          body: "Each unlock word has exactly two actions — \"I know it\" or \"Next word\" — so a lesson takes a couple of seconds and never blocks the user for long.",
        },
        {
          title: "Progress you can see",
          body: "A Learning Path, daily streak and saved favourites give people a reason to come back on purpose, not only when interrupted.",
        },
      ],
      accessibility: [
        "Privacy by design: only measures how long chosen apps are open, never reads their content",
        "User stays in control — they choose the apps and the limit",
        "Read-aloud cards highlight each word as it is spoken",
        "Clear right/wrong feedback with icons and text, not colour alone",
      ],
      engineering: [
        { title: "TODO: Usage tracking", body: "How the app measures time in selected apps (Android usage access) and triggers the learning break." },
        { title: "TODO: Content pipeline", body: "How lessons and quizzes are generated and kept fresh — e.g. a scheduled backend job using an LLM, reviewed before release." },
      ],
      outcome: "TODO: Results — downloads, rating, retention, or what you learned shipping it.",
    },
  },
  {
    slug: "trueway",
    name: "Trueway Smart Pro",
    tagline: "A smart thermostat app — control temperature, fan speed and schedules for every room, from anywhere.",
    category: "IoT · Smart home",
    role: "UX design & React Native development", // TODO: confirm
    year: "2024",
    platforms: ["iOS", "iPadOS"], // TODO: add Android if it's on Play too
    stack: ["React Native", "TypeScript", "Device Wi-Fi provisioning (AP / SA)", "English + Arabic (RTL)"], // TODO: confirm
    accent: "#38c6e6",
    screenshots: ["/apps/trueway/2.jpg", "/apps/trueway/1.jpg", "/apps/trueway/6.jpg", "/apps/trueway/4.jpg", "/apps/trueway/5.jpg", "/apps/trueway/3.jpg"],
    storeGraphics: true,
    links: { appStore: "https://apps.apple.com/in/app/trueway-smart-pro/id6449385858" },
    featured: false,
    caseStudy: {
      timeline: "TODO",
      summary:
        "Trueway Smart Pro is the companion app for Trueway Controls' smart thermostats. It lets people turn devices on, set the temperature, control fan speed and lock settings for every room in their home or office — from one clear screen.",
      problem:
        "Wall thermostats are fiddly, and managing several of them across rooms and buildings means walking to each one. The app had to make device setup painless and make day-to-day control feel as direct as turning a physical dial.",
      users: [
        { name: "Home owner", need: "Wants each room at the right temperature without getting up — and a quick way to switch everything off." },
        { name: "Facility / office manager", need: "Manages many rooms across places and needs them organised, named and easy to find." },
      ],
      goals: [
        "Set a temperature in one gesture",
        "Get a new thermostat connected without support calls",
        "Organise devices by place and room",
        "Work equally well in English and Arabic",
      ],
      flow: [
        { title: "Welcome", caption: "Simple onboarding, one Continue button" },
        { title: "Add a device", caption: "Connect the thermostat over Wi-Fi" },
        { title: "Places & rooms", caption: "Group devices: Home, Office · Living room, Kitchen…" },
        { title: "Control", caption: "Dial for temperature, plus fan, lock and settings" },
      ],
      wireframes: [
        { caption: "Room control dial" },
        { caption: "Add place / rooms" },
        { caption: "Settings" },
      ],
      decisions: [
        {
          title: "A dial, not a number field",
          body: "The home screen is a large circular dial that mirrors the physical thermostat. Current room temperature sits in the centre, with − / + buttons for precise steps, so it feels familiar on first use.",
        },
        {
          title: "Places → rooms → devices",
          body: "Devices are grouped by place (Home, Office) and room, with suggested room names and icons — so setting up a whole building takes taps, not typing.",
        },
        {
          title: "Empty states that guide",
          body: "With no devices yet, the home screen is a single large + button with one line of help — the next step is always obvious.",
        },
        {
          title: "Four controls, one row",
          body: "Temp, Fan, Lock and Settings sit in one tab row under the dial, keeping every core control a thumb's reach away.",
        },
      ],
      accessibility: [
        "Full English and Arabic support, including right-to-left layout",
        "Dark mode",
        "Large tap targets on the dial controls",
        "No personal data collected (App Store privacy: Data Not Collected)",
      ],
      engineering: [
        {
          title: "Auto connectivity (AP & SA modes)",
          body: "The app connects to the thermostat directly in access-point mode for setup, and through the home network in station mode afterwards — switching automatically. TODO: add how you built it.",
        },
        { title: "TODO: Device communication", body: "How commands (power, temperature, fan, schedule) reach the thermostat and how the UI handles a device that's offline." },
      ],
      outcome: "TODO: Results — number of devices or customers, client feedback, or what you learned.",
    },
  },
];

export const featured = projects.filter((p) => p.featured && p.caseStudy);
export const others = projects.filter((p) => !p.featured || !p.caseStudy);
