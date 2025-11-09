'use client';

import React, { useCallback, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  BackgroundVariant,
} from 'reactflow';
import 'reactflow/dist/style.css';

const TraditionalWorkflow = () => {
  const initialNodes: Node[] = [
    {
      id: '1',
      type: 'input',
      data: { label: '🤖 AI Agent' },
      position: { x: 250, y: 0 },
      style: { 
        background: '#ef4444', 
        color: 'white', 
        border: '2px solid #dc2626',
        borderRadius: '10px',
        padding: '10px',
        fontSize: '14px',
        fontWeight: 'bold'
      },
    },
    {
      id: '2',
      data: { label: '📚 Load ALL Tool Definitions\n(Thousands of tokens)' },
      position: { x: 200, y: 100 },
      style: { 
        background: '#fca5a5', 
        border: '2px solid #ef4444',
        borderRadius: '10px',
        padding: '15px',
        fontSize: '12px',
        textAlign: 'center'
      },
    },
    {
      id: '3',
      data: { label: '🔍 Search Salesforce\n(Tool Call 1)' },
      position: { x: 50, y: 200 },
      style: { 
        background: '#fed7aa', 
        border: '2px solid #f97316',
        borderRadius: '10px',
        padding: '10px'
      },
    },
    {
      id: '4',
      data: { label: '📊 1000 records\n(~50,000 tokens)' },
      position: { x: 50, y: 300 },
      style: { 
        background: '#fef3c7', 
        border: '2px solid #eab308',
        borderRadius: '10px',
        padding: '10px',
        fontSize: '11px'
      },
    },
    {
      id: '5',
      data: { label: '🔽 Filter Records\n(Tool Call 2)' },
      position: { x: 250, y: 200 },
      style: { 
        background: '#fed7aa', 
        border: '2px solid #f97316',
        borderRadius: '10px',
        padding: '10px'
      },
    },
    {
      id: '6',
      data: { label: '📊 Filtered data\n(~20,000 tokens)' },
      position: { x: 250, y: 300 },
      style: { 
        background: '#fef3c7', 
        border: '2px solid #eab308',
        borderRadius: '10px',
        padding: '10px',
        fontSize: '11px'
      },
    },
    {
      id: '7',
      data: { label: '📝 Create Summary\n(Tool Call 3)' },
      position: { x: 450, y: 200 },
      style: { 
        background: '#fed7aa', 
        border: '2px solid #f97316',
        borderRadius: '10px',
        padding: '10px'
      },
    },
    {
      id: '8',
      data: { label: '✅ Summary\n(~10,000 tokens)' },
      position: { x: 450, y: 300 },
      style: { 
        background: '#fef3c7', 
        border: '2px solid #eab308',
        borderRadius: '10px',
        padding: '10px',
        fontSize: '11px'
      },
    },
    {
      id: '9',
      type: 'output',
      data: { label: '💰 Total: ~150,000 tokens' },
      position: { x: 220, y: 400 },
      style: { 
        background: '#ef4444', 
        color: 'white',
        border: '2px solid #dc2626',
        borderRadius: '10px',
        padding: '10px',
        fontSize: '14px',
        fontWeight: 'bold'
      },
    },
  ];

  const initialEdges: Edge[] = [
    { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#ef4444', strokeWidth: 2 } },
    { id: 'e2-3', source: '2', target: '3', animated: true },
    { id: 'e3-4', source: '3', target: '4', animated: true },
    { id: 'e2-5', source: '2', target: '5', animated: true },
    { id: 'e5-6', source: '5', target: '6', animated: true },
    { id: 'e2-7', source: '2', target: '7', animated: true },
    { id: 'e7-8', source: '7', target: '8', animated: true },
    { id: 'e4-9', source: '4', target: '9' },
    { id: 'e6-9', source: '6', target: '9' },
    { id: 'e8-9', source: '8', target: '9' },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <Controls />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

const CodeExecutionWorkflow = () => {
  const initialNodes: Node[] = [
    {
      id: '1',
      type: 'input',
      data: { label: '🤖 AI Agent' },
      position: { x: 250, y: 0 },
      style: { 
        background: '#10b981', 
        color: 'white', 
        border: '2px solid #059669',
        borderRadius: '10px',
        padding: '10px',
        fontSize: '14px',
        fontWeight: 'bold'
      },
    },
    {
      id: '2',
      data: { label: '💻 Write Code' },
      position: { x: 250, y: 100 },
      style: { 
        background: '#6ee7b7', 
        border: '2px solid #10b981',
        borderRadius: '10px',
        padding: '15px',
        fontSize: '13px',
        fontWeight: 'bold'
      },
    },
    {
      id: '3',
      data: { label: '🔧 Execution Environment' },
      position: { x: 200, y: 180 },
      style: { 
        background: '#d1fae5', 
        border: '3px dashed #10b981',
        borderRadius: '15px',
        padding: '20px',
        width: '400px',
        height: '200px',
        fontSize: '12px',
        fontWeight: 'bold'
      },
    },
    {
      id: '4',
      data: { label: 'Import salesforce module' },
      position: { x: 220, y: 220 },
      style: { 
        background: '#a7f3d0', 
        border: '1px solid #10b981',
        borderRadius: '8px',
        padding: '8px',
        fontSize: '11px'
      },
    },
    {
      id: '5',
      data: { label: '🔍 Search (1000 records)' },
      position: { x: 220, y: 270 },
      style: { 
        background: '#a7f3d0', 
        border: '1px solid #10b981',
        borderRadius: '8px',
        padding: '8px',
        fontSize: '11px'
      },
    },
    {
      id: '6',
      data: { label: '🔽 Filter (in code)' },
      position: { x: 220, y: 320 },
      style: { 
        background: '#a7f3d0', 
        border: '1px solid #10b981',
        borderRadius: '8px',
        padding: '8px',
        fontSize: '11px'
      },
    },
    {
      id: '7',
      data: { label: '📝 Summarize (in code)' },
      position: { x: 420, y: 270 },
      style: { 
        background: '#a7f3d0', 
        border: '1px solid #10b981',
        borderRadius: '8px',
        padding: '8px',
        fontSize: '11px'
      },
    },
    {
      id: '8',
      type: 'output',
      data: { label: '✅ Return Summary\n(~100 tokens)' },
      position: { x: 250, y: 420 },
      style: { 
        background: '#6ee7b7', 
        border: '2px solid #10b981',
        borderRadius: '10px',
        padding: '10px',
        fontSize: '12px',
        textAlign: 'center'
      },
    },
    {
      id: '9',
      type: 'output',
      data: { label: '💚 Total: ~2,000 tokens\n(98.7% reduction!)' },
      position: { x: 210, y: 500 },
      style: { 
        background: '#10b981', 
        color: 'white',
        border: '2px solid #059669',
        borderRadius: '10px',
        padding: '10px',
        fontSize: '14px',
        fontWeight: 'bold',
        textAlign: 'center'
      },
    },
  ];

  const initialEdges: Edge[] = [
    { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#10b981', strokeWidth: 2 } },
    { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: '#10b981', strokeWidth: 2 } },
    { id: 'e4-5', source: '4', target: '5', animated: true },
    { id: 'e5-6', source: '5', target: '6', animated: true },
    { id: 'e5-7', source: '5', target: '7', animated: true },
    { id: 'e6-7', source: '6', target: '7', animated: true },
    { id: 'e3-8', source: '3', target: '8', animated: true, style: { stroke: '#10b981', strokeWidth: 2 } },
    { id: 'e8-9', source: '8', target: '9', animated: true, style: { stroke: '#10b981', strokeWidth: 3 } },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div style={{ width: '100%', height: '600px' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <Controls />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default function MCPWorkflowDiagram() {
  const [activeTab, setActiveTab] = useState<'traditional' | 'code-execution'>('traditional');

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
          ❌ Traditional Tool Calling (150,000 tokens)
        </button>
        <button
          onClick={() => setActiveTab('code-execution')}
          className={`flex-1 px-6 py-4 font-semibold transition-colors ${
            activeTab === 'code-execution'
              ? 'bg-green-500 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          ✅ Code Execution with MCP (2,000 tokens)
        </button>
      </div>
      <div className="bg-white dark:bg-gray-900 p-4">
        {activeTab === 'traditional' ? <TraditionalWorkflow /> : <CodeExecutionWorkflow />}
      </div>
      <div className="bg-gray-50 dark:bg-gray-800 p-4 text-sm text-gray-600 dark:text-gray-400">
        <p className="font-semibold mb-2">💡 Tương tác với diagram:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Kéo thả các nodes để sắp xếp lại</li>
          <li>Zoom in/out bằng scroll hoặc nút điều khiển</li>
          <li>Chuyển đổi giữa 2 workflows để so sánh</li>
        </ul>
      </div>
    </div>
  );
}

