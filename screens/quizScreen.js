import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AwesomeButton from "react-native-really-awesome-button";
import he from 'he';

const QuizScreen = ({ route, navigation }) => {

    const [score, setScore] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [isQuizOver, setIsQuizOver] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: '#F3B700',
            },
            headerTintColor: 'black',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        });

        fetch(`https://opentdb.com/api.php?amount=50&category=${route.params.category}&difficulty=${route.params.difficulty}&type=multiple`)
            .then((response) => response.json())
            .then((data) => {
                const shuffledQuestions = data.results.map((question) => ({
                    ...question,
                    answers: [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5),
                }));
                setQuestions(shuffledQuestions);
                setIsLoading(false);
            });
    }, []);

    const handleAnswer = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }
        if (currentIndex === questions.length - 1) {
            setIsQuizOver(true);
        } else {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handleStopQuiz = () => {
        setIsQuizOver(true);
    };

    const handleRestartQuiz = () => {
        setCurrentIndex(0);
        setScore(0);
        setIsQuizOver(false);
    };

    const currentQuestion = questions[currentIndex];

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    if (isQuizOver) {
        return (
            <View style={styles.container}>
                <Text style={styles.result}>Your Score: {score} / {questions.length}</Text>
                <View style={styles.buttonContainer}>
                    <AwesomeButton
                        onPress={handleRestartQuiz}
                        backgroundColor="#F3b700"
                        textColor="black"
                        style={{ marginBottom: 20, width: 200, fontWeight: 'bold', }}
                        stretch
                    >
                        Retry
                    </AwesomeButton>
                    <AwesomeButton
                        onPress={() => navigation.navigate('Home')}
                        backgroundColor="#F3b700"
                        textColor="black"
                        style={{ width: 200, fontWeight: 'bold', }}
                        stretch
                    >
                        Go to Home
                    </AwesomeButton>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.scoreContainer}>
                <Text style={styles.scoreText}>Score: {score}</Text>
            </View>
            <Text style={styles.question}>{he.decode(currentQuestion.question)}</Text>
            <View style={styles.answers}>
                {currentQuestion.answers.map((answer, index) => (
                    <AwesomeButton
                        key={index}
                        onPress={() => handleAnswer(answer === he.decode(currentQuestion.correct_answer))}
                        style={styles.answer}
                        backgroundColor="#F3b700"
                        textColor="black"
                        stretch
                    >
                        {he.decode(answer)}
                    </AwesomeButton>
                ))}
            </View>
            <AwesomeButton
                onPress={handleStopQuiz}
                backgroundColor="#c42021"
                textColor="white"
            >
                Stop Quiz
            </AwesomeButton>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4c4c47',
    },
    scoreContainer: {
        position: 'absolute',
        top: 20,
        right: 20,
    },
    scoreText: {
        fontSize: 18,
        color: '#fff',
    },
    question: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20,
        color: '#fff',
    },
    answers: {
        width: 200,
        alignItems: 'center',
        fontWeight: 'bold',
    },
    answer: {
        margin: 10,
        width: 200,
    },
    result: {
        fontSize: 24,
        marginBottom: 20,
        color: '#fff',
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default QuizScreen;
