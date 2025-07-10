import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key"
});

export async function testPromptWithOpenAI(
  promptTemplate: string,
  userInputs: Record<string, any>,
  model: string = "gpt-4o"
): Promise<string> {
  try {
    // Replace all placeholders in prompt template with user inputs
    let finalPrompt = promptTemplate;
    
    // Replace named placeholders like {topic}, {context}, etc.
    Object.entries(userInputs).forEach(([key, value]) => {
      const placeholder = `{${key}}`;
      finalPrompt = finalPrompt.replace(new RegExp(placeholder, 'g'), value);
    });
    
    // Legacy support for {user_input} placeholder
    if (userInputs.user_input || userInputs.main_input) {
      const mainInput = userInputs.user_input || userInputs.main_input;
      finalPrompt = finalPrompt.replace(/\{user_input\}/g, mainInput);
    }
    
    const response = await openai.chat.completions.create({
      model: model,
      messages: [
        { role: "user", content: finalPrompt }
      ],
      max_tokens: 2000,
      temperature: 0.7,
    });

    return response.choices[0].message.content || "No response generated";
  } catch (error) {
    console.error("OpenAI API Error:", error);
    throw new Error("Failed to generate response from OpenAI");
  }
}
