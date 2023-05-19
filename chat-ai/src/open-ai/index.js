import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  organization: "org-NbEojtG7YWcr324b26pjL3Ji",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);
export { openai };
