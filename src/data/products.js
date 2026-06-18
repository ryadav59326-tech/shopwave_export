// Dummy product data for ShopWave ecommerce store
export const products = [
  {
    id: 1,
    name: "Artisan Leather Tote",
    price: 189,
    originalPrice: 240,
    category: "Bags",
    rating: 4.8,
    reviews: 124,
    stock: 15,
    badge: "Best Seller",
    description: "Handcrafted from full-grain vegetable-tanned leather, this tote ages beautifully with use. Spacious interior with two slip pockets and one zip pocket. Reinforced stitching at all stress points.",
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80",
    ],
    colors: ["#8B5E3C", "#2C2C2C", "#C4A882"],
    sizes: ["S", "M", "L"],
    reviewsList: [
      { id: 1, user: "Priya M.", rating: 5, comment: "Absolutely stunning quality. The leather is soft yet durable. Worth every rupee!", date: "2024-12-10" },
      { id: 2, user: "Ravi K.", rating: 4, comment: "Great bag, very spacious. The stitching is immaculate. Would love more color options.", date: "2024-11-28" },
    ]
  },
  {
    id: 2,
    name: "Minimalist Watch Co.",
    price: 295,
    originalPrice: 295,
    category: "Accessories",
    rating: 4.9,
    reviews: 89,
    stock: 8,
    badge: "New",
    description: "Swiss movement, sapphire crystal glass, 42mm stainless steel case. Water resistant to 50m. A watch that speaks in whispers, not shouts.",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
      "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=600&q=80",
      "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=600&q=80",
    ],
    colors: ["#C0C0C0", "#FFD700", "#2C2C2C"],
    sizes: ["38mm", "42mm"],
    reviewsList: [
      { id: 1, user: "Ananya S.", rating: 5, comment: "The most elegant watch I've ever owned. Clean, simple, perfect.", date: "2025-01-05" },
      { id: 2, user: "Vikram P.", rating: 5, comment: "Bought as a gift - recipient was thrilled. Quality is top notch.", date: "2024-12-22" },
    ]
  },
  {
    id: 3,
    name: "Merino Wool Sweater",
    price: 145,
    originalPrice: 180,
    category: "Clothing",
    rating: 4.7,
    reviews: 203,
    stock: 30,
    badge: "Sale",
    description: "100% extra-fine merino wool from New Zealand. Naturally temperature-regulating, anti-odor, and impossibly soft. Available in a curated palette of earth tones.",
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80",
    ],
    colors: ["#8B7355", "#4A4A4A", "#C4A882", "#6B8E6B"],
    sizes: ["XS", "S", "M", "L", "XL"],
    reviewsList: [
      { id: 1, user: "Meera R.", rating: 5, comment: "So incredibly soft! I sleep in it sometimes, it's that comfortable.", date: "2025-01-12" },
      { id: 2, user: "Arun T.", rating: 4, comment: "Great quality but runs slightly large. Size down!", date: "2024-12-18" },
    ]
  },
  {
    id: 4,
    name: "Ceramic Pour-Over Set",
    price: 78,
    originalPrice: 78,
    category: "Home",
    rating: 4.6,
    reviews: 67,
    stock: 22,
    badge: null,
    description: "Hand-thrown stoneware dripper and carafe set. Each piece is unique with slight variations in the speckled glaze. Makes exceptional coffee while looking beautiful on your counter.",
    images: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80",
      "https://images.unsplash.com/photo-1516743619420-154b70a65fea?w=600&q=80",
    ],
    colors: ["#E8DCC8", "#4A4A4A", "#7B9EA6"],
    sizes: ["2-cup", "4-cup"],
    reviewsList: [
      { id: 1, user: "Deepa N.", rating: 5, comment: "Makes my morning ritual so much more enjoyable. Beautiful piece.", date: "2025-01-08" },
    ]
  },
  {
    id: 5,
    name: "Raw Denim Jeans",
    price: 220,
    originalPrice: 220,
    category: "Clothing",
    rating: 4.8,
    reviews: 156,
    stock: 18,
    badge: null,
    description: "14oz Japanese selvedge denim. Unwashed, unsanforized. These jeans will fade uniquely to your body and lifestyle over months of wear. The most personal garment you'll ever own.",
    images: [
      "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=600&q=80",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80",
      "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?w=600&q=80",
    ],
    colors: ["#1a1a2e", "#2C4770"],
    sizes: ["28", "30", "32", "34", "36"],
    reviewsList: [
      { id: 1, user: "Karan B.", rating: 5, comment: "After 6 months of wear these have faded beautifully. True heirloom quality.", date: "2025-01-15" },
      { id: 2, user: "Suresh L.", rating: 5, comment: "Worth the investment. These will last a decade at minimum.", date: "2024-12-30" },
    ]
  },
  {
    id: 6,
    name: "Linen Bedding Set",
    price: 165,
    originalPrice: 210,
    category: "Home",
    rating: 4.9,
    reviews: 94,
    stock: 12,
    badge: "Sale",
    description: "French flax linen duvet cover and two pillowcases. Pre-washed for instant softness. Gets better with every wash. Naturally cooling, hypoallergenic.",
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&q=80",
    ],
    colors: ["#F5F0E8", "#C4A882", "#8B9EA6", "#6B7C6B"],
    sizes: ["Twin", "Full", "Queen", "King"],
    reviewsList: [
      { id: 1, user: "Nisha P.", rating: 5, comment: "The best sleep investment I've made. Cool in summer, warm in winter.", date: "2025-01-20" },
    ]
  },
  {
    id: 7,
    name: "Leather Oxford Shoes",
    price: 340,
    originalPrice: 340,
    category: "Footwear",
    rating: 4.8,
    reviews: 78,
    stock: 10,
    badge: "New",
    description: "Goodyear welted construction on a leather sole. Full-grain calf leather upper. These can be re-soled indefinitely - a true lifetime shoe with the right care.",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80",
    ],
    colors: ["#3D1C0A", "#2C2C2C", "#8B7355"],
    sizes: ["6", "7", "8", "9", "10", "11", "12"],
    reviewsList: [
      { id: 1, user: "Rohit M.", rating: 5, comment: "Wore them to my wedding. Perfect fit, spectacular look.", date: "2024-12-05" },
    ]
  },
  {
    id: 8,
    name: "Brass Desk Lamp",
    price: 125,
    originalPrice: 125,
    category: "Home",
    rating: 4.5,
    reviews: 45,
    stock: 20,
    badge: null,
    description: "Solid brass body with articulating arm. Compatible with standard E26 bulbs. Designed to develop a natural patina over time. A functional sculpture for your workspace.",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=600&q=80",
    ],
    colors: ["#B8860B", "#4A4A4A"],
    sizes: ["Standard"],
    reviewsList: [
      { id: 1, user: "Kavya S.", rating: 4, comment: "Looks incredible, warm quality light. Assembly was slightly confusing.", date: "2025-01-02" },
    ]
  },
  {
    id: 9,
    name: "Canvas Backpack",
    price: 135,
    originalPrice: 160,
    category: "Bags",
    rating: 4.6,
    reviews: 112,
    stock: 25,
    badge: "Sale",
    description: "18oz waxed canvas with full-grain leather trim. 20L capacity with a padded laptop sleeve for up to 15\". Waterproof, virtually indestructible.",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80",
      "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=600&q=80",
    ],
    colors: ["#4A4A4A", "#3D2B1F", "#2C4770"],
    sizes: ["20L"],
    reviewsList: [
      { id: 1, user: "Amit K.", rating: 5, comment: "Took this through monsoon season. Not a single drop got in.", date: "2025-01-10" },
    ]
  },
  {
    id: 10,
    name: "Silk Midi Dress",
    price: 245,
    originalPrice: 310,
    category: "Clothing",
    rating: 4.7,
    reviews: 88,
    stock: 14,
    badge: "Sale",
    description: "19mm charmeuse silk. Fluid drape, bias cut. Effortlessly transitions from a market run to an evening event. Machine washable in cold water on gentle cycle.",
    images: [
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80",
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&q=80",
    ],
    colors: ["#C4A882", "#2C4770", "#8B5E3C", "#1a1a2e"],
    sizes: ["XS", "S", "M", "L"],
    reviewsList: [
      { id: 1, user: "Pooja V.", rating: 5, comment: "The silk quality is exceptional. Got so many compliments!", date: "2024-12-28" },
    ]
  },
  {
    id: 11,
    name: "Suede Chelsea Boots",
    price: 280,
    originalPrice: 280,
    category: "Footwear",
    rating: 4.7,
    reviews: 63,
    stock: 9,
    badge: null,
    description: "Premium suede upper, elasticated side panels, leather lining. Blake-stitched for a sleek profile. Stackable rubber heel for urban durability.",
    images: [
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=600&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80",
    ],
    colors: ["#8B7355", "#2C2C2C", "#8B5E3C"],
    sizes: ["6", "7", "8", "9", "10", "11"],
    reviewsList: [
      { id: 1, user: "Sanjay R.", rating: 5, comment: "Most comfortable boot I've ever worn. Perfect for all-day walking.", date: "2025-01-18" },
    ]
  },
  {
    id: 12,
    name: "Sterling Silver Ring",
    price: 68,
    originalPrice: 68,
    category: "Accessories",
    rating: 4.9,
    reviews: 201,
    stock: 50,
    badge: "Best Seller",
    description: "Hand-forged 925 sterling silver. Each ring is unique with a slightly irregular, organic texture. Pairs beautifully with others or stands alone. Ships in a sustainable cotton pouch.",
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80",
      "https://images.unsplash.com/photo-1603974372039-adc49044b6bd?w=600&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
    ],
    colors: ["#C0C0C0", "#FFD700"],
    sizes: ["5", "6", "7", "8", "9"],
    reviewsList: [
      { id: 1, user: "Lalita D.", rating: 5, comment: "Bought 4 of these to stack. Each one slightly different, all beautiful.", date: "2025-01-22" },
    ]
  }
];

