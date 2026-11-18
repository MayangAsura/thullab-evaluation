package main

import (
	"fmt"
	"net/http"
	"encoding/json"

	"github.com/google/uuid"

	"github.com/MayangAsura/thullab-evaluation/internal/database"

)

func (apiCnfg *apiConfig) handlerCreateLearningQuestion(w http.ResponseWriter, r *http.Request){

	type parameters struct {
		LearningID uuid.UUID `json:"learning_id"`
		ClassID uuid.UUID `json:"class_id"`
		Question string `json:"question"`
		QuestionType string `json:"question_type"`
		Answer string `json:"answer"`
	}

	decoder := json.NewDecoder(r.Body)

	params := parameters{}

	err := decoder.Decode(&params)

	if err != nil {
		respondWithError(w, 400, fmt.Sprint("Error when parsing json: %v", err))
		return
	}

	learning_questions, err := apiCnfg.DB.CreateLearningQuestion(r.Context(), database.CreateLearningQuestionParams{
		LearningID: params.LearningID,
		ClassID: params.ClassID,
		Question: params.Question,
		QuestionType: params.QuestionType,
		Answer: params.Answer,
	})

	if err != nil {
		respondWithError(w, 400, fmt.Sprint("Error when save learning question: %v", err))
		return
	}

	respondWithJson(w, 200, learning_questions)
}

func (apiCnfg *apiConfig) handleGetLearningQuestionDetail(w http.ResponseWriter, r *http.Request){

}