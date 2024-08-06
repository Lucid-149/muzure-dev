type Car ={
    id:number
    name: string;
    pricePerDay: number;
    capacity: number;
    selfDrive: boolean;
    description: string;
    image: string;
    features: string[];
  }
export const Cars: Car[] = [
    {
      id: 0,
      name: "Toyota Prado",
      pricePerDay: 100,
      capacity: 5,
      selfDrive: true,
      description:
        "Toyota Land Cruiser Prado automatic. Perfect for a self-drive adventure.",
      image: "https://utfs.io/f/9453cb91-a17b-4828-9a16-6e3663399570-1f.webp",
      features: ["Air Bags", "Spare Wheel", "Unlimited Millage (optional)"],
    },
    {
      id:1,
      name: "Toyota Harrier",
      pricePerDay: 60,
      capacity: 5,
      selfDrive: true,
      description:
        "Toyota Harrier automatic. Ideal for those who prefer driving themselves.",
      image: "https://utfs.io/f/c02256c4-6ece-4162-ab72-7771db7c59f2-1g.webp",
      features: ["Air Bags", "Spare Wheel", "Unlimited Millage (optional)"],
    },
    {
      id:2,
      name: "Toyota Premio",
      pricePerDay: 40,
      capacity: 5,
      selfDrive: true,
      description: "Toyota Premio automatic. Enjoy the convenience of self-drive.",
      image: "https://utfs.io/f/a24ffe01-418e-4689-bca5-689b8e3b8bf1-1h.webp",
      features: ["Air Bags", "Spare Wheel", "Unlimited Millage (optional)"],
    },
    {
      id:3,
      name: "Toyota Coaster",
      pricePerDay: 380,
      capacity: 22,
      selfDrive: false,
      description:
        "Toyota Coaster with a qualified tour/driver guide. Inclusive of fuel, parking fees, and unlimited WIFI.",
      image: "https://utfs.io/f/b14e30df-dee9-4099-9b4f-91d552dede41-1k.webp",
      features: [
         "Qualified Tour/Driver guide ",
        "Fuel",
        "Parking fees",
        "Drinking water",
        "Unlimited WIFI",
      ],
    },
    {
      id:4,
      name: "Toyota Hiace Quantum (Executive)",
      pricePerDay: 220,
      capacity: 6,
      selfDrive: false,
      description:
        "Executive Toyota Hiace Quantum with a qualified tour/driver guide. Inclusive of fuel, parking fees, and unlimited WIFI.",
      image: "https://utfs.io/f/d82221a1-0259-4ea7-a932-b10437b1736c-1i.webp",
      features: [
         "Qualified Tour/Driver guide ",
        "Fuel",
        "Parking fees",
        "Drinking water",
        "Unlimited WIFI",
      ],
    },
    {
      id:5,
      name: "Toyota Crown (Royal)",
      pricePerDay: 180,
      capacity: 3,
      selfDrive: false,
      description:
        "Toyota Crown (Royal) with a qualified tour/driver guide. Inclusive of fuel, parking fees, and unlimited WIFI.",
      image: "https://utfs.io/f/a24ffe01-418e-4689-bca5-689b8e3b8bf1-1h.webp",
      features: [
         "Qualified Tour/Driver guide ",
        "Fuel",
        "Parking fees",
        "Drinking water",
        "Unlimited WIFI",
      ],
    },
    {
      id:6,
      name: "Toyota Prado",
      pricePerDay: 300,
      capacity: 3,
      selfDrive: false,
      description:
        "Toyota Prado with a qualified tour/driver guide. Inclusive of fuel, parking fees, and unlimited WIFI.",
      image: "https://utfs.io/f/9453cb91-a17b-4828-9a16-6e3663399570-1f.webp",
      features: [
         "Qualified Tour/Driver guide ",
        "Fuel",
        "Parking fees",
        "Drinking water",
        "Unlimited WIFI",
      ],
    },
    {
      id:7,
      name: "Mercedes Benz Vito",
      pricePerDay: 320,
      capacity: 6,
      selfDrive: false,
      description:
        "Mercedes Benz Vito with a qualified tour/driver guide. Inclusive of fuel, parking fees, and unlimited WIFI.",
      image: "https://utfs.io/f/4cf9bedc-71b0-4680-976c-c3ceb77b6a0c-1j.webp",
      features: [
         "Qualified Tour/Driver guide ",
        "Fuel",
        "Parking fees",
        "Drinking water",
        "Unlimited WIFI",
      ],
    },
    {
      id:8,
      name: "Mercedes Benz S-Class 350",
      pricePerDay: 300,
      capacity: 3,
      selfDrive: false,
      description:
        "Mercedes Benz S-Class 350 with a qualified tour/driver guide. Inclusive of fuel, parking fees, and unlimited WIFI.",
      image: "https://utfs.io/f/c068feaa-4291-458f-9a76-94a2be9c0611-1l.webp",
      features: [
        "Qualified Tour/Driver guide ",
        "Fuel",
        "Parking fees",
        "Drinking water",
        "Unlimited WIFI",
      ],
    },
    {
      id:9,
      name: "Toyota Land Cruiser (Open Game Drive)",
      pricePerDay: 380,
      capacity: 7,
      selfDrive: false,
      description: "Toyota Land Cruiser (Open Game Drive) with a qualified tour/driver guide. Inclusive of fuel, parking fees, and unlimited WIFI.",
      image: "https://utfs.io/f/fac5bc46-924b-4916-8d38-95c773721992-1d.webp",
      features: [
        "Extra-large panorama Windows",
        "In-built fridge & charging Ports",
        "Fitted with a retractable canvas awning and in-built Picnic Table",
        "One pair of binoculars, animal & bird book",
      ],
    },
    {
      id:10,
      name: "Toyota Landcruiser",
      pricePerDay: 300,
      capacity: 8,
      selfDrive: false,
      description: "Toyota Landcruiser with a qualified tour/driver guide. Inclusive of fuel, parking fees, and unlimited WIFI.",
      image: "https://utfs.io/f/acbd21b2-7b93-47a8-904f-768036fb88a1-1e.webp",
      features: [
        "Extra-large panorama Windows and pop-up roof",
        "In-built fridge & charging Ports",
        "Fitted with a retractable canvas awning and in-built Picnic Table",
        "One pair of binoculars, animal & bird book",
      ],
    },
  ];