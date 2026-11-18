package main

import (
	"fmt"
	"net/http"
	"encoding/json"

	"github.com/google/uuid"

	"github.com/MayangAsura/thullab-evaluation/internal/database"

)

func (apiCnfg *apiConfig) handlerCreateLearningResponse(w http.ResponseWriter, r *http.Request, user database.User){

	type parameters struct {
		LearningID uuid.UUID `json:"evaluation_id"`
		ClassID uuid.UUID `json:"class_id"`
		TotalPoint int64 `json:"total_point"`
	}

	decoder := json.NewDecoder(r.Body)

	params := parameters{}

	err := decoder.Decode(&params)

	if err != nil {
		respondWithError(w, 400, fmt.Sprint("Error when parsing json: %s", err))
		return
	}

	learning_responses, err := apiCnfg.DB.CreateLearningResponse(r.Context(), database.CreateLearningResponseParams{
		LearningID: params.LearningID,
		ClassID: params.ClassID,
		UserID: user.ID,
		TotalPoint: params.TotalPoint,
	})

	if err != nil {
		respondWithError(w, 400, fmt.Sprint("Error when save learning response: %v", err))
		return
	}

	respondWithJson(w, 200, learning_responses)
}