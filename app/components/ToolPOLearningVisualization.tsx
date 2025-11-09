'use client';

import React, { useState, useEffect } from 'react';
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

const ToolPOLearningVisualization = () => {
  const [iteration, setIteration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const getIterationData = () => {
    const rewards = [0.3, 0.5, 0.7, 0.85, 0.92];
    const reward = rewards[Math.min(iteration, 4)];
    const successRate = Math.round(reward * 100);

    return { reward, successRate };
  };

  const { reward, successRate } = getIterationData();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && iteration < 4) {
      interval = setInterval(() => {
        setIteration(prev => Math.min(prev + 1, 4));
      }, 2000);
    } else if (iteration >= 4) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, iteration]);

  const nodes: Node[] = [
    {
      id: 'policy',
      type: 'input',
      data: { label: '🧠 Policy Model\n(DeepAgent Brain)' },
      position: { x: 250, y: 0 },
      style: {
        background: '#ddd6fe',
        border: '3px solid #8b5cf6',
        borderRadius: '12px',
        padding: '15px',
        fontSize: '13px',
        fontWeight: 'bold',
        textAlign: 'center',
        width: '200px'
      },
    },
    {
      id: 'task-input',
      data: { label: '📋 Training Task\n"Search product reviews"' },
      position: { x: 50, y: 120 },
      style: {
        background: '#e0e7ff',
        border: '2px solid #6366f1',
        borderRadius: '10px',
        padding: '12px',
        fontSize: '11px',
        textAlign: 'center',
        width: '180px'
      },
    },
    {
      id: 'decision',
      data: { label: `🎯 Decision Making\nIteration: ${iteration + 1}/5` },
      position: { x: 240, y: 120 },
      style: {
        background: '#fed7aa',
        border: '2px solid #f97316',
        borderRadius: '10px',
        padding: '12px',
        fontSize: '11px',
        textAlign: 'center',
        width: '180px'
      },
    },
    {
      id: 'tool-simulator',
      data: { label: '🔧 Tool Simulator\n(16K Simulated APIs)' },
      position: { x: 450, y: 120 },
      style: {
        background: '#fef3c7',
        border: '2px solid #eab308',
        borderRadius: '10px',
        padding: '12px',
        fontSize: '11px',
        textAlign: 'center',
        width: '180px'
      },
    },
    {
      id: 'tool-choice',
      data: { label: iteration < 2 ? '❌ Wrong Tool\n"weather.api"' : '✅ Right Tool\n"reviews.api"' },
      position: { x: 450, y: 240 },
      style: {
        background: iteration < 2 ? '#fecaca' : '#d1fae5',
        border: iteration < 2 ? '2px solid #ef4444' : '2px solid #10b981',
        borderRadius: '10px',
        padding: '12px',
        fontSize: '11px',
        textAlign: 'center',
        width: '180px'
      },
    },
    {
      id: 'execution',
      data: { label: '⚡ Execute Action\nCall simulated API' },
      position: { x: 240, y: 240 },
      style: {
        background: '#c7d2fe',
        border: '2px solid #6366f1',
        borderRadius: '10px',
        padding: '12px',
        fontSize: '11px',
        textAlign: 'center',
        width: '180px'
      },
    },
    {
      id: 'task-reward',
      data: { label: `📊 Task Success\n${successRate}% complete` },
      position: { x: 50, y: 360 },
      style: {
        background: '#d1fae5',
        border: '2px solid #10b981',
        borderRadius: '10px',
        padding: '12px',
        fontSize: '11px',
        textAlign: 'center',
        width: '160px'
      },
    },
    {
      id: 'tool-reward',
      data: { label: iteration < 2 ? '❌ Tool Penalty\n-0.5 reward' : '✅ Tool Bonus\n+0.3 reward' },
      position: { x: 240, y: 360 },
      style: {
        background: iteration < 2 ? '#fed7aa' : '#d1fae5',
        border: iteration < 2 ? '2px solid #f97316' : '2px solid #10b981',
        borderRadius: '10px',
        padding: '12px',
        fontSize: '11px',
        textAlign: 'center',
        width: '160px'
      },
    },
    {
      id: 'total-reward',
      data: { label: `💰 Total Reward\n${reward.toFixed(2)}` },
      position: { x: 450, y: 360 },
      style: {
        background: '#fef3c7',
        border: '2px solid #eab308',
        borderRadius: '10px',
        padding: '12px',
        fontSize: '11px',
        fontWeight: 'bold',
        textAlign: 'center',
        width: '160px'
      },
    },
    {
      id: 'update',
      type: 'output',
      data: { label: '🔄 Update Policy\nLearn from experience' },
      position: { x: 230, y: 480 },
      style: {
        background: '#8b5cf6',
        color: 'white',
        border: '2px solid #7c3aed',
        borderRadius: '12px',
        padding: '15px',
        fontSize: '12px',
        fontWeight: 'bold',
        textAlign: 'center',
        width: '200px'
      },
    },
  ];

  const edges: Edge[] = [
    {
      id: 'e1',
      source: 'policy',
      target: 'decision',
      animated: true,
      style: { stroke: '#8b5cf6', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#8b5cf6' }
    },
    {
      id: 'e2',
      source: 'task-input',
      target: 'decision',
      animated: true,
      style: { stroke: '#6366f1', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#6366f1' }
    },
    {
      id: 'e3',
      source: 'decision',
      target: 'tool-simulator',
      animated: true,
      label: 'search',
      style: { stroke: '#f97316', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#f97316' }
    },
    {
      id: 'e4',
      source: 'tool-simulator',
      target: 'tool-choice',
      animated: true,
      style: { stroke: '#eab308', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#eab308' }
    },
    {
      id: 'e5',
      source: 'tool-choice',
      target: 'execution',
      animated: true,
      style: { stroke: '#6366f1', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#6366f1' }
    },
    {
      id: 'e6',
      source: 'execution',
      target: 'task-reward',
      animated: true,
      style: { stroke: '#10b981', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#10b981' }
    },
    {
      id: 'e7',
      source: 'execution',
      target: 'tool-reward',
      animated: true,
      style: { stroke: iteration < 2 ? '#f97316' : '#10b981', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: iteration < 2 ? '#f97316' : '#10b981' }
    },
    {
      id: 'e8',
      source: 'task-reward',
      target: 'total-reward',
      animated: true,
      style: { stroke: '#eab308', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#eab308' }
    },
    {
      id: 'e9',
      source: 'tool-reward',
      target: 'total-reward',
      animated: true,
      style: { stroke: '#eab308', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#eab308' }
    },
    {
      id: 'e10',
      source: 'total-reward',
      target: 'update',
      animated: true,
      style: { stroke: '#8b5cf6', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#8b5cf6' }
    },
    {
      id: 'e11',
      source: 'update',
      target: 'policy',
      animated: true,
      label: 'feedback',
      style: { stroke: '#8b5cf6', strokeWidth: 3, strokeDasharray: '5,5' },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#8b5cf6' }
    },
  ];

  const [nodesState, setNodes, onNodesChange] = useNodesState(nodes);
  const [edgesState, setEdges, onEdgesChange] = useEdgesState(edges);

  useEffect(() => {
    setNodes(nodes);
    setEdges(edges);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iteration]);

  return (
    <div className="my-8 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-4">
        <h3 className="text-xl font-bold">ToolPO: Reinforcement Learning Process</h3>
        <p className="text-sm mt-1 opacity-90">How DeepAgent learns tool-use through simulated training</p>
      </div>

      <div className="bg-gray-100 dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <div className="flex gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
            >
              {isPlaying ? '⏸️ Pause' : '▶️ Play'}
            </button>
            <button
              onClick={() => setIteration(prev => Math.min(prev + 1, 4))}
              disabled={iteration >= 4}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ⏭️ Next Iteration
            </button>
            <button
              onClick={() => { setIteration(0); setIsPlaying(false); }}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
            >
              🔄 Reset
            </button>
          </div>
          <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Training Progress: {successRate}%
          </div>
        </div>

        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-purple-500 to-indigo-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${successRate}%` }}
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 p-4" style={{ height: '600px' }}>
        <ReactFlow
          nodes={nodesState}
          edges={edgesState}
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
        <p className="font-semibold mb-2">🎓 ToolPO Learning Mechanics:</p>
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div>
            <p className="font-medium text-purple-600 dark:text-purple-400">Reward = Task Success + Tool Accuracy</p>
            <ul className="list-disc list-inside space-y-1 mt-1 text-xs">
              <li>Task completion: +{reward.toFixed(1)} reward</li>
              <li>Correct tool selection: +0.3 bonus</li>
              <li>Wrong tool: -0.5 penalty</li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-indigo-600 dark:text-indigo-400">Training Environment</p>
            <ul className="list-disc list-inside space-y-1 mt-1 text-xs">
              <li>16,000+ simulated tool APIs</li>
              <li>Safe sandbox - no real API calls</li>
              <li>Fast iteration - thousands per hour</li>
            </ul>
          </div>
        </div>
        <p className="text-xs italic">
          💡 Through repeated trials, DeepAgent develops an instinct for tool selection - learning not just what works, but why it works
        </p>
      </div>
    </div>
  );
};

export default ToolPOLearningVisualization;
