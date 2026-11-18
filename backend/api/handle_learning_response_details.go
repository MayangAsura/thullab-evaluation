package main

import (
	"fmt"
	"net/http"
	"encoding/json"

	"github.com/google/uuid"

	"github.com/MayangAsura/thullab-evaluation/internal/database"

)

func (apiCnfg *apiConfig) handlerCreateResponseDetail(w http.ResponseWriter, r *http.Request){

	type parameters struct {
		ResponseID uuid.UUID `json:"response_id"`
		LearningID uuid.UUID `json:"learning_id"`
		UserID uuid.UUID `json:"user_id"`
		ClassID uuid.UUID `json:"class_id"`
		QuestionID uuid.UUID `json:"question_id"`
		Answer string `json:"answer"`
		Point int64 `json:"point"`
	}

	decoder := json.NewDecoder(r.Body)

	params := parameters{}

	err := decoder.Decode(&params)

	if err != nil {
		respondWithError(w, 400, fmt.Sprint("Error when parsing json: %s", err))
		return
	}

	learning_response_details, err := apiCnfg.DB.CreateLearningResponseDetail(r.Context(), database.CreateLearningResponseDetailParams{
		ResponseID: params.ResponseID,
		LearningID: params.LearningID,
		UserID: params.UserID,
		ClassID: params.ClassID,
		QuestionID: params.QuestionID,
		Answer: params.Answer,
		Point: params.Point,
	})

	if err != nil {
		respondWithError(w, 400, fmt.Sprint("Error when save learning response answer: %s", err))
		return
	}

	respondWithJson(w, 200, learning_response_details)
}