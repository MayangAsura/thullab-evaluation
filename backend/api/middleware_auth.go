package main

import (

	"fmt"

	"net/http"

	"github.com/MayangAsura/thullab-evaluation/internal/database"

	"github.com/MayangAsura/thullab-evaluation/internal/auth"

)

type authHandler func(http.ResponseWriter, *http.Request, database.User)

func (cfg *apiConfig) middlewareAuth(handler authHandler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		apiKey, err := auth.GetAPIKey(r.Header)

		if err != nil {
			respondWithError(w, 403, fmt.Sprint("Auth error: %v", err))
			return
		}

		user, err := cfg.DB.GetUserApiKey(r.Context(), apiKey)

		if err != nil {
			respondWithError(w, 400, fmt.Sprint("Couldn't get user: %v", err))
			return
		}

		handler(w, r, user)
	}
}