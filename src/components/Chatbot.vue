<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="chatbot">
      <div class="chat-history">
        <div v-for="(message, index) in chatHistory" :key="index" class="message">
          <p>{{ message.content }}</p>
          <div v-if="message.options">
            <button v-for="(option, idx) in message.options" :key="idx" @click="handleOptionClick(option.next)">
              {{ option.text }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { chatData } from '../data';
  
  export default {
    data() {
      return {
        chatHistory: [],
        currentIndex: 0
      };
    },
    methods: {
      handleOptionClick(nextIndex) {
        this.currentIndex = nextIndex;
        this.updateChat();
      },
      updateChat() {
        const currentMessage = chatData[this.currentIndex];
        this.chatHistory.push(currentMessage);
  
        if (currentMessage.type === 'affirmation') {
          this.currentIndex++;
          this.updateChat();
        }
      }
    },
    mounted() {
      this.updateChat();
    }
  };
  </script>
  
  <style scoped>
  .chatbot {
    width: 300px;
    border: 1px solid #ccc;
    padding: 10px;
  }
  .chat-history {
    max-height: 400px;
    overflow-y: auto;
  }
  .message {
    margin-bottom: 10px;
  }
  button {
    margin-right: 5px;
  }
  </style>
  