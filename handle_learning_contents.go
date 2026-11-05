package main

import (

	"fmt"
	"encoding/json"
	"time"
	"strings"
	"strconv"

	"net/http"

	"database/sql"

	"github.com/google/uuid"

	"github.com/go-chi/chi"

	"github.com/MayangAsura/thullab-evaluation/internal/database"

)



func (apiCnfg *apiConfig) handlerCreateLearningContent(w http.ResponseWriter, r *http.Request){

	type option struct {
		Option string `json:"option"`
		Point int64 `json:"point"`
	}

	type question struct {
		QuestionOrder int64 `json:"question_order"`
		Question string `json:"question"`
		QuestionType string `json:"question_type"`
		Options []option `json:"options"`
		Answer string `json:"answer"`
	}

	type skill struct {
		ID uuid.UUID `json:"id"`
		Name string `json:"name"`
	}

	type parameters struct {
		Name string `json:"name"`
		ClassID uuid.UUID `json:"class_id"`
		ContentType string `json:"content_type"`
		Level string `json:"level"`
		Skills []uuid.UUID `json:"skills"`
		LearningHour int64 `json:"learning_hour"`
		Duration int64 `json:"duration"`
		NumQuestions int64 `json:"num_questions"`
		IsRandomQuestions bool `json:"is_random_questions"`
		IsRandomAnswers bool `json:"is_random_answers"`
		QuestionTypes string `json:"question_types"`
		Status string `json:"status"`
		Questions []question `json:"questions"`
	}

	decoder := json.NewDecoder(r.Body)

	params := parameters{}

	err := decoder.Decode(&params)

	if err != nil {
		respondWithError(w, 400, fmt.Sprint("Error when parse json: %s", err))
		return
	}

	learning_content, err := apiCnfg.DB.CreateLearningContent(r.Context(), database.CreateLearningContentParams{
		Name: params.Name,
		ContentType: params.ContentType,
		Level: params.Level,
		LearningHour: params.LearningHour,
		Duration: params.Duration,
		NumQuestions: params.NumQuestions,
		IsRandomQuestions: params.IsRandomQuestions,
		IsRandomAnswers: params.IsRandomAnswers,
		QuestionTypes: params.QuestionTypes,
		Status: params.Status,
	})

	if err != nil {
		respondWithError(w, 400, fmt.Sprint("Error when save learning contents: %v", err))
		return
	}

	// _, err := apiCnfg.DB.CreateLearningClasses(r.Context(), database.CreateLearningClassesParams{
	// 	LearningID: learning_content.ID,
	// 	ClassID: params.ClassID,
	// })

	_, err = apiCnfg.DB.CreateLearningClasses(r.Context(), database.CreateLearningClassesParams{
			LearningID: learning_content.ID,
			ClassID: params.ClassID,
	})

	if err != nil {
		respondWithError(w, 400, fmt.Sprint("Error when save learning_content: %v", err))
	}

	class, err := apiCnfg.DB.GetClassByID(r.Context(), params.ClassID)

	if err != nil {
		respondWithError(w, 400, fmt.Sprint("Error when save learning content: %v", err))
	}

	// if len(params.Skills) > 0 {

	// }

	// p_skills := params.Skills.slice(",")
	// fmt.Println(p_skills)



	// Skill := make(map[string]string)
	// Skill := make(map[string]string)
	// ArrSkill := []skill{}

	// skills := make(map([string][]skill))

	for _, skill := range params.Skills {
		_, err := apiCnfg.DB.CreateLearningContentSkill(r.Context(), database.CreateLearningContentSkillParams{
			LearningContentID: learning_content.ID,
			SkillID: skill,
			ClassID: params.ClassID,
		})



		// ArrSkill := append(ArrSkill, skill)

		// skills[ArrSkill.SkillID] := skill.SkillID
		// skills[ArrSkill.LearningContentID] := skill.LearningContentID
		// skills[ArrSkill.ClassID] := skill.ClassID

		if err != nil {
			respondWithError(w, 400, fmt.Sprint("Error when save learning contents: %v", err))
			return
		}

	}

	if len(params.Questions) > 0 {

		// ArrQuestions := []question{}

		// questions := []make(map([string]string))

		for _, value := range params.Questions {
			_, err := apiCnfg.DB.CreateLearningQuestion(r.Context(), database.CreateLearningQuestionParams{
				LearningID: learning_content.ID,
				QuestionOrder: value.QuestionOrder,
				Question: value.Question,
				QuestionType: value.QuestionType,
				Answer: value.Answer,
			})

			// questions := append(questions, question)
			// questions[ArrQuestions.Learning]

			if err != nil {
				respondWithError(w, 400, fmt.Sprint("Error when create questions: %v", err))
				return
			}

			if(len(value.Options) > 0){

				// questions['options'] := []make(map[string]string)

				for _, value := range value.Options{

					_, err := apiCnfg.DB.CreateLearningOption(r.Context(), database.CreateLearningOptionParams{
							Option: value.Option,
							Point: value.Point,
						})

					// questions['options'] := append(questions['options'], option)

					if err != nil {
						respondWithError(w, 400, fmt.Sprint("Error when create questions: %v", err))
						return
					}

				}


			}

			respondWithJson(w, 200, databaseLearningContentToLearningContent(learning_content, class))
			// respondWithJson(w, 200, databaseLearningContentToLearningContent(learning_content, class, ArrSkill, questions))

		}
	}

	respondWithJson(w, 200, databaseLearningContentToLearningContent(learning_content, class))


}

