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
    return <div className="text-slate-300 text-center py-20 font-medium">Готовим вопросы звёздного неба... 🚀</div>;
  }

  const currentQ = questions[currentIndex];

  return (
    <div className="relative min-h-screen py-12 px-4 sm:px-6 max-w-3xl mx-auto text-slate-100">
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/10 px-3.5 py-1 text-xs font-semibold text-amber-300 border border-amber-400/30">
          <span>🏆</span> Интерактивная викторина
        </span>
        <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Угадай созвездие
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-300">
          Посмотрите на схему звёзд и выберите, какое созвездие перед вами:
        </p>
      </div>

      {!quizFinished ? (
        <div className="rounded-3xl border border-slate-700/50 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl">
          {/* Progress bar */}
          <div className="mb-5 flex items-center justify-between text-xs text-slate-300">
            <span>
              Вопрос <strong className="text-white font-bold">{currentIndex + 1}</strong> из {questions.length}
            </span>
            <span className="flex items-center gap-1">
              Баллы: <strong className="text-amber-300 font-bold">{score}</strong> 🌟
            </span>
          </div>
          <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full bg-gradient-to-r from-amber-400 via-sky-400 to-indigo-500 transition-all duration-300 rounded-full"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Mystery Constellation SVG Box */}
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-slate-950/90 border border-slate-800 shadow-inner">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.12),transparent_70%)]" />

            <svg viewBox="0 0 100 100" className="w-full h-full select-none">
              {currentQ.constellation.lines.map(([idxA, idxB], i) => (
                <line
                  key={i}
                  x1={currentQ.constellation.stars[idxA]?.x}
                  y1={currentQ.constellation.stars[idxA]?.y}
                  x2={currentQ.constellation.stars[idxB]?.x}
                  y2={currentQ.constellation.stars[idxB]?.y}
                  stroke="#7dd3fc"
                  strokeWidth="0.9"
                  strokeOpacity="0.85"
                />
              ))}

              {currentQ.constellation.stars.map((star, i) => (
                <circle
                  key={i}
                  cx={star.x}
                  cy={star.y}
                  r={Math.max(2.0, 3.8 - star.brightness * 0.35)}
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
                className="absolute top-3.5 right-3.5 rounded-xl bg-slate-900/80 border border-slate-700/60 px-3 py-1.5 text-xs font-semibold text-amber-300 backdrop-blur-md hover:bg-slate-800 transition-colors"
              >
                💡 Взять подсказку
              </button>
            ) : (
              <div className="absolute top-3.5 right-3.5 max-w-[220px] rounded-2xl bg-slate-900/95 border border-amber-400/40 p-2.5 text-xs text-slate-200 backdrop-blur-md shadow-lg">
                Подсказка: видно в полушарии {currentQ.constellation.hemisphere}, сезон: {currentQ.constellation.season}.
              </div>
            )}
          </div>

          {/* 4 Options */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {currentQ.options.map((option, idx) => {
              let btnClass = "border-slate-800 bg-slate-800/50 text-slate-100 hover:border-sky-400/60 hover:bg-slate-800";

              if (isAnswered) {
                if (option === currentQ.correctAnswer) {
                  btnClass = "border-emerald-500/80 bg-emerald-950/60 text-emerald-200 font-bold shadow-sm";
                } else if (option === selectedOption) {
                  btnClass = "border-rose-500/80 bg-rose-950/60 text-rose-200 font-bold shadow-sm";
                } else {
                  btnClass = "opacity-40 border-slate-900 bg-slate-950 text-slate-500";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(option)}
                  disabled={isAnswered}
                  className={`rounded-2xl border p-4 text-left text-sm font-semibold transition-all ${btnClass}`}
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
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800 animate-in fade-in">
              <div className="text-xs">
                {selectedOption === currentQ.correctAnswer ? (
                  <span className="text-emerald-300 font-semibold flex items-center gap-1.5">
                    <span>🎉</span> Отлично! Это действительно {currentQ.correctAnswer}.
                  </span>
                ) : (
                  <span className="text-rose-300 font-semibold flex items-center gap-1.5">
                    <span>💫</span> Чуть-чуть не угадали. Правильный ответ: {currentQ.correctAnswer}.
                  </span>
                )}
              </div>

              <button
                onClick={handleNextQuestion}
                className="w-full sm:w-auto rounded-2xl bg-gradient-to-r from-amber-400 via-sky-400 to-indigo-500 px-6 py-2.5 text-xs font-bold text-slate-950 shadow-md hover:brightness-110 transition-all"
              >
                {currentIndex + 1 < questions.length ? "Следующий вопрос →" : "Посмотреть результаты"}
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Finished Summary */
        <div className="text-center rounded-3xl border border-slate-700/50 bg-slate-900/80 p-8 sm:p-12 backdrop-blur-2xl shadow-2xl">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-amber-400/15 border border-amber-400/30 text-5xl animate-bounce">
            {score >= 4 ? "🌟" : score >= 2 ? "🔭" : "🚀"}
          </div>

          <h2 className="mt-6 text-2xl sm:text-3xl font-extrabold text-white">
            {score === 5 ? "Безупречно!" : score >= 3 ? "Отличный результат!" : "Хорошая попытка!"}
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Вы ответили правильно на <strong className="text-amber-300 text-lg">{score}</strong> из {questions.length} вопросов ({Math.round((score / questions.length) * 100)}%)
          </p>

          <div className="mt-4 inline-block rounded-2xl bg-slate-800/80 border border-slate-700 px-5 py-2 text-xs font-bold text-sky-200">
            Звание: {score === 5 ? "Магистр Вселенной 🌌" : score >= 3 ? "Зоркий Астроном 🔭" : "Юный Звездочёт ✨"}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={startNewQuiz}
              className="rounded-2xl bg-gradient-to-r from-amber-400 via-sky-400 to-indigo-500 px-6 py-3 text-xs font-bold text-slate-950 shadow-md hover:brightness-110 transition-all"
            >
              Сыграть ещё раз ↻
            </button>
            <Link
              href="/encyclopedia"
              className="rounded-2xl border border-slate-700 bg-slate-800 px-6 py-3 text-xs font-semibold text-slate-200 hover:text-white hover:bg-slate-700 transition-all"
            >
              Изучить созвездия в энциклопедии
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
