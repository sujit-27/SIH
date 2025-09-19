const HF_API_KEY = import.meta.env.VITE_HF_API_KEY; 

async function callHuggingFace(model, inputs, params = {}) {
  const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${HF_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs, parameters: params }),
  });
  if (!response.ok) throw new Error(`HF API error: ${response.status}`);
  return response.json();
}

export async function summarizeUserInput(text) {
  try {
    const result = await callHuggingFace("facebook/bart-large-cnn", text);
    return result[0]?.summary_text || text;
  } catch (error) {
    console.error("Error summarizing text:", error);
    return text;
  }
}

export async function generateRoadmapFromSummary(summary) {
  console.log("User summary:", summary);
  
  try {
    const response = await fetch("http://localhost:8080/api/roadmap", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        prompt: `You are a career advisor AI.
          Create a detailed **visual career roadmap** for: ${summary}.

          The roadmap should be structured like a mindmap/flowchart where:
          - Each stage is a "node" with a unique id and a title.
          - Each node has a list of steps (bullet-point style).
          - Each node specifies which nodes come next in a "next" array (so we can connect them visually).
          - The roadmap must be **hierarchical** and allow branching paths (like frontend/backend/etc.).
          - The final format must be a valid JSON with this structure only:

          {
            "stages": [
              {
                "id": "string",
                "title": "string",
                "steps": ["string"],
                "next": ["string"],
                "importance": "high|medium|low",
                "difficulty": "easy|medium|hard"
              }
            ]
          }

          Follow this strictly — do not include any text outside the JSON.
          Keep the titles short (like "Frontend Basics", "Backend APIs", "Databases").
          Keep the steps short and actionable (like "Learn React components", "Practice CRUD APIs").
          Make sure the "next" field correctly connects nodes to show a clear learning path.
        ` 
      }),
    });

    if (!response.ok) {
      throw new Error(`Backend API error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Backend response:", data);

    if (!data.success || !data.generated_text) {
      console.error("Backend returned unsuccessful response");
      return fallbackRoadmap(summary);
    }

    let generatedText = data.generated_text;
    generatedText = cleanJsonText(generatedText);
    
    try {
      const roadmap = JSON.parse(generatedText);
      
      if (!roadmap.stages || !Array.isArray(roadmap.stages)) {
        console.error("Invalid roadmap structure - no stages array");
        return fallbackRoadmap(summary);
      }

      roadmap.summary = summary;
      return roadmap;
      
    } catch (parseError) {
      console.error("Error parsing roadmap JSON:", parseError);
      return fallbackRoadmap(summary);
    }

  } catch (error) {
    console.error("Error fetching roadmap from backend:", error);
    return fallbackRoadmap(summary);
  }
}

function cleanJsonText(text) {
  if (!text) return "{}";
  text = text.replace(/```(json)?/g, "").trim();
  const jsonStart = text.indexOf("{");
  const jsonEnd = text.lastIndexOf("}") + 1;
  if (jsonStart === -1 || jsonEnd === -1) return "{}";
  return text.substring(jsonStart, jsonEnd);
}

function fallbackRoadmap(summary) {
  return {
    summary,
    stages: [
      {
        id: "beginner",
        title: "Beginner Level",
        steps: ["Learn programming fundamentals", "Understand basic concepts", "Practice with simple projects"],
        next: ["intermediate"],
        importance: "high",
        difficulty: "easy"
      },
      {
        id: "intermediate",
        title: "Intermediate Level", 
        steps: ["Learn frameworks and libraries", "Build complex projects", "Work with databases and APIs"],
        next: ["advanced"],
        importance: "high",
        difficulty: "medium"
      },
      {
        id: "advanced",
        title: "Advanced Level",
        steps: ["Master advanced concepts", "Build production applications", "Learn system design"],
        next: [],
        importance: "high", 
        difficulty: "hard"
      }
    ],
  };
}