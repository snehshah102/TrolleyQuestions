import React from 'react';
import { motion } from 'framer-motion';
import { trolleyQuestions } from '../data/questions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import Progress from './Progress';

const JourneyDashboard = ({ userAnswers, onRestart }) => {
  return (
    <>
      <Progress current={8} total={8} isComplete={true} />

      <div className="max-w-6xl mx-auto p-6 space-y-8 pt-28">
        {/* Header */}
        <div className="text-center space-y-6">
          <h1 className="text-5xl font-display gradient-text pb-2">
            Journey Complete
          </h1>
          <p className="text-xl text-secondary-600">
            Thank you for embarking on this journey. Here is a summary of your answers.
          </p>
        </div>

        {/* Grid of chosen answers */}
        <div className="grid md:grid-cols-3 gap-6">
          {userAnswers.map((answer, index) => {
            // Find the question by ID
            const questionData = trolleyQuestions.find(
              (q) => q.id === answer.questionId
            );

            if (!questionData) return null;

            // Find the chosen choice text
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
                <CardContent className="pb-6">
                  <p className="text-secondary-600 italic">
                    {questionData.scenario}
                  </p>
                  <p className="text-secondary-800 font-semibold mt-3">
                    You chose: {chosenChoice?.text}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="flex justify-center pb-8">
          <Button
            size="lg"
            onClick={onRestart}
            className="px-8 shadow-lg hover:shadow-xl"
          >
            Start New Journey
          </Button>
        </div>
      </div>
    </>
  );
};

export default JourneyDashboard;