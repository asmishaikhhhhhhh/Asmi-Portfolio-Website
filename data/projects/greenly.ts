import { needed, type Project } from "@/lib/types";

const project: Project = {
  slug: "greenly",
  title: "Greenly",
  subtitle: "A greener way to grow",
  oneLiner:
    "A connected ecosystem (smart hydroponic unit, solar food truck, three dashboards and a consumer app) that links small-scale hydroponic farmers to suppliers, logistics and buyers.",
  tier: "flagship",
  order: 4,
  kind: "Service ecosystem · Hydroponics",
  year: needed(
    "Year the project was done (Behance publish date Sept 2025 is not the project year)",
  ),
  duration: "8 weeks",
  role: "Research, UX/UI, storyboarding, 3D modelling",
  team: {
    solo: false,
    collaborators: ["Abhishree C.", "Tridib S.", "Tvisha S."],
  },
  disciplines: ["systems", "ux-ui", "research", "physical-brand"],
  thinking: ["systems", "technology", "research", "people", "business"],
  tags: [
    "Internet of Things",
    "Ecosystem design",
    "Branding",
    "UX/UI",
    "Hydroponics",
    "3D product",
  ],
  tools: ["Figma", "Photoshop", "Illustrator", "Blender 3D"],
  accent: "#4E904C",
  cover: {
    type: "motion",
    composition: "greenly",
    poster: {
      src: "/images/projects/greenly/pdf/cover.webp",
      alt: "A phone showing the Greenly splash screen, a laptop with the Fresh Roots farm management dashboard, the Fresh Wheels food truck and a potted basil plant",
    },
  },
  proofPoint: "4 stakeholder apps, each usability tested",
  quickRead: {
    problem:
      "Small hydroponic farms often start as a hobby, cost a lot to run and never reach enough buyers, so many of them close.",
    insight:
      "The trouble isn't growing. It's the disconnection around the farm: low awareness, weak marketing, poor logistics and no single place to see the farm's data.",
    solution:
      "Greenly connects the whole chain: a sensor-equipped modular unit, a solar 'Fresh Wheels' food truck, dashboards for farmers, suppliers and logistics, and a consumer app with live farm views.",
    result: needed(
      "A stated result or outcome for Greenly (none appears in the deck)",
    ),
  },
  chapters: [
    {
      id: "overview",
      stage: "overview",
      title: "A greener way to grow",
      intro:
        "Greenly is a digital platform designed to make sustainable agriculture work: it connects hydroponic farmers with reliable marketplaces and equips them with smart tools to boost productivity.",
      blocks: [
        {
          type: "text",
          body: [
            "Our goal was to address the major pain points: limited market access, low consumer awareness and high operational costs. The answer is an ecosystem that benefits farmers, consumers, suppliers and logistics partners alike.",
          ],
        },
        {
          type: "stakeholderRings",
          heading: "Target audience",
          centre: "HFS",
          rings: [
            {
              name: "Core",
              members: [
                "Hydroponic farmers",
                "Raw material providers",
                "Logistics",
                "Consumers",
                "Revenue models",
              ],
            },
            {
              name: "Intermediary",
              members: [
                "Farming consultants and trainers",
                "Contractors and middlemen",
                "Tech providers",
              ],
            },
            {
              name: "Ancillary",
              members: [
                "Media and influencers",
                "Architectural firms",
                "Municipal corporations",
                "Policy makers",
                "Environmental organisations",
                "Investors",
              ],
            },
          ],
          caption:
            "Stakeholders span three zones: production and distribution, planning and promoting, and investment and regulation.",
        },
        {
          type: "callout",
          label: "Where we focused",
          body: "Hydroponic farmers, raw material providers, logistics, consumers and revenue models (the businesses that buy produce, like cafes, gyms and hospitals).",
        },
      ],
    },
    {
      id: "process",
      stage: "process",
      title: "A user-centred double diamond",
      intro:
        "We followed a user-centred design approach: from not knowing (A) to knowing (B), in four moves.",
      blocks: [
        {
          type: "doubleDiamond",
          from: "Don't know",
          to: "Do know",
          phases: [
            {
              name: "Discover",
              mode: "Research",
              steps: [
                "Finalise the topic",
                "Fix the brief",
                "Conduct primary research",
                "Conduct secondary research",
              ],
            },
            {
              name: "Define",
              mode: "Synthesis",
              steps: [
                "Affinity mapping",
                "Covert observations",
                "Drawing insights",
                "Making HMWs",
              ],
            },
            {
              name: "Develop",
              mode: "Ideation",
              steps: ["Ideate for each HMW", "Evaluate and sequence the ideas"],
            },
            {
              name: "Deliver",
              mode: "Implement",
              steps: ["Scenario planning", "Service blueprint", "Prototype"],
            },
          ],
        },
        {
          type: "systemLayers",
          heading: "System architecture",
          intro:
            "We mapped the system in six layers, from the people it serves to the artefacts it becomes. Each layer builds on the one below.",
          scenarios: [
            {
              who: "Farmer",
              body: "A hydroponic farmer uses a smart system with IoT sensors to monitor crop conditions and optimise growth. The system recommends profitable crops based on demand and automates ordering materials. It alerts the farmer to any issues, tracks stock levels, and connects them with local food trucks or restaurants for direct sales, maximising efficiency and profits.",
            },
            {
              who: "Supplier",
              body: "A supplier logs into the platform to check new and ongoing orders, review stock levels, and identify items needing replenishment. On receiving an order, they review the product details and accept or decline based on availability. The system also tracks payments and outstanding amounts to help manage cash flow.",
            },
            {
              who: "Logistics",
              body: "A logistics manager oversees fresh produce distribution from hydroponic farms. They log in to review pending and urgent orders, track delayed shipments in real time, and prioritise deliveries. Using route management, they assign vehicles and monitor fleet status. For vehicle maintenance issues, they view the details and take quick action, and the emergency delivery feature handles high-priority orders.",
            },
            {
              who: "Customer",
              body: "A customer signs up for a hydroponic farm subscription and is offered a free trial to view live farm streams showing the produce quality. They browse available vegetables, add items to their cart, check out and pay. Along the way, they can read educational resources about hydroponic farming.",
            },
          ],
          flows: [
            {
              who: "Farmer",
              steps: [
                "Check demand and select crops",
                "Assess farm space and materials",
                "Order and track raw materials",
                "Monitor crop health",
                "Respond to alerts and emergencies",
                "Partner with a food truck to boost sales and raise awareness",
              ],
            },
            {
              who: "Supplier",
              steps: [
                "See the count of new, ongoing and upcoming orders",
                "Open the list of new incoming orders",
                "Check product details",
                "Accept or decline orders",
                "View stock levels and find low or critical items",
                "Replenish stock",
                "Review outstanding, receivable and payable amounts",
                "Send a payment reminder",
              ],
            },
            {
              who: "Logistics",
              steps: [
                "Check the orders summary",
                "Open urgent orders and their details",
                "Track delayed orders in real time",
                "Pick a city or area in Route Management to see delivery routes",
                "Handle emergency deliveries",
                "Assign vehicles",
                "Monitor fleet status",
                "Open vehicles with maintenance issues and take action",
              ],
            },
            {
              who: "Customer",
              steps: [
                "Sign up and create an account",
                "Opt for a free trial",
                "View farm live streams",
                "Learn about hydroponic farming",
                "Browse and select fresh vegetables",
                "Add vegetables to the cart",
                "Check out and pay",
              ],
            },
          ],
          points: [
            {
              who: "Farmer",
              groups: [
                {
                  name: "Pre-production",
                  items: [
                    "Inventory details",
                    "Quality of equipment",
                    "Demand of produce",
                    "Quality of raw materials",
                  ],
                },
                {
                  name: "During production",
                  items: [
                    "Environmental parameters: temperature, humidity, light intensity",
                    "Water pH and EC",
                    "Nutrient levels",
                    "Plant growth status",
                    "Energy system status",
                    "Harvest status",
                  ],
                },
                {
                  name: "Post-production & harvesting",
                  items: [
                    "Quantity of produce",
                    "Quality of produce",
                    "Number of packages",
                  ],
                },
              ],
            },
            {
              who: "Supplier",
              groups: [
                {
                  name: "Tech supplier",
                  items: [
                    "Supplier details",
                    "Inventory details",
                    "Quantity of equipment",
                    "Farm and farmer details",
                  ],
                },
                {
                  name: "Raw materials supplier",
                  items: [
                    "Supplier details",
                    "Inventory details",
                    "Quantity of raw materials",
                    "Farm and farmer details",
                  ],
                },
              ],
            },
            {
              who: "Logistics",
              groups: [
                {
                  name: "Raw-material logistics",
                  items: [
                    "Terms of transportation",
                    "Cost of transportation",
                    "Approximate location of shipment",
                    "Condition of equipment when it reaches the customer",
                  ],
                },
                {
                  name: "Loading & dispatch",
                  items: ["Cost of transportation", "Terms of transportation"],
                },
                {
                  name: "Tracking of produce",
                  items: ["Storage environment details"],
                },
                {
                  name: "Delivery & disposal",
                  items: [
                    "Loss of produce during delivery",
                    "Condition of produce when it reaches the customer",
                  ],
                },
              ],
            },
            {
              who: "Customer",
              groups: [
                {
                  name: "HoReCa, airlines, cruises",
                  items: [
                    "Type of produce most often ordered",
                    "Freshness and shelf life",
                    "Price of produce",
                    "Status and location of the ongoing order",
                  ],
                },
                {
                  name: "Retailer",
                  items: [
                    "Freshness and shelf life",
                    "Price of produce",
                    "Type of produce most often ordered",
                    "Status and location of the ongoing order",
                  ],
                },
                {
                  name: "D2C",
                  items: [
                    "Freshness and benefits of produce",
                    "Price of produce",
                    "Type of produce most often ordered",
                    "Status and location of the ongoing order",
                  ],
                },
              ],
            },
          ],
          tech: {
            chains: [
              {
                name: "Sensing the farm",
                steps: [
                  "DHT22: temperature & humidity",
                  "GY-302: light",
                  "Analog pH sensor",
                  "NodeMCU over WiFi",
                  "Farm status",
                ],
              },
              {
                name: "Checking plant health",
                steps: [
                  "Plant health & growth scanner",
                  "Trained AI model",
                  "Plant health & growth status",
                ],
              },
              {
                name: "Moving orders",
                steps: [
                  "Customer puts an order",
                  "Farmer's B2B & B2C orders",
                  "Supplier restocks the farmer",
                  "Logistics delivers",
                  "Order status",
                ],
              },
            ],
            link: {
              label: "Trace each flow in the full tech plan",
              href: "#ideation",
            },
          },
          trees: [
            {
              name: "Farm Connect",
              sections: [
                {
                  name: "Supplier",
                  pages: [
                    {
                      name: "Profile",
                      items: [
                        "Verification (certificates, documents)",
                        "Reviews",
                        "Contacts",
                        "Location",
                      ],
                    },
                    {
                      name: "Inventory",
                      items: ["Current stock", "Last ordered"],
                    },
                    { name: "Demand forecast", items: ["Farmers' demand"] },
                    {
                      name: "Orders",
                      items: ["Farm details", "Pre-orders", "Order details"],
                    },
                    { name: "Current orders", items: [] },
                  ],
                },
                {
                  name: "Logistics",
                  pages: [
                    {
                      name: "Profile",
                      items: [
                        "Verification (certificates, documents)",
                        "Reviews",
                        "Contacts",
                        "Location",
                      ],
                    },
                    {
                      name: "Pending deliveries",
                      items: ["Future deliverables"],
                    },
                    {
                      name: "Your ongoing deliveries",
                      items: ["Delivery status", "Driver status"],
                    },
                  ],
                },
                {
                  name: "Farmer",
                  pages: [
                    {
                      name: "Farm status (home)",
                      items: [
                        "Environment tracking",
                        "Crop cycle",
                        "Plant health",
                        "Farm map",
                        "Your orders",
                        "System status",
                        "Demand forecasting",
                      ],
                    },
                    {
                      name: "Inventory management",
                      items: [
                        "Existing inventory",
                        "Last ordered",
                        "Re-order & suggestions",
                      ],
                    },
                    { name: "Profile", items: ["Farm details"] },
                    {
                      name: "Supplier to farmer",
                      items: [
                        "Supplier list",
                        "Product catalogue",
                        "Delivery status",
                      ],
                    },
                    {
                      name: "Logistics to farmer",
                      items: ["Logistics list", "Services", "Delivery status"],
                    },
                  ],
                },
              ],
            },
            {
              name: "E-commerce app",
              sections: [
                {
                  name: "Farmers",
                  pages: [
                    {
                      name: "Orders",
                      items: ["Current orders", "Pre-orders", "Delivered"],
                    },
                    { name: "Demand forecast", items: ["Customers' demand"] },
                    {
                      name: "Profile",
                      items: [
                        "Certifications",
                        "Reviews",
                        "Location",
                        "Contact details",
                      ],
                    },
                  ],
                },
                {
                  name: "Revenue model & D2C",
                  pages: [
                    { name: "Profile", items: ["Contact details", "Location"] },
                    {
                      name: "Order",
                      items: ["Tracking status", "Details", "Last orders"],
                    },
                    {
                      name: "Farm list",
                      items: [
                        "Produce list",
                        "Reviews",
                        "Upcoming harvest",
                        "Place order",
                      ],
                    },
                    { name: "Recipes (D2C)", items: ["Suggested recipes"] },
                  ],
                },
              ],
            },
            {
              name: "Agronomy app",
              sections: [
                {
                  pages: [
                    { name: "Profile", items: ["Worker details"] },
                    {
                      name: "Scanner",
                      items: [
                        "Scanner interface",
                        "Detection interface: detects plant health and which plant is ready to harvest",
                      ],
                    },
                  ],
                },
              ],
            },
            {
              name: "Driver app",
              sections: [
                {
                  pages: [
                    { name: "Profile", items: ["Driver details"] },
                    {
                      name: "Environment tracking",
                      items: [
                        "Cooling system status & control",
                        "Temperature controls",
                        "Humidity controls",
                        "Misting controls",
                      ],
                    },
                    {
                      name: "Location tracking",
                      items: ["Location", "Route map"],
                    },
                  ],
                },
              ],
            },
            {
              name: "Transport system",
              sections: [
                {
                  name: "NodeMCU",
                  pages: [
                    {
                      name: "Sensors & controllers",
                      items: [
                        "Nutrient sensor",
                        "Cooling controller",
                        "Misting controller",
                        "Humidity sensor and controller",
                        "Temperature sensor",
                      ],
                    },
                  ],
                },
              ],
            },
          ],
          artefacts: [
            {
              name: "Farm Connect",
              kind: "Digital",
              icon: "network",
              skeuomorphism:
                "The temperature display looks like a thermometer.",
              signifier: [
                "Icons represent the levels of environmental controls.",
                "Minimal crop illustrations signify their health, in green, yellow and brown.",
                "Colours show the different states of the system.",
              ],
              metaphor: [
                "Plant health: green is healthy, yellow is imbalance, brown is decaying.",
                "System status: blue is stable, yellow is caution, red is a critical error, orange is update mode, grey is disconnected or idle.",
              ],
              codes: [
                {
                  label: "Plant health",
                  swatches: [
                    { color: "#4E904C", meaning: "Healthy" },
                    { color: "#E3B53C", meaning: "Imbalance" },
                    { color: "#8A5A2B", meaning: "Decaying" },
                  ],
                },
                {
                  label: "System status",
                  swatches: [
                    { color: "#3B78C4", meaning: "Stable" },
                    { color: "#E3B53C", meaning: "Caution" },
                    { color: "#C8402E", meaning: "Critical" },
                    { color: "#E8873A", meaning: "Updating" },
                    { color: "#9A9A94", meaning: "Idle" },
                  ],
                },
              ],
            },
            {
              name: "E-commerce app",
              kind: "Digital",
              icon: "cart",
              skeuomorphism:
                "Product listings resemble a farmer's market, where each stall is a category of produce.",
              signifier: [
                "Colours show order status: green for confirmed, yellow for in transit, red for delayed.",
                "Icons such as a leaf or plant mark product types, and a clock marks delivery times.",
              ],
              metaphor: [
                "Greenhouse and garden metaphors for the dashboard, like a 'Harvest Calendar' for upcoming produce.",
              ],
              codes: [
                {
                  label: "Order status",
                  swatches: [
                    { color: "#4E904C", meaning: "Confirmed" },
                    { color: "#E3B53C", meaning: "In transit" },
                    { color: "#C8402E", meaning: "Delayed" },
                  ],
                },
              ],
            },
            {
              name: "Hydroponic unit",
              kind: "Physical",
              icon: "unit",
              skeuomorphism:
                "Grow beds look like traditional pots or trays, made from durable, inexpensive materials like plastic or fibreboard.",
              signifier: [
                "Universal icons on the sensors: a water droplet for hydration, a leaf for plant health, a sun for light.",
                "A blinking red LED signals urgent actions, such as nutrient top-ups or system faults.",
              ],
              metaphor: [
                "Modular parts that fit together like puzzle pieces, so the unit is easy to assemble and reconfigure.",
              ],
            },
            {
              name: "Food truck",
              kind: "Physical",
              icon: "truck",
              signifier: [
                "Universal icons on the sensors: a water droplet for humidity, a thermometer for temperature.",
                "Visual indicators on the map show where the truck is.",
              ],
              metaphor: [
                "Farm-fresh produce straight to the consumer: fresh and pesticide-free.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "research",
      stage: "research",
      title: "Three gaps, three insights",
      intro:
        "Secondary research showed where hydroponic farming struggles. Primary research, from the farmer's, consumer's, supplier's and logistics side, showed why.",
      blocks: [
        {
          type: "researchMethods",
          heading: "How we listened",
          methods: [
            {
              name: "Secondary research",
              detail:
                "Per stakeholder: farmer, consumer, supplier and logistics",
            },
            {
              name: "Primary research",
              detail: "Farmer, consumer, supplier and logistics perspectives",
            },
            { name: "Covert observations" },
            {
              name: "Affinity mapping",
              detail: "Synthesised into insights and HMW statements",
            },
          ],
        },
        {
          type: "surfaceRoots",
          heading: "What we saw, and what's underneath",
          gaps: [
            {
              title: "Knowledge",
              body: "A **lack of knowledge** leads to **misconceptions** about hydroponic farming.",
            },
            {
              title: "Marketing",
              body: "**Poor marketing strategies** result in **low sales** and a **lack of reach** to the right audience.",
            },
            {
              title: "Productivity",
              body: "Hydroponic farms struggle with productivity because of **limited market insights** and **restricted growing space**.",
            },
          ],
          roots: [
            {
              title: "Cost and closure",
              observation:
                "Farmers struggle to find affordable, reliable equipment, seeds and nutrients. Banks barely understand hydroponics, so loans are hard to get and subsidies are limited.",
              insight:
                "Many farms start as a hobby without proper knowledge. Running costs are high, market access is thin, and the result is closure.",
              opportunity:
                "Lower the risk of closure by raising profitability and reach, not just yield.",
            },
            {
              title: "Awareness",
              observation:
                "Hydroponic produce is shelved next to organic, seen as super-premium, and hard to find consistently in local markets.",
              insight:
                "Premium stores and establishments know little about it, and weak positioning keeps market penetration low.",
              opportunity:
                "Build awareness directly: educational content, farm tours and a food truck that lets people taste the produce.",
            },
            {
              title: "Distribution",
              observation:
                "Equipment is largely imported and not made for Indian conditions. Produce needs trained handlers, and shipments outside local markets face delays and quality issues.",
              insight:
                "Distribution is inefficient because logistics infrastructure doesn't fit the sector's needs and relies on manual labour.",
              opportunity:
                "Connect farmers with suppliers and logistics partners digitally, so delivery is timely and visible.",
            },
          ],
        },
        {
          type: "needed",
          items: [
            "Research sample sizes (how many farmers, consumers, suppliers and logistics people), locations and dates",
            "How primary research was run (interviews, surveys, field visits) and what the covert observations involved",
          ],
        },
        {
          type: "personas",
          heading: "Who we designed for",
          items: [
            {
              name: "Suresh Sharma",
              age: "38",
              descriptor: "Hydroponic farmer",
              needs: [
                "Know which customers value hydroponically grown produce",
                "Guidance on scaling the system and choosing high-return crops",
                "Affordable, reliable logistics",
              ],
              frustrations: [
                "Struggles to explain hydroponics to unfamiliar or sceptical customers",
                "Delayed or inconsistent deliveries",
                "Scaling production while keeping quality",
              ],
            },
            {
              name: "Sunil",
              age: "42",
              descriptor: "Raw material supplier",
              needs: [
                "Bulk review and approval of orders",
                "Accurate delivery time and cost estimates",
                "Automated alerts for overdue payments",
              ],
              frustrations: [
                "Reviewing orders manually leads to fatigue and errors",
                "Estimates that ignore traffic and weather",
                "Overdue payments that are hard to filter",
              ],
            },
            {
              name: "Mohan Lad",
              age: "30",
              descriptor: "Logistics operator",
              needs: [
                "Real-time tracking to adapt routes",
                "Fleet tools that cut operating costs",
                "Predictive maintenance to prevent breakdowns",
              ],
              frustrations: [
                "Route planning across many locations",
                "Late deliveries hurting customer satisfaction",
                "Breakdowns causing delays and repair costs",
              ],
            },
            {
              name: "Ritesh Verma",
              age: "30",
              descriptor:
                "Customer, a bodybuilder switching to a plant-based diet",
              needs: [
                "A quick way to find hydroponic produce on a busy schedule",
                "Trust in quality and freshness",
                "Constant delivery updates",
              ],
              frustrations: [
                "Can't go out and explore markets",
                "Low knowledge about hydroponics, worried about quality",
                "Anxious that delivery might be delayed",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "problem",
      stage: "problem",
      title: "One question for the whole chain",
      blocks: [
        {
          type: "hmw",
          label: "Problem statement",
          statement:
            "How might we empower small-scale hydroponic farmers to **access affordable** and **sustainable raw materials**, **leverage everyday resources**, and **connect with profitable markets** through innovative and simple technologies, **ensuring long-term viability and growth**?",
        },
        {
          type: "valueMap",
          heading: "Value mapping",
          edges: [
            { from: "customer", to: "supplier", values: ["sustainability"] },
            { from: "farmer", to: "supplier", values: ["sustainability"] },
            { from: "logistics", to: "supplier", values: ["reliability"] },
            { from: "supplier", to: "logistics", values: ["networking"] },
            {
              from: "farmer",
              to: "customer",
              values: ["sustainability", "transparency"],
            },
            { from: "customer", to: "farmer", values: ["transparency"] },
            { from: "logistics", to: "customer", values: ["efficiency"] },
            {
              from: "logistics",
              to: "farmer",
              values: ["reliability", "efficiency"],
            },
            { from: "farmer", to: "logistics", values: ["networking"] },
          ],
          caption:
            "What each relationship has to deliver. Core values: reliability, transparency, in-time efficiency, networking and sustainability.",
        },
      ],
    },
    {
      id: "ideation",
      stage: "ideation",
      title: "Many ideas, one MVP",
      intro:
        "During ideation we explored many ways, and products, that could deliver unique value to each stakeholder, which led us to our MVP.",
      blocks: [
        {
          type: "image",
          size: "wide",
          image: {
            src: "/images/projects/greenly/pdf/ideation-wall.webp",
            mono: true,
            alt: "Collage of the ideation stage: a whiteboard of primary and secondary research notes joined by criss-crossing lines, walls of handwritten sticky notes, a digital affinity map, a grey 3D model of a van with roof solar panels, and a paper unit sketch",
          },
        },
        {
          type: "techPlan",
          heading: "Tech plan: how data moves",
          lanes: [
            "Modular unit",
            "Farmer",
            "Supplier",
            "Logistics",
            "Customer",
          ],
          flows: [
            {
              name: "Sensors to dashboard",
              body: "Sensors on the modular unit read the growing conditions and report through a NodeMCU over WiFi into the farmer's farm status.",
              steps: [
                { lane: 0, label: "DHT22 · GY-302 · pH sensor" },
                { lane: 0, label: "Temperature, humidity, light, pH" },
                { lane: 0, label: "NodeMCU", via: "WiFi" },
                { lane: 1, label: "Farm status" },
                { lane: 1, label: "Environment check-up" },
              ],
            },
            {
              name: "Plant health scan",
              body: "The farmer scans a plant, a trained AI model reads the image, and the result updates the farm's plant health and growth status.",
              steps: [
                { lane: 1, label: "Plant health and growth scanner" },
                { lane: 1, label: "Trained AI model" },
                { lane: 1, label: "Plant health and growth status" },
              ],
            },
            {
              name: "Restocking supplies",
              body: "The supplier's stock appears in the farmer's shop. The farmer puts an order, it lands with the supplier, and logistics' vehicle and driver details feed the order status.",
              steps: [
                { lane: 2, label: "Amount of supplies" },
                { lane: 1, label: "Farmer shop: supply list" },
                { lane: 1, label: "Put order" },
                { lane: 2, label: "Incoming orders" },
                { lane: 2, label: "In-transit orders" },
                { lane: 3, label: "Vehicle and driver details" },
                { lane: 2, label: "Order status" },
              ],
            },
            {
              name: "Running low",
              body: "The farmer's inventory tracks raw materials. A shortage feeds straight into the supplier's demand forecasting.",
              steps: [
                { lane: 1, label: "Inventory management" },
                { lane: 1, label: "Amount of raw materials" },
                { lane: 1, label: "Inventory shortage" },
                { lane: 2, label: "Demand forecasting" },
              ],
            },
            {
              name: "Produce to customer",
              body: "The farm's plant list becomes the customer's produce list. Orders come back to the farmer as B2B and B2C orders, and logistics picks them up and reports the status.",
              steps: [
                { lane: 1, label: "Plant list" },
                { lane: 4, label: "Produce list" },
                { lane: 4, label: "Put order" },
                { lane: 1, label: "Incoming orders" },
                { lane: 3, label: "Order management" },
                { lane: 1, label: "In-transit orders" },
                { lane: 1, label: "Order status" },
              ],
            },
          ],
          image: {
            src: "/images/projects/greenly/pdf/tech-plan.webp",
            alt: "Tech plan diagram linking farmer, supplier, customer and logistics; the modular hydroponic unit's DHT22, GY-302, analog pH and NodeMCU sensors report temperature, humidity, light and pH over WiFi into farm status, inventory and order flows",
          },
        },
        {
          type: "conceptFunnel",
          heading: "From sketch to unit",
          stages: [
            { count: "2", label: "low-fi unit concepts" },
            { count: "1", label: "modular zig-zag unit" },
          ],
          concepts: [
            {
              name: "Hexagonal honeycomb unit",
              verdict: "dropped",
              reason:
                "Expensive to produce, since the edges aren't 90°, and the interlocking mechanism is prone to leakage.",
            },
            {
              name: "Zig-zag rectangular units",
              verdict: "kept",
              reason:
                "Rectangular units attached at steps give even light. The paper model's edges were too sharp and its holes too close together.",
            },
          ],
        },
        {
          type: "iconCards",
          heading: "What mid-fi feedback flagged",
          items: [
            {
              title: "Hexagonal unit",
              icon: "price",
              body: "Too expensive to produce, because its edges aren't 90°.",
            },
            {
              title: "Consumer site",
              icon: "trust",
              body: "Felt like any e-commerce site, with nothing special enough to choose hydroponic produce.",
            },
            {
              title: "Logistics screens",
              icon: "branch",
              body: "Confusing: the main task only opened from a different screen.",
            },
            {
              title: "Supplier home",
              icon: "home",
              body: "Felt like an e-commerce app.",
            },
          ],
        },
        {
          type: "needed",
          items: [
            "Which feedback changed which design between mid-fi and hi-fi",
          ],
        },
      ],
    },
    {
      id: "unit",
      stage: "solution",
      title: "Unit redesign",
      intro:
        "A smart hydroponic unit that maximises crop yield by integrating multiple sensors for real-time monitoring. It gives farmers the data that matters, pH, nutrient concentration, temperature and humidity, so they can control growing conditions precisely.",
      blocks: [
        {
          type: "showcase",
          items: [
            {
              title: "The modular zig-zag channel",
              body: "Each module snaps to the next in a stepped line, so the channel climbs as it grows. Water comes in at one end and leaves at the other.",
              chips: ["3 ft 6 in long", "9 in tall", "7 in modules"],
              span: 4,
              image: {
                src: "/images/projects/greenly/pdf/unit/channel.webp",
                cutout: true,
                alt: "3D render of the white stepped zig-zag channel with a basil plant in every module",
              },
            },
            {
              title: "Measured out",
              body: "Six 7 in modules across 3 ft 6 in, stepping down in 3 in levels within a 9 in height.",
              chips: ["3 in steps"],
              span: 2,
              image: {
                src: "/images/projects/greenly/pdf/unit/dimensions.webp",
                cutout: true,
                alt: "Dimensioned drawing of the channel: 3 ft 6 in long, 9 in tall, six 7 in modules and 3 in steps",
              },
            },
            {
              title: "One module",
              body: "Planting holes in the lid, with an inflow at one end and an outflow at the other.",
              chips: ["Inflow", "Outflow"],
              span: 2,
              image: {
                src: "/images/projects/greenly/pdf/unit/module.webp",
                cutout: true,
                alt: "A single white module with four round planting holes in its lid, an inflow pipe at one end and an outflow pipe at the other",
              },
            },
            {
              title: "Racked and recirculating",
              body: "The channels sit on a four-tier rack over a reservoir, with water flowing in at the top and back down.",
              chips: ["4 tiers", "Reservoir"],
              span: 2,
              image: {
                src: "/images/projects/greenly/pdf/unit/rack.webp",
                cutout: true,
                alt: "A four-tier black metal rack of channels over a black reservoir tank, with blue arrows showing the inflow and outflow",
              },
            },
            {
              title: "Fresh Wheels",
              body: "A food truck Greenly provides to farmers, for their customers: “Fresh salads on wheels, harvested through hydroponics, served fresh on the spot.”",
              chips: ["Solar roof", "Scan for app"],
              span: 2,
              image: {
                src: "/images/projects/greenly/pdf/unit/truck.webp",
                cutout: true,
                alt: "The dark green Fresh Wheels food truck with solar panels on the roof, a photo of hydroponic lettuce rows on its side and a 'Scan for app' QR code",
              },
            },
          ],
        },
        {
          type: "process",
          heading: "The IoT plan",
          steps: [
            { title: "DHT22", body: "Reads temperature and humidity." },
            { title: "GY-302", body: "Reads light level." },
            { title: "Analog pH sensor", body: "Reads the water's pH." },
            {
              title: "NodeMCU",
              body: "Sends the readings over WiFi to the farm dashboard.",
            },
          ],
        },
        {
          type: "callout",
          label: "Designed to signal",
          body: "From the dashboard, temperature, humidity and light can be adjusted remotely, and the water drained or balanced. On the unit, sensors carry universal icons (a droplet, a leaf, a sun) and a blinking red LED signals urgent action like nutrient top-ups or system faults.",
        },
        {
          type: "needed",
          items: [
            "Whether the IoT unit was physically built and tested, or exists as renders and the paper mock-up",
          ],
        },
      ],
    },
    {
      id: "stakeholders",
      stage: "solution",
      title: "UX/UI for every stakeholder",
      intro:
        "Each stakeholder gets screens built around their job. They all read from the same system.",
      blocks: [
        {
          type: "text",
          heading: "Customer screens",
          body: [
            "Explore fresh hydroponic produce, learn about its benefits, and order directly from local farms.",
          ],
        },
        {
          type: "image",
          size: "full",
          image: {
            src: "/images/projects/greenly/pdf/customer-onboarding.webp",
            cutout: true,
            alt: "Four onboarding phone screens: Explore hydroponics easily, Consumes 90% less water, Higher nutritional value, and Pesticide and herbicide free",
          },
        },
        {
          type: "image",
          size: "full",
          image: {
            src: "/images/projects/greenly/pdf/customer-screens.webp",
            cutout: true,
            alt: "Four customer app screens with callouts: previous customer testimonials, the Fresh Wheels location for in-person trials, a live view of the farm with recipe suggestions, and a delivery-delayed message with the reason",
          },
        },
        {
          type: "features",
          items: [
            {
              title: "Onboarding that teaches",
              body: "The first screens explain why hydroponics: 90% less water, higher nutritional value, pesticide-free.",
            },
            {
              title: "Trust you can see",
              body: "Testimonials, a Fresh Wheels map for in-person trials, and live views of the farms alongside recipe suggestions.",
            },
            {
              title: "Honest delivery",
              body: "Product pages show expiry and pesticide-free status, the basket shows a 'best till' date, and delays come with a reason.",
            },
          ],
        },
        {
          type: "screenTour",
          heading: "Farmer, supplier and logistics dashboards",
          screens: [
            {
              name: "Farmer",
              lede: "Monitor crops, manage inventory, and connect directly with buyers through an easy-to-use dashboard.",
              image: {
                src: "/images/projects/greenly/pdf/farmer-screens.webp",
                width: 2285,
                height: 602,
                alt: "Farmer dashboards on a laptop and two full screens: Farm Management for Fresh Roots with farm environment, orders, schedule delivery, crop cycles, low stocks and tracking; an emergency pH alert with next steps; and the pH reading flagged red after the alert is closed",
              },
              spots: [
                {
                  x: 12.5,
                  y: 58,
                  title: "Farm environment",
                  body: "Live readings for temperature, humidity, CO₂, daylight cycle and pH, each adjustable from the dashboard.",
                },
                {
                  x: 23,
                  y: 36,
                  title: "Demand in one place",
                  body: "Consumer orders, bulk orders, spot requests and farm-visit requests, each with a quick accept or schedule action.",
                },
                {
                  x: 35,
                  y: 36,
                  title: "Schedule delivery",
                  body: "Orders ready to go out, each with a request-vehicle action.",
                },
                {
                  x: 21,
                  y: 72,
                  title: "Crop cycles",
                  body: "Crops by stage, from germination to vegetation to ready for harvest, row by row.",
                },
                {
                  x: 29,
                  y: 72,
                  title: "Low stocks",
                  body: "Seeds, cocopeat and nutrient solution running low, with an order-now button for each.",
                },
                {
                  x: 57,
                  y: 40,
                  title: "Emergency alert",
                  body: "When pH drifts out of range, the farmer gets an emergency alert with the unit's location and next steps: drain the unit, then resume inflow.",
                },
                {
                  x: 80,
                  y: 58,
                  title: "Alerts that don't go away",
                  body: "Close the alert, and the pH reading stays flagged red in the environment card.",
                },
              ],
            },
            {
              name: "Supplier",
              lede: "List raw materials, track orders, and fulfil farmer requirements efficiently.",
              image: {
                src: "/images/projects/greenly/pdf/supplier-screens.webp",
                width: 2285,
                height: 680,
                alt: "Supplier dashboards on a laptop and three screens: orders overview, inventory summary and payments; payment summary with inventory insight; an alert map with insights; and an orders table",
              },
              spots: [
                {
                  x: 11,
                  y: 45,
                  title: "Orders overview",
                  body: "New and ongoing orders on the home screen, each with accept and decline.",
                },
                {
                  x: 22,
                  y: 35,
                  title: "Inventory summary",
                  body: "Full, low and out-of-stock items at a glance, with a re-order action.",
                },
                {
                  x: 42,
                  y: 55,
                  title: "Payments",
                  body: "Receivable and payable payments, with one-tap reminders for overdue invoices.",
                },
                {
                  x: 52,
                  y: 45,
                  title: "Inventory insight",
                  body: "Stock health by turnover, with priority recommendations to recalibrate excess or inadequate stock.",
                },
                {
                  x: 66,
                  y: 28,
                  title: "Alerts on a map",
                  body: "On-route problems, like a breakdown, show on a map with the impacted orders.",
                },
                {
                  x: 66,
                  y: 62,
                  title: "Logistics insight",
                  body: "Logistics cost for the month and delivery cost against revenue per order, over the last six months.",
                },
                {
                  x: 85,
                  y: 50,
                  title: "Every order",
                  body: "All orders in one table with availability and accept or decline. Unallocated orders can be auto-assigned a vehicle.",
                },
              ],
            },
            {
              name: "Logistics",
              lede: "Coordinate deliveries, optimise routes, and get produce from farm to market on time.",
              image: {
                src: "/images/projects/greenly/pdf/logistics-screens.webp",
                width: 2285,
                height: 626,
                alt: "Logistics dashboards on a laptop and screens: schedule delivery with priority orders, route management and emergency delivery; cancelled deliveries; order management with order types, schedule deliveries and notifications; and driver details",
              },
              spots: [
                {
                  x: 11,
                  y: 32,
                  title: "Orders summary",
                  body: "Delayed, in-transit and delivered orders at a glance.",
                },
                {
                  x: 11,
                  y: 58,
                  title: "Priority orders",
                  body: "Emergency and delayed orders surface first, each with resolve or track.",
                },
                {
                  x: 24,
                  y: 48,
                  title: "Route management",
                  body: "Routes on a map, with diversions and emergency deliveries, so a delayed order gets resolved, not just reported.",
                },
                {
                  x: 34,
                  y: 32,
                  title: "Fleet and drivers",
                  body: "Fleet status (in maintenance, idle, active) and priority vehicles to assign.",
                },
                {
                  x: 47,
                  y: 32,
                  title: "Cancelled deliveries",
                  body: "Cancelled deliveries by route, with a reassign-route action, and destinations added to a route with timings.",
                },
                {
                  x: 62,
                  y: 35,
                  title: "Order management",
                  body: "Order types by status, an order list, and a calendar to schedule deliveries.",
                },
                {
                  x: 78,
                  y: 65,
                  title: "Delivery notifications",
                  body: "Almost-done, cancelled and pending deliveries, with notify, reschedule, optimise-route and assign actions.",
                },
                {
                  x: 92,
                  y: 28,
                  title: "Drivers and idle vehicles",
                  body: "Driver details with a call button, and idle vehicles ready to be assigned.",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "testing",
      stage: "testing",
      title: "Four rounds of testing",
      intro:
        "We tested the hi-fi designs with every stakeholder: farmer, supplier, logistics and consumer.",
      blocks: [
        {
          type: "testRack",
          heading: "What each stakeholder told us",
          tiers: [
            {
              title: "Farmer",
              notes: [
                {
                  tone: "learned",
                  text: "pH readings don't differ much between rows of the unit, so per-row sensors mainly add cost; monitoring at the outflow works.",
                },
                {
                  tone: "learned",
                  text: "Space optimisation only matters when demand exceeds supply. Right now it's the opposite.",
                },
                {
                  tone: "learned",
                  text: "Most crop loss happens when action isn't taken despite knowing what's wrong, or when there's no knowledge at all.",
                },
                {
                  tone: "learned",
                  text: "The unit and sensors work well for a large farm. On a smaller farm, sensor-specific indication becomes expensive.",
                },
              ],
            },
            {
              title: "Supplier",
              notes: [
                {
                  tone: "worked",
                  text: "The screen is easy on the eyes, with the key actions highlighted on the home screen.",
                },
                {
                  tone: "fix",
                  text: "Logistics allocation isn't highlighted on the home screen, which makes allocating vehicles harder.",
                },
                {
                  tone: "fix",
                  text: "The average credit period (receivable and payable), a key variable for managing cash flow, is missing.",
                },
              ],
            },
            {
              title: "Logistics",
              notes: [
                {
                  tone: "fix",
                  text: "Tracking small orders in real time is hard without more granular data.",
                },
                {
                  tone: "fix",
                  text: "The route optimisation system isn't developed enough in the interface to be useful.",
                },
                {
                  tone: "worked",
                  text: "Delivery tracking is smooth, and real-time updates help logistics managers stay on top of shipments.",
                },
                {
                  tone: "fix",
                  text: "Supplier-to-farmer B2B deliveries look the same as last-mile B2B and B2C deliveries, which confuses.",
                },
              ],
            },
            {
              title: "Consumer",
              notes: [
                {
                  tone: "worked",
                  text: "The 2-hour freshness, farm to table, is unique and attractive.",
                },
                {
                  tone: "fix",
                  text: "The number in the top-left corner of 'buy again' items is ambiguous.",
                },
                {
                  tone: "fix",
                  text: "In the trial section, it isn't clear that products are free trials, not discounts.",
                },
                {
                  tone: "fix",
                  text: "Product pages lack details like nutritional information, which quick-commerce apps like Zepto have started to add.",
                },
                {
                  tone: "worked",
                  text: "The 'best till' date in the basket is unique and helpful.",
                },
              ],
            },
          ],
        },
        {
          type: "needed",
          items: [
            "How usability testing was run: method, tasks and number of participants per stakeholder",
          ],
        },
      ],
    },
    {
      id: "future",
      stage: "future",
      title: "Where Greenly grows next",
      intro:
        "Greenly can grow through community-driven farming networks, blockchain for supply-chain transparency, and vertical integration through packaging and branding support. Urban farming hubs can meet rising local demand while cutting logistics costs, and educational programmes can help more farmers adopt sustainable hydroponics.",
      blocks: [
        {
          type: "businessModel",
          heading: "Business model",
          partners: [
            "Hydroponic equipment suppliers",
            "IoT sensor manufacturers (pH and nutrient monitoring)",
            "Logistics partners (local delivery services, transport companies)",
            "High-end cafes, restaurants and airlines",
            "Local farmer cooperatives and communities",
            "Marketing agencies (awareness and promotions)",
          ],
          activities: [
            "Build hydroponic units",
            "Monitor farms with IoT",
            "Manage logistics and distribution",
            "Operate the e-commerce platform",
            "Customer education and support",
          ],
          resources: [
            "Hydroponic expertise",
            "IoT and tech infrastructure",
            "Logistics network",
            "Financial backing",
            "Retail partnerships",
          ],
          value: [
            "Fresh, local, pesticide-free produce",
            "Cost-effective hydroponic systems",
            "Reduced transport costs and emissions",
            "Real-time farm monitoring",
            "Farm-to-table solutions",
          ],
          relationships: [
            "Support for farmers",
            "Education for consumers",
            "Loyalty programmes",
            "Community engagement",
          ],
          channels: [
            "E-commerce platform",
            "Partner stores and cafes",
            "Food trucks",
            "Social media and marketing",
          ],
          segments: [
            "Hydroponic farmers",
            "Health-conscious consumers",
            "Cafes, restaurants and airlines",
            "Urban eco-friendly shoppers",
          ],
          revenue: [
            "Hydroponic unit sales",
            "Produce delivery subscriptions",
            "B2B partnerships",
            "Workshops and education",
            "Data insights sales",
          ],
          costs: [
            {
              label: "Hydroponic unit production",
              min: 7000,
              max: 75000,
              per: "unit",
              note: "Manual systems",
            },
            {
              label: "Tech development and maintenance",
              min: 200000,
              max: 700000,
              note: "Basic app and affordable sensors",
            },
            {
              label: "Logistics and operations",
              min: 50000,
              max: 150000,
              per: "month",
              note: "Local deliveries, smaller vehicles",
            },
            {
              label: "Warehouse and storage",
              min: 30000,
              max: 100000,
              per: "month",
              note: "Shared or low-cost spaces",
            },
            {
              label: "Marketing",
              min: 20000,
              max: 100000,
              per: "month",
              note: "Focus on organic social media growth",
            },
          ],
        },
      ],
    },
    {
      id: "takeaways",
      stage: "takeaways",
      title: "What I took away",
      blocks: [
        {
          type: "list",
          items: [
            "Practical experience in user research and problem-solving for real-world agricultural challenges.",
            "Designing simple, accessible UI for people who aren't tech-savvy, like small-scale farmers.",
            "Stronger skills in Figma, Miro and other UX tools.",
            "Why market positioning and logistics matter in sustainable systems.",
            "Working well in a team, and adapting designs based on user feedback.",
            "How design can drive impact through education, community and sustainability.",
          ],
        },
      ],
    },
  ],
  contribution: {
    mine: [
      "Research, including interviews",
      "Synthesis of the research into insights",
      "UX/UI for the stakeholders",
      "Storyboarding",
      "3D modelling",
    ],
  },
  links: {
    behance:
      "https://www.behance.net/gallery/234272909/Greenly-Connecting-small-scaled-farmers-to-the-market",
  },
  seo: {
    title: "Greenly: Connecting hydroponic farmers to market · Asmi Shaikh",
    description:
      "A hydroponics ecosystem: a sensor-equipped modular unit, a solar food truck, farmer, supplier and logistics dashboards, and a consumer app.",
  },
};

export default project;
