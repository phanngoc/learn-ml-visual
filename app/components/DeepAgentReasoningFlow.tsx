'use client';

import React, { useState } from 'react';
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  BackgroundVariant,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';

const DeepAgentReasoningFlow = () => {
  const initialNodes: Node[] = [
    {
      id: 'user-task',
      type: 'input',
      data: { label: '👤 User Task\n"Research movie trends vs Spotify data"' },
      position: { x: 250, y: 0 },
      style: {
        background: '#3b82f6',
        color: 'white',
        border: '2px solid #2563eb',
        borderRadius: '12px',
        padding: '15px',
        fontSize: '13px',
        fontWeight: 'bold',
        textAlign: 'center',
        width: '220px'
      },
    },
    {
      id: 'reasoning-1',
      data: { label: '🧠 Thought #1\n"Need movie data first"' },
      position: { x: 250, y: 120 },
      style: {
        background: '#ddd6fe',
        border: '2px solid #8b5cf6',
        borderRadius: '10px',
        padding: '12px',
        fontSize: '12px',
        textAlign: 'center',
        width: '220px'
      },
    },
    {
      id: 'tool-search-1',
      data: { label: '🔍 Tool Search\n"Search for: movie database API"' },
      position: { x: 50, y: 220 },
      style: {
        background: '#fef3c7',
        border: '2px solid #f59e0b',
        borderRadius: '10px',
        padding: '12px',
        fontSize: '11px',
        textAlign: 'center',
        width: '200px'
      },
    },
    {
      id: 'tool-call-1',
      data: { label: '🛠️ Tool Call\nTMDB API → Get trending movies' },
      position: { x: 50, y: 320 },
      style: {
        background: '#fed7aa',
        border: '2px solid #ea580c',
        borderRadius: '10px',
        padding: '12px',
        fontSize: '11px',
        textAlign: 'center',
        width: '200px'
      },
    },
    {
      id: 'reasoning-2',
      data: { label: '🧠 Thought #2\n"Got movies, need music data"' },
      position: { x: 450, y: 220 },
      style: {
        background: '#ddd6fe',
        border: '2px solid #8b5cf6',
        borderRadius: '10px',
        padding: '12px',
        fontSize: '12px',
        textAlign: 'center',
        width: '220px'
      },
    },
    {
      id: 'tool-search-2',
      data: { label: '🔍 Tool Search\n"Search for: spotify API"' },
      position: { x: 450, y: 320 },
      style: {
        background: '#fef3c7',
        border: '2px solid #f59e0b',
        borderRadius: '10px',
        padding: '12px',
        fontSize: '11px',
        textAlign: 'center',
        width: '200px'
      },
    },
    {
      id: 'memory-check',
      data: { label: '⚠️ Context Getting Full!\nTrigger Memory Folding' },
      position: { x: 250, y: 420 },
      style: {
        background: '#fecaca',
        border: '3px solid #ef4444',
        borderRadius: '10px',
        padding: '12px',
        fontSize: '11px',
        fontWeight: 'bold',
        textAlign: 'center',
        width: '220px'
      },
    },
    {
      id: 'memory-fold',
      data: {
        label: '🗂️ Memory Folding\n📚 Episodic: [movie search]\n💼 Working: [analyzing trends]\n🛠️ Tool: [TMDB, Spotify]'
      },
      position: { x: 200, y: 540 },
      style: {
        background: '#c7d2fe',
        border: '2px solid #6366f1',
        borderRadius: '12px',
        padding: '15px',
        fontSize: '10px',
        textAlign: 'left',
        width: '300px',
        lineHeight: '1.5'
      },
    },
    {
      id: 'reasoning-3',
      data: { label: '🧠 Thought #3\n"Ready to compare and summarize"' },
      position: { x: 250, y: 680 },
      style: {
        background: '#ddd6fe',
        border: '2px solid #8b5cf6',
        borderRadius: '10px',
        padding: '12px',
        fontSize: '12px',
        textAlign: 'center',
        width: '220px'
      },
    },
    {
      id: 'output',
      type: 'output',
      data: {
        label: '✅ Task Complete\nInsights: Movie soundtracks correlate\nwith Spotify trending genres'
      },
      position: { x: 220, y: 800 },
      style: {
        background: '#10b981',
        color: 'white',
        border: '2px solid #059669',
        borderRadius: '12px',
        padding: '15px',
        fontSize: '12px',
        fontWeight: 'bold',
        textAlign: 'center',
        width: '280px',
        lineHeight: '1.5'
      },
    },
  ];

  const initialEdges: Edge[] = [
    {
      id: 'e1',
      source: 'user-task',
      target: 'reasoning-1',
      animated: true,
      style: { stroke: '#3b82f6', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#3b82f6' }
    },
    {
      id: 'e2',
      source: 'reasoning-1',
      target: 'tool-search-1',
      animated: true,
      label: 'needs tool',
      style: { stroke: '#8b5cf6', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#8b5cf6' }
    },
    {
      id: 'e3',
      source: 'tool-search-1',
      target: 'tool-call-1',
      animated: true,
      style: { stroke: '#f59e0b', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#f59e0b' }
    },
    {
      id: 'e4',
      source: 'tool-call-1',
      target: 'reasoning-2',
      animated: true,
      label: 'result',
      style: { stroke: '#8b5cf6', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#8b5cf6' }
    },
    {
      id: 'e5',
      source: 'reasoning-2',
      target: 'tool-search-2',
      animated: true,
      style: { stroke: '#8b5cf6', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#8b5cf6' }
    },
    {
      id: 'e6',
      source: 'tool-search-2',
      target: 'memory-check',
      animated: true,
      style: { stroke: '#f59e0b', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#f59e0b' }
    },
    {
      id: 'e7',
      source: 'memory-check',
      target: 'memory-fold',
      animated: true,
      label: 'fold!',
      style: { stroke: '#ef4444', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#ef4444' }
    },
    {
      id: 'e8',
      source: 'memory-fold',
      target: 'reasoning-3',
      animated: true,
      label: 'refreshed',
      style: { stroke: '#6366f1', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#6366f1' }
    },
    {
      id: 'e9',
      source: 'reasoning-3',
      target: 'output',
      animated: true,
      style: { stroke: '#10b981', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#10b981' }
    },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="my-8 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-4">
        <h3 className="text-xl font-bold">DeepAgent Reasoning Flow</h3>
        <p className="text-sm mt-1 opacity-90">Interactive visualization of autonomous reasoning with tool discovery</p>
      </div>
      <div className="bg-white dark:bg-gray-900 p-4" style={{ height: '900px' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          attributionPosition="bottom-left"
        >
          <Controls />
          <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
        </ReactFlow>
      </div>
      <div className="bg-gray-50 dark:bg-gray-800 p-4 text-sm text-gray-600 dark:text-gray-400">
        <p className="font-semibold mb-2">🎯 Key Features Demonstrated:</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Autonomous Tool Discovery:</strong> Agent searches for needed APIs dynamically</li>
          <li><strong>Continuous Reasoning:</strong> Seamless thought → action → thought flow</li>
          <li><strong>Memory Folding:</strong> Automatic compression when context gets full</li>
          <li><strong>Adaptive Planning:</strong> Adjusts strategy based on intermediate results</li>
        </ul>
      </div>
    </div>
  );
};

export default DeepAgentReasoningFlow;
