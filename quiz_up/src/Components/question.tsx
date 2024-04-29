import { useState } from 'react';
import { Link } from 'react-router-dom';
import { QuestionType, UserType } from '../types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

type QuestionCardProps = {
    question: QuestionType, 
    currentUser: UserType|null, }

export default function QuestionCard({ question, currentUser }: QuestionCardProps) {
    const [showAnswer, setShowAnswer] = useState(false); 
  
    const handleViewAnswers = () => {
      setShowAnswer(true); 
    };
  
    return (
        <Card className='my-3 bg-custom'>
            <Card.Header>{question.created_on}</Card.Header>
            <Card.Body>
                <Card.Text>{question.question}</Card.Text>
  
                {!showAnswer && (
                    <Button variant='primary' onClick={handleViewAnswers}>
                    View Answers
                    </Button>
                )}
  
                {showAnswer && <Card.Text>{question.answer}</Card.Text>}
                {question.author.user_id === currentUser?.user_id && <Link to={`/edit/${question.id}`}><Button variant='primary'>Edit Question</Button></Link>}
            </Card.Body>
        </Card>
    )
}