<template>
  <header>
    <h1 class="text-center text-xl">L'entête</h1>
  </header>

  <main class="max-w-4xl mx-auto h-screen p-4 md:p-10">
    <!-- Historique des interactions -->
    <div v-for="(message, index) in conversationHistory" :key="index">
      <!-- Affichage des messages bot (questions) -->
      <div v-if="message.type === 'bot'" class="chat chat-start mb-[-0.2rem]">
        <div class="chat-image avatar">
          <div class="w-8 md:w-10 rounded-full">
            <img
              alt="Avatar"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>
        <div class="chat-bubble text-left">{{ message.text }}</div>
      </div>
      <!-- Affichage des réponses de l'utilisateur -->
      <div v-else-if="message.type === 'user'" class="chat chat-end mb-2">
        <div class="chat-bubble">{{ message.text }}</div>
      </div>
    </div>
    <div class="ml-10">
      <Chat_loader v-if="showloader" />
    </div>

    <!-- La question en cours avec les options -->
    <div v-if="showQuestion" class="chat chat-start">
      <div class="chat-image avatar">
        <div class="w-8 md:w-10 rounded-full">
          <img
            alt="Avatar"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          />
        </div>
      </div>
      <div class="chat-bubble">
        <p class="text-left">{{ firstQuestion }}</p>

        <div
          class="flex flex-wrap border-2 gap-2 rounded-lg p-3"
          v-if="firstQuestion == 'Note tes coordonnées juste ici 👇'"
        >
          <div class="mb-4 w-full md:w-[49%] lg:w-[49%]">
            <label
              for="telephone"
              class="block text-[1rem] md:text-[1rem] lg:text-base xl:text-base font-medium text-gray-600"
              ><span
                class="text-black text-[1rem] md:text-[1rem] lg:text-base xl:text-base font-bold"
                >*</span
              >
              Téléphone :</label
            >
            <input
              id="telephone"
              class="mt-1 p-1 border-2 border-solid rounded-md w-full text-[1rem] md:text-[1rem] lg:text-base xl:text-base"
              placeholder="veuillez entrer votre numéro"
              type="tel"
            />
          </div>
          <div class="mb-4 w-full md:w-[49%] lg:w-[49%]">
            <label
              for="email"
              class="block text-[1rem] md:text-[1rem] lg:text-base xl:text-base font-medium text-gray-600"
              ><span
                class="text-black text-[1rem] md:text-[1rem] lg:text-base xl:text-base font-bold"
                >*</span
              >Email :</label
            >
            <input
              id="email"
              class="mt-1 p-1 border-2 border-solid rounded-md w-full text-[1rem] md:text-[1rem] lg:text-base xl:text-base"
              placeholder="Veuillez entrer votre mail"
              type="email"
            />
          </div>
        </div>
        <div class="flex flex-wrap justify-center mt-4">
          <button
            v-for="(answer, index) in suggested_answers"
            :key="index"
            @click="handleAnswerClick(answer.answer)"
            class="m-2 p-2 bg-blue-500 text-white rounded"
          >
            {{ answer.answer }}
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Chat_loader from "./chat_loader.vue";
// Variables
const weight = ref(0);
const answerChosen = ref(null);
const firstQuestion = ref("");
// const botAnswer = ref("");
const showQuestion = ref(false);
// Historique des messages
const conversationHistory = ref([]);
const showloader = ref(false);
const case4Displayed = ref(false); // Nouvelle variable pour suivre l'affichage du case 4

// Réponses suggérées initiales
const suggested_answers = ref([]);

// Messages de bienvenue
const beginMsg = ref([
  "Bonjour, c'est Léo ton bot mobile. 😊",
  "Tu souhaites un nouveau téléphone ? Restes avec moi jusqu'au bout ! 🤗",
  "Faisons connaissance... 😉",
]);

const endMsg = ref([
  "Ton offre la plus adaptée, c'est chez :",
  "Je passe la main à un humain, 🤵 il te rappellera d’ici quelques minutes…",
  "Prépare-toi à dégainer ton téléphone pour en profiter au plus vite 📞",
  "Pour avoir la proposition la plus précise, connecte-toi à l’espace client de ton opérateur ou assure-toi d’avoir une facture sous la main.",
  "Belle journée à toi et profite à fond de ta nouvelle expérience mobile ! 😉",
  "Et si cet échange t’a plu, partage-le avec tes amis !",
]);

