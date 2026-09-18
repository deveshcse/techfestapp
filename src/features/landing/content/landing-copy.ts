export const brand = {
  name: "TechFestApp",
  tagline: "Run technical festivals without the spreadsheet chaos.",
};

export const navLinks = [
  { name: "Product", href: "#product" },
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "#pricing" },
  { name: "FAQ", href: "#faq" },
] as const;

export const hero = {
  brand: "TechFestApp",
  headline: "Technical festivals, fully under control.",
  support:
    "Create techfests, schedule activities, automate waitlists, and track attendance from one dashboard built for campuses.",
  primaryCta: { label: "Start free", href: "/auth/signup" },
  secondaryCta: { label: "See how it works", href: "#how-it-works" },
};

export const socialProof = {
  eyebrow: "Built for campus organizers",
  headline: "Designed for the way student events actually run",
  orgs: [
    "Engineering Clubs",
    "Hackathon Teams",
    "IEEE Student Branches",
    "Cultural & Tech Societies",
    "College Fest Committees",
    "Workshop Organizers",
  ],
};

export const problemOutcome = {
  eyebrow: "Why teams switch",
  headline: "Stop juggling forms, chats, and sheets",
  support:
    "Most techfests still run on scattered tools. TechFestApp brings registrations, capacity, and day-of operations into one place.",
  pains: [
    {
      title: "Scattered sign-ups",
      description: "Google Forms, WhatsApp lists, and last-minute Excel fixes.",
    },
    {
      title: "Overbooked workshops",
      description: "Popular sessions overflow with no waitlist automation.",
    },
    {
      title: "Blind day-of ops",
      description: "No live attendance view when check-in actually matters.",
    },
  ],
  outcomes: [
    {
      title: "One source of truth",
      description: "Festivals, activities, and registrations stay synced.",
    },
    {
      title: "Capacity that self-manages",
      description: "Waitlists fill seats as attendees drop or confirm.",
    },
    {
      title: "Live floor visibility",
      description: "Organizers mark attendance and see status in real time.",
    },
  ],
};

export const productShowcase = {
  eyebrow: "Product",
  headline: "Everything organizers touch, in one workspace",
  support:
    "From publishing a techfest to checking in the last attendee — the flow stays clear.",
  tabs: [
    {
      id: "festivals",
      label: "Festivals",
      title: "Publish and manage techfests",
      description:
        "Create festivals with dates, venues, and media. Keep published events visible to your team.",
    },
    {
      id: "activities",
      label: "Activities",
      title: "Schedule workshops and competitions",
      description:
        "Define capacity, rules, and organizers for every session under a techfest.",
    },
    {
      id: "attendance",
      label: "Attendance",
      title: "Check in participants live",
      description:
        "Mark attendance as people arrive. Status updates stay with the activity record.",
    },
    {
      id: "analytics",
      label: "Analytics",
      title: "See registration trends",
      description:
        "Track sign-ups and activity performance so the next fest improves on the last.",
    },
  ],
};

export const features = {
  eyebrow: "Capabilities",
  headline: "Built for the full festival lifecycle",
  support:
    "Not a generic event tool — TechFestApp is shaped around technical campus festivals.",
  items: [
    {
      title: "Festival workspaces",
      description:
        "Spin up a techfest with dates, venue, and branding, then manage every activity under it.",
      outcome: "One dashboard per festival",
    },
    {
      title: "Activity scheduling",
      description:
        "Plan workshops, hackathons, and talks with capacity limits and assigned organizers.",
      outcome: "Clear session ownership",
    },
    {
      title: "Waitlist automation",
      description:
        "When seats fill, waitlists take over so popular activities stay fair and full.",
      outcome: "No more manual seat juggling",
    },
    {
      title: "Attendance tracking",
      description:
        "Check participants in during the event and keep an accurate record for certificates and reports.",
      outcome: "Day-of ops without chaos",
    },
    {
      title: "Registration insights",
      description:
        "Watch registration trends and activity breakdowns before and after the fest.",
      outcome: "Decisions backed by data",
    },
    {
      title: "Role-based access",
      description:
        "Give admins, organizers, and students the right permissions — nothing more.",
      outcome: "Secure by default",
    },
  ],
};

export const howItWorks = {
  eyebrow: "How it works",
  headline: "Live in three steps",
  support: "From empty slate to open registrations without a setup circus.",
  steps: [
    {
      cue: "Setup",
      title: "Create your techfest",
      description:
        "Set dates, venue, and details. Publish when you are ready for your team.",
    },
    {
      cue: "Build",
      title: "Add activities",
      description:
        "Define workshops and competitions with capacity, schedules, and organizers.",
    },
    {
      cue: "Launch",
      title: "Open registrations",
      description:
        "Students sign up, waitlists fill gaps, and attendance tracks on the day.",
    },
  ],
};

