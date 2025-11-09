'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Benefit {
  id: number;
  icon: string;
  title: string;
  description: string;
  metric?: string;
  color: string;
}

const benefits: Benefit[] = [
  {
    id: 1,
    icon: '💰',
    title: 'Massive Token Efficiency',
    description: 'Giảm từ 150,000 tokens xuống 2,000 tokens - tiết kiệm hơn 98% chi phí API. Bạn có thể xây dựng các agents phức tạp hơn mà không lo về giới hạn context.',
    metric: '98% reduction',
    color: 'from-green-400 to-emerald-600'
  },
  {
    id: 2,
    icon: '🔍',
    title: 'Progressive Tool Discovery',
    description: 'Agent có thể duyệt, tìm kiếm và đọc tài liệu về tools chỉ khi cần thiết. Không cần phải load toàn bộ catalog ngay từ đầu.',
    metric: 'On-demand loading',
    color: 'from-blue-400 to-cyan-600'
  },
  {
    id: 3,
    icon: '⚡',
    title: 'In-Environment Data Processing',
    description: 'Agent có thể filter, transform và aggregate data trong môi trường execution trước khi truyền về model. 10,000 dòng dữ liệu được lọc xuống 5 dòng relevant ngay trong code.',
    metric: 'Process locally',
    color: 'from-yellow-400 to-orange-600'
  },
  {
    id: 4,
    icon: '🎯',
    title: 'Better Control Flow',
    description: 'Viết code cho phép agent sử dụng loops, conditionals, và error handling với native code constructs. Giảm latency và token consumption đáng kể.',
    metric: 'Native constructs',
    color: 'from-purple-400 to-pink-600'
  },
  {
    id: 5,
    icon: '🔒',
    title: 'Privacy Advantages',
    description: 'Dữ liệu nhạy cảm có thể flow qua workflows mà không bao giờ vào context của model. Chỉ có kết quả cuối cùng được trả về.',
    metric: 'Secure by default',
    color: 'from-red-400 to-rose-600'
  },
  {
    id: 6,
    icon: '💾',
    title: 'State Persistence',
    description: 'Agent có thể lưu kết quả trung gian vào files và tiếp tục công việc sau này. Hỗ trợ long-running tasks span qua nhiều sessions.',
    metric: 'Resume anytime',
    color: 'from-indigo-400 to-blue-600'
  },
  {
    id: 7,
    icon: '🚀',
    title: 'Reusable Skills',
    description: 'Xây dựng thư viện các capabilities high-level theo thời gian. Các operations phức tạp trở thành single function calls. Agent ngày càng mạnh hơn.',
    metric: 'Build library',
    color: 'from-teal-400 to-green-600'
  }
];

export default function BenefitsComparison() {
  const [selectedBenefit, setSelectedBenefit] = useState<number | null>(null);

  return (
    <div className="my-12">
      <h3 className="text-2xl font-bold mb-6 text-center">
        🎯 7 Lợi Ích Chính của Code Execution với MCP
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {benefits.map((benefit) => (
          <motion.div
            key={benefit.id}
            layoutId={`benefit-${benefit.id}`}
            onClick={() => setSelectedBenefit(selectedBenefit === benefit.id ? null : benefit.id)}
            className={`cursor-pointer p-6 rounded-lg border-2 transition-all ${
              selectedBenefit === benefit.id
                ? 'border-blue-500 shadow-lg scale-105'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${benefit.color} text-white font-bold mb-3`}>
              {benefit.icon} #{benefit.id}
            </div>
            <h4 className="text-lg font-semibold mb-2">{benefit.title}</h4>
            {benefit.metric && (
              <div className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-xs font-semibold mb-3">
                {benefit.metric}
              </div>
            )}
            <AnimatePresence>
              {selectedBenefit === benefit.id && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-sm text-gray-600 dark:text-gray-400 mt-3"
                >
                  {benefit.description}
                </motion.p>
              )}
            </AnimatePresence>
            {selectedBenefit !== benefit.id && (
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                Click để xem chi tiết →
              </p>
            )}
          </motion.div>
        ))}
      </div>

      {/* Comparison Chart */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-lg p-6 border border-blue-200 dark:border-blue-900">
        <h4 className="text-xl font-bold mb-4 text-center">📊 So Sánh Trực Quan</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Traditional Approach */}
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md">
            <h5 className="font-bold text-red-600 dark:text-red-400 mb-3 flex items-center">
              <span className="text-2xl mr-2">❌</span>
              Traditional Tool Calling
            </h5>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="mr-2">📈</span>
                <span><strong>150,000 tokens</strong> cho workflow phức tạp</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">🐌</span>
                <span>Latency cao do nhiều round-trips</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">💸</span>
                <span>Chi phí API tăng nhanh theo scale</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">🚫</span>
                <span>Giới hạn số lượng tools có thể dùng</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">🔓</span>
                <span>Data nhạy cảm qua context</span>
              </li>
            </ul>
          </div>

          {/* Code Execution Approach */}
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md border-2 border-green-500">
            <h5 className="font-bold text-green-600 dark:text-green-400 mb-3 flex items-center">
              <span className="text-2xl mr-2">✅</span>
              Code Execution with MCP
            </h5>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="mr-2">📉</span>
                <span><strong>2,000 tokens</strong> - giảm 98.7%</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">⚡</span>
                <span>Latency thấp - xử lý local</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">💚</span>
                <span>Chi phí thấp hơn rất nhiều</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">🔧</span>
                <span>Không giới hạn tools</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">🔒</span>
                <span>Data được bảo vệ trong environment</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Impact Metrics */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-green-600">98.7%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Token Reduction</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-blue-600">75×</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Faster Execution</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-purple-600">∞</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Tools Supported</div>
          </div>
        </div>
      </div>
    </div>
  );
}

