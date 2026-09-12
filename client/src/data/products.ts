export type OilProduct = {
  name: string;
  hsn: string;
  description: string;
};

export const oilProducts: OilProduct[] = [
  {
    name: "Fuel Oil",
    hsn: "HSN 27101950",
    description:
      "High-quality fuel oil for industrial furnaces, boilers, and power generation applications.",
  },
  {
    name: "Hexane Oil",
    hsn: "HSN 29011000",
    description:
      "Food-grade hexane solvent used in oil extraction, laboratory processes, and industrial cleaning.",
  },
];
