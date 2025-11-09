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

const TraditionalAgentFlow = () => {
  const nodes: Node[] = [
    {
      id: 'task',
      type: 'input',
      data: { label: '📋 Task' },
      position: { x: 250, y: 0 },
      style: {
        background: '#ef4444',
        color: 'white',
        border: '2px solid #dc2626',
        borderRadius: '10px',
        padding: '12px',
        fontSize: '13px',
        fontWeight: 'bold',
        width: '140px',
        textAlign: 'center'
      },
    },
    {
      id: 'tools',
      data: { label: '🧰 Fixed Toolbox\n✓ Tool A\n✓ Tool B\n✓ Tool C' },
      position: { x: 220, y: 100 },
      style: {
        background: '#fca5a5',
        border: '2px solid #ef4444',
        borderRadius: '10px',
        padding: '12px',
        fontSize: '11px',
        width: '200px',
        textAlign: 'left',
        lineHeight: '1.6'
      },
    },
    {
      id: 'plan',
      data: { label: '📝 Plan' },
      position: { x: 90, y: 240 },
      style: {
        background: '#fed7aa',
        border: '2px solid #f97316',
        borderRadius: '8px',
        padding: '10px',
        fontSize: '12px',
        width: '100px',
        textAlign: 'center'
      },
    },
    {
      id: 'act',
      data: { label: '⚡ Act' },
      position: { x: 250, y: 240 },
      style: {
        background: '#fed7aa',
        border: '2px solid #f97316',
        borderRadius: '8px',
        padding: '10px',
        fontSize: '12px',
        width: '100px',
        textAlign: 'center'
      },
    },
    {
      id: 'observe',
      data: { label: '👁️ Observe' },
      position: { x: 410, y: 240 },
      style: {
        background: '#fed7aa',
        border: '2px solid #f97316',
        borderRadius: '8px',
        padding: '10px',
        fontSize: '12px',
        width: '100px',
        textAlign: 'center'
      },
    },
    {
      id: 'stuck',
      type: 'output',
      data: { label: '❌ Stuck!\n"Need new tool\nbut can&apos;t find it"' },
      position: { x: 220, y: 360 },
      style: {
        background: '#dc2626',
        color: 'white',
        border: '2px solid #991b1b',
        borderRadius: '10px',
        padding: '12px',
        fontSize: '12px',
        fontWeight: 'bold',
        width: '200px',
        textAlign: 'center',
        lineHeight: '1.5'
      },
    },
  ];

  const edges: Edge[] = [
    { id: 'e1', source: 'task', target: 'tools', animated: true, style: { stroke: '#ef4444', strokeWidth: 2 } },
    { id: 'e2', source: 'tools', target: 'plan', animated: true, style: { stroke: '#f97316', strokeWidth: 2 } },
    { id: 'e3', source: 'plan', target: 'act', animated: true, style: { stroke: '#f97316', strokeWidth: 2 }, label: 'loop' },
    { id: 'e4', source: 'act', target: 'observe', animated: true, style: { stroke: '#f97316', strokeWidth: 2 } },
    { id: 'e5', source: 'observe', target: 'plan', animated: true, style: { stroke: '#f97316', strokeWidth: 2, strokeDasharray: '5,5' } },
    { id: 'e6', source: 'observe', target: 'stuck', animated: true, style: { stroke: '#dc2626', strokeWidth: 2 }, label: 'if tool missing' },
  ];

  const [nodesState, setNodes, onNodesChange] = useNodesState(nodes);
  const [edgesState, setEdges, onEdgesChange] = useEdgesState(edges);

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <ReactFlow
        nodes={nodesState}
        edges={edgesState}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        attributionPosition="bottom-left"
      >
        <Controls />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

const DeepAgentFlow = () => {
  const nodes: Node[] = [
    {
      id: 'task',
      type: 'input',
      data: { label: '📋 Task' },
      position: { x: 250, y: 0 },
      style: {
        background: '#10b981',
        color: 'white',
        border: '2px solid #059669',
        borderRadius: '10px',
        padding: '12px',
        fontSize: '13px',
        fontWeight: 'bold',
        width: '140px',
        textAlign: 'center'
      },
    },
    {
      id: 'think',
      data: { label: '🧠 Think' },
      position: { x: 250, y: 100 },
      style: {
        background: '#a7f3d0',
        border: '2px solid #10b981',
        borderRadius: '10px',
        padding: '12px',
        fontSize: '12px',
        width: '140px',
        textAlign: 'center',
        fontWeight: 'bold'
      },
    },
    {
      id: 'search',
      data: { label: '🔍 Search Tools\n(Dynamic Discovery)' },
      position: { x: 80, y: 200 },
      style: {
        background: '#d1fae5',
        border: '2px solid #10b981',
        borderRadius: '8px',
        padding: '10px',
        fontSize: '11px',
        width: '160px',
        textAlign: 'center'
      },
    },
    {
      id: 'tool-db',
      data: { label: '🗄️ Tool Database\n16K+ APIs' },
      position: { x: 80, y: 300 },
      style: {
        background: '#fef3c7',
        border: '2px solid #f59e0b',
        borderRadius: '8px',
        padding: '10px',
        fontSize: '11px',
        width: '160px',
        textAlign: 'center'
      },
    },
    {
      id: 'act',
      data: { label: '⚡ Act with Tool' },
      position: { x: 320, y: 200 },
      style: {
        background: '#d1fae5',
        border: '2px solid #10b981',
        borderRadius: '8px',
        padding: '10px',
        fontSize: '11px',
        width: '140px',
        textAlign: 'center'
      },
    },
    {
      id: 'memory',
      data: { label: '🗂️ Fold Memory\n(if needed)' },
      position: { x: 480, y: 200 },
      style: {
        background: '#ddd6fe',
        border: '2px solid #8b5cf6',
        borderRadius: '8px',
        padding: '10px',
        fontSize: '11px',
        width: '140px',
        textAlign: 'center'
      },
    },
    {
      id: 'adapt',
      data: { label: '🔄 Adapt & Continue' },
      position: { x: 235, y: 320 },
      style: {
        background: '#a7f3d0',
        border: '2px solid #10b981',
        borderRadius: '8px',
        padding: '10px',
        fontSize: '11px',
        width: '170px',
        textAlign: 'center'
      },
    },
    {
      id: 'success',
      type: 'output',
      data: { label: '✅ Success!\n"Found & used\nright tools"' },
      position: { x: 220, y: 440 },
      style: {
        background: '#059669',
        color: 'white',
        border: '2px solid #047857',
        borderRadius: '10px',
        padding: '12px',
        fontSize: '12px',
        fontWeight: 'bold',
        width: '200px',
        textAlign: 'center',
        lineHeight: '1.5'
      },
    },
  ];

  const edges: Edge[] = [
    { id: 'e1', source: 'task', target: 'think', animated: true, style: { stroke: '#10b981', strokeWidth: 2 } },
    { id: 'e2', source: 'think', target: 'search', animated: true, style: { stroke: '#10b981', strokeWidth: 2 }, label: 'if needs tool' },
    { id: 'e3', source: 'search', target: 'tool-db', animated: true, style: { stroke: '#f59e0b', strokeWidth: 2 } },
    { id: 'e4', source: 'tool-db', target: 'act', animated: true, style: { stroke: '#10b981', strokeWidth: 2 }, label: 'found!' },
    { id: 'e5', source: 'think', target: 'act', animated: true, style: { stroke: '#10b981', strokeWidth: 2, strokeDasharray: '5,5' }, label: 'or use existing' },
    { id: 'e6', source: 'act', target: 'memory', animated: true, style: { stroke: '#8b5cf6', strokeWidth: 2 } },
    { id: 'e7', source: 'memory', target: 'adapt', animated: true, style: { stroke: '#10b981', strokeWidth: 2 } },
    { id: 'e8', source: 'adapt', target: 'think', animated: true, style: { stroke: '#10b981', strokeWidth: 2, strokeDasharray: '5,5' }, label: 'continuous' },
    { id: 'e9', source: 'adapt', target: 'success', animated: true, style: { stroke: '#059669', strokeWidth: 2 }, label: 'when complete' },
  ];

  const [nodesState, setNodes, onNodesChange] = useNodesState(nodes);
  const [edgesState, setEdges, onEdgesChange] = useEdgesState(edges);

  return (
    <div style={{ height: '550px', width: '100%' }}>
      <ReactFlow
        nodes={nodesState}
        edges={edgesState}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        attributionPosition="bottom-left"
      >
        <Controls />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default function TraditionalVsDeepAgent() {
  const [activeTab, setActiveTab] = useState<'traditional' | 'deepagent'>('traditional');

  return (
    <div className="my-8 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('traditional')}
          className={`flex-1 px-6 py-4 font-semibold transition-colors ${
            activeTab === 'traditional'
              ? 'bg-red-500 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          ❌ Traditional Agent (Fixed Tools)
        </button>
        <button
          onClick={() => setActiveTab('deepagent')}
          className={`flex-1 px-6 py-4 font-semibold transition-colors ${
            activeTab === 'deepagent'
              ? 'bg-green-500 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          ✅ DeepAgent (Adaptive Discovery)
        </button>
      </div>
      <div className="bg-white dark:bg-gray-900 p-4">
        {activeTab === 'traditional' ? <TraditionalAgentFlow /> : <DeepAgentFlow />}
      </div>
      <div className="bg-gray-50 dark:bg-gray-800 p-4 text-sm">
        {activeTab === 'traditional' ? (
          <div className="text-red-700 dark:text-red-400">
            <p className="font-semibold mb-2">🔴 Traditional Agent Limitations:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Predefined toolbox - can&apos;t discover new tools</li>
              <li>Rigid plan → act → observe loop</li>
              <li>Gets stuck when needed tool isn&apos;t available</li>
              <li>No memory management - context overflow</li>
            </ul>
          </div>
        ) : (
          <div className="text-green-700 dark:text-green-400">
            <p className="font-semibold mb-2">🟢 DeepAgent Advantages:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Dynamic tool discovery from 16K+ API database</li>
              <li>Continuous reasoning with adaptive planning</li>
              <li>Autonomous memory folding when context gets full</li>
              <li>Learns tool-use patterns through ToolPO training</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
