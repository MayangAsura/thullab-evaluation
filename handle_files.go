package main

import (
	"fmt"
	"net/http"
	"encoding/json"

	"github.com/MayangAsura/thullab-evaluation/internal/database"

)

func (apiCnfg *apiConfig) handlerCreateFile(w http.ResponseWriter, r *http.Request){
	type parameters struct {
		Name string `json:"name"`
		FileType string `json:"type"`
		FileUrl string `json:"file_url"`
		Size int64 `json:"size"`
	}

	decoder := json.NewDecoder(r.Body)

	params := parameters{}

	err := decoder.Decode(&params)

	if err != nil {
		respondWithError(w, 400, fmt.Sprint("Error when parsing json: %s", err))
		return
	}

	files, err := apiCnfg.DB.CreateFiles(r.Context(), database.CreateFilesParams{
		Name: params.Name,
		FileType: params.FileType,
		FileUrl: params.FileUrl,
		Size: params.Size,
	})

	if err != nil {
		respondWithError(w, 400, fmt.Sprint("Error when save file: %s", err))
		return
	}

	respondWithJson(w, 200, files)
}