import { BOT_CHAT_CONSTANTS } from "../constants/botChatConstants"

export const generateUniqueBotName = () => {
    const first_names = ["Nova", "Zephyr", "Blaze", "Frost", "Quasar", "Pulse", "Orion", "Cinder", "Vortex", "Seren", "Lunar", "Solis", "Synth", "Zigzag", "Pixel"]
    const second_names = ["Rift", "Nebula", "Cipher", "Dynamo", "Haven", "Flare", "Vector", "Quanta", "Aegis", "Eclipse", "Pinnacle", "Cascade", "Jolt", "Matrix", "Nyx"]

    const rA = Math.floor(Math.random()*first_names.length);
    const rB = Math.floor(Math.random()*second_names.length);
    const bot_name = first_names[rA] + '_' + second_names[rB];

    return bot_name;
}

export const prepareBotConversation = (userId) => {
    const index = Math.floor(Math.random()*BOT_CHAT_CONSTANTS.length)

    return {message : BOT_CHAT_CONSTANTS[index].message, userId:userId}
}