export const categories = [
  { id: 1, name: "Clothing", icon: "👕", count: 3, image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80" },
  { id: 2, name: "Bags", icon: "👜", count: 2, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80" },
  { id: 3, name: "Accessories", icon: "💍", count: 2, image: "https://images.unsplash.com/photo-1576023867048-7e7c7a04f29f?w=400&q=80" },
  { id: 4, name: "Home", icon: "🏠", count: 3, image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400&q=80" },
  { id: 5, name: "Footwear", icon: "👟", count: 2, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
];

export const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Interior Designer, Mumbai",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    text: "ShopWave has completely changed how I shop. Every product I've received exceeds my expectations. The curation is impeccable - these are things built to last.",
    rating: 5,
  },
  {
    id: 2,
    name: "Arjun Patel",
    role: "Architect, Ahmedabad",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    text: "I appreciate that ShopWave focuses on quality over quantity. The leather goods especially - they age like fine wine. My tote is 2 years old and looks better now than when I bought it.",
    rating: 5,
  },
  {
    id: 3,
    name: "Meera Nair",
    role: "Photographer, Bengaluru",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
    text: "The attention to detail is extraordinary. Not just in the products themselves, but in the packaging, the communication, the entire experience. Rare to find this level of care.",
    rating: 5,
  },
];