func (apiCnfg *apiConfig) handleGetLearningContents(w http.ResponseWriter, r *http.Request, user database.User){

	learning_contents, err := apiCnfg.DB.GetLearningContents(r.Context())

	if err != nil {
		respondWithError(w, 400, fmt.Sprint("Couldn't get learning contents: %v", err))
		return
	}


	respondWithJson(w, 200, databaseLearningContentsToLearningContents(learning_contents))
}

func (apiCnfg *apiConfig) handleClassGetLearningContents(w http.ResponseWriter, r *http.Request, user database.User){

	learning_contents, err := apiCnfg.DB.GetClassLearningContents(r.Context(), user.ID)

	if err != nil {
		respondWithError(w, 400, fmt.Sprint("Couldn't get learning contents: %v", err))
		return
	}

	respondWithJson(w, 200, databaseLearningContentsToLearningContents(learning_contents))
}

func (apiCnfg *apiConfig) handleGetLearningContentDetail(w http.ResponseWriter, r *http.Request, user database.User){

	learningIDStr := chi.URLParam(r, "learningID")
	learningID, err := uuid.Parse(learningIDStr)

	if err != nil {
		respondWithError(w, 400, fmt.Sprint("Error couldn't parse learning content id: %v", err))
		return
	}

	learning_contents, err := apiCnfg.DB.GetLearningContentByID(r.Context(), learningID)

	if err != nil {
		respondWithError(w, 400, fmt.Sprint("Error couldn't get learning content: %v", err))
		return
	}

	if len(learning_contents) == 0 {
		respondWithError(w, 404, fmt.Sprint("Error couldn't get learning content: %v", err))
		return
	}

	learning_content := learning_contents[0]


	// var learning_content_with_questions object = {}

	if learning_content.ContentType == "evaluation" {

		questions, err := apiCnfg.DB.GetLearningQuestionsByLearningContent(r.Context(), learningID)

		if err != nil {
			respondWithJson(w, 400, fmt.Sprint("Error when get learning questions: %v", err))
			return
		}

		response, err := apiCnfg.DB.GetLearningResponseByUserIDAndLearningID(r.Context(), database.GetLearningResponseByUserIDAndLearningIDParams{
			UserID: user.ID,
			LearningID: learningID,
		})


		if err != nil {
			respondWithError(w, 400, fmt.Sprint("Error when get learning response: %v", err))
		}

		for _, question := range questions {
			_, err = apiCnfg.DB.GetLearningResponseDetailByResponseIDAndQuestionID(r.Context(), database.GetLearningResponseDetailByResponseIDAndQuestionIDParams{
				ResponseID: response.ID,
				QuestionID: question.ID,
			})

			// response, err := apiCnfg.DB.GetLearningContentStudentResponse(r.Context(), user.ID, question.id)

			if err != nil {
				respondWithError(w, 400, fmt.Sprint("Error when get student response: %v", err))
				return
			}

			// Note: Saya bingung mas Fauzi, gimana cara Add satu key ke response "questions"

			// questions.response := response_detail

		}


		// learning_content_with_questions := {...learning_content, questions}


		respondWithJson(w, 200, learning_content)

	}

	respondWithJson(w, 200, learning_content)

}

