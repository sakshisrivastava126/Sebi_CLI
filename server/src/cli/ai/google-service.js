import {google} from "@ai-sdk/google";
import {convertToModelMessages, generateText, streamText} from "ai";
import {config} from "../../config/google.config.js"
import chalk from "chalk"

export class AIService{
    constructor(){
        if(!config.googleApiKey){
            throw new Error("GOOGLE_API_KEY is not set in env")
        }

        this.model = google(config.model , {
            apiKey:config.googleApiKey,
        })
    }


    /**
     * Send a message and get streaming response
     * @param {Array} messages
     * @param {Function} onChunk
     * @param {Object} tools
     * @param {Function} onToolCall
     * @returns {Promise<Object>}
     */
    
    async sendMessage(messages, onChunk, tools = undefined, onToolCall = null) {
  try {
    // Build config first
    const streamConfig = {
      model: this.model,
      messages,
    };

    // Attach tools if provided
    if (tools && Object.keys(tools).length > 0) {
      streamConfig.tools = tools;
      streamConfig.maxSteps = 5;
    }

    const result = streamText(streamConfig);

    let fullResponse = "";

    // Stream text
    for await (const chunk of result.textStream) {
      fullResponse += chunk;
      if (onChunk) onChunk(chunk);
    }

    // Wait for full completion
    const finalText = await result.text;
    const usage = await result.usage;
    const response = await result.response;

    const toolCalls = [];
    const toolResults = [];

    // Extract steps safely
    if (response?.steps && Array.isArray(response.steps)) {
      for (const step of response.steps) {
        if (step.toolCalls?.length) {
          for (const toolCall of step.toolCalls) {
            toolCalls.push(toolCall);
            if (onToolCall) onToolCall(toolCall);
          }
        }

        if (step.toolResults?.length) {
          toolResults.push(...step.toolResults);
        }
      }
    }

    return {
      content: finalText,
      usage,
      toolCalls,
      toolResults,
      steps: response?.steps || [],
    };

  } catch (error) {
    console.error(chalk.red("AI Service Error:"), error.message);
    throw error;
  }
}

    /**
     * get a non streaming response
     * @param {Array} messages - array of msg objs
     * @param {Object} tools - optional tools
     * @returns {Promise<string} - response text
     */

    async getMessage(messages, tools = undefined){
        let fullResponse = "";
        const result = await this.sendMessage(messages, (chunk)=>{
            fullResponse += chunk
        }, tools);

        return result.content;
    }


    /**
 * generate structured output using a zod schema
 * @param {Object} schema  -zod schema
 * @param {string} prompt - prompt for generation
 * @param {Promise<Object>} - parsed object matching the schema
 */

  async generateStructured(schema, prompt){
    try{
      const result = await generateText({
        model:this.model,
        schema:schema,
        prompt:prompt
      })

      return result.object;
    }
    catch(error){
      console.error(chalk.red("AI Structured Generation Error:"), error.message);
      throw error;
    }
  }
}


