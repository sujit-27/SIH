<<<<<<< HEAD
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
=======
// src/components/RoadmapVisualization.jsx
import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, { Background, Controls, MiniMap, useNodesState, useEdgesState } from "reactflow";
import dagre from "dagre";
import "reactflow/dist/style.css";
import RoadmapStage from "./RoadmapStage";
import Xarrow from "react-xarrows";

const nodeWidth = 400;
const nodeHeight = 320;

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (nodes, edges, direction = "TB") => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction, ranksep: 100, nodesep: 80 });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? "left" : "top";
    node.sourcePosition = isHorizontal ? "right" : "bottom";
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };
  });

  return { nodes, edges };
};

const RoadmapVisualization = ({ roadmap }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    if (!roadmap || !roadmap.stages) return;

    // Convert stages to nodes
    const stageNodes = roadmap.stages.map((stage, index) => ({
      id: stage.id,
      type: "roadmapNode",
      data: { stage, index, isLast: index === roadmap.stages.length - 1 },
      position: { x: 0, y: 0 },
      style: { width: nodeWidth },
    }));

    // Create edges for connections
    const stageEdges = [];
    roadmap.stages.forEach((stage) => {
      if (Array.isArray(stage.next)) {
        stage.next.forEach((nextId, i) => {
          stageEdges.push({
            id: `${stage.id}-${nextId}-${i}`,
            source: stage.id,
            target: nextId,
            type: "smoothstep",
            animated: true,
          });
        });
      }
    });

    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      stageNodes,
      stageEdges
    );

    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [roadmap]);

  const nodeTypes = {
    roadmapNode: ({ data }) => (
      <div id={data.stage.id}>
        <RoadmapStage stage={data.stage} index={data.index} isLast={data.isLast} />
      </div>
    ),
  };

  return (
    <div className="w-full h-[100vh]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        panOnScroll
        zoomOnScroll
      >
        <Background color="#aaa" gap={16} />
        <MiniMap nodeColor="#4f46e5" />
        <Controls />
      </ReactFlow>

      {/* Dynamic Xarrows for extra smooth arrows */}
      {nodes.map((node) =>
        edges
          .filter((e) => e.source === node.id)
          .map((edge) => (
            <Xarrow
              key={edge.id}
              start={edge.source}
              end={edge.target}
              color="#4f46e5"
              strokeWidth={3}
              headSize={6}
              curveness={0.3}
              animateDrawing
            />
          ))
      )}
    </div>
  );
};

export default RoadmapVisualization;
>>>>>>> cd27e79f15a5b8eb00c023484bd314c6ccde3bb9