func (apiCnfg *apiConfig) GetLearningContentClass(w http.ResponseWriter, r *http.Request, user database.User){

	classIDStr := chi.URLParam(r, "class_id")
	classID, err := uuid.Parse(classIDStr)

	if err != nil {
		respondWithError(w, 400, fmt.Sprint("Error when parse class id: %v", err))
		return
	}

	learning_contents, err := apiCnfg.DB.GetClassLearningContents(r.Context(), classID)

	if err != nil {
		respondWithError(w, 400, fmt.Sprint("Error when get learning contents: %v", err))
		return
	}

	respondWithJson(w, 200, learning_contents)


}

func (apiCnfg *apiConfig) StartLearningStudent(w http.ResponseWriter, r *http.Request, user database.User){
	learningIDStr := chi.URLParam(r, "learningID")
	learningID, err := uuid.Parse(learningIDStr)

	if err != nil {
		respondWithError(w, 400, fmt.Sprint("Error when parse learning id: %v", err))
		return
	}

	learning_response, err := apiCnfg.DB.StartLearningContentResponse(r.Context(), database.StartLearningContentResponseParams{
		UserID: user.ID,
		LearningID: learningID,
	})

	if err != nil {
		respondWithError(w, 400, fmt.Sprint("Error when start learning student: %v", err))
		return
	}

	respondWithJson(w, 200, learning_response)
	// respondWithJson(w, 200, fmt.Sprint("Successfully start learning content"))
}

func (apiCnfg *apiConfig) ResumeLearningStudent(w http.ResponseWriter, r *http.Request, user database.User){

	learningIDStr := chi.URLParam(r, "learningID")
	learningID, err := uuid.Parse(learningIDStr)

	if err != nil {
		respondWithError(w, 400, fmt.Sprint("Error when parse learning ID: ", err))
		return
	}

	err_resume := apiCnfg.DB.ResumeLearningContentResponse(r.Context(), database.ResumeLearningContentResponseParams{
		LearningID: learningID,
		UserID: user.ID,
	})

	if err_resume != nil {
		respondWithError(w, 400, fmt.Sprint("Error when resume learning content: %v", err))
		return
	}

	respondWithJson(w, 200, fmt.Sprint("Successfull resume learning content"))

}

func (apiCnfg *apiConfig) CompleteLearningContent(w http.ResponseWriter, r *http.Request, user database.User){

	learningIDStr := chi.URLParam(r, "learningID")
	learningID, err := uuid.Parse(learningIDStr)

	if err != nil {
		respondWithError(w, 400, fmt.Sprint("Error when parse learning id: %v", err))
		return
	}

	err_complete := apiCnfg.DB.CompleteLearningContentResponse(r.Context(), database.CompleteLearningContentResponseParams{
		LearningID: learningID,
		UserID: user.ID,
	})

	if err_complete != nil {
		respondWithError(w, 400, fmt.Sprint("Error when complete learning content: %v", err))
		return
	}

	respondWithJson(w, 200, fmt.Sprint("Successfully complete learning content"))

}

