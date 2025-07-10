import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateImageWithDalle(
  prompt: string,
  model: string = "dall-e-3",
  size: "1024x1024" | "1792x1024" | "1024x1792" = "1024x1024",
  quality: "standard" | "hd" = "standard"
): Promise<{ imageUrl: string; revisedPrompt?: string }> {
  try {
    const response = await openai.images.generate({
      model: model as "dall-e-2" | "dall-e-3",
      prompt: prompt,
      n: 1,
      size: size,
      quality: model === "dall-e-3" ? quality : undefined,
    });

    if (!response.data || response.data.length === 0) {
      throw new Error("No image generated");
    }
    
    const result = response.data[0];
    
    return {
      imageUrl: result.url || "",
      revisedPrompt: result.revised_prompt || undefined,
    };
  } catch (error: any) {
    console.error("DALL-E API Error:", error);
    throw new Error(`Failed to generate image: ${error.message}`);
  }
}

export async function testImagePromptWithDalle(
  promptText: string,
  inputs: Record<string, any>,
  model: string
): Promise<{ output: string; outputType: string }> {
  try {
    // Replace placeholders in the prompt with actual input values
    let processedPrompt = promptText;
    Object.entries(inputs).forEach(([key, value]) => {
      const placeholder = `{${key}}`;
      processedPrompt = processedPrompt.replace(new RegExp(placeholder, 'g'), value);
    });

    const result = await generateImageWithDalle(
      processedPrompt,
      model,
      "1024x1024",
      "standard"
    );

    return {
      output: result.imageUrl,
      outputType: "image",
    };
  } catch (error: any) {
    console.error("Error testing image prompt:", error);
    throw new Error(`Failed to test image prompt: ${error.message}`);
  }
}