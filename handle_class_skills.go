package main

import (
	"fmt"
	"net/http"
	"encoding/json"

	"database/sql"

	"github.com/google/uuid"

	"github.com/MayangAsura/thullab-evaluation/internal/database"

)

func (apiCnfg *apiConfig) handlerCreateClassSkill(w http.ResponseWriter, r *http.Request){

	type parameters struct {
		ClassID uuid.UUID `json:"class_id"`
		SkillID uuid.UUID `json:"skill_id"`
		Point int64 `json:"point"`
	}

	decoder := json.NewDecoder(r.Body)

	params := parameters{}

	err := decoder.Decode(&params)

	if err != nil {
		respondWithError(w, 400, fmt.Sprint("Error when parsing json: %s", err))
		return
	}

	class_skills, err := apiCnfg.DB.CreateClassSkill(r.Context(), database.CreateClassSkillParams{
		ClassID: params.ClassID,
		SkillID: params.SkillID,
		Point: params.Point,
	})

	if err != nil {
		respondWithError(w, 400, fmt.Sprint("Error when save class skill: %s", err))
		return
	}

	respondWithJson(w, 200, class_skills)
}