func (apiCnfg *apiConfig) SaveLearningContentEvaluation(w http.ResponseWriter, r *http.Request, user database.User) {
	type question_answers struct {
		QuestionID uuid.UUID `json:"question_id"`
		Answer     string    `json:"answer"`
		Point      int64     `json:"point"`
	}
	type parameters struct {
		ClassID         uuid.UUID          `json:"class_id"`
		QuestionAnswers []question_answers `json:"question_answers"`
	}

	learningIDStr := chi.URLParam(r, "learningID")
	learningID, err := uuid.Parse(learningIDStr)
	if err != nil {
		respondWithError(w, 400, fmt.Sprintf("Error when parse learning id: %v", err))
		return
	}

	decoder := json.NewDecoder(r.Body)
	params := parameters{}
	err = decoder.Decode(&params)
	if err != nil {
		respondWithError(w, 400, fmt.Sprintf("Error when parse json: %v", err))
		return
	}

	// Create the main response record
	learning_response, err := apiCnfg.DB.CreateLearningResponse(r.Context(), database.CreateLearningResponseParams{
		ClassID:    params.ClassID,
		UserID:     user.ID,
		LearningID: learningID,
	})
	if err != nil {
		respondWithError(w, 400, fmt.Sprintf("Error when create learning response: %v", err))
		return
	}

	// Fetch all questions with their options (using the JOIN query)
	questionRows, err := apiCnfg.DB.GetLearningQuestionsByLearningContent(r.Context(), learningID)
	if err != nil {
		respondWithError(w, 400, fmt.Sprintf("Error when get questions: %v", err))
		return
	}

	// Build a map: questionID -> list of options (with point)
	type optionInfo struct {
		ID     uuid.UUID
		Option string
		Point  int64
	}
	optionsMap := make(map[uuid.UUID][]optionInfo)

	for _, row := range questionRows {
		if !row.QuestionID.Valid {
			continue
		}
		qid := row.QuestionID.UUID
		if _, exists := optionsMap[qid]; !exists {
			optionsMap[qid] = []optionInfo{}
		}
		if row.ID_2.Valid && row.Option.Valid {
			optionsMap[qid] = append(optionsMap[qid], optionInfo{
				ID:     row.ID_2.UUID,
				Option: row.Option.String,
				Point:  toInt64(row.Point),
			})
		}
	}

	totalPoints := int64(0)

	// Process each submitted answer
	for _, qa := range params.QuestionAnswers {
		// Find the corresponding question row (to get question type, correct answer, etc.)
		var questionRow database.GetLearningQuestionsByLearningContentRow
		found := false
		for _, row := range questionRows {
			if row.ID == qa.QuestionID {
				questionRow = row
				found = true
				break
			}
		}
		if !found {
			continue
		}

		// Retrieve the options for this question (if any)
		opts := optionsMap[qa.QuestionID]

		var earnedPoint int64 = 0

		switch questionRow.QuestionType {
		case "multiple_choice", "true_false":
			// Correct answer is stored in questionRow.Answer (as text)
			if strings.TrimSpace(questionRow.Answer) == strings.TrimSpace(qa.Answer) {
				// Find the option that matches the correct answer to get its point
				for _, opt := range opts {
					if opt.Option == questionRow.Answer {
						earnedPoint = opt.Point
						break
					}
				}
			}

		case "multiple_answer":
			// Correct answer is comma-separated option texts
			correctTexts := splitAndTrim(questionRow.Answer)
			userTexts := splitAndTrim(qa.Answer)

			if len(correctTexts) == len(userTexts) && len(correctTexts) > 0 {
				correctSet := make(map[string]bool)
				for _, ct := range correctTexts {
					correctSet[ct] = true
				}
				allMatch := true
				for _, ut := range userTexts {
					if !correctSet[ut] {
						allMatch = false
						break
					}
				}
				if allMatch {
					// Sum points of all correct options
					for _, opt := range opts {
						if contains(correctTexts, opt.Option) {
							earnedPoint += opt.Point
						}
					}
				}
			}

		case "essay":
			// For essay, use question's score if answer matches exactly
			if strings.TrimSpace(questionRow.Answer) == strings.TrimSpace(qa.Answer) {
				earnedPoint = toInt64(questionRow.Score)
			}

		case "pairtopair":
			// Assume answer is comma-separated pairs "1:A,2:B,..."
			correctPairs := splitAndTrim(questionRow.Answer)
			userPairs := splitAndTrim(qa.Answer)

			if len(correctPairs) == len(userPairs) && len(correctPairs) > 0 {
				match := true
				for i := range correctPairs {
					if correctPairs[i] != userPairs[i] {
						match = false
						break
					}
				}
				if match {
					earnedPoint = toInt64(questionRow.Score)
				}
			}
		}

		// Save the response detail with the calculated point
		_, err = apiCnfg.DB.CreateLearningResponseDetail(r.Context(), database.CreateLearningResponseDetailParams{
			ResponseID: learning_response.ID,
			UserID:     user.ID,
			ClassID:    params.ClassID,
			QuestionID: qa.QuestionID,
			Answer:     qa.Answer,
			Point:      earnedPoint, // ensure field type matches
		})
		if err != nil {
			respondWithError(w, 400, fmt.Sprintf("Error when save response detail: %v", err))
			return
		}
		totalPoints += earnedPoint
	}

	// Update the main response with total points
	err = apiCnfg.DB.UpdateLearningResponse(r.Context(), database.UpdateLearningResponseParams{
		ID:         learning_response.ID,
		TotalPoint: totalPoints,
		FinishedAt: sql.NullTime{Time: time.Now(), Valid: true},
		UpdatedAt:  sql.NullTime{Time: time.Now(), Valid: true},
	})
	if err != nil {
		respondWithError(w, 400, fmt.Sprintf("Error when update learning response: %v", err))
		return
	}

	respondWithJson(w, 200, map[string]interface{}{
		"message": "Evaluation submitted successfully",
		"score":   totalPoints,
	})
}

