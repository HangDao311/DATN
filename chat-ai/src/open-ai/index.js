import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  organization: "org-NbEojtG7YWcr324b26pjL3Ji",
  apiKey: import.meta.env.VITE_OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);
export { openai };