export const personas = {
  eyebrow: "Built for every role",
  headline: "The right tools for who you are",
  support: "Students, organizers, and admins each get a focused experience.",
  items: [
    {
      role: "Organizers",
      description:
        "Create activities, manage capacity, assign staff, and run check-in without leaving the dashboard.",
    },
    {
      role: "Students",
      description:
        "Browse activities, register for sessions, and track your own registrations in one place.",
    },
    {
      role: "Admins",
      description:
        "Oversee festivals, permissions, and overall platform health across the campus.",
    },
  ],
};

export const pricing = {
  eyebrow: "Pricing",
  headline: "Start free. Scale when campus needs grow.",
  support:
    "No credit card to explore. Upgrade when you need more seats, support, or campus-wide rollout.",
  plans: [
    {
      name: "Starter",
      price: "Free",
      period: "",
      description: "For clubs launching their first techfest.",
      cta: { label: "Create account", href: "/auth/signup" },
      highlighted: false,
      features: [
        "1 active techfest",
        "Unlimited activities",
        "Waitlists & registrations",
        "Attendance tracking",
        "Basic analytics",
      ],
    },
    {
      name: "Campus",
      price: "Custom",
      period: "",
      description: "For colleges running multiple festivals a year.",
      cta: { label: "Talk to us", href: "/contact" },
      highlighted: true,
      features: [
        "Unlimited techfests",
        "Role-based access for staff",
        "Priority onboarding",
        "Campus branding support",
        "Shared organizer workspace",
      ],
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For universities and multi-campus networks.",
      cta: { label: "Contact sales", href: "/contact" },
      highlighted: false,
      features: [
        "Everything in Campus",
        "Dedicated success contact",
        "Custom integrations",
        "SLA & security review",
        "Training for fest committees",
      ],
    },
  ],
};

export const testimonials = {
  eyebrow: "From organizers",
  headline: "What campus teams care about",
  support:
    "Early feedback themes from committees moving off forms and spreadsheets.",
  items: [
    {
      quote:
        "Waitlists alone saved us hours the week before the fest. Popular workshops stayed full without spreadsheet drama.",
      name: "Aisha R.",
      role: "Fest Coordinator, Engineering Society",
    },
    {
      quote:
        "Attendance check-in on the day used to be chaos. Having it tied to each activity changed how our volunteers work.",
      name: "Marcus T.",
      role: "Workshop Lead, Hackathon Club",
    },
    {
      quote:
        "We finally have one place for festivals, sessions, and who is registered. Less pinging people in group chats.",
      name: "Priya K.",
      role: "Student Organizer, IEEE Branch",
    },
  ],
};

export const faq = {
  eyebrow: "FAQ",
  headline: "Questions organizers ask first",
  support: "Straight answers before you create an account.",
  items: [
    {
      question: "Who is TechFestApp for?",
      answer:
        "Campus clubs, fest committees, and student organizers who run technical festivals, workshops, and hackathons — plus the admins who oversee them.",
    },
    {
      question: "Is it free to start?",
      answer:
        "Yes. The Starter plan is free so you can create a techfest, add activities, and run registrations without a credit card. Campus and Enterprise plans are custom when you need more scale.",
    },
    {
      question: "How do waitlists work?",
      answer:
        "When an activity hits capacity, new interested students join the waitlist. As seats open, the platform helps you keep sessions filled without manual list management.",
    },
    {
      question: "Can multiple organizers manage one fest?",
      answer:
        "Yes. Role-based access lets you assign organizers to activities while admins retain broader control over the festival.",
    },
    {
      question: "Does it support attendance on event day?",
      answer:
        "Yes. Organizers can mark attendance against each activity so you have a live and historical record of who showed up.",
    },
    {
      question: "Where is my data stored?",
      answer:
        "Account and festival data live in our application database. See the Privacy Policy for how we handle personal information and your rights.",
    },
  ],
};

export const cta = {
  headline: "Ready to run your next techfest?",
  support:
    "Create an account, publish your festival, and open registrations — free to start.",
  primaryCta: { label: "Start free", href: "/auth/signup" },
  secondaryCta: { label: "Request a demo", href: "/contact" },
  note: "No credit card required",
};

export const footer = {
  blurb:
    "The platform for technical festival management — registrations, waitlists, and attendance in one place.",
  product: [
    { name: "Features", href: "/#features" },
    { name: "How it works", href: "/#how-it-works" },
    { name: "Pricing", href: "/#pricing" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
  ],
  social: [
    { name: "Twitter", href: "https://twitter.com/deveshcss" },
    { name: "GitHub", href: "https://github.com/deveshcse" },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/deveshcse" },
  ],
};
