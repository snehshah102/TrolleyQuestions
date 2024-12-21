// Questions.js
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { getQuestionStatistics } from '../utils/statistics';
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
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  
  // State to manage the modal image
  const [modalImage, setModalImage] = useState(null);

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

  const handleChoiceSelect = (choice) => {
    setSelectedChoice(choice);
    const stats = getQuestionStatistics(question.id);
    setStatistics(stats);
  };

  const renderQuitConfirmation = () => (
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
  );

  const renderInsightCard = (title, content) => (
    <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 space-y-3 border border-primary-100">
      <h4 className="text-lg font-semibold text-primary-700">{title}</h4>
      <p className="text-secondary-600 leading-relaxed">{content}</p>
    </div>
  );

  /**
   * If questionNumber === 8, we set showDashboard to true, which triggers the JourneyDashboard.
   * We then pass userAnswers + the *final question's choice* into JourneyDashboard.
   */
  const handleAnswer = () => {
    if (questionNumber === 8) {
      setShowDashboard(true);
    } else {
      onAnswer(selectedChoice);
    }
  };

  const renderStatistics = () => {
    if (!statistics || !selectedChoice) return null;

    const selectedPercentage = statistics.percentages[selectedChoice.id] || 0;
    const otherChoices = question.choices.filter((c) => c.id !== selectedChoice.id);
    const otherPercentages = otherChoices.map((c) => ({
      id: c.id,
      percentage: statistics.percentages[c.id] || 0
    }));

    // Determine the analysis texts based on the selected choice
    const isChoiceA = selectedChoice.id === 'a';
    const choiceAnalysis = isChoiceA ? question.analysisA : question.analysisB;
    const otherPerspective = isChoiceA ? question.analysisB : question.analysisA;
    const overallAnalysis = question.analysisOverall;

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 space-y-6"
      >
        {/* Selected Choice Stats */}
        <div className="bg-primary-50 rounded-xl p-6 space-y-4">
          <div className="text-center">
            <div className="text-2xl font-semibold text-primary-700">
              {selectedPercentage}% of participants
            </div>
            <div className="text-primary-600">made the same choice as you</div>
          </div>

          {/* Progress Bars */}
          <div className="space-y-3">
            {/* Selected Choice */}
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-primary-700">Your Choice</span>
                <span className="text-primary-600">{selectedPercentage}%</span>
              </div>
              <div className="h-2 bg-primary-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-600 transition-all duration-500"
                  style={{ width: `${selectedPercentage}%` }}
                />
              </div>
            </div>

            {/* Other Choices */}
            {otherPercentages.map(({ id, percentage }) => (
              <div key={id} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-secondary-600">
                    Option {id.toUpperCase()}
                  </span>
                  <span className="text-secondary-500">{percentage}%</span>
                </div>
                <div className="h-2 bg-secondary-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-secondary-400 transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center text-sm text-secondary-500">
            Based on {statistics.total} responses
          </div>
        </div>

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
    ); // Corrected closing parenthesis
  }; // Corrected closing brace

  /**
   * This returns the final Journey Dashboard if the 8th question is answered.
   * Note: The key fix is changing 'questionid' to 'questionId'.
   */
  if (showDashboard) {
    return (
      <JourneyDashboard
        userAnswers={[
          ...userAnswers,
          { questionId: question.id, choiceId: selectedChoice?.id }
        ]}
        onRestart={onQuit}
      />
    );
  }

  if (!isVisible) return null;

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
                onClick={() => setModalImage(images[question.id])} // Open modal on click
                onError={(e) => { e.target.src = '/images/default.jpg'; }} // Fallback image
              />
            </div>

            {/* Choices */}
            <div className="grid gap-6 max-w-3xl mx-auto">
              {question.choices.map((choice, index) => (
                <motion.div
                  key={choice.id}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Button
                    variant={selectedChoice?.id === choice.id ? 'primary' : 'outline'}
                    size="lg"
                    className={`
                      w-full text-left justify-start h-auto py-6 px-8
                      ${
                        selectedChoice?.id === choice.id
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
                            selectedChoice?.id === choice.id
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
              ))}
            </div>

            {/* Statistics and Insight */}
            <AnimatePresence>{selectedChoice && renderStatistics()}</AnimatePresence>

            {/* Philosophical Context */}
            {!selectedChoice && (
              <div className="max-w-2xl mx-auto text-center">
                <p className="text-lg text-secondary-500 italic leading-relaxed">
                  {question.philosophicalContext}
                </p>
              </div>
            )}

            {/* Quit Button (before selection) */}
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
      <AnimatePresence>{showQuitConfirm && renderQuitConfirmation()}</AnimatePresence>

      {/* Image Modal */}
      <AnimatePresence>
        {modalImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            onClick={() => setModalImage(null)} // Close modal when clicking outside the image
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image
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
                alt="Full Size" 
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