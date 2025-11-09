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

type MemoryState = 'before' | 'folding' | 'after';

const MemoryFoldingVisualization = () => {
  const [memoryState, setMemoryState] = useState<MemoryState>('before');

  const getNodes = (): Node[] => {
    if (memoryState === 'before') {
      return [
        {
          id: 'context',
          type: 'input',
          data: { label: '🧠 Context Window (Crowded!)' },
          position: { x: 250, y: 0 },
          style: {
            background: '#fef3c7',
            border: '3px solid #f59e0b',
            borderRadius: '12px',
            padding: '15px',
            fontSize: '14px',
            fontWeight: 'bold',
            textAlign: 'center',
            width: '280px'
          },
        },
        {
          id: 'mem1',
          data: { label: '📝 "Searched TMDB for movies"' },
          position: { x: 50, y: 120 },
          style: {
            background: '#fecaca',
            border: '2px solid #ef4444',
            borderRadius: '8px',
            padding: '10px',
            fontSize: '11px',
            width: '180px'
          },
        },
        {
          id: 'mem2',
          data: { label: '📝 "Got 1000 movie records"' },
          position: { x: 250, y: 120 },
          style: {
            background: '#fecaca',
            border: '2px solid #ef4444',
            borderRadius: '8px',
            padding: '10px',
            fontSize: '11px',
            width: '180px'
          },
        },
        {
          id: 'mem3',
          data: { label: '📝 "Parsed JSON response"' },
          position: { x: 450, y: 120 },
          style: {
            background: '#fecaca',
            border: '2px solid #ef4444',
            borderRadius: '8px',
            padding: '10px',
            fontSize: '11px',
            width: '180px'
          },
        },
        {
          id: 'mem4',
          data: { label: '📝 "Filtered by genre"' },
          position: { x: 50, y: 220 },
          style: {
            background: '#fecaca',
            border: '2px solid #ef4444',
            borderRadius: '8px',
            padding: '10px',
            fontSize: '11px',
            width: '180px'
          },
        },
        {
          id: 'mem5',
          data: { label: '📝 "Searched Spotify API"' },
          position: { x: 250, y: 220 },
          style: {
            background: '#fecaca',
            border: '2px solid #ef4444',
            borderRadius: '8px',
            padding: '10px',
            fontSize: '11px',
            width: '180px'
          },
        },
        {
          id: 'mem6',
          data: { label: '📝 "Got music trends data"' },
          position: { x: 450, y: 220 },
          style: {
            background: '#fecaca',
            border: '2px solid #ef4444',
            borderRadius: '8px',
            padding: '10px',
            fontSize: '11px',
            width: '180px'
          },
        },
        {
          id: 'warning',
          type: 'output',
          data: { label: '⚠️ Context 95% Full!\nTrigger Memory Folding' },
          position: { x: 235, y: 340 },
          style: {
            background: '#dc2626',
            color: 'white',
            border: '3px solid #991b1b',
            borderRadius: '10px',
            padding: '15px',
            fontSize: '13px',
            fontWeight: 'bold',
            textAlign: 'center',
            width: '250px'
          },
        },
      ];
    } else if (memoryState === 'folding') {
      return [
        {
          id: 'process',
          type: 'input',
          data: { label: '🔄 Folding Process Active' },
          position: { x: 250, y: 50 },
          style: {
            background: '#c7d2fe',
            border: '3px solid #6366f1',
            borderRadius: '12px',
            padding: '15px',
            fontSize: '14px',
            fontWeight: 'bold',
            textAlign: 'center',
            width: '280px'
          },
        },
        {
          id: 'analyze',
          data: { label: '🔍 Analyzing Memories...' },
          position: { x: 250, y: 160 },
          style: {
            background: '#ddd6fe',
            border: '2px solid #8b5cf6',
            borderRadius: '10px',
            padding: '12px',
            fontSize: '12px',
            textAlign: 'center',
            width: '280px'
          },
        },
        {
          id: 'episodic',
          data: { label: '📚 Extracting Episodic\n(what happened)' },
          position: { x: 50, y: 280 },
          style: {
            background: '#fed7aa',
            border: '2px solid #f97316',
            borderRadius: '8px',
            padding: '10px',
            fontSize: '11px',
            textAlign: 'center',
            width: '150px'
          },
        },
        {
          id: 'working',
          data: { label: '💼 Extracting Working\n(current goal)' },
          position: { x: 250, y: 280 },
          style: {
            background: '#fef3c7',
            border: '2px solid #eab308',
            borderRadius: '8px',
            padding: '10px',
            fontSize: '11px',
            textAlign: 'center',
            width: '150px'
          },
        },
        {
          id: 'tool',
          data: { label: '🛠️ Extracting Tool\n(what worked)' },
          position: { x: 450, y: 280 },
          style: {
            background: '#a7f3d0',
            border: '2px solid #10b981',
            borderRadius: '8px',
            padding: '10px',
            fontSize: '11px',
            textAlign: 'center',
            width: '150px'
          },
        },
        {
          id: 'compress',
          type: 'output',
          data: { label: '📦 Compressing & Organizing...' },
          position: { x: 220, y: 400 },
          style: {
            background: '#6366f1',
            color: 'white',
            border: '2px solid #4f46e5',
            borderRadius: '10px',
            padding: '12px',
            fontSize: '12px',
            fontWeight: 'bold',
            textAlign: 'center',
            width: '280px'
          },
        },
      ];
    } else {
      return [
        {
          id: 'context',
          type: 'input',
          data: { label: '🧠 Context Window (Organized!)' },
          position: { x: 250, y: 0 },
          style: {
            background: '#d1fae5',
            border: '3px solid #10b981',
            borderRadius: '12px',
            padding: '15px',
            fontSize: '14px',
            fontWeight: 'bold',
            textAlign: 'center',
            width: '280px'
          },
        },
        {
          id: 'episodic-mem',
          data: {
            label: '📚 Episodic Memory\n• Searched movies & music\n• Got data from APIs\n• Filtered results'
          },
          position: { x: 50, y: 120 },
          style: {
            background: '#fed7aa',
            border: '2px solid #f97316',
            borderRadius: '10px',
            padding: '12px',
            fontSize: '10px',
            width: '180px',
            textAlign: 'left',
            lineHeight: '1.5'
          },
        },
        {
          id: 'working-mem',
          data: {
            label: '💼 Working Memory\nGoal: Compare trends\nStatus: In progress\nNext: Analyze'
          },
          position: { x: 250, y: 120 },
          style: {
            background: '#fef3c7',
            border: '2px solid #eab308',
            borderRadius: '10px',
            padding: '12px',
            fontSize: '10px',
            width: '180px',
            textAlign: 'left',
            lineHeight: '1.5'
          },
        },
        {
          id: 'tool-mem',
          data: {
            label: '🛠️ Tool Memory\n✅ TMDB: 98% success\n✅ Spotify: 95% success\n📊 Usage: 2 calls each'
          },
          position: { x: 450, y: 120 },
          style: {
            background: '#a7f3d0',
            border: '2px solid #10b981',
            borderRadius: '10px',
            padding: '12px',
            fontSize: '10px',
            width: '180px',
            textAlign: 'left',
            lineHeight: '1.5'
          },
        },
        {
          id: 'ready',
          type: 'output',
          data: { label: '✅ Context 45% Used\nReady for More Reasoning!' },
          position: { x: 220, y: 280 },
          style: {
            background: '#059669',
            color: 'white',
            border: '3px solid #047857',
            borderRadius: '10px',
            padding: '15px',
            fontSize: '13px',
            fontWeight: 'bold',
            textAlign: 'center',
            width: '280px'
          },
        },
      ];
    }
  };

  const getEdges = (): Edge[] => {
    if (memoryState === 'before') {
      return [
        { id: 'e1', source: 'context', target: 'mem1', style: { stroke: '#f59e0b', strokeWidth: 2 } },
        { id: 'e2', source: 'context', target: 'mem2', style: { stroke: '#f59e0b', strokeWidth: 2 } },
        { id: 'e3', source: 'context', target: 'mem3', style: { stroke: '#f59e0b', strokeWidth: 2 } },
        { id: 'e4', source: 'context', target: 'mem4', style: { stroke: '#f59e0b', strokeWidth: 2 } },
        { id: 'e5', source: 'context', target: 'mem5', style: { stroke: '#f59e0b', strokeWidth: 2 } },
        { id: 'e6', source: 'context', target: 'mem6', style: { stroke: '#f59e0b', strokeWidth: 2 } },
        { id: 'e7', source: 'mem1', target: 'warning', style: { stroke: '#ef4444', strokeWidth: 2 } },
        { id: 'e8', source: 'mem6', target: 'warning', style: { stroke: '#ef4444', strokeWidth: 2 } },
      ];
    } else if (memoryState === 'folding') {
      return [
        { id: 'e1', source: 'process', target: 'analyze', animated: true, style: { stroke: '#6366f1', strokeWidth: 2 } },
        { id: 'e2', source: 'analyze', target: 'episodic', animated: true, style: { stroke: '#f97316', strokeWidth: 2 } },
        { id: 'e3', source: 'analyze', target: 'working', animated: true, style: { stroke: '#eab308', strokeWidth: 2 } },
        { id: 'e4', source: 'analyze', target: 'tool', animated: true, style: { stroke: '#10b981', strokeWidth: 2 } },
        { id: 'e5', source: 'episodic', target: 'compress', animated: true, style: { stroke: '#6366f1', strokeWidth: 2 } },
        { id: 'e6', source: 'working', target: 'compress', animated: true, style: { stroke: '#6366f1', strokeWidth: 2 } },
        { id: 'e7', source: 'tool', target: 'compress', animated: true, style: { stroke: '#6366f1', strokeWidth: 2 } },
      ];
    } else {
      return [
        { id: 'e1', source: 'context', target: 'episodic-mem', style: { stroke: '#10b981', strokeWidth: 2 } },
        { id: 'e2', source: 'context', target: 'working-mem', style: { stroke: '#10b981', strokeWidth: 2 } },
        { id: 'e3', source: 'context', target: 'tool-mem', style: { stroke: '#10b981', strokeWidth: 2 } },
        { id: 'e4', source: 'episodic-mem', target: 'ready', style: { stroke: '#059669', strokeWidth: 2 } },
        { id: 'e5', source: 'working-mem', target: 'ready', style: { stroke: '#059669', strokeWidth: 2 } },
        { id: 'e6', source: 'tool-mem', target: 'ready', style: { stroke: '#059669', strokeWidth: 2 } },
      ];
    }
  };

  const [nodes, setNodes, onNodesChange] = useNodesState(getNodes());
  const [edges, setEdges, onEdgesChange] = useEdgesState(getEdges());

  React.useEffect(() => {
    setNodes(getNodes());
    setEdges(getEdges());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memoryState]);

  return (
    <div className="my-8 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-4">
        <h3 className="text-xl font-bold">Autonomous Memory Folding Process</h3>
        <p className="text-sm mt-1 opacity-90">Watch how DeepAgent organizes its memory when context gets full</p>
      </div>

      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setMemoryState('before')}
          className={`flex-1 px-6 py-3 font-semibold transition-colors ${
            memoryState === 'before'
              ? 'bg-yellow-500 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          1️⃣ Before Folding
        </button>
        <button
          onClick={() => setMemoryState('folding')}
          className={`flex-1 px-6 py-3 font-semibold transition-colors ${
            memoryState === 'folding'
              ? 'bg-indigo-500 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          2️⃣ Folding Process
        </button>
        <button
          onClick={() => setMemoryState('after')}
          className={`flex-1 px-6 py-3 font-semibold transition-colors ${
            memoryState === 'after'
              ? 'bg-green-500 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          3️⃣ After Folding
        </button>
      </div>

      <div className="bg-white dark:bg-gray-900 p-4" style={{ height: '500px' }}>
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
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="font-semibold mb-1">📚 Episodic Memory</p>
            <p className="text-xs">What happened - past actions and results</p>
          </div>
          <div>
            <p className="font-semibold mb-1">💼 Working Memory</p>
            <p className="text-xs">Current goal and active task status</p>
          </div>
          <div>
            <p className="font-semibold mb-1">🛠️ Tool Memory</p>
            <p className="text-xs">Tool performance and usage patterns</p>
          </div>
        </div>
        <p className="mt-3 text-xs italic">
          💡 Memory folding compresses context usage by 50-70% while preserving essential information
        </p>
      </div>
    </div>
  );
};

export default MemoryFoldingVisualization;
