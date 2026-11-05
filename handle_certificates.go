package main

import (
	"fmt"
	"net/http"
	"encoding/json"

	"github.com/google/uuid"

	"github.com/MayangAsura/thullab-evaluation/internal/database"
)

func (apiCnfg *apiConfig) handlerCreateUserCertificate(w http.ResponseWriter, r *http.Request, user database.User){

	type parameters struct {
		ClassID uuid.UUID `json:"class_id"`
	}

	decoder := json.NewDecoder(r.Body)

	params := parameters{}

	err := decoder.Decode(&params)

	if err != nil {
		respondWithError(w, 400, fmt.Sprint("Error when parse json: %v", err))
		return
	}

	// file_url := handleGetUserCertificate(classID, user.ID)

	// certificate, err := apiCnfg.DB.CreateCertificate(r.Context(), user.ID)

	// if err != nil {
	// 	respondWithError(w, 400, fmt.Sprint("Error when create certificate: %v", err))
	// 	return
	// }

}

func (apiCnfg * apiConfig) handleGetMyCertificates(w http.ResponseWriter, r *http.Request, user database.User){

	certificates, err := apiCnfg.DB.GetUserCertificates(r.Context(), user.ID)

	if err != nil {
		respondWithError(w, 400, fmt.Sprint("Error when get user certificate: %v", err))
		return
	}

	// return certificates

	respondWithJson(w, 200, databaseCertificatesToCertificates(certificates))
}