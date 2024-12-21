import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Question from './components/Question';
import Progress from './components/Progress';
import MandirBackground from './components/MandirBackground';
import { trolleyQuestions as questions } from './data/questions';
import { recordAnswer } from './utils/statistics';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './components/ui/card';
import { Button } from './components/ui/button';

function App() {
  const [gameState, setGameState] = useState('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  // Set the document title on mount
  useEffect(() => {
    document.title = 'Trolley Questions - A Modern Ethical Journey';
  }, []);

  const handleStart = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setGameState('playing');
      setIsTransitioning(false);
    }, 500);
  };

  const handleAnswer = (choice) => {
    // Instead of "questionCategory", store the question "id"
    // so we can identify which question was answered
    const newAnswer = {
      questionId: questions[currentQuestionIndex].id,
      choiceId: choice.id,
    };

    setUserAnswers((prev) => [...prev, newAnswer]);
    recordAnswer(questions[currentQuestionIndex].id, choice.id);

    setIsTransitioning(true);
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setIsTransitioning(false);
      } else {
        setGameState('finished');
        setIsTransitioning(false);
      }
    }, 600);
  };

  const handleQuit = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setGameState('intro');
      setCurrentQuestionIndex(0);
      setUserAnswers([]);
      setIsTransitioning(false);
    }, 500);
  };

  // Placeholder if you want to keep "map" usage
  const renderMap = () => null;

  const renderIntro = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-[90vh] flex items-center justify-center px-4 py-12"
    >
      <Card className="w-full max-w-4xl backdrop-blur-lg bg-white/90">
        <CardHeader className="space-y-12 text-center p-8">
          <div className="space-y-4">
            <CardTitle className="text-6xl sm:text-7xl font-display font-bold gradient-text pb-4">
              Find Yourself
            </CardTitle>
            <h2 className="text-2xl sm:text-3xl font-display text-primary-600">
              A Journey of Moral Reflection
            </h2>
          </div>

          <CardDescription className="text-lg sm:text-xl text-secondary-600 max-w-2xl mx-auto leading-relaxed">
            Begin a journey that challenges your heart and mind. Step into a
            world of reflection and discovery, where every decision shapes your
            path and reveals deeper truths. Confront moral crossroads, make
            thoughtful choices, and see how your values align with others.
            As you navigate this journey, find solace in wisdom, clarity in
            uncertainty, and warmth in knowing you’re never alone.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-12 p-8">
          <div className="grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="p-8 rounded-xl bg-primary-50 text-center space-y-3">
              <div className="text-primary-500 text-3xl mb-3">🏛️</div>
              <h3 className="font-semibold text-primary-700 text-lg">
                Find yourself
              </h3>
              <p className="text-primary-600">Explore your moral compass</p>
            </div>
            <div className="p-8 rounded-xl bg-primary-50 text-center space-y-3">
              <div className="text-primary-500 text-3xl mb-3">🙏</div>
              <h3 className="font-semibold text-primary-700 text-lg">
                Moral Guidance
              </h3>
              <p className="text-primary-600">Learn ethical principles</p>
            </div>
            <div className="p-8 rounded-xl bg-primary-50 text-center space-y-3">
              <div className="text-primary-500 text-3xl mb-3">✨</div>
              <h3 className="font-semibold text-primary-700 text-lg">
                Self-Discovery
              </h3>
              <p className="text-primary-600">Understand your values</p>
            </div>
          </div>

          <div className="text-center pt-4">
            <Button
              size="lg"
              className="text-lg px-12 py-8 animate-float"
              onClick={handleStart}
            >
              Begin Your Journey
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderGame = () => (
    <div className="relative min-h-screen">
      <Progress current={currentQuestionIndex} total={questions.length} isComplete={false} />

      <main className="container mx-auto pt-28 pb-16 px-4">
        <AnimatePresence mode="wait">
          {questions.map((question, index) => (
            <Question
              key={question.id}
              question={question}
              onAnswer={handleAnswer}
              onQuit={handleQuit}
              isVisible={currentQuestionIndex === index && !isTransitioning}
              questionNumber={index + 1}
              userAnswers={userAnswers}
            />
          ))}
        </AnimatePresence>
      </main>
    </div>
  );

  /**
   * We still show the "Journey Complete" and "Thank you" message,
   * but also display a summary of the user’s answers in multiple cards below it.
   */
  const renderFinished = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-[80vh] flex items-center justify-center px-4"
    >
      <Card className="w-full max-w-5xl backdrop-blur-lg bg-white/90">
        <CardHeader className="space-y-6 text-center">
          <CardTitle className="text-4xl sm:text-5xl font-display gradient-text">
            Journey Complete
          </CardTitle>
          <CardDescription className="text-xl text-secondary-600">
            Thank you for exploring these ethical dilemmas. Your choices reveal
            interesting patterns about your moral framework.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8 pb-12">
          {/* Summary of All User Choices */}
          <div className="grid md:grid-cols-3 gap-6">
            {userAnswers.map((answer, index) => {
              // Find the question
              const questionData = questions.find(
                (q) => q.id === answer.questionId
              );
              if (!questionData) return null;

              // Find the chosen choice
              const chosenChoice = questionData.choices.find(
                (c) => c.id === answer.choiceId
              );

              return (
                <Card key={index} className="bg-white/90 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl text-primary-700 pb-2">
                      {questionData.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-6 space-y-2">
                    <p className="text-secondary-600 italic">
                      {questionData.scenario}
                    </p>
                    <p className="text-secondary-800 font-semibold">
                      You chose: {chosenChoice?.text}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Button to restart */}
          <div className="flex justify-center">
            <Button
              size="lg"
              className="text-lg px-8"
              onClick={() => {
                setCurrentQuestionIndex(0);
                setGameState('intro');
                setUserAnswers([]);
              }}
            >
              Start New Journey
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Background Elements */}
      <MandirBackground />

      {/* Content */}
      <AnimatePresence mode="wait">
        {gameState === 'intro' && renderIntro()}
        {gameState === 'map' && renderMap()}
        {gameState === 'playing' && renderGame()}
        {gameState === 'finished' && renderFinished()}
      </AnimatePresence>
    </div>
  );
}

export default App;