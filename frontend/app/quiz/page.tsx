"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CONSTELLATIONS, Constellation } from "@/data/constellations";
import { useUser } from "@/context/UserContext";

interface Question {
  constellation: Constellation;
  options: string[];
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

  const startNewQuiz = () => {
    const shuffled = [...CONSTELLATIONS].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 5);

    const generatedQuestions: Question[] = selected.map((target) => {
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
    return <div className="text-slate-400 text-center py-20 text-sm">Формирование тестовых вопросов...</div>;
  }

  const currentQ = questions[currentIndex];

  return (
    <div className="relative min-h-screen py-10 px-4 sm:px-6 max-w-3xl mx-auto text-slate-100">
      <div className="text-center mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Практический тест
        </span>
        <h1 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Определение созвездия по контуру
        </h1>
        <p className="mt-1.5 text-xs sm:text-sm text-slate-400">
          Выберите правильное название созвездия по его расположению звёзд и соединительным линиям:
        </p>
      </div>

      {!quizFinished ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-7 backdrop-blur-xl">
          {/* Progress bar */}
          <div className="mb-4 flex items-center justify-between text-xs text-slate-400">
            <span>
              Вопрос {currentIndex + 1} из {questions.length}
            </span>
            <span>
              Правильных ответов: <strong className="text-white font-mono">{score}</strong>
            </span>
          </div>
          <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full bg-slate-300 transition-all duration-300 rounded-full"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Mystery Constellation SVG Box */}
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-[#080c16] border border-slate-800">
            <svg viewBox="0 0 100 100" className="w-full h-full select-none">
              {currentQ.constellation.lines.map(([idxA, idxB], i) => (
                <line
                  key={i}
                  x1={currentQ.constellation.stars[idxA]?.x}
                  y1={currentQ.constellation.stars[idxA]?.y}
                  x2={currentQ.constellation.stars[idxB]?.x}
                  y2={currentQ.constellation.stars[idxB]?.y}
                  stroke="#64748b"
                  strokeWidth="0.8"
                  strokeOpacity="0.85"
                />
              ))}

              {currentQ.constellation.stars.map((star, i) => (
                <circle
                  key={i}
                  cx={star.x}
                  cy={star.y}
                  r={Math.max(1.8, 3.6 - star.brightness * 0.35)}
                  fill={star.color}
                />
              ))}
            </svg>

            {/* Hint Button */}
            {!showHint ? (
              <button
                onClick={() => setShowHint(true)}
                className="absolute top-3 right-3 rounded-md bg-slate-900/90 border border-slate-700 px-2.5 py-1 text-xs text-slate-300 hover:text-white transition-colors"
              >
                Подсказка
              </button>
            ) : (
              <div className="absolute top-3 right-3 max-w-[220px] rounded-lg bg-slate-900/95 border border-slate-700 p-2 text-[11px] text-slate-300 shadow">
                Полушарие: {currentQ.constellation.hemisphere}, сезон: {currentQ.constellation.season}.
              </div>
            )}
          </div>

          {/* 4 Options */}
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQ.options.map((option, idx) => {
              let btnClass = "border-slate-800 bg-slate-850/60 text-slate-200 hover:border-slate-600 hover:bg-slate-800";

              if (isAnswered) {
                if (option === currentQ.correctAnswer) {
                  btnClass = "border-emerald-600/80 bg-emerald-950/40 text-emerald-200 font-semibold";
                } else if (option === selectedOption) {
                  btnClass = "border-rose-600/80 bg-rose-950/40 text-rose-200 font-semibold";
                } else {
                  btnClass = "opacity-35 border-slate-900 bg-slate-950 text-slate-500";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(option)}
                  disabled={isAnswered}
                  className={`rounded-xl border p-3.5 text-left text-xs sm:text-sm font-medium transition-colors ${btnClass}`}
                >
                  <span className="mr-2 text-xs font-mono text-slate-400">
                    {String.fromCharCode(65 + idx)}.
                  </span>
                  {option}
                </button>
              );
            })}
          </div>

          {/* Feedback & Next Button */}
          {isAnswered && (
            <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800 animate-in fade-in">
              <div className="text-xs">
                {selectedOption === currentQ.correctAnswer ? (
                  <span className="text-emerald-300 font-medium">
                    Верно. Это созвездие {currentQ.correctAnswer}.
                  </span>
                ) : (
                  <span className="text-rose-300 font-medium">
                    Неверно. Правильный ответ: {currentQ.correctAnswer}.
                  </span>
                )}
              </div>

              <button
                onClick={handleNextQuestion}
                className="w-full sm:w-auto rounded-lg bg-slate-100 hover:bg-white px-4 py-2 text-xs font-semibold text-slate-900 transition-colors"
              >
                {currentIndex + 1 < questions.length ? "Следующий вопрос →" : "Итоги теста"}
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Finished Summary */
        <div className="text-center rounded-2xl border border-slate-800 bg-slate-900/60 p-8 sm:p-10 backdrop-blur-xl">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Тестирование завершено
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Результат: <strong className="text-white font-mono">{score}</strong> из {questions.length} ({Math.round((score / questions.length) * 100)}%)
          </p>

          <div className="mt-3 inline-block rounded-md bg-slate-800 border border-slate-700 px-3 py-1 text-xs text-slate-300 font-mono">
            {score === 5 ? "Отличный уровень знания неба" : score >= 3 ? "Хороший уровень ориентации" : "Базовый уровень"}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={startNewQuiz}
              className="rounded-lg bg-slate-100 hover:bg-white px-4 py-2 text-xs font-semibold text-slate-900 transition-colors"
            >
              Пройти повторно
            </button>
            <Link
              href="/encyclopedia"
              className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-medium text-slate-200 hover:text-white hover:bg-slate-750 transition-colors"
            >
              Изучить созвездия
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
