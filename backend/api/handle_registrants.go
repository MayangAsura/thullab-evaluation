package main

import (
	"fmt"
	"encoding/json"
	"net/http"

	"github.com/MayangAsura/thullab-evaluation/internal/database"

	// "internal/database"

)

func (apiCnfg *apiConfig) handlerCreateRegistrant(w http.ResponseWriter, r *http.Request, user database.User){

	type parameters struct {
		Name string `json:"name"`
		Password string `json:"password"`
		PhoneNumber string `json:"phone_number"`
		Email string `json:"email"`
		Address string `json:"address"`
	}

	decoder := json.NewDecoder(r.Body)

	params := parameters{}

	fmt.Println("params:", params)

	err := decoder.Decode(&params)


	if err != nil {
		respondWithError(w, 400, fmt.Sprint("Error when parsing json: %s", err))
		return
	}

	registrant, errRegistrant := apiCnfg.DB.CreateRegistrant(r.Context(), database.CreateRegistrantParams{
		Name: params.Name,
		Password: params.Password,
		PhoneNumber: params.PhoneNumber,
		Email: params.Email,
		Address: params.Address,
	})

	if err != nil {
		respondWithError(w, 400, fmt.Sprint("Couldn't create registrant: %s", errRegistrant))
		return
	}


	respondWithJson(w, 200, registrant)
}

func (apiCnfg *apiConfig) handlerGetRegistrantDetail(w http.ResponseWriter, r *http.Request, user database.User){


	// respondWithJson(w, 200, databaseRegistrantToUser(user))
	return

}

func (apiCnfg *apiConfig) handlerGetRegistrants(w http.ResponseWriter, r *http.Request, user database.User){

	// registrants, err := apiCnfg.DB.GetRegistrants(r.Context())

	// if err != nil {
	// 	respondWithError(w, 400, fmt.Sprint("Error when get registrants: %v", err))
	// 	return

	// }
	// respondWithJson(w, 200, databaseGetRegistrantsRowsToRegistrants(registrants))

	return
}

func (apiCnfg *apiConfig) handlerUpdateRegistrant(w http.ResponseWriter, r *http.Request, user database.User){

	return
}

func (apiCnfg *apiConfig) handlerDeleteRegistrant(w http.ResponseWriter, r *http.Request, user database.User){

	return
}