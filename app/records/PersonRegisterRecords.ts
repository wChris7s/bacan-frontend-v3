export type PersonType = "user" | "entrepreneur";

export type PersonRegisterData = {
  cardImage: string;
  cardImageTitle: string;
  cardTitle: string;
  cardDescription: string;
};

export const RegisterCardData: Record<PersonType, PersonRegisterData> = {
  user: {
    cardImage: "public/user_role.png",
    cardImageTitle: "Usuario",
    cardTitle: "Usuario",
    cardDescription:
      "Lizards are a widespread group of squamate reptiles, with over 6,000species, ranging across all continents except Antarctica",
  },
  entrepreneur: {
    cardImage: "public/emprendedor_role.png",
    cardImageTitle: "Emprendedor",
    cardTitle: "Emprendedor",
    cardDescription:
      "Lizards are a widespread group of squamate reptiles, with over 6,000species, ranging across all continents except Antarctica",
  },
};
