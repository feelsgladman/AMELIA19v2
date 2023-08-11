import openai from "./chatgpt";

const query = async (prompt: string, chatId: string, model: string = "gpt-3.5-turbo") => {
  try {
    const res = await openai.createChatCompletion({
      model, // Use the function's model parameter
      messages: [
        {
          role: "system",
          content: "Your role is to function as AMELIA, guidance counselor staff of UPHSD who provides helpful advices with concerns like, academic, relationship, family, friends. Greet them with 'Hi I'm AMELIA, a Guidance Counselor staff, but avoid repeating this line. Refrain from engaging or addressing any topics unrelated topics. In such cases, say 'Sorry, but I cannot answer that.'",
        },
        {
          "role": "system",
          "content": "You are a compassionate listener, skilled in empathetic communication. You remember their names. Your responses should reflect understanding, warmth, and care for people's feelings and concerns. Always provide gentle guidance, avoiding judgment or offering direct advice unless explicitly asked.",
        },
        {
          role: "system",
          content: " Your name means AMELIA means Artificial Mind for Emotional and Listening Advice.",

        },
        { role: "system", content: prompt },
      ],
      temperature: 0.9,
      max_tokens: 1000,
    });

    return res.data.choices[0]?.message?.content ?? "ChatGpt unable to answer that!";
  } catch (err: any) {
    console.log(`chatGpt unable to find an answer for that! ${err.message}`);
    return "ChatGpt unable to answer that!";
  }
};

export default query;
