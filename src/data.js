export const chatbotData = [
    {
      id: 1,
      message: "Bienvenue sur notre plateforme !",
      type: "welcome",
      nextQuestion: 2
    },
    {
      id: 2,
      question: "Quel est votre besoin aujourd'hui ?",
      responses: [
        { text: "Assistance technique", nextId: 3 },
        { text: "Informations sur un produit", nextId: 4 },
        { text: "Autre", nextId: 5 }
      ]
    },
    {
      id: 3,
      affirmations: ["Vous avez choisi assistance technique."],
      question: "Quel produit utilisez-vous ?",
      responses: [
        { text: "Produit A", nextId: 6 },
        { text: "Produit B", nextId: 7 }
      ]
    },
  ];
  