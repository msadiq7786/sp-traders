// data/reviews.ts

export type Review = {
  name: string;
  role: string;
  location: string;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  image?: string;
};

export const reviews: Review[] = [
  {
    name: "Ravi Kumar",
    role: "Factory Owner",
    location: "Mysore, Karnataka",
    rating: 5,
    quote:
      "SP-Traders has been our trusted supplier for fuel oil for over two years. Consistent quality and on-time delivery every time.",
    image: undefined,
  },
  {
    name: "Suresh Babu",
    role: "Procurement Manager",
    location: "Bangalore, Karnataka",
    rating: 5,
    quote:
      "Good quality hexane oil at a fair price. The team is easy to reach and always helpful with bulk orders.",
    image: undefined,
  },
  {
    name: "Anand Murthy",
    role: "Plant Supervisor",
    location: "Hubballi, Karnataka",
    rating: 4,
    quote:
      "Reliable supply of fuel oil for our boilers. Haven't had any quality issues so far. Recommended for local buyers.",
    image: undefined,
  },
  {
    name: "Gopal Nair",
    role: "Operations Head",
    location: "Mangalore, Karnataka",
    rating: 5,
    quote:
      "We have been buying hexane oil from SP-Traders since 2020. Very professional, delivers on schedule and the quality is consistent batch after batch.",
    image: undefined,
  },
  {
    name: "Venkatesh Reddy",
    role: "Purchase Manager",
    location: "Tumkur, Karnataka",
    rating: 5,
    quote:
      "Switched our fuel oil vendor to SP-Traders last year. Pricing is competitive and their team responds quickly on WhatsApp. Very easy to deal with.",
    image: undefined,
  },
  {
    name: "Priya Shankar",
    role: "Chemical Industry Buyer",
    location: "Hassan, Karnataka",
    rating: 4,
    quote:
      "Sourcing hexane for our extraction unit from SP-Traders. Product quality meets our process requirements. Good communication throughout.",
    image: undefined,
  },
];
