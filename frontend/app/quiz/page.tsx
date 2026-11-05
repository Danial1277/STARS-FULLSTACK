"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CONSTELLATIONS, Constellation } from "@/data/constellations";
import { useUser } from "@/context/UserContext";

interface Question {
  constellation: Constellation;
  options: string[]; // names of 4 constellations
  correctAnswer: string;
}

export default function QuizPage() {
  const { saveQuizScore } = useUser();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Generate 5 random questions from the constellations
  const startNewQuiz = () => {
    const shuffled = [...CONSTELLATIONS].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 5);

    const generatedQuestions: Question[] = selected.map((target) => {
      // 3 random distractors
      const distractors = CONSTELLATIONS.filter((c) => c.id !== target.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map((c) => c.name);

      const options = [...distractors, target.name].sort(() => 0.5 - Math.random());

      return {
        constellation: target,
        options,
        correctAnswer: target.name,
      };
    });

    setQuestions(generatedQuestions);
    setCurrentIndex(0);
    setScore(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setQuizFinished(false);
    setShowHint(false);
  };

  useEffect(() => {
    startNewQuiz();
  }, []);

  const handleSelectOption = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);

    const isCorrect = option === questions[currentIndex].correctAnswer;
    if (isCorrect) {
      setScore((s) => s + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setShowHint(false);
    } else {
      setQuizFinished(true);
      saveQuizScore(score, questions.length);
    }
  };

  if (questions.length === 0) {
    return <div className="text-white text-center py-20">Загрузка викторины...</div>;
  }

  const currentQ = questions[currentIndex];

  return (
    <div className="relative min-h-screen py-12 px-4 sm:px-6 max-w-3xl mx-auto text-white">
      <div className="text-center mb-8">
        <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
          Интерактивный тест
        </span>
        <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight">
          Космическая викторина
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-zinc-400">
          Угадайте созвездие по его звёздной схеме и линиям соединения!
        </p>
      </div>

      {!quizFinished ? (
        <div className="rounded-3xl border border-indigo-900/50 bg-zinc-950/80 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          {/* Progress bar */}
          <div className="mb-6 flex items-center justify-between text-xs text-zinc-400">
            <span>
              Вопрос <strong className="text-white">{currentIndex + 1}</strong> из {questions.length}
            </span>
            <span>
              Счёт: <strong className="text-cyan-400">{score}</strong>
            </span>
          </div>
          <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-indigo-600 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Mystery Constellation SVG Box (no labels) */}
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-black border border-indigo-950/80 shadow-inner">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.1),transparent_70%)]" />

            <svg viewBox="0 0 100 100" className="w-full h-full select-none">
              {/* Lines */}
              {currentQ.constellation.lines.map(([idxA, idxB], i) => (
                <line
                  key={i}
                  x1={currentQ.constellation.stars[idxA]?.x}
                  y1={currentQ.constellation.stars[idxA]?.y}
                  x2={currentQ.constellation.stars[idxB]?.x}
                  y2={currentQ.constellation.stars[idxB]?.y}
                  stroke="#38bdf8"
                  strokeWidth="1"
                  strokeOpacity="0.8"
                />
              ))}

              {/* Stars (without names!) */}
              {currentQ.constellation.stars.map((star, i) => (
                <circle
                  key={i}
                  cx={star.x}
                  cy={star.y}
                  r={Math.max(1.8, 3.6 - star.brightness * 0.35)}
                  fill={star.color}
                  style={{
                    filter: `drop-shadow(0 0 3px ${star.color})`,
                  }}
                />
              ))}
            </svg>

            {/* Hint Button */}
            {!showHint ? (
              <button
                onClick={() => setShowHint(true)}
                className="absolute top-3 right-3 rounded-lg bg-indigo-950/80 border border-indigo-800/80 px-2.5 py-1 text-[11px] text-cyan-300 backdrop-blur-md hover:bg-indigo-900"
              >
                💡 Взять подсказку
              </button>
            ) : (
              <div className="absolute top-3 right-3 max-w-[200px] rounded-lg bg-black/90 border border-cyan-500/40 p-2 text-[10px] text-zinc-300 backdrop-blur-md">
                Подсказка: {currentQ.constellation.hemisphere} полушарие, видно в сезон: {currentQ.constellation.season}.
              </div>
            )}
          </div>

          {/* 4 Options */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQ.options.map((option, idx) => {
              let btnClass = "border-zinc-800 bg-zinc-900/60 text-white hover:border-indigo-600 hover:bg-zinc-850";

              if (isAnswered) {
                if (option === currentQ.correctAnswer) {
                  btnClass = "border-emerald-500 bg-emerald-950/60 text-emerald-200 font-bold";
                } else if (option === selectedOption) {
                  btnClass = "border-rose-500 bg-rose-950/60 text-rose-200 font-bold";
                } else {
                  btnClass = "opacity-40 border-zinc-900 bg-zinc-950 text-zinc-500";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(option)}
                  disabled={isAnswered}
                  className={`rounded-2xl border p-4 text-left text-sm transition-all ${btnClass}`}
                >
                  <span className="mr-2 text-xs font-mono text-zinc-400">
                    {String.fromCharCode(65 + idx)}.
                  </span>
                  {option}
                </button>
              );
            })}
          </div>

          {/* Feedback & Next Button */}
          {isAnswered && (
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-zinc-850 animate-in fade-in">
              <div className="text-xs">
                {selectedOption === currentQ.correctAnswer ? (
                  <span className="text-emerald-400 font-semibold">
                    ✓ Верно! Это {currentQ.correctAnswer}.
                  </span>
                ) : (
                  <span className="text-rose-400 font-semibold">
                    ✕ Неправильно. Это было созвездие {currentQ.correctAnswer}.
                  </span>
                )}
              </div>

              <button
                onClick={handleNextQuestion}
                className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-6 py-2.5 text-xs font-semibold text-white shadow-lg shadow-cyan-500/20 hover:brightness-110 transition-all"
              >
                {currentIndex + 1 < questions.length ? "Следующий вопрос →" : "Посмотреть результаты"}
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Finished Summary */
        <div className="text-center rounded-3xl border border-indigo-900/50 bg-zinc-950/80 p-8 sm:p-12 backdrop-blur-xl shadow-2xl">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-cyan-950 border border-cyan-500/50 text-4xl">
            🏆
          </div>

          <h2 className="mt-6 text-2xl sm:text-3xl font-black text-white">
            Викторина завершена!
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Ваш результат: <strong className="text-cyan-400 text-lg">{score}</strong> из {questions.length} правильных ответов ({Math.round((score / questions.length) * 100)}%)
          </p>

          <div className="mt-4 inline-block rounded-xl bg-indigo-950/60 border border-indigo-800/60 px-4 py-2 text-xs font-semibold text-indigo-300">
            {score === 5 ? "Магистр Звёздного Неба 🌟" : score >= 3 ? "Опытный Астроном 🔭" : "Начинающий Наблюдатель 🚀"}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={startNewQuiz}
              className="rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-6 py-3 text-xs font-semibold text-white shadow-lg shadow-cyan-500/20 hover:brightness-110"
            >
              Пройти ещё раз
            </button>
            <Link
              href="/encyclopedia"
              className="rounded-xl border border-zinc-800 bg-zinc-900 px-6 py-3 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-zinc-800"
            >
              Изучить созвездия
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