// Helper: safely convert interface{} to int64
func toInt64(v interface{}) int64 {
	switch val := v.(type) {
	case int64:
		return val
	case int32:
		return int64(val)
	case int:
		return int64(val)
	case float64:
		return int64(val)
	default:
		return 0
	}
}

func splitAndTrim(s string) []string {
	parts := strings.Split(s, ",")
	result := make([]string, 0, len(parts))
	for _, p := range parts {
		p = strings.TrimSpace(p)
		if p != "" {
			result = append(result, p)
		}
	}
	return result
}

func contains(slice []string, item string) bool {
	for _, s := range slice {
		if s == item {
			return true
		}
	}
	return false
}

// func (apiCnfg *apiConfig) SaveLearningContentEvaluation(w http.ResponseWriter, r *http.Request, user database.User){

// 	type question_answers struct {
// 		QuestionID uuid.UUID `json:"question_id"`
// 		Answer string `json:"answer"`
// 		Point int64 `json:"point"`
// 	}

// 	type parameters struct {
// 		ClassID uuid.UUID `json:"class_id"`
// 		QuestionAnswers []question_answers `json:"question_answers"`
// 	}

// 	// type response struct {
// 	// 	LearningID response `json:"learning_id"`
// 	// 	S
// 	// }

// 	learningIDStr := chi.URLParam(r, "learningID")
// 	learningID, err := uuid.Parse(learningIDStr)

// 	if err != nil {
// 		respondWithError(w, 400, fmt.Sprint("Error when parse learning id: %v", err))
// 		return
// 	}

// 	decode := json.NewDecoder(r.Body)

// 	params := parameters{}

// 	err_params := decode.Decode(&params)

// 	if err_params != nil {
// 		respondWithError(w, 400, fmt.Sprint("Error when parse json: %v", err_params))
// 		return
// 	}

// 	learning_response, err := apiCnfg.DB.CreateLearningResponse(r.Context(), database.CreateLearningResponseParams{
// 		ClassID: params.ClassID,
// 		UserID: user.ID,
// 		LearningID: learningID,
// 	})

// 	point := 0

// 	if len(params.QuestionAnswers) > 0 {

// 		questions, err := apiCnfg.DB.GetLearningQuestionsByLearningContent(r.Context(), learningID)

// 		fmt.Println("Questions", questions)

// 		if err != nil {
// 			respondWithError(w, 400, fmt.Sprint("Error when get learning content questions: %v", err))
// 			return
// 		}

// 		if len(questions) > 0 {

// 			for _, question := range questions {

// 				if err != nil {
// 					respondWithError(w, 400, fmt.Sprint("Error when get learning options answers: %v", err))
// 					return
// 				}

// 				for _, qa := range params.QuestionAnswers {


// 					if question.QuestionType == "multiple_choice" {

// 						optionID, _ := uuid.Parse(question.Answer)

