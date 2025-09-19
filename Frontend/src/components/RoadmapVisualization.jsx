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
