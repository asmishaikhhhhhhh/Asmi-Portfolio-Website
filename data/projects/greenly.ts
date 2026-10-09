import { needed, type Project } from "@/lib/types";

const img = (n: string) => `/images/projects/greenly/${n}.webp`;

const project: Project = {
  slug: "greenly",
  title: "Greenly",
  subtitle: "A greener way to grow",
  oneLiner:
    "A connected ecosystem (smart hydroponic unit, solar food truck, three dashboards and a consumer app) that links small-scale hydroponic farmers to suppliers, logistics and buyers.",
  tier: "flagship",
  order: 4,
  kind: "Service ecosystem · Hydroponics",
  year: needed("Year the project was done (Behance publish date Sept 2025 is not the project year)"),
  duration: needed("Project duration"),
  role: needed("Asmi's role on Greenly"),
  team: { solo: false, note: "Slides refer to 'we'; collaborators not credited" },
  disciplines: ["systems", "ux-ui", "research", "physical-brand"],
  thinking: ["systems", "technology", "research", "people", "business"],
  tags: ["Hydroponics", "IoT", "Service design", "Dashboards", "Mobile app", "3D product"],
  tools: ["Figma", "Photoshop", "Illustrator", "Blender 3D"],
  accent: "#4E904C",
  cover: {
    type: "motion",
    composition: "greenly",
    poster: {
      src: img("38"),
      alt: "Greenly farmer dashboard for the demo farm Fresh Roots, showing farm environment readings, orders, scheduled deliveries, crop cycles, low stocks and order tracking",
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
    result: needed("A stated result or outcome for Greenly (none appears in the deck)"),
  },
  chapters: [
    {
      id: "context",
      label: "Context",
      title: "Soil not included",
      intro:
        "Hydroponics grows plants without soil, in nutrient-rich water. It gives precise control over growing conditions and suits cities where space is tight.",
      blocks: [
        {
          type: "stats",
          heading: "A small slice of a growing market",
          items: [
            {
              value: "₹1,377.8 bn",
              label: "Projected market size by 2027",
              note: "Up from ₹671.7 bn in 2022, a 13.5% CAGR",
            },
            { value: "Up to 90%", label: "Less water than traditional farming" },
            { value: "1%", label: "Share of global agriculture using hydroponics" },
          ],
          source: needed(
            "Sources for the market size, 90% water and 1% figures, and whether the market figure is for India or global",
          ),
        },
        {
          type: "text",
          body: [
            "The method is efficient and the demand is there. Yet hydroponic produce is still hard to find, and small farms struggle to stay open.",
            "So we mapped everyone around a hydroponic farm, from raw-material providers and consumers to policy makers and investors.",
          ],
        },
        {
          type: "image",
          size: "wide",
          image: {
            src: img("03"),
            alt: "Stakeholder map: rings for core, intermediary and ancillary stakeholders around a centre labelled HFS, with nodes such as hydroponic farmers, logistics, raw material providers, consumers, revenue models, investors and policy makers",
            caption:
              "Fourteen stakeholder groups across production and distribution, planning and promoting, and investment and regulation.",
          },
        },
        {
          type: "callout",
          label: "Where we focused",
          body: "Hydroponic farmers, raw material providers, logistics, consumers and revenue models (the businesses that buy produce, like cafes, gyms and hospitals).",
        },
      ],
    },
    {
      id: "research",
      label: "Research",
      title: "Four perspectives, one leaky chain",
      intro:
        "We followed a double diamond: discover, define, develop, deliver. Discovery meant looking at the farm from every side of the transaction.",
      blocks: [
        {
          type: "researchMethods",
          heading: "How we listened",
          methods: [
            { name: "Secondary research", detail: "Per stakeholder: farmer, consumer, supplier and logistics" },
            {
              name: "Primary research",
              detail: "Farmer, consumer, supplier and logistics perspectives",
            },
            { name: "Covert observations" },
            { name: "Affinity mapping", detail: "Synthesised into insights and HMW statements" },
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
          type: "insightChain",
          heading: "What each side told us",
          items: [
            {
              observation:
                "Farmers struggle to find affordable, reliable equipment, seeds and nutrients. Banks barely understand hydroponics, so loans are hard to get and subsidies are limited.",
              insight:
                "Many farms start as a hobby without proper knowledge. Running costs are high, market access is thin, and the result is closure.",
              opportunity:
                "Lower the risk of closure by raising profitability and reach, not just yield.",
            },
            {
              observation:
                "Hydroponic produce is shelved next to organic, seen as super-premium, and hard to find consistently in local markets.",
              insight:
                "Premium stores and establishments know little about it, and weak positioning keeps market penetration low.",
              opportunity:
                "Build awareness directly: educational content, farm tours and a food truck that lets people taste the produce.",
            },
            {
              observation:
                "Equipment is largely imported and not made for Indian conditions. Produce needs trained handlers, and shipments outside local markets face delays and quality issues.",
              insight:
                "Distribution is inefficient because logistics infrastructure doesn't fit the sector's needs and relies on manual labour.",
              opportunity:
                "Connect farmers with suppliers and logistics partners digitally, so delivery is timely and visible.",
            },
          ],
        },
      ],
    },
    {
      id: "insights",
      label: "Insights",
      title: "The gap is disconnection",
      intro:
        "Six gaps surfaced in our analysis. Underneath them sat one main reason farms and markets don't meet.",
      blocks: [
        {
          type: "features",
          heading: "Six gaps",
          items: [
            {
              title: "Little local manufacturing",
              body: "Affordable, India-specific equipment for small and mid-sized farms is scarce; most products are designed for global markets.",
            },
            {
              title: "Awareness and education",
              body: "Much of the population doesn't know the benefits of hydroponic produce, which limits adoption and positioning.",
            },
            {
              title: "Costly vertical farming",
              body: "Current vertical solutions are expensive and give inconsistent yield, making it hard for small farmers to scale on limited land.",
            },
            {
              title: "No single sensor interface",
              body: "Each sensor has its own app, so monitoring means more manual labour and higher production cost.",
            },
            {
              title: "No network",
              body: "Farmers lack a way to find reliable suppliers and interested B2B and D2C customers.",
            },
            {
              title: "Untrained workers",
              body: "Few workers know hydroponics, and the ones who do are expensive to hire.",
            },
          ],
        },
        {
          type: "text",
          heading: "The main gap",
          body: [
            "Lack of knowledge breeds misconceptions about hydroponic farming.",
            "Poor marketing means low sales and the wrong audience.",
            "And limited market insight plus restricted growing space keeps productivity down.",
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
              descriptor: "Customer, a bodybuilder switching to a plant-based diet",
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
        {
          type: "hmw",
          label: "Initial problem statement",
          statement:
            "How might we empower small-scale hydroponic farmers to access affordable and sustainable raw materials, leverage everyday resources, and connect with profitable markets through innovative and simple technologies, ensuring long-term viability and growth?",
        },
      ],
    },
    {
      id: "system",
      label: "System",
      title: "Six layers deep",
      intro:
        "We built the system up in six layers: scenarios, task flows, data points, tech plan, data flow and artefacts.",
      blocks: [
        {
          type: "process",
          heading: "System architecture",
          steps: [
            {
              title: "1 · Scenarios",
              body: "A day for each stakeholder: a farmer whose sensors flag issues and recommend crops, a supplier accepting orders and restocking, a logistics manager tracking delayed deliveries and managing routes, and a customer on a free trial watching live farm streams.",
            },
            {
              title: "2 · Task flows",
              body: "Each scenario as steps. For the farmer: check demand and select crops, assess space, order raw materials, monitor crop health, respond to alerts, and partner with a food truck to boost sales.",
            },
            {
              title: "3 · Data points",
              body: "What each person needs to know before, during and after production: temperature, humidity, light, water pH and EC, nutrient levels, harvest status, freshness, price, transport cost and storage conditions.",
            },
            {
              title: "4 · Tech plan",
              body: "How the data moves: sensors on the modular unit report through a NodeMCU over WiFi, a plant-health scanner runs on a trained AI model, and orders flow between farmer, supplier, customer and logistics.",
              image: {
                src: img("16"),
                alt: "Tech plan diagram linking farmer, supplier, customer and logistics nodes; the modular hydroponic unit's DHT22, GY-302, analog pH and NodeMCU sensors feed farm status over WiFi, with cloud icons on the links",
              },
            },
            {
              title: "5 · Data flow",
              body: "The 'Farm Connect' platform mapped page by page for suppliers, logistics and farmers, plus the e-commerce app, an agronomy app with a plant scanner, a driver app and the truck's own sensors.",
            },
            {
              title: "6 · Artefacts",
              body: "Two digital artefacts (Farm Connect and the e-commerce app) and two physical ones (the hydroponic unit and the food truck), each with rules for skeuomorphism, signifiers and metaphor.",
            },
          ],
        },
        {
          type: "image",
          size: "inset",
          image: {
            src: img("21"),
            alt: "Value map connecting supplier, customer, farmer and logistics with arrows tagged by five core-value icons: reliability, transparency, in-time efficiency, networking and sustainability",
            caption: "Value mapping: what each relationship in the system has to deliver.",
          },
        },
        {
          type: "hmw",
          label: "We finalised",
          statement:
            "How might we design an eco-system that lowers the risk of farm closures by increasing the profitability of hydroponic farmers while also expanding market reach, increasing crop yield through reduced manual intervention?",
        },
        {
          type: "image",
          size: "full",
          image: {
            src: img("23"),
            alt: "Wide site map rooted in Farm Connect, branching into supplier, logistics, farmer and consumer sections, with hydroponic unit and demand forecast trees below and icons marking increased profitability, reduced manual intervention and expanded market reach",
            caption:
              "Site map. Nodes are tagged by which goal they serve: profitability, less manual work or market reach.",
          },
        },
      ],
    },
    {
      id: "exploration",
      label: "Exploration",
      title: "Honeycombs and zig-zags",
      intro:
        "The physical unit started on paper, with two goals from the sketches: give every plant equal light, and save space.",
      blocks: [
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
              image: {
                src: img("24"),
                alt: "Pencil sketch sheet of hexagonal, honeycomb-inspired grow modules, a stacked rack and an attachable box module, with handwritten notes like 'lets plants get equal light' and 'easily attachable & scalable'",
              },
            },
            {
              name: "Zig-zag rectangular units",
              verdict: "kept",
              reason:
                "Rectangular units attached at steps give even light. The paper model's edges were too sharp and its holes too close together.",
              image: {
                src: img("25"),
                alt: "Two photos of a white card mock-up: rectangular modules joined in a stepped zig-zag line, with circular holes for plants",
              },
            },
          ],
        },
        {
          type: "gallery",
          heading: "Mid-fidelity screens",
          layout: "grid",
          columns: 2,
          images: [
            {
              src: img("26"),
              alt: "Four greyscale desktop wireframes for farmers: home dashboard, farm status with temperature, humidity, light and pH controls, demand with a Fresh Wheels map, and analytics with crop demand charts",
              caption: "Farmer dashboard wireframes",
            },
            {
              src: img("27"),
              alt: "Row of about eleven greyscale mobile wireframes for customers: Fresh Pass, orders, profile, home with deal of the hour and Fresh Wheels, categories, product page, recipes and basket",
              caption: "Consumer app wireframes (B2C)",
            },
          ],
        },
        {
          type: "testing",
          heading: "What mid-fi feedback flagged",
          negatives: [
            "The hexagonal unit would be too expensive to produce because its edges aren't 90°.",
            "The consumer site felt like any e-commerce site, with nothing special enough to choose hydroponic produce.",
            "Logistics screens were confusing: the main task only opened from a different screen.",
            "The supplier home page felt like an e-commerce app.",
          ],
        },
        {
          type: "needed",
          items: ["Which feedback changed which design between mid-fi and hi-fi"],
        },
      ],
    },
    {
      id: "hardware",
      label: "Hardware",
      title: "A farm that reports in",
      intro:
        "The MVP brief: a smart hydroponic unit that maximises crop yield by integrating multiple sensors for real-time monitoring.",
      blocks: [
        {
          type: "features",
          items: [
            {
              title: "The modular zig-zag channel",
              body: "Each module snaps to the next in a stepped line, 3 ft 6 in long and 9 in tall, with a 7 in pitch. Water comes in one end and leaves the other.",
              image: {
                src: img("35"),
                alt: "3D render of a white zig-zag hydroponic channel with plants, a dimensioned drawing (3 ft 6 in long, 9 in tall, 7 in modules) and an exploded single module with a four-hole lid and inflow and outflow pipes",
              },
            },
            {
              title: "Racked and recirculating",
              body: "In the redesign the channels sit on a four-tier rack over a reservoir, with inflow and outflow piping. The system reports pH, nutrient concentration, temperature and humidity for precise control.",
              image: {
                src: img("36"),
                alt: "3D renders of a four-tier black metal rack holding rows of zig-zag channels over a black reservoir tank, with blue arrows showing inflow and outflow, plus a front elevation",
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
        {
          type: "image",
          size: "wide",
          image: {
            src: img("37"),
            alt: "Grey 3D renders of a van with three tilted roof solar panels, and a branded dark-green version wrapped in a photo of hydroponic lettuce rows, with the slogan 'Fresh salads on wheels' and a 'Scan for app' QR code",
            caption:
              "Fresh Wheels: a solar food truck Greenly provides to farmers, so customers can try the produce in person.",
          },
        },
      ],
    },
    {
      id: "solution",
      label: "Solution",
      title: "One farm, four front doors",
      intro:
        "Each stakeholder gets a view built around their job. They all read from the same system.",
      blocks: [
        {
          type: "image",
          size: "full",
          image: {
            src: img("38"),
            alt: "Hi-fi farmer dashboard titled Farm Management for the demo farm Fresh Roots: farm environment controls, bulk and spot orders with accept buttons, schedule delivery with request vehicle, crop cycles, low stocks and order tracking",
            caption: "Farmer home: the farm, its orders and its supplies on one screen.",
          },
        },
        {
          type: "features",
          heading: "For farmers",
          items: [
            {
              title: "Alerts that don't go away",
              body: "When pH drifts out of range, the farmer gets an emergency alert with next steps. Close it, and the reading stays flagged red in the environment card.",
              image: {
                src: img("40"),
                alt: "Farmer dashboard with the farm environment card outlined in red, a row highlighted in the rack schematic, a 'Stop inflow' button and the pH level shown in red, beside a note that pH stays flagged after the main notification is closed",
              },
            },
            {
              title: "Farm status and plant health",
              body: "Farm layout, pump and light timings, crop cycles by row, and an AI plant-health checker that scores a scanned image.",
              image: {
                src: img("48"),
                alt: "Farm Status screen: environment controls, a farm layout with rows, columns, brackets and water tanks, pump and light timings, crop cycles by row, and an AI plant health checker gauge reading 660",
              },
            },
            {
              title: "Demand in one place",
              body: "Consumer orders, bulk orders, spot requests and farm-visit requests, each with a quick accept or schedule action.",
              image: {
                src: img("49"),
                alt: "Demand screen listing consumer orders with schedule delivery buttons, bulk orders and spot requests with accept and decline, and farm visit requests",
              },
            },
          ],
        },
        {
          type: "features",
          heading: "For suppliers and logistics",
          items: [
            {
              title: "Supplier home",
              body: "New and ongoing orders, an inventory summary with critical and low stock, and payments with one-tap reminders for overdue invoices.",
              image: {
                src: img("51"),
                alt: "Supplier dashboard for Patel Suppliers: orders overview with accept and decline, inventory summary bar of full, low and critical stock, and payment details with overdue invoices and send reminder buttons",
              },
            },
            {
              title: "Allocation and alerts",
              body: "Unallocated orders can be auto-assigned a vehicle. On-route problems, like a breakdown, show on a map with the impacted orders.",
              image: {
                src: img("58"),
                alt: "Supplier logistics screen: an allocation table of orders from Khar W to Bandra W with allocate buttons, an alert map with vehicle breakdown and pickup delay cards, and logistics cost insights",
              },
            },
            {
              title: "Logistics command",
              body: "Delivery summary, priority orders, route management with diversions, emergency deliveries and fleet status, so a delayed order gets resolved, not just reported.",
              image: {
                src: img("65"),
                alt: "Logistics Schedule Delivery dashboard with a delay banner, deliveries donut, priority orders with resolve and track buttons, a Mumbai route map with a red diverted segment, emergency delivery and fleet status",
              },
            },
          ],
        },
        {
          type: "features",
          heading: "For customers",
          items: [
            {
              title: "Onboarding that teaches",
              body: "The first screens explain why hydroponics: 90% less water, higher nutritional value, pesticide-free.",
              image: {
                src: img("71"),
                alt: "Four phone screens: a green Greenly splash screen and three illustrated onboarding screens reading 'Explore hydroponics easily', 'Consumes 90% less water' and 'Higher nutritional value'",
              },
            },
            {
              title: "Trust you can see",
              body: "Testimonials, a Fresh Wheels map for in-person trials, and live views of the farms alongside recipe suggestions.",
              image: {
                src: img("73"),
                alt: "Three phone screens with callouts: home with testimonials, a Fresh Wheels section with a map, and a categories screen with a live view of two farms and recipes",
              },
            },
            {
              title: "Honest delivery",
              body: "Product pages show expiry and pesticide-free status, the basket shows a 'best till' date, and delays come with a reason.",
              image: {
                src: img("74"),
                alt: "Four phone screens: a spinach product page, the basket delivering in 30 minutes, an order-placed confirmation, and a red 'Delivery delayed' message citing engine failure",
              },
            },
          ],
        },
        {
          type: "image",
          size: "inset",
          image: {
            src: img("33"),
            alt: "Design system components: inactive outline and active green filled icons, 'Add to cart' buttons in outline, green, yellow and red, and orange, green, red and blue notification banners",
            caption:
              "Colour carries status everywhere: green for healthy and confirmed, yellow for caution and in transit, red for critical and delayed.",
          },
        },
      ],
    },
    {
      id: "validation",
      label: "Validation",
      title: "Four rounds of testing",
      intro: "The hi-fi designs went through a usability test for each stakeholder: farmer, supplier, logistics and consumer.",
      blocks: [
        {
          type: "testing",
          summary: "One usability round per stakeholder: farmer, supplier, logistics and consumer.",
          positives: [
            "Farmer: the unit and sensors work well for a large farm.",
            "Supplier: the screen is easy on the eyes, with key actions highlighted on the home screen.",
            "Logistics: delivery tracking is smooth, and real-time updates help managers stay on top of shipments.",
            "Consumer: the 2-hour farm-to-table freshness is unique and attractive.",
            "Consumer: the 'best till' date in the basket is unique and helpful.",
          ],
          negatives: [
            "Farmer: pH readings don't differ much between rows of the unit, so per-row sensors would mainly increase cost.",
            "Farmer: on a smaller farm, sensor-specific indication becomes expensive.",
            "Supplier: logistics allocation isn't prominent on the home screen, which makes assigning vehicles harder.",
            "Supplier: the average credit period (receivable and payable), key for cash flow, is missing.",
            "Logistics: small orders are hard to track without more granular data, and route optimisation isn't developed enough to be useful.",
            "Logistics: supplier-to-farmer B2B deliveries look the same as last-mile B2B and B2C deliveries, which confuses.",
            "Consumer: the number on 'buy again' items is ambiguous, free trials read as discounts, and product pages lack nutritional details.",
          ],
        },
        {
          type: "callout",
          label: "From the farmer test",
          body: "Most crop loss happens when action isn't taken despite knowing what's wrong, or when there's no knowledge at all.",
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
      id: "reflection",
      label: "Reflection",
      title: "Making it pay",
      intro: "An ecosystem only lasts if it earns. We closed with a business model and where Greenly could go next.",
      blocks: [
        {
          type: "features",
          heading: "Business model",
          items: [
            {
              title: "Value",
              body: "Fresh, local, pesticide-free produce; cost-effective hydroponic systems; lower transport costs and emissions; real-time farm monitoring; farm-to-table delivery.",
            },
            {
              title: "Customers",
              body: "Hydroponic farmers, health-conscious consumers, cafes, restaurants and airlines, and urban eco-friendly shoppers.",
            },
            {
              title: "Revenue",
              body: "Hydroponic unit sales, produce delivery subscriptions, B2B partnerships, workshops and education, and data insights.",
            },
            {
              title: "Channels",
              body: "The e-commerce platform, partner stores and cafes, food trucks, and social media.",
            },
          ],
        },
        {
          type: "stats",
          heading: "Cost structure",
          items: [
            { value: "₹7,000–75,000", label: "Per hydroponic unit (manual systems)" },
            { value: "₹2,00,000–7,00,000", label: "Tech development and maintenance (basic app, affordable sensors)" },
            { value: "₹50,000–1,50,000", label: "Logistics and operations per month" },
          ],
        },
        {
          type: "features",
          heading: "Future scope",
          items: [
            {
              title: "Medicinal plants",
              body: "Better nutritional value could open the medicinal industry, where people pay more for it.",
            },
            {
              title: "Long journeys",
              body: "Airlines and cruises could serve hydroponic produce, which stays fresh longer.",
            },
            {
              title: "Niche markets",
              body: "Nutritionists and gyms could adopt hydroponic farming and target people who want more nutrition from their food.",
            },
            {
              title: "Bigger farms",
              body: "Scaling up lowers the cost per plant, lowers prices, widens reach, and turns into a positive loop.",
            },
          ],
        },
        {
          type: "needed",
          items: ["Asmi's reflection: what she learned on Greenly and what she'd do differently"],
        },
      ],
    },
  ],
  contribution: {
    mine: needed("Asmi's personal contribution on this team project (3–5 bullets)"),
    team: needed("Who else worked on Greenly and what they did (slides say 'we'; Behance credits only Asmi)"),
  },
  links: {
    behance: "https://www.behance.net/gallery/234272909/Greenly-Connecting-small-scaled-farmers-to-the-market",
  },
  seo: {
    title: "Greenly: Connecting hydroponic farmers to market · Asmi Shaikh",
    description:
      "A hydroponics ecosystem: a sensor-equipped modular unit, a solar food truck, farmer, supplier and logistics dashboards, and a consumer app.",
  },
};

export default project;
