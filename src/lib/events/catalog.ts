import { HOME, haversineMiles } from "@/lib/geo";
import type { Category, EventItem, EventView } from "./types";
import { VENUE_BY_ID } from "./venues";

function offsetFor(ymd: string): "-04:00" | "-05:00" {
  return ymd >= "2026-11-01" ? "-05:00" : "-04:00";
}

function iso(ymd: string, time: string): string {
  return `${ymd}T${time}:00${offsetFor(ymd)}`;
}

function addDays(ymd: string, n: number): string {
  const d = new Date(`${ymd}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

function weekday(ymd: string): number {
  return new Date(`${ymd}T12:00:00Z`).getUTCDay();
}

function nthOfMonth(ymd: string): number {
  return Math.ceil(Number(ymd.slice(8, 10)) / 7);
}

const DATED: EventItem[] = [
  {
    id: "pineapples-mangrove-0905",
    title: "Ben Flournoy Trio ft. Mangrove",
    subtitle: "Moon Room",
    category: "concert",
    start: iso("2026-09-05", "19:00"),
    venueId: "pineapples",
    price: "$19–25",
    description:
      "Saturday night in the Moon Room: Melbourne pianist Ben Flournoy’s trio with Mangrove. Three floors of Pineapples, Indian River views, and the EGAD walk-up that locals actually use.",
    ticketsUrl: "https://www.eventbrite.com",
    url: "https://pineapplesegad.com",
  },
  {
    id: "summer-crush-toby-0905",
    title: "Beer for My Horses: Toby Keith Tribute",
    category: "concert",
    start: iso("2026-09-05", "13:00"),
    end: iso("2026-09-05", "16:00"),
    venueId: "summer-crush",
    price: "$18–23",
    description:
      "National Toby Keith tribute on the vineyard lawn. Gates at noon, opener at 1, headliner 2–4. Smoke-free property; designated smoking areas only.",
    url: "https://www.summercrushwine.com/weekend-events",
  },
  {
    id: "earls-apache-0905",
    title: "Apache Dragon",
    category: "live",
    start: iso("2026-09-05", "20:00"),
    venueId: "earls",
    price: "Cover",
    description:
      "Saturday night at Earl’s Hideaway on the Sebastian waterfront. Apache Dragon takes the late slot after an afternoon of river-deck music.",
  },
  {
    id: "earls-beck-0905",
    title: "Beck’s Brotherhood",
    category: "live",
    start: iso("2026-09-05", "14:00"),
    venueId: "earls",
    price: "Free",
    description: "Afternoon set on the Indian River at Earl’s Hideaway in Sebastian.",
  },
  {
    id: "squid-kelley-0905",
    title: "Kelley B Collective",
    category: "live",
    start: iso("2026-09-05", "18:30"),
    venueId: "squid-lips-egad",
    price: "Free",
    description:
      "Sunset live music on the Squid Lips deck beside Eau Gallie Pier — oak-grilled seafood, lagoon breeze, and a Saturday cover-band crowd.",
    url: "https://www.squidlipsgrill.com",
  },
  {
    id: "squid-ferrin-0905",
    title: "Rick Ferrin",
    category: "live",
    start: iso("2026-09-05", "13:00"),
    venueId: "squid-lips-egad",
    price: "Free",
    description: "Afternoon acoustic on the EGAD waterfront deck at Squid Lips.",
  },
  {
    id: "squid-cb-maddi-0905",
    title: "Maddi & More",
    category: "live",
    start: iso("2026-09-05", "14:00"),
    venueId: "squid-lips-cb",
    price: "Free",
    description: "Saturday afternoon on the Cocoa Beach Squid Lips deck.",
  },
  {
    id: "lous-jack-0905",
    title: "Jack Connor",
    category: "live",
    start: iso("2026-09-05", "13:00"),
    venueId: "lous-blues",
    price: "Free",
    description: "Solo acoustic Saturday at Lou’s Blues in Indialantic, a short walk from the ocean.",
  },
  {
    id: "lous-switch-0905",
    title: "Switch",
    category: "live",
    start: iso("2026-09-05", "21:00"),
    venueId: "lous-blues",
    price: "Cover",
    description: "Late Saturday band at Lou’s Blues Bar & Grill in Indialantic.",
  },
  {
    id: "george-jesse-0905",
    title: "Jesse Alan",
    category: "live",
    start: iso("2026-09-05", "15:00"),
    venueId: "george-dragon",
    price: "Free",
    description: "Country afternoon at the George & Dragon English Tavern in Cocoa Village.",
  },
  {
    id: "sanbar-rave-0905",
    title: "Saturday EDM Rave",
    category: "rave",
    start: iso("2026-09-05", "20:00"),
    venueId: "sanbar-sat",
    price: "Cover",
    description:
      "Sanbar Satellite Beach’s Saturday EDM night — dark room, loud system, beach-town rave energy a few blocks off A1A.",
  },
  {
    id: "foo-dexter-0905",
    title: "DJ Dexter",
    category: "rave",
    start: iso("2026-09-05", "22:00"),
    venueId: "foo-bar",
    price: "Cover",
    description: "Late Saturday DJ set at Foo Bar on Orlando Avenue in Cocoa Beach.",
  },
  {
    id: "dirty-birds-0905",
    title: "Jah Rockaz + DJ Judge",
    category: "live",
    start: iso("2026-09-05", "17:00"),
    end: iso("2026-09-05", "23:00"),
    venueId: "dirty-birds",
    price: "Free",
    description:
      "Reggae into late DJ at Dirty Birds. Iyah Duo holds the afternoon; Jah Rockaz at 5, DJ Judge from 9.",
  },
  {
    id: "heidis-0905",
    title: "Hella Ayelet with the Ron Teixeira Trio",
    category: "live",
    start: iso("2026-09-05", "19:00"),
    venueId: "heidis",
    price: "Cover",
    description: "Saturday jazz at Heidi’s, Cocoa Beach’s long-running listening room on Orlando Avenue.",
    url: "https://heidisjazzclub.com",
  },
  {
    id: "cadillac-phoenix-0905",
    title: "Phoenix",
    category: "live",
    start: iso("2026-09-05", "20:00"),
    venueId: "cadillac-cove",
    price: "Free",
    description: "Saturday night live music at Cadillac Cove in Indian Harbour Beach.",
  },
  {
    id: "tide-kex-0905",
    title: "The Kex",
    category: "live",
    start: iso("2026-09-05", "18:00"),
    venueId: "tide-tonic",
    price: "Free",
    description: "Evening set at Tide & Tonic on the Cocoa Beach ocean strip.",
  },
  {
    id: "walking-tree-0905",
    title: "Colby Lee Swift",
    category: "live",
    start: iso("2026-09-05", "16:00"),
    venueId: "walking-tree",
    price: "Free",
    description: "Saturday afternoon in the taproom at Walking Tree Brewery, downtown Vero Beach.",
  },
  {
    id: "sanbar-cb-vintage-0905",
    title: "Vintage",
    category: "live",
    start: iso("2026-09-05", "21:00"),
    venueId: "sanbar-cb",
    price: "Cover",
    description: "Saturday night band at Sanbar Cocoa Beach.",
  },
  {
    id: "playalinda-night-0905",
    title: "Night Market at Playalinda",
    category: "market",
    start: iso("2026-09-05", "17:00"),
    end: iso("2026-09-05", "21:00"),
    venueId: "playalinda",
    price: "Free",
    description:
      "First Saturday night market at Playalinda Brewing in Titusville: 16+ local vendors, live music, and the house beers on tap from 5 to 9.",
    url: "https://www.visitspacecoast.com/events-calendar/",
  },
  {
    id: "cocoa-art-0905",
    title: "Cocoa Village Saturday Art Market",
    category: "street",
    start: iso("2026-09-05", "11:00"),
    end: iso("2026-09-05", "17:00"),
    venueId: "myrt-tharpe",
    price: "Free",
    recurring: true,
    description:
      "Weekly artisan market at Myrt Tharpe Square in Historic Cocoa Village — original work, tree-lined streets, and the village shops still open around it.",
    url: "https://visitcocoavillage.com/events/",
  },
  {
    id: "green-gables-open-0905",
    title: "Green Gables Open House",
    category: "festival",
    start: iso("2026-09-05", "10:00"),
    end: iso("2026-09-05", "14:00"),
    venueId: "green-gables",
    price: "Free",
    description:
      "Saturday open house at Green Gables, the 1896 riverview house on Harbor City Boulevard. Grounds, history, and a quiet alternative to the downtown market.",
  },
  {
    id: "crowne-mixtape-0905",
    title: "Mixtape Kids",
    category: "live",
    start: iso("2026-09-05", "18:00"),
    venueId: "crowne-plaza",
    price: "Free",
    description: "Saturday evening at the Crowne Plaza Melbourne-Oceanfront in Indialantic.",
  },
  {
    id: "ebb-stay-tuned-0905",
    title: "Stay Tuned",
    category: "live",
    start: iso("2026-09-05", "17:00"),
    venueId: "ebb-flow",
    price: "Free",
    description: "Early evening live music at Ebb & Flow in Cocoa Beach.",
  },
  {
    id: "tru-phonic-viera-0906",
    title: "Tru Phonic",
    category: "concert",
    start: iso("2026-09-06", "19:00"),
    venueId: "lakeside-viera",
    price: "Cover",
    description:
      "Treasure Coast jam band Tru Phonic at Lakeside Social in Viera. Sunday night, indoor-outdoor patio, local crowd.",
  },
  {
    id: "sunday-sampler-0906",
    title: "Sunday Sampler East",
    subtitle: "Larry Magnum with Bob Bronar",
    category: "concert",
    start: iso("2026-09-06", "14:00"),
    venueId: "sams-island",
    price: "Cover",
    description:
      "Afternoon concert at Sam’s Island Music on Merritt Island — the long-running Sunday Sampler series in a real listening room.",
  },
  {
    id: "summer-crush-majesty-0906",
    title: "Majesty of Rock: Journey, Styx & REO Speedwagon",
    category: "concert",
    start: iso("2026-09-06", "13:00"),
    end: iso("2026-09-06", "16:00"),
    venueId: "summer-crush",
    price: "$18–23",
    description:
      "Sunday vineyard show: arena-rock tribute to Journey, Styx, and REO Speedwagon on the Summer Crush lawn in Fort Pierce.",
    url: "https://www.summercrushwine.com/weekend-events",
  },
  {
    id: "earls-zep-0906",
    title: "Good Bread / Good Zep",
    category: "live",
    start: iso("2026-09-06", "14:00"),
    venueId: "earls",
    price: "Free",
    description: "Sunday Led Zeppelin set on the river at Earl’s Hideaway, Sebastian.",
  },
  {
    id: "squid-innuendo-0906",
    title: "Innuendo",
    category: "live",
    start: iso("2026-09-06", "17:00"),
    venueId: "squid-lips-egad",
    price: "Free",
    description: "Sunday evening on the Eau Gallie Squid Lips deck.",
  },
  {
    id: "heidis-open-0906",
    title: "Open Mic with the Ron Teixeira Trio",
    category: "live",
    start: iso("2026-09-06", "19:00"),
    venueId: "heidis",
    price: "Free",
    description: "Sunday open mic at Heidi’s Jazz Club — the house trio backs walk-ups.",
  },
  {
    id: "dtmb-sip-shop-0910",
    title: "Fall Sip & Shop",
    category: "street",
    start: iso("2026-09-10", "16:00"),
    end: iso("2026-09-10", "20:00"),
    venueId: "dtmb",
    price: "Free",
    description:
      "Downtown Melbourne opens New Haven Avenue for a Thursday evening of tastings and shop-hops. The same walkable blocks that host the big street festivals, on a weeknight scale.",
    url: "https://downtownmelbourne.com/dtmb-events/",
  },
  {
    id: "slow-low-jesse-0911",
    title: "Jesse Alan",
    category: "live",
    start: iso("2026-09-11", "19:00"),
    venueId: "slow-low-viera",
    price: "Free",
    description: "Friday country night at Slow & Low BBQ in Viera.",
  },
  {
    id: "king-zep-0912",
    title: "Classic Albums Live: Led Zeppelin II",
    category: "concert",
    start: iso("2026-09-12", "20:00"),
    venueId: "king-center",
    price: "Tickets",
    description:
      "Note-for-note performance of Led Zeppelin II on the L3Harris Technologies Theatre stage at the King Center. The same series returns in October with Dark Side of the Moon.",
    ticketsUrl: "https://www.kingcenter.com",
    url: "https://www.kingcenter.com",
  },
  {
    id: "pineapples-dunies-0912",
    title: "Dunies with The Speed Spirits",
    subtitle: "Moon Room",
    category: "concert",
    start: iso("2026-09-12", "19:00"),
    venueId: "pineapples",
    price: "$20–28",
    description:
      "Saturday night in the Moon Room at Pineapples EGAD. Dunies with The Speed Spirits — the kind of bill that fills the second floor and spills onto Pineapple Avenue.",
    ticketsUrl: "https://www.eventbrite.com",
  },
  {
    id: "cocoa-yard-sale-0912",
    title: "The 1000-Yard Sale",
    subtitle: "Cocoa Village Sidewalk Sale",
    category: "street",
    start: iso("2026-09-12", "10:00"),
    end: iso("2026-09-12", "16:00"),
    venueId: "cocoa-village",
    price: "Free",
    description:
      "Historic Cocoa Village sidewalk sale — shops, makers, and the Saturday Art Market running the same day at Myrt Tharpe Square.",
    url: "https://visitcocoavillage.com/events/",
  },
  {
    id: "intracoastal-sun-0913",
    title: "Intracoastal Sunday Market",
    category: "market",
    start: iso("2026-09-13", "12:00"),
    end: iso("2026-09-13", "16:00"),
    venueId: "intracoastal",
    price: "Free",
    description:
      "Sunday market in the beer garden at Intracoastal Brewing on Eau Gallie Boulevard — local vendors, pints, and the EGAD neighborhood on foot.",
    url: "https://intracoastalbrewingcompany.com",
  },
  {
    id: "battle-horns-0913",
    title: "Battle of the Horns",
    category: "concert",
    start: iso("2026-09-13", "14:00"),
    venueId: "veterans",
    price: "Tickets",
    description:
      "Space Coast Jazz Society’s Battle of the Horns at the Brevard Veterans Memorial Center on Merritt Island.",
    url: "https://www.spacecoastjazzsociety.org",
  },
  {
    id: "rockin-autumn-0913",
    title: "Rockin’ Autumn",
    subtitle: "Rock and Roll Review",
    category: "concert",
    start: iso("2026-09-13", "15:00"),
    venueId: "suntree-umc",
    price: "Free",
    description: "Free Sunday concert at Suntree United Methodist Church — the Rock and Roll Review’s fall set.",
  },
  {
    id: "american-spirit-0913",
    title: "American Spirit Fall Concert",
    category: "concert",
    start: iso("2026-09-13", "15:00"),
    venueId: "mihs",
    price: "Free",
    description: "Free fall concert at the Merritt Island High School Auditorium.",
  },
  {
    id: "third-thursdays-0917",
    title: "Third Thursdays",
    category: "street",
    start: iso("2026-09-17", "17:00"),
    end: iso("2026-09-17", "21:00"),
    venueId: "avenue-viera",
    price: "Free",
    description:
      "Monthly Third Thursdays at The Avenue Viera — outdoor music, shops open late, and the town-center lawn packed with strollers and pint glasses.",
  },
  {
    id: "goth-homecoming-0918",
    title: "Goth Homecoming",
    subtitle: "Lovesong (The Cure tribute) ft. First Wave",
    category: "concert",
    start: iso("2026-09-18", "19:00"),
    venueId: "pineapples",
    price: "$25–31",
    description:
      "Black clothes, fog, and The Cure — Lovesong with First Wave in the Moon Room at Pineapples. The EGAD goth night of the season.",
    ticketsUrl: "https://www.eventbrite.com",
  },
  {
    id: "candlelight-adele-0918",
    title: "Candlelight: Tribute to Adele",
    category: "concert",
    start: iso("2026-09-18", "18:00"),
    venueId: "first-church",
    price: "From $21",
    description:
      "String tribute to Adele by candlelight at First Church Melbourne on New Haven Avenue. A second program, Michael Jackson, follows later the same night.",
  },
  {
    id: "candlelight-mj-0918",
    title: "Candlelight: Tribute to Michael Jackson",
    category: "concert",
    start: iso("2026-09-18", "20:15"),
    venueId: "first-church",
    price: "From $19",
    description: "Evening candlelight performance of Michael Jackson’s catalog in downtown Melbourne.",
  },
  {
    id: "josh-turner-0919",
    title: "Josh Turner",
    subtitle: "This Country Music Thing Tour with Payton Smith",
    category: "concert",
    start: iso("2026-09-19", "19:30"),
    venueId: "king-center",
    price: "Tickets",
    description:
      "Josh Turner’s This Country Music Thing Tour at the King Center, with Payton Smith. The bass-baritone country show of the fall on the Space Coast.",
    ticketsUrl: "https://www.kingcenter.com",
    url: "https://www.kingcenter.com",
  },
  {
    id: "woodstock-crawl-0919",
    title: "9th Annual Woodstock Pub Crawl",
    category: "street",
    start: iso("2026-09-19", "17:30"),
    end: iso("2026-09-19", "21:30"),
    venueId: "creek-saloon",
    price: "$20–30",
    description:
      "Downtown Melbourne’s Woodstock crawl — four hours of ’69-setlist bands across New Haven Avenue, starting at The Creek Saloon. Wristband night, walkable blocks.",
    url: "https://downtownmelbourne.com/dtmb-events/",
  },
  {
    id: "mickey-avalon-0919",
    title: "Mickey Avalon",
    category: "concert",
    start: iso("2026-09-19", "18:00"),
    venueId: "debauchery",
    price: "Tickets",
    description: "Mickey Avalon at Debauchery on New Haven Avenue — tight room, downtown Melbourne.",
  },
  {
    id: "print-fest-0919",
    title: "Space Coast Print Fest 2026",
    category: "festival",
    start: iso("2026-09-19", "10:00"),
    end: iso("2026-09-19", "17:00"),
    venueId: "cocoa-civic",
    price: "Free",
    description:
      "Printmakers, zines, and posters at the City of Cocoa Civic Center, a short walk from Cocoa Village.",
    url: "https://visitcocoavillage.com/events/",
  },
  {
    id: "artimus-pyle-0920",
    title: "The Artimus Pyle Band",
    category: "concert",
    start: iso("2026-09-20", "19:00"),
    venueId: "lyric",
    price: "Tickets",
    description:
      "Lynyrd Skynyrd drummer Artimus Pyle and band at the Lyric Theatre on Flagler Avenue in downtown Stuart.",
    ticketsUrl: "https://www.lyrictheatre.com",
    url: "https://www.lyrictheatre.com",
  },
  {
    id: "women-of-rock-0925",
    title: "The Women of Rock Las Vegas Show",
    category: "concert",
    start: iso("2026-09-25", "19:30"),
    venueId: "melbourne-auditorium",
    price: "Tickets",
    description:
      "Heart, Joan Jett, Pat Benatar, and Stevie Nicks catalog on the Melbourne Auditorium stage.",
  },
  {
    id: "pride-parade-0926",
    title: "Space Coast Pride Parade",
    category: "street",
    start: iso("2026-09-26", "11:00"),
    end: iso("2026-09-26", "12:00"),
    venueId: "dtmb",
    price: "Free",
    description:
      "20th anniversary parade through the heart of downtown Melbourne along East New Haven Avenue, launching from the Auditorium. Street-festival scale, fully public.",
    url: "https://spacecoastpride.org/",
  },
  {
    id: "pridefest-0926",
    title: "Space Coast PrideFest",
    category: "festival",
    start: iso("2026-09-26", "12:00"),
    end: iso("2026-09-26", "18:00"),
    venueId: "melbourne-auditorium",
    price: "Free",
    description:
      "20th anniversary PrideFest at Melbourne Auditorium — indoor and outdoor vendors, performances, and the parade dumping into the grounds at noon. Free.",
    url: "https://spacecoastpride.org/",
  },
  {
    id: "harvest-fest-0926",
    title: "Green Gables 9th Annual Harvest Festival",
    category: "festival",
    start: iso("2026-09-26", "09:00"),
    end: iso("2026-09-26", "15:00"),
    venueId: "green-gables",
    price: "Free",
    description:
      "Fall festival on the Green Gables grounds: vendors, history, and a Saturday that pairs with Pride downtown if you want both.",
  },
  {
    id: "hulagans-0926",
    title: "The Hulagans",
    subtitle: "Moon Room",
    category: "concert",
    start: iso("2026-09-26", "19:00"),
    venueId: "pineapples",
    price: "$13–19",
    description: "Reggae Saturday at Pineapples EGAD with The Hulagans. More Better Band and Kairo Reef also on the property that night.",
    ticketsUrl: "https://www.eventbrite.com",
  },
  {
    id: "tru-phonic-hnb-0926",
    title: "Tru Phonic",
    category: "live",
    start: iso("2026-09-26", "19:00"),
    venueId: "hell-n-blazes",
    price: "Free",
    description: "Saturday night in the taproom at Hell ’n Blazes on New Haven Avenue — downtown Melbourne’s brewery stage.",
  },
  {
    id: "nomads-lucy-0926",
    title: "Lucy Spotts",
    category: "live",
    start: iso("2026-09-26", "19:00"),
    venueId: "nomads",
    price: "Free",
    description: "Saturday singer-songwriter night at Nomads Canteen on Harbor City Boulevard.",
  },
  {
    id: "celtic-thunder-1002",
    title: "Celtic Thunder",
    category: "concert",
    start: iso("2026-10-02", "20:00"),
    venueId: "king-center",
    price: "Tickets",
    description: "Celtic Thunder at the King Center — the Irish vocal production on the L3Harris stage.",
    ticketsUrl: "https://www.kingcenter.com",
    url: "https://www.kingcenter.com",
  },
  {
    id: "ashley-mcbryde-1003",
    title: "Ashley McBryde",
    subtitle: "with Colton Bowlin",
    category: "concert",
    start: iso("2026-10-03", "20:00"),
    venueId: "king-center",
    price: "Tickets",
    description:
      "Ashley McBryde at the King Center with Colton Bowlin. The country headliner of the fall on Wickham Road.",
    ticketsUrl: "https://www.kingcenter.com",
    url: "https://www.kingcenter.com",
  },
  {
    id: "fall-art-expo-1003",
    title: "Melbourne Fall Art and Craft Expo",
    category: "festival",
    start: iso("2026-10-03", "10:00"),
    end: iso("2026-10-04", "16:00"),
    venueId: "wickham-park",
    price: "Free",
    description:
      "Two-day art and craft expo at Wickham Park — the Space Coast’s big fall outdoor makers’ weekend.",
  },
  {
    id: "fall-downtown-1010",
    title: "Fall for Downtown Melbourne",
    category: "street",
    start: iso("2026-10-10", "11:00"),
    end: iso("2026-10-10", "16:00"),
    venueId: "dtmb",
    price: "Free",
    description:
      "The downtown Melbourne street festival of the fall — closed blocks, vendors, live music, the New Haven Avenue crowd. The same bones as the spring street fests, in cooler air.",
    url: "https://downtownmelbourne.com",
  },
  {
    id: "cal-floyd-1010",
    title: "Classic Albums Live: The Dark Side of the Moon",
    category: "concert",
    start: iso("2026-10-10", "20:00"),
    venueId: "king-center",
    price: "Tickets",
    description:
      "Classic Albums Live performs Pink Floyd’s Dark Side of the Moon in full at the King Center.",
    ticketsUrl: "https://www.kingcenter.com",
    url: "https://www.kingcenter.com",
  },
  {
    id: "pineapples-donefor-1017",
    title: "DONEFOR, Twin Rova, and We're Wolves",
    subtitle: "Moon Room",
    category: "concert",
    start: iso("2026-10-17", "19:00"),
    venueId: "pineapples",
    price: "$15–22",
    description: "Local heavy bill in the Moon Room at Pineapples EGAD.",
    ticketsUrl: "https://www.eventbrite.com",
  },
  {
    id: "bso-echoes-1017",
    title: "Brevard Symphony Orchestra: Echoes of Freedom",
    category: "concert",
    start: iso("2026-10-17", "19:30"),
    venueId: "king-center",
    price: "From $62",
    description: "BSO’s Echoes of Freedom program at the King Center.",
    ticketsUrl: "https://www.kingcenter.com",
    url: "https://www.kingcenter.com",
  },
  {
    id: "buddy-guy-1022",
    title: "Buddy Guy",
    category: "concert",
    start: iso("2026-10-22", "19:30"),
    venueId: "king-center",
    price: "Tickets",
    description:
      "Buddy Guy’s 90th-year tour at the King Center. The blues show of the year on the Space Coast.",
    ticketsUrl: "https://www.kingcenter.com",
    url: "https://www.kingcenter.com",
  },
  {
    id: "pulley-1022",
    title: "Pulley",
    subtitle: "Moon Room",
    category: "concert",
    start: iso("2026-10-22", "19:00"),
    venueId: "pineapples",
    price: "$20–28",
    description: "SoCal punk veterans Pulley in the Moon Room at Pineapples — a rare proper club date in EGAD.",
    ticketsUrl: "https://www.eventbrite.com",
  },
  {
    id: "mannheim-1118",
    title: "Mannheim Steamroller",
    subtitle: "Chip Davis",
    category: "concert",
    start: iso("2026-11-18", "19:30"),
    venueId: "king-center",
    price: "Tickets",
    description: "Mannheim Steamroller’s Christmas production at the King Center.",
    ticketsUrl: "https://www.kingcenter.com",
    url: "https://www.kingcenter.com",
  },
  {
    id: "sweet-day-1128",
    title: "Sweet Day ’26",
    subtitle: "Artikal Sound System",
    category: "festival",
    start: iso("2026-11-28", "12:00"),
    end: iso("2026-11-28", "23:00"),
    venueId: "pineapples",
    price: "Free / VIP",
    description:
      "Pineapples’ fifth-anniversary block party in the Eau Gallie Arts District. Artikal Sound System headlines; vendors, rooftop, and a Moon Room after-party. Free to enter, VIP and after-party on Eventbrite.",
    ticketsUrl: "https://www.eventbrite.com",
    url: "https://pineapplesegad.com",
  },
  {
    id: "fab-four-1209",
    title: "The Fab Four",
    category: "concert",
    start: iso("2026-12-09", "19:30"),
    venueId: "king-center",
    price: "Tickets",
    description: "The Fab Four Beatles tribute at the King Center.",
    ticketsUrl: "https://www.kingcenter.com",
    url: "https://www.kingcenter.com",
  },
  {
    id: "green-gables-open-0912",
    title: "Green Gables Open House",
    category: "festival",
    start: iso("2026-09-12", "10:00"),
    end: iso("2026-09-12", "14:00"),
    venueId: "green-gables",
    price: "Free",
    description:
      "Saturday open house at Green Gables, the 1896 riverview house on Harbor City Boulevard.",
  },
];

type RecurringSpec = {
  id: string;
  title: string;
  category: Category;
  venueId: string;
  dow: number;
  nth?: number[];
  skipYmd?: string[];
  skipIfVenueDay?: boolean;
  startTime: string;
  endTime?: string;
  price: string;
  description: string;
  url?: string;
};

const RECURRING: RecurringSpec[] = [
  {
    id: "dtmb-farmers",
    title: "Downtown Melbourne Farmers Market",
    category: "market",
    venueId: "riverview-park",
    dow: 6,
    startTime: "10:00",
    endTime: "14:00",
    price: "Free",
    description:
      "Local growers and producers at Riverview Park, a short walk from New Haven Avenue. Summer dates are first and third Saturdays; weekly again in October.",
    url: "https://downtownmelbourne.com/dtmb-events/",
    skipYmd: ["2026-09-12", "2026-09-26"],
  },
  {
    id: "wickham-farmers",
    title: "Brevard County Farmers Market",
    category: "market",
    venueId: "wickham-park",
    dow: 4,
    startTime: "15:00",
    endTime: "18:00",
    price: "Free",
    description:
      "Thursday afternoon under the Regional Pavilion at Wickham Park. UF/IFAS-run, food-first: produce, grass-fed meat, honey, baked goods. SNAP tokens accepted.",
  },
  {
    id: "vero-farmers",
    title: "Vero Beach Farmers Market",
    category: "market",
    venueId: "humiston",
    dow: 6,
    startTime: "08:00",
    endTime: "12:00",
    price: "Free",
    description:
      "Saturday morning on Ocean Drive at Humiston Park. The Treasure Coast’s beachside market — produce, plants, and the ocean two blocks east.",
  },
  {
    id: "ftpierce-farmers",
    title: "Downtown Fort Pierce Farmers Market",
    category: "market",
    venueId: "marina-square",
    dow: 6,
    startTime: "08:00",
    endTime: "13:00",
    price: "Free",
    description:
      "The big one: 70+ vendors at Marina Square on the Indian River. Saturday morning, live music, and the marina behind it. Worth the drive from Barefoot Bay.",
    url: "https://www.fortpiercefarmersmarket.com",
  },
  {
    id: "stuart-market",
    title: "Market on Main",
    category: "market",
    venueId: "flagler-park",
    dow: 0,
    startTime: "09:00",
    endTime: "13:00",
    price: "Free",
    description:
      "Sunday on the St. Lucie River in downtown Stuart. Flagler Park, year-round, the slower Treasure Coast morning.",
  },
  {
    id: "psl-green",
    title: "Port St. Lucie Green Market",
    category: "market",
    venueId: "midflorida",
    dow: 0,
    startTime: "09:00",
    endTime: "14:00",
    price: "Free",
    description:
      "Sunday open-air market at the MIDFLORIDA Event Center — produce, food trucks, and a kids’ area most weeks.",
  },
  {
    id: "tradition-market",
    title: "Tradition Neighborhood Market",
    category: "market",
    venueId: "tradition-square",
    dow: 0,
    startTime: "09:00",
    endTime: "14:00",
    price: "Free",
    description: "Sunday green market at Tradition Square in Port St. Lucie. Farmers, makers, and the town square lawn.",
  },
  {
    id: "palm-bay-mkt",
    title: "Palm Bay Farmers Market",
    category: "market",
    venueId: "palm-bay-market",
    dow: 6,
    nth: [2, 4],
    startTime: "10:00",
    endTime: "14:00",
    price: "Free",
    description: "Second and fourth Saturdays on Dixie Highway in Palm Bay. The closest proper farmers market to Barefoot Bay.",
  },
  {
    id: "cocoa-art-weekly",
    title: "Cocoa Village Saturday Art Market",
    category: "street",
    venueId: "myrt-tharpe",
    dow: 6,
    startTime: "11:00",
    endTime: "17:00",
    price: "Free",
    description:
      "Weekly artisan market at Myrt Tharpe Square. Original work, then lunch in the village.",
    url: "https://visitcocoavillage.com/events/",
  },
  {
    id: "sat-beach-mkt",
    title: "Satellite Beach Farmers Market",
    category: "market",
    venueId: "pelican-beach",
    dow: 4,
    startTime: "10:00",
    endTime: "16:00",
    price: "Free",
    description: "Thursday market at Pelican Beach Park on A1A — ocean air, local produce, beach parking.",
  },
  {
    id: "viera-park-mkt",
    title: "Viera Park Market & Food Trucks",
    category: "market",
    venueId: "viera-park",
    dow: 5,
    nth: [1],
    startTime: "16:00",
    endTime: "20:00",
    price: "Free",
    description: "First Friday at Viera Regional Park: market tents, food trucks, and live music on the lawn.",
  },
  {
    id: "egad-first-friday",
    title: "EGAD First Friday",
    category: "street",
    venueId: "egad",
    dow: 5,
    nth: [1],
    startTime: "17:00",
    endTime: "21:00",
    price: "Free",
    description:
      "First Friday in the Eau Gallie Arts District. Galleries open late, Pineapple Avenue on foot, and Pineapples and Squid Lips within a block. The monthly EGAD street night.",
  },
  {
    id: "cape-friday-fest",
    title: "Friday Fest Cape Canaveral",
    category: "street",
    venueId: "cape-downtown",
    dow: 5,
    nth: [1],
    startTime: "17:00",
    endTime: "21:00",
    price: "Free",
    description: "First Friday street night in downtown Cape Canaveral — live music, vendors, ocean a few blocks east.",
  },
  {
    id: "olive-branch-mkt",
    title: "Olive Branch GreenMarket",
    category: "market",
    venueId: "olive-branch",
    dow: 6,
    startTime: "08:00",
    endTime: "13:00",
    price: "Free",
    description:
      "Saturday morning on the Indian River in Jensen Beach. Produce, baked goods, and a slower Treasure Coast start.",
  },
  {
    id: "sanbar-edm-weekly",
    title: "Saturday EDM Night",
    category: "rave",
    venueId: "sanbar-sat",
    dow: 6,
    startTime: "20:00",
    price: "Cover",
    skipIfVenueDay: true,
    description:
      "Weekly Saturday EDM night at Sanbar Satellite Beach — dark room, loud system, a few blocks off A1A.",
  },
  {
    id: "earls-sat-live",
    title: "Live on the river",
    category: "live",
    venueId: "earls",
    dow: 6,
    startTime: "14:00",
    price: "Free",
    skipIfVenueDay: true,
    description:
      "Saturday live music on the Indian River deck at Earl’s Hideaway in Sebastian. Afternoon into night, no cover most weeks.",
  },
  {
    id: "earls-sun-live",
    title: "Sunday on the river",
    category: "live",
    venueId: "earls",
    dow: 0,
    startTime: "14:00",
    price: "Free",
    skipIfVenueDay: true,
    description: "Sunday live music at Earl’s Hideaway — river deck, Sebastian, usually free.",
  },
  {
    id: "squid-egad-sat",
    title: "Live on the deck",
    category: "live",
    venueId: "squid-lips-egad",
    dow: 6,
    startTime: "18:00",
    price: "Free",
    skipIfVenueDay: true,
    description:
      "Saturday live music on the Squid Lips deck beside Eau Gallie Pier. Cover bands, lagoon air, no ticket.",
    url: "https://www.squidlipsgrill.com",
  },
  {
    id: "squid-egad-sun",
    title: "Sunday on the deck",
    category: "live",
    venueId: "squid-lips-egad",
    dow: 0,
    startTime: "17:00",
    price: "Free",
    skipIfVenueDay: true,
    description: "Sunday evening live music at Squid Lips EGAD on the Eau Gallie waterfront.",
    url: "https://www.squidlipsgrill.com",
  },
  {
    id: "lous-sat-live",
    title: "Saturday live at Lou’s",
    category: "live",
    venueId: "lous-blues",
    dow: 6,
    startTime: "13:00",
    price: "Free",
    skipIfVenueDay: true,
    description: "Saturday live music at Lou’s Blues in Indialantic, a short walk from the ocean.",
  },
  {
    id: "heidis-sat-jazz",
    title: "Saturday night jazz",
    category: "live",
    venueId: "heidis",
    dow: 6,
    startTime: "19:00",
    price: "Cover",
    skipIfVenueDay: true,
    description: "Saturday jazz at Heidi’s, Cocoa Beach’s long-running listening room on Orlando Avenue.",
    url: "https://heidisjazzclub.com",
  },
  {
    id: "foo-sat-dj",
    title: "Late DJ night",
    category: "rave",
    venueId: "foo-bar",
    dow: 6,
    startTime: "22:00",
    price: "Cover",
    skipIfVenueDay: true,
    description: "Late Saturday DJ sets at Foo Bar on Orlando Avenue in Cocoa Beach.",
  },
  {
    id: "hnb-sat-live",
    title: "Taproom live music",
    category: "live",
    venueId: "hell-n-blazes",
    dow: 6,
    startTime: "19:00",
    price: "Free",
    skipIfVenueDay: true,
    description: "Saturday night in the taproom at Hell ’n Blazes on New Haven Avenue in downtown Melbourne.",
    url: "https://hellnblazesbrewing.com",
  },
];

const DATED_PREFIXES = new Set(
  DATED.filter((e) => e.recurring).map((e) => `${e.venueId}|${e.start.slice(0, 10)}|${e.title}`),
);

function expandRecurring(): EventItem[] {
  const out: EventItem[] = [];
  const datedVenueDays = new Set(DATED.map((e) => `${e.venueId}|${e.start.slice(0, 10)}`));
  let day = "2026-09-04";
  const last = "2026-12-12";
  while (day <= last) {
    const dow = weekday(day);
    const nth = nthOfMonth(day);
    for (const spec of RECURRING) {
      if (spec.dow !== dow) continue;
      if (spec.nth && !spec.nth.includes(nth)) continue;
      if (spec.skipYmd?.includes(day)) continue;
      if (spec.skipIfVenueDay && datedVenueDays.has(`${spec.venueId}|${day}`)) continue;
      const key = `${spec.venueId}|${day}|${spec.title}`;
      if (DATED_PREFIXES.has(key)) continue;
      out.push({
        id: `${spec.id}-${day}`,
        title: spec.title,
        category: spec.category,
        start: iso(day, spec.startTime),
        end: spec.endTime ? iso(day, spec.endTime) : undefined,
        venueId: spec.venueId,
        price: spec.price,
        description: spec.description,
        url: spec.url,
        recurring: true,
      });
    }
    day = addDays(day, 1);
  }
  return out;
}

function toView(item: EventItem): EventView | null {
  const venue = VENUE_BY_ID[item.venueId];
  if (!venue) return null;
  const distanceMiles = haversineMiles(HOME.lat, HOME.lng, venue.lat, venue.lng);
  if (distanceMiles > HOME.radiusMiles + 0.5) return null;
  const startMs = Date.parse(item.start);
  let endMs = item.end ? Date.parse(item.end) : startMs + 3 * 60 * 60 * 1000;
  if (!Number.isFinite(startMs) || !Number.isFinite(endMs)) return null;
  if (endMs < startMs) endMs = startMs + 3 * 60 * 60 * 1000;
  return {
    ...item,
    venue,
    distanceMiles,
    startMs,
    endMs,
    ymd: item.start.slice(0, 10),
    searchHay:
      `${item.title} ${item.subtitle ?? ""} ${venue.name} ${venue.city} ${venue.neighborhood ?? ""} ${item.description}`.toLowerCase(),
  };
}

const ALL: EventView[] = [...DATED, ...expandRecurring()]
  .map(toView)
  .filter((e): e is EventView => e !== null)
  .sort((a, b) => a.startMs - b.startMs);

const seen = new Set<string>();
export const EVENTS: EventView[] = ALL.filter((e) => {
  const k = `${e.venueId}|${e.start}|${e.title}`;
  if (seen.has(k)) return false;
  seen.add(k);
  return true;
});

export const EVENTS_BY_ID: Record<string, EventView> = Object.fromEntries(
  EVENTS.map((e) => [e.id, e]),
);
