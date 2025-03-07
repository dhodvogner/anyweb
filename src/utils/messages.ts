import type { CoreMessage } from "ai";

const MESSAGES: CoreMessage[] = [];

export const getMessages = () => MESSAGES;

export const addMessage = (message: CoreMessage) => MESSAGES.push(message);

export const clearMessages = () => MESSAGES.length = 0;