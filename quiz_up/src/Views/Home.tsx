import { useEffect, useState } from 'react';
import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { QuestionType, UserType } from '../types';
import { getAllQuestions } from '../lib/apiWrapper';
import Question from '../Components/Question'

type HomeProps = {
  isLoggedIn: boolean, 
  currentUser: UserType | null, 
}

export default function Home({isLoggedIn, currentUser}: HomeProps) {

  const [showForm, setShowForm] = useState(false); 
  const [questions, setQuestions] = useState<QuestionType[]>([]); 
  const [fetchQuestionData, setFetchQuestionData] = useState(true); 

  useEffect(() => {
    async function fetchData() {
      const response = await getAllQuestions(); 
      if (response.data) {
        const questions = response.data; 
        setQuestions(questions);
      }
    }
    fetchData(); ;
  }, [fetchQuestionData]);

  const [searchTerm, setSearchTerm] = useState(''); 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
}


 
  return (
    <>
      <h1 className="text-center">{isLoggedIn && currentUser ? `Hello ${currentUser?.first_name} ${currentUser?.last_name}` : 'Welcome!' }</h1>
      <Row>
        <Col xs={12} md={6}>
            <Form.Control value={searchTerm} placeholder='Search Questions' onChange={handleInputChange} />
        </Col>
        {isLoggedIn && (
          <Col>
            <Button className='w-100' variant='success' onClick={() => setShowForm(!showForm)}>{showForm ? 'Hide Form' : 'Add Question'}</Button>
          </Col>
        )}
      </Row>
      <div>
        {Array.isArray(questions) ? (
          questions
            .filter(q => q.question?.toLowerCase().includes(searchTerm.toLowerCase()))
            .map(q => <Question key={q.id} question={q} currentUser={currentUser} />)
        ) : (
          <h1>Error: something went wrong</h1>
        )}
      </div>
    </>
  );
}