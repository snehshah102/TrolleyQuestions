// Questions.js
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import JourneyDashboard from './JourneyDashboard';

// Import all 8 images
import image1 from '../../images/1.jpg';
import image2 from '../../images/2.jpg';
import image3 from '../../images/3.jpg';
import image4 from '../../images/4.jpg';
import image5 from '../../images/5.jpg';
import image6 from '../../images/6.jpg';
import image7 from '../../images/7.jpg';
import image8 from '../../images/8.jpg';

// Define the image mapping
const images = {
  1: image1,
  2: image2,
  3: image3,
  4: image4,
  5: image5,
  6: image6,
  7: image7,
  8: image8,
};

const Questions = ({ 
  question, 
  onAnswer, 
  isVisible, 
  onQuit, 
  questionNumber, 
  userAnswers 
}) => {
  // Local state for the user’s currently selected choice
  const [selectedChoice, setSelectedChoice] = useState(null);

  // Manage whether the “Quit” confirmation is shown
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);

  // If questionNumber === 8 and user clicks “Complete Journey,” show final dashboard
  const [showDashboard, setShowDashboard] = useState(false);

  // For image modal (enlarged image on click)
  const [modalImage, setModalImage] = useState(null);

  // Animations
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.4,
        ease: "easeIn"
      }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.02,
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  /**
   * When the user clicks a choice:
   * 1. Store that choice in local state (selectedChoice)
   */
  const handleChoiceSelect = (choice) => {
    console.log('[Questions.js] handleChoiceSelect => choice:', choice);
    setSelectedChoice(choice);
    // Removed the statistics retrieval and setting
    // const stats = getQuestionStatistics(question.id);
    // console.log('[Questions.js] getQuestionStatistics =>', stats);
    // setStatistics(stats);
  };

  /**
   * The “Next Question” or “Complete Journey” button calls this.
   * If this is the last question (#8), show the JourneyDashboard here.
   * Otherwise, call the parent's onAnswer(selectedChoice), which increments
   * the parent’s currentQuestionIndex and goes to the next question.
   */
  const handleAnswer = () => {
    console.log('[Questions.js] handleAnswer => selectedChoice:', selectedChoice);
    if (!selectedChoice) {
      console.warn('No choice selected yet!');
      return;
    }

    if (questionNumber === 8) {
      console.log('[Questions.js] Last question => showDashboard = true');
      setShowDashboard(true);
    } else {
      console.log('[Questions.js] Not the last question => calling onAnswer');
      onAnswer(selectedChoice); 
    }
  };

  /**
   * If showDashboard is true, we render the JourneyDashboard
   * passing along all userAnswers plus the final choice for the 8th question.
   */
  if (showDashboard) {
    return (
      <JourneyDashboard
        userAnswers={[
          ...userAnswers,
          { questionId: question.id, choiceId: selectedChoice?.id }
        ]}
        onRestart={onQuit}  // or a different function if you want
      />
    );
  }

  // If this question is not the currently visible one, render nothing
  if (!isVisible) return null;

  // Quit Confirmation Overlay
  const renderQuitConfirmation = () => (
    <AnimatePresence>
      {showQuitConfirm && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl">
            <h3 className="text-2xl font-semibold text-secondary-900 mb-2">
              Quit Journey?
            </h3>
            <p className="text-secondary-600 mb-6">
              Are you sure you want to return to the start screen?
            </p>
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowQuitConfirm(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={onQuit}
              >
                Quit
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  /**
   * Helper to render a simple insight card
   */
  const renderInsightCard = (title, content) => (
    <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 space-y-3 border border-primary-100">
      <h4 className="text-lg font-semibold text-primary-700">{title}</h4>
      <p className="text-secondary-600 leading-relaxed">{content}</p>
    </div>
  );

  /**
   * Once the user selects a choice, we show stats/analysis via this function.
   * The user can then click “Next Question” or “Complete Journey.”
   */
  const renderStatistics = () => {
    if (!selectedChoice) return null;

    // Removed statistics dependencies
    // const selectedPercentage = statistics.percentages[selectedChoice.id] || 0;
    // const otherChoices = question.choices.filter((c) => c.id !== selectedChoice.id);
    // const otherPercentages = otherChoices.map((c) => ({
    //   id: c.id,
    //   percentage: statistics.percentages[c.id] || 0
    // }));

    // Pick the relevant analyses based on the choice:
    const isChoiceA = selectedChoice.id === 'a';
    const choiceAnalysis = isChoiceA ? question.analysisA : question.analysisB;
    const otherPerspective = isChoiceA ? question.analysisB : question.analysisA;
    const overallAnalysis = question.analysisOverall;

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="mt-8 space-y-6"
      >
        {/* Detailed Insights */}
        <div className="grid gap-6">
          {renderInsightCard("Choice Analysis", choiceAnalysis)}
          {renderInsightCard("Other Perspective", otherPerspective)}
          {renderInsightCard("Overall Analysis", overallAnalysis)}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            size="lg"
            className="px-6 border-2 border-primary-400 text-primary-600 hover:bg-primary-50"
            onClick={() => setShowQuitConfirm(true)}
          >
            Quit
          </Button>

          <Button
            size="lg"
            className="px-8 shadow-lg hover:shadow-xl"
            onClick={handleAnswer}
          >
            {questionNumber === 8 ? 'Complete Journey' : 'Next Question'}
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
              className="ml-2"
            >
              →
            </motion.span>
          </Button>
        </div>
      </motion.div>
    );
  };

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="w-full max-w-5xl mx-auto"
      >
        <Card className="backdrop-blur-lg bg-white/90">
          <CardHeader className="space-y-10 text-center py-10">
            <div className="space-y-6">
              <div className="min-h-[4rem]">
                <CardTitle className="text-4xl sm:text-5xl font-display gradient-text leading-[1.4] pb-4">
                  {question.title}
                </CardTitle>
              </div>
              <CardDescription className="text-xl sm:text-2xl text-secondary-600 max-w-3xl mx-auto">
                {question.scenario}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-10 pb-8">
            {/* Image for the current question */}
            <div className="relative h-80 sm:h-96 max-w-4xl mx-auto">
              <img 
                src={images[question.id]} 
                alt={`Journey Illustration for Question ${question.id}`} 
                className="object-cover w-full h-full rounded-xl shadow-lg cursor-pointer"
                onClick={() => setModalImage(images[question.id])} 
                onError={(e) => { e.target.src = '/images/default.jpg'; }} // Fallback
              />
            </div>

            {/* Choices */}
            <div className="grid gap-6 max-w-3xl mx-auto">
              {question.choices.map((choice, index) => {
                const isSelected = selectedChoice?.id === choice.id;
                return (
                  <motion.div
                    key={choice.id}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Button
                      variant={isSelected ? 'primary' : 'outline'}
                      size="lg"
                      className={`
                        w-full text-left justify-start h-auto py-6 px-8
                        ${
                          isSelected
                            ? 'bg-primary-500 text-white'
                            : 'bg-white hover:bg-primary-50 text-secondary-900 border-2 border-secondary-200'
                        }
                      `}
                      onClick={() => handleChoiceSelect(choice)}
                      disabled={selectedChoice !== null}
                    >
                      <span className="flex items-start gap-6">
                        <span
                          className={`
                            inline-flex items-center justify-center w-10 h-10 rounded-full
                            ${
                              isSelected
                                ? 'bg-white/20 text-white'
                                : 'bg-primary-50 text-primary-700'
                            }
                            text-lg font-semibold shrink-0
                          `}
                        >
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span className="text-xl leading-relaxed">{choice.text}</span>
                      </span>
                    </Button>
                  </motion.div>
                );
              })}
            </div>

            {/* Statistics and Insight (Removed % Participants) */}
            <AnimatePresence>
              {selectedChoice && renderStatistics()}
            </AnimatePresence>

            {/* Philosophical Context (before a choice is selected) */}
            {!selectedChoice && (
              <div className="max-w-2xl mx-auto text-center">
                <p className="text-lg text-secondary-500 italic leading-relaxed">
                  {question.philosophicalContext}
                </p>
              </div>
            )}

            {/* Quit Button (only show if no choice selected yet) */}
            {!selectedChoice && (
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-primary-600 border-2 border-primary-400 hover:bg-primary-50"
                  onClick={() => setShowQuitConfirm(true)}
                >
                  Quit
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Quit Confirmation Modal */}
      {renderQuitConfirmation()}

      {/* Image Modal */}
      <AnimatePresence>
        {modalImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            onClick={() => setModalImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative"
              onClick={(e) => e.stopPropagation()} // prevent closing when clicking the image
            >
              {/* Close Button */}
              <button
                className="absolute top-0 right-0 mt-2 mr-2 text-white bg-transparent border-none text-3xl font-bold cursor-pointer"
                onClick={() => setModalImage(null)}
                aria-label="Close Image"
              >
                &times;
              </button>

              {/* Full-Sized Image */}
              <img 
                src={modalImage} 
                alt="Enlarged" 
                className="max-w-full max-h-screen rounded-xl shadow-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Questions;
