package main

import (
	"fmt"
	"encoding/json"
	"time"
	"net/http"

	"github.com/google/uuid"
	"github.com/MayangAsura/thullab-evaluation/internal/database"

	// "internal/database"

)

func (apiCnfg *apiConfig) handlerCreateUser(w http.ResponseWriter, r *http.Request, user database.User){

	type parameters struct {
		Name string `json:"name"`
		Password string `json:"password"`
	}

	decoder := json.NewDecoder(r.Body)

	params := parameters{}
	err := decoder.Decode(&params)

	if err != nil {
		respondWithError(w, 400, fmt.Sprint("Error when parsing json: %s", err))
		return
	}

	user, errUser := apiCnfg.DB.CreateUser(r.Context(), database.CreateUserParams{
		ID: uuid.New(),
		CreatedAt: time.Now().UTC(),
		UpdatedAt: time.Now().UTC(),
		Name: params.Name,
		Password: params.Password,
		CreatedBy: user.ID,
	})

	if err != nil {
		respondWithError(w, 400, fmt.Sprint("Couldn't create user: %s", errUser))
		return
	}


	respondWithJson(w, 200, databaseUserToUser(user))
}

func (apiCnfg *apiConfig) handlerGetUser(w http.ResponseWriter, r *http.Request, user database.User){


	respondWithJson(w, 200, databaseUserToUser(user))

}

func (apiCnfg *apiConfig) handlerGetStudents(w http.ResponseWriter, r *http.Request, user database.User){

	students, err := apiCnfg.DB.GetStudents(r.Context())

	if err != nil {
		respondWithError(w, 400, fmt.Sprint("Error when get students: %v", err))
		return

	}
	respondWithJson(w, 200, databaseUserToStudent(students))
}