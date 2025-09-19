// src/components/RoadmapCanvas.jsx
import React from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import Xarrow from "react-xarrows";
import "reactflow/dist/style.css";

import CustomRoadmapNode from "./CustomRoadmapNode";

const nodeTypes = {
  custom: CustomRoadmapNode,
};

const RoadmapCanvas = ({ stages }) => {
  // Generate nodes for ReactFlow
  const nodes = stages.map((stage, index) => ({
    id: stage.id.toString(),
    type: "custom",
    position: { x: 0, y: index * 300 }, // dummy positioning (Dagre can improve this)
    data: stage,
  }));

  return (
    <div className="w-full h-[90vh] relative">
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        edges={[]} // no default edges, we use Xarrow
        fitView
        panOnScroll
        zoomOnScroll
        nodesDraggable={false}
      >
        <Background gap={20} />
        <Controls />
      </ReactFlow>

      {/* Draw Xarrows dynamically based on next IDs */}
      {stages.map((stage) =>
        stage.next?.map((nextId, i) => (
          <Xarrow
            key={`${stage.id}-to-${nextId}-${i}`}
            start={stage.id.toString()}
            end={nextId.toString()}
            showHead
            color="#6B46C1"
            strokeWidth={3}
            headSize={6}
            path="smooth"
            animateDrawing
          />
        ))
      )}
    </div>
  );
};

export default RoadmapCanvas;
