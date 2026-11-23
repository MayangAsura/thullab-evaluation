package main

import (
	"fmt"
	"log"
	"os"
	"net/http"

	"github.com/joho/godotenv"
	"github.com/go-chi/chi"
	"github.com/go-chi/cors"

	"github.com/MayangAsura/thullab-evaluation/internal/database"

	_"github.com/lib/pq"

	"database/sql"

	// "internal/database"
)

type apiConfig struct {
	DB *database.Queries
}

func main(){

	fmt.Println("hello from go")

	godotenv.Load()

	portString := os.Getenv("PORT")

	if portString == "" {
		log.Fatal("Port not found in the environment")

	}

	// dbURL := os.Getenv("PROD_DB_URL")
	dbURL := os.Getenv("LOCAL_DB_URL")

	if dbURL == "" {
		log.Fatal("DB_URL not found in the environment")
	}

	conn, err := sql.Open("postgres", dbURL)

	fmt.Println("conn", conn)

	if err != nil {
		log.Fatal("Cannot connect to database:", err)
	}

	// queries, err :=

	// if err != nil {
	// 	log.Fatal("Can't create to db connection:", err)
	// }

	apiCnfg := apiConfig{
		DB: database.New(conn),
	}

	router := chi.NewRouter()

	router.Use(cors.Handler(cors.Options{
		AllowedOrigins: []string{"https://*", "http://*"},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders: []string{"*"},
		ExposedHeaders: []string{"Link"},
		AllowCredentials: false,
		MaxAge: 300,
	}))

	v1Router := chi.NewRouter()

	v1Router.Get("/healthz", handlerReadiness)
	v1Router.Get("/err", handlerErr)
	v1Router.Post("/auth/login", apiCnfg.handleLogin)
	v1Router.Post("/auth/register", apiCnfg.handleRegisterNewRegistrant)
	v1Router.Post("/users", apiCnfg.middlewareAuth(apiCnfg.handlerCreateUser))
	v1Router.Get("/users", apiCnfg.middlewareAuth(apiCnfg.handlerGetUser))
	v1Router.Post("/registrants", apiCnfg.middlewareAuth(apiCnfg.handlerCreateRegistrant))
	v1Router.Get("/registrants", apiCnfg.middlewareAuth(apiCnfg.handlerGetRegistrants))
	v1Router.Get("/registrants/:id", apiCnfg.middlewareAuth(apiCnfg.handlerGetRegistrantDetail))
	v1Router.Patch("/registrants/:id", apiCnfg.middlewareAuth(apiCnfg.handlerUpdateRegistrant))
	v1Router.Delete("/registrants/:id", apiCnfg.middlewareAuth(apiCnfg.handlerDeleteRegistrant))
	v1Router.Post("/classes", apiCnfg.middlewareAuth(apiCnfg.handlerCreateClasses))
	v1Router.Get("/classes", apiCnfg.middlewareAuth(apiCnfg.handlerGetClasses))
	v1Router.Get("/classes/:id", apiCnfg.middlewareAuth(apiCnfg.handlerGetClassDetail))
	v1Router.Patch("/classes/:id", apiCnfg.middlewareAuth(apiCnfg.handlerUpdateClass))
	v1Router.Delete("/classes/:id", apiCnfg.middlewareAuth(apiCnfg.handlerDeleteClass))
	v1Router.Get("/classes/:id/learning-contents", apiCnfg.middlewareAuth(apiCnfg.handlerGetClassLearningContent))
	v1Router.Post("/learning-contents", apiCnfg.middlewareAuth(apiCnfg.handlerCreateLearningContent))
	v1Router.Get("/learning-contents", apiCnfg.middlewareAuth(apiCnfg.handlerGetLearningContents))
	v1Router.Get("/learning-contents/:id", apiCnfg.middlewareAuth(apiCnfg.handlerGetLearningContentDetail))
	v1Router.Patch("/learning-contents/:id", apiCnfg.middlewareAuth(apiCnfg.handlerUpdateLearningContent))
	v1Router.Delete("/learning-contents/:id", apiCnfg.middlewareAuth(apiCnfg.handlerDeleteLearningContent))
	v1Router.Post("/learning-contents/:id/start", apiCnfg.middlewareAuth(apiCnfg.StartLearningStudent))
	v1Router.Patch("/learning-contents/:id/resume", apiCnfg.middlewareAuth(apiCnfg.ResumeLearningStudent))
	v1Router.Patch("/learning-contents/:id/complete", apiCnfg.middlewareAuth(apiCnfg.CompleteOneLearningStudent))
	v1Router.Post("/learning-responses", apiCnfg.middlewareAuth(apiCnfg.handlerCreateLearningResponse))
	v1Router.Post("/skills", apiCnfg.middlewareAuth(apiCnfg.handlerCreateSkills))
	v1Router.Get("/skills/:id", apiCnfg.middlewareAuth(apiCnfg.handlerGetSkillDetail))
	v1Router.Patch("/skills/:id", apiCnfg.middlewareAuth(apiCnfg.handlerUpdateSkill))
	v1Router.Delete("/skills/:id", apiCnfg.middlewareAuth(apiCnfg.handlerDeleteSkill))
	v1Router.Post("/speakers", apiCnfg.middlewareAuth(apiCnfg.handlerCreateSpeakerClass))
	v1Router.Get("/speakers", apiCnfg.middlewareAuth(apiCnfg.handlerGetSpeakers))
	v1Router.Get("/speakers/:id", apiCnfg.middlewareAuth(apiCnfg.handlerGetSpeakerClassDetail))
	v1Router.Patch("/speakers/:id", apiCnfg.middlewareAuth(apiCnfg.handlerUpdateSpeakerClass))
	v1Router.Delete("/speakers/:id", apiCnfg.middlewareAuth(apiCnfg.handlerDeleteSpeakerClass))
	v1Router.Get("/me/achievements", apiCnfg.middlewareAuth(apiCnfg.handleGetMyAchievements))
	v1Router.Get("/me/certificates", apiCnfg.middlewareAuth(apiCnfg.handleGetMyCertificates))
	v1Router.Post("/forgot-password", apiCnfg.ForgotPassword)
	v1Router.Patch("/reset-password", apiCnfg.middlewareAuth(apiCnfg.ResetPassword))

	// v1Router.HandleFunc("/healthz", handlerReadiness)

	router.Mount("/v1/api", v1Router)


	srv := &http.Server{
		Handler: router,
		Addr:		":" + portString,
	}

	log.Printf("Server is running on port %v", portString)
	srv.ListenAndServe()

	// if err != nil {
	// 	log.Fatal(err)
	// }


	// fmt.Println("port:", portString)

}