// Affichage progressif des messages de bienvenue
const displayWelcomeMessages = async () => {
  for (let i = 0; i < beginMsg.value.length; i++) {
    conversationHistory.value.push({ text: beginMsg.value[i], type: "bot" });
    await new Promise((resolve) => setTimeout(resolve, 3000));
    showloader.value = true;
  }
  // Après les messages de bienvenue, afficher la première question via le switch
  getAnswerChosen();
  showQuestion.value = true;
  showloader.value = false;
};
// Affichage progressif des messages de fin
const displayEndMessages = async () => {
  for (let i = 0; i < endMsg.value.length; i++) {
    conversationHistory.value.push({ text: endMsg.value[i], type: "bot" });
    await new Promise((resolve) => setTimeout(resolve, 3000));
    showloader.value = true;
  }
  showloader.value = false;
};

// Gérer le choix de réponse de l'utilisateur
const handleAnswerClick = (answer) => {
  // Ajouter la question actuelle à l'historique avant la réponse
  conversationHistory.value.push({ text: firstQuestion.value, type: "bot" });
  // Ajouter la réponse de l'utilisateur après la question
  conversationHistory.value.push({ text: answer, type: "user" });

  // conversationHistory.value.push({ text: botAnswer.value, type: "bot" });

  answerChosen.value = answer;
  // Masquer les options après avoir cliqué
  showQuestion.value = false;
  weight.value++;
  showloader.value = true;

  if (answer == "Je découvre mon offre") {
    console.log("display answer");
    displayEndMessages();
    // Marquer le case 4 comme affiché
    case4Displayed.value = true;
  } else {
    // Générer la question suivante
    getAnswerChosen();
    // Afficher la question suivante après 1 seconde
    setTimeout(() => {
      showloader.value = false;
      showQuestion.value = true;
    }, 2000);
  }
};

// Fonction pour gérer les questions et les réponses
const getAnswerChosen = () => {
  // Ne pas afficher de nouvelles questions si le case 4 a déjà été affiché
  if (case4Displayed.value) {
    return;
  }

  switch (weight.value) {
    case 0:
      firstQuestion.value = "Quelle marque de téléphone 📱 te ferait plaisir ?";
      suggested_answers.value = [
        { answer: "SAMSUNG", answerImg: require("@/assets/img/samsung.png") },
        {
          answer: "SAMSUNG Z-Flip",
          answerImg: require("@/assets/samsumg_flip.png"),
        },
        { answer: "IPHONE", answerImg: require("@/assets/img/iphone1.png") },
        { answer: "REDMI", answerImg: require("@/assets/img/xiaomi.png") },
        { answer: "HONOR", answerImg: require("@/assets/img/honor.png") },
        { answer: "AUTRE", answerImg: require("@/assets/img/dot.png") },
      ];
      break;
    case 1:
      firstQuestion.value = "Tu as besoin de combien de data 📶 ?";
      suggested_answers.value = [
        { answer: "20Go", answerImg: null },
        { answer: "100Go", answerImg: null },
        { answer: "130Go", answerImg: null },
        { answer: "150Go", answerImg: null },
        { answer: "200Go", answerImg: null },
        { answer: "300Go", answerImg: null },
        { answer: "Je ne sais pas", answerImg: null },
      ];
      break;
    case 2:
      firstQuestion.value = "Merci pour ta réponse !";
      suggested_answers.value = [];
      break;
    case 3:
      firstQuestion.value = "Tu paies combien 💰 actuellement ?";
      suggested_answers.value = [
        { answer: "Moins 20 €", answerImg: null },
        { answer: "Entre 20 et 30 €", answerImg: null },
        { answer: "Entre 30 et 40 €", answerImg: null },
        { answer: "Plus de 40 €", answerImg: null },
        { answer: "Je ne sais pas", answerImg: null },
      ];
      break;
    case 4:
      firstQuestion.value = "Merci pour ta réponse !";
      suggested_answers.value = [];
      break;
    case 5:
      firstQuestion.value = "Et, es-tu toujours engagé(e) stp ?";
      suggested_answers.value = [
        { answer: "Oui", answerImg: null },
        { answer: "Non", answerImg: null },
        { answer: "NSP", answerImg: null },
      ];
      break;
    case 6:
      firstQuestion.value = "Note tes coordonnées juste ici 👇";
      suggested_answers.value = [
        { answer: "Je découvre mon offre", answerImg: null },
      ];
      break;
    case 7:
      firstQuestion.value = "Merci pour tes informations !";
      suggested_answers.value = [];
      break;
    case 8:
      firstQuestion.value = "Nous allons maintenant te proposer les meilleures offres.";
      suggested_answers.value = [];
      break;
  }

  // Si le case n'a pas de réponses suggérées, passer au case suivant
  if (suggested_answers.value.length === 0) {
    conversationHistory.value.push({ text: firstQuestion.value, type: "bot" });
    weight.value++;
    getAnswerChosen();
  } else {
    showQuestion.value = true;
  }
};

onMounted(() => {
  showloader.value = true;
  setTimeout(() => {
    displayWelcomeMessages();
  }, 5000);
});
</script>
