import React, { useMemo } from "react";
import ReactFlow, { Background, Controls, MiniMap } from "reactflow";
import { Xwrapper, Xarrow } from "react-xarrows";
import dagre from "dagre";
import "reactflow/dist/style.css";
import CustomRoadmapNode from "./CustomRoadmapNode";

const nodeWidth = 420;
const nodeHeight = 280;

const getLayoutedElements = (nodes, edges, direction = "TB") => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction, nodesep: 100, ranksep: 120 });
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });
  dagre.layout(dagreGraph);
  return nodes.map((node) => ({
    ...node,
    position: {
      x: dagreGraph.node(node.id).x - nodeWidth / 2,
      y: dagreGraph.node(node.id).y - nodeHeight / 2,
    },
    targetPosition: isHorizontal ? "left" : "top",
    sourcePosition: isHorizontal ? "right" : "bottom",
  }));
};

const nodeTypes = { custom: CustomRoadmapNode };

const RoadmapCanvas = ({ stages }) => {
  const nodes = useMemo(
    () =>
      stages.map((stage) => ({
        id: stage.id.toString(),
        type: "custom",
        data: stage,
        position: { x: 0, y: 0 },
        width: nodeWidth,
        height: nodeHeight,
      })),
    [stages]
  );

  const edges = useMemo(() => {
    const edgeList = [];
    stages.forEach((stage) => {
      if (Array.isArray(stage.next)) {
        stage.next.forEach((nextId, idx) => {
          edgeList.push({
            id: `${stage.id}->${nextId}-${idx}`,
            source: stage.id.toString(),
            target: nextId.toString(),
            animated: true,
            type: "smoothstep",
          });
        });
      }
    });
    return edgeList;
  }, [stages]);

  const layoutedNodes = getLayoutedElements(nodes, edges, "TB");

  return (
    <div className="w-full h-[90vh] relative">
      <ReactFlow
        nodes={layoutedNodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        panOnScroll
        zoomOnScroll
        nodesDraggable={false}
      >
        <Background gap={20} color="#C4B5FD" />
        <MiniMap nodeColor="#6B46C1" />
        <Controls />
      </ReactFlow>
      <Xwrapper>
        {stages.map((stage) =>
          stage.next?.map((nextId, i) => (
            <Xarrow
              key={`${stage.id}->${nextId}-${i}`}
              start={stage.id.toString()}
              end={nextId.toString()}
              color="#6B46C1"
              strokeWidth={3}
              headSize={8}
              path={stage.next?.length === 2 ? (i === 0 ? "left" : "right") : "smooth"}
              animateDrawing
              curveness={0.22}
              dashness={false}
            />
          ))
        )}
      </Xwrapper>
    </div>
  );
};

export default RoadmapCanvas;
