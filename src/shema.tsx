export const schema = {
  type: "object",
  properties: {
    nom: { type: "string", title: "Nom" },
    paysVisites: {
      type: "array",
      title: "Pays visités",
      items: {
        type: "string",
        enum: ["Belgique", "France", "Allemagne", "Italie", "Espagne", "Nigeria", "Afrique du Sud"]
      }
    }
  }
};

export const uischema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/nom"
    },
    {
      type: "Control",
      scope: "#/properties/paysVisites",
      options: {
        detail: {
          type: "VerticalLayout"
        }
      }
    }
  ]
};
