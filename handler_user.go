package main

import (
	"fmt"
	"encoding/json"
	"time"
	"net/http"

	"github.com/google/uuid"
	"github.com/MayangAsura/internal/database"

)

func (apiCnfg *apiConfig) handlerCreateUsers(w http.responseWriter, r *http.Request){

	type parameter struct {
		Name string `json:"name"`
	}

	decoder := json.NewDecoder(r.Body)

	params := parameters{}
	err := decoder.Decode(params)

	if err != nil {
		respondWithError(w, 400, fmt.Sprint("Error when parsing json: %s", err))
		return
	}

	user, err := apiCnfg.DB.CreateUser(r.Context(), database.CreateUserParams{
		ID: uuid.New(),
		CreatedAt: time.Now().UTC(),
		UpdatedAt: time.Now().UTC(),
		Name: params.Name,
	})

	if err != nil {
		respondWithError(w, 400, fmt.Sprint("Couldn't create user: %s", err))
		return
	}


	respondWithJson(w, 200, user)
}