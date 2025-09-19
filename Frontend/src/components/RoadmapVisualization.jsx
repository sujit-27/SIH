import React, { useMemo } from "react";
import dagre from "dagre";
import Xarrow from "react-xarrows";

export default function RoadmapVisualization({ roadmap }) {
  const defaultStages = [
    { id: "beginner", title: "Foundation", steps: ["Java basics", "HTML/CSS/JS"], next: ["intermediate"] },
    { id: "intermediate", title: "Frameworks", steps: ["Spring Boot", "React"], next: ["advanced"] },
    { id: "advanced", title: "Professional", steps: ["Microservices", "Cloud", "DevOps"], next: [] },
  ];

  const stages = useMemo(() => {
    if (!roadmap || !Array.isArray(roadmap.stages)) return defaultStages;
    return roadmap.stages;
  }, [roadmap]);

  const nodes = useMemo(() => {
    const g = new dagre.graphlib.Graph();
    g.setGraph({ rankdir: "TB" });
    g.setDefaultEdgeLabel(() => ({}));

    stages.forEach(stage => g.setNode(stage.id, { width: 220, height: 100 }));
    stages.forEach(stage => stage.next?.forEach(nextId => g.setEdge(stage.id, nextId)));

    dagre.layout(g);

    return stages.map(stage => {
      const node = g.node(stage.id);
      return { ...stage, x: node.x - node.width / 2, y: node.y - node.height / 2 };
    });
  }, [stages]);

  if (!nodes.length) return <div className="text-center text-gray-500">No roadmap data found.</div>;

  return (
    <div className="relative w-full h-[700px] bg-gray-50 border rounded-lg overflow-auto">
      {nodes.map(node => (
        <div
          key={node.id}
          id={node.id}
          className="absolute bg-white border shadow-md p-3 rounded-xl w-56"
          style={{ left: node.x, top: node.y }}
        >
          <h3 className="font-bold text-lg">{node.title}</h3>
          <ul className="list-disc pl-5 text-sm text-gray-700">
            {node.steps?.map((step, i) => <li key={i}>{step}</li>)}
          </ul>
        </div>
      ))}

      {nodes.map(node =>
        node.next?.map(nextId => <Xarrow key={`${node.id}-${nextId}`} start={node.id} end={nextId} color="blue" strokeWidth={2} />)
      )}
    </div>
  );
}
