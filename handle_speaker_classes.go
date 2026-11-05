package main

import (
	"fmt"
	"net/http"
	"encoding/json"

	"github.com/google/uuid"

	"github.com/MayangAsura/thullab-evaluation/internal/database"

)

func (apiCnfg *apiConfig) handlerCreateSpeakerClass(w http.ResponseWriter, r *http.Request, user database.User){

	type parameters struct {
		ClassID uuid.UUID `json:"class_id"`
		UserID uuid.UUID `json:"user_id"`
	}

	decoder := json.NewDecoder(r.Body)

	params := parameters{}

	err := decoder.Decode(&params)

	if err != nil {
		respondWithError(w, 400, fmt.Sprint("Error when parsing json: %v", err))
		return
	}

	speaker_classes, err := apiCnfg.DB.CreateSpeakerClass(r.Context(), database.CreateSpeakerClassParams{
		ClassID: params.ClassID,
		UserID: params.UserID,
		CreatedBy: user.ID,
	})

	respondWithJson(w, 200, speaker_classes)
}

func (apiCnfg *apiConfig) handlerGetSpeakers(w http.ResponseWriter, r *http.Request){

	speakers, err := apiCnfg.DB.GetSpeakerClasses(r.Context())

	if err != nil {
		respondWithError(w, 400, fmt.Sprint("Error when get speaker :%v", err))
		return
	}

	respondWithJson(w, 200, databaseSpeakerClassesToSpeakerClasses(speakers))
}