// 						option, _ := apiCnfg.DB.GetLearningOptionAnswersByQuestionIDAndOptionID(r.Context(), database.GetLearningOptionAnswersByQuestionIDAndOptionIDParams{
// 							QuestionID: question.ID,
// 							ID: optionID,
// 						})

// 						// option := options[0]

// 						if question.Answer == qa.Answer{
// 							point := append(point, int64(option.Point))
// 						}
// 					}
// 					if question.QuestionType == "multiple_answer" {


// 						for _, a := range strings.Split(question.Answer, ",") {

// 							optionID, _ := uuid.Parse(a)

// 							option, _ := apiCnfg.DB.GetLearningOptionAnswersByQuestionIDAndOptionID(r.Context(), database.GetLearningOptionAnswersByQuestionIDAndOptionIDParams{
// 								QuestionID: question.ID,
// 								ID: optionID,
// 							})

// 							if a == qa.Answer {
// 								point, _ := int64(option.Point) + point

// 								point := append(point, point)
// 							}else{
// 								point := 0
// 							}

// 						}
// 					}
// 					if question.QuestionType == "essay" {

// 						optionID, _ := uuid.Parse(question.Answer)

// 						option, err := apiCnfg.DB.GetLearningOptionAnswersByQuestionIDAndOptionID(r.Context(), database.GetLearningOptionAnswersByQuestionIDAndOptionIDParams{
// 							QuestionID: question.ID,
// 							ID: optionID,
// 						})

// 						if question.Answer == qa.Answer {
// 							point := append(point, int64(option.Point))
// 						}
// 					}

// 					if question.QuestionType == "pairtopair" {
// 						for _, a := range strings.Split(question.Answer, ",") {

// 							optionID, _ := uuid.Parse(a)

// 							options, err := apiCnfg.DB.GetLearningOptionAnswersByQuestionIDAndOptionID(r.Context(), database.GetLearningOptionAnswersByQuestionIDAndOptionIDParams{
// 								QuestionID: question.ID,
// 								ID: optionID,
// 							})

// 							for _, option := range options {

// 								// p1 := strings.Split(option, "-")[0]
// 								// p2 := strings.Split(option, "-")[1]

// 								a1 := strings.Split(a, "-")[0]
// 								a2 := strings.Split(a, "-")[1]

// 								if (a1 == option || a2 == option) {
// 									point, _ := int64(option.Point) + point
// 									// point := option.Point + point
// 									point, _ := append(point, point)
// 								}else{
// 									point := 0
// 								}

// 							}
// 						}
// 						// questions.Answer.split(',')
// 					}

// 					_, err := apiCnfg.DB.CreateLearningResponseDetail(r.Context(), database.CreateLearningResponseDetailParams{
// 						ResponseID: learning_response.ID,
// 						UserID: user.ID,
// 						ClassID: params.ClassID,
// 						QuestionID: qa.QuestionID,
// 						Answer: qa.Answer,
// 						Point: point,
// 					})

// 					if err != nil {
// 						respondWithError(w, 400, fmt.Sprint("Error when save learning response: %v", err))
// 						return
// 					}
// 				}
// 			}
// 		}


// 		// if questions.length > 0 {

// 		// }

// 		err := apiCnfg.DB.UpdateLearningResponse(r.Context(), database.UpdateLearningResponseParams{
// 			ID: learningID,
// 			TotalPoint: point,
// 			FinishedAt: sql.NullTime{
// 				Time: time.Now(),
// 				Valid: true,
// 			},
// 			UpdatedAt: sql.NullTime{
// 				Time: time.Now(),
// 				Valid: true,
// 			},
// 		})

// 		if err != nil {
// 			respondWithError(w, 400, fmt.Sprint("Error when update learning response: %v", err))
// 			return
// 		}

// 	}







// 	// learning_content, err := apiCnfg.DB.SaveLearningContentEvaluation(r.Context(), user.ID, learningID)

// 	// if err != nil {
// 	// 	respondWithError(w, 400, fmt.Sprint("Error when save learning content evaluation: %v", err))
// 	// 	return
// 	// }

// 	respondWithJson(w, 200, fmt.Sprint("Successfully Submit Evaluation"))
// 	// respondWithJson(w, 200, learning_content)

// }

