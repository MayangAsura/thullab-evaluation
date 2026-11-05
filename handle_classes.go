package main

import (
	"fmt"
	"net/http"
	"encoding/json"

	"github.com/google/uuid"
	"github.com/go-chi/chi"

	"database/sql"

	"github.com/MayangAsura/thullab-evaluation/internal/database"

)

func (apiCnfg *apiConfig) handlerCreateClasses(w http.ResponseWriter, r *http.Request, user database.User){

	type skill struct {
		ID uuid.UUID `json:"id"`
		Name string `json:"name"`
	}

	type parameters struct {
		Name string `json:"name"`
		Level string `json:"level"`
		Skills []uuid.UUID `json:"skills"`
		CategoryID uuid.UUID `json:"category_id"`
		Image string `json:"image"`
		LearningHour int64 `json:"learning_hour"`
		Speakers []uuid.UUID `json:"speakers"`
		CreatedBy uuid.UUID `json:"created_by"`
	}

	decoder := json.NewDecoder(r.Body)

	params := parameters{}

	err := decoder.Decode(&params)

	if err != nil {
		respondWithError(w, 400, fmt.Sprint("Error when decode json: %s", err))
		return
	}

	classes, err := apiCnfg.DB.CreateClasses(r.Context(), database.CreateClassesParams{
		Name: params.Name,
		Level: params.Level,
		CategoryID: params.CategoryID,
		LearningHour: params.LearningHour,
		Image: params.Image,
		CreatedBy: user.ID,
	})

	if err != nil {
		respondWithError(w, 400, fmt.Sprint("Error when save classes: %s", err))
		return
	}

	// Skill := make(map[string]string)
	// ArrSkill []skill{}

	for _, skill := range params.Skills {
		_, err := apiCnfg.DB.CreateClassSkill(r.Context(), database.CreateClassSkillParams{
			ClassID: classes.ID,
			SkillID: skill,
		})

		// map(key, element => {
		// 	ArrSkills[key] := element
		// })

		// ArrSkill.append(ArrSkill, skill)

		// for i := 0; i< len(params.Skill); i++ {
		// 	ArrSkills['']
		// }

		// fmt.Sprint("ArrSkills: %v", skill)

		if err != nil {
		respondWithError(w, 400, fmt.Sprint("Error when save skills: %s", err))
		}

	}

	for _, speaker := range params.Speakers {
		_, err := apiCnfg.DB.CreateSpeakerClass(r.Context(), database.CreateSpeakerClassParams{
			ClassID : classes.ID,
			UserID : speaker,
		})

		if err != nil {
			respondWithError(w, 400, fmt.Sprint("Error when create class speaker: %s", err))
		}

	}

	respondWithJson(w, 200, databaseClassToClass(classes))

}

func (apiCnfg *apiConfig) handlerUploadImage(w http.ResponseWriter, r *http.Request)

func (apiCnfg *apiConfig) handlerGetClasses(w http.ResponseWriter, r *http.Request, user database.User){

	query := r.URL.Query()
	status := query.Get("type")

	if status != "" {
		// if status == "inprogress" {

		// 	classes, err := apiCnfg.DB.GetClassesInprogress(r.Context(), user.ID)

		// 	if err != nil {
		// 		respondWithError(w, 400, fmt.Sprint("Couldn't get classess: %v", err))
		// 		return
		// 	}

		// 	respondWithJson(w, 200, databaseClassesToClasses(classes))
		// }
		// if status == "completed" {

		// 	classes, err := apiCnfg.DB.GetClassesCompleted(r.Context(), user.ID)

		// 	if err != nil {
		// 		respondWithError(w, 400, fmt.Sprint("Couldn't get classess: %v", err))
		// 		return
		// 	}

		// 	respondWithJson(w, 200, databaseClassesToClasses(classes))

		// }

	}else{

			classes, err := apiCnfg.DB.GetClasses(r.Context())

			if err != nil {
				respondWithError(w, 400, fmt.Sprint("Couldn't get classess: %v", err))
				return
			}

			respondWithJson(w, 200, databaseClassesToClasses(classes))

		}

}

func (apiCnfg *apiConfig) handlerGetClassDetail(w http.ResponseWriter, r *http.Request, user database.User){
	classIDStr := chi.URLParam(r, "classID")
	classID, err := uuid.Parse(classIDStr)

	if err != nil {
		respondWithError(w, 400, fmt.Sprint("Error when parse class id: %v", err))
		return
	}

	class, err := apiCnfg.DB.GetClassByID(r.Context(), classID)

	if err != nil {
		respondWithError(w, 400, fmt.Sprint("Error when get class detail: %v", err))
		return
	}

	class_skills, err := apiCnfg.DB.GetSkillByClass(r.Context(), classID)

	if err != nil {
		respondWithError(w, 400, fmt.Sprint("Error when get class skill: %v", err))
		return
	}

	speakers, err := apiCnfg.DB.GetSpeakersByClass(r.Context(), classID)

	if err != nil {
		respondWithError(w, 400, fmt.Sprint("Error when get class speaker: %v", err))
		return
	}

	respondWithJson(w, 200, databaseClassDetailToClassDetail(class, class_skills, speakers))
}