package main

import (
	"fmt"
	"net/http"
	"encoding/json"

	"github.com/MayangAsura/thullab-evaluation/internal/database"

)
func (apiCnfg *apiConfig) handlerCreateSkills(w http.ResponseWriter, r *http.Request, user database.User){
	type parameters struct {
		Name string `json:"name"`
	}

	decoder := json.NewDecoder(r.Body)

	params := parameters{}

	err := decoder.Decode(&params)

	if err != nil {
	respondWithError(w, 400, fmt.Sprint("Error when parsing json: %s", err))
		return
	}

	skill, err := apiCnfg.DB.CreateSkill(r.Context(), database.CreateSkillParams{
		Name: params.Name,
		CreatedBy: user.ID,
	})

	if err != nil {
		respondWithError(w, 400, fmt.Sprint("Error when save skills: %s", err))
		return
	}

	respondWithJson(w, 200, skill)
}

func (apiCnfg *apiConfig) handlerGetSkills(w http.ResponseWriter, r *http.Request){

	skills, err := apiCnfg.DB.GetSkills(r.Context())

	if err != nil {
		respondWithError(w, 400, fmt.Sprint("Error when get skills: %v", err))
		return
	}

	respondWithJson(w, 200, skills)


}