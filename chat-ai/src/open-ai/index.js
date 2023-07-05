import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  organization: import.meta.env.VITE_OPENAI_ORGID,
  apiKey: import.meta.env.VITE_OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);
export { openai };
