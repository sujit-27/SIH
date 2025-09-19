<<<<<<< HEAD
const HF_API_KEY = import.meta.env.VITE_HF_API_KEY; 
=======
// src/lib/huggingfaceService.js
const HF_API_KEY = import.meta.env.VITE_HF_API_KEY;
>>>>>>> cd27e79f15a5b8eb00c023484bd314c6ccde3bb9

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

<<<<<<< HEAD
export async function generateRoadmapFromSummary(summary) {
  console.log("User summary:", summary);
  
=======
/**
 * Robust generator that accepts backend responses in different shapes:
 * - { stages: [...] }
 * - { generated_text: " { \"stages\": [...] } " }
 * - plain text containing JSON
 */
export async function generateRoadmapFromSummary(summary) {
  console.log("User summary:", summary);

>>>>>>> cd27e79f15a5b8eb00c023484bd314c6ccde3bb9
  try {
    const response = await fetch("http://localhost:8080/api/roadmap", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
<<<<<<< HEAD
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
=======
      body: JSON.stringify({
        prompt: `You are a career advisor AI.
Create a detailed visual career roadmap for: ${summary}.
Return ONLY a valid JSON object with this shape:
{ "stages": [ { "id":"string", "title":"string", "steps":["string"], "next":["string"], "importance":"high|medium|low", "difficulty":"easy|medium|hard" } ] }`,
>>>>>>> cd27e79f15a5b8eb00c023484bd314c6ccde3bb9
      }),
    });

    if (!response.ok) {
      throw new Error(`Backend API error: ${response.status}`);
    }

    const data = await response.json();
<<<<<<< HEAD
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

=======
    console.log("Backend raw response:", data);

    // Case A: backend returned already-parsed stages object
    if (data && Array.isArray(data.stages)) {
      return normalizeRoadmap(data);
    }

    // Case B: backend returned an object with generated_text (LLM wrapper)
    let rawText = data?.generated_text ?? data?.output ?? JSON.stringify(data);

    // If backend returned as an array with a single item containing text
    if (!rawText && Array.isArray(data) && data.length > 0) {
      rawText = data[0].generated_text ?? data[0].output ?? JSON.stringify(data[0]);
    }

    // Clean and parse
    const cleaned = cleanJsonText(String(rawText || ""));
    try {
      const parsed = JSON.parse(cleaned);
      if (parsed && Array.isArray(parsed.stages)) {
        return normalizeRoadmap(parsed);
      } else {
        console.error("Parsed JSON doesn't contain stages array:", parsed);
        return fallbackRoadmap(summary);
      }
    } catch (err) {
      console.error("JSON parse error after cleaning:", err, "cleaned:", cleaned);
      return fallbackRoadmap(summary);
    }
>>>>>>> cd27e79f15a5b8eb00c023484bd314c6ccde3bb9
  } catch (error) {
    console.error("Error fetching roadmap from backend:", error);
    return fallbackRoadmap(summary);
  }
}

function cleanJsonText(text) {
  if (!text) return "{}";
<<<<<<< HEAD
  text = text.replace(/```(json)?/g, "").trim();
  const jsonStart = text.indexOf("{");
  const jsonEnd = text.lastIndexOf("}") + 1;
  if (jsonStart === -1 || jsonEnd === -1) return "{}";
  return text.substring(jsonStart, jsonEnd);
=======
  // remove triple backticks and language markers
  text = text.replace(/```(json|js|txt)?/gi, "").trim();
  // find first { and last }
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) {
    // try to fix common issues: newlines, markdown bullets etc
    // attempt to extract substring between first "[" and last "]"
    const s2 = text.indexOf("[");
    const e2 = text.lastIndexOf("]");
    if (s2 !== -1 && e2 !== -1) return text.substring(s2, e2 + 1);
    return "{}";
  }
  return text.substring(start, end + 1);
}

function normalizeRoadmap(raw) {
  const stages = raw.stages.map((s, idx) => {
    const id = s.id !== undefined && s.id !== null ? String(s.id) : `stage-${idx}`;
    const title = s.title || `Stage ${idx + 1}`;
    const steps = Array.isArray(s.steps) ? s.steps.map(String) : [];
    const next = Array.isArray(s.next) ? s.next.map(String) : [];
    const importance = (s.importance || "medium").toLowerCase();
    const difficulty = (s.difficulty || "medium").toLowerCase();
    return { id, title, steps, next, importance, difficulty };
  });

  // Ensure no duplicate ids; if duplicates, make them unique
  const seen = new Map();
  stages.forEach((st) => {
    if (seen.has(st.id)) {
      const newId = `${st.id}-${Math.random().toString(36).slice(2, 7)}`;
      st.id = newId;
    }
    seen.set(st.id, true);
  });

  return { summary: raw.summary || null, stages };
>>>>>>> cd27e79f15a5b8eb00c023484bd314c6ccde3bb9
}

function fallbackRoadmap(summary) {
  return {
    summary,
    stages: [
      {
        id: "beginner",
        title: "Beginner Level",
<<<<<<< HEAD
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
=======
        steps: ["Learn programming fundamentals", "Understand basic concepts", "Practice with small projects"],
        next: ["intermediate"],
        importance: "high",
        difficulty: "easy",
      },
      {
        id: "intermediate",
        title: "Intermediate Level",
        steps: ["Learn frameworks", "Build projects", "Work with APIs & DBs"],
        next: ["advanced"],
        importance: "high",
        difficulty: "medium",
>>>>>>> cd27e79f15a5b8eb00c023484bd314c6ccde3bb9
      },
      {
        id: "advanced",
        title: "Advanced Level",
<<<<<<< HEAD
        steps: ["Master advanced concepts", "Build production applications", "Learn system design"],
        next: [],
        importance: "high", 
        difficulty: "hard"
      }
    ],
  };
}
=======
        steps: ["System design", "Production deployments", "Performance & testing"],
        next: [],
        importance: "high",
        difficulty: "hard",
      },
    ],
  };
}
>>>>>>> cd27e79f15a5b8eb00c023484bd314c6ccde3